import { describe, it, expect } from 'vitest'
import { hyphenate } from '../../src/string'

describe('hyphenate', () => {
  it('should convert camelCase to hyphenated', () => {
    expect(hyphenate('fooBar')).toBe('foo-bar')
    expect(hyphenate('fooBarBaz')).toBe('foo-bar-baz')
  })

  it('should handle single word', () => {
    expect(hyphenate('foo')).toBe('foo')
    expect(hyphenate('bar')).toBe('bar')
  })

  it('should handle empty string', () => {
    expect(hyphenate('')).toBe('')
  })

  it('should handle consecutive uppercase letters', () => {
    expect(hyphenate('parseJSON')).toBe('parse-j-s-o-n')
    expect(hyphenate('convertToSVG')).toBe('convert-to-s-v-g')
  })

  it('should handle already hyphenated strings', () => {
    expect(hyphenate('foo-bar')).toBe('foo-bar')
  })

  it('should produce lowercase output', () => {
    expect(hyphenate('FooBar')).toBe('foo-bar')
  })
})
