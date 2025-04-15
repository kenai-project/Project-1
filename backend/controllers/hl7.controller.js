const HL7 = require("hl7");
const HL7Record = require("../models/HL7Record");

exports.parseHL7 = async (req, res) => {
  try {
    const { hl7Message } = req.body;

    if (!hl7Message) return res.status(400).json({ error: "HL7 message is required" });

    const parsed = HL7.parseString(hl7Message);

    const newRecord = new HL7Record({
      rawMessage: hl7Message,
      parsedData: parsed,
    });

    await newRecord.save();

    res.status(201).json({ message: "HL7 parsed and saved", data: newRecord });
  } catch (err) {
    console.error("❌ HL7 Parse Error:", err);
    res.status(500).json({ error: "Failed to parse HL7" });
  }
};
