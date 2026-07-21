import { describe, it, expect } from 'vitest'
import { cloneDeep } from '../../src/object'

describe('cloneDeep', () => {
  it('should deep clone an object', () => {
    const obj = { a: { b: 2 } }
    const result = cloneDeep(obj)
    expect(result).toEqual(obj)
    expect(result).not.toBe(obj)
    expect(result.a).not.toBe(obj.a)
  })

  it('should deep clone arrays', () => {
    const arr = [[1, [2]], 3]
    const result = cloneDeep(arr)
    expect(result).toEqual(arr)
    expect(result).not.toBe(arr)
    expect(result[0]).not.toBe(arr[0])
  })

  it('should handle circular references', () => {
    const obj: any = { a: 1 }
    obj.self = obj
    const result = cloneDeep(obj)
    expect(result.a).toBe(1)
    expect(result.self).toBe(result)
  })

  it('should clone Date', () => {
    const date = new Date()
    const result = cloneDeep(date)
    expect(result).toEqual(date)
    expect(result).not.toBe(date)
  })

  it('should clone RegExp', () => {
    const regex = /test/gi
    const result = cloneDeep(regex)
    expect(result.source).toBe(regex.source)
    expect(result.flags).toBe(regex.flags)
    expect(result).not.toBe(regex)
  })

  it('should clone Map with nested keys/values', () => {
    const obj = { x: 1 }
    const map = new Map([[obj, [1, 2]]])
    const result = cloneDeep(map)
    expect(result).toEqual(map)
    expect(result).not.toBe(map)
    const resultKey = result.keys().next().value!
    expect(resultKey).not.toBe(obj)
    expect(resultKey).toEqual(obj)
  })

  it('should clone Set with nested values', () => {
    const nested = { a: 1 }
    const set = new Set([nested])
    const result = cloneDeep(set)
    expect(result).toEqual(set)
    expect(result).not.toBe(set)
    const resultValue = result.values().next().value!
    expect(resultValue).not.toBe(nested)
  })

  it('should handle primitive values', () => {
    expect(cloneDeep(42)).toBe(42)
    expect(cloneDeep('hello')).toBe('hello')
    expect(cloneDeep(null)).toBe(null)
    expect(cloneDeep(undefined)).toBe(undefined)
  })

  it('should clone ArrayBuffer and TypedArray', () => {
    const buffer = new ArrayBuffer(8)
    const view = new Float64Array(buffer)
    view[0] = 3.14
    const cloned = cloneDeep(view)
    expect(cloned).toEqual(view)
    expect(cloned).not.toBe(view)
    expect(cloned.buffer).not.toBe(buffer)
  })

  it('should return WeakMap/WeakSet/Function as-is', () => {
    const wm = new WeakMap()
    const fn = () => {}
    expect(cloneDeep(wm)).toBe(wm)
    expect(cloneDeep(fn)).toBe(fn)
  })

  it('should preserve symbol properties', () => {
    const sym = Symbol('test')
    const obj = { [sym]: { nested: true } }
    const result = cloneDeep(obj)
    expect(Object.getOwnPropertySymbols(result)).toEqual([sym])
    expect(result[sym]).toEqual({ nested: true })
    expect(result[sym]).not.toBe(obj[sym])
  })
})
