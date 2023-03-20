import React from "react";
import { Navigate, Outlet } from "react-router-dom";
function PrivateComponentPage() {
  const auth = localStorage.getItem("user");
  return auth ? <Outlet /> : <Navigate to="/signUp" />;
}

export default PrivateComponentPage;
