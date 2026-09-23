# 一、Vue2 性能优化笔记

## 1. 响应式与数据

- **只把需要响应的数据放进 `data`**  
  常量、配置、纯展示数据可放在 `created` 外、普通变量或 `this.$options` 中，减少 `Object.defineProperty` 递归转换。

- **大只读列表用 `Object.freeze`**

  ```js
  this.list = Object.freeze(bigList);
  ```

  冻结后 Vue2 不会做响应式转换，适合不需要修改的长列表。

- **新增/删除对象属性必须用 `Vue.set` / `Vue.delete`**

  ```js
  this.$set(this.obj, "name", "vue");
  this.$delete(this.obj, "name");
  ```

- **数组索引赋值、修改 length 不会触发更新**  
  用 `splice`、`push`、`pop` 等重写方法，或直接替换整个数组。

- **慎用 `watch deep: true`**  
  深度监听大对象开销高，尽量监听具体字段，或用 `computed` 派生。

- **`computed` 有缓存，`methods` 没有**  
  模板里避免复杂表达式和频繁调用的方法，能抽成 `computed` 就抽。

- **避免 `$forceUpdate`**  
  它会导致整个组件重新渲染，应优先修正响应式数据问题。

## 2. 模板与组件

- **`v-for` 必须加唯一 `key`**  
  不要用 `index` 作为会增删排序列表的 key。

- **避免 `v-for` 和 `v-if` 同用**  
  Vue2 中 `v-for` 优先级高于 `v-if`，会先循环再判断，浪费性能。  
  正确做法：先过滤数据，再循环。

- **`v-if` 与 `v-show` 合理选择**
  - 初始不渲染、切换少：`v-if`
  - 频繁切换：`v-show`

- **静态内容用 `v-once` / `v-pre`**
  - `v-once`：只渲染一次，后续跳过更新。
  - `v-pre`：跳过编译，适合纯静态大段内容。

- **`keep-alive` 缓存组件**

  ```vue
  <keep-alive :include="['List']">
    <router-view />
  </keep-alive>
  ```

  配合 `activated` / `deactivated` 管理数据刷新，但注意内存占用。

- **长列表用虚拟滚动**  
  如 `vue-virtual-scroller`，只渲染可视区域。

- **纯展示组件可用函数式组件**

  ```js
  export default {
    functional: true,
    render(h, context) {},
  };
  ```

  无状态、无实例，开销更小。

- **拆分组件，缩小更新范围**  
  避免一个数据变化导致大组件整体重渲染。

## 3. 路由与构建

- **路由懒加载**

  ```js
  const Home = () => import("@/views/Home.vue");
  ```

- **组件异步加载**

  ```js
  const AsyncComp = () => import("@/components/Heavy.vue");
  ```

- **UI 库按需引入**  
  Element UI、Ant Design Vue 等使用 `babel-plugin-component` 或按需导入。

- **Webpack 优化**
  - `splitChunks` 分包
  - `externals` + CDN 引入 Vue、Vue Router、Vuex
  - `gzip` / `brotli` 压缩
  - `webpack-bundle-analyzer` 分析体积
  - `thread-loader` 多线程构建
  - `DLL`、缓存、HappyPack 等按需使用

- **图片与静态资源**  
  压缩、WebP、懒加载 `loading="lazy"`、CDN、雪碧图、字体图标。

## 4. 运行时与清理

- **防抖节流**  
  搜索、滚动、resize、输入等高频操作加防抖节流。

- **组件销毁时清理**  
  `beforeDestroy` / `destroyed` 中清除：
  - 定时器
  - 事件监听
  - 全局事件总线 `$off`
  - 未完成请求
  - 第三方实例

- **`$nextTick` 批量更新**  
  数据变化后需要操作 DOM 时使用，避免重复手动操作。

- **复杂计算放 Web Worker**  
  大数据解析、加密、计算等不阻塞主线程。

## 5. 首屏与网络

- 路由懒加载 + 按需引入 + CDN + gzip。
- HTTP 缓存、CDN、HTTP2。
- 接口分页、合并请求、取消重复请求。
- 骨架屏、Loading、错误捕获 `errorCaptured`。
- SSR / 预渲染：Nuxt2、`prerender-spa-plugin`。

## 6. Vue2 优化优先级

**路由懒加载 → 按需引入 → 图片优化 → gzip/CDN → `v-for` key → 虚拟列表 → `keep-alive` → `Object.freeze` → 清理副作用 → SSR/预渲染**

---

# 二、Vue3 性能优化笔记

## 1. 响应式与数据

- **Vue3 使用 Proxy，新增/删除属性自动响应**  
  不再需要 `Vue.set` / `Vue.delete`。

- **大对象用浅响应**

  ```js
  import { shallowRef, shallowReactive } from "vue";

  const bigList = shallowRef([]); // 只追踪 .value 整体替换
  const state = shallowReactive({}); // 只追踪顶层属性
  ```

- **永不响应式的对象用 `markRaw`**

  ```js
  import { markRaw } from "vue";
  const chart = markRaw(new Chart());
  ```

- **临时读取原始对象用 `toRaw`**

  ```js
  import { toRaw } from "vue";
  const raw = toRaw(proxyObj);
  ```

  操作原始对象不会触发更新，适合只读或临时计算。

- **只读大对象可用 `readonly` 或 `Object.freeze`**  
  防止误改，也能减少不必要的追踪。

- **`ref` / `reactive` 选择**
  - 基本类型：`ref`
  - 对象：`reactive` 或 `ref`
  - 大对象：`shallowRef` / `shallowReactive`

- **`computed` 缓存，`watch` 精确监听**  
  避免 `watch` 大对象且 `deep: true`，尽量监听具体字段。

- **`effectScope` 统一停止副作用**  
  适合组合式函数中批量管理 `watch`、`computed`。

## 2. 模板与组件

- **`v-for` 加唯一 `key`**  
  与 Vue2 一致。

- **大列表用 `v-memo`**

  ```vue
  <div v-for="item in list" :key="item.id" v-memo="[item.id === selectedId]">
    {{ item.name }}
  </div>
  ```

  条件跳过子树更新，适合长列表。

- **`v-once` / `v-pre` 仍可用**  
  静态内容优化。

- **`v-if` 与 `v-show` 合理选择**  
  同 Vue2。

- **`defineAsyncComponent` 异步组件**

  ```js
  import { defineAsyncComponent } from "vue";

  const Heavy = defineAsyncComponent(() => import("./Heavy.vue"));
  ```

- **`Suspense` 处理异步依赖**  
  配合异步组件，优化加载体验。

- **`Teleport` 优化弹窗层级**  
  把 Modal、Toast 传送到 `body`，避免深层嵌套和样式干扰。

- **`keep-alive` 缓存组件**  
  生命周期改为 `onActivated` / `onDeactivated`。

- **长列表虚拟滚动**  
  如 `vue-virtual-scroller`、`vueuc`。

- **拆分组件 + `script setup`**  
  `script setup` 编译后更高效，减少 `this` 开销。

## 3. 编译与构建优化

- **Vue3 编译优化**
  - 静态提升
  - Patch Flag
  - 事件缓存
  - Tree-shaking 更好

- **Vite / Rollup 优化**
  - 依赖预构建
  - `manualChunks` 分包
  - gzip / brotli
  - CDN 引入大依赖

- **按需引入**

  ```js
  // vite.config.js
  import Components from "unplugin-vue-components/vite";
  import AutoImport from "unplugin-auto-import/vite";
  ```

  自动导入 Vue、Pinia、UI 库组件和 API。

- **状态管理用 Pinia**  
  比 Vuex 更轻量，对 Tree-shaking 更友好。

- **路由懒加载**
  ```js
  const Home = () => import("@/views/Home.vue");
  ```

## 4. 运行时与清理

- **`onBeforeUnmount` / `onUnmounted` 清理副作用**  
  清除定时器、事件监听、请求、第三方实例。

- **防抖节流、`requestAnimationFrame`**  
  高频操作优化。

- **Web Worker 处理复杂计算**  
  避免阻塞主线程。

- **`nextTick` 批量更新 DOM**  
  与 Vue2 类似。

- **错误边界 `onErrorCaptured`**  
  捕获子组件错误，避免白屏。

## 5. 首屏与网络

- 路由懒加载 + 按需引入 + CDN + gzip/brotli。
- HTTP 缓存、HTTP2、CDN。
- 接口分页、合并请求、取消重复请求。
- 骨架屏、Loading、错误边界。
- SSR / SSG：Nuxt3、Vue SSR。
- PWA / Service Worker 离线缓存。
- 性能监控：Lighthouse、Performance、Vue Devtools、Sentry。

## 6. Vue3 优化优先级

**路由懒加载 → 按需引入 → 图片优化 → gzip/CDN → `v-for` key → `v-memo` → 虚拟列表 → `shallowRef` / `markRaw` → `defineAsyncComponent` → 清理副作用 → SSR/SSG**

---

# 三、Vue2 / Vue3 优化差异速查表

| 优化点              | Vue2                          | Vue3                              |
| ------------------- | ----------------------------- | --------------------------------- |
| 响应式原理          | `Object.defineProperty`       | `Proxy`                           |
| 新增/删除属性       | 必须 `Vue.set` / `Vue.delete` | 自动响应                          |
| 大对象浅响应        | `Object.freeze`               | `shallowRef`、`shallowReactive`   |
| 标记非响应式        | 无直接 API，放 `data` 外      | `markRaw`、`toRaw`                |
| 异步组件            | `() => import()` / 工厂函数   | `defineAsyncComponent`            |
| 编译优化            | 较少                          | 静态提升、Patch Flag、事件缓存    |
| 列表缓存            | `v-once`                      | `v-once`、`v-memo`                |
| 异步依赖            | 手动 loading                  | `Suspense`                        |
| DOM 传送            | 手动或第三方                  | `Teleport`                        |
| 构建工具            | Vue CLI + Webpack             | Vite + Rollup / Webpack           |
| 状态管理            | Vuex                          | Pinia                             |
| 生命周期清理        | `beforeDestroy` / `destroyed` | `onBeforeUnmount` / `onUnmounted` |
| keep-alive 生命周期 | `activated` / `deactivated`   | `onActivated` / `onDeactivated`   |
| Tree-shaking        | 一般                          | 更好                              |
| SSR                 | Nuxt2 / Vue SSR               | Nuxt3 / Vue SSR                   |

---

# 四、通用优化口诀

1. **先量化再优化**：Lighthouse、Performance、Vue Devtools。
2. **首屏优先**：路由懒加载、按需引入、CDN、gzip、图片优化。
3. **渲染优先**：`key`、`computed`、`v-if/v-show`、虚拟列表、`keep-alive`。
4. **响应式优先**：Vue2 用 `Object.freeze`，Vue3 用 `shallowRef` / `markRaw`。
5. **运行时优先**：防抖节流、清理副作用、Web Worker。
6. **Vue3 额外武器**：`v-memo`、`defineAsyncComponent`、`Suspense`、`Teleport`、Vite 分包。
