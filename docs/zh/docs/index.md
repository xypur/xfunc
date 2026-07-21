# 快速入门

几分钟内即可上手 xfunc！本指南将帮助你安装和使用最常用的工具函数。

## 安装

选择你喜欢的包管理器：

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

## 基本用法

xfunc 同时支持 ESM 和 CommonJS 导入方式。为了获得最佳的 tree shaking 效果，请只导入你需要的函数：

```ts
// ✅ 推荐：按需导入特定函数
import { debounce, toNumber } from 'xfunc'

// ✅ 也可以：导入所有函数
import * as xfunc from 'xfunc'
```

## 常见用例

### 🚀 函数工具

#### 防抖 API 调用

非常适合搜索输入和表单验证：

```ts
import { debounce } from 'xfunc'

const searchHandler = debounce((query: string) => {
  // 用户停止输入 300ms 后才触发 API 调用
  searchAPI(query)
}, 300)

// 在事件处理器中使用
searchInput.addEventListener('input', (e) => {
  searchHandler(e.target.value)
})
```

#### 节流事件

非常适合滚动处理和按钮点击：

```ts
import { throttle } from 'xfunc'

const scrollHandler = throttle(() => {
  console.log('滚动事件已处理')
}, 100)

window.addEventListener('scroll', scrollHandler)
```

### 🔍 类型检查

对任何值进行安全可靠的类型检查：

```ts
import { isString, isEmpty, isNil } from 'xfunc'

// 安全地检查类型
if (Array.isArray(data)) {
  data.forEach(item => console.log(item))
}

if (isString(userInput) && !isEmpty(userInput)) {
  processInput(userInput)
}

// 处理 null/undefined
if (!isNil(value)) {
  // value 既不是 null 也不是 undefined
  console.log(value)
}
```

### 📊 数组操作

```ts
import { toArray } from 'xfunc'

// 将任意值转换为数组
const items = toArray(userInput) // 适用于字符串、数字、数组等
```

### 🔢 数字转换

```ts
import { toNumber } from 'xfunc'

// 安全的数字转换
const age = toNumber(formData.age) // 处理字符串、数组等
const price = toNumber('$1,200.50') // 0 (处理非数字字符串)
```

### 🏗️ 对象操作

```ts
import { pick, omit, mapEntries } from 'xfunc'

const user = { 
  id: 1, 
  name: 'John', 
  email: 'john@example.com', 
  password: 'secret',
  createdAt: '2024-01-01'
}

// 只提取需要的属性
const publicUser = pick(user, ['id', 'name', 'email'])
// { id: 1, name: 'John', email: 'john@example.com' }

// 移除敏感数据
const safeUser = omit(user, ['password'])

// 转换对象条目
const transformed = mapEntries(user, ([key, value]) => [
  key.toUpperCase(), 
  typeof value === 'string' ? value.toUpperCase() : value
])
```

## 实际应用示例

### 使用防抖进行表单验证

```ts
import { debounce, isString, isEmpty } from 'xfunc'

class FormValidator {
  private validateEmail = debounce((email: string) => {
    if (!isString(email) || isEmpty(email)) {
      this.showError('邮箱为必填项')
      return
    }
    
    // 验证邮箱格式...
    this.validateEmailFormat(email)
  }, 500)

  onEmailInput(event: Event) {
    const email = (event.target as HTMLInputElement).value
    this.validateEmail(email)
  }
}
```

### API 响应处理

```ts
import { pick, toNumber } from 'xfunc'

function processApiResponse(response: unknown) {
  if (!Array.isArray(response)) {
    throw new Error('期望数组响应')
  }

  return response.map(item => ({
    ...pick(item, ['id', 'name', 'email']),
    id: toNumber(item.id), // 确保 ID 是数字
  }))
}
```

### 使用节流实现无限滚动

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

## 下一步

- 📚 探索完整的 [API 参考](/zh/docs/overview)
- 🎯 查看更多 [示例和模式](/zh/docs/)
- 🔧 了解 [高级用法](/zh/docs/structure)
- 💡 查看生产环境应用的 [CI/CD 集成指南](/zh/docs/github-actions-guide)

## TypeScript 支持

xfunc 使用 TypeScript 构建，开箱即用，提供出色的类型安全保障：

```ts
import { pick } from 'xfunc'

function processData<T>(data: T) {
  if (Array.isArray(data)) {
    // TypeScript 知道这里的 data 是一个数组
    return data.map(item => item)
  }
  
  // 类型安全的对象操作
  const result = pick(data as Record<string, unknown>, ['id', 'name'])
  return result
}
```

准备深入了解？查看我们的 [API 文档](/zh/docs/overview)，获取完整的函数参考和高级用法模式。
