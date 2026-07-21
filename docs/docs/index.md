# Quick Start

Get started with Unfunt in minutes! This guide will help you install and use the most common utility functions.

## Installation

Choose your preferred package manager:

::: code-group
```bash [pnpm]
pnpm add xfunc
```

```bash [npm]
npm install xfunc
```

```bash [yarn]
yarn add xfunc
```
:::

## Basic Usage

Unfunt supports both ESM and CommonJS imports. For optimal tree shaking, import only the functions you need:

```ts
// ✅ Recommended: Import specific functions
import { debounce, isArray, toNumber } from 'xfunc'

// ✅ Also works: Import all functions
import * as xfunc from 'xfunc'
```

## Common Use Cases

### 🚀 Function Utilities

#### Debounce API Calls
Perfect for search inputs and form validation:

```ts
import { debounce } from 'xfunc'

const searchHandler = debounce((query: string) => {
  // API call only happens 300ms after user stops typing
  searchAPI(query)
}, 300)

// Use in your event handlers
searchInput.addEventListener('input', (e) => {
  searchHandler(e.target.value)
})
```

#### Throttle Events
Great for scroll handlers and button clicks:

```ts
import { throttle } from 'xfunc'

const scrollHandler = throttle(() => {
  console.log('Scroll event handled')
}, 100)

window.addEventListener('scroll', scrollHandler)
```

### 🔍 Type Checking

Safe and reliable type checking for any value:

```ts
import { isArray, isString, isEmpty, isNil } from 'xfunc'

// Check types safely
if (isArray(data)) {
  data.forEach(item => console.log(item))
}

if (isString(userInput) && !isEmpty(userInput)) {
  processInput(userInput)
}

// Handle null/undefined
if (!isNil(value)) {
  // value is neither null nor undefined
  console.log(value)
}
```

### 📊 Array Operations

```ts
import { toArray, remain } from 'xfunc'

// Convert anything to array
const items = toArray(userInput) // Works with strings, numbers, arrays, etc.

// Split and get remaining parts
const [first, second, ...rest] = remain([1, 2, 3, 4, 5], 2)
// first: [1, 2], second: undefined, rest: [3, 4, 5]
```

### 🔢 Number Conversion

```ts
import { toNumber, toInteger, toFinite } from 'xfunc'

// Safe number conversion
const age = toNumber(formData.age) // Handles strings, arrays, etc.
const count = toInteger('42.7')    // 42
const ratio = toFinite(Infinity)   // Number.MAX_VALUE
```

### 🏗️ Object Manipulation

```ts
import { pick, omit, mapEntries } from 'xfunc'

const user = { 
  id: 1, 
  name: 'John', 
  email: 'john@example.com', 
  password: 'secret',
  createdAt: '2024-01-01'
}

// Extract only needed properties
const publicUser = pick(user, ['id', 'name', 'email'])
// { id: 1, name: 'John', email: 'john@example.com' }

// Remove sensitive data
const safeUser = omit(user, ['password'])

// Transform object entries
const transformed = mapEntries(user, ([key, value]) => [
  key.toUpperCase(), 
  typeof value === 'string' ? value.toUpperCase() : value
])
```

## Real-World Examples

### Form Validation with Debounce

```ts
import { debounce, isString, isEmpty } from 'xfunc'

class FormValidator {
  private validateEmail = debounce((email: string) => {
    if (!isString(email) || isEmpty(email)) {
      this.showError('Email is required')
      return
    }
    
    // Validate email format...
    this.validateEmailFormat(email)
  }, 500)

  onEmailInput(event: Event) {
    const email = (event.target as HTMLInputElement).value
    this.validateEmail(email)
  }
}
```

### API Response Processing

```ts
import { isArray, pick, toNumber } from 'xfunc'

function processApiResponse(response: unknown) {
  if (!isArray(response)) {
    throw new Error('Expected array response')
  }

  return response.map(item => ({
    ...pick(item, ['id', 'name', 'email']),
    id: toNumber(item.id), // Ensure ID is a number
  }))
}
```

### Infinite Scroll with Throttle

```ts
import { throttle } from 'xfunc'

class InfiniteScroll {
  private loadMore = throttle(() => {
    if (this.isNearBottom() && !this.loading) {
      this.fetchNextPage()
    }
  }, 200)

  init() {
    window.addEventListener('scroll', this.loadMore)
  }
}
```

## Next Steps

- 📚 Explore the [complete API reference](/docs/overview)
- 🎯 Check out more [examples and patterns](/docs/)
- 🔧 Learn about [advanced usage](/docs/structure)
- 💡 See [best practices](/docs/github-actions-guide) for production apps

## TypeScript Support

Unfunt is built with TypeScript and provides excellent type safety out of the box:

```ts
import { isArray, pick } from 'xfunc'

function processData<T>(data: T) {
  if (isArray(data)) {
    // TypeScript knows data is an array here
    return data.map(item => item)
  }
  
  // Type-safe object operations
  const result = pick(data as Record<string, unknown>, ['id', 'name'])
  return result
}
```

Ready to dive deeper? Check out our [API documentation](/docs/overview) for complete function references and advanced usage patterns.