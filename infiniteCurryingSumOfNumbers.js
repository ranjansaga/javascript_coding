function sum(a) {
  let total = a;

  function inner(b) {
    if (b === undefined) return total;
    total += b;
    return inner;
  }

  return inner;
}

console.log(sum(1)(2)(3)()); // ✅ 6

// currying with variable arguments
function sum(...args) {
  let total = args.reduce((acc, ele) => acc + ele, 0)
  return function inner(...args) {
    console.log("args", args)
    if (args.length === 0) {
      return total
    } else {
      total = total + args.reduce((acc, ele) => acc + ele, 0)
    }
    return inner
  }
}

console.log(sum(1, 2)(3)(2)())
