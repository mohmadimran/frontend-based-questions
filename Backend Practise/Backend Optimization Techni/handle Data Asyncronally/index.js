// Asynchronous programming allows code execution to continue without waiting for time-consuming operations to complete. Instead of blocking the entire process, it handles operations in the background and processes the results when they're ready.

// Key Benefits:

// Non-blocking Execution: Other operations can continue while waiting for I/O

// Better Resource Utilization: Single thread can handle multiple operations

// Improved Performance: Higher throughput for I/O-bound applications

// Better Scalability: Handle more concurrent requests

// Responsive Applications: Don't freeze during long operations

// We use asynchronous programming in the backend of MERN apps whenever there’s I/O (Database, File system, Network requests, Authentication, Real-time events).

// It use for 

// 1. Database Operations (MongoDB + Mongoose)

// Every query to MongoDB is asynchronous.

// Example:

const user = await User.findById(id);  // async


// If this were synchronous, your server would freeze until MongoDB responds.

// 2. API Calls (External Services / REST APIs)

// When your backend calls an external service (payment gateway, email API, third-party API).

// Example:

const response = await axios.get("https://api.example.com/data");

// 3. File System Operations (fs module, file uploads)

// Reading/writing files is slow, so we use async functions.

// Example:

const data = await fs.promises.readFile("file.txt", "utf8");

// 4. Authentication (Hashing & Token Generation)

// Password hashing (bcrypt.hash, bcrypt.compare) is asynchronous.

// JWT token signing/verification can also be async.

// Example:

const hash = await bcrypt.hash(password, 10);
const match = await bcrypt.compare(password, hash);

// 5. Network Calls (Email, SMS, Notifications)

// Sending emails (e.g., Nodemailer) or SMS (Twilio) is async.

// Example:

await transporter.sendMail(mailOptions);


