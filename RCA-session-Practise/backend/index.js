const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const authRoutes = require("./routes/auth")
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("mongodb connected")
}).catch((error)=>{ console.log(error.message)})

app.use("/api/auth",authRoutes)
// app.use("/api/users",userRoutes);

app.listen(process.env.PORT,()=>{
    console.log("server start")
})
