# clear_watch 日志自动清理工具 —— 使用说明

---

## 一、工具简介

`clear_watch` 是一套用于 **自动清理超大小日志文件** 的 Shell 工具，运行于 Linux 环境。

**核心功能：**

- 递归监控指定父级目录下所有以 `.log` 结尾的文件
- 当任意 `.log` 文件大小超过 **50MB** 时，自动清空其内容（保留文件本身）
- 支持**排除指定目录**和**指定文件**
- 每次清除操作记录日志（**操作时间 + 第几次清除 + 文件路径**）
- 支持后台运行、一键启动、一键停止

**文件组成：**

| 文件名 | 作用 |
|--------|------|
| `clear_watch.sh` | 主监控脚本 |
| `start_clear_watch.sh` | 后台启动脚本 |
| `stop_clear_watch.sh` | 停止脚本 |
| `clear.log` | 运行日志（自动生成） |
| `clear_count.txt` | 清除次数计数（自动生成） |
| `clear_watch.pid` | 进程号文件（运行时生成） |

> 所有生成的日志、计数、PID 文件均存放在**脚本所在目录**。

---

## 二、脚本原始代码

### 1. `clear_watch.sh`（主监控脚本）

```bash
#!/bin/bash
# Filename: clear_watch.sh
# Description: 递归监控父级目录下所有 .log 文件，超过50MB自动清空，
#              支持排除特定目录/文件，日志/计数文件存于脚本同级目录

# ========== 配置 ==========
PARENT_DIR="/path/to/your/log_dir"    # 父级目录（绝对路径，必须修改）
CHECK_INTERVAL=30                     # 检查间隔（秒）
THRESHOLD=$((50 * 1024 * 1024))       # 50MB

# 需要排除的目录（相对于 PARENT_DIR，或使用绝对路径）
EXCLUDE_DIRS=(
    "archive"
    "backup"
)

# 需要排除的文件（相对于 PARENT_DIR，或使用绝对路径，支持通配符）
EXCLUDE_FILES=(
    "important.log"
    "subdir/keep.log"
    "clear.log"           # 防止脚本自身日志被清空
)
# ===========================

SCRIPT_DIR=$(cd "$(dirname "$0")" && pwd)
LOG_FILE="${SCRIPT_DIR}/clear.log"
COUNT_FILE="${SCRIPT_DIR}/clear_count.txt"
PID_FILE="${SCRIPT_DIR}/clear_watch.pid"

if [ ! -d "$PARENT_DIR" ]; then
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] 错误：父目录不存在 $PARENT_DIR" >> "$LOG_FILE"
    exit 1
fi

echo $$ > "$PID_FILE"
[ ! -f "$COUNT_FILE" ] && echo 0 > "$COUNT_FILE"
echo "[$(date '+%Y-%m-%d %H:%M:%S')] 监控进程启动 (PID: $$)，监控目录: $PARENT_DIR" >> "$LOG_FILE"

trap "rm -f '$PID_FILE'; echo '[$(date '+%Y-%m-%d %H:%M:%S')] 监控进程退出' >> '$LOG_FILE'; exit" SIGTERM SIGINT

# ---------- 判断文件是否应被排除 ----------
is_excluded() {
    local file="$1"
    local d f

    for d in "${EXCLUDE_DIRS[@]}"; do
        [ "${d#/}" = "$d" ] && d="${PARENT_DIR%/}/$d"
        d="${d%/}"
        case "$file" in
            "$d"/*) return 0 ;;
        esac
    done

    for f in "${EXCLUDE_FILES[@]}"; do
        [ "${f#/}" = "$f" ] && f="${PARENT_DIR%/}/$f"
        case "$file" in
            $f) return 0 ;;
        esac
    done

    return 1
}

# ---------- 主循环 ----------
while true; do
    find "$PARENT_DIR" -type f -name "*.log" -print0 2>/dev/null | \
    while IFS= read -r -d '' file; do
        if is_excluded "$file"; then
            continue
        fi

        file_size=$(stat -c %s "$file" 2>/dev/null)
        [ -z "$file_size" ] && continue

        if [ "$file_size" -gt "$THRESHOLD" ]; then
            count=$(< "$COUNT_FILE")
            count=$((count + 1))
            echo "$count" > "$COUNT_FILE"

            > "$file"

            timestamp=$(date '+%Y-%m-%d %H:%M:%S')
            echo "${timestamp} 第${count}次清除 ${file}" >> "$LOG_FILE"
        fi
    done

    sleep "$CHECK_INTERVAL"
done
```

---

### 2. `start_clear_watch.sh`（后台启动脚本）

