// datatype name = object
// Number = 1 or 1.1 or 1.1e-1
// String = "Hello World" or 'Hello World'
// Boolean = true or false
// Array = ["Hello", "World", 1, 1.1, true, false]

const { array } = require("yargs");

// console.log(typeof 1);

// var or let

// System.out.println("Hello World"); == console.log("Hello World");

var arr = [
    1,
    2,
    3,
    4,
    5
];

var obj = {
    name: "Hello World",
    age: 1,
    isAlive: true,
    key: [],
    obj: { name: "Hello World" }
};

arr[0];

// obj["name"] or obj.name
// obj.name
var thing = "age";
obj[thing]; // Hello World 

obj.obj.name; // Hello World

var arr = null;
var obj = undefined;

function name(a, b, c) {
    console.log("Hello World" + a + b + c);
}

name(1, "hi", 4);

var arr = [
    [1, 2, 3, 4],
    [2, 4, 6, 8],
    [3, 6, 9, 12],
    [4, 8, 12, 16]
];

console.log(arr[0][0]); // 1
console.log(arr[0].length);

for (let i = 0; i < arr[0].length; i++) {
    console.log(arr[0][i]);
    // 1 
    // 2
    // 3
    // 4
}

arr.push(); // add to end
arr.pop(); // remove from end

arr.shift(); // remove from start
arr.unshift(); // add to start

// arr.splice vs arr.slice

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
// changes the array

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice
// does not change the array, returns a new array

arr = [1, 2, 3, 4, 5];

arr.splice(0 /*staring index*/, 1 /*how many elements to remove*/); // remove from start
// arr = [2, 3, 4, 5];

arr.splice(0, 0, 1); // add to start

// wordhunt

makeBoard(4);
