# 第三部分：高级特性与最佳实践

## 1. 装饰器

### 1.1 类装饰器
```typescript
// 基础类装饰器
function Logger(constructor: Function) {
    console.log('Class created:', constructor.name);
}

// 装饰器工厂
function LoggerFactory(logString: string) {
    return function(constructor: Function) {
        console.log(logString);
        console.log(constructor);
    };
}

// 替换类定义的装饰器
function WithTemplate(template: string, hookId: string) {
    return function<T extends { new(...args: any[]): { name: string } }>(
        originalConstructor: T
    ) {
        return class extends originalConstructor {
            constructor(...args: any[]) {
                super();
                console.log('Rendering template');
                const hookEl = document.getElementById(hookId);
                if (hookEl) {
                    hookEl.innerHTML = template;
                    hookEl.querySelector('h1')!.textContent = this.name;
                }
            }
        };
    };
}

// 使用装饰器
@Logger
@LoggerFactory('LOGGING')
@WithTemplate('<h1>My Person Object</h1>', 'app')
class Person {
    name = 'Max';
    
    constructor() {
        console.log('Creating person object...');
    }
}
```

### 1.2 方法装饰器
```typescript
// 方法装饰器
function LogMethod(
    target: any,
    propertyName: string,
    descriptor: PropertyDescriptor
) {
    const originalMethod = descriptor.value;
    
    descriptor.value = function(...args: any[]) {
        console.log(`Calling ${propertyName} with args:`, args);
        const result = originalMethod.apply(this, args);
        console.log(`Result:`, result);
        return result;
    };
    
    return descriptor;
}

// 自动绑定 this
function Autobind(
    _target: any,
    _methodName: string,
    descriptor: PropertyDescriptor
) {
    const originalMethod = descriptor.value;
    const adjustedDescriptor: PropertyDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        }
    };
    return adjustedDescriptor;
}

class Calculator {
    @LogMethod
    add(a: number, b: number): number {
        return a + b;
    }
    
    @Autobind
    multiply(a: number, b: number): number {
        return a * b;
    }
}
```

### 1.3 属性装饰器
```typescript
// 属性装饰器
function LogProperty(
    target: any,
    propertyName: string
) {
    let value: any;
    
    const getter = function() {
        console.log(`Getting ${propertyName}: ${value}`);
        return value;
    };
    
    const setter = function(newVal: any) {
        console.log(`Setting ${propertyName} to: ${newVal}`);
        value = newVal;
    };
    
    Object.defineProperty(target, propertyName, {
        get: getter,
        set: setter,
        enumerable: true,
        configurable: true
    });
}

// 参数装饰器
function LogParameter(
    target: any,
    methodName: string,
    parameterIndex: number
) {
    console.log(`Parameter decorator for ${methodName}`);
    console.log(`Parameter index: ${parameterIndex}`);
}

class Product {
    @LogProperty
    title: string;
    
    private _price: number;
    
    constructor(title: string, price: number) {
        this.title = title;
        this._price = price;
    }
    
    getPriceWithTax(@LogParameter tax: number): number {
        return this._price * (1 + tax);
    }
}
```

## 2. 命名空间与模块

### 2.1 命名空间
```typescript
// 基础命名空间
namespace Geometry {
    export interface Point {
        x: number;
        y: number;
    }
    
    export class Circle {
        constructor(public center: Point, public radius: number) {}
        
        area(): number {
            return Math.PI * this.radius * this.radius;
        }
    }
    
    export namespace Advanced {
        export function distance(p1: Point, p2: Point): number {
            const dx = p2.x - p1.x;
            const dy = p2.y - p1.y;
            return Math.sqrt(dx * dx + dy * dy);
        }
    }
}

// 使用命名空间
const point: Geometry.Point = { x: 0, y: 0 };
const circle = new Geometry.Circle(point, 5);
console.log(circle.area());
console.log(Geometry.Advanced.distance({ x: 0, y: 0 }, { x: 3, y: 4 }));

// 命名空间合并
namespace Geometry {
    export class Rectangle {
        constructor(
            public topLeft: Point,
            public width: number,
            public height: number
        ) {}
        
        area(): number {
            return this.width * this.height;
        }
    }
}
```

