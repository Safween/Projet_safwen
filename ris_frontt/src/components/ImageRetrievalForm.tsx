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

const ImageRetrievalForm: React.FC = () => {
  const [patients, setPatients] = useState([]);
  const [examinations, setExaminations] = useState([]);
  const [retrievalData, setRetrievalData] = useState({
    patientId: '',
    examinationId: '',
  });
  const [images, setImages] = useState([]);

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
    if (retrievalData.patientId) {
      const fetchExaminations = async () => {
        try {
          const response = await axios.get(`http://localhost:8000/api/examinations/?patient=${retrievalData.patientId}`);
          setExaminations(response.data);
        } catch (error) {
          console.error('There was an error fetching the examinations!', error);
        }
      };

      fetchExaminations();
    } else {
      setExaminations([]);
    }
  }, [retrievalData.patientId]);

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setRetrievalData({ ...retrievalData, [name as string]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.get('http://localhost:8000/api/images/', {
        params: {
          patient: retrievalData.patientId,
          examination: retrievalData.examinationId,
        }
      });
      setImages(response.data);
    } catch (error) {
      console.error('There was an error retrieving the images!', error);
    }
  };

  return (
    <StyledBox>
      <StyledPaper>
        <Typography variant="h4" component="h2" gutterBottom>
          Retrieve Images
        </Typography>
        <form onSubmit={handleSubmit}>
          <FormControl fullWidth margin="normal">
            <InputLabel id="patient-select-label">Patient</InputLabel>
            <Select
              labelId="patient-select-label"
              name="patientId"
              value={retrievalData.patientId}
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
          <FormControl fullWidth margin="normal" disabled={!retrievalData.patientId}>
            <InputLabel id="examination-select-label">Examination</InputLabel>
            <Select
              labelId="examination-select-label"
              name="examinationId"
              value={retrievalData.examinationId}
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
          <Button variant="contained" color="primary" type="submit" fullWidth>
            Retrieve Images
          </Button>
        </form>
        <Box mt={4}>
          {images.length > 0 && (
            <Typography variant="h5" component="h3" gutterBottom>
              Retrieved Images
            </Typography>
          )}
          <Box display="flex" flexWrap="wrap" justifyContent="center">
            {images.map((image: any) => (
              <Box key={image.id} m={1}>
                <img src={image.image} alt={image.description} style={{ maxHeight: '200px', maxWidth: '200px' }} />
              </Box>
            ))}
          </Box>
        </Box>
      </StyledPaper>
    </StyledBox>
  );
};

export default ImageRetrievalForm;
