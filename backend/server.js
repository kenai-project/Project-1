require("dotenv").config();
console.log("🔐 OpenRouter Key Loaded:", process.env.OPENROUTER_API_KEY ? "✅ Yes" : "❌ No");

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const aiRoutes = require("./routes/ai.routes");
const hl7Routes = require("./routes/hl7.routes");
const fhirRoutes = require("./routes/fhir.routes");

const app = express();

// ✅ CORS Configuration
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};
app.use(cors(corsOptions));

// ✅ Middleware
app.use(express.json());

// ✅ MongoDB Connection
if (!process.env.MONGO_URI) {
  console.error("❌ MONGO_URI is not defined in environment variables.");
  process.exit(1);
}

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/hl7", hl7Routes);     // 🧾 HL7 parsing endpoint
app.use("/api/fhir", fhirRoutes);   // 📦 FHIR parsing endpoint

// ✅ Root Route
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
