const express = require("express");
const router = express.Router();
const { parseHL7 } = require("../controllers/hl7.controller");

router.post("/parse-hl7", parseHL7);

module.exports = router;
