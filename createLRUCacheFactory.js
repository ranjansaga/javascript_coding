function createLRUCache(capacity) {
  if (capacity <= 0) {
    throw new Error("Capacity must be greater than 0")
  }

  const myCache = new Map()

  function get(key) {
    if (!myCache.has(key)) {
      return null
    }
    const value = myCache.get(key)
    myCache.delete(key)
    myCache.set(key, value)
    return value
  }

  function add(key, value) {
    if (myCache.has(key)) {
      myCache.delete(key)
    } else if (myCache.size >= capacity) {
      const lruKey = myCache.keys().next().value
      myCache.delete(lruKey)
    }
    myCache.set(key, value)
  }
  function update(key, value) {
    if (!myCache.has(key)) {
      throw new Error(`Cannot update non-existing key: ${key}`)
    }
    myCache.delete(key)
    myCache.set(key, value)
  }

  function remove(key) {
    if (myCache.has(key)) {
      myCache.delete(key)
    }
  }

  function keys() {
    return Array.from(myCache.keys())
  }

  function values() {
    return Array.from(myCache.values())
  }

  function size() {
    return myCache.size
  }

  function clear() {
    myCache.clear()
  }
  return {
    get,
    add,
    update,
    remove,
    keys,
    values,
    size,
    clear,
  }
}

const cache = createLRUCache(3)

cache.add("a", 1)
cache.add("b", 2)
cache.add("c", 3)

console.log(cache.keys()) // ['a', 'b', 'c']

cache.get("a") // Access 'a' -> now 'a' is most recently used
cache.add("d", 4) // 'b' should be evicted (it was least recently used)

console.log(cache.keys()) // ['c', 'a', 'd']

cache.update("a", 10)
console.log(cache.get("a")) // 10

cache.remove("c")
console.log(cache.keys()) // ['a', 'd']

const cache2 = createLRUCache(3)

cache2.add("a", 1)
cache2.add("b", 2)
cache2.add("c", 3)

console.log(cache2.keys()) // ['a', 'b', 'c']

cache2.get("a") // Access 'a' -> now 'a' is most recently used
cache2.add("d", 4) // 'b' should be evicted (it was least recently used)

console.log(cache2.keys()) // ['c', 'a', 'd']

cache2.update("a", 10)
console.log(cache2.get("a")) // 10

cache2.remove("c")
console.log(cache2.keys()) // ['a', 'd']
