// step 1 - js on server vs browser
// console.log("window object", window);

// console.log("global object", global);

// step 2 - modules
const greetings = require("./module");

greetings.hello();

greetings.goodbye();