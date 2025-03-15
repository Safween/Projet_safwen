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

const BillingForm: React.FC = () => {
  const [billingData, setBillingData] = useState({
    patientId: '',
    examinationId: '',
    amount: '',
    currency: 'DT',
    paymentMethod: '',
    status: 'Pending',
    dueDate: '',
    notes: ''
  });
  const [patients, setPatients] = useState([]);
  const [examinations, setExaminations] = useState([]);

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
    if (billingData.patientId) {
      const fetchExaminations = async () => {
        try {
          const response = await axios.get(`http://localhost:8000/api/examinations/?patient=${billingData.patientId}`);
          setExaminations(response.data);
        } catch (error) {
          console.error('There was an error fetching the examinations!', error);
        }
      };

      fetchExaminations();
    } else {
      setExaminations([]);
    }
  }, [billingData.patientId]);

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setBillingData({ ...billingData, [name]: value });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBillingData({ ...billingData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      patient: billingData.patientId,
      examination: billingData.examinationId,
      amount: parseFloat(billingData.amount),
      currency: billingData.currency,
      payment_method: billingData.paymentMethod,
      status: billingData.status,
      due_date: billingData.dueDate,
      notes: billingData.notes
    };
    try {
      await axios.post('http://localhost:8000/api/billings/', data);
      alert('Billing record added successfully');
    } catch (error) {
      console.error('There was an error adding the billing record!', error);
    }
  };

  return (
    <StyledBox>
      <StyledPaper>
        <Typography variant="h4" component="h2" gutterBottom>
          Add Billing Record
        </Typography>
        <form onSubmit={handleSubmit}>
          <FormControl fullWidth margin="normal">
            <InputLabel id="patient-select-label">Patient</InputLabel>
            <Select
              labelId="patient-select-label"
              name="patientId"
              value={billingData.patientId}
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
          <FormControl fullWidth margin="normal" disabled={!billingData.patientId}>
            <InputLabel id="examination-select-label">Examination</InputLabel>
            <Select
              labelId="examination-select-label"
              name="examinationId"
              value={billingData.examinationId}
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
            label="Amount"
            name="amount"
            value={billingData.amount}
            onChange={handleChange}
            InputProps={{
              endAdornment: <Typography variant="body1">DT</Typography>
            }}
            required
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="payment-method-select-label">Payment Method</InputLabel>
            <Select
              labelId="payment-method-select-label"
              name="paymentMethod"
              value={billingData.paymentMethod}
              onChange={handleSelectChange}
              label="Payment Method"
              required
            >
              <MenuItem value="Cash">Cash</MenuItem>
              <MenuItem value="Card">Card</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel id="status-select-label">Status</InputLabel>
            <Select
              labelId="status-select-label"
              name="status"
              value={billingData.status}
              onChange={handleSelectChange}
              label="Status"
              required
            >
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Paid">Paid</MenuItem>
              <MenuItem value="Overdue">Overdue</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            margin="normal"
            label="Due Date"
            name="dueDate"
            type="date"
            value={billingData.dueDate}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Notes"
            name="notes"
            value={billingData.notes}
            onChange={handleChange}
            multiline
            rows={4}
          />
          <Button variant="contained" color="primary" type="submit" fullWidth>
            Add Billing Record
          </Button>
        </form>
      </StyledPaper>
    </StyledBox>
  );
};

export default BillingForm;
