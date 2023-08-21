import * as React from 'react';
import Button from '../components/Button';
import Typography from '../components/Typography';
import ProductHeroLayout from './ProductHeroLayout';
import { useNavigate } from 'react-router-dom';

const backgroundImage =
  'https://unsplash.com/photos/NDuPLKYRXQU';

export default function ProductHero() {
  const navigate = useNavigate();
  return (
    <ProductHeroLayout
      sxBackground={{
        // backgroundImage: `url(${backgroundImage})`,
        // backgroundColor: '#e9eef0', // Background color of the hero section.
        backgroundPosition: 'center',
      }}
    >
      <Typography color='inherit' align="center" variant="h2" marked="center" >
        Code, Compete, Conquer
      </Typography>
      <Typography
        color="inherit"
        align="center"
        variant="h5"
        sx={{ mb: 4, mt: { xs: 4, sm: 10 } }}
      >
        Sharpen your coding skills, tackle challenges, and rise to the top.
      </Typography>
      <Button
        variant="contained"
        size="large"
        component="a"
        onClick={() => navigate('/signup')}
        sx={{ minWidth: 200 , backgroundColor: '#1976d2',borderRadius: '50px'}}
      >
        Get Started
      </Button>
      <Typography variant="body2" color="inherit" sx={{ mt: 2 }}>
        Join our coding community today!
      </Typography>
    </ProductHeroLayout>
  );
}