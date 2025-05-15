function deepClone(obj, seen = new WeakMap()) {
  // Handle primitives and null
  if (obj === null || typeof obj !== "object") return obj;

  // Handle circular references
  if (seen.has(obj)) return seen.get(obj);

  // Handle Date
  if (obj instanceof Date) return new Date(obj);

  // Handle RegExp
  if (obj instanceof RegExp) return new RegExp(obj);

  // Handle Function (return as-is)
  if (typeof obj === "function") return obj;

  // Handle Map
  if (obj instanceof Map) {
    const result = new Map();
    seen.set(obj, result);
    obj.forEach((value, key) => {
      result.set(deepClone(key, seen), deepClone(value, seen));
    });
    return result;
  }

  // Handle Set
  if (obj instanceof Set) {
    const result = new Set();
    seen.set(obj, result);
    obj.forEach((value) => {
      result.add(deepClone(value, seen));
    });
    return result;
  }

  // Handle Array
  if (Array.isArray(obj)) {
    const result = [];
    seen.set(obj, result);
    obj.forEach((item, index) => {
      result[index] = deepClone(item, seen);
    });
    return result;
  }

  // Handle Object
  const result = {};
  seen.set(obj, result);
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      result[key] = deepClone(obj[key], seen);
    }
  }

  return result;
}
