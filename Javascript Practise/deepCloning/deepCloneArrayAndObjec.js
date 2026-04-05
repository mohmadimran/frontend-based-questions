// Perfect 👍 Let’s create a simplified deep clone function that just works for Objects and Arrays (the most common interview expectation).

function deepClone(obj) {
  // Handle null or primitive values
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  // Handle Array
  if (Array.isArray(obj)) {
    return obj.map(item => deepClone(item));
  }

  // Handle Object
  const copy = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      copy[key] = deepClone(obj[key]);
    }
  }
  return copy;
}

const obj = {
  name: "Alex",
  skills: ["React", "Node.js"],
  details: { age: 25, country: "India" }
};

const clone = deepClone(obj);

console.log(clone);                     // full cloned object
console.log(clone.details === obj.details); // false ✅ (different reference)
console.log(clone.skills === obj.skills);   // false ✅
