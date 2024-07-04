import React, { useState, useEffect } from "react";
import { Button, Paper, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BASE}/auth/logout`);
      if (res.status === 200) {
        setIsAuthenticated(false);
        navigate("/");
      } else {
        console.error("Logout error:404 bad requiest");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div>
      <Paper
        elevation={15}
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: "rgb(254,255,254)",
          height: "70px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 20px",
          zIndex: 1000,
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            color: "rgb(25,118,210)",
            cursor: "pointer",
          }}
        >
          <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
            INTERVIEW MANIA
          </Link>
        </Typography>

        <div>
          <Button sx={{ marginRight: "10px" }}>
            <Typography variant="subtitle1">
              <Link
                to="/about"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                About Us
              </Link>
            </Typography>
          </Button>
          <Button sx={{ marginRight: "10px" }}>
            <Typography variant="subtitle1">
              <Link
                to="/contact"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                Contact Us
              </Link>
            </Typography>
          </Button>
          {isAuthenticated ? (
            <Button
              variant="contained"
              color="primary"
              onClick={logout}
              sx={{ marginRight: "10px" }}
            >
              <Typography variant="subtitle1" style={{ color: "white" }}>
                Logout
              </Typography>
            </Button>
          ) : (
            <>
              <Button
                variant="contained"
                color="primary"
                sx={{ marginRight: "10px" }}
              >
                <Typography variant="subtitle1">
                  <Link
                    to="/signin"
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    Login
                  </Link>
                </Typography>
              </Button>
              <Button variant="contained" color="primary">
                <Typography variant="subtitle1">
                  <Link
                    to="/signup"
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    Sign Up
                  </Link>
                </Typography>
              </Button>
            </>
          )}
        </div>
      </Paper>
    </div>
  );
};

export default Navbar;
