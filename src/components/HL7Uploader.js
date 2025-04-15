import React, { useState } from 'react';
import axios from 'axios';
import './HL7Uploader.css';

const HL7Uploader = () => {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    setIsLoading(true);
    setError(null);
    
    try {
      const fileContent = await file.text();
      const response = await axios.post('/api/hl7/parse-hl7', {
        hl7Message: fileContent
      });
      setResult(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to parse HL7 file');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="hl7-uploader">
      <h2>HL7 File Upload</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} accept=".hl7,.txt" />
        <button type="submit" disabled={!file || isLoading}>
          {isLoading ? 'Processing...' : 'Upload & Parse'}
        </button>
      </form>
      
      {error && <div className="error">{error}</div>}
      {result && (
        <div className="result">
          <h3>Parsed Result:</h3>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default HL7Uploader;
