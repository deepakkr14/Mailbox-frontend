import { Navigate } from "react-router-dom";
import Nav2 from "../components/UI/nav2";
import React, { useState, useEffect } from "react";

const ProtectedRoutes = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const updateToken = () => {
      setToken(localStorage.getItem("token"));
    };

    window.addEventListener("storage", updateToken);

    return () => {
      window.removeEventListener("storage", updateToken);
    };
  }, []);

  return token ? <Nav2 /> : <Navigate to="/singin" />;
};

export default ProtectedRoutes;
