# Type Check Methods

These are utility methods for type checking.

## Available Functions

### Basic Type Checks

#### `isString(value)`
Checks if `value` is classified as a String primitive or object.

```ts
import { isString } from 'xfunc'

isString('abc')
// => true

isString(123)
// => false
```

#### `isNumber(value)`
Checks if `value` is classified as a Number primitive or object.

```ts
import { isNumber } from 'xfunc'

isNumber(123)
// => true

isNumber('123')
// => false
```

#### `isBoolean(value)`
Checks if `value` is classified as a boolean primitive or object.

```ts
import { isBoolean } from 'xfunc'

isBoolean(true)
// => true

isBoolean('true')
// => false
```

### Null/Undefined Checks

#### `isNil(value)`
Checks if `value` is `null` or `undefined`.

```ts
import { isNil } from 'xfunc'

isNil(null)
// => true

isNil(undefined)
// => true

isNil(0)
// => false
```

#### `isEmpty(value)`
Checks if `value` is an empty object, collection, map, or set.

```ts
import { isEmpty } from 'xfunc'

isEmpty([])
// => true

isEmpty({})
// => true

isEmpty('')
// => true

isEmpty([1, 2, 3])
// => false
```

### Object Type Checks

#### `isObject(value)`
Checks if `value` is the language type of Object.

```ts
import { isObject } from 'xfunc'

isObject({})
// => true

isObject([1, 2, 3])
// => true

isObject(null)
// => false
```

#### `isPlainObject(value)`
Checks if `value` is a plain object.

```ts
import { isPlainObject } from 'xfunc'

isPlainObject({})
// => true

isPlainObject(new Object())
// => true

isPlainObject([1, 2, 3])
// => false
```

### Function Checks

#### `isFunction(value)`
Checks if `value` is classified as a Function object.

```ts
import { isFunction } from 'xfunc'

isFunction(() => {})
// => true

isFunction(function() {})
// => true

isFunction('function')
// => false
```

### Date and RegExp Checks

#### `isDate(value)`
Checks if `value` is classified as a Date object.

```ts
import { isDate } from 'xfunc'

isDate(new Date())
// => true

isDate('2023-01-01')
// => false
```

#### `isRegExp(value)`
Checks if `value` is classified as a RegExp object.

```ts
import { isRegExp } from 'xfunc'

isRegExp(/abc/)
// => true

isRegExp(new RegExp('abc'))
// => true

isRegExp('abc')
// => false
```

### Advanced Checks

#### `isPromise(value)`
Checks if `value` is a Promise.

```ts
import { isPromise } from 'xfunc'

isPromise(Promise.resolve())
// => true

isPromise({ then: () => {} })
// => true

isPromise({})
// => false
```

#### `isError(value)`
Checks if `value` is an Error object.

```ts
import { isError } from 'xfunc'

isError(new Error())
// => true

isError(new TypeError())
// => true

isError({ message: 'error' })
// => false
```

### Iterable Checks

#### `isArrayLike(value)`

Checks if `value` is an array-like object.

```ts
import { isArrayLike } from 'xfunc'

isArrayLike([1, 2, 3])
// => true

isArrayLike('hello')
// => true

isArrayLike({ length: 2, 0: 'a', 1: 'b' })
// => true
```

#### `isLength(value)`

Checks if `value` is a valid array-like length.

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

#### `isObjectLike(value)`

Checks if `value` is object-like (not `null`, typeof is 'object').

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

#### `isPrimitive(value)`

Checks if `value` is a primitive type.

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

#### `isIterable(value)`

Checks if `value` is iterable.

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

### Utility Functions

#### `isTypeString(value, type)`

Checks if `value`'s raw type matches the given type string.

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

#### `toRawType(value)`

Gets the raw type string of a value.

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

#### `makeMap(list)`

Creates a mapping function to check if a value is in the given list.

```ts
import { makeMap } from 'xfunc'

const isReservedWord = makeMap(['if', 'else', 'for', 'while'])

isReservedWord('if')
// => true

isReservedWord('hello')
// => false
```

#### `isNumericKey(value)`

Checks if `value` is a numeric key.

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

## Complete List

All available type checking functions:

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

Each function returns a boolean value indicating whether the value matches the expected type.