import { describe, it, expect } from 'vitest'
import { isTypeString } from '../../src/typed'

describe('isTypeString', () => {
  it('should return true for matching type strings', () => {
    expect(isTypeString({}, 'Object')).toBe(true)
    expect(isTypeString([], 'Array')).toBe(true)
    expect(isTypeString('', 'String')).toBe(true)
    expect(isTypeString(42, 'Number')).toBe(true)
    expect(isTypeString(true, 'Boolean')).toBe(true)
    expect(isTypeString(null, 'Null')).toBe(true)
    expect(isTypeString(undefined, 'Undefined')).toBe(true)
  })

  it('should return false for non-matching type strings', () => {
    expect(isTypeString({}, 'Array')).toBe(false)
    expect(isTypeString([], 'Object')).toBe(false)
    expect(isTypeString('hello', 'Number')).toBe(false)
  })

  it('should match specific built-in types', () => {
    expect(isTypeString(new Date(), 'Date')).toBe(true)
    expect(isTypeString(/regex/, 'RegExp')).toBe(true)
    expect(isTypeString(new Map(), 'Map')).toBe(true)
    expect(isTypeString(new Set(), 'Set')).toBe(true)
  })
})
