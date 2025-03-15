import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { styled } from '@mui/system';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import medicalImage from '../assets/medical.jpg';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  background: 'linear-gradient(to right, #ece9e6, #ffffff)',
  padding: theme.spacing(3),
  minHeight: '100vh',
}));

const FeatureCard = styled(Card)(({ theme }) => ({
  backgroundColor: '#f5f5f5',
  borderRadius: theme.spacing(2),
  boxShadow: '0 3px 10px rgba(0,0,0,0.1)',
}));

const Footer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  padding: theme.spacing(3),
  textAlign: 'center',
  marginTop: theme.spacing(5),
}));

const Home: React.FC = () => {
  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <>
      <StyledBox>
        <Typography variant={isSmUp ? "h2" : "h4"} component="h1" gutterBottom>
          Welcome to Radiology Information System
        </Typography>
        <Typography variant="h6" component="p" gutterBottom>
          Manage all your radiology workflows in one place.
        </Typography>
        <img
          src={medicalImage}
          alt="Radiology"
          style={{ borderRadius: '8px', marginTop: '20px', maxWidth: '100%', height: 'auto' }}
        />
        <Grid container spacing={2} justifyContent="center" style={{ marginTop: '20px' }}>
          <Grid item>
            <Button variant="contained" color="primary" href="/patient-registration">
              Register a Patient
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color="secondary" href="/patient-scheduling">
              Schedule an Appointment
            </Button>
          </Grid>
        </Grid>
        <Container maxWidth="lg" style={{ marginTop: '40px' }}>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={4}>
              <FeatureCard>
                <CardContent>
                  <Typography variant="h5" component="h2">
                    Fast Access
                  </Typography>
                  <Typography variant="body2" component="p">
                    Quickly access patient information and examination results.
                  </Typography>
                </CardContent>
              </FeatureCard>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FeatureCard>
                <CardContent>
                  <Typography variant="h5" component="h2">
                    Secure Storage
                  </Typography>
                  <Typography variant="body2" component="p">
                    All your data is stored securely and can be accessed anytime.
                  </Typography>
                </CardContent>
              </FeatureCard>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FeatureCard>
                <CardContent>
                  <Typography variant="h5" component="h2">
                    Easy Scheduling
                  </Typography>
                  <Typography variant="body2" component="p">
                    Effortlessly schedule and manage patient appointments.
                  </Typography>
                </CardContent>
              </FeatureCard>
            </Grid>
          </Grid>
        </Container>
      </StyledBox>
      <Footer>
        <Typography variant="h6">
          &copy; 2024 Radiology Information System. All rights reserved.
        </Typography>
      </Footer>
    </>
  );
};

export default Home;
