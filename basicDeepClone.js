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

// Testing
const obj = {
  a: "test",
  b: { c: 1 },
  arr: [1, 2, 3, 4],
  arr2: [{ x: "y" }],
  d: null,
  e: new Date(),
  f: /abc/g
};

const obj2 = deepClone(obj);

console.log("obj2", obj2);
console.log("obj === obj2", obj === obj2); // false
console.log("obj.b === obj2.b", obj.b === obj2.b); // false
console.log("obj.arr2 === obj2.arr2", obj.arr2 === obj2.arr2); // false