```bash
#!/bin/bash
# Filename: start_clear_watch.sh
# Description: 后台启动 clear_watch.sh

SCRIPT_DIR=$(cd "$(dirname "$0")" && pwd)
PID_FILE="${SCRIPT_DIR}/clear_watch.pid"

if [ -f "$PID_FILE" ]; then
    OLD_PID=$(cat "$PID_FILE")
    if kill -0 "$OLD_PID" 2>/dev/null; then
        echo "监控进程已在运行 (PID: $OLD_PID)"
        exit 1
    else
        rm -f "$PID_FILE"
    fi
fi

nohup "${SCRIPT_DIR}/clear_watch.sh" >> "${SCRIPT_DIR}/clear.log" 2>&1 &
sleep 1
NEW_PID=$(cat "$PID_FILE" 2>/dev/null)
if [ -n "$NEW_PID" ] && kill -0 "$NEW_PID" 2>/dev/null; then
    echo "监控进程启动成功 (PID: $NEW_PID)"
else
    echo "启动失败，请检查 ${SCRIPT_DIR}/clear.log"
    exit 1
fi
```

---

### 3. `stop_clear_watch.sh`（停止脚本）

```bash
#!/bin/bash
# Filename: stop_clear_watch.sh
# Description: 停止监控进程

SCRIPT_DIR=$(cd "$(dirname "$0")" && pwd)
PID_FILE="${SCRIPT_DIR}/clear_watch.pid"

if [ -f "$PID_FILE" ]; then
    PID=$(cat "$PID_FILE")
    if kill -0 "$PID" 2>/dev/null; then
        echo "正在终止进程 PID: $PID"
        kill -TERM "$PID"
        for i in {1..5}; do
            if ! kill -0 "$PID" 2>/dev/null; then
                rm -f "$PID_FILE"
                echo "进程已终止"
                exit 0
            fi
            sleep 1
        done
        echo "进程未响应，强制终止"
        kill -KILL "$PID"
        rm -f "$PID_FILE"
        echo "已强制终止"
    else
        echo "PID 文件中的进程不存在，删除 PID 文件"
        rm -f "$PID_FILE"
    fi
else
    echo "未找到 PID 文件，尝试按进程名查找..."
    PIDS=$(ps aux | grep -E "clear_watch\.sh" | grep -v grep | grep -v "$0" | awk '{print $2}')
    if [ -n "$PIDS" ]; then
        echo "找到进程: $PIDS，终止中..."
        kill -TERM $PIDS 2>/dev/null
        sleep 1
        kill -KILL $PIDS 2>/dev/null
        echo "已终止"
    else
        echo "未找到运行中的监控进程"
    fi
fi
```

---

## 三、使用步骤

### 步骤 1：创建目录并保存脚本

建议将三个脚本放在同一独立目录中，例如：

```bash
mkdir -p /var/lib/docker/clear_watch_sh
cd /var/lib/docker/clear_watch_sh
```

将上述三个脚本分别保存为：
- `clear_watch.sh`
- `start_clear_watch.sh`
- `stop_clear_watch.sh`

> ⚠️ **重要**：不要把脚本目录放在被监控的 `PARENT_DIR` 里面，避免脚本自身的 `clear.log` 被误清理。

---

### 步骤 2：修改配置

编辑 `clear_watch.sh`，修改 **配置区域** 中的参数：

```bash
PARENT_DIR="/data/logs"        # ← 改为你要监控的父目录（绝对路径）
CHECK_INTERVAL=30              # ← 检查间隔（秒），文件多时可调大
THRESHOLD=$((50 * 1024 * 1024))# ← 默认 50MB，一般不用改

EXCLUDE_DIRS=(
    "archive"                  # ← 排除 /data/logs/archive 及子目录
    "backup"                   # ← 排除 /data/logs/backup 及子目录
)

EXCLUDE_FILES=(
    "important.log"            # ← 排除 /data/logs/important.log
    "subdir/keep.log"          # ← 排除 /data/logs/subdir/keep.log
)
```

**路径规则：**

| 写法 | 含义 |
|------|------|
| `"archive"` | 相对于 `PARENT_DIR`，排除 `PARENT_DIR/archive` 及其子目录 |
| `"subdir/nested"` | 排除 `PARENT_DIR/subdir/nested` 及其子目录 |
| `"/data/other/skip"` | 使用绝对路径排除 |
| `"subdir/*.log"` | 通配符匹配（仅文件排除项支持） |

> 💡 若不需要排除任何内容，两个数组留空即可：`EXCLUDE_DIRS=()`、`EXCLUDE_FILES=()`

---

### 步骤 3：赋予执行权限

```bash
chmod +x clear_watch.sh start_clear_watch.sh stop_clear_watch.sh
```

---

### 步骤 4：启动监控

```bash
./start_clear_watch.sh
```

**成功输出示例：**
```
监控进程启动成功 (PID: 12345)
```

> ❌ **不要**使用 `sh clear_watch.sh` 启动，因为脚本使用 bash 语法，`sh` 可能指向 `dash` 导致报错。
> ✅ 使用 `./start_clear_watch.sh` 或 `bash start_clear_watch.sh`

---

### 步骤 5：查看运行日志

```bash
tail -f clear.log
```

