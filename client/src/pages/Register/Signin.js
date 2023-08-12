import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Snackbar from "../../components/Snackbar/Snackbar";
import uuid from "react-uuid";

const defaultTheme = createTheme();

export default function SignIn({setAuth}) {
  const [success, setSuccess] = React.useState(null);
  const navigate = useNavigate();
  const uniqueId = uuid();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
      setSuccess(null);
      const res = await axios.post(
        process.env.REACT_APP_API_ENDPOINT + "user/login",
        {
          email: data.get("email"),
          password: data.get("password"),
        }
      );
      console.log(res);
      if (res.status === 200) {
        setSuccess(true);
        setAuth(true);
        sessionStorage.setItem("token", res.data.token);
        setTimeout(() => {
          navigate("/problems/all");
        }, 1000);
      }
    } catch (err) {
      setSuccess(false);
      console.log(err);
    } finally {
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link
                  onClick={() => {
                    navigate("/signup");
                  }}
                  sx={{ cursor: "pointer" }}
                  variant="body2"
                >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
      </Container>
      {success === true ? (
        <Snackbar
          id={uniqueId}
          type="success"
          message="Login successful!"
          key={uniqueId}
        />
      ) : success === false ? (
        <Snackbar
          id={uniqueId}
          type="error"
          message="Login failed!"
          key={uniqueId}
        />
      ) : null}
    </ThemeProvider>
  );
}
