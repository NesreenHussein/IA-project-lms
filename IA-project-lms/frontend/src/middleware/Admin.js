import React from "react";
import { Outlet,Navigate } from "react-router-dom";
import { getAuthUser } from "../helper/Storage";

const Admin = () => {
  const auth = getAuthUser();
  return <>
    { auth && auth.role === '1' ? <Outlet/> : <Navigate to = {"/"}/>}</>;
  
};
export default Admin;