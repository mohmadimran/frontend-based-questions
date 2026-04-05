// 1. Use Caching
// - Instead of fetching data from the database every time, store frequently accessed data in memory using Redis or Memcached.
// This greatly reduces response times for repeated requests.

// store user data in cashed memory for same request

// When to Use Caching:
// User profiles (like your example)
// Product catalogs
// Static content
// API responses
// Session data

const redis = require('redis');
const client = redis.createClient();

// Simulated database function
const getUserFromDB = async (id) => {
  // In real scenario, this would be an actual database query
  return { id, name: "Rooma Khan" };
};

// API endpoint with caching
app.get('/user/:id', async (req, res) => {
  const userId = req.params.id;
  
  // Step 1: Check if data exists in cache
  client.get(userId, async (err, data) => {
    if (data) {
      // Step 2a: Cache HIT - Return cached data
      return res.json(JSON.parse(data));
    }
    
    // Step 2b: Cache MISS - Fetch from database
    const user = await getUserFromDB(userId);
    
    // Step 3: Store in cache for future requests
    client.setex(userId, 3600, JSON.stringify(user)); // Cache for 1 hour
    
    // Step 4: Return the data
    res.json(user);
  });
});

// OR............................................................................................

// Enhanced version with error handling and metrics
app.get('/user/:id', async (req, res) => {
  const userId = req.params.id;
  const cacheKey = `user:${userId}`;
  
  try {
    // Try to get from cache
    const cachedData = await client.get(cacheKey);
    
    if (cachedData) {
      console.log('Cache HIT for user:', userId);
      return res.json(JSON.parse(cachedData));
    }
    
    console.log('Cache MISS for user:', userId);
    
    // Fetch from database
    const user = await getUserFromDB(userId);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Cache the result with TTL
    await client.setex(cacheKey, 3600, JSON.stringify(user));
    
    res.json(user);
    
  } catch (error) {
    console.error('Cache error:', error);
    // Fallback to database-only approach
    const user = await getUserFromDB(userId);
    res.json(user);
  }
});