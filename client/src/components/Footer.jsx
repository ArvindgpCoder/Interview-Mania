import { Link, Typography, Box } from "@mui/material";
import React from "react";

const Footer = () => {
  return (
    <div style={{marginTop:'45px'}}>
      <Box
        sx={{
          width: "100%",
          height: "1px",
          backgroundColor: "rgba(0, 0, 0, 0.12)",
        }}
      />
      <div
        style={{
          backgroundColor: "rgb(249,251,255)",
          width: "100vw",
          height: "80px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="body2" color="text.secondary" align="center">
          {"Copyright © "}
          <Link color="inherit" href="#">
            Interview Mania
          </Link>{" "}
          {new Date().getFullYear()}
          {"."}
        </Typography>
      </div>
    </div>
  );
};

export default Footer;