**日志格式示例：**
```
[2026-06-24 10:00:00] 监控进程启动 (PID: 12345)，监控目录: /data/logs
2026-06-24 10:15:30 第1次清除 /data/logs/app1.log
2026-06-24 10:32:18 第2次清除 /data/logs/service/error.log
2026-06-24 11:02:45 第3次清除 /data/logs/app2.log
```

**查看当前清除次数：**
```bash
cat clear_count.txt
```

---

### 步骤 6：停止监控

```bash
./stop_clear_watch.sh
```

**成功输出示例：**
```
正在终止进程 PID: 12345
进程已终止
```

---

## 四、目录结构示例

假设脚本放在 `/var/lib/docker/clear_watch_sh/`，监控目录为 `/data/logs/`：

**脚本目录：**
```
/var/lib/docker/clear_watch_sh/
├── clear_watch.sh
├── start_clear_watch.sh
├── stop_clear_watch.sh
├── clear.log              # 运行后生成
├── clear_count.txt        # 运行后生成
└── clear_watch.pid        # 运行中生成，退出后自动删除
```

**被监控目录：**
```
/data/logs/
├── app.log                ✅ 被监控
├── app.log.1              ❌ 不匹配 .log 后缀
├── important.log          ⛔ 被排除
├── archive/               ⛔ 整个目录被排除
│   └── old.log
├── backup/                ⛔ 整个目录被排除
│   └── bak.log
└── service/
    ├── service.log        ✅ 被监控
    └── keep.log           ⛔ 被排除
```

---

## 五、常见问题与排查

### Q1：脚本启动后没有触发清除？

**排查步骤：**

1. **确认文件是否真的超过 50MB：**
   ```bash
   find /data/logs -type f -name "*.log" -size +50M -exec ls -lh {} \;
   ```
   无输出 → 确实没有超标文件，脚本正常。

2. **确认文件有写权限**（清空需要写权限）：
   ```bash
   ls -l /data/logs/xxx.log
   ```

3. **缩短检查周期测试**：将 `CHECK_INTERVAL` 改为 `5`，并手动制造大文件：
   ```bash
   dd if=/dev/zero bs=1M count=60 >> /data/logs/test.log
   ```
   等待 10 秒后查看 `clear.log`。

---

### Q2：报错 `未预期的符号 '<' 附近有语法错误`？

**原因**：使用了 `sh clear_watch.sh` 启动，`sh` 指向 dash，不支持 bash 的进程替换语法。

**解决**：
```bash
./start_clear_watch.sh      # ✅ 推荐
bash start_clear_watch.sh   # ✅ 可行
sh start_clear_watch.sh     # ❌ 禁止
```

当前脚本已去掉 `< <()` 语法，但仍建议统一用 `bash`。

---

### Q3：清空后磁盘空间没有释放？

**原因**：进程仍持有该文件的句柄（正在写入日志），`> file` 只是截断文件，但磁盘块可能仍被占用。

**解决**：
- 这是正常现象，等写入进程重新打开文件后空间会释放。
- 若需立即释放，应配合日志服务的 `copytruncate` 或重启日志进程。

---

### Q4：脚本日志 `clear.log` 被自己清空了？

**原因**：`clear.log` 以 `.log` 结尾，若脚本目录在 `PARENT_DIR` 内会被误匹配。

**解决**：
1. 把脚本目录移出 `PARENT_DIR`（推荐）；
2. 或在 `EXCLUDE_FILES` 中加入 `"clear.log"`。

---

### Q5：如何开机自启？

在 `/etc/rc.local`（或系统的启动脚本）中加入：

```bash
bash /var/lib/docker/clear_watch_sh/start_clear_watch.sh
```

或编写 systemd service 文件（如需可另行提供）。

---

## 六、配置速查表

| 配置项 | 默认值 | 说明 |
|--------|--------|------|
| `PARENT_DIR` | `/path/to/your/log_dir` | **必改**，被监控的父级目录 |
| `CHECK_INTERVAL` | `30` | 检查间隔（秒） |
| `THRESHOLD` | `50MB` | 触发清除的大小阈值 |
| `EXCLUDE_DIRS` | `("archive" "backup")` | 排除的目录列表 |
| `EXCLUDE_FILES` | `("important.log" ...)` | 排除的文件列表 |

---

## 七、操作命令速查

| 操作 | 命令 |
|------|------|
| 启动监控 | `./start_clear_watch.sh` |
| 查看日志 | `tail -f clear.log` |
| 查看计数 | `cat clear_count.txt` |
| 停止监控 | `./stop_clear_watch.sh` |
| 检查语法 | `bash -n clear_watch.sh` |
| 查看进程 | `ps aux \| grep clear_watch` |
| 检查大文件 | `find $PARENT_DIR -type f -name "*.log" -size +50M` |

---

按照以上步骤配置并启动后，工具即可自动清理超大小日志文件。如在使用中遇到问题，请提供 `clear.log` 的内容以便进一步排查。