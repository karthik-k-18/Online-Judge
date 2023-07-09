import express from "express";
const app = express();
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config();// Load environment variables from .env file to process.env object
import connectDB from "./config/database.js";
import cors from "./middlewares/cors.js";


//middlewares
app.use(cors);
app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

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