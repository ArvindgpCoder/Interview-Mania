import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import Faq from "./Faq";

import frontImage from "./assets/about1.webp";

export default function About() {
  return (
    <>
      <Box sx={{ flexGrow: 1, marginTop: '100px', padding: '0 20px' }}>
        <Grid container spacing={4} columns={{ xs: 12, sm: 8, md: 16 }}>
          <Grid item xs={12} sm={2} md={1} />
          <Grid item xs={12} sm={6} md={7}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: '20px' }}>
              What is Interview Mania?
            </Typography>
            <Typography variant="subtitle1" sx={{ lineHeight: 2.5 }}>
              Interview Mania thoroughly analyzes your candidates ,
              putting their skills into assessment with screening video
              interviews with collaborative text editor for coding and assessment purpose As an outcome, you get bias-free insights and
              highlights of the best talent suited for your company. It allows
              you to increase your 
              hiring efficiency and productivity for your company.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <img
              src={frontImage}
              alt="Analysis of candidate's résumés"
              style={{ width: '100%', height: 'auto', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
            />
          </Grid>
        </Grid>
      </Box>

    
      <Box sx={{ margin: '0 75px' }}>
        <Faq />
      </Box>
    </>
  );
}
