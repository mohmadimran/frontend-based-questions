// Shallow Copy vs Deep Copy
// 1. Shallow Copy

// A shallow copy copies only the top-level properties of an object.

// If a property is a primitive (string, number, boolean, etc.), it copies the value.

// If a property is a reference type (object, array, etc.), it copies only the reference (not the actual object).

// So, changes in nested objects/arrays affect both copies.

// Example:

const original = { 
  name: "Alex", 
  skills: ["React", "Node.js"] 
};

// const shallow = { ...original }; // or Object.assign({}, original)

// shallow.skills.push("MongoDB");

// console.log(original.skills); // ["React", "Node.js", "MongoDB"] 😲 (changed!)


// 👉 Because skills is an array (reference type), both original and shallow point to the same array in memory.

// 2. Deep Copy

// A deep copy makes a completely independent clone of the object.

// It recursively copies all nested objects/arrays.

// After a deep copy, modifying the clone does not affect the original.

// Example (using our deepClone function):

const original = { 
  name: "Alex", 
  skills: ["React", "Node.js"] 
};

const deep = deepClone(original);

deep.skills.push("MongoDB");

console.log(original.skills); // ["React", "Node.js"] ✅ (unchanged)
console.log(deep.skills);     // ["React", "Node.js", "MongoDB"]


// 👉 Here, deep.skills is a new array in memory, so changes don’t leak back.

// ✅ Quick Comparison
// Feature	Shallow Copy	Deep Copy
// Copies top-level	✅ Yes	✅ Yes
// Copies nested objs	❌ Only references	✅ Full independent clone
// Memory usage	Lower (only references)	Higher (new copies everywhere)
// Use cases	Small/simple objects, immutability safe if no nesting	Complex/nested objects, avoiding side effects

// 👉 Interview Tip: If they ask for examples, mention Object.assign and spread (...) create shallow copies, while custom recursive functions (or libraries like Lodash cloneDeep) create deep copies.