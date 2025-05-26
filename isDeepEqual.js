function isEqual(a, b) {
  
  // Check for primitives
  if (a === b) return true
  if (typeof a !== typeof b || a === null || b === null) return false
  
  // Check for Set. First check for its size if equal then check each item
  if(a instanceof Set && b instanceof Set) {
  	if (a.size !== b.size) return false
    return [...a].every((item)=> b.has(item))
  }

   // Check for Map. First check for its size if equal then check each item
  if(a instanceof Map && b instanceof Map) {
  	if (a.size !== b.size) return false
    for(let [key, val] of a) {
    	if(!b.has(key) || !isEqual(val, b.get(key))) return false
    }
    return true
  }

  // Check if both arrays. First check for array length if equal then check each item
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false
    return a.every((item, i) => isEqual(item, b[i]))
  }

  // Check if both objects. First check for object keys length if equal then check each item
  if (typeof a === "object" && typeof b === "object") {
    if (Object.keys(a).length !== Object.keys(b).length) return false
    return Object.keys(a).every((item, i) => {
      return isEqual(a[item], b[item])
    })
  }

  return false
}

let a = new Map();
a.set(1)
let b = new Map();
b.set(2)
const result = isEqual(a, b)
console.log(result)
