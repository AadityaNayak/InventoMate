import React from "react";
import {Link, useNavigate} from "react-router-dom";

function Navbar() {

  const auth = localStorage.getItem("user");
  const navigate = useNavigate();

  // to log out user
  function logUserOut(){
      localStorage.clear();
      navigate("/signup")
      console.log("ran");
  }

  return (
    <div className="nav">
      <ul>
        {/* using declarative if else to display navbar in different scenarios according to user login/signup */}
      {auth ?<li className = "nav-element"><Link to="/">Products</Link></li>:("")}
        {auth ?<li className = "nav-element"><Link to="/add-product">Add Products</Link></li>:""}
        {auth==null ? <li className = "nav-element"> <Link to="/login">Login</Link></li>:("")}
        <li className = "nav-element">{auth==null ? (<Link to="/signup">Sign Up</Link>):(<Link to="/signup" onClick={logUserOut}>Log Out</Link>)}</li>
      </ul>
    </div>
  );
}

export default Navbar;
