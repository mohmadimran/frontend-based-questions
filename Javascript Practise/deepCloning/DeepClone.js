// Deep Cloning in JavaScript without the limitations of JSON.parse(JSON.stringify(obj).

// 🔹 First, what’s the problem with JSON.parse(JSON.stringify(obj))?

// ❌ It does not handle functions.

// ❌ It loses special objects like Date, Map, Set, RegExp.

// ❌ It breaks circular references (when object refers back to itself).

// So we need our own deep clone function.
function deepClone(obj, visited = new WeakMap()) {
  // Handle null or primitive values (string, number, boolean, etc.)
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  // Avoid infinite recursion with circular references
  if (visited.has(obj)) {
    return visited.get(obj);
  }

  // Handle Date
  if (obj instanceof Date) {
    return new Date(obj);
  }

  // Handle RegExp
  if (obj instanceof RegExp) {
    return new RegExp(obj);
  }

  // Handle Array
  if (Array.isArray(obj)) {
    const copy = [];
    visited.set(obj, copy); // store reference
    obj.forEach((item, i) => {
      copy[i] = deepClone(item, visited);
    });
    return copy;
  }

  // Handle Map
  if (obj instanceof Map) {
    const copy = new Map();
    visited.set(obj, copy);
    obj.forEach((value, key) => {
      copy.set(key, deepClone(value, visited));
    });
    return copy;
  }

  // Handle Set
  if (obj instanceof Set) {
    const copy = new Set();
    visited.set(obj, copy);
    obj.forEach((value) => {
      copy.add(deepClone(value, visited));
    });
    return copy;
  }

  // Handle Objects
  const copy = {};
  visited.set(obj, copy);
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      copy[key] = deepClone(obj[key], visited);
    }
  }
  return copy;
}


const obj = {
  name: "Alex",
  date: new Date(),
  reg: /abc/gi,
  nested: { age: 25 },
  arr: [1, { deep: "yes" }],
  map: new Map([["key", { val: 123 }]]),
  set: new Set([1, 2, 3]),
};

obj.self = obj; // Circular reference

const clone = deepClone(obj);

console.log(clone);
console.log(clone.nested === obj.nested); // false (different reference ✅)
console.log(clone.date === obj.date);     // false (new Date object ✅)
