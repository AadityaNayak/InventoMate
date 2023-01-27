import React from "react";
import {Link, Navigate, Outlet} from "react-router-dom";

// private component to redirect rout to signup if user not already logged in or signed up
function PrivateComponent() {

  // Getting user data from localstorage
    const auth = localStorage.getItem("user");
    console.log(auth)
  return (
    <div>
      {/* if auth available you can access routes in this private component else redirect to signup */}
        {auth ? <Outlet /> : <Navigate to="/signup" />}
    </div>
  );
}

export default PrivateComponent;
