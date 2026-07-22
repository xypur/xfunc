# 类型检查方法

这些是类型检查的实用方法。

## `isArrayLike(value)`

检查值是否为类数组对象

### 使用示例

```ts
import { isArrayLike } from 'xfunc'

isArrayLike([1, 2, 3])
// => true

isArrayLike('hello')
// => true

isArrayLike({ length: 2, 0: 'a', 1: 'b' })
// => true
```

### Arguments

1. `value` *(unknown)*: 要检查的值

### Returns

*(boolean)*: 如果值是类数组对象返回 true，否则返回 false

## `isBoolean(value)`

检查值是否为布尔值

### 使用示例

```ts
import { isBoolean } from 'xfunc'

isBoolean(true)
// => true

isBoolean(false)
// => true

isBoolean(1)
// => false
```

### Arguments

1. `value` *(unknown)*: 要检查的值

### Returns

*(boolean)*: 如果值是布尔值返回 true，否则返回 false

## `isDate(value)`

检查值是否为 Date 对象

### 使用示例

```ts
import { isDate } from 'xfunc'

isDate(new Date())
// => true

isDate('2023-01-01')
// => false
```

### Arguments

1. `value` *(unknown)*: 要检查的值

### Returns

*(boolean)*: 如果值是 Date 对象返回 true，否则返回 false

## `isEmpty(value)`

检查值是否为空

### 使用示例

```ts
import { isEmpty } from 'xfunc'

isEmpty([])
// => true

isEmpty('')
// => true

isEmpty({})
// => true

isEmpty(null)
// => true

isEmpty([1, 2, 3])
// => false
```

### Arguments

1. `value` *(unknown)*: 要检查的值

### Returns

*(boolean)*: 如果值为空返回 true，否则返回 false

## `isFunction(value)`

检查值是否为函数

### 使用示例

```ts
import { isFunction } from 'xfunc'

isFunction(() => {})
// => true

isFunction(function() {})
// => true

isFunction('hello')
// => false
```

### Arguments

1. `value` *(unknown)*: 要检查的值

### Returns

*(boolean)*: 如果值是函数返回 true，否则返回 false

## `isError(value)`

检查值是否为错误对象

### 使用示例

```ts
import { isError } from 'xfunc'

isError(new Error('test'))
// => true

isError({ message: 'error', name: 'Error' })
// => true

isError('error message')
// => false
```

### Arguments

1. `value` *(unknown)*: 要检查的值

### Returns

*(boolean)*: 如果值是错误对象返回 true，否则返回 false

## `isLength(value)`

检查值是否为有效的类数组长度

### 使用示例

```ts
import { isLength } from 'xfunc'

isLength(3)
// => true

isLength(Number.MAX_SAFE_INTEGER)
// => true

isLength(-1)
// => false

isLength(3.2)
// => false
```

### Arguments

1. `value` *(unknown)*: 要检查的值

### Returns

*(boolean)*: 如果值是有效长度返回 true，否则返回 false

## `isNil(value)`

检查值是否为 null 或 undefined

### 使用示例

```ts
import { isNil } from 'xfunc'

isNil(null)
// => true

isNil(undefined)
// => true

isNil(0)
// => false

isNil('')
// => false
```

### Arguments

1. `value` *(unknown)*: 要检查的值

### Returns

*(boolean)*: 如果值是 null 或 undefined 返回 true，否则返回 false

## `isNumber(value)`

检查值是否为数字

### 使用示例

```ts
import { isNumber } from 'xfunc'

isNumber(42)
// => true

isNumber(3.14)
// => true

isNumber('42')
// => false
```

### Arguments

1. `value` *(unknown)*: 要检查的值

### Returns

*(boolean)*: 如果值是数字返回 true，否则返回 false

## `isObject(value)`

检查值是否为对象类型

### 使用示例

```ts
import { isObject } from 'xfunc'

isObject({})
// => true

isObject([])
// => true

isObject(() => {})
// => true

isObject(null)
// => false
```

### Arguments

1. `value` *(unknown)*: 要检查的值

### Returns

*(boolean)*: 如果值是对象类型返回 true，否则返回 false

## `isObjectLike(value)`

检查值是否为类对象

### 使用示例

```ts
import { isObjectLike } from 'xfunc'

isObjectLike({})
// => true

isObjectLike([])
// => true

isObjectLike(() => {})
// => false

isObjectLike(null)
// => false
```

### Arguments

1. `value` *(unknown)*: 要检查的值

### Returns

*(boolean)*: 如果值是类对象返回 true，否则返回 false

## `isPlainObject(value)`

检查值是否为普通对象

### 使用示例

```ts
import { isPlainObject } from 'xfunc'

isPlainObject({})
// => true

isPlainObject(Object.create(null))
// => true

isPlainObject([])
// => false

isPlainObject(new Date())
// => false
```

