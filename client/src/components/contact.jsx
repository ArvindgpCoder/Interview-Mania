import React from "react";
import { Box, Grid, Typography, Link as MuiLink } from "@mui/material";

const ContactPage = () => {
  return (
    <div
      style={{
        backgroundColor: "rgb(248,246,249)",
        marginTop: "150px",
        marginLeft: "90px",
        marginRight: "70px",
        padding: "35px",
        borderRadius: "5px",
      }}
    >
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={2}
          columns={{ xs: 12, sm: 8, md: 16 }}
        >
          <Grid item xs={12} sm={4} md={7}>
            <Typography variant="h4">Contact Information</Typography>
            <Box sx={{ marginTop: "20px" }}>
              <Typography variant="h6">Address</Typography>
              <Typography variant="body1">
                INTERVIEW MANIA Pvt. Ltd.
                <br />
                Chakghat Rewa M.P,
                <br />
                India - 486226
              </Typography>
            </Box>
            <Box sx={{ marginTop: "20px" }}>
              <Typography variant="h6">Email</Typography>
              <Typography variant="body1">
                <MuiLink href="mailto:hello@interviewer.ai" color="inherit">
                  arvindgpta786@gmail.com
                </MuiLink>
              </Typography>
            </Box>
            <Box sx={{ marginTop: "20px" }}>
              <Typography variant="h6">Contact</Typography>
              <Typography variant="body1">+91 6269276247</Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={9}>
            <Typography variant="h4">Got any doubts?</Typography>
            <Typography variant="body1" sx={{ marginTop: "10px" }}>
              Our dedicated support team is ready to assist you.
            </Typography>
            <Box sx={{ marginTop: "20px" }}></Box>
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
            <Box sx={{ marginTop: "20px" }} >
              <Typography variant="h5"  >
                Discover How We Can Empower Your Hiring Process
              </Typography>
              <Typography sx={{ marginTop: "20px" }} variant="body1">
                    At Interview Mania Pvt. Ltd., we specialize in revolutionizing
                your recruitment strategy. if you're aiming to enhance candidate
                quality, or accelerate growth, our solutions are designed to
                meet your needs. Let us partner with you to transform your
                hiring experience into a efficient journey.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default ContactPage;
