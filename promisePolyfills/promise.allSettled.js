const p1 = new Promise((resolve, reject) => {
  setTimeout(() => reject("first"), 2000);
});

const p2 = new Promise((resolve) => {
  setTimeout(() => resolve("second"), 500);
});

Promise.myAllSettled = function (promises) {
  const result = promises.map((promise) => {
    return Promise.resolve(promise)
      .then((data) => {
        return { status: "fulfilled", value: data };
      })
      .catch((e) => {
        return { status: "rejected", reason: e };
      });
  });
  return Promise.all(result);
};

const getResults = async () => {
  const result = await Promise.myAllSettled([p1, p2]);
  console.log("result is:", result);
};

getResults();