### Arguments

1. `value` *(unknown)*: 要检查的值

### Returns

*(boolean)*: 如果值是普通对象返回 true，否则返回 false

## `isPrimitive(value)`

检查值是否为原始类型

### 使用示例

```ts
import { isPrimitive } from 'xfunc'

isPrimitive('hello')
// => true

isPrimitive(42)
// => true

isPrimitive(null)
// => true

isPrimitive({})
// => false
```

### Arguments

1. `value` *(unknown)*: 要检查的值

### Returns

*(boolean)*: 如果值是原始类型返回 true，否则返回 false

## `isPromise(value)`

检查值是否为 Promise 对象

### 使用示例

```ts
import { isPromise } from 'xfunc'

isPromise(Promise.resolve())
// => true

isPromise({ then: () => {} })
// => true

isPromise({})
// => false
```

### Arguments

1. `value` *(unknown)*: 要检查的值

### Returns

*(boolean)*: 如果值是 Promise 对象返回 true，否则返回 false

## `isRegExp(value)`

检查值是否为正则表达式

### 使用示例

```ts
import { isRegExp } from 'xfunc'

isRegExp(/abc/)
// => true

isRegExp(new RegExp('abc'))
// => true

isRegExp('abc')
// => false
```

### Arguments

1. `value` *(unknown)*: 要检查的值

### Returns

*(boolean)*: 如果值是正则表达式返回 true，否则返回 false

## `isString(value)`

检查值是否为字符串

### 使用示例

```ts
import { isString } from 'xfunc'

isString('hello')
// => true

isString('')
// => true

isString(42)
// => false
```

### Arguments

1. `value` *(unknown)*: 要检查的值

### Returns

*(boolean)*: 如果值是字符串返回 true，否则返回 false

## `isIterable(value)`

检查值是否为可迭代对象

### 使用示例

```ts
import { isIterable } from 'xfunc'

isIterable([1, 2, 3])
// => true

isIterable('hello')
// => true

isIterable(new Set())
// => true

isIterable({})
// => false
```

### Arguments

1. `value` *(unknown)*: 要检查的值

### Returns

*(boolean)*: 如果值是可迭代对象返回 true，否则返回 false

## `isTypeString(value, type)`

检查值的原始类型是否与指定的类型字符串匹配。

### 使用示例

```ts
import { isTypeString } from 'xfunc'

isTypeString('hello', 'String')
// => true

isTypeString(42, 'Number')
// => true

isTypeString(null, 'Null')
// => true

isTypeString('hello', 'Number')
// => false
```

### 参数

1. `value` *(unknown)*: 要检查的值
2. `type` *(string)*: 要匹配的类型字符串（如 'String', 'Number' 等）

### 返回值

*(boolean)*: 如果值的原始类型与指定类型匹配返回 true，否则返回 false

## `toRawType(value)`

获取值的原始类型字符串。

### 使用示例

```ts
import { toRawType } from 'xfunc'

toRawType('hello')
// => 'string'

toRawType(42)
// => 'number'

toRawType(null)
// => 'null'

toRawType(undefined)
// => 'undefined'

toRawType([])
// => 'array'
```

### 参数

1. `value` *(unknown)*: 要获取类型的值

### 返回值

*(string)*: 返回类型字符串

## `makeMap(list)`

创建一个映射函数，用于检查值是否在给定列表中。

### 使用示例

```ts
import { makeMap } from 'xfunc'

const isReservedWord = makeMap(['if', 'else', 'for', 'while'])

isReservedWord('if')
// => true

isReservedWord('hello')
// => false
```

### 参数

1. `list` *(Array)*: 要检查的值列表

### 返回值

*(Function)*: 返回检查函数

## `isNumericKey(value)`

检查值是否为数字键。

### 使用示例

```ts
import { isNumericKey } from 'xfunc'

isNumericKey('0')
// => true

isNumericKey('42')
// => true

isNumericKey('abc')
// => false

isNumericKey(0)
// => true
```

### 参数

1. `value` *(unknown)*: 要检查的值

### 返回值

*(boolean)*: 如果值是数字键返回 true，否则返回 false

## 完整列表

所有可用的类型检查函数：

- `isArrayLike`
- `isBoolean`
- `isDate`
- `isEmpty`
- `isError`
- `isFunction`
- `isIterable`
- `isLength`
- `isNil`
- `isNumber`
- `isObject`
- `isObjectLike`
- `isPlainObject`
- `isPrimitive`
- `isPromise`
- `isRegExp`
- `isString`
- `isTypeString`
- `toRawType`
- `makeMap`
- `isNumericKey`

每个函数都返回一个布尔值，指示值是否匹配预期的类型。