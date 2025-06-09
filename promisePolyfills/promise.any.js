const p1 = new Promise((resolve, reject) => {
  setTimeout(() => reject("first"), 2000);
});

const p2 = new Promise((resolve, reject) => {
  setTimeout(() => resolve("second"), 500);
});

Promise.myAny = function (promises) {
  const errorList = [];
  let counter = 0;
  return new Promise((resolve, reject) => {
    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then(resolve)
        .catch((e) => {
          errorList[index] = e;
          counter = counter + 1;
          if (counter === promises.length) {
            reject(errorList);
          }
        });
    });
  });
};

const getResults = async () => {
  try {
    const result = await Promise.myAny([p1, p2]);
    console.log("result is:", result);
  } catch (e) {
    console.log("error is:", e);
  }
};

getResults();
