// let n = 5;
// for(let i=0; i<n;i++){
//     console.log("hello, ", i);
// }

// console.log("Bye");
// let args = process.argv
// for(let i = 2; i<args.length; i++){
//     console.log("hello and welcome to ", args[i]);
// }
// console.log(process.argv)

// Module the export and import(require)
// const math = require("./math");
// console.log(math.mul(5,5));

// Export and import from fruits directory to this file 
// let fruits = require("./Fruits");
// console.log(fruits);

// let sports = require("./Sports");
// console.log(sports);

// import {sum, mul, g} from "./import.js";
// console.log(sum(3,4));
import {generate} from "random-words";
console.log(generate());