### 2.2 ES6 模块
```typescript
// math.ts - 模块导出
export const PI = 3.14159;

export function add(a: number, b: number): number {
    return a + b;
}

export function multiply(a: number, b: number): number {
    return a * b;
}

// 默认导出
export default class Calculator {
    static square(x: number): number {
        return x * x;
    }
}

// 命名空间风格导出
export * as Geometry from './geometry';

// utils.ts - 模块导入
import Calculator, { PI, add } from './math';
import * as MathUtils from './math';
import { multiply as mul } from './math';

// 动态导入
async function loadMathModule() {
    const math = await import('./math');
    console.log(math.PI);
}
```

## 3. 高级类型技巧

### 3.1 条件类型
```typescript
// 基础条件类型
type TypeName<T> =
    T extends string ? "string" :
    T extends number ? "number" :
    T extends boolean ? "boolean" :
    T extends undefined ? "undefined" :
    T extends Function ? "function" :
    "object";

// infer 关键字
type UnpackPromise<T> = T extends Promise<infer U> ? U : T;
type GetReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

// 分布式条件类型
type ToArray<T> = T extends any ? T[] : never;
type StrOrNumArray = ToArray<string | number>; // string[] | number[]

// 排除条件分布
type ToArrayNonDist<T> = [T] extends [any] ? T[] : never;
type StrOrNumArray2 = ToArrayNonDist<string | number>; // (string | number)[]
```

### 3.2 映射类型
```typescript
// 基础映射类型
type Readonly<T> = {
    readonly [P in keyof T]: T[P];
};

type Partial<T> = {
    [P in keyof T]?: T[P];
};

type Required<T> = {
    [P in keyof T]-?: T[P];
};

// 键重映射
type Getters<T> = {
    [P in keyof T as `get${Capitalize<string & P>}`]: () => T[P];
};

type RemoveKindField<T> = {
    [P in keyof T as Exclude<P, "kind">]: T[P];
};

// 条件映射
type ExtractMethods<T> = {
    [K in keyof T]: T[K] extends Function ? K : never;
}[keyof T];

type FunctionPropertyNames<T> = {
    [K in keyof T]: T[K] extends Function ? K : never;
}[keyof T];

type FunctionProperties<T> = Pick<T, FunctionPropertyNames<T>>;
```

### 3.3 模板字面量类型
```typescript
// 基础模板类型
type Email = `${string}@${string}.${string}`;
type CSSUnit = `${number}px` | `${number}em` | `${number}rem` | `${number}%`;

// 类型推断
type EventName<T extends string> = `${T}Changed`;
type Concat<S1 extends string, S2 extends string> = `${S1}${S2}`;

// 高级模式
type PropEventSource<T> = {
    on<Key extends string & keyof T>(
        eventName: `${Key}Changed`,
        callback: (newValue: T[Key]) => void
    ): void;
};

// 实用类型
type PathImpl<T, Key extends keyof T> =
    Key extends string
    ? T[Key] extends Record<string, any>
      ? `${Key}.${PathImpl<T[Key], Exclude<keyof T[Key], keyof any[]>> & string}`
      : never
    : never;

type Path<T> = PathImpl<T, keyof T> | keyof T;
```

## 4. 实用工具类型

### 4.1 TypeScript 内置工具类型
```typescript
// Partial<T> - 所有属性变为可选
interface User {
    name: string;
    age: number;
    email: string;
}
type PartialUser = Partial<User>;

// Required<T> - 所有属性变为必需
type RequiredUser = Required<PartialUser>;

// Readonly<T> - 所有属性变为只读
type ReadonlyUser = Readonly<User>;

// Record<K, T> - 构造对象类型
type PageInfo = Record<'home' | 'about' | 'contact', { title: string }>;

// Pick<T, K> - 选择部分属性
type UserNameAndEmail = Pick<User, 'name' | 'email'>;

// Omit<T, K> - 排除部分属性
type UserWithoutEmail = Omit<User, 'email'>;

// Exclude<T, U> - 从联合类型中排除
type T0 = Exclude<"a" | "b" | "c", "a">; // "b" | "c"

// Extract<T, U> - 提取联合类型中的子集
type T1 = Extract<"a" | "b" | "c", "a" | "f">; // "a"

// NonNullable<T> - 排除 null 和 undefined
type T2 = NonNullable<string | number | null | undefined>; // string | number

// Parameters<T> - 获取函数参数类型
type T3 = Parameters<(x: number, y: string) => void>; // [number, string]

// ReturnType<T> - 获取函数返回类型
type T4 = ReturnType<() => string>; // string

// InstanceType<T> - 获取构造函数实例类型
class C {
    x = 0;
    y = 0;
}
type T5 = InstanceType<typeof C>; // C

// ThisParameterType<T> - 获取 this 参数类型
function toHex(this: Number) {
    return this.toString(16);
}
type T6 = ThisParameterType<typeof toHex>; // Number

// OmitThisParameter<T> - 移除 this 参数
type T7 = OmitThisParameter<typeof toHex>; // () => string
```

