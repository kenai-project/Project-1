const express = require('express');
const router = express.Router();

router.post('/parse-hl7', (req, res) => {
  console.log("req.body:", req.body); // Should show { hl7Message: '...' }

  const hl7Message = req.body.hl7Message; // ✅ Corrected key name

  if (!hl7Message) {
    return res.status(400).json({ message: 'HL7 message is required.' });
  }

  console.log("Received HL7 Message:", hl7Message);
  res.status(200).json({ message: 'HL7 message processed successfully', data: hl7Message });
});

module.exports = router;
