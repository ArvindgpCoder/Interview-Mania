import {
  Box,
  Grid,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React from "react";

const Faq = () => {
  return (
    <div style={{ backgroundColor: "rgb(248,246,249)" }}>
      <Box sx={{ flexGrow: 1, paddingTop: "20px" }}>
        <Grid
          container
          spacing={6}
          columns={{ xs: 12, sm: 8, md: 16 }}
          sx={{ paddingLeft: "20px", paddingRight: "20px" }}
        >
          {/* Grid item for the FAQ content */}
          <Grid item xs={12} sm={6} md={7}>
            <Typography variant="h3">FAQs</Typography>
            <Typography variant="body1" sx={{ marginTop: "25px" }}>
              We understand that outsourcing your tech interviews requires a lot
              of trust. Here are frequently asked questions to clear all your
              doubts.
            </Typography>

            <Typography variant="h5" sx={{ marginTop: "15px" }}>
              Still have doubts?
            </Typography>
            <Typography
              variant="h5"
              sx={{
                marginTop: "15px",
                marginBottom: "15px",
                cursor: "pointer",
                color: "rgb(25,118,210)",
              }}
            >
              <a
                href="mailto:arvindgpta786@gmail.com"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Talk to our representative
              </a>
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6} md={9}>
            <Paper
              style={{ maxHeight: "70vh", overflow: "auto", padding: "10px" }}
            >
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography sx={{ fontWeight: "bold" }}>
                    How do I schedule an interview?
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    To join an interview on Interview Mania, simply log in, ask
                    the recruiter for the joining code, and enter it to join the
                    interview.
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography sx={{ fontWeight: "bold" }}>
                    Will I be charged per interview?
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>Right now it's completely free</Typography>
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography sx={{ fontWeight: "bold" }}>
                    Can I get interviewed by anyone I work with?
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>Yes</Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography sx={{ fontWeight: "bold" }}>
                    Do Interviewers provide detailed feedback?
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Yes, interviewers will provide detailed feedback via email.
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography sx={{ fontWeight: "bold" }}>
                    Can I add team members?
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>No Right now it is one to one only</Typography>
                </AccordionDetails>
              </Accordion>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Faq;
