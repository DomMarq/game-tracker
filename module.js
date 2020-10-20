function sayHello() {
    console.log("hello world!");
}

function sayGoodbye() {
    console.log("goodbye!");
}

// method
// module.exports.sayHello = sayHello;

// overwrite exports to export single function
// exports.sayHello = sayHello;

// incorrect
// module.exports = sayHello;

// export multiple functions
// const greetings = {
//   hello: sayHello,
//   goodbye: sayGoodbye
// };

// only works with objects not functions
// module.exports = greetings;

// does not execute code directly, always wraps code in a module
// console.log("module: ", module);
// console.log("exports: ", exports);
// console.log("require: ", require);
// console.log("__filename: ", __filename);
// console.log("__dirname: ", __dirname);