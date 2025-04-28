Array.prototype.myFilter = function(cb) {
  let result = [];
  for (let i = 0; i < this.length; i++) {
    if (cb(this[i], i, this)) {
      result.push(this[i]);
    }
  }
  return result;
}

// Execute with myFilter
const res = [124, 5, 6, 8].myFilter((item) => {
  return item > 6;
});

console.log("res", res); // Output: res [124, 8]
