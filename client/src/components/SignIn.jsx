import React, { useState, useContext } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Paper } from "@mui/material";
import axios from "axios";
import backgroundVideo from "./assets/homeVideo.mp4";
import { SocketContext } from "../SocketContext";

const defaultTheme = createTheme();

const SignIn = ({ setIsAuthenticated }) => {
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [signinError, setSigninError] = useState("");
  const { setName, name } = useContext(SocketContext);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");

    let hasError = false;

    if (!email) {
      setEmailError("Email is required");
      hasError = true;
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("Password is required");
      hasError = true;
    } else {
      setPasswordError("");
    }

    if (!hasError) {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BASE}/auth/login`,
          {
            email,
            password,
          }
        );
        console.log(response.data);
        setName(response.data.user.name);

        setIsAuthenticated(true);
        setSigninError("");
        navigate("/interview");
      } catch (error) {
        console.error("Login error:", error);

        if (axios.isAxiosError(error)) {
          if (error.response?.status === 401) {
            setSigninError("Invalid email or password. Please try again.");
          } else {
            setSigninError("An unexpected error occurred. Please try again.");
          }
        } else {
          setSigninError("An unexpected error occurred. Please try again.");
        }
      }
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box
        sx={{
          position: "relative",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        <video
          autoPlay
          loop
          muted
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: -1,
          }}
        >
          <source src={backgroundVideo} type="video/mp4" />
        </video>
        <Paper elevation={12} sx={{ padding: "20px", maxWidth: "400px" }}>
          <Box
            sx={{
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
                error={Boolean(emailError)}
                helperText={emailError}
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
                error={Boolean(passwordError)}
                helperText={passwordError}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              {signinError && (
                <Typography color="error" align="center" sx={{ mt: 2 }}>
                  {signinError}
                </Typography>
              )}
              <Grid item sx={{ textAlign: "center" }}>
                <Link
                  color="primary"
                  component={RouterLink}
                  to="/signup"
                  variant="body2"
                  sx={{ textDecoration: "none" }}
                >
                  {"Don't have an account? Sign Up"}
                </Link>{" "}
              </Grid>
            </Box>
          </Box>
        </Paper>
      </Box>
    </ThemeProvider>
  );
};

export default SignIn;
