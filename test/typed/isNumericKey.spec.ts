import { describe, it, expect } from 'vitest'
import { isNumericKey } from '../../src/typed'

describe('isNumericKey', () => {
  it('should return true for numeric strings', () => {
    expect(isNumericKey('0')).toBe(true)
    expect(isNumericKey('123')).toBe(true)
    expect(isNumericKey('-123')).toBe(true)
    expect(isNumericKey('1.5')).toBe(true)
    expect(isNumericKey('-1.5')).toBe(true)
  })

  it('should return true for numbers', () => {
    expect(isNumericKey(0)).toBe(true)
    expect(isNumericKey(123)).toBe(true)
    expect(isNumericKey(-123)).toBe(true)
    expect(isNumericKey(1.5)).toBe(true)
    expect(isNumericKey(Infinity)).toBe(true)
  })

  it('should return false for non-numeric strings', () => {
    expect(isNumericKey('abc')).toBe(false)
    expect(isNumericKey('')).toBe(false)
    expect(isNumericKey('1a')).toBe(false)
    expect(isNumericKey('a1')).toBe(false)
  })

  it('should return false for other types', () => {
    expect(isNumericKey(null)).toBe(false)
    expect(isNumericKey(undefined)).toBe(false)
    expect(isNumericKey(Symbol('test'))).toBe(false)
    expect(isNumericKey({})).toBe(false)
    expect(isNumericKey([])).toBe(false)
  })

  it('should handle edge numeric values', () => {
    expect(isNumericKey(-0)).toBe(true)
    expect(isNumericKey(NaN)).toBe(true)
    expect(isNumericKey('0.0')).toBe(true)
    expect(isNumericKey('.5')).toBe(true)
  })
})
