const mongoose = require("mongoose");

const HL7RecordSchema = new mongoose.Schema({
  rawMessage: String,
  parsedData: mongoose.Schema.Types.Mixed,
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("HL7Record", HL7RecordSchema);
