function deepClone(obj) {
  if (obj === null || typeof obj !== "object") {
    return obj; // primitive or null
  }

  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);

  if (Array.isArray(obj)) {
    return obj.map((item) => deepClone(item));
  }

  const result = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      result[key] = deepClone(obj[key]);
    }
  }
  return result;
}
