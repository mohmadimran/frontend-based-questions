// This code creates a custom myMap method that mimics the behavior of JavaScript's native Array.prototype.map() method.


// Array.prototype.myMap = function(callback, thisArg) {
//   if (typeof callback !== "function") {
//     throw new TypeError(callback + " is not a function");
//   }

//   const result = [];
//   for (let i = 0; i < this.length; i++) {
//     // skip holes in sparse arrays
//     if (i in this) {
//       result.push(callback.call(thisArg, this[i], i, this));
//     }
//   }
//   return result;
// };

// // Example
// const nums = [1, 2, 3];
// console.log("result",nums.myMap(x => x * 2)); // [2, 4, 6]

// Simple Approch

Array.prototype.simpleMap = function (callback) {
    const newArray = [];

    for (let i = 0; i < this.length; i++) {
        // Take current item → transform it → add to new array
        const currentItem = this[i];
        const transformedItem = callback(currentItem, i, this);
        //     Calls your callback function with three arguments:
        // currentItem - the current element value
        // i - the current index position
        // this - the original array
        newArray.push(transformedItem);
    }

    return newArray;
};

// Usage
console.log("result of ", [1, 2, 4].simpleMap(num => num * 2)); // [2, 4, 8]