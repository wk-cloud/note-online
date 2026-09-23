# 第二章：面向对象编程

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
    return this.email.includes("@");
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
      throw new Error("Name must be at least 2 characters long");
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
    readonly employeeId: string,
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
    employeeId: string,
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
function LogAccess(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor,
) {
  const originalGet = descriptor.get;
  const originalSet = descriptor.set;

  if (originalGet) {
    descriptor.get = function () {
      console.log(`Getting ${propertyKey}`);
      return originalGet.call(this);
    };
  }

  if (originalSet) {
    descriptor.set = function (value: any) {
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
    protected species: string,
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
  constructor(
    color: string,
    public radius: number,
  ) {
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
    public height: number,
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
  constructor(
    brand: string,
    public doors: number,
  ) {
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
  constructor(
    brand: string,
    public hasSidecar: boolean,
  ) {
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
  new Car("Honda", 2),
];

vehicles.forEach((vehicle) => {
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
vehicles.forEach((vehicle) => {
  if (isCar(vehicle)) {
    console.log(`This car has ${vehicle.doors} doors`);
  } else if (isMotorcycle(vehicle)) {
    console.log(
      `This motorcycle ${vehicle.hasSidecar ? "has" : "does not have"} a sidecar`,
    );
  }
});
```

## 3. 接口

接口的作用类似于抽象类，不同点在于接口中的所有方法和属性都是没有实值的，换句话说接口中的所有方法都是抽象方法。接口主要负责定义一个类的结构，接口可以去限制一个对象的接口，对象只有包含接口中定义的所有属性和方法时才能匹配接口。同时，可以让一个类去实现接口，实现接口时类中要保护接口中的所有属性。

### 3.1 基础接口

```typescript
// 对象类型接口
interface User {
  readonly id: number; // 只读属性
  name: string; // 必需属性
  email: string; // 必需属性
  age?: number; // 可选属性
  [key: string]: any; // 索引签名
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
  (start: number): string; // 函数调用签名
  interval: number; // 属性
  reset(): void; // 方法
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

const mySearch: SearchFunction = function (src, sub) {
  return src.search(sub) > -1;
};

const square: Square = {
  color: "blue",
  penWidth: 5.0,
  sideLength: 10,
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
  scale: 10,
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
  updateProfile(
    userId: string,
    data: Partial<UserProfile>,
  ): Promise<ApiResponse<UserProfile>>;
}

// 组件 Props 接口
interface ButtonProps {
  text: string;
  onClick: () => void;
  type?: "primary" | "secondary" | "danger";
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
  theme: "light" | "dark";
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
  async login(
    credentials: LoginCredentials,
  ): Promise<ApiResponse<UserProfile>> {
    // API 调用逻辑
    return {
      data: {
        id: "123",
        username: credentials.email.split("@")[0],
        email: credentials.email,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      status: 200,
      message: "Login successful",
      timestamp: new Date().toISOString(),
    };
  }

  async logout(): Promise<ApiResponse<void>> {
    return {
      data: undefined,
      status: 200,
      message: "Logout successful",
      timestamp: new Date().toISOString(),
    };
  }

  async getProfile(userId: string): Promise<ApiResponse<UserProfile>> {
    // 实现获取用户资料逻辑
    return {
      data: {
        id: userId,
        username: "testuser",
        email: "test@example.com",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      status: 200,
      message: "Profile retrieved",
      timestamp: new Date().toISOString(),
    };
  }

  async updateProfile(
    userId: string,
    data: Partial<UserProfile>,
  ): Promise<ApiResponse<UserProfile>> {
    // 实现更新用户资料逻辑
    return {
      data: {
        id: userId,
        username: data.username || "testuser",
        email: data.email || "test@example.com",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      status: 200,
      message: "Profile updated",
      timestamp: new Date().toISOString(),
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
type Result1 = IsString<string>; // true
type Result2 = IsString<number>; // false

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
  return value && typeof value === "object" && key in value;
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
    return items.filter((item) => this.filters.every((filter) => filter(item)));
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
    return this.users.find((user) => user.id === id) || null;
  }

  async findAll(): Promise<UserEntity[]> {
    return [...this.users];
  }

  async create(
    data: Omit<UserEntity, keyof DatabaseEntity>,
  ): Promise<UserEntity> {
    const user: UserEntity = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.users.push(user);
    return user;
  }

  async update(
    id: string,
    updates: Partial<UserEntity>,
  ): Promise<UserEntity | null> {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) return null;

    this.users[index] = {
      ...this.users[index],
      ...updates,
      updatedAt: new Date(),
    };

    return this.users[index];
  }

  async delete(id: string): Promise<boolean> {
    const initialLength = this.users.length;
    this.users = this.users.filter((user) => user.id !== id);
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
    params?: Record<string, any>,
  ): Promise<T> {
    const url = new URL(endpoint, this.config.baseURL);
    if (params) {
      Object.keys(params).forEach((key) =>
        url.searchParams.append(key, params[key]),
      );
    }

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: this.config.headers,
      signal: AbortSignal.timeout(this.config.timeout),
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    return response.json();
  }

  async post<T = any, D = any>(endpoint: string, data: D): Promise<T> {
    const response = await fetch(
      new URL(endpoint, this.config.baseURL).toString(),
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...this.config.headers,
        },
        body: JSON.stringify(data),
        signal: AbortSignal.timeout(this.config.timeout),
      },
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
  payload: P,
) => PayloadAction<T, P>;

function createAction<T extends string>(type: T): ActionCreator<T>;
function createAction<T extends string, P>(type: T): PayloadActionCreator<T, P>;
function createAction<T extends string, P>(type: T) {
  return (payload?: P) =>
    payload === undefined ? { type } : { type, payload };
}

// Reducer 泛型
type Reducer<S = any, A extends Action = Action> = (state: S, action: A) => S;

function createReducer<S, A extends Action = Action>(
  initialState: S,
  handlers: {
    [K in A["type"]]?: Reducer<S, Extract<A, { type: K }>>;
  },
): Reducer<S, A> {
  return (state: S = initialState, action: A) => {
    const handler = handlers[action.type as A["type"]];
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
      valid: !this.errors[name],
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
    email: "",
    password: "",
    rememberMe: false,
  },
  validate: (values) => {
    const errors: Partial<Record<keyof LoginFormValues, string>> = {};

    if (!values.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Email is invalid";
    }

    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    return errors;
  },
  onSubmit: async (values) => {
    console.log("Submitting form:", values);
    // API 调用逻辑
  },
});

// 使用表单
loginForm.setFieldValue("email", "test@example.com");
loginForm.setFieldValue("password", "password123");
loginForm.setFieldTouched("email");
console.log(loginForm.getField("email"));
```

---
