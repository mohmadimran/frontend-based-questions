// <!-- 4. Database Optimization in Node.js (MERN Backend)

// When your backend frequently talks to the database, query performance and connection efficiency become key to scalability and speed.

// 1️⃣ Connection Pooling
// 🔹 Concept:

// Instead of creating a new connection to MongoDB for every request, use a connection pool — a reusable set of connections that can handle multiple concurrent database operations.

// MongoDB’s driver (used internally by Mongoose) automatically manages a connection pool.
// You can tune its size for better performance under high load.

// 🧠 Example:
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/shopDB", {
  maxPoolSize: 10,  // 🧩 Allows up to 10 concurrent DB connections
  minPoolSize: 2,   // Keep 2 always alive
  serverSelectionTimeoutMS: 5000
})
  .then(() => console.log("MongoDB Connected with Pooling"))
  .catch(err => console.error("Connection Error:", err));


// ✅ Result:
// Efficient reuse of DB connections → reduced connection overhead → better scalability when multiple users hit your API at once.

// 2️⃣ Efficient Queries
// 🔹 Concept:

// Fetch only what you need.

// Create indexes for frequently queried fields.

// Use .lean() for faster reads.

// Analyze queries using MongoDB’s explain() method.

// 🧠 Example 1 — Fetch only required fields:
// // ❌ Bad: Fetches entire document
const user = await User.findById(userId);

// // ✅ Good: Fetch only needed fields
const user = await User.findById(userId, "name email");


// ✅ Benefit: Less data transfer → faster response.

// 🧠 Example 2 — Use Indexing for Search Fields:

// If you frequently query by email, index it.

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, index: true }, // 🔹 Adds index
  age: Number
});


// ✅ Benefit: Searching users by email becomes 10x faster.

// 🧠 Example 3 — Use .lean() for Read-Only Queries:
// // ❌ Without lean()
const users = await User.find(); // Returns full Mongoose docs (heavy)

// // ✅ With lean()
const users = await User.find().lean(); // Returns plain JS objects (lightweight)


// ✅ Benefit: Reduces memory overhead for read-heavy endpoints.

// 🧠 Example 4 — Check Query Performance:

// Use explain() to analyze query execution.

// const result = await User.find({ email: "test@gmail.com" }).explain("executionStats");
// console.log(result.executionStats);


// ✅ Benefit: Helps detect full collection scans (slow queries without indexes).

// 3️⃣ Batch Operations
// 🔹 Concept:

// When performing multiple inserts, updates, or deletes, use bulk operations instead of looping individual queries.

// Each query = 1 round trip to DB → dozens of queries slow down your app.

// 🧠 Example:
// // ❌ Bad: Many round trips
for (const product of productsArray) {
  await Product.create(product);
}

// // ✅ Good: One bulk write
await Product.insertMany(productsArray);


// ✅ Result: Fewer round trips → faster inserts → better throughput.

// 🧠 Example 2 — Bulk Update:
await Product.bulkWrite([
  { updateOne: { filter: { category: "electronics" }, update: { $set: { discount: 10 } } } },
  { updateOne: { filter: { category: "furniture" }, update: { $set: { discount: 15 } } } }
]);


// ✅ Benefit: 1 network call handles multiple updates efficiently.

// | Optimization           | Description                   | Example                       | Benefit                     |
// | ---------------------- | ----------------------------- | ----------------------------- | --------------------------- |
// | **Connection Pooling** | Reuse DB connections          | `maxPoolSize: 10`             | Reduces connection overhead |
// | **Efficient Queries**  | Fetch less data & use indexes | `.lean()`, `index: true`      | Faster queries              |
// | **Explain / Analyze**  | Check query performance       | `.explain("executionStats")`  | Identify slow queries       |
// | **Batch Operations**   | Combine writes/updates        | `insertMany()`, `bulkWrite()` | Reduces network calls       |



// Real-World MERN Example: Product API with Optimized DB Access
app.get("/api/products", async (req, res) => {
  try {
    const { category } = req.query;

    // Use index, lean, and field projection
    const products = await Product.find({ category })
      .select("name price category -_id")
      .lean()
      .exec();

    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});


// ✅ Optimizations inside this route:

// .lean() → faster, lighter read

// .select() → fetch only needed fields

// category indexed in schema

// Shared DB connections (pooled) -->