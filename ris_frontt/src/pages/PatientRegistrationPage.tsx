// src/pages/PatientRegistrationPage.tsx
import React from 'react';
import PatientRegistrationForm from '../components/PatientRegistrationForm';

const PatientRegistrationPage: React.FC = () => {
  return (
    <div>
      <h2>Patient Registration</h2>
      <PatientRegistrationForm />
    </div>
  );
};

export default PatientRegistrationPage;
