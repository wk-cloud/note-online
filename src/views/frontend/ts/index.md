# TypeScript 全面指南

# 第一部分：快速入门

## 1. TypeScript 简介

### 1.1 TypeScript 是什么？
TypeScript 是一种由微软开发的开源编程语言，它是 JavaScript 的一个超集，主要特点包括：

1. **类型系统**：为 JavaScript 添加了静态类型定义
2. **完全兼容**：任何有效的 JavaScript 代码都是有效的 TypeScript 代码
3. **编译执行**：TS 代码需要通过编译器转换为 JS 才能执行
4. **增强功能**：引入了类、接口、泛型等面向对象特性

### 1.2 为什么选择 TypeScript？
| 特性                     | 优点                                   |
| ------------------------ | -------------------------------------- |
| **静态类型检查**         | 在编译阶段发现错误，减少运行时异常     |
| **代码可维护性**         | 类型注解使代码结构更清晰，便于团队协作 |
| **更好的 IDE 支持**      | 智能提示、代码补全、重构工具更强大     |
| **渐进式采用**           | 可以逐步将 JS 项目迁移到 TS            |
| **现代 JavaScript 特性** | 支持 ES6+ 特性并编译到旧版本浏览器     |

## 2. 开发环境搭建

### 2.1 安装步骤
1. **安装 Node.js**
   
   - [官网下载](https://nodejs.org/)
   - 建议使用 LTS 版本
   
2. **安装 TypeScript 编译器**
   ```bash
   npm install -g typescript
   ```

3. **验证安装**
   ```bash
   tsc --version
   ```

### 2.2 第一个 TypeScript 程序
1. 创建 `hello.ts` 文件：
   ```typescript
   function greet(name: string): string {
       return `Hello, ${name}!`;
   }
   
   console.log(greet("TypeScript"));
   ```

2. 编译 TypeScript：
   ```bash
   tsc hello.ts
   ```

3. 运行 JavaScript：
   ```bash
   node hello.js
   ```

## 3. 基础类型系统

### 3.1 类型声明语法
```typescript
// 变量类型声明
let username: string = "Alice";
let age: number = 25;
let isActive: boolean = true;

// 函数类型声明
function add(x: number, y: number): number {
    return x + y;
}

// 箭头函数类型
const multiply = (a: number, b: number): number => a * b;
```

### 3.2 类型推断
TypeScript 可以自动推断类型：
```typescript
let message = "Hello World";  // 推断为 string
let count = 42;               // 推断为 number
let items = [1, 2, 3];        // 推断为 number[]
```

### 3.3 完整类型表
| 类型       | 示例                       | 描述                         | 使用场景                                                     |
| ---------- | -------------------------- | ---------------------------- | ------------------------------------------------------------ |
| `number`   | `1, -5.3, 0xFF`            | 所有数字类型                 | 数学运算、计数                                               |
| `string`   | `"text", 'text', \`text\`` | 字符串类型                   | 文本处理、显示                                               |
| `boolean`  | `true, false`              | 布尔值                       | 条件判断、开关                                               |
| `any`      | `let x: any = 4;`          | 任意类型                     | 迁移旧代码、第三方库                                         |
| `unknown`  | `let x: unknown = 4;`      | 类型安全的 any               | 替代 any 类型                                                |
| `void`     | `function(): void {}`      | 无返回值                     | 函数没有返回值                                               |
| `never`    | `function(): never {}`     | 永不返回                     | 抛出异常、无限循环                                           |
| `object`   | `{key: value}`             | 非原始类型                   | 通用对象类型                                                 |
| `array`    | `number[], Array<number>`  | 数组类型                     | 列表数据存储                                                 |
| `tuple`    | `[string, number]`         | 固定长度数组                 | 键值对、特定结构                                             |
| `enum`     | `enum Color {Red, Green}`  | 枚举类型                     | 命名常量集合                                                 |
| ``字面量`` | ``其本身``                 | 限制变量的值就是该字面量的值 | 使用字面量去指定变量的类型，通过字面量可以确定变量的取值范围，字面量类似于常量，一旦被定义后，就不能修改 |

### 3.4 类型详解

#### 3.4.1 number 类型

``` typescript
let decimal: number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;
let big: bigint = 100n;
```

#### 3.4.2 boolean 类型

``` typescript
let isDone: boolean = false;
```

#### 3.4.3 string 类型

``` typescript
let color: string = "blue";
color = 'red';

let fullName: string = `Bob Bobbington`;
let age: number = 37;
let sentence: string = `Hello, my name is ${fullName}.

I'll be ${ age + 1} years old next month.`;
```

#### 3.4.4 字面量类型
```typescript
// 精确值类型
let direction: "north" | "south" | "east" | "west";
direction = "north";  // ✅ 正确
direction = "up";     // ❌ 错误

// 数字字面量
let diceRoll: 1 | 2 | 3 | 4 | 5 | 6;
diceRoll = 3;  // ✅ 正确
diceRoll = 7;  // ❌ 错误
```

#### 3.4.5 联合类型与交叉类型

使用 ``|`` 来连接多个类型 (联合类型)，使用 ``&`` 表示同时满足(交叉类型)

```typescript
// 联合类型：可以是多种类型之一
type ID = string | number;
let userId: ID = 123;     // ✅
userId = "abc-123";       // ✅

// 交叉类型：同时满足多种类型
interface Person {
    name: string;
    age: number;
}

interface Employee {
    company: string;
    position: string;
}

type Staff = Person & Employee;
const staff: Staff = {
    name: "Alice",
    age: 30,
    company: "Tech Corp",
    position: "Developer"
};
```

#### 3.4.6 unknown 类型与类型守卫

unknown表示未知类型的值，unknown 实际上就是一个 ``类型安全的any``，它不能直接赋值给其他变量，必须进行类型判断或者类型断言后才能赋值

```typescript
let userInput: unknown;
let userName: string;

// ❌ 错误：不能直接赋值
// userName = userInput;

// ✅ 正确：使用类型守卫
if (typeof userInput === "string") {
    userName = userInput;
}

// ✅ 正确：使用类型断言
userName = userInput as string;
userName = <string>userInput;  // 另一种语法
```

#### 3.4.7 void 类型

用来表示空，以函数为例，就表示函数没有返回值

``` typescript
let unusable: void = undefined;
```

``` typescript
// 没有返回值
function fun(): void{
}
```

``` typescript
// 返回值是 boolean 类型
function fun1(): boolean{
	return true;
}

// 返回值是 true | 1 
function fun2(a: number) {
	if(a === 1){
		return true;
	}else {
		return 1;
	}
}
```

#### 3.4.8 any 类型

any 表示的是任意类型，一个变量设置类型为 any 后，相当于对该变量关闭了ts的类型检测。

使用 ts时，不建议使用 any 类型

``` typescript
let d: any = 4;
d = 'hello';
d = true;
```

``` typescript
// 明变量如果不指定类型，则ts解析器会自动判断变量的类型为any（隐式any）
let d;
d = 10;
d = "test";
d = true
```

#### 3.4.9 never 类型的应用

 never 表示永远不会返回结果，一般用于函数抛出异常

```typescript
// 场景1：总是抛出异常
function throwError(message: string): never {
    throw new Error(message);
}

// 场景2：无限循环
function infiniteLoop(): never {
    while (true) {
        // 执行某些操作
    }
}

// 场景3：类型检查的穷尽性检查
type Shape = "circle" | "square" | "triangle";

function getArea(shape: Shape): number {
    switch (shape) {
        case "circle":
            return Math.PI * 10 * 10;
        case "square":
            return 10 * 10;
        case "triangle":
            return 0.5 * 10 * 10;
        default:
            // 如果 Shape 类型扩展了但这里没处理，TypeScript 会报错
            const exhaustiveCheck: never = shape;
            return exhaustiveCheck;
    }
}
```

#### 3.4.10 object 类型详解

``` typescript
// object 表示一个js对象（不常用）
let obj : object;
obj = {}; // 允许
obj = function(){}; // 允许

// {} 用来指定对象中可以包含哪些属性
// 语法：{属性名 ：属性值,属性名 : 属性值}
let obj1 : {name:string};
obj1 = {}; // 不允许
obj1 = {name: '孙悟空'}; // 允许
obj1 = {name: '孙悟空',age: 18} // 不允许

// 在属性名后边加上?，表示属性是可选的
let obj2 : {name : string,age ?: number};
obj2 = {name: '孙悟空'}; // 允许
obj2 = {name: '孙悟空',age: 18} // 允许

// [propName：string]:any  表示任意类型的属性
let obj3 : {name: string, [propName: string]: any};
obj3 = {name: '猪八戒',age: 18,gender: '男'}

// 设置函数的结构的类型声明
/**
 * 语法：(形参:类型, 形参:类型,...) => 返回值
 */
let fun3 : (a:number, b:number) => number;
fun3 = function(){}; // 不允许
fun3 = function(a:number,b:number):number{
	return a + b;
} // 允许
fun3 = function(a:number,b:number,c:number):number{
	return a + b + c;
} // 不允许
```

```typescript
// 基础对象类型
let person: {
    name: string;
    age: number;
    isStudent?: boolean;  // 可选属性
    readonly id: number;  // 只读属性
    [key: string]: any;   // 索引签名
} = {
    name: "Bob",
    age: 25,
    id: 12345
};

// 函数类型定义
type MathFunction = (x: number, y: number) => number;

const add: MathFunction = (a, b) => a + b;
const multiply: MathFunction = (a, b) => a * b;

// 构造签名
interface ClockConstructor {
    new (hour: number, minute: number): ClockInterface;
}

interface ClockInterface {
    tick(): void;
}

function createClock(
    ctor: ClockConstructor,
    hour: number,
    minute: number
): ClockInterface {
    return new ctor(hour, minute);
}
```

#### 3.4.11 数组与元组

元祖就是固定长度的数组

```typescript
// 数组的多种声明方式
let list1: number[] = [1, 2, 3];
let list2: Array<number> = [1, 2, 3];
let list3: (number | string)[] = [1, "two", 3];

// 只读数组
let readonlyArray: ReadonlyArray<number> = [1, 2, 3];
// readonlyArray.push(4);  // ❌ 错误：只读数组不能修改

// 元组：固定长度和类型的数组
let coordinates: [number, number] = [40.7128, -74.0060];
let personInfo: [string, number, boolean] = ["Alice", 30, true];

// 带可选元素的元组
let optionalTuple: [string, number?][] = [
    ["Alice", 30],
    ["Bob"]  // 第二个元素可选
];

// 元组的剩余元素
type StringNumberBooleans = [string, number, ...boolean[]];
const snb: StringNumberBooleans = ["hello", 1, true, false, true];
```

#### 3.4.12 枚举类型进阶
```typescript
// 数字枚举（默认从0开始）
enum Direction {
    Up,      // 0
    Down,    // 1
    Left,    // 2
    Right    // 3
}

// 字符串枚举
enum MediaType {
    JSON = "application/json",
    XML = "application/xml",
    PDF = "application/pdf"
}

// 常量枚举（编译时会被完全移除）
const enum Size {
    Small = "S",
    Medium = "M",
    Large = "L"
}

// 计算的和常量成员
enum FileAccess {
    None,
    Read = 1 << 1,
    Write = 1 << 2,
    ReadWrite = Read | Write
}

// 反向映射
enum Enum {
    A
}
let a = Enum.A;       // 0
let nameOfA = Enum[a]; // "A"
```

#### 3.4.13 类型断言

有些情况下，变量的类型对于我们来说是很明确，但是TS编译器却并不清楚，此时，可以通过类型断言来告诉编译器变量的类型，断言有两种形式：

**第一种**

``` typescript
let someValue: unknown = "this is a string";
let strLength: number = (someValue as string).length;
```

**第二种**

``` typescript
let someValue: unknown = "this is a string";
let strLength: number = (<string>someValue).length;
```

#### 3.4.14 类型别名

``` typescript
// 类型的别名
type myType = string;
let m: myType;
m = "hello"; // 允许
m = 123; // 不允许

type myType1 = 1 | 2 | 3 | 4 | 5;
let l: myType1;
l = 1; // 允许
l = 2; // 允许
l = 3; // 允许
l = 4; // 允许
l = 5; // 允许
l = 6; // 不允许
```

```typescript
// 基础类型别名
type StringOrNumber = string | number;
type Callback<T> = (data: T) => void;
type Nullable<T> = T | null;

// 复杂类型组合
type Vehicle = {
    brand: string;
    year: number;
};

type Car = Vehicle & {
    doors: number;
    type: "sedan" | "suv" | "truck";
};

// 条件类型
type IsString<T> = T extends string ? true : false;
type Result1 = IsString<string>;  // true
type Result2 = IsString<number>;  // false
```

## 4. 编译配置详解

### 4.1 基本编译命令
```bash
# 编译单个文件
tsc app.ts

# 监视模式（自动重新编译）
tsc app.ts --watch
tsc app.ts -w

# 编译整个项目
tsc

# 指定配置文件
tsc --project tsconfig.prod.json
```

### 4.2 tsconfig.json 完整配置示例
```json
{
  "compilerOptions": {
    /* 基本选项 */
    "target": "ES2020",                    // 编译目标版本
    "module": "ESNext",                    // 模块系统
    "lib": ["ES2020", "DOM", "DOM.Iterable"], // 包含的库文件
    "allowJs": true,                       // 允许编译 JS 文件
    "checkJs": true,                       // 检查 JS 文件类型
    "jsx": "react",                        // JSX 支持
    "declaration": true,                   // 生成声明文件
    "declarationMap": true,                // 声明文件 sourcemap
    "sourceMap": true,                     // 生成 sourcemap
    "outFile": "./dist/bundle.js",         // 合并输出文件
    "outDir": "./dist",                    // 输出目录
    "rootDir": "./src",                    // 根目录
    "removeComments": true,                // 移除注释
    
    /* 严格类型检查选项 */
    "strict": true,                        // 启用所有严格检查
    "noImplicitAny": true,                 // 禁止隐式 any
    "strictNullChecks": true,              // 严格空值检查
    "strictFunctionTypes": true,           // 严格函数类型检查
    "strictBindCallApply": true,           // 严格 bind/call/apply 检查
    "strictPropertyInitialization": true,  // 严格属性初始化
    "noImplicitThis": true,                // 禁止隐式 this
    "alwaysStrict": true,                  // 总是使用严格模式
    
    /* 额外检查 */
    "noUnusedLocals": true,                // 检查未使用的局部变量
    "noUnusedParameters": true,            // 检查未使用的参数
    "noImplicitReturns": true,             // 检查函数是否隐式返回
    "noFallthroughCasesInSwitch": true,    // 检查 switch 语句的 fallthrough
    
    /* 模块解析选项 */
    "moduleResolution": "node",            // 模块解析策略
    "baseUrl": "./",                       // 基础路径
    "paths": {                             // 路径映射
      "@/*": ["src/*"],
      "@components/*": ["src/components/*"]
    },
    "rootDirs": ["src", "generated"],      // 多根目录
    "typeRoots": ["./typings", "./node_modules/@types"], // 类型声明根目录
    "types": ["node", "jest"],             // 包含的类型声明包
    "allowSyntheticDefaultImports": true,  // 允许默认导入
    "esModuleInterop": true,               // 启用 ES 模块互操作
    "preserveSymlinks": true,              // 保留符号链接
    
    /* 实验性选项 */
    "experimentalDecorators": true,        // 启用装饰器
    "emitDecoratorMetadata": true,         // 生成装饰器元数据
    
    /* 高级选项 */
    "skipLibCheck": true,                  // 跳过库文件检查
    "forceConsistentCasingInFileNames": true, // 强制文件名大小写一致
    "resolveJsonModule": true,             // 解析 JSON 模块
    "isolatedModules": true,               // 隔离模块
    "allowUmdGlobalAccess": true           // 允许访问 UMD 全局变量
  },
  
  /* 文件包含/排除 */
  "include": [
    "src/**/*.ts",
    "src/**/*.tsx",
    "tests/**/*.ts"
  ],
  /* 需要排除在外的目录 */
  "exclude": [
    "node_modules",
    "dist",
    "**/*.spec.ts",
    "**/*.test.ts"
  ],
  
  /* 扩展配置 */
  "extends": "./tsconfig.base.json",
  
  /* 文件引用: 指定被编译文件的列表，只有需要编译的文件少时才会用到 */
  "files": [
    "src/core.ts",
    "src/main.ts"
  ],
  
  /* 编译特定选项 */
  "references": [
    { "path": "./common" },
    { "path": "./services" }
  ],
  
  /* 构建选项 */
  "buildOptions": {
    "incremental": true,                   // 增量编译
    "tsBuildInfoFile": "./dist/.tsbuildinfo", // 构建信息文件
    "disableSolutionSearching": true,      // 禁用解决方案搜索
    "disableReferencedProjectLoad": true   // 禁用引用项目加载
  }
}
```

### 4.3 不同环境的配置
```json
// tsconfig.prod.json - 生产环境配置
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "removeComments": true,
    "noEmitOnError": true,
    "sourceMap": false,
    "declaration": false
  }
}

