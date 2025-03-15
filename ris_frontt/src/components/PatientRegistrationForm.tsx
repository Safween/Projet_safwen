import React, { useState } from 'react';
import API from '../services/api';
import { TextField, Button, Grid, Box, MenuItem, Typography, Paper, InputAdornment } from '@mui/material';
import { styled } from '@mui/system';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Cake from '@mui/icons-material/Cake';
import Wc from '@mui/icons-material/Wc';
import Phone from '@mui/icons-material/Phone';
import Home from '@mui/icons-material/Home';
import Security from '@mui/icons-material/Security';
import Email from '@mui/icons-material/Email';
import ContactEmergency from '@mui/icons-material/ContactEmergency';
import History from '@mui/icons-material/History';
import FitnessCenter from '@mui/icons-material/FitnessCenter';
import Height from '@mui/icons-material/Height';
import Calculate from '@mui/icons-material/Calculate';
import LocalHospital from '@mui/icons-material/LocalHospital';
import registrationImage from '../assets/registration.jpg'; // Importez l'image

const BackgroundBox = styled(Box)(({ theme }) => ({
  backgroundImage: `url(${registrationImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing(4),
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(6),
  maxWidth: '800px',
  background: 'rgba(255, 255, 255, 0.8)', // Ajoutez un fond blanc transparent
  borderRadius: '12px',
  boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(4),
  padding: theme.spacing(1.5),
  width: '100%',
  background: 'linear-gradient(to right, #4caf50, #81c784)',
  color: '#fff',
  '&:hover': {
    background: 'linear-gradient(to right, #388e3c, #66bb6a)',
  },
}));

const PatientRegistrationForm: React.FC = () => {
  const [patientData, setPatientData] = useState({
    name: '',
    age: '',
    gender: '',
    contact: '',
    birthDate: '',
    address: '',
    insurance: '',
    socialId: '',
    email: '',
    emergencyContact: '',
    medicalHistory: '',
    weight: '',
    height: '',
    bmi: ''
  });

  const insuranceOptions = [
    'CNAM',
    'Maghrebia',
    'GAT',
    'COMAR',
    'STAR',
    'Autre'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPatientData({ ...patientData, [name]: value });
  };

  const calculateBMI = (weight: number, height: number) => {
    if (weight && height) {
      const heightInMeters = height / 100;
      return (weight / (heightInMeters * heightInMeters)).toFixed(2);
    }
    return '';
  };

  const handleWeightHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedData = { ...patientData, [name]: value };
    if (updatedData.weight && updatedData.height) {
      updatedData.bmi = calculateBMI(Number(updatedData.weight), Number(updatedData.height));
    }
    setPatientData(updatedData);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await API.post('/patients/', patientData);
      alert('Patient registered successfully');
    } catch (error) {
      console.error('There was an error registering the patient!', error);
    }
  };

  return (
    <BackgroundBox>
      <StyledPaper elevation={3}>
        <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ fontWeight: 'bold' }}>
          Register a New Patient
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={patientData.name}
                onChange={handleChange}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Age"
                name="age"
                type="number"
                value={patientData.age}
                onChange={handleChange}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Cake />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                label="Gender"
                name="gender"
                value={patientData.gender}
                onChange={handleChange}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Wc />
                    </InputAdornment>
                  ),
                }}
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Contact"
                name="contact"
                value={patientData.contact}
                onChange={handleChange}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Phone />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Date of Birth"
                name="birthDate"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={patientData.birthDate}
                onChange={handleChange}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Cake />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                name="address"
                multiline
                rows={3}
                value={patientData.address}
                onChange={handleChange}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Home />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                label="Insurance"
                name="insurance"
                value={patientData.insurance}
                onChange={handleChange}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocalHospital />
                    </InputAdornment>
                  ),
                }}
              >
                {insuranceOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Social ID"
                name="socialId"
                value={patientData.socialId}
                onChange={handleChange}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Security />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={patientData.email}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Emergency Contact"
                name="emergencyContact"
                value={patientData.emergencyContact}
                onChange={handleChange}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <ContactEmergency />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Medical History"
                name="medicalHistory"
                multiline
                rows={4}
                value={patientData.medicalHistory}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <History />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Weight (kg)"
                name="weight"
                type="number"
                value={patientData.weight}
                onChange={handleWeightHeightChange}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FitnessCenter />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Height (cm)"
                name="height"
                type="number"
                value={patientData.height}
                onChange={handleWeightHeightChange}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Height />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="BMI"
                name="bmi"
                type="text"
                value={patientData.bmi}
                InputProps={{
                  readOnly: true,
                  startAdornment: (
                    <InputAdornment position="start">
                      <Calculate />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <SubmitButton type="submit" variant="contained">
                Register
              </SubmitButton>
            </Grid>
          </Grid>
        </form>
      </StyledPaper>
    </BackgroundBox>
  );
};

export default PatientRegistrationForm;
