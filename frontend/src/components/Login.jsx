import React from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    // Making form input as controlled components by managing them in states
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });

  // To navigate to another rout on demand
  const navigate = useNavigate();

  // To link form data with state formData
  function updateFormData(event) {
    setFormData((prevFormData) => {
      return { ...prevFormData, [event.target.name]: event.target.value };
    });
  }

    // on form submit 
  async function submitData(event) {
    event.preventDefault();
    event.stopPropagation();
    let result = await fetch("http://localhost:5000/login", {
      method: "post",
      body: JSON.stringify(formData),
      headers: {
        "Content-type": "application/json",
      },
    });

    result = await result.json();

    // result have two things result:containing user info and auth: containing token
    if (result.auth) {
      // store user info in local storage
      localStorage.setItem("user", JSON.stringify(result.result))
      // store auth token in local storage
      localStorage.setItem("token", JSON.stringify(result.auth))
      navigate("/");
    } else {
      alert("Please give correct credentials");
    }
  }

  return (
    <div className="signup">
      <h1>Login</h1>
      <form action="POST">
        <label htmlFor="email">Email: </label>
        <input
          type="text"
          placeholder="Enter email"
          onChange={updateFormData}
          name="email"
          value={formData.email}
        />
        <label htmlFor="password">Password: </label>
        <input
          type="text"
          placeholder="Enter password"
          onChange={updateFormData}
          name="password"
          value={formData.password}
        />

        <button type="submit" onClick={submitData}>
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
