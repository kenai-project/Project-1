const express = require("express");
const router = express.Router();
const { parseFHIR } = require("../controllers/fhir.controller");

router.post("/parse-fhir", parseFHIR);

module.exports = router;
