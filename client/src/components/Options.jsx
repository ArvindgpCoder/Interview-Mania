import React, { useState, useContext } from "react";
import { Button, TextField, Grid, Container, Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Phone from "@mui/icons-material/Phone";
import PhoneDisabled from "@mui/icons-material/PhoneDisabled";
import { CopyToClipboard } from "react-copy-to-clipboard";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { SocketContext } from "../SocketContext";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  gridContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
  },
  container: {
    margin: "0px",
    padding: "10px",
    backgroundColor: "blur",
  },
  paper: {
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
    backgroundColor: "transparent", 
  },
  textField: {
    marginBottom: "10px",
  },
  button: {
    width: "100px",
    height: "40px",
    backgroundColor: "#004ba0",
    color: "white",
    "&:hover": {
      backgroundColor: "#003380",
    },
    borderRadius: "10px",
    border: "2px solid #00ffcc",
  },
  typography: {
    color: "white", // Change text color to white
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "space-around",
    width: "100%",
  },
});

const Sidebar = ({ children }) => {
  const { me, callAccepted, callEnded, leaveCall, callUser } =
    useContext(SocketContext);
  const [idToCall, setIdToCall] = useState("");
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <Paper elevation={10} className={classes.paper}>
        <form className={classes.root} noValidate autoComplete="off">
          <Grid container className={classes.gridContainer}>
            <Grid item xs={12} className={classes.textField}>
              <TextField
                label="ID to call"
                value={idToCall}
                onChange={(e) => setIdToCall(e.target.value)}
                fullWidth
                InputLabelProps={{
                  style: { color: "white" },
                }}
                InputProps={{
                  style: { color: "white" },
                }}
              />
            </Grid>
            <Grid item xs={12} className={classes.buttonGroup}>
              {callAccepted && !callEnded ? (
                <Button
                  variant="contained"
                  className={classes.button}
                  startIcon={<PhoneDisabled fontSize="large" />}
                  onClick={leaveCall}
                >
                  Hang Up
                </Button>
              ) : (
                <>
                  <Button
                    variant="contained"
                    className={classes.button}
                    startIcon={<Phone fontSize="large" />}
                    onClick={() => {
                      callUser(idToCall);
                    }}
                  >
                    Call
                  </Button>
                  <CopyToClipboard text={me}>
                    <Button
                      variant="contained"
                      className={classes.button}
                      startIcon={<AssignmentIcon fontSize="large" />}
                    >
                      Me
                    </Button>
                  </CopyToClipboard>
                </>
              )}
            </Grid>
          </Grid>
        </form>
        {children}
      </Paper>
    </Container>
  );
};

export default Sidebar;
