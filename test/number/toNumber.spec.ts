import { describe, it, expect } from 'vitest'
import { toNumber } from '../../src/number'

describe('toNumber', () => {
  it('should return the same number for number inputs', () => {
    expect(toNumber(42)).toBe(42)
    expect(toNumber(3.14)).toBe(3.14)
    expect(toNumber(Infinity)).toBe(Infinity)
    expect(toNumber(-Infinity)).toBe(-Infinity)
    expect(toNumber(0)).toBe(0)
    expect(toNumber(-0)).toBe(-0)
  })

  it('should convert numeric strings to numbers', () => {
    expect(toNumber('42')).toBe(42)
    expect(toNumber('3.14')).toBe(3.14)
    expect(toNumber('0')).toBe(0)
  })

  it('should handle string trimming', () => {
    expect(toNumber('  42  ')).toBe(42)
    expect(toNumber('\t3\n')).toBe(3)
  })

  it('should return NaN for symbols', () => {
    expect(toNumber(Symbol('test'))).toBe(NaN)
  })

  it('should return NaN for non-numeric strings', () => {
    expect(toNumber('abc')).toBe(NaN)
    expect(toNumber('')).toBe(0)
  })

  it('should handle object with valueOf', () => {
    const obj = { valueOf: () => 42 }
    expect(toNumber(obj)).toBe(42)
  })

  it('should handle object with custom toString', () => {
    const obj = { toString: () => '123' }
    expect(toNumber(obj)).toBe(123)
  })

  it('should handle null and undefined', () => {
    expect(toNumber(null)).toBe(0)
    expect(toNumber(undefined)).toBe(NaN)
  })

  it('should handle boolean values', () => {
    expect(toNumber(true)).toBe(1)
    expect(toNumber(false)).toBe(0)
  })
})
