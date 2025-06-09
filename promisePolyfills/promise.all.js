const p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("first")
    }, 2000)
  })
  
  // Use this for error case
  /* const p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
      reject("first")
    }, 2000)
  }) */
  
  const p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("second")
    }, 500)
  })
  
  Promise.myAll = function (promises) {
    const result = []
    let completed = 0
    return new Promise((resolve, reject) => {
      promises.forEach((promise, index) => {
        Promise.resolve(promise)
          .then((data) => {
            result[index] = data
            completed = completed + 1
            console.log("result", result)
            if (completed === promises.length) {
              resolve(result)
            }
          })
          .catch((e) => {
            reject(e)
          })
      })
    })
  }
  
  const getResults = async () => {
    try {
      const result = await Promise.myAll([p1, p2]);
      console.log("result is", result);
    } catch (e) {
      console.log("error is", e);
    }
  };
  
  getResults()
  