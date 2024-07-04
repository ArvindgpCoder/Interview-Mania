import React, { useContext, useState, useEffect } from "react";
import { Grid, Paper, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { SocketContext } from "../SocketContext";
import CodeEditor from "./Testing";

const useStyles = makeStyles((theme) => ({
  video: {
    width: "350px",
  },
  gridContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    border: "2px solid black",
  },
  buttonContainer: {
    marginTop: "5px",
    display: "flex",
    justifyContent: "center",
  },
}));

const VideoPlayer = () => {
  const {
    name,
    callAccepted,
    myVideo,
    userVideo,
    callEnded,
    stream,
    call,
    leaveCall,
  } = useContext(SocketContext);
  const classes = useStyles();

  return (
    <Grid
      container
      className={classes.gridContainer}
      style={{
        justifyContent: callAccepted && !callEnded ? "space-evenly" : "center",
      }}
    >
      {callAccepted && !callEnded && <CodeEditor />}

      <div style={{ display: "flex", flexDirection: "column" }}>

        {stream && (
          <Paper className={classes.paper}>
            <Grid item>
              <video
                playsInline
                autoPlay
                muted
                ref={myVideo}
                className={classes.video}
                style={{
                  width: callAccepted && !callEnded ? "280px" : "450px",
                }}
              />
            </Grid>
          </Paper>
        )}
        {callAccepted && !callEnded && (
          <Paper className={classes.paper}>
            <Grid item>
              <video
                playsInline
                ref={userVideo}
                autoPlay
                className={classes.video}
                style={{
                  width: "280px",
                }}
              />
            </Grid>
          </Paper>
        )}
        {callAccepted && !callEnded && (
          <div className={classes.buttonContainer}>
            <Button variant="contained" color="secondary" onClick={leaveCall}>
              Hang Up
            </Button>
          </div>
        )}
      </div>
    </Grid>
  );
};

export default VideoPlayer;
