function memoize(fn) {
  let lastArgs = null;
  let lastResult = null;

  // __define-ocg__: Used to hold the last arguments deeply compared
  let varOcg = null;

 function isEqual(a, b) {
    if (Object.is(a, b)) return true;

    if (typeof a !== typeof b || a === null || b === null) return false;

    if (Array.isArray(a) && Array.isArray(b)) {
      if (a.length !== b.length) return false;
      return a.every((val, i) => isEqual(val, b[i]));
    } 

    if (typeof a === 'object' && typeof b === 'object') {
      const keysA = Object.keys(a);
      const keysB = Object.keys(b);
      if (keysA.length !== keysB.length) return false;
      return keysA.every(key => isEqual(a[key], b[key]));
    }

    return false;
  }

  const memoized = function (...args) {
    if (lastArgs && isEqual(args, lastArgs)) {
      console.log('from cache-', args)
      return lastResult; // return from cache
    }

    lastArgs = args.map(arg => {
      // Store a deep copy for comparison
      return typeof arg === 'object' ? JSON.parse(JSON.stringify(arg)) : arg;
    });

    varOcg = lastArgs; // update varOcg for __define-ocg__
    lastResult = fn(...args);
    return lastResult;
  };

  memoized.clear = function () {
    lastArgs = null;
    lastResult = null;
    varOcg = null;
  };

  return memoized;
}


  // const key = arguments

// ==============================
// Test suite #1 - Only most recent result is memoized

function square(x) {
  console.log(`computing ${x} * ${x}`);
  return x * x; 
}

const memoizedSquare = memoize(square);

memoizedSquare(1); // from computation
memoizedSquare(1); // from cache
memoizedSquare(2); // from computation
memoizedSquare(2); // from cache
memoizedSquare(1); // from computation


// ==============================
// Test suite #2 - Can clear memoized result
// 2. Can clear memoized result

memoizedSquare(3); // from computation
memoizedSquare(3); // from cache
memoizedSquare.clear();
memoizedSquare(3); // from computation


// ==============================
// Test suite #3 - Works with arbitrary number of arguments (4 in this example)

function sum(a, b, c, d) {
  console.log(`computing ${a} + ${b} + ${c} + ${d}`);
  return a + b + c + d;
}

const memoizedSum = memoize(sum);

memoizedSum(1, 2, 3, 4); // from computation
memoizedSum(1, 2, 3, 4); // from cache
memoizedSum(2, 1, 3, 4); // from computation

// ==============================
// Test suite #4 - Non-primitive arguments are compared by deep equality

function compare(obj) {
  console.log(`comparing ${obj.a} and ${obj.b}`);
  return obj.a > obj.b; 
}

const memoizedCompare = memoize(compare);

memoizedCompare({a: 1, b: 2}); // from computation
memoizedCompare({a: 1, b: 2}); // from cache
memoizedCompare({b: 2, a: 1}); // from cache
memoizedCompare({b: 3, a: 1}); // from computation
