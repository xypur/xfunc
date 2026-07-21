import { describe, it, expect } from 'vitest'
import { toRawType } from '../../src/typed'

describe('toRawType', () => {
  it('should return correct raw type for primitives', () => {
    expect(toRawType('hello')).toBe('String')
    expect(toRawType(42)).toBe('Number')
    expect(toRawType(true)).toBe('Boolean')
    expect(toRawType(null)).toBe('Null')
    expect(toRawType(undefined)).toBe('Undefined')
  })

  it('should return correct raw type for objects', () => {
    expect(toRawType({})).toBe('Object')
    expect(toRawType([])).toBe('Array')
    expect(toRawType(new Date())).toBe('Date')
    expect(toRawType(/regex/)).toBe('RegExp')
  })

  it('should return correct raw type for built-in types', () => {
    expect(toRawType(new Map())).toBe('Map')
    expect(toRawType(new Set())).toBe('Set')
    expect(toRawType(new WeakMap())).toBe('WeakMap')
    expect(toRawType(new WeakSet())).toBe('WeakSet')
    expect(toRawType(new Error())).toBe('Error')
  })

  it('should handle function types', () => {
    expect(toRawType(() => {})).toBe('Function')
    expect(toRawType(async function() {})).toBe('AsyncFunction')
    expect(toRawType(function* () {})).toBe('GeneratorFunction')
  })

  it('should handle symbols and bigint', () => {
    expect(toRawType(Symbol('test'))).toBe('Symbol')
    expect(toRawType(BigInt(123))).toBe('BigInt')
  })
})
