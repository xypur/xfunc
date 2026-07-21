import { describe, it, expect } from 'vitest'
import { clone } from '../../src/object'

describe('clone', () => {
  it('should shallow clone an object', () => {
    const obj = { a: 1, b: 2 }
    const result = clone(obj)
    expect(result).toEqual(obj)
    expect(result).not.toBe(obj)
  })

  it('should clone arrays', () => {
    const arr = [1, 2, 3]
    const result = clone(arr)
    expect(result).toEqual(arr)
    expect(result).not.toBe(arr)
  })

  it('should preserve nested reference (shallow)', () => {
    const nested = { x: 1 }
    const obj = { a: nested }
    const result = clone(obj)
    expect(result.a).toBe(nested)
  })

  it('should handle primitive values', () => {
    expect(clone(42)).toBe(42)
    expect(clone('hello')).toBe('hello')
    expect(clone(true)).toBe(true)
    expect(clone(null)).toBe(null)
    expect(clone(undefined)).toBe(undefined)
  })

  it('should clone Map', () => {
    const map = new Map([['a', 1]])
    const result = clone(map)
    expect(result).toEqual(map)
    expect(result).not.toBe(map)
  })

  it('should clone Set', () => {
    const set = new Set([1, 2, 3])
    const result = clone(set)
    expect(result).toEqual(set)
    expect(result).not.toBe(set)
  })

  it('should preserve symbol properties', () => {
    const sym = Symbol('test')
    const obj = { [sym]: 'symbol-value' }
    const result = clone(obj)
    expect(Object.getOwnPropertySymbols(result)).toEqual([sym])
    expect(result[sym]).toBe('symbol-value')
  })

  it('should return WeakMap/WeakSet/Function as-is', () => {
    const wm = new WeakMap()
    const ws = new WeakSet()
    const fn = () => {}

    expect(clone(wm)).toBe(wm)
    expect(clone(ws)).toBe(ws)
    expect(clone(fn)).toBe(fn)
  })

  it('should return Date as-is (shallow clone)', () => {
    const date = new Date()
    const result = clone(date)
    expect(result).toBe(date)
  })
})
