import { cloneProperties } from '../internal/cloneProperties'
import { getPrototypeOf } from '../internal/constants'
import { toTypeString } from '../internal/toTypeString'
import { isObject } from '../typed/isObject'

// Reuse existing type tags
const objectTag = '[object Object]'
const arrayTag = '[object Array]'
const argsTag = '[object Arguments]'
const mapTag = '[object Map]'
const setTag = '[object Set]'
const weakMapTag = '[object WeakMap]'
const weakSetTag = '[object WeakSet]'
const weakRefTag = '[object WeakRef]'
const functionTag = '[object Function]'
const promiseTag = '[object Promise]'
const generatorTag = '[object Generator]'

// Types that cannot be cloned (shallow clone also keeps original reference)
const UNCLONABLE_TYPES = new Set([weakMapTag, weakSetTag, weakRefTag, functionTag, promiseTag, generatorTag])

/**
 * 浅克隆一个值
 * @param value 要克隆的值
 * @returns 浅克隆后的值
 */
export function clone<T>(value: T): T {
  // 1. Handle primitive types
  if (!isObject(value)) {
    return value
  }

  const tag = toTypeString(value)

  if (UNCLONABLE_TYPES.has(tag)) {
    return value
  }

  // 3. Handle Map
  if (tag === mapTag) {
    return new Map(value as any) as T
  }

  // 4. Handle Set
  if (tag === setTag) {
    return new Set(value as any) as T
  }

  // 5. Handle arrays, objects, and arguments
  if (tag === arrayTag || tag === objectTag || tag === argsTag) {
    // Create a new container
    const copy: any = tag === arrayTag
      ? []
      : Object.create(getPrototypeOf(value))

    // Copy all enumerable properties (including Symbol properties)
    const propNames = [
      ...Object.keys(value),
      ...Object.getOwnPropertySymbols(value)
    ]

    for (const key of propNames) {
      copy[key] = (value as any)[key]
    }

    cloneProperties(value, copy)
    return copy
  }

  return value
}
