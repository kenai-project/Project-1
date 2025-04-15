exports.parseFHIR = async (req, res) => {
  try {
    const { resourceType, data } = req.body;

    if (!resourceType || !data) {
      return res.status(400).json({ error: "Missing resourceType or data" });
    }

    // Here you can add validation, save to DB, etc.
    console.log("Received FHIR data:", data);

    res.status(200).json({
      message: "FHIR resource parsed successfully",
      resourceType,
      data
    });
  } catch (err) {
    console.error("Error parsing FHIR:", err.message);
    res.status(500).json({ error: "Failed to parse FHIR resource" });
  }
};
