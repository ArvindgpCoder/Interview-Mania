import React, { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import backgroundVideo from "./assets/homeVideo.mp4";
import { Paper } from "@mui/material";
import axios from "axios";

function SignUp() {
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [signupError, setSignupError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = data.get("Name");
    const email = data.get("email");
    const password = data.get("password");

    let hasError = false;

    if (!name) {
      setNameError("Name is required");
      hasError = true;
    } else {
      setNameError("");
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError("Email is required");
      hasError = true;
    } else if (!emailPattern.test(email)) {
      setEmailError("Invalid email address");
      hasError = true;
    } else {
      setEmailError("");
    }

    // Validate password
    if (!password) {
      setPasswordError("Password is required");
      hasError = true;
    } else if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      hasError = true;
    } else {
      setPasswordError("");
    }

    if (!hasError) {
      try {
        const response = await axios.post(
          `https://interview-mania.onrender.com/auth/signup`,
          {
            name,
            email,
            password,
          }
        );

        console.log("Signup response:", response.data);
        navigate("/signin");
      } catch (error) {
        console.error("Signup error:", error);

        if (axios.isAxiosError(error)) {
          if (error.response?.status === 400) {
            const errorMessage = error.response.data;
            setSignupError(errorMessage);
          } else {
            setSignupError("An unexpected error occurred. Please try again.");
          }
        } else {
          setSignupError("An unexpected error occurred. Please try again.");
        }
      }
    }
  };

  return (
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
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="Name"
                  required
                  fullWidth
                  id="Name"
                  label="Name"
                  autoFocus
                  error={Boolean(nameError)}
                  helperText={nameError}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  error={Boolean(emailError)}
                  helperText={emailError}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  error={Boolean(passwordError)}
                  helperText={passwordError}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            {signupError && (
              <Typography color="error" align="center" sx={{ mt: 2 }}>
                {signupError}
              </Typography>
            )}
            <Grid item sx={{ textAlign: "center", cursor: "pointer" }}>
              <Link
                color="primary"
                component={RouterLink}
                to="/signin"
                variant="body2"
                sx={{ textDecoration: "none" }}
              >
                {"Already have an account? Sign In"}
              </Link>
            </Grid>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

export default SignUp;
