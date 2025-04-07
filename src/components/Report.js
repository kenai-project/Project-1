// src/Report.js
import React, { useState } from 'react';
import { Container, Typography, Button, TextField, Box, Grid, Paper } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';

const Report = () => {
  const [file, setFile] = useState(null);
  const [symptoms, setSymptoms] = useState('');
  const [aiResponse, setAiResponse] = useState('');

  const chartData = [
    { name: 'Day 1', value: 40 },
    { name: 'Day 2', value: 45 },
    { name: 'Day 3', value: 50 },
    { name: 'Day 4', value: 55 },
  ];

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleAIAnalyze = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/ai/symptoms', { symptoms });
      setAiResponse(res.data.reply);
    } catch (error) {
      setAiResponse('Something went wrong. Try again later.');
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>Medical Report Analysis</Typography>

      {/* File Upload */}
      <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6">Upload X-ray / Report</Typography>
        <input type="file" onChange={handleFileChange} />
        {file && <Typography variant="body2">Selected: {file.name}</Typography>}
      </Paper>

      {/* Chart Section */}
      <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6">Health Trends</Typography>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#1976d2" />
          </LineChart>
        </ResponsiveContainer>
      </Paper>

      {/* AI Input */}
      <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6">Describe Your Symptoms</Typography>
        <TextField
          fullWidth
          multiline
          rows={3}
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
          placeholder="e.g., headache, nausea, fatigue"
        />
        <Button variant="contained" sx={{ mt: 2 }} onClick={handleAIAnalyze}>
          Analyze with AI
        </Button>
        {aiResponse && (
          <Box mt={2}>
            <Typography variant="subtitle1">AI Response:</Typography>
            <Typography variant="body1">{aiResponse}</Typography>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default Report;
