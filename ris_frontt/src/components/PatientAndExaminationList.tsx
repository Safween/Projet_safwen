import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Grid, Box, Chip } from '@mui/material';
import moment from 'moment';
import { styled } from '@mui/system';

const StyledPaper = styled(Paper)(({ theme }) => ({
  borderRadius: '12px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  marginBottom: theme.spacing(4),
  padding: theme.spacing(2),
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bold',
  backgroundColor: theme.palette.grey[200],
}));

const getStatusColor = (status: string) => {
  if (status.startsWith('Planned')) return 'primary';
  if (status === 'Ongoing') return 'warning';
  return 'success';
};

const PatientAndExaminationList: React.FC = () => {
  const [patients, setPatients] = useState([]);
  const [examinations, setExaminations] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/patients/');
        setPatients(response.data);
      } catch (error) {
        console.error('There was an error fetching the patients!', error);
      }
    };

    const fetchExaminations = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/examinations/');
        setExaminations(response.data);
      } catch (error) {
        console.error('There was an error fetching the examinations!', error);
      }
    };

    fetchPatients();
    fetchExaminations();
  }, []);

  const getStatus = (appointmentDate: string) => {
    const currentDate = moment();
    const examDate = moment(appointmentDate);
    if (examDate.isAfter(currentDate)) {
      const daysDiff = examDate.diff(currentDate, 'days');
      return `Planned in ${daysDiff} days`;
    } else if (examDate.isSame(currentDate, 'day')) {
      return 'Ongoing';
    } else {
      return 'Completed';
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h4" component="h2" gutterBottom align="center" sx={{ marginTop: 2, fontWeight: 'bold' }}>
            Patient and Examination Lists
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <StyledPaper>
            <Typography variant="h5" component="h3" gutterBottom align="center" sx={{ padding: 2, fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>
              List of Patients
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Name</StyledTableCell>
                    <StyledTableCell>Age</StyledTableCell>
                    <StyledTableCell>Gender</StyledTableCell>
                    <StyledTableCell>Contact</StyledTableCell>
                    <StyledTableCell>Email</StyledTableCell>
                    <StyledTableCell>Insurance</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {patients.map((patient: any) => (
                    <TableRow key={patient.id}>
                      <TableCell>{patient.name}</TableCell>
                      <TableCell>{patient.age}</TableCell>
                      <TableCell>{patient.gender}</TableCell>
                      <TableCell>{patient.contact}</TableCell>
                      <TableCell>{patient.email}</TableCell>
                      <TableCell>{patient.insurance}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </StyledPaper>
        </Grid>
        <Grid item xs={12} md={6}>
          <StyledPaper>
            <Typography variant="h5" component="h3" gutterBottom align="center" sx={{ padding: 2, fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>
              List of Examinations
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Patient</StyledTableCell>
                    <StyledTableCell>Exam Type</StyledTableCell>
                    <StyledTableCell>Appointment Date</StyledTableCell>
                    <StyledTableCell>Appointment Time</StyledTableCell>
                    <StyledTableCell>Room</StyledTableCell>
                    <StyledTableCell>Technician</StyledTableCell>
                    <StyledTableCell>Status</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {examinations.map((examination: any) => (
                    <TableRow key={examination.id}>
                      <TableCell>{examination.patient.name}</TableCell>
                      <TableCell>{examination.exam_type}</TableCell>
                      <TableCell>{examination.appointment_date}</TableCell>
                      <TableCell>{examination.appointment_time}</TableCell>
                      <TableCell>{examination.room}</TableCell>
                      <TableCell>{examination.technician_name || 'Unknown'}</TableCell>
                      <TableCell>
                        <Chip label={getStatus(examination.appointment_date)} color={getStatusColor(getStatus(examination.appointment_date))} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </StyledPaper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PatientAndExaminationList;
