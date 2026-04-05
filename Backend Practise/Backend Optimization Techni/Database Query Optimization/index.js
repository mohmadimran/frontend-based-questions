// What is Query Optimization?
// Query optimization is the process of improving database query performance through various techniques like proper indexing, selective field retrieval, pagination, and strategic data modeling to reduce response times and resource consumption.


// 1. **Avoid SELECT *** - Use Projection

// Problem with SELECT *:
// ❌ INEFFICIENT - fetches all fields
const users = await db.collection('users').find({}).toArray();

// Solution - Selective Projection:
// ✅ EFFICIENT - fetches only needed fields

const users = await db.collection('users')
  .find(
    {}, // filter condition
    { projection: { name: 1, email: 1 } } // only these fields
  )
  .toArray();

//   Why this matters:

// Reduced Network Transfer: Less data sent over the network
// Lower Memory Usage: Application processes less data
// Faster Serialization: JSON parsing/stringifying is faster
// Database Efficiency: Database processes smaller documents

// .......................................................................................... 


// 2. Pagination with Limit

// Without Pagination:
// ❌ RISKY - could return thousands of records
const users = await db.collection('users').find({}).toArray();

// With Pagination:
// ✅ CONTROLLED - fixed result set
const users = await db.collection('users')
  .find({}, { projection: { name: 1, email: 1 } })
  .limit(20) // Only 20 records
  .toArray();


//   ................................................................................... 

// 3.  Proper Indexing

// Without Index:
// ❌ FULL COLLECTION SCAN
const user = await db.collection('users')
  .find({ email: "user@example.com" })
  .toArray();

//   with index 
// ✅ Create index first

await db.collection('users').createIndex({ email: 1 });

// Then query efficiently

   const user = await db.collection('users')
  .find({ email: "user@example.com" })
  .toArray();

//   ............................................................................................... 4. Data Modeling Strategies
// Denormalization for Read Performance

// Normalized (Multiple Collections):
// ❌ Multiple queries needed

const order = await db.collection('orders').findOne({ _id: orderId });
const user = await db.collection('users').findOne({ _id: order.userId });
const products = await db.collection('products')
  .find({ _id: { $in: order.productIds } })
  .toArray();

//   Denormalized (Read-Optimized):
// ✅ Single query - embed frequently accessed data

const order = await db.collection('orders').findOne({ _id: orderId });
Returns: {
  _id: "order123",
  user: { name: "John", email: "john@example.com" }, // Embedded
  products: [ // Embedded
    { name: "Product A", price: 99.99 },
    { name: "Product B", price: 149.99 }
  ],
  total: 249.98
}

// Best Practices Summary
// Always use projection to select only needed fields

// Implement pagination for large datasets

// Create appropriate indexes for query patterns

// Use denormalization for read-heavy operations

// Monitor query performance regularly

// Use aggregation pipeline for complex operations

// Implement connection pooling

// Use bulk operations for multiple writes