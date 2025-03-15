import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { Container, createTheme, ThemeProvider } from '@mui/material';
import Home from './pages/Home';
import PatientRegistrationPage from './pages/PatientRegistrationPage';
import PatientSchedulingPage from './pages/PatientSchedulingPage';
import ResultsStoragePage from './pages/ResultsStoragePage';
import ImageRetrievalPage from './pages/ImageRetrievalPage';
import PatientAndExaminationList from './components/PatientAndExaminationList';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import BillingPage from './pages/BillingPage';  // Import the BillingPage component

const theme = createTheme({
  palette: {
    mode: 'light',
  },
});

const App: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div style={{ display: 'flex' }}>
          <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />
          <div style={{ flexGrow: 1, marginLeft: sidebarOpen ? 240 : 0, transition: 'margin-left 0.3s' }}>
            <Navbar toggleSidebar={toggleSidebar} />
            <Container style={{ marginTop: '64px', padding: '16px' }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/patient-registration" element={<PatientRegistrationPage />} />
                <Route path="/patient-scheduling" element={<PatientSchedulingPage />} />
                <Route path="/results-storage" element={<ResultsStoragePage />} />
                <Route path="/image-retrieval" element={<ImageRetrievalPage />} />
                <Route path="/list" element={<PatientAndExaminationList />} />
                <Route path="/billing" element={<BillingPage />} />  {/* Add the BillingPage route */}
              </Routes>
            </Container>
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
