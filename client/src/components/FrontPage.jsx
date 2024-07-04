import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import frontImage from "./assets/frontImage.webp"

import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";

export default function FrontPage() {
  return (
    <Box sx={{ flexGrow: 1, marginTop: "200px", marginLeft: "150px" }}>
      <Grid container spacing={4} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12} sm={6} md={5}>
          <img
            src={frontImage}
            style={{ width: "100%", height: "auto", maxWidth: "100%" }}
            alt="Asynchronous video interview software screen"
          />
        </Grid>

        <Grid item xs={12} sm={4} md={5}>
          <h2 className="elementor-heading-title elementor-size-default">
            <span style={{ backgroundColor: "#ffeee8" }}>
              Asynchronous video interview software{" "}
            </span>
            to screen better, faster.
          </h2>
          <div>
            <p>
              If you are a candidate or a student, try{" "}
              <Link
                component={RouterLink}
                to="/interview"
                variant="body2"
                sx={{
                  textDecoration: "none",
                  color: "blue",
                  fontWeight: "bold",
                }}
              >
                mock interviews
              </Link>{" "}
            </p>
          </div>
        </Grid>

        <Grid item xs={false} sm={2} />
      </Grid>
    </Box>
  );
}
