require("dotenv").config(); // Load environment variables

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth.routes");

const app = express();

// ✅ CORS Configuration
const corsOptions = {
  origin: "http://localhost:3000", // Allow frontend access
  credentials: true, // Allow cookies/auth headers
};
app.use(cors(corsOptions));

// ✅ Middleware
app.use(express.json()); // Parse JSON request bodies

// ✅ MongoDB Connection
if (!process.env.MONGO_URI) {
  console.error("❌ MONGO_URI is not defined in environment variables.");
  process.exit(1); // Exit the process if MONGO_URI is not set
}

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1); // Exit the process if MongoDB connection fails
  });

// ✅ Routes
app.use("/api/auth", authRoutes);

// ✅ Root Route (Health Check)
app.get("/", (req, res) => {
  res.send("🚀 API is running...");
});

// ✅ Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: "Something went wrong!" });
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