### 4.2 自定义实用类型
```typescript
// 深度可选
type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// 深度只读
type DeepReadonly<T> = {
    readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

// 深度必需
type DeepRequired<T> = {
    [P in keyof T]-?: T[P] extends object ? DeepRequired<T[P]> : T[P];
};

// 可空转不可空
type NonNullableField<T, K extends keyof T> = {
    [P in keyof T]: P extends K ? NonNullable<T[P]> : T[P];
};

// 值类型
type ValueOf<T> = T[keyof T];

// 异步返回值
type AsyncReturnType<T extends (...args: any) => any> = 
    T extends (...args: any) => Promise<infer R> ? R : never;

// 构造函数类型
type Constructor<T = {}> = new (...args: any[]) => T;

// 提取数组元素类型
type ArrayElement<A> = A extends readonly (infer T)[] ? T : never;

// 获取 Promise 的解析类型
type Awaited<T> = T extends PromiseLike<infer U> ? U : T;

// 可选属性转必需
type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };

// 排除 never 类型
type ExcludeNever<T> = Pick<T, { [K in keyof T]: T[K] extends never ? never : K }[keyof T]>;
```

## 5. 错误处理与调试

### 5.1 类型安全的错误处理
```typescript
// Result 模式
type Result<T, E = Error> = 
    | { success: true; value: T }
    | { success: false; error: E };

function safeParseJSON<T = any>(json: string): Result<T> {
    try {
        const value = JSON.parse(json);
        return { success: true, value };
    } catch (error) {
        return { 
            success: false, 
            error: error instanceof Error ? error : new Error(String(error))
        };
    }
}

// Option 类型
type Option<T> = Some<T> | None;

interface Some<T> {
    readonly _tag: 'Some';
    readonly value: T;
}

interface None {
    readonly _tag: 'None';
}

function Some<T>(value: T): Some<T> {
    return { _tag: 'Some', value };
}

const None: None = { _tag: 'None' };

// Either 类型
type Either<L, R> = Left<L> | Right<R>;

interface Left<L> {
    readonly _tag: 'Left';
    readonly left: L;
}

interface Right<R> {
    readonly _tag: 'Right';
    readonly right: R;
}

function Left<L>(left: L): Left<L> {
    return { _tag: 'Left', left };
}

function Right<R>(right: R): Right<R> {
    return { _tag: 'Right', right };
}

// 使用示例
function divide(a: number, b: number): Either<string, number> {
    if (b === 0) {
        return Left("Cannot divide by zero");
    }
    return Right(a / b);
}

const result = divide(10, 2);
if (result._tag === 'Right') {
    console.log('Result:', result.right);
} else {
    console.error('Error:', result.left);
}
```

### 5.2 断言函数
```typescript
// 类型断言函数
function assertIsString(value: any): asserts value is string {
    if (typeof value !== 'string') {
        throw new Error(`Expected string, got ${typeof value}`);
    }
}

function assertIsNumber(value: any): asserts value is number {
    if (typeof value !== 'number') {
        throw new Error(`Expected number, got ${typeof value}`);
    }
}

// 条件断言
function assert(condition: any, message?: string): asserts condition {
    if (!condition) {
        throw new Error(message || 'Assertion failed');
    }
}

// 使用断言
function processInput(input: any) {
    assertIsString(input);
    // 这里 input 被推断为 string 类型
    console.log(input.toUpperCase());
}

// 自定义错误类型
class ValidationError extends Error {
    constructor(
        public field: string,
        message: string
    ) {
        super(message);
        this.name = 'ValidationError';
    }
}

class NetworkError extends Error {
    constructor(
        public status: number,
        message: string
    ) {
        super(message);
        this.name = 'NetworkError';
    }
}

type AppError = ValidationError | NetworkError;

function handleError(error: AppError) {
    if (error instanceof ValidationError) {
        console.error(`Validation error in ${error.field}: ${error.message}`);
    } else if (error instanceof NetworkError) {
        console.error(`Network error ${error.status}: ${error.message}`);
    }
}
```

## 6. 性能优化与最佳实践

### 6.1 类型性能优化
```typescript
// 1. 避免过度使用 any
// ❌ 不好的做法
function processData(data: any): any {
    // ...
}

// ✅ 好的做法
function processData<T>(data: T): T {
    // ...
}

// 2. 使用类型别名而不是接口（对于简单类型）
// ✅ 更高效
type Point = {
    x: number;
    y: number;
};

// 3. 避免深度嵌套的类型
// ❌ 不好的做法
type DeepNestedType = {
    level1: {
        level2: {
            level3: {
                value: string;
            };
        };
    };
};

// ✅ 好的做法
type Level3 = { value: string };
type Level2 = { level3: Level3 };
type Level1 = { level2: Level2 };
type FlatType = { level1: Level1 };

// 4. 使用 const 断言
// ✅ 更好的类型推断
const config = {
    apiUrl: 'https://api.example.com',
    timeout: 5000,
    retries: 3
} as const;

// 5. 避免不必要的泛型约束
// ❌ 不必要的约束
function identity<T extends any>(arg: T): T {
    return arg;
}

// ✅ 简化的泛型
function identity<T>(arg: T): T {
    return arg;
}
```

### 6.2 代码组织最佳实践
```typescript
// 1. 模块组织
// types/ 目录结构
// types/
//   ├── index.ts           // 导出所有类型
//   ├── api.ts            // API 相关类型
//   ├── components.ts     // 组件相关类型
//   └── utils.ts         // 工具类型

// 2. 使用 barrel exports
// types/index.ts
export * from './api';
export * from './components';
export * from './utils';
export * from './enums';

// 3. 避免全局类型污染
// 使用模块而不是全局声明
declare global {
    // ❌ 避免这样做
    interface Window {
        myApp: any;
    }
}

// ✅ 更好的做法
export interface AppConfig {
    // 具体类型定义
}

// 4. 使用命名空间组织内部类型
namespace Internal {
    export type Config = {
        debug: boolean;
        version: string;
    };
    
    export type State = {
        isLoading: boolean;
        data: any;
    };
}

// 5. 文档注释
/**
 * 用户信息接口
 * @interface User
 * @property {string} id - 用户唯一标识
 * @property {string} name - 用户姓名
 * @property {string} email - 用户邮箱
 * @property {Date} createdAt - 创建时间
 */
interface User {
    /** 用户唯一标识 */
    id: string;
    /** 用户姓名 */
    name: string;
    /** 用户邮箱 */
    email: string;
    /** 创建时间 */
    createdAt: Date;
}
```

### 6.3 编译优化配置
```json
{
  "compilerOptions": {
    /* 性能优化相关配置 */
    "skipLibCheck": true,           // 跳过库文件的类型检查
    "skipDefaultLibCheck": true,    // 跳过默认库文件的类型检查
    "incremental": true,            // 启用增量编译
    "tsBuildInfoFile": ".tsbuildinfo", // 构建信息文件位置
    "composite": true,              // 启用项目引用
    "disableSourceOfProjectReferenceRedirect": true,
    "disableSolutionSearching": true,
    
    /* 输出优化 */
    "removeComments": true,         // 移除注释
    "noEmitOnError": true,          // 出错时不生成文件
    "importsNotUsedAsValues": "remove", // 移除未使用的导入
    
    /* 语言特性 */
    "strict": true,                 // 启用所有严格检查
    "noUnusedLocals": true,         // 检查未使用的局部变量
    "noUnusedParameters": true,     // 检查未使用的参数
    "noImplicitReturns": true,      // 检查隐式返回
    "noFallthroughCasesInSwitch": true,
    
    /* 模块解析优化 */
    "moduleResolution": "node",
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "resolveJsonModule": true,
    "isolatedModules": true
  },
  
  /* 文件管理 */
  "include": ["src/**/*"],
  "exclude": [
    "node_modules",
    "dist",
    "build",
    "coverage",
    "**/*.test.ts",
    "**/*.spec.ts"
  ],
  
  /* 项目引用 */
  "references": [
    { "path": "./common" },
    { "path": "./utils" }
  ]
}
```

---
