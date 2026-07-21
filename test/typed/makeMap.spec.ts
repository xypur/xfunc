import { describe, it, expect } from 'vitest'
import { makeMap } from '../../src/typed'

describe('makeMap', () => {
  it('should return a function that checks membership', () => {
    const isAllowed = makeMap('a,b,c')
    expect(isAllowed('a')).toBe(true)
    expect(isAllowed('b')).toBe(true)
    expect(isAllowed('c')).toBe(true)
  })

  it('should return false for non-members', () => {
    const isAllowed = makeMap('a,b,c')
    expect(isAllowed('d')).toBe(false)
    expect(isAllowed('')).toBe(false)
  })

  it('should handle empty string', () => {
    const isAllowed = makeMap('')
    expect(isAllowed('a')).toBe(false)
    expect(isAllowed('')).toBe(true)
  })

  it('should handle single value', () => {
    const isAllowed = makeMap('only')
    expect(isAllowed('only')).toBe(true)
    expect(isAllowed('other')).toBe(false)
  })

  it('should not be vulnerable to __proto__', () => {
    const isAllowed = makeMap('a,b')
    expect(isAllowed('__proto__')).toBe(false)
  })
})
