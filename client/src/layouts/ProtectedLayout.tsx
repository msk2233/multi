import React from "react";
import { Outlet } from "react-router-dom";
import {  useAppSelector } from "../hooks/redux-hooks";
import { Navigate } from "react-router-dom";

const ProtectedLayout = () => {
  const basicUserInfo = useAppSelector((state) => state.auth.basicUserInfo);
  //added code for redirection of page
  const location = useLocation();

  useEffect(() => {
    // Store the intended destination in localStorage if the user is not authenticated
    if (!basicUserInfo) {
      localStorage.setItem('redirectPath', location.pathname);
    }
  }, [basicUserInfo, location.pathname]);
  /////////////////////////////

  if (!basicUserInfo) {
    return <Navigate replace to={"/login"} />;
  }

  return (
    <>
      <Outlet />
    </>
  );
};

export default ProtectedLayout;
