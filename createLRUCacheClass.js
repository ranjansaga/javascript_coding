class LRUCache {
  constructor(capacity) {
    if (capacity <= 0) {
      throw new Error("Capacity must be greater than 0");
    }
    this.capacity = capacity;
    this.cache = new Map();
  }

  get(key) {
    if (!this.cache.has(key)) {
      return null;
    }
    const value = this.cache.get(key);
    // Move the key to the end to mark it as recently used
    this.cache.delete(key);
    this.cache.set(key, value);
    return value;
  }

  add(key, value) {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.capacity) {
      // Evict the least recently used item
      const lruKey = this.cache.keys().next().value;
      this.cache.delete(lruKey);
    }
    this.cache.set(key, value);
  }

  update(key, value) {
    if (!this.cache.has(key)) {
      throw new Error(`Cannot update non-existing key: ${key}`);
    }
    this.cache.delete(key);
    this.cache.set(key, value);
  }

  remove(key) {
    this.cache.delete(key);
  }

  keys() {
    return Array.from(this.cache.keys());
  }

  values() {
    return Array.from(this.cache.values());
  }

  size() {
    return this.cache.size;
  }

  clear() {
    this.cache.clear();
  }
}

const cache = new LRUCache(3);

cache.add('a', 1);
cache.add('b', 2);
cache.add('c', 3);

// Access 'a' to mark it as recently used
cache.get('a');

// Add 'd', which should evict 'b'
cache.add('d', 4);

console.log(cache.keys()); 
// Expected: ['c', 'a', 'd']
