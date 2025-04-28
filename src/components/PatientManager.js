import React, { useEffect, useState } from "react";
import patientService from "../services/patient.service";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Select,
  MenuItem,
  Button,
  Alert,
  CircularProgress,
} from '@mui/material';

const emptyPatient = {
  first_name: "",
  last_name: "",
  date_of_birth: "",
  gender: "",
  address: "",
  phone: "",
  email: "",
};

function PatientManager() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingPatient, setEditingPatient] = useState(null);
  const [formData, setFormData] = useState(emptyPatient);

  useEffect(() => {
    fetchPatients();
  }, []);

  async function fetchPatients() {
    setLoading(true);
    setError(null);
    try {
      const data = await patientService.getPatients();
      setPatients(data);
    } catch (err) {
      setError(err.message || "Failed to fetch patients");
    } finally {
      setLoading(false);
    }
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function startEdit(patient) {
    setEditingPatient(patient.id);
    setFormData(patient);
  }

  function cancelEdit() {
    setEditingPatient(null);
    setFormData(emptyPatient);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    try {
      if (editingPatient) {
        await patientService.updatePatient(editingPatient, formData);
      } else {
        await patientService.createPatient(formData);
      }
      cancelEdit();
      fetchPatients();
    } catch (err) {
      setError(err.message || "Failed to save patient");
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Are you sure you want to delete this patient?")) return;
    setError(null);
    try {
      await patientService.deletePatient(id);
      fetchPatients();
    } catch (err) {
      setError(err.message || "Failed to delete patient");
    }
  }

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", mt: 4, mb: 4, px: 2 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
        Patient Manager
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <TableContainer component={Paper} sx={{ mb: 4 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>Date of Birth</TableCell>
                  <TableCell>Gender</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {patients.map((patient) => (
                  <TableRow key={patient.id} hover>
                    <TableCell>{patient.first_name}</TableCell>
                    <TableCell>{patient.last_name}</TableCell>
                    <TableCell>{patient.date_of_birth}</TableCell>
                    <TableCell>{patient.gender}</TableCell>
                    <TableCell>{patient.address}</TableCell>
                    <TableCell>{patient.phone}</TableCell>
                    <TableCell>{patient.email}</TableCell>
                    <TableCell align="center">
                      <Button size="small" variant="outlined" sx={{ mr: 1 }} onClick={() => startEdit(patient)}>
                        Edit
                      </Button>
                      <Button size="small" variant="outlined" color="error" onClick={() => handleDelete(patient.id)}>
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Typography variant="h5" gutterBottom sx={{ mb: 2, fontWeight: 'bold', color: '#1976d2' }}>
            {editingPatient ? "Edit Patient" : "Add New Patient"}
          </Typography>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 2, backgroundColor: '#1565c0' }}>
            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'grid', gap: 2, maxWidth: 600 }}>
              <TextField
                label="First Name"
                name="first_name"
                value={formData.first_name}
                onChange={handleInputChange}
                required
                fullWidth
                InputLabelProps={{ style: { color: '#fff' } }}
                sx={{ input: { color: '#fff' } }}
              />
              <TextField
                label="Last Name"
                name="last_name"
                value={formData.last_name}
                onChange={handleInputChange}
                required
                fullWidth
                InputLabelProps={{ style: { color: '#fff' } }}
                sx={{ input: { color: '#fff' } }}
              />
              <TextField
                label="Date of Birth"
                name="date_of_birth"
                type="date"
                value={formData.date_of_birth}
                onChange={handleInputChange}
                required
                fullWidth
                InputLabelProps={{ shrink: true, style: { color: '#fff' } }}
                sx={{ input: { color: '#fff' } }}
              />
              <Select
                label="Gender"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                displayEmpty
                fullWidth
                required
                sx={{
                  color: '#fff',
                  '.MuiSelect-icon': { color: '#fff' },
                  '.MuiOutlinedInput-notchedOutline': { borderColor: '#fff' },
                }}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      bgcolor: '#1565c0',
                      color: '#fff',
                    },
                  },
                }}
              >
                <MenuItem value="" disabled sx={{ color: '#fff' }}>
                  Select Gender
                </MenuItem>
                <MenuItem value="Male" sx={{ color: '#fff' }}>Male</MenuItem>
                <MenuItem value="Female" sx={{ color: '#fff' }}>Female</MenuItem>
                <MenuItem value="Other" sx={{ color: '#fff' }}>Other</MenuItem>
              </Select>
              <TextField
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                fullWidth
                InputLabelProps={{ style: { color: '#fff' } }}
                sx={{ input: { color: '#fff' } }}
              />
              <TextField
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                fullWidth
                InputLabelProps={{ style: { color: '#fff' } }}
                sx={{ input: { color: '#fff' } }}
              />
              <TextField
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                fullWidth
                InputLabelProps={{ style: { color: '#fff' } }}
                sx={{ input: { color: '#fff' } }}
              />
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button type="submit" variant="contained" color="secondary">
                  {editingPatient ? "Update" : "Add"}
                </Button>
                {editingPatient && (
                  <Button variant="outlined" color="inherit" onClick={cancelEdit}>
                    Cancel
                  </Button>
                )}
              </Box>
            </Box>
          </Paper>
        </>
      )}
    </Box>
  );
}

export default PatientManager;
