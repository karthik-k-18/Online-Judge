
import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';


const Navbar = () => {
  return (
    
    <AppBar position="sticky" color='primary'>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          My App
        </Typography>
        <Typography>
        <Button component={Link} to="/" color="inherit">
          Home
        </Button>
        </Typography>
        <Button component={Link} to="/problems" color="inherit">
          Problems
        </Button>
        <Button component={Link} to="/signin" color="inherit">
          Register
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;