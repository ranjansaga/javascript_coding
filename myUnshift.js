Array.prototype.myUnshift = function (...args) {
  const originalLength = this.length;
  const totalLength = originalLength + args.length;

  // Shift existing elements to the right
  for (let i = originalLength - 1; i >= 0; i--) {
    this[i + args.length] = this[i];
  }

  // Insert new elements at the beginning
  for (let i = 0; i < args.length; i++) {
    this[i] = args[i];
  }

  return totalLength;
};

// Example usage
let a = [1, 2, 3];
const result = a.myUnshift(4, 5, 6);

console.log('result:', result); // 6
console.log('a:', a);           // [4, 5, 6, 1, 2, 3]
