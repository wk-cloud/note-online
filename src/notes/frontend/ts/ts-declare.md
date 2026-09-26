# declare 关键字

`declare` 在 TypeScript 里的核心作用是：**告诉编译器“这个变量/函数/类/模块在运行时已经存在，你只需要做类型检查，不要生成任何 JavaScript 代码”**。它声明的是一种“环境声明 / ambient declaration”。

## 主要作用

1. **只声明类型，不生成运行时代码**

   ```ts
   declare const VERSION: string;
   ```

   编译后不会生成 `const VERSION = ...`，但 TS 会认为 `VERSION` 存在。

2. **描述那些 TS 不知道的运行时实体**
   比如通过 CDN 引入的全局库：

   ```ts
   declare const jQuery: (selector: string) => any;
   declare function greet(name: string): void;
   ```

3. **声明模块类型**
   给没有类型声明的 JS 库、CSS、图片等资源写类型：

   ```ts
   declare module "legacy-lib" {
     export function doSomething(): void;
   }

   declare module "*.css" {
     const classes: { readonly [key: string]: string };
     export default classes;
   }
   ```

4. **扩展全局作用域**
   在模块文件中扩展 `Window` 等全局接口：

   ```ts
   export {};

   declare global {
     interface Window {
       __CONFIG__: Record<string, any>;
     }
   }
   ```

5. **声明命名空间、类、枚举等**

   ```ts
   declare namespace MyLib {
     function fn(): void;
     const version: string;
   }

   declare class Person {
     name: string;
     constructor(name: string);
   }
   ```

## 常见使用位置

`declare` 最常见于 `.d.ts` 声明文件中，但也可以直接写在 `.ts` 文件里。

- 在 `.d.ts` 中，`interface`、`type` 本身就不生成 JS，通常不需要 `declare`。
- 但 `const`、`let`、`function`、`class`、`namespace`、`module` 等值声明通常要加 `declare`。

## 注意点

- `declare` 声明的变量不能初始化：
  ```ts
  declare const x = 1; // 错误
  ```
- `declare function`、`declare class` 不能有实现体：
  ```ts
  declare function f() {} // 错误
  ```
- 它只是类型层面的“承诺”。如果运行时实际不存在，编译不会报错，但运行时会出错。
- 不要滥用 `declare`。优先使用官方 `@types` 包或正常的 `import type`。

一句话总结：  
**`declare` 用来描述“运行时已经存在但 TS 不知道”的东西，只参与类型检查，不产生 JS 代码。**
