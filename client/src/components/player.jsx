import React, { useState, useEffect, useContext } from "react";
import Video from "./VideoInterview";
import "./VideoInterview.css";
import { SocketContext } from "../SocketContext";

const Don = () => {
  const [loading, setLoading] = useState(false);
  const { myVideo, stream, setStream } = useContext(SocketContext);
  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  }, [loading]);
  useEffect(() => {
    if (loading) return;
    if (stream) {
      myVideo.current.srcObject = stream;
      return;
    }
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((res) => {
        res.getAudioTracks()[0].enabled = false;
        setStream(res);
        myVideo.current.srcObject = res;
      });
  }, [loading]);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setLoading(true);
  //   }, 2000);

  //   return () => clearTimeout(timer);
  // }, []);

  // if (!loading) {
  //   return <div></div>;
  // }

  return (
    <div className="Video" style={{ marginTop: "69px", minHeight: "100vh" }}>
      <Video />
    </div>
  );
};

export default Don;
