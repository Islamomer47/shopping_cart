const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const routes = require("./routes/index");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

// Configure CORS to allow specific origin and credentials
const corsOptions = {
  origin: "http://localhost:5173", // Your frontend origin
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
  credentials: true, // Allow credentials (cookies, etc.)
};

app.use(cors(corsOptions)); // Apply CORS middleware
app.use(express.json()); // Parse incoming JSON requests
app.use(cookieParser()); // Parse cookies from requests

app.use("/api", routes); // Define API routes
app.use(errorHandler); // Error handling middleware

module.exports = app;
