import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Grid, Box, MenuItem, Typography, Paper, InputAdornment } from '@mui/material';
import { styled } from '@mui/system';
import AccountCircle from '@mui/icons-material/AccountCircle';
import DateRange from '@mui/icons-material/DateRange';
import Schedule from '@mui/icons-material/Schedule';
import Room from '@mui/icons-material/Room';
import MedicalServices from '@mui/icons-material/MedicalServices';
import Person from '@mui/icons-material/Person';
import registrationImage from '../assets/registration.jpg';

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
  background: 'rgba(255, 255, 255, 0.8)',
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

const PatientSchedulingForm: React.FC = () => {
  const [patients, setPatients] = useState([]);
  const [schedulingData, setSchedulingData] = useState({
    patientId: '',
    examType: '',
    appointmentDate: '',
    appointmentTime: '',
    room: '',
    technicianId: '',
  });

  const examOptions = [
    'Radiology',
    'Ultrasound',
    'MRI',
    'CT Scan',
    'X-Ray',
    'Mammography',
  ];

  const technicians = [
    { id: '1', name: 'Mohamed' },
    { id: '2', name: 'Ali' },
    { id: '3', name: 'Ahmed' },
    { id: '4', name: 'Karim' },
    { id: '5', name: 'Samir' },
    { id: '6', name: 'Lotfi' },
  ];

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/patients/');
        setPatients(response.data);
      } catch (error) {
        console.error('There was an error fetching the patients!', error);
      }
    };

    fetchPatients();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSchedulingData({ ...schedulingData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:8000/api/examinations/', {
        patient: schedulingData.patientId,
        exam_type: schedulingData.examType,
        appointment_date: schedulingData.appointmentDate,
        appointment_time: schedulingData.appointmentTime,
        room: schedulingData.room,
        technician: schedulingData.technicianId,
      });
      alert('Appointment scheduled successfully');
    } catch (error) {
      console.error('There was an error scheduling the appointment!', error);
    }
  };

  return (
    <BackgroundBox>
      <StyledPaper elevation={3}>
        <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ fontWeight: 'bold' }}>
          Schedule a Patient Appointment
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                select
                fullWidth
                label="Patient"
                name="patientId"
                value={schedulingData.patientId}
                onChange={handleChange}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
              >
                <MenuItem value="">Select Patient</MenuItem>
                {patients.map((patient: any) => (
                  <MenuItem key={patient.id} value={patient.id}>{patient.name}</MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                select
                fullWidth
                label="Exam Type"
                name="examType"
                value={schedulingData.examType}
                onChange={handleChange}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MedicalServices />
                    </InputAdornment>
                  ),
                }}
              >
                {examOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Appointment Date"
                name="appointmentDate"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={schedulingData.appointmentDate}
                onChange={handleChange}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <DateRange />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Appointment Time"
                name="appointmentTime"
                type="time"
                InputLabelProps={{ shrink: true }}
                value={schedulingData.appointmentTime}
                onChange={handleChange}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Schedule />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Room"
                name="room"
                value={schedulingData.room}
                onChange={handleChange}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Room />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                label="Technician"
                name="technicianId"
                value={schedulingData.technicianId}
                onChange={handleChange}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person />
                    </InputAdornment>
                  ),
                }}
              >
                <MenuItem value="">Select Technician</MenuItem>
                {technicians.map((technician) => (
                  <MenuItem key={technician.id} value={technician.id}>{technician.name}</MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <SubmitButton type="submit" variant="contained">
                Schedule
              </SubmitButton>
            </Grid>
          </Grid>
        </form>
      </StyledPaper>
    </BackgroundBox>
  );
};

export default PatientSchedulingForm;
