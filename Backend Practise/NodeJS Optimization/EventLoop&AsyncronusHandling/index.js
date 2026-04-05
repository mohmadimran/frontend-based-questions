// First — What is the Event Loop?

// Node.js runs on a single thread that uses an event loop to handle all requests asynchronously.
// That means:

// When you call a DB, API, or file operation → it goes to the background (non-blocking).

// Meanwhile, Node.js can continue handling other requests.

// If we block the event loop (using sync code or await incorrectly), your server slows down — even for other users.

// 🔸 Point 1: Use Async/Await Properly

// Don’t use await inside loops when tasks can run in parallel.
// await in a loop runs sequentially, slowing down performance.

// 🚫 Bad Example (Sequential)
app.get("/users", async (req, res) => {
  const userIds = [1, 2, 3, 4, 5];
  const users = [];

  // Each iteration waits for the previous one — slow!
  for (const id of userIds) {
    const user = await getUserFromDB(id); // DB call
    users.push(user);
  }

  res.json(users);
});


// Problem:
// Each DB call waits for the previous one → 5 DB queries = 5x slower.

// ✅ Optimized Example (Parallel with Promise.all)
app.get("/users", async (req, res) => {
  const userIds = [1, 2, 3, 4, 5];

  // Run all DB calls concurrently
  const promises = userIds.map((id) => getUserFromDB(id));
  const users = await Promise.all(promises);

  res.json(users);
});


// Why it’s better:

// All DB calls start together (in parallel).

// Total time ≈ longest individual call, not sum of all.

// 🔸 Point 2: Defer Heavy Work

// If you have CPU-heavy tasks (report generation, encryption, image processing, etc.), they can block the event loop and slow down other requests.
// So, move them to worker threads or child processes.

// 🚫 Bad Example (Blocking)
app.get("/report", (req, res) => {
  // Simulate heavy CPU work
  let result = 0;
  for (let i = 0; i < 1e9; i++) {
    result += i;
  }
  res.send("Report generated!");
});


// ➡ While this route runs, the whole server hangs. No other route works.

// ✅ Optimized Example (Worker Thread)
const { Worker } = require("worker_threads");

app.get("/report", (req, res) => {
  const worker = new Worker("./generateReport.js");

  worker.on("message", (msg) => res.send(msg));
  worker.on("error", (err) => res.status(500).send(err.message));
});


// Worker Thread (generateReport.js):

// const { parentPort } = require("worker_threads");

// let result = 0;
// for (let i = 0; i < 1e9; i++) result += i;

// parentPort.postMessage("Report generated successfully!");


// ✅ Now, heavy CPU work runs in a separate thread, keeping the main event loop free for other requests.

// 🔸 Point 3: Monitor the Event Loop
// 🧠 Meaning:

// Even with async code, sometimes you accidentally block the event loop — for example, by using synchronous JSON parsing on large data or slow loops.
// Use tools to detect these issues.

// | Tool                     | Purpose                                          |
// | ------------------------ | ------------------------------------------------ |
// | **clinic.js**            | Monitors event loop, CPU, and memory performance |
// | **event-loop-inspector** | Detects if your code blocks the loop             |
// | **node --prof**          | Low-level Node.js profiling tool                 |
// | **0x**                   | Flame graph visualization for slow functions     |


// ✅ Example (Using clinic.js)
// npm install -g clinic
// clinic doctor -- node server.js


// Then visit localhost:3000 and simulate load →
// Clinic will show if your event loop is getting blocked and which function caused it.

// | Concept                      | What It Means                                   | Example                      | Benefit                  |
// | ---------------------------- | ----------------------------------------------- | ---------------------------- | ------------------------ |
// | **Use Async/Await Properly** | Don’t await inside loops; run tasks in parallel | `Promise.all()` for DB calls | Faster I/O               |
// | **Defer Heavy Work**         | Move CPU-heavy logic to worker threads          | Use `worker_threads`         | Prevents blocking        |
// | **Monitor Event Loop**       | Detect bottlenecks using tools                  | clinic.js / node --prof      | Identify slow operations |


// In short:

// To optimize the Node.js backend, handle async tasks smartly, offload heavy work, and keep the event loop responsive — so your server can handle hundreds of requests per second smoothly.