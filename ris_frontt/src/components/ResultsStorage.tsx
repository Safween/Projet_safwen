import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, MenuItem, Select, TextField, Typography, FormControl, InputLabel, Paper, SelectChangeEvent } from '@mui/material';
import { styled } from '@mui/system';
import backgroundImage from '../assets/registration.jpg';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.spacing(2),
  boxShadow: '0 3px 10px rgba(0,0,0,0.2)',
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
}));

const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  background: `url(${backgroundImage}) no-repeat center center fixed`,
  backgroundSize: 'cover',
  padding: theme.spacing(3),
}));

const ResultForm: React.FC = () => {
  const [resultData, setResultData] = useState({
    patientId: '',
    examinationId: '',
    description: ''
  });
  const [patients, setPatients] = useState([]);
  const [examinations, setExaminations] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/patients/');
        setPatients(response.data);
      } catch (error) {
        console.error('There was an error fetching the patients!', error);
      }
    };

    fetchPatients();
  }, []);

  useEffect(() => {
    if (resultData.patientId) {
      const fetchExaminations = async () => {
        try {
          const response = await axios.get(`http://localhost:8000/api/examinations/?patient=${resultData.patientId}`);
          setExaminations(response.data);
        } catch (error) {
          console.error('There was an error fetching the examinations!', error);
        }
      };

      fetchExaminations();
    } else {
      setExaminations([]);
    }
  }, [resultData.patientId]);

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setResultData({ ...resultData, [name as string]: value });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setResultData({ ...resultData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFiles(e.target.files);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('patient', resultData.patientId);
    formData.append('examination', resultData.examinationId);
    formData.append('description', resultData.description);
    if (selectedFiles) {
      for (let i = 0; i < selectedFiles.length; i++) {
        formData.append('images', selectedFiles[i]);
      }
    }

    try {
      await axios.post('http://localhost:8000/api/results/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('Result added and images uploaded successfully');
    } catch (error) {
      console.error('There was an error adding the result and uploading images!', error);
    }
  };

  return (
    <StyledBox>
      <StyledPaper>
        <Typography variant="h4" component="h2" gutterBottom>
          Add Image
        </Typography>
        <form onSubmit={handleSubmit}>
          <FormControl fullWidth margin="normal">
            <InputLabel id="patient-select-label">Patient</InputLabel>
            <Select
              labelId="patient-select-label"
              name="patientId"
              value={resultData.patientId}
              onChange={handleSelectChange}
              label="Patient"
              required
            >
              <MenuItem value="">
                <em>Select a patient</em>
              </MenuItem>
              {patients.map((patient: any) => (
                <MenuItem key={patient.id} value={patient.id}>
                  {patient.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal" disabled={!resultData.patientId}>
            <InputLabel id="examination-select-label">Examination</InputLabel>
            <Select
              labelId="examination-select-label"
              name="examinationId"
              value={resultData.examinationId}
              onChange={handleSelectChange}
              label="Examination"
              required
            >
              <MenuItem value="">
                <em>Select an examination</em>
              </MenuItem>
              {examinations.map((examination: any) => (
                <MenuItem key={examination.id} value={examination.id}>
                  {examination.exam_type} - {examination.appointment_date}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            fullWidth
            margin="normal"
            label="Description"
            name="description"
            value={resultData.description}
            onChange={handleChange}
            multiline
            rows={4}
            required
          />
          <FormControl fullWidth margin="normal">
            <input type="file" multiple onChange={handleFileChange} />
          </FormControl>
          <Button variant="contained" color="primary" type="submit" fullWidth>
            Add Image
          </Button>
        </form>
      </StyledPaper>
    </StyledBox>
  );
};

export default ResultForm;
