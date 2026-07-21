# API Reference

欢迎使用 xfunc API 参考文档。xfunc 是一个专为 TypeScript/JavaScript 设计的实用工具函数集合。

## 快速导航

### [Array Methods](./array.md)
数组处理相关的实用方法
- `toArray` - 将值转换为数组

### [Function Methods](./function.md)  
函数处理相关的实用方法
- `debounce` - 创建防抖函数
- `throttle` - 创建节流函数

### [Number Methods](./number.md)
数字处理相关的实用方法
- `toNumber` - 将值转换为数字
- `randomInt` - 生成指定范围内的随机整数

### [Object Methods](./object.md)
对象处理相关的实用方法
- `forOwn` - 遍历对象的自有属性
- `hasOwn` - 检查自有属性
- `clone` - 创建浅拷贝
- `cloneDeep` - 创建深拷贝
- `merge` - 深度合并对象
- `omit` / `omitBy` - 创建忽略指定属性的对象
- `pick` / `pickBy` - 创建只包含指定属性的对象
- `mapEntries` - 通过映射函数转换对象的键值对
- `forEachEntry` - 遍历对象的键值对

### [String Methods](./string.md)
字符串处理相关的实用方法
- `capitalize` - 首字母大写，其余小写
- `lowerFirst` - 首字母转为小写
- `upperFirst` - 首字母转为大写
- `camelize` - 将连字符字符串转为驼峰命名
- `hyphenate` - 将驼峰命名字符串转为连字符格式

### [Type Check Methods](./typed.md)
类型检查相关的实用方法
- 包含 17 个类型检查函数，如 `isString`、`isNumber`、`isBoolean` 等

## 使用方式

```ts
// 按需导入
import { debounce, toNumber } from 'xfunc'

// 或者导入所有方法
import * as xfunc from 'xfunc'
```

## 总览

- **总方法数**: 52个
- **分类数**: 7个
- **支持 TypeScript**: ✅
- **支持 Tree Shaking**: ✅
- **零依赖**: ✅

xfunc 提供了一套全面的实用工具函数：

- **类型安全**: 使用 TypeScript 构建，提供出色的智能提示
- **支持 Tree Shaking**: 只导入你需要的函数
- **零依赖**: 轻量且自包含
- **充分测试**: 全面的测试覆盖
- **生产就绪**: 已在真实应用中使用

所有函数遵循一致的命名规范，并提供可靠的错误处理。