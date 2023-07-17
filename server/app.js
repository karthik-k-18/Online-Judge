import express from "express"; // Express web server framework
import bodyParser from "body-parser"; // Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
import dotenv from "dotenv";
dotenv.config(); // Load environment variables from .env file to process.env object
import connectDB from "./config/database.js"; // Connect to MongoDB
import cors from "./middlewares/cors.js"; // CORS middleware
// Routes
import userRoutes from "./routes/user_Endpoints.js";
import adminRoutes from "./routes/admin_Endpoints.js";
import problemRoutes from "./routes/problem_Endpoints.js";
import { authenticateUser } from "./middlewares/authenticate.js";
import { authorizeUser } from "./middlewares/authorize.js";

const app = express();

//middlewares
app.use(cors);
app.use(express.json());

// Connect to MongoDB
connectDB();

// API routes
app.use("/user", userRoutes);
app.use("/admin", adminRoutes);
// app.use(authenticateUser); // authenticate all the routes below
app.use("/problems", problemRoutes);
app.use(authorizeUser); // only admins are allowed to access the routes below

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});

//===============================================================================================

// require for CommonJS and import for ECMAScript modules

// CommonJS module
// const express = require('express');
// module.exports = express;

// ECMAScript module
// import express from 'express';
// export default express;