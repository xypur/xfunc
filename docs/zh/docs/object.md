# 对象方法

这些是处理对象的实用方法。

## `pick(object, paths)`

创建一个由被选取对象属性组成的对象。

### 使用示例

```ts
import { pick } from 'xfunc'

const object = { a: 1, b: '2', c: 3 }

pick(object, ['a', 'c'])
// => { a: 1, c: 3 }
```

### 参数

1. `object` *(Object)*: 源对象
2. `paths` *(Array)*: 要选取的属性路径

### 返回值

*(Object)*: 返回新对象

## `pickBy(object, predicate)`

创建一个由对象属性中 `predicate` 返回真值的属性组成的对象。

### 使用示例

```ts
import { pickBy } from 'xfunc'

const object = { a: 1, b: '2', c: 3 }

pickBy(object, (value) => typeof value === 'number')
// => { a: 1, c: 3 }
```

### 参数

1. `object` *(Object)*: 源对象
2. `predicate` *(Function)*: 每个属性调用的函数

### 返回值

*(Object)*: 返回新对象

## `omit(object, paths)`

创建一个由被忽略对象属性组成的对象。

### 使用示例

```ts
import { omit } from 'xfunc'

const object = { a: 1, b: '2', c: 3 }

omit(object, ['a', 'c'])
// => { b: '2' }
```

### 参数

1. `object` *(Object)*: 源对象
2. `paths` *(Array)*: 要忽略的属性路径

### 返回值

*(Object)*: 返回新对象

## `omitBy(object, predicate)`

创建一个由对象属性中 `predicate` 不返回真值的属性组成的对象。

### 使用示例

```ts
import { omitBy } from 'xfunc'

const object = { a: 1, b: '2', c: 3 }

omitBy(object, (value) => typeof value === 'number')
// => { b: '2' }
```

### 参数

1. `object` *(Object)*: 源对象
2. `predicate` *(Function)*: 每个属性调用的函数

### 返回值

*(Object)*: 返回新对象

## `mapEntries(object, iteratee)`

创建一个与 `object` 相同键的对象，值是通过运行对象自身的可枚举字符串键属性通过 `iteratee` 生成的。

### 使用示例

```ts
import { mapEntries } from 'xfunc'

const object = { a: 1, b: 2 }

mapEntries(object, ([key, value]) => [key.toUpperCase(), value * 2])
// => { A: 2, B: 4 }
```

### 参数

1. `object` *(Object)*: 要遍历的对象
2. `iteratee` *(Function)*: 每次迭代调用的函数

### 返回值

*(Object)*: 返回新的映射对象

## `forEachEntry(object, iteratee)`

遍历对象自身的可枚举字符串键属性并为每个属性调用 `iteratee`。

### 使用示例

```ts
import { forEachEntry } from 'xfunc'

forEachEntry({ a: 1, b: 2 }, ([key, value]) => {
  console.log(key, value)
})
// => 输出 'a 1' 然后 'b 2'
```

### 参数

1. `object` *(Object)*: 要遍历的对象
2. `iteratee` *(Function)*: 每次迭代调用的函数

### 返回值

*(Object)*: 返回 `object`

## `forOwn(object, iteratee)`

遍历对象自身的可枚举字符串键属性并为每个属性调用 `iteratee`。迭代函数接收三个参数：(value, key, object)。迭代函数可以通过显式返回 `false` 来提前退出迭代。

### 使用示例

```ts
import { forOwn } from 'xfunc'

forOwn({ a: 1, b: 2 }, (value, key) => {
  console.log(key, value)
})
// => 输出 'a 1' 然后 'b 2'

// 通过返回 false 提前退出
forOwn({ a: 1, b: 2, c: 3 }, (value, key) => {
  console.log(key, value)
  if (key === 'b') return false
})
// => 输出 'a 1' 然后 'b 2'
```

### 参数

1. `object` *(Object)*: 要遍历的对象
2. `iteratee` *(Function)*: 每次迭代调用的函数，接收 `(value, key, object)` 作为参数

### 返回值

*(Object)*: 返回 `object`

## `hasOwn(object, key)`

检查对象是否具有特定的自有属性。

### 使用示例

```ts
import { hasOwn } from 'xfunc'

hasOwn({ a: 1 }, 'a')
// => true

hasOwn({ a: 1 }, 'b')
// => false

hasOwn({ a: 1 }, 'toString')
// => false (继承属性)
```

### 参数

1. `object` *(Object)*: 要检查的对象
2. `key` *(string|symbol)*: 要检查的属性键

### 返回值

*(boolean)*: 如果对象具有自有属性则返回 true，否则返回 false

## `clone(source)`

创建值的浅克隆。

### 使用示例

```ts
import { clone } from 'xfunc'

const original = { a: 1, b: { c: 2 } }
const cloned = clone(original)

console.log(cloned)
// => { a: 1, b: { c: 2 } }

console.log(cloned === original)
// => false

console.log(cloned.b === original.b)
// => true (嵌套对象是共享的)
```

### 参数

1. `source` *(any)*: 要克隆的值

### 返回值

*(any)*: 返回克隆的值

### 说明

- 原始值原样返回
- 数组和对象进行浅克隆
- 嵌套的对象/数组不会被克隆（引用是共享的）

## `cloneDeep(source)`

创建值的深克隆。

### 使用示例

```ts
import { cloneDeep } from 'xfunc'

const original = { a: 1, b: { c: 2 } }
const cloned = cloneDeep(original)

console.log(cloned)
// => { a: 1, b: { c: 2 } }

console.log(cloned === original)
// => false

console.log(cloned.b === original.b)
// => false (嵌套对象也被克隆)
```

### 参数

1. `source` *(any)*: 要克隆的值

### 返回值

*(any)*: 返回深克隆的值

### 说明

- 原始值原样返回
- 所有嵌套的对象和数组都被递归克隆
- 安全处理循环引用

## `merge(target, ...sources)`

将多个对象深度合并到目标对象中，支持类型安全的嵌套对象递归合并和数组连接。

### 使用示例

```ts
import { merge } from 'xfunc'

const target = { a: 1, b: { c: 2, d: [1, 2] } }
const source = { b: { c: 10, e: 3 }, f: 4 }

merge(target, source)
// => { a: 1, b: { c: 10, d: [1, 2], e: 3 }, f: 4 }

// 数组连接
merge({ arr: [1, 2] }, { arr: [3, 4] })
// => { arr: [1, 2, 3, 4] }

// 多个源对象
merge({ a: 1 }, { b: 2 }, { c: 3 })
// => { a: 1, b: 2, c: 3 }
```

### 参数

1. `target` *(Object)*: 目标对象
2. `...sources` *(Object[])*: 源对象

### 返回值

*(Object)*: 返回 `target`

### 说明

- 会修改并返回目标对象
- 嵌套对象会被递归合并
- 数组默认进行连接
- 非普通对象（如 Date）不会被合并

