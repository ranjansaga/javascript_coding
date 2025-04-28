Array.prototype.myReduce = function(callback, initialValue) {
  if (this == null) {
    throw new TypeError('Array.prototype.myReduce called on null or undefined');
  }

  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }

  const array = Object(this); // Important: convert `this` into an object
  
  console.log('array', this)
  const length = array.length >>> 0; // Safe: non-negative length
  console.log('length', length)
  let index = 0;
  let accumulator;

  if (arguments.length >= 2) {
    accumulator = initialValue;
  } else {
    // No initialValue: find first defined element. This is for handling sparse arrays
    while (index < length && !(index in array)) {
      index++;
    }
    if (index >= length) {
      throw new TypeError('Reduce of empty array with no initial value');
    }
    accumulator = array[index++];
  }

  for (; index < length; index++) {
    if (index in array) {
      accumulator = callback(accumulator, array[index], index, array);
    }
  }

  return accumulator;
};

console.log([1,2,4].myReduce((acc, ele)=> acc+ele));
