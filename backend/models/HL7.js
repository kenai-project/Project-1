const mongoose = require("mongoose");

const hl7Schema = new mongoose.Schema({
  message: { type: String, required: true },
  parsedData: { type: Object, required: true },  // You can store the parsed data here
  createdAt: { type: Date, default: Date.now },
});

const HL7 = mongoose.model("HL7", hl7Schema);
module.exports = HL7;
