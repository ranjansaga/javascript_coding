const p1 = new Promise((resolve, reject) => {
  setTimeout(() => reject("first"), 2000);
});

const p2 = new Promise((resolve, reject) => {
  setTimeout(() => reject("second"), 500);
});

Promise.myRace = function (promises) {
  return new Promise((resolve, reject) => {
    promises.forEach((promise) => {
      Promise.resolve(promise).then(resolve).catch(reject);
    });
  });
};

const getResults = async () => {
  try {
    const result = await Promise.myRace([p1, p2]);
    console.log("result is:", result);
  } catch (e) {
    console.log("result is:", e);
  }
};

getResults();
