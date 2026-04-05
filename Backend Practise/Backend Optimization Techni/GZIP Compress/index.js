// What is GZIP Compression?

// GZIP is a compression algorithm that reduces the size of the data before sending it over the network.

// In Node.js (Express backend), enabling GZIP means your JSON responses, HTML, CSS, JS files, etc., will be compressed into smaller chunks before being sent to the client’s browser.

// The browser automatically decompresses the data, so the client gets the full response with less data transferred.

// Why use it? (Benefits)

// Faster response time → Smaller payloads travel quicker.

// Reduced bandwidth usage → Saves server + client data.

// Better user experience → Especially important for APIs returning large JSON.

// eg. 
const express = require("express");
const compression = require("compression");

const app = express();

// Enable GZIP compression middleware
app.use(compression());

// Example route
app.get("/data", (req, res) => {
  res.json({ message: "This response will be GZIP compressed!" });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

// Things to Keep in Mind

// 1. Measure Before You Optimize

// Don’t blindly enable GZIP everywhere. Measure your app performance first.

// Use profiling tools:

// Node.js tools: clinic.js, node --prof → to see where the bottleneck is.

// APM tools: New Relic, Datadog → for production monitoring.

// Logging tools: Winston, Elasticsearch, Kibana → for analyzing response times and request sizes.

// 2. Don’t Over-Optimize Prematurely

// GZIP adds CPU overhead because it compresses responses.

// If your payloads are already small (tiny JSON, short messages), compression might not help much but still cost CPU cycles.

// Instead, focus first on the real bottlenecks:

// Slow DB queries (optimize indexes, query structure).

// Large payloads (send only necessary fields, use pagination).

// Tight loops / inefficient code (e.g., unnecessary nested iterations).

// 🔹 Example: When GZIP Helps

// Sending a 1 MB JSON response → GZIP can reduce it to ~200 KB.

// Huge improvement for clients with slow networks.

// 🔹 Example: When It Doesn’t Help Much

// Sending a small 2 KB JSON → Compression overhead > Benefit.