// 1️⃣ Efficient Logic

// Write clean, minimal, and efficient logic — avoid nested loops, repeated operations, and slow algorithms.
// Always use the right data structures and algorithms for your task.

// 🚫 Bad Example:
// // Getting users with age > 25 and sorting manually
app.get("/users", async (req, res) => {
  const users = await User.find(); // returns all users

  // Bad logic: nested loop + manual sort
  const filtered = [];
  for (let i = 0; i < users.length; i++) {
    if (users[i].age > 25) {
      filtered.push(users[i]);
    }
  }

  // Manual sorting (inefficient)
  filtered.sort((a, b) => (a.name > b.name ? 1 : -1));

  res.json(filtered);
});

// ✅ Optimized Example:
// // Efficient Logic - let MongoDB handle filtering + sorting
app.get("/users", async (req, res) => {
  const users = await User.find({ age: { $gt: 25 } }).sort({ name: 1 });
  res.json(users);
});


// Why it’s better:

// Removes unnecessary loops.

// Uses MongoDB’s optimized query engine instead of JavaScript sorting/filtering.

// Less CPU load, faster response.
// .............................................................................................. 

// 🔹 2️⃣ Avoid Blocking Code

// Node.js is single-threaded — if you use synchronous code (fs.readFileSync, large loops, etc.), it blocks the event loop and freezes your server for other users.

// 🚫 Bad Example:
const fs = require("fs");

app.get("/download", (req, res) => {
  const data = fs.readFileSync("largeFile.txt"); // Blocking!
  res.send(data);
});


// readFileSync blocks the event loop until the file is fully read.

// Other routes (/login, /users) won’t respond during this time.

// ✅ Optimized Example:
const fs = require("fs").promises;

app.get("/download", async (req, res) => {
  const data = await fs.readFile("largeFile.txt", "utf8"); // Non-blocking
  res.send(data);
});


// Why it’s better:

// The server can handle other requests while the file is being read.

// Keeps event loop unblocked.

// ⚙️ Real-World CPU Blocking Example:

// If you process uploaded images or reports directly in your route:

// for (let i = 0; i < 1e9; i++) {}  // CPU-heavy operation


// ➡ Move that task to a worker thread or background job queue (like Bull.js) to prevent freezing your app.

// .............................................................................................. 

// 🔹 3️⃣ Use Native Methods

// Use Node.js and JavaScript’s built-in optimized methods instead of manually writing logic.
// Native methods are implemented in C/C++ internally and run much faster than JS loops.

// 🚫 Bad Example:
// // Custom way to double array values
const doubleArray = (arr) => {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    result.push(arr[i] * 2);
  }
  return result;
};

app.get("/data", (req, res) => {
  const nums = [1, 2, 3, 4, 5];
  res.send(doubleArray(nums));
});

// ✅ Optimized Example:
app.get("/data", (req, res) => {
  const nums = [1, 2, 3, 4, 5];
  res.send(nums.map((n) => n * 2)); // Native method
});


// Why it’s better:

// .map() is implemented natively and optimized at a lower level.

// Cleaner, faster, and easier to maintain.

// | Principle               | What to Do                                             | Example                                | Benefit                 |
// | ----------------------- | ------------------------------------------------------ | -------------------------------------- | ----------------------- |
// | **Efficient Logic**     | Use optimized algorithms; avoid nested loops           | Use DB queries instead of manual loops | Reduces CPU time        |
// | **Avoid Blocking Code** | Always use async I/O (`await`, Promises)               | `fs.promises.readFile()`               | Keeps server responsive |
// | **Use Native Methods**  | Prefer built-in JS methods (`map`, `filter`, `reduce`) | `users.filter(u => u.active)`          | Faster and cleaner code |


// In short:

// “Code optimization” in Node.js backend means writing clean, non-blocking, efficient code that uses async operations and built-in methods to reduce CPU and memory load — so your server stays fast and scalable even under heavy traffic.