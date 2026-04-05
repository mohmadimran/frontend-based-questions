// 5. Caching
// 🔹 1. In-Memory Caching

// Concept: Store frequently accessed data directly in server memory instead of fetching it repeatedly from the database.

// Use Case Example:

const NodeCache = require("node-cache");
const cache = new NodeCache({ stdTTL: 60 }); // Cache valid for 60 seconds

app.get("/users/:id", async (req, res) => {
  const userId = req.params.id;

  // Check cache first
  const cachedUser = cache.get(userId);
  if (cachedUser) return res.json(cachedUser);

  // Otherwise, fetch from DB
  const user = await User.findById(userId);
  cache.set(userId, user);
  res.json(user);
});


// ✅ Result: Reduces database load and speeds up repeated requests.
// ............................................................................................... 
// 🔹 2. API Response Caching

// Concept: Cache complete HTTP responses for GET requests so the server doesn’t recompute the same result.

// Example using apicache:

const apicache = require('apicache');
const cache = apicache.middleware;

app.get('/products', cache('5 minutes'), async (req, res) => {
  const products = await Product.find();
  res.json(products);
});


// ✅ Result: Next client requests within 5 minutes get cached data — fewer DB queries.
// ............................................................................................. 

// 🔹 3. CDN Usage

// Concept: Use a Content Delivery Network (CDN) like Cloudflare or AWS CloudFront to serve static assets (images, CSS, JS) from servers near the user’s location.

// Example:

// // In frontend build:
<img src="https://cdn.myapp.com/images/banner.jpg" />


// ✅ Result: Faster page loads globally because users fetch files from the nearest CDN node.

// 🚀 Example Techniques & Real-World Usage

// ✅ Clustering with PM2

// Concept: Use all CPU cores by running multiple Node.js instances.

// Example:

// pm2 start app.js -i max


// This starts one Node.js process per CPU core.
// ✅ Result: Increased throughput (more concurrent requests handled).

// ✅ Profiling with Clinic.js

// Concept: Detect bottlenecks and blocking operations.

// Example:

// Found a blocking JSON.parse() in an API route.

// Moved it to a worker thread:

const { Worker } = require('worker_threads');
new Worker('./parseWorker.js', { workerData: largeJsonString });


// ✅ Result: Response time improved because main event loop stayed free.

// ✅ Redis Caching

// Concept: Use Redis (in-memory database) to store sessions or common queries.

// Example:

const Redis = require('ioredis');
const redis = new Redis();

app.get('/products', async (req, res) => {
  const cachedData = await redis.get('allProducts');
  if (cachedData) return res.json(JSON.parse(cachedData));

  const products = await Product.find();
  await redis.set('allProducts', JSON.stringify(products), 'EX', 300); // 5 min
  res.json(products);
});


// ✅ Result: 70% fewer database hits → faster API responses.

// ✅
 Promise.all() for Parallel API Calls

// Concept: Instead of making multiple API/database calls one by one, run them concurrently.

// Example:

// // ❌ Sequential (slow)
const user = await getUser();
const orders = await getOrders(user.id);

// // ✅ Parallel (fast)
// const [user, orders] = await Promise.all([getUser(), getOrders()]);


// ✅ Result: Reduced total response time by ~50%.

// ..........................................................................................................

// | Optimization          | Benefit                              |
// | --------------------- | ------------------------------------ |
// | **In-memory caching** | Faster responses for repeat requests |
// | **API caching**       | Reduces redundant DB queries         |
// | **CDN**               | Speeds up global asset delivery      |
// | **Clustering (PM2)**  | Uses all CPU cores efficiently       |
// | **Profiling tools**   | Identify performance bottlenecks     |
// | **Redis caching**     | Offloads DB, improves scalability    |
// | **Promise.all()**     | Parallelizes async tasks             |
