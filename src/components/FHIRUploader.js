import React, { useState } from 'react';
import axios from 'axios';
import './FHIRUploader.css'; // Reusing the same styles

const FHIRUploader = () => {
  const [file, setFile] = useState(null);
  const [resourceType, setResourceType] = useState('Patient');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const sampleFormats = {
    Patient: `{
      "resourceType": "Patient",
      "id": "example",
      "name": [{
        "given": ["John"],
        "family": "Doe"
      }]
    }`,
    Observation: `{
      "resourceType": "Observation",
      "status": "final",
      "code": {
        "text": "Blood Pressure"
      }
    }`,
    Condition: `{
      "resourceType": "Condition",
      "id": "example",
      "code": {
        "text": "Hypertension"
      }
    }`
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError(null);
    setResult(null);
  };

  const handleResourceTypeChange = (e) => {
    setResourceType(e.target.value);
  };

  const loadSample = () => {
    try {
      const sample = JSON.parse(sampleFormats[resourceType]);
      setResult({ message: 'Loaded sample successfully', data: sample });
    } catch (err) {
      setError('Failed to load sample');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
    if (file.size > MAX_FILE_SIZE) {
      setError("File size exceeds the 5MB limit.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const fileContent = await file.text();
      const jsonData = JSON.parse(fileContent); // Validate JSON

      const response = await axios.post('http://localhost:5000/api/fhir/parse-fhir', {
        resourceType,
        data: jsonData
      });

      setResult(response.data);
    } catch (err) {
      console.error("FHIR upload error:", err);
      setError(err.response?.data?.error || 'Failed to process FHIR file');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="hl7-uploader">
      <h2>FHIR Resource Upload</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Resource Type: </label>
          <select value={resourceType} onChange={handleResourceTypeChange}>
            <option value="Patient">Patient</option>
            <option value="Observation">Observation</option>
            <option value="Condition">Condition</option>
          </select>
        </div>

        <input 
          type="file" 
          onChange={handleFileChange} 
          accept=".json" 
        />

        <div className="button-group">
          <button type="submit" disabled={!file || isLoading}>
            {isLoading ? 'Processing...' : 'Upload & Process'}
          </button>
          <button 
            type="button" 
            onClick={loadSample}
            className="sample-button"
          >
            Load Sample
          </button>
        </div>
      </form>

      {error && <div className="error">{error}</div>}
      {result && (
        <div className="result">
          <h3>Processed Result:</h3>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default FHIRUploader;
