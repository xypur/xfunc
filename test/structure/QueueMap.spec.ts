import { describe, it, expect } from 'vitest'
import { QueueMap } from '../../src/structure'

describe('QueueMap', () => {
  it('should maintain insertion order', () => {
    const map = new QueueMap<string, number>()
    map.set('a', 1)
    map.set('b', 2)
    map.set('c', 3)
    expect([...map.keys()]).toEqual(['a', 'b', 'c'])
  })

  it('should getFirst return the first entry', () => {
    const map = new QueueMap<string, number>()
    map.set('a', 1)
    map.set('b', 2)
    expect(map.getFirst()).toBe(1)
  })

  it('should removeFirst remove and return the first entry', () => {
    const map = new QueueMap<string, number>()
    map.set('a', 1)
    map.set('b', 2)
    expect(map.removeFirst()).toBe(1)
    expect([...map.keys()]).toEqual(['b'])
  })

  it('should isEmpty reflect correct state', () => {
    const map = new QueueMap()
    expect(map.isEmpty()).toBe(true)
    map.set('a', 1)
    expect(map.isEmpty()).toBe(false)
    map.delete('a')
    expect(map.isEmpty()).toBe(true)
  })

  it('should handle empty map for getFirst', () => {
    const map = new QueueMap()
    expect(map.getFirst()).toBeUndefined()
  })

  it('should handle empty map for removeFirst', () => {
    const map = new QueueMap()
    expect(map.removeFirst()).toBeUndefined()
  })

  it('should inherit Map methods', () => {
    const map = new QueueMap<string, number>()
    map.set('a', 1)
    expect(map.get('a')).toBe(1)
    expect(map.has('a')).toBe(true)
    expect(map.size).toBe(1)
    map.clear()
    expect(map.size).toBe(0)
  })

  it('should accept initial iterable', () => {
    const map = new QueueMap([['a', 1], ['b', 2]])
    expect(map.size).toBe(2)
    expect(map.getFirst()).toBe(1)
  })

  it('should work with object keys', () => {
    const key = { id: 1 }
    const map = new QueueMap<object, string>()
    map.set(key, 'value')
    expect(map.getFirst()).toBe('value')
    expect(map.removeFirst()).toBe('value')
    expect(map.isEmpty()).toBe(true)
  })
})
