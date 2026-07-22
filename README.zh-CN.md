# xfunc

[![CI](https://github.com/xypur/xfunc/actions/workflows/ci.yml/badge.svg)](https://github.com/xypur/xfunc/actions)
[![npm](https://img.shields.io/npm/v/xfunc)](https://www.npmjs.com/package/xfunc)
[![codecov](https://codecov.io/gh/xypur/xfunc/branch/dev/graph/badge.svg)](https://codecov.io/gh/xypur/xfunc)
[![License](https://img.shields.io/npm/l/xfunc)](LICENSE)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/xfunc)](https://bundlephobia.com/package/xfunc)

一个现代化的 TypeScript/JavaScript 工具函数库。

## 特性

- 🚀 **TypeScript 优先** — 原生 TypeScript 编写，提供优秀的类型安全
- 📦 **Tree Shaking** — 按需导入，只引入你需要的函数
- 🔧 **零依赖** — 轻量无依赖，自包含
- ⚡ **充分测试** — 使用 Vitest 全面覆盖测试
- 📚 **完整文档** — 完整的 API 参考和示例
- 🎯 **现代构建** — 支持 ESM、CJS 和 UMD

## 安装

```bash
# npm
npm install xfunc

# yarn
yarn add xfunc

# pnpm
pnpm add xfunc
```

## 使用

```ts
// 按需导入单个函数（推荐，支持 Tree Shaking）
import { debounce } from 'xfunc'

// 或全量导入
import * as xfunc from 'xfunc'

// 使用示例
const debouncedHandler = debounce(() => {
  console.log('300ms 后执行')
}, 300)

if (Array.isArray(data)) {
  console.log('data 是一个数组')
}
```

## API 分类

### [数组方法](./docs/docs/array.md)
- `toArray` — 将值转换为数组
- `unionBy` — 合并数组并按迭代器去重
- `range` — 生成数值范围数组
- `sortBy` — 按迭代器函数排序
- `orderBy` — 按多条件排序
- `uniq` — 创建去重后的数组
- `uniqWith` — 使用自定义比较器去重
- `castArray` — 将值封装为数组
- `remove` — 移除数组中第一个匹配项

### ⚡ [函数方法](./docs/docs/function.md)
- `debounce` — 创建防抖函数
- `throttle` — 创建节流函数
- `memoize` — 创建带缓存的记忆函数

### [数值方法](./docs/docs/number.md)
- `toNumber` — 将值转换为数字
- `randomInt` — 生成指定范围内的随机整数

### [对象方法](./docs/docs/object.md)
- `omit` / `omitBy` — 排除指定属性创建新对象
- `pick` / `pickBy` — 选取指定属性创建新对象
- `mapEntries` — 转换对象键值对
- `forEachEntry` — 遍历对象键值对
- `forOwn` — 遍历对象自身属性
- `hasOwn` — 检查是否为自有属性
- `clone` — 浅拷贝
- `cloneDeep` — 深拷贝
- `merge` — 深度合并对象

### [字符串方法](./docs/docs/string.md)
- `capitalize` — 首字母大写，其余小写
- `lowerFirst` — 首字母转小写
- `upperFirst` — 首字母转大写
- `camelize` — 连字符转驼峰
- `hyphenate` — 驼峰转连字符

### [类型检查方法](./docs/docs/typed.md)
包含 21 个类型检查工具：
- `isString`, `isNumber`, `isBoolean`
- `isEmpty`, `isNil`, `isFunction`, `isObject`
- `isDate`, `isRegExp`, `isPromise`, `isError`
- `isTypeString`, `toRawType`, `makeMap`, `isNumericKey`
- 以及更多...

### [结构方法](./docs/docs/structure.md)
- `QueueMap` — 基于 Map 的先进先出队列

## 快速示例

### 防抖函数调用
```ts
import { debounce } from 'xfunc'

const searchHandler = debounce((query: string) => {
  // 用户停止输入 300ms 后才会执行 API 调用
  searchAPI(query)
}, 300)

input.addEventListener('input', (e) => {
  searchHandler(e.target.value)
})
```

### 类型安全的对象操作
```ts
import { pick, omit, isObject, isEmpty } from 'xfunc'

const user = { id: 1, name: 'John', email: 'john@example.com', password: 'secret' }

// 只为 API 响应选取安全字段
const safeUser = pick(user, ['id', 'name', 'email'])
// { id: 1, name: 'John', email: 'john@example.com' }

// 排除敏感数据
const publicUser = omit(user, ['password'])
// { id: 1, name: 'John', email: 'john@example.com' }

// 安全的类型检查
if (isObject(data) && !isEmpty(data)) {
  // 安全地处理对象
}
```

### 数组和类型工具
```ts
import { toArray, range, uniq, isNumber } from 'xfunc'

// 将不同类型的值转换为数组
toArray('hello')     // ['h', 'e', 'l', 'l', 'o']
toArray(42)          // [42]
toArray([1, 2, 3])   // [1, 2, 3]
toArray(null)        // []

// 生成数值范围
range(5)           // [0, 1, 2, 3, 4]
range(1, 5)        // [1, 2, 3, 4]
range(0, 20, 5)    // [0, 5, 10, 15]

// 去除重复
uniq([1, 2, 2, 3, 3, 3])        // [1, 2, 3]

// 安全的类型检查
isNumber('42')     // false
isNumber(42)       // true
```

## 文档

访问我们的[文档站点](https://xypur.github.io/xfunc/)查看：
- 📖 完整的 API 参考
- 💡 使用示例
- 🎯 最佳实践
- 📝 类型定义

## 开发

```bash
# 安装依赖
pnpm install

# 以监听模式运行测试
pnpm test

# 运行一次测试
pnpm test:run

# 构建库
pnpm build

# 检查并修复代码规范
pnpm lint

# 启动文档开发服务器
pnpm docs:dev

# 构建文档
pnpm docs:build
```

## 参与贡献

欢迎贡献代码！请阅读我们的贡献指南并提交 Pull Request。

## License

MIT