// tsconfig.dev.json - 开发环境配置
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "removeComments": false,
    "sourceMap": true,
    "incremental": true
  }
}
```

## 5. 构建工具集成

### 5.1 Webpack 集成配置

通常情况下，实际开发中我们都需要使用构建工具对代码进行打包，TS同样也可以结合构建工具一起使用，下边以webpack为例介绍一下如何结合构建工具使用TS。

1. 初始化项目

   - 主要作用：创建package.json文件
   - 进入项目根目录，执行命令 `npm init -y`

2. 下载构建工具

   ``` shell
   npm i -D webpack webpack-cli webpack-dev-server typescript ts-loader clean-webpack-plugin
   ```

   共安装了7个包：

   - webpack：构建工具webpack
   - webpack-cli：webpack的命令行工具
   - webpack-dev-server：webpack的开发服务器
   - typescript：ts编译器
   - ts-loader：ts加载器，用于在webpack中编译ts文件
   - html-webpack-plugin：webpack中html插件，用来自动创建html文件
   - clean-webpack-plugin：webpack中的清除插件，每次构建都会先清除目录

3. 根目录下创建webpack的配置文件webpack.config.js

```javascript
// webpack.config.js - 完整配置
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';
  
  return {
    // 入口配置
    entry: {
      main: './src/index.ts',
      vendor: ['react', 'react-dom']
    },
    
    // 输出配置
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: isProduction 
        ? '[name].[contenthash].js' 
        : '[name].js',
      chunkFilename: isProduction
        ? '[name].[contenthash].chunk.js'
        : '[name].chunk.js',
      publicPath: '/',
      globalObject: 'this'
    },
    
    // 开发工具
    devtool: isProduction 
      ? 'source-map' 
      : 'cheap-module-eval-source-map',
    
    // 开发服务器
    devServer: {
      contentBase: './dist',
      hot: true,
      open: true,
      port: 3000,
      historyApiFallback: true,
      compress: true,
      stats: 'minimal'
    },
    
    // 解析配置
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@components': path.resolve(__dirname, 'src/components')
      },
      modules: [
        path.resolve(__dirname, 'src'),
        'node_modules'
      ]
    },
    
    // 模块规则
    module: {
      rules: [
        // TypeScript 规则
        {
          test: /\.tsx?$/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: [
                  ['@babel/preset-env', {
                    targets: {
                      browsers: ['last 2 versions', '> 1%', 'not dead']
                    },
                    useBuiltIns: 'usage',
                    corejs: 3
                  }],
                  '@babel/preset-react',
                  '@babel/preset-typescript'
                ],
                plugins: [
                  '@babel/plugin-proposal-class-properties',
                  '@babel/plugin-proposal-optional-chaining',
                  '@babel/plugin-syntax-dynamic-import'
                ]
              }
            }
          ],
          exclude: /node_modules/
        },
        
        // CSS 规则
        {
          test: /\.css$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: {
                  auto: true,
                  localIdentName: isProduction
                    ? '[hash:base64]'
                    : '[path][name]__[local]'
                }
              }
            },
            'postcss-loader'
          ]
        },
        
        // 图片资源
        {
          test: /\.(png|jpg|jpeg|gif|svg)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 8192,
                name: 'assets/[name].[hash:8].[ext]'
              }
            }
          ]
        },
        
        // 字体文件
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: ['file-loader']
        }
      ]
    },
    
    // 插件配置
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: './public/index.html',
        favicon: './public/favicon.ico',
        minify: isProduction ? {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true
        } : undefined
      }),
      new ForkTsCheckerWebpackPlugin({
        typescript: {
          configFile: './tsconfig.json',
          diagnosticOptions: {
            semantic: true,
            syntactic: true
          }
        }
      })
    ],
    
    // 优化配置
    optimization: {
      minimize: isProduction,
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all'
          },
          commons: {
            name: 'commons',
            minChunks: 2,
            chunks: 'async',
            reuseExistingChunk: true
          }
        }
      },
      runtimeChunk: {
        name: 'runtime'
      }
    },
    
    // 性能提示
    performance: {
      hints: isProduction ? 'warning' : false,
      maxAssetSize: 244 * 1024,
      maxEntrypointSize: 244 * 1024
    },
    
    // 外部依赖
    externals: {
      jquery: 'jQuery'
    }
  };
};
```

4. 根目录下创建tsconfig.json，配置可以根据自己需要修改

   ``` json
   {
       "compilerOptions": {
           "target": "ES2015",
           "module": "ES2015",
           "strict": true
       }
   }
   ```

5. 修改 package.json 脚本配置

```json
{
  "scripts": {
    "start": "cross-env NODE_ENV=development webpack serve --config webpack.config.js",
    "build": "cross-env NODE_ENV=production webpack --config webpack.config.js",
    "build:analyze": "cross-env NODE_ENV=production ANALYZE=true webpack --config webpack.config.js",
    "test": "jest",
    "test:coverage": "jest --coverage",
    "lint": "eslint src/**/*.{ts,tsx}",
    "lint:fix": "eslint src/**/*.{ts,tsx} --fix",
    "type-check": "tsc --noEmit",
    "type-check:watch": "tsc --noEmit --watch"
  }
}
```

**postcss.config.js：**
```javascript
module.exports = {
  plugins: [
    require('autoprefixer'),
    require('cssnano')({
      preset: 'default'
    })
  ]
};
```

6. 在src下创建ts文件，并在并命令行执行```npm run build```对代码进行编译，或者执行```npm start```来启动开发服务器

### 5.2 Babel 基础使用

经过一系列的配置，使得 TS 和webpack已经结合到了一起，除了webpack，开发中还经常需要结合babel来对代码进行转换以使其可以兼容到更多的浏览器，在上述步骤的基础上，通过以下步骤再将babel引入到项目中。

1. 安装依赖包：

   ``` shell
   npm i -D @babel/core @babel/preset-env babel-loader core-js
   ```

   共安装了4个包，分别是：

   - @babel/core：babel的核心工具
   - @babel/preset-env：babel的预定义环境
   - @babel-loader：babel在webpack中的加载器
   - core-js：core-js用来使老版本的浏览器支持新版ES语法

2. 修改webpack.config.js配置文件

   ``` json
   ...略...
   module: {
       rules: [
           {
               test: /\.ts$/,
               use: [
                   {
                       loader: "babel-loader",
                       options:{
                           presets: [
                               [
                                   "@babel/preset-env",
                                   {
                                       "targets":{
                                           "chrome": "58",
                                           "ie": "11"
                                       },
                                       "corejs":"3",
                                       "useBuiltIns": "usage"
                                   }
                               ]
                           ]
                       }
                   },
                   {
                       loader: "ts-loader",
   
                   }
               ],
               exclude: /node_modules/
           }
       ]
   }
   ...略...
   ```

   如此一来，使用ts编译后的文件将会再次被babel处理，使得代码可以在大部分浏览器中直接使用，可以在配置选项的targets中指定要兼容的浏览器版本。

``` js
// 引入一个包
const path = require('path');
// 引入 html-webpack-plugin 插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 引入 clean 插件
const {
	CleanWebpackPlugin
} = require('clean-webpack-plugin');
// webpack中的所有配置信息都应该写在module.exports中
module.exports = {
	// 指定入口文件
	entry: './src/index.ts',
	// 指定打包文件所在目录
	output: {
		// 指定打包后的目录
		path: path.resolve(__dirname, 'dist'),
		// 打包后的文件名称
		filename: 'bundle.js',
		// 告诉 webpack 不使用箭头函数
		environment: {
			arrowFunction: false,
		}
	},
	// 指定 webpack 打包时要使用的模块
	module: {
		// 指定要加载的规则
		rules: [{
			// test指定的是规则生效的文件
			test: /\.ts$/,
			// 配置要使用的loader,按照数组从后往前执行
			use: [{
				// 指定加载器
				loader: 'babel-loader',
				// 设置babel
				options: {
					// 设置预定义的环境
					presets: [
						[
							// 指定环境插件
							"@babel/preset-env",
							// 配置信息
							{
								// 要兼容的目标浏览器
								"targets": {
									"chrome":"88",
									"ie":"11"
								},
								// 指定 corejs 的版本
								"corejs": "3",
								// 使用corejs的方式，"usage"表示按需加载
								"useBuiltIns": "usage"
							}
						]
					]
				}
			}, 'ts-loader'],
			// 要排除的文件夹
			exclude: /node_modules/
		}]
	},
	// 配置 webpack插件
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			// title: '这是一个自定义的title',
			template: './src/index.html'
		}),
	],

	// 用来设置引用模块
	resolve: {
		extensions: ['.ts', '.js']
	}
}
```

### 5.3 Babel 高级配置

```javascript
// babel.config.js
module.exports = (api) => {
  // 缓存配置
  api.cache.using(() => process.env.NODE_ENV);
  
  const presets = [
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: [
            'last 2 versions',
            '> 1%',
            'not dead',
            'not op_mini all'
          ]
        },
        useBuiltIns: 'usage',
        corejs: { version: 3, proposals: true }
      }
    ],
    '@babel/preset-typescript',
    '@babel/preset-react'
  ];
  
  const plugins = [
    // 提案特性
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-nullish-coalescing-operator',
    '@babel/plugin-proposal-logical-assignment-operators',
    '@babel/plugin-proposal-numeric-separator',
    '@babel/plugin-proposal-throw-expressions',
    
    // 优化和转换
    '@babel/plugin-transform-runtime',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-transform-modules-commonjs',
    
    // 开发工具
    process.env.NODE_ENV === 'development' && 'react-refresh/babel'
  ].filter(Boolean);
  
  return {
    presets,
    plugins,
    // 排除第三方库的转换
    exclude: /node_modules\/(?!(my-module|another-module)\/).*/,
    
    // 源代码映射
    sourceMaps: true,
    retainLines: true
  };
};
```

---

# 第二部分：面向对象编程

## 1. 类与对象

### 1.1 类的基本定义
```typescript
// 基础类定义
class Person {
    // 属性声明
    name: string;
    age: number;
    private id: number;
    protected email: string;
    public readonly createdAt: Date;
    
