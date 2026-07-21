import { describe, it, expect } from 'vitest'
import { camelize } from '../../src/string'

describe('camelize', () => {
  it('should convert hyphenated string to camelCase', () => {
    expect(camelize('foo-bar')).toBe('fooBar')
    expect(camelize('foo-bar-baz')).toBe('fooBarBaz')
  })

  it('should handle single word', () => {
    expect(camelize('foo')).toBe('foo')
    expect(camelize('bar')).toBe('bar')
  })

  it('should handle empty string', () => {
    expect(camelize('')).toBe('')
  })

  it('should handle leading hyphens', () => {
    expect(camelize('-foo-bar')).toBe('FooBar')
  })

  it('should handle trailing hyphens', () => {
    expect(camelize('foo-bar-')).toBe('fooBar-')
  })

  it('should handle consecutive hyphens', () => {
    expect(camelize('foo--bar')).toBe('foo-Bar')
  })

  it('should return already camelCase strings unchanged', () => {
    expect(camelize('fooBar')).toBe('fooBar')
  })
})
