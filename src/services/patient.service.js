const API_URL = "http://localhost:5000/api/patients";

async function getPatients() {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error("Failed to fetch patients");
  }
  return response.json();
}

async function getPatient(id) {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch patient");
  }
  return response.json();
}

async function createPatient(patient) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(patient),
  });
  if (!response.ok) {
    throw new Error("Failed to create patient");
  }
  return response.json();
}

async function updatePatient(id, patient) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(patient),
  });
  if (!response.ok) {
    throw new Error("Failed to update patient");
  }
  return response.json();
}

async function deletePatient(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete patient");
  }
  return true;
}

const patientService = {
  getPatients,
  getPatient,
  createPatient,
  updatePatient,
  deletePatient,
};

export default patientService;
