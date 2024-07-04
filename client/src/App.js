import React, { useState, useEffect, useContext } from "react";
import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import axios from "axios";
import { SocketContext } from "./SocketContext";

import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import ContactPage from "./components/contact";
import About from "./components/about";
import FrontPage from "./components/FrontPage";
import Don from "./components/player";
import Navbar from "./components/Navbar";

// Import the loading video and CSS
import LoadingVideo from "./components/assets/loadingVideo.mp4";
import "./components/LoadingVideo.css";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { stream, setName } = useContext(SocketContext);
  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get(`https://interview-mania.onrender.com/auth/check`, { withCredentials: true })
      .then((response) => {
        if (response.status === 200) {
          setIsAuthenticated(true);
          setName(response.data.user.name);

        }
      })
      .catch(() => {
        setIsAuthenticated(false);
      });

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    console.log('Stream state changed:', stream);
  }, [stream]);

  if (isLoading) {
    return <div></div>;
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
          <FrontPage />
        </>
      ),
    },
    {
      path: "/interview",
      element: (
        <>
          <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
          {isAuthenticated ? (
            stream ? (
              <Don />
            ) : (
              <div className="loading-video-container">
                <video className="loading-video" src={LoadingVideo} autoPlay loop muted />
              </div>
            )
          ) : (
            <Navigate to='/signin' />
          )}
        </>
      ),
    },
    {
      path: "/contact",
      element: (
        <>
          <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
          <ContactPage />
        </>
      ),
    },
    {
      path: "/about",
      element: (
        <>
          <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
          <About />
        </>
      ),
    },
    {
      path: "/signin",
      element: (
        <>
          <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
          {isAuthenticated ? <Navigate to='/' /> : <SignIn setIsAuthenticated={setIsAuthenticated} />}
        </>
      ),
    },
    {
      path: "/signup",
      element: (
        <>
          <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
          {isAuthenticated ? <Navigate to='/' /> : <SignUp />}
        </>
      ),
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
