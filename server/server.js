// Import necessary modules
const app = require("./app");
const { connectDB } = require("./config/db");
require("dotenv").config(); // Load environment variables

const PORT = process.env.PORT || 5000; // Set the port from environment variables or default to 5000

// Connect to the database
connectDB();

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
