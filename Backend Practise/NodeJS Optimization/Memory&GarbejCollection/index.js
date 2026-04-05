// 🧠 “Memory and Garbage Collection”

// This is crucial for keeping your Node.js backend stable, efficient, and scalable — especially in large MERN applications.

// 🔹 1️⃣ Avoid Memory Leaks

// A memory leak happens when your application keeps references to objects that are no longer needed, so Node’s Garbage Collector (GC) can’t free that memory.
// Over time, this makes your server slow or even crash with an “Out of Memory” error.

// ⚠️ Common Causes:

// Unclosed database connections

// Unremoved event listeners

// Large data stored in global variables or closures

// 🚫 Bad Example (Memory Leak through Listeners)
const express = require("express");
const EventEmitter = require("events");

const app = express();
const myEmitter = new EventEmitter();

app.get("/subscribe", (req, res) => {
  // Adds a new listener every request (never removed)
  myEmitter.on("event", () => console.log("Event fired!"));
  res.send("Listener added");
});


// If 10,000 users call /subscribe, that’s 10,000 listeners = memory explosion 💥.

// ✅ Optimized Example:
app.get("/subscribe", (req, res) => {
  const listener = () => console.log("Event fired!");
  myEmitter.once("event", listener); // Removed automatically after one call
  res.send("Listener added safely");
});


// OR
// Manually clean up when done:

myEmitter.removeListener("event", listener);

✅ Clean Database Connections Example:
mongoose.connect(DB_URI);

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("DB connection closed");
  process.exit(0);
});


// This ensures your app doesn’t keep dangling DB connections in memory after shutdowns.

// 🔹 2️⃣ Tune Node.js Heap Size

// Node.js gives a default memory limit (heap) — around 1.5 GB on 64-bit systems.
// For large apps (handling huge JSON, images, or data in memory), this can cause “JavaScript heap out of memory” errors.

// You can increase memory allocation using the --max-old-space-size flag.

// ✅ Example:
node --max-old-space-size=4096 server.js


// ➡ Allocates 4 GB of memory to your Node.js process.

// Useful for:

// Large in-memory processing

// Heavy data transformation tasks

// Microservices dealing with file uploads or analytics

// ⚠️ But Be Careful:

// Don’t just increase memory to hide leaks — first profile memory using tools like:

// clinic heapprof

// Chrome DevTools → “Memory” tab → attach to Node process

// node --inspect

// 🔹 3️⃣ Use Weak References
// 🧠 Meaning:

// When building caches or object maps, we sometimes keep large data in memory unnecessarily, even after it’s no longer used.
// This prevents garbage collection.

// WeakMap and WeakRef allow you to hold references to objects without preventing them from being garbage-collected when no longer needed.

// ✅ Example using WeakMap
// // Cache user session data
const sessionCache = new WeakMap();

function createSession(user) {
  const sessionData = { token: generateToken() };
  sessionCache.set(user, sessionData);
}

// // If 'user' object is deleted later,
// // the entry in WeakMap is also automatically garbage-collected.


// 🧩 This is better than a normal Map, where the data would stay in memory forever unless manually deleted.

// ✅ Example using WeakRef
class BigDataHolder {
  constructor() {
    this.data = new Array(1e6).fill("Some heavy data");
  }
}

let bigData = new BigDataHolder();
const weakRef = new WeakRef(bigData);

// // Later, we can release strong reference
// bigData = null;

// // If GC runs, the memory for BigDataHolder can be freed automatically

// ⚙️ Real-World Example: Memory Optimization in a MERN App

// Imagine a report generation API that:

// Fetches thousands of user records.

// Processes them into reports.

// Caches results.

// ❌ Bad:

// Keeps all reports in a global Map.

// Never clears old entries.

// Causes server crash after a few hours.

// ✅ Good:

// Uses WeakMap for temporary caching.

// Streams report generation (no large arrays in memory).

// Monitors memory usage via process.memoryUsage().


// | Concept                 | Description                                    | Example                                  | Benefit                      |
// | ----------------------- | ---------------------------------------------- | ---------------------------------------- | ---------------------------- |
// | **Avoid Memory Leaks**  | Release unused resources & listeners           | `.once()`, `.removeListener()`, close DB | Prevents slowdowns / crashes |
// | **Tune Heap Size**      | Increase memory allocation for large workloads | `node --max-old-space-size=4096`         | Handles large data safely    |
// // | **Use Weak References** | Allow GC to clean unused cache objects         | `WeakMap`, `WeakRef`                     | Memory auto-management       |

// In short:

// Memory optimization in Node.js is about keeping your app light, clean, and garbage-collector friendly —
// release what’s not needed, give enough memory when needed, and let GC do its job efficiently.