    // 静态属性
    static species: string = "Homo sapiens";
    private static instanceCount: number = 0;
    
    // 构造函数
    constructor(name: string, age: number, email: string) {
        this.name = name;
        this.age = age;
        this.email = email;
        this.id = Math.random();
        this.createdAt = new Date();
        Person.instanceCount++;
    }
    
    // 实例方法
    greet(): string {
        return `Hello, my name is ${this.name}`;
    }
    
    // 私有方法
    private validateEmail(): boolean {
        return this.email.includes('@');
    }
    
    // 受保护的方法
    protected getFormattedEmail(): string {
        return `Email: ${this.email}`;
    }
    
    // 静态方法
    static getInstanceCount(): number {
        return Person.instanceCount;
    }
    
    // Getter 和 Setter
    get fullInfo(): string {
        return `${this.name}, ${this.age} years old`;
    }
    
    set updateName(newName: string) {
        if (newName.length >= 2) {
            this.name = newName;
        } else {
            throw new Error('Name must be at least 2 characters long');
        }
    }
    
    // 抽象方法模式（通过接口实现）
    abstractMethod?(): void; // 可选抽象方法
}

// 使用类
const person = new Person("Alice", 30, "alice@example.com");
console.log(person.greet());
console.log(person.fullInfo);
console.log(Person.species);
console.log(Person.getInstanceCount());
```

### 1.2 构造函数参数属性
```typescript
// 简化的类定义（参数属性）
class Employee {
    // 直接在构造函数中定义属性
    constructor(
        public name: string,
        private department: string,
        protected salary: number,
        readonly employeeId: string
    ) {}
    
    getDetails(): string {
        return `${this.name} works in ${this.department}`;
    }
}

// 等价于传统的写法
class TraditionalEmployee {
    public name: string;
    private department: string;
    protected salary: number;
    readonly employeeId: string;
    
    constructor(
        name: string,
        department: string,
        salary: number,
        employeeId: string
    ) {
        this.name = name;
        this.department = department;
        this.salary = salary;
        this.employeeId = employeeId;
    }
}
```

### 1.3 访问器装饰器
```typescript
function LogAccess(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalGet = descriptor.get;
    const originalSet = descriptor.set;
    
    if (originalGet) {
        descriptor.get = function() {
            console.log(`Getting ${propertyKey}`);
            return originalGet.call(this);
        };
    }
    
    if (originalSet) {
        descriptor.set = function(value: any) {
            console.log(`Setting ${propertyKey} to ${value}`);
            originalSet.call(this, value);
        };
    }
    
    return descriptor;
}

class Product {
    private _price: number = 0;
    
    @LogAccess
    get price(): number {
        return this._price;
    }
    
    @LogAccess
    set price(value: number) {
        if (value >= 0) {
            this._price = value;
        }
    }
}
```

## 2. 继承与多态

### 2.1 基础继承
```typescript
// 基类
class Animal {
    constructor(
        public name: string,
        public age: number,
        protected species: string
    ) {}
    
    // 公共方法
    makeSound(): string {
        return "Some generic animal sound";
    }
    
    // 受保护的方法（子类可用）
    protected getInfo(): string {
        return `${this.name} is a ${this.species}`;
    }
    
    // 静态方法继承
    static describe(): string {
        return "This is an Animal class";
    }
}

// 派生类
class Dog extends Animal {
    private breed: string;
    
    constructor(name: string, age: number, breed: string) {
        super(name, age, "Canine"); // 必须首先调用 super()
        this.breed = breed;
    }
    
    // 方法重写
    makeSound(): string {
        return "Woof! Woof!";
    }
    
    // 新增方法
    fetch(item: string): string {
        return `${this.name} fetched the ${item}`;
    }
    
    // 访问基类受保护的方法
    getDogInfo(): string {
        return `${this.getInfo()} of breed ${this.breed}`;
    }
    
    // 重写静态方法
    static describe(): string {
        return "This is a Dog class";
    }
}

// 多层继承
class GermanShepherd extends Dog {
    constructor(name: string, age: number) {
        super(name, age, "German Shepherd");
    }
    
    // 进一步重写方法
    makeSound(): string {
        return "Deep Woof!";
    }
    
    // 新增特有方法
    guard(): string {
        return `${this.name} is guarding the house`;
    }
}

// 使用示例
const dog = new Dog("Buddy", 3, "Golden Retriever");
console.log(dog.makeSound()); // "Woof! Woof!"
console.log(dog.fetch("ball")); // "Buddy fetched the ball"
console.log(dog.getDogInfo()); // "Buddy is a Canine of breed Golden Retriever"

const shepherd = new GermanShepherd("Rex", 4);
console.log(shepherd.makeSound()); // "Deep Woof!"
console.log(shepherd.guard()); // "Rex is guarding the house"
```

### 2.2 抽象类

抽象类是专门用来被其他类所继承的类，它只能被其他类所继承不能用来创建实例。抽象方法没有方法体只能定义在抽象类中，继承抽象类时抽象方法必须要实现。

```typescript
// 抽象基类
abstract class Shape {
    constructor(public color: string) {}
    
    // 抽象方法（必须由子类实现）
    abstract getArea(): number;
    abstract getPerimeter(): number;
    
    // 具体方法
    describe(): string {
        return `A ${this.color} shape`;
    }
    
    // 静态方法
    static compareArea(shape1: Shape, shape2: Shape): number {
        return shape1.getArea() - shape2.getArea();
    }
}

// 具体子类
class Circle extends Shape {
    constructor(color: string, public radius: number) {
        super(color);
    }
    
    // 实现抽象方法
    getArea(): number {
        return Math.PI * this.radius * this.radius;
    }
    
    getPerimeter(): number {
        return 2 * Math.PI * this.radius;
    }
    
    // 重写具体方法
    describe(): string {
        return `${super.describe()} with radius ${this.radius}`;
    }
}

class Rectangle extends Shape {
    constructor(
        color: string,
        public width: number,
        public height: number
    ) {
        super(color);
    }
    
    // 实现抽象方法
    getArea(): number {
        return this.width * this.height;
    }
    
    getPerimeter(): number {
        return 2 * (this.width + this.height);
    }
    
    // 新增方法
    isSquare(): boolean {
        return this.width === this.height;
    }
}

// 使用抽象类
const circle = new Circle("red", 5);
const rectangle = new Rectangle("blue", 4, 6);

console.log(circle.getArea()); // 78.53981633974483
console.log(rectangle.getPerimeter()); // 20
console.log(Shape.compareArea(circle, rectangle)); // 58.53981633974483
```

### 2.3 多态与类型守卫
```typescript
// 多态示例
class Vehicle {
    constructor(public brand: string) {}
    
    startEngine(): string {
        return "Starting vehicle engine...";
    }
}

class Car extends Vehicle {
    constructor(brand: string, public doors: number) {
        super(brand);
    }
    
    startEngine(): string {
        return `Starting ${this.brand} car with ${this.doors} doors...`;
    }
    
    honk(): string {
        return "Beep beep!";
    }
}

class Motorcycle extends Vehicle {
    constructor(brand: string, public hasSidecar: boolean) {
        super(brand);
    }
    
    startEngine(): string {
        return `Starting ${this.brand} motorcycle...`;
    }
    
    wheelie(): string {
        return "Doing a wheelie!";
    }
}

// 多态使用
const vehicles: Vehicle[] = [
    new Car("Toyota", 4),
    new Motorcycle("Harley", false),
    new Car("Honda", 2)
];

vehicles.forEach(vehicle => {
    console.log(vehicle.startEngine());
    
    // 类型守卫检查
    if (vehicle instanceof Car) {
        console.log(vehicle.honk());
    }
    
    if (vehicle instanceof Motorcycle) {
        console.log(vehicle.wheelie());
    }
});

// 自定义类型守卫
function isCar(vehicle: Vehicle): vehicle is Car {
    return (vehicle as Car).honk !== undefined;
}

function isMotorcycle(vehicle: Vehicle): vehicle is Motorcycle {
    return (vehicle as Motorcycle).wheelie !== undefined;
}

// 使用自定义类型守卫
vehicles.forEach(vehicle => {
    if (isCar(vehicle)) {
        console.log(`This car has ${vehicle.doors} doors`);
    } else if (isMotorcycle(vehicle)) {
        console.log(`This motorcycle ${vehicle.hasSidecar ? 'has' : 'does not have'} a sidecar`);
    }
});
```

## 3. 接口

接口的作用类似于抽象类，不同点在于接口中的所有方法和属性都是没有实值的，换句话说接口中的所有方法都是抽象方法。接口主要负责定义一个类的结构，接口可以去限制一个对象的接口，对象只有包含接口中定义的所有属性和方法时才能匹配接口。同时，可以让一个类去实现接口，实现接口时类中要保护接口中的所有属性。

### 3.1 基础接口
```typescript
// 对象类型接口
interface User {
    readonly id: number;           // 只读属性
    name: string;                 // 必需属性
    email: string;                // 必需属性
    age?: number;                 // 可选属性
    [key: string]: any;           // 索引签名
}

// 函数类型接口
interface SearchFunction {
    (source: string, subString: string): boolean;
}

// 可索引类型接口
interface StringArray {
    [index: number]: string;
    length: number;
}

// 类类型接口
interface ClockInterface {
    currentTime: Date;
    setTime(d: Date): void;
}

// 构造函数接口
interface ClockConstructor {
    new (hour: number, minute: number): ClockInterface;
}

// 混合类型接口
interface Counter {
    (start: number): string;      // 函数调用签名
    interval: number;             // 属性
    reset(): void;                // 方法
}

// 接口继承
interface Shape {
    color: string;
}

interface PenStroke {
    penWidth: number;
}

interface Square extends Shape, PenStroke {
    sideLength: number;
}

// 实现接口
class DigitalClock implements ClockInterface {
    currentTime: Date = new Date();
    
    setTime(d: Date): void {
        this.currentTime = d;
    }
}

// 使用接口
function printUser(user: User): void {
    console.log(`User: ${user.name}, Email: ${user.email}`);
    if (user.age) {
        console.log(`Age: ${user.age}`);
    }
}

const mySearch: SearchFunction = function(src, sub) {
    return src.search(sub) > -1;
};

const square: Square = {
    color: "blue",
    penWidth: 5.0,
    sideLength: 10
};
```

### 3.2 高级接口特性
```typescript
// 可选属性和只读属性
interface Config {
    readonly apiUrl: string;
    timeout?: number;
    retryCount?: number;
    headers?: Record<string, string>;
}

// 函数接口
interface Transformer<T, U> {
    (input: T): U;
}

// 构造器接口
interface AnimalConstructor {
    new (name: string): Animal;
}

// 混合接口
interface Dictionary {
    [key: string]: any;
    size: number;
    clear(): void;
}

// 接口继承多个接口
interface Drawable {
    draw(): void;
}

interface Resizable {
    resize(scale: number): void;
}

interface UIElement extends Drawable, Resizable {
    position: { x: number; y: number };
}

// 实现多个接口
class Button implements Drawable, Resizable {
    position = { x: 0, y: 0 };
    
    draw(): void {
        console.log("Drawing button");
    }
    
    resize(scale: number): void {
        console.log(`Resizing to scale ${scale}`);
    }
}

// 接口作为约束
interface Lengthwise {
    length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);
    return arg;
}

// 接口与类型别名区别
type StringOrNumber = string | number;
type Text = string | { text: string };

// 接口可以重复声明（自动合并）
interface Box {
    height: number;
    width: number;
}

interface Box {
    scale: number;
    // height: string; // 错误：后续属性声明必须类型相同
}

const box: Box = {
    height: 5,
    width: 6,
    scale: 10
};
```

### 3.3 接口的实际应用
```typescript
// API 响应接口
interface ApiResponse<T = any> {
    data: T;
    status: number;
    message: string;
    timestamp: string;
    pagination?: {
        page: number;
        pageSize: number;
        total: number;
        totalPages: number;
    };
}

// 用户相关接口
interface UserProfile {
    id: string;
    username: string;
    email: string;
    avatar?: string;
    createdAt: Date;
    updatedAt: Date;
}

