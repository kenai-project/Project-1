require("dotenv").config();
console.log("🔐 OpenRouter Key Loaded:", process.env.OPENROUTER_API_KEY ? "✅ Yes" : "❌ No");

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require('body-parser');
const hl7 = require('simple-hl7');
const axios = require('axios');

const authRoutes = require("./routes/auth.routes");
const aiRoutes = require("./routes/ai.routes");
const hl7Routes = require("./routes/hl7.routes");
const fhirRoutes = require("./routes/fhir.routes");

const app = express();
app.use(bodyParser.json());

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

// Define the endpoint to send HL7 messages
app.post('/api/send-hl7', (req, res) => {
  const hl7Message = req.body.message;

  // Log the received HL7 message
  console.log("Received HL7 Message:", hl7Message);

  // Connect to the HL7 server (using TCP client)
  const client = hl7.Server.createTcpClient({ host: 'localhost', port: 7777 });

  // Send HL7 message
  client.send(hl7Message, (err, ack) => {
    if (err) {
      return res.status(500).json({ acknowledgment: "Error sending HL7 message: " + err.message });
    }

    console.log('Received ACK:', ack.log());
    res.status(200).json({ acknowledgment: ack.log() });
  });
});

// Start the server
app.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});