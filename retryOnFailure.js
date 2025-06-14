function getUsers(tryCount = 1, maxRetries = 3) {
  const apiProm = fetch('https://jsplaceholder.typicode.com/todos');
  apiProm
    .then((data) => {
      console.log('data', data);
    })
    .catch((e) => {
      console.log('error', tryCount);
      if (tryCount < maxRetries) {
        tryCount = tryCount + 1;
        getUsers(tryCount, maxRetries);
      }
    });
}

getUsers();
