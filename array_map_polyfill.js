Array.prototype.myMap = function(cb) {
    const temp = [];
    for (let i = 0; i < this.length; i++) {
      if (i in this) {  // Check if index exists in the original array
        temp[i] = cb(this[i], i, this);  // Process the existing element
      }
    }
    return temp;
  };
  
  const res = [1, , , , 2, 3].myMap((item) => {
    return item * item;
  });
  
  console.log('res', res);  // [1, <1 empty slot>, <1 empty slot>, <1 empty slot>, 4, 9]
  console.log(1 in res);  // false
  console.log(2 in res);  // false
  console.log(3 in res);  // false
  