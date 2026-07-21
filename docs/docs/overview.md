# API Reference

Welcome to the xfunc API reference documentation. xfunc is a collection of utility functions designed for TypeScript/JavaScript.

## Quick Navigation

### [Array Methods](./array.md)
Utility methods for array processing
- `toArray` - Convert value to array

### [Function Methods](./function.md)  
Utility methods for function processing
- `debounce` - Create debounced function
- `throttle` - Create throttled function

### [Number Methods](./number.md)
Utility methods for number processing
- `toNumber` - Convert value to number
- `randomInt` - Generate random integer in range

### [Object Methods](./object.md)
Utility methods for object processing
- `forOwn` - Iterate over own object properties
- `hasOwn` - Check for own property
- `clone` - Create shallow clone
- `cloneDeep` - Create deep clone
- `merge` - Deep merge objects
- `omit` / `omitBy` - Create object excluding specified properties
- `pick` / `pickBy` - Create object with only specified properties
- `mapEntries` - Transform object key-value pairs through mapping function
- `forEachEntry` - Iterate over object key-value pairs

### [String Methods](./string.md)
Utility methods for string processing
- `capitalize` - Capitalize first character, lowercase rest
- `lowerFirst` - Convert first character to lowercase
- `upperFirst` - Convert first character to uppercase
- `camelize` - Convert hyphenated string to camelCase
- `hyphenate` - Convert camelCase string to hyphenated

### [Type Check Methods](./typed.md)
Utility methods for type checking
- Contains 21 type checking functions like `isString`, `isNumber`, `isBoolean`, etc.

## Usage

```ts
// Import specific functions
import { debounce, toNumber } from 'xfunc'

// Or import all methods
import * as xfunc from 'xfunc'
```

## Overview

xfunc provides a comprehensive set of utility functions that are:

- **Type-safe**: Built with TypeScript for excellent IntelliSense
- **Tree-shakable**: Import only what you need
- **Zero dependencies**: Lightweight and self-contained
- **Well-tested**: Comprehensive test coverage
- **Production-ready**: Used in real-world applications

All functions follow consistent naming conventions and provide reliable error handling.