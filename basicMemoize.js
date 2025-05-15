// basic memoization with few utilities like clear, size, has

function memoize(func) {
  const myCache = {}

  function memoized(...args) {
    const key = args.join(",")
    if (key in myCache) {
      console.log("from cache")
      return myCache[key]
    }
    const result = func(...args)
    myCache[key] = result
    console.log("from result")
    return result
  }

  memoized.clear = function () {
    for (key in myCache) {
      delete myCache[key]
    }
    console.log('cache now', JSON.stringify(myCache));
  }

  memoized.size = function () {
    return Object.keys(myCache).length
  }

  memoized.has = function (...args) {
    const key = JSON.stringify(args)
    return key in myCache
  }
  return memoized
}

function add(a, b) {
  return a + b
}

memoizedAdd = memoize(add)
memoizedAdd(2, 3)
memoizedAdd(2, 3)
memoizedAdd(2, 3)
memoizedAdd.has(2,3)
console.log('size', memoizedAdd.size());
memoizedAdd.clear();
memoizedAdd(2, 3)
