import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navbar = ({ auth, setAuth }) => {
  const navigate = useNavigate();
  const handleSingOut = async () => {
    try {
      await setAuth(false);
      console.log(auth);
      sessionStorage.removeItem("token");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <AppBar position="sticky" color="primary">
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, fontFamily: "serif" }}
        >
          Online Judge
        </Typography>
        <Typography>
          <Button component={Link} to="/" color="inherit">
            Home
          </Button>
        </Typography>
        <Button component={Link} to="/problems/all" color="inherit">
          Problems
        </Button>
        {auth ? (
          <Button component={Link} onClick={handleSingOut} color="inherit">
            Sign Out
          </Button>
        ) : (
          <Button component={Link} to="/signin" color="inherit">
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
