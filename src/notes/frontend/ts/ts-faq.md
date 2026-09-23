# 附录

## 1. TypeScript 常见问题

### 1.1 类型兼容性

```typescript
// 1. 结构类型系统
interface Named {
  name: string;
}

class Person {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}

let named: Named;
named = new Person("Alice", 30); // ✅ 兼容，因为 Person 有 name 属性

// 2. 函数类型兼容性
let x = (a: number) => 0;
let y = (b: number, s: string) => 0;

y = x; // ✅ 兼容
// x = y; // ❌ 不兼容

// 3. 枚举类型兼容性
enum Status {
  Ready,
  Waiting,
}
enum Color {
  Red,
  Blue,
  Green,
}

let status = Status.Ready;
// status = Color.Red; // ❌ 不兼容
```

### 1.2 常见错误解决

```typescript
// 1. 类型断言 vs 类型声明
// 类型断言：告诉编译器"我知道这是什么类型"
const element = document.getElementById("root") as HTMLElement;

// 类型声明：定义变量的类型
const element2: HTMLElement | null = document.getElementById("root");

// 2. 非空断言操作符
const element3 = document.getElementById("root")!; // 告诉编译器这不会是 null/undefined

// 3. 可选链和空值合并
const user = {
  profile: {
    name: "Alice",
  },
};

const userName = user?.profile?.name ?? "Unknown";

// 4. 类型保护
function isString(value: any): value is string {
  return typeof value === "string";
}

function process(value: string | number) {
  if (isString(value)) {
    // 这里 value 是 string 类型
    console.log(value.toUpperCase());
  } else {
    // 这里 value 是 number 类型
    console.log(value.toFixed(2));
  }
}
```

### 1.3 实用代码片段

```typescript
// 1. 深度克隆类型
type DeepClone<T> = {
  [K in keyof T]: T[K] extends object ? DeepClone<T[K]> : T[K];
};

// 2. 提取异步函数返回值
type AsyncReturnType<T> = T extends (...args: any[]) => Promise<infer R>
  ? R
  : T extends (...args: any[]) => infer R
    ? R
    : never;

// 3. 获取构造函数参数类型
type ConstructorParameters<T> = T extends new (...args: infer P) => any
  ? P
  : never;

// 4. 创建映射类型
type MappedType<T, U> = {
  [K in keyof T]: U;
};

// 5. 条件类型分发
type DistributedConditional<T> = T extends any ? T[] : never;
```

## 2. 学习资源推荐

### 2.1 官方资源

- [TypeScript 官方文档](https://www.typescriptlang.org/docs/)
- [TypeScript Playground](https://www.typescriptlang.org/play)
- [TypeScript GitHub](https://github.com/microsoft/TypeScript)

### 2.2 在线课程

- TypeScript 官方入门教程
- 高级 TypeScript 类型编程
- TypeScript 设计模式

### 2.3 推荐书籍

- 《TypeScript 编程》
- 《Effective TypeScript》
- 《TypeScript 深入浅出》

### 2.4 工具推荐

- VSCode + TypeScript 插件
- TypeScript ESLint
- Prettier
- Jest + ts-jest