interface LoginCredentials {
    email: string;
    password: string;
    rememberMe?: boolean;
}

// 服务层接口
interface UserService {
    login(credentials: LoginCredentials): Promise<ApiResponse<UserProfile>>;
    logout(): Promise<ApiResponse<void>>;
    getProfile(userId: string): Promise<ApiResponse<UserProfile>>;
    updateProfile(userId: string, data: Partial<UserProfile>): Promise<ApiResponse<UserProfile>>;
}

// 组件 Props 接口
interface ButtonProps {
    text: string;
    onClick: () => void;
    type?: 'primary' | 'secondary' | 'danger';
    disabled?: boolean;
    loading?: boolean;
    icon?: React.ReactNode;
    className?: string;
}

// 状态管理接口
interface AppState {
    user: UserProfile | null;
    isLoading: boolean;
    error: string | null;
    theme: 'light' | 'dark';
    language: string;
}

interface AppActions {
    setUser: (user: UserProfile | null) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    toggleTheme: () => void;
    setLanguage: (lang: string) => void;
}

// 表单验证接口
interface ValidationRule {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    validate?: (value: any) => boolean | string;
}

interface FormField<T = any> {
    value: T;
    error?: string;
    touched: boolean;
    rules?: ValidationRule[];
}

// 实现示例
class UserServiceImpl implements UserService {
    async login(credentials: LoginCredentials): Promise<ApiResponse<UserProfile>> {
        // API 调用逻辑
        return {
            data: {
                id: '123',
                username: credentials.email.split('@')[0],
                email: credentials.email,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            status: 200,
            message: 'Login successful',
            timestamp: new Date().toISOString()
        };
    }
    
    async logout(): Promise<ApiResponse<void>> {
        return {
            data: undefined,
            status: 200,
            message: 'Logout successful',
            timestamp: new Date().toISOString()
        };
    }
    
    async getProfile(userId: string): Promise<ApiResponse<UserProfile>> {
        // 实现获取用户资料逻辑
        return {
            data: {
                id: userId,
                username: 'testuser',
                email: 'test@example.com',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            status: 200,
            message: 'Profile retrieved',
            timestamp: new Date().toISOString()
        };
    }
    
    async updateProfile(userId: string, data: Partial<UserProfile>): Promise<ApiResponse<UserProfile>> {
        // 实现更新用户资料逻辑
        return {
            data: {
                id: userId,
                username: data.username || 'testuser',
                email: data.email || 'test@example.com',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            status: 200,
            message: 'Profile updated',
            timestamp: new Date().toISOString()
        };
    }
}
```

## 4. 泛型

### 4.1 基础泛型
```typescript
// 泛型函数
function identity<T>(arg: T): T {
    return arg;
}

// 泛型接口
interface GenericIdentityFn<T> {
    (arg: T): T;
}

// 泛型类
class GenericNumber<T> {
    zeroValue: T;
    add: (x: T, y: T) => T;
    
    constructor(zeroValue: T, add: (x: T, y: T) => T) {
        this.zeroValue = zeroValue;
        this.add = add;
    }
}

// 泛型约束
interface Lengthwise {
    length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);
    return arg;
}

// 多个类型参数
function merge<U, V>(obj1: U, obj2: V): U & V {
    return { ...obj1, ...obj2 };
}

// 泛型参数默认值
function createArray<T = string>(length: number, value: T): T[] {
    return Array(length).fill(value);
}

// 使用示例
const myIdentity: GenericIdentityFn<number> = identity;
const stringArray = createArray(3, "hello");
const numberArray = createArray<number>(3, 42);

// 泛型工具类
class Stack<T> {
    private items: T[] = [];
    
    push(item: T): void {
        this.items.push(item);
    }
    
    pop(): T | undefined {
        return this.items.pop();
    }
    
    peek(): T | undefined {
        return this.items[this.items.length - 1];
    }
    
    isEmpty(): boolean {
        return this.items.length === 0;
    }
    
    size(): number {
        return this.items.length;
    }
    
    clear(): void {
        this.items = [];
    }
}

// 使用泛型栈
const numberStack = new Stack<number>();
numberStack.push(1);
numberStack.push(2);
console.log(numberStack.pop()); // 2

const stringStack = new Stack<string>();
stringStack.push("hello");
stringStack.push("world");
console.log(stringStack.pop()); // "world"
```

### 4.2 高级泛型技巧
```typescript
// 条件类型
type IsString<T> = T extends string ? true : false;
type Result1 = IsString<string>;    // true
type Result2 = IsString<number>;    // false

// 条件类型与 infer 关键字
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;
type ElementType<T> = T extends (infer U)[] ? U : never;

// 映射类型
type Readonly<T> = {
    readonly [P in keyof T]: T[P];
};

type Partial<T> = {
    [P in keyof T]?: T[P];
};

type Required<T> = {
    [P in keyof T]-?: T[P];
};

// 实用工具类型
type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};

type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;

type Record<K extends keyof any, T> = {
    [P in K]: T;
};

// 类型守卫泛型
function isOfType<T>(value: any, key: keyof T): value is T {
    return value && typeof value === 'object' && key in value;
}

// 泛型工厂函数
function createInstance<T>(ctor: new (...args: any[]) => T, ...args: any[]): T {
    return new ctor(...args);
}

// 链式调用泛型
class QueryBuilder<T> {
    private filters: ((item: T) => boolean)[] = [];
    
    where(predicate: (item: T) => boolean): this {
        this.filters.push(predicate);
        return this;
    }
    
