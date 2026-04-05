// Why Use Hash Maps? (Key Benefits)

// 1. Lightning-Fast Lookups - O(1) Time Complexity

// Array search: O(n) - Slow for large data

const array = [{id: 1, name: 'Alice'}, {id: 2, name: 'Bob'}];
function findUserArray(id) {
  return array.find(user => user.id === id); // O(n) - checks each element
}

// Hash map search: O(1) - Instant!
const map = new Map();
map.set(1, {id: 1, name: 'Alice'});
map.set(2, {id: 2, name: 'Bob'});
function findUserMap(id) {
  return map.get(id); // O(1) - direct access!
}

// 2. Efficient Duplicate Detection
// Remove duplicates from array

function removeDuplicates(arr) {
  const seen = new Map(); // Or {}
  const result = [];
  
  for (let item of arr) {
    if (!seen.has(item)) { // O(1) check!
      seen.set(item, true); // O(1) store
      result.push(item);
    }
  }
  return result;
}
// TC: O(n) instead of O(n²) with nested loops!

// 3. Counting Occurrences
// Count how many times each word appears

const words = ['apple', 'banana', 'apple', 'orange', 'banana', 'apple'];

const countMap = new Map();
for (let word of words) {
  countMap.set(word, (countMap.get(word) || 0) + 1);
}

// Result: Map { 'apple' → 3, 'banana' → 2, 'orange' → 1 }

// 4. Caching/Memoization
// Fibonacci with memoization (dramatic speedup!)

const cache = new Map();

function fib(n) {
  if (n <= 1) return n;
  if (cache.has(n)) return cache.get(n); // O(1) cache check
  
  const result = fib(n-1) + fib(n-2);
  cache.set(n, result); // O(1) cache store
  return result;
}
// Without cache: O(2ⁿ) → With cache: O(n)

// 🔧 Practical Examples
// Example 1: User Database

class UserDatabase {
  constructor() {
    this.users = new Map(); // userId → userData
  }
  
  addUser(id, name, email) {
    this.users.set(id, { id, name, email });
  }
  
  getUser(id) {
    return this.users.get(id); // O(1) - instant access!
  }
  
  deleteUser(id) {
    this.users.delete(id); // O(1) - fast deletion!
  }
}


// Example 2: Shopping Cart

class ShoppingCart {
  constructor() {
    this.items = new Map(); // productId → quantity
  }
  
  addItem(productId, quantity = 1) {
    const current = this.items.get(productId) || 0;
    this.items.set(productId, current + quantity);
  }
  
  getTotalItems() {
    let total = 0;
    for (let quantity of this.items.values()) {
      total += quantity;
    }
    return total;
  }
}

// Example 3: Graph Relationships
// Social network friendships

const graph = new Map();

// Alice is friends with Bob and Charlie

graph.set('Alice', new Set(['Bob', 'Charlie']));
graph.set('Bob', new Set(['Alice', 'David']));
graph.set('Charlie', new Set(['Alice']));

// Check if two people are friends - O(1)
function areFriends(person1, person2) {
  return graph.get(person1)?.has(person2) || false;
}

// 🚀 When to Use Hash Maps
// Use Hash Maps When:
// ✅ Fast lookups are needed

// ✅ Duplicate detection is required

// ✅ Key-value relationships exist

// ✅ Frequent insertions/deletions occur

// ✅ Counting or grouping data

// Avoid Hash Maps When:
// ❌ You need to maintain specific order (use Array)

// ❌ You need range queries (use Tree)

// ❌ Memory is extremely limited (arrays are more compact)

// 🎯 Real-World Use Cases
// Database indexing - Fast record retrieval

// Caching systems - Store computed results

// Router tables - Network packet routing

// Symbol tables - Compiler variable storage

// Session management - Web application sessions