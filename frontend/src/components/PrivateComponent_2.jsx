import React from "react";
import {Link, Navigate, Outlet} from "react-router-dom";

function PrivateComponent_2() {

  // Getting user data from localstorage
    const auth = localStorage.getItem("user");
  return (
    <div>
      {/* if auth not available you can access routes in this private component else redirect to index page */}
        {auth==null ? <Outlet /> : <Navigate to="/" />}
    </div>
  );
}

export default PrivateComponent_2;
