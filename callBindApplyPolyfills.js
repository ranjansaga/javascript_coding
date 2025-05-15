Function.prototype.myCall = function (context, ...args) {
  if (typeof this !== "function") {
    throw new Error("not callable ")
  }
  context.fn = this
  context.fn(...args)
}

Function.prototype.myApply = function (context, args = []) {
  if (!Array.isArray(args)) {
    console.log("error")
    throw new Error("CreateListFromArrayLike called on non-object")
  }
  context.fn = this
  context.fn(...args)
}

Function.prototype.myBind = function (context, ...args) {
  if (typeof this !== "function") {
    throw new Error("not callable ")
  }
  context.fn = this;
  return function(...newArgs) { // newArgs is passed during invocation after binding
  	return context.fn(...args, ...newArgs); // args is passed during bind time
  } 
}

const obj1 = {
  name: "ranjan",
}

function greet(age, place) {
  console.log("Hi " + this.name + " aged " + age + " years from " + place)
}

console.log(greet.myCall(obj1, 34, 'Manipal'))
console.log(greet.myApply(obj1, [34, 'Udupi']))
console.log(greet.myBind(obj1, 30, 'bind'));

const bind2 = greet.myBind(obj1,25,'test');
bind2(obj1,25,'test')
