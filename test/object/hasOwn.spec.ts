import { describe, it, expect } from 'vitest'
import { hasOwn } from '../../src/object'

describe('hasOwn', () => {
  it('should return true for own properties', () => {
    expect(hasOwn({ a: 1 }, 'a')).toBe(true)
    expect(hasOwn({ a: 1, b: 2 }, 'b')).toBe(true)
  })

  it('should return false for inherited properties', () => {
    const proto = { inherited: true }
    const obj = Object.create(proto)
    obj.own = true

    expect(hasOwn(obj, 'own')).toBe(true)
    expect(hasOwn(obj, 'inherited')).toBe(false)
  })

  it('should return false for non-existent properties', () => {
    expect(hasOwn({ a: 1 }, 'b')).toBe(false)
    expect(hasOwn({}, 'toString')).toBe(false)
  })

  it('should handle symbol keys', () => {
    const sym = Symbol('test')
    const obj = { [sym]: 'value' }
    expect(hasOwn(obj, sym)).toBe(true)
  })

  it('should return false for undefined value property', () => {
    expect(hasOwn({ a: undefined }, 'a')).toBe(true)
    expect(hasOwn({ a: undefined }, 'b')).toBe(false)
  })

  it('should work with null-prototype objects', () => {
    const obj = Object.create(null)
    obj.a = 1
    expect(hasOwn(obj, 'a')).toBe(true)
    expect(hasOwn(obj, 'toString')).toBe(false)
  })
})
