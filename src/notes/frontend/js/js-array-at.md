# Array.prototype.at()方法详解
`Array.prototype.at()` 是 ES2022 新增的数组方法，用于按索引读取数组元素。它最大的特点是：**支持负索引**，可以方便地取倒数第几个元素。

## 1. 语法

```js
arr.at(index)
```

- `arr`：数组或类数组对象。
- `index`：要获取元素的索引，从 `0` 开始。
  - 正数：从前往后数。
  - 负数：从后往前数。
  - 省略或传 `undefined` 时，相当于 `0`。

返回值：

- 找到元素：返回该元素。
- 索引越界：返回 `undefined`。
- 不改变原数组。

## 2. 基本示例

```js
const arr = ['a', 'b', 'c', 'd'];

arr.at(0);    // 'a'
arr.at(2);    // 'c'
arr.at(-1);   // 'd'，最后一个
arr.at(-2);   // 'c'，倒数第二个
arr.at(4);    // undefined，越界
arr.at(-5);   // undefined，越界
arr.at();     // 'a'，相当于 at(0)
```

负索引的计算规则：

```js
实际索引 = arr.length + index
```

例如：

```js
const arr = ['a', 'b', 'c', 'd'];
// arr.length 是 4

arr.at(-1); // 4 + (-1) = 3，返回 'd'
arr.at(-2); // 4 + (-2) = 2，返回 'c'
```

如果计算后的索引仍然小于 `0`，返回 `undefined`。

## 3. 与 `arr[index]` 的区别

传统写法：

```js
const arr = ['a', 'b', 'c'];

arr[-1]; // undefined，不是倒数第一个
arr[arr.length - 1]; // 'c'
```

因为 `arr[-1]` 实际上是访问数组对象上名为 `"-1"` 的属性，通常不存在，所以是 `undefined`。

而 `at()` 会自动处理负索引：

```js
arr.at(-1); // 'c'
```

所以取最后一个元素时，`arr.at(-1)` 比 `arr[arr.length - 1]` 更简洁。

## 4. 参数转换规则

`at()` 会把参数转成整数，规则接近 `ToIntegerOrInfinity`：

```js
const arr = ['a', 'b', 'c', 'd'];

arr.at(1.9);  // 'b'，1.9 向零截断为 1
arr.at(-1.9); // 'd'，-1.9 向零截断为 -1
arr.at('2');  // 'c'，字符串 '2' 转成 2
arr.at(NaN);  // 'a'，NaN 转成 0
arr.at(Infinity);  // undefined
arr.at(-Infinity); // undefined
```

注意：小数会向零截断，不是四舍五入。

## 5. 稀疏数组

`at()` 不会跳过数组空洞，空洞位置返回 `undefined`：

```js
const arr = [1, , 3];

arr.at(1); // undefined
arr[1];    // undefined
```

## 6. 用于类数组对象

`Array.prototype.at` 是泛型方法，可以通过 `call` 用在类数组对象上：

```js
const arrayLike = {
  0: 'x',
  1: 'y',
  2: 'z',
  length: 3
};

Array.prototype.at.call(arrayLike, -1); // 'z'
Array.prototype.at.call(arrayLike, 1);  // 'y'
```

## 7. 字符串和 TypedArray 也有 at

除了数组，字符串和 TypedArray 也有 `at()`：

```js
'abc'.at(-1); // 'c'

const typed = new Uint8Array([10, 20, 30]);
typed.at(-1); // 30
```

不过它们分别属于 `String.prototype.at` 和 `TypedArray.prototype.at`，行为类似。

## 8. 兼容性

`Array.prototype.at()` 是 ES2022 特性。

常见支持情况：

- Chrome 92+
- Edge 92+
- Firefox 90+
- Safari 15.4+
- Node.js 16.6+

如果需要兼容很旧的环境，可以使用 polyfill：

```js
if (!Array.prototype.at) {
  Array.prototype.at = function (index) {
    const O = Object(this);
    const len = O.length >>> 0;

    let k = Number(index);
    if (Number.isNaN(k)) {
      k = 0;
    } else {
      k = Math.trunc(k);
    }

    if (k < 0) {
      k += len;
    }

    if (k < 0 || k >= len) {
      return undefined;
    }

    return O[k];
  };
}
```

## 9. 总结

`arr.at(index)` 的核心点：

- 支持正索引和负索引。
- `arr.at(-1)` 等价于 `arr[arr.length - 1]`。
- 越界返回 `undefined`。
- 不改变原数组。
- 小数参数向零截断。
- 可用于数组、类数组、字符串、TypedArray。
- 现代环境推荐使用 `arr.at(-1)` 取最后一个元素，可读性更好。