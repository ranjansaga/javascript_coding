function PromisePolyfill(executor) {
  let onResolve,
    onReject,
    isFulfilled = false,
    isRejected = false,
    isCalled = false,
    value

  this.then = function (callback) {
    onResolve = callback
    if (isFulfilled && !isCalled) {
      called = true
      onResolve(value)
    }
    return this
  }

  this.catch = function (callback) {
    onReject = callback
    if (isRejected && !isCalled) {
      called = true
      onReject(value)
    }
    return this
  }

  function resolve(val) {
    isFulfilled = true
    value = val
    if (typeof onResolve === "function") {
      onResolve(val)
    }
  }

  function reject(val) {
    isRejected = true
    value = val
    if (typeof onResolve === "function") {
      onReject(val)
    }
  }
  try {
    executor(resolve, reject)
  } catch (error) {
    console.log(error)
  }
}

const promise = new PromisePolyfill((resolve, reject) => {
  setTimeout(() => {
    resolve(2)
  }, 1000)
})

promise
  .then((res) => {
    console.log("inside then")
    console.log(res)
  })
  .catch((error) => {
    console.log("inside catch")
    console.log(error)
  })
