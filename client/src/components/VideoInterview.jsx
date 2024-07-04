import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import VideoPlayer from "./VideoPlayer";
import Notifications from "./Notifications";
import Sidebar from "./Options";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
}));

const Video = () => {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
     
      <VideoPlayer />
      <Sidebar>
        <Notifications />
      </Sidebar>
    </div>
  );
};

export default Video;