    execute(items: T[]): T[] {
        return items.filter(item => 
            this.filters.every(filter => filter(item))
        );
    }
}

// 递归泛型类型
type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

type DeepReadonly<T> = {
    readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

// 泛型约束示例
interface DatabaseEntity {
    id: string;
    createdAt: Date;
    updatedAt: Date;
}

interface UserEntity extends DatabaseEntity {
    name: string;
    email: string;
}

interface Repository<T extends DatabaseEntity> {
    findById(id: string): Promise<T | null>;
    findAll(): Promise<T[]>;
    create(entity: Omit<T, keyof DatabaseEntity>): Promise<T>;
    update(id: string, updates: Partial<T>): Promise<T | null>;
    delete(id: string): Promise<boolean>;
}

class UserRepository implements Repository<UserEntity> {
    private users: UserEntity[] = [];
    
    async findById(id: string): Promise<UserEntity | null> {
        return this.users.find(user => user.id === id) || null;
    }
    
    async findAll(): Promise<UserEntity[]> {
        return [...this.users];
    }
    
    async create(data: Omit<UserEntity, keyof DatabaseEntity>): Promise<UserEntity> {
        const user: UserEntity = {
            ...data,
            id: Math.random().toString(36).substr(2, 9),
            createdAt: new Date(),
            updatedAt: new Date()
        };
        this.users.push(user);
        return user;
    }
    
    async update(id: string, updates: Partial<UserEntity>): Promise<UserEntity | null> {
        const index = this.users.findIndex(user => user.id === id);
        if (index === -1) return null;
        
        this.users[index] = {
            ...this.users[index],
            ...updates,
            updatedAt: new Date()
        };
        
        return this.users[index];
    }
    
    async delete(id: string): Promise<boolean> {
        const initialLength = this.users.length;
        this.users = this.users.filter(user => user.id !== id);
        return this.users.length < initialLength;
    }
}
```

### 4.3 泛型在实际项目中的应用
```typescript
// API 客户端泛型
interface ApiConfig {
    baseURL: string;
    timeout: number;
    headers: Record<string, string>;
}

class ApiClient {
    constructor(private config: ApiConfig) {}
    
    async get<T = any>(
        endpoint: string,
        params?: Record<string, any>
    ): Promise<T> {
        const url = new URL(endpoint, this.config.baseURL);
        if (params) {
            Object.keys(params).forEach(key => 
                url.searchParams.append(key, params[key])
            );
        }
        
        const response = await fetch(url.toString(), {
            method: 'GET',
            headers: this.config.headers,
            signal: AbortSignal.timeout(this.config.timeout)
        });
        
        if (!response.ok) {
            throw new Error(`API Error: ${response.statusText}`);
        }
        
        return response.json();
    }
    
    async post<T = any, D = any>(
        endpoint: string,
        data: D
    ): Promise<T> {
        const response = await fetch(
            new URL(endpoint, this.config.baseURL).toString(),
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...this.config.headers
                },
                body: JSON.stringify(data),
                signal: AbortSignal.timeout(this.config.timeout)
            }
        );
        
        if (!response.ok) {
            throw new Error(`API Error: ${response.statusText}`);
        }
        
        return response.json();
    }
}

// 状态管理泛型
interface Action<T extends string = string> {
    type: T;
}

interface PayloadAction<T extends string, P> extends Action<T> {
    payload: P;
}

type ActionCreator<T extends string = string> = () => Action<T>;
type PayloadActionCreator<T extends string = string, P = any> = (
    payload: P
) => PayloadAction<T, P>;

function createAction<T extends string>(type: T): ActionCreator<T>;
function createAction<T extends string, P>(
    type: T
): PayloadActionCreator<T, P>;
function createAction<T extends string, P>(type: T) {
    return (payload?: P) => 
        payload === undefined ? { type } : { type, payload };
}

// Reducer 泛型
type Reducer<S = any, A extends Action = Action> = (
    state: S,
    action: A
) => S;

function createReducer<S, A extends Action = Action>(
    initialState: S,
    handlers: {
        [K in A['type']]?: Reducer<S, Extract<A, { type: K }>>
    }
): Reducer<S, A> {
    return (state: S = initialState, action: A) => {
        const handler = handlers[action.type as A['type']];
        return handler ? handler(state, action as any) : state;
    };
}

// 表单处理泛型
interface FormField<T = any> {
    value: T;
    error?: string;
    touched: boolean;
    valid: boolean;
}

interface FormConfig<T extends Record<string, any>> {
    initialValues: T;
    validate?: (values: T) => Partial<Record<keyof T, string>>;
    onSubmit: (values: T) => void | Promise<void>;
}

class FormHandler<T extends Record<string, any>> {
    private values: T;
    private errors: Partial<Record<keyof T, string>> = {};
    private touched: Set<keyof T> = new Set();
    
    constructor(private config: FormConfig<T>) {
        this.values = { ...config.initialValues };
    }
    
    getField<K extends keyof T>(name: K): FormField<T[K]> {
        return {
            value: this.values[name],
            error: this.errors[name],
            touched: this.touched.has(name),
            valid: !this.errors[name]
        };
    }
    
    setFieldValue<K extends keyof T>(name: K, value: T[K]): void {
        this.values[name] = value;
        this.validateField(name);
    }
    
    setFieldTouched<K extends keyof T>(name: K): void {
        this.touched.add(name);
        this.validateField(name);
    }
    
    private validateField<K extends keyof T>(name: K): void {
        if (this.config.validate) {
            const newErrors = this.config.validate(this.values);
            this.errors[name] = newErrors[name];
        }
    }
    
    async submit(): Promise<void> {
        if (this.config.validate) {
            this.errors = this.config.validate(this.values);
        }
        
        const isValid = Object.keys(this.errors).length === 0;
        if (isValid) {
            await this.config.onSubmit(this.values);
        }
    }
    
    reset(): void {
        this.values = { ...this.config.initialValues };
        this.errors = {};
        this.touched.clear();
    }
}

// 使用示例
interface LoginFormValues {
    email: string;
    password: string;
    rememberMe: boolean;
}

const loginForm = new FormHandler<LoginFormValues>({
    initialValues: {
        email: '',
        password: '',
        rememberMe: false
    },
    validate: (values) => {
        const errors: Partial<Record<keyof LoginFormValues, string>> = {};
        
        if (!values.email) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(values.email)) {
            errors.email = 'Email is invalid';
        }
        
        if (!values.password) {
            errors.password = 'Password is required';
        } else if (values.password.length < 6) {
            errors.password = 'Password must be at least 6 characters';
        }
        
        return errors;
    },
    onSubmit: async (values) => {
        console.log('Submitting form:', values);
        // API 调用逻辑
    }
});

// 使用表单
loginForm.setFieldValue('email', 'test@example.com');
loginForm.setFieldValue('password', 'password123');
loginForm.setFieldTouched('email');
console.log(loginForm.getField('email'));
```

---

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
enum Status { Ready, Waiting }
enum Color { Red, Blue, Green }

let status = Status.Ready;
// status = Color.Red; // ❌ 不兼容
```

### 1.2 常见错误解决
```typescript
// 1. 类型断言 vs 类型声明
// 类型断言：告诉编译器"我知道这是什么类型"
const element = document.getElementById('root') as HTMLElement;

// 类型声明：定义变量的类型
const element2: HTMLElement | null = document.getElementById('root');

// 2. 非空断言操作符
const element3 = document.getElementById('root')!; // 告诉编译器这不会是 null/undefined

// 3. 可选链和空值合并
const user = {
    profile: {
        name: "Alice"
    }
};

const userName = user?.profile?.name ?? "Unknown";

// 4. 类型保护
function isString(value: any): value is string {
    return typeof value === 'string';
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
type ConstructorParameters<T> = T extends new (...args: infer P) => any ? P : never;

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
