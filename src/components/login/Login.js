import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const Login = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = loginData;
  const handleChange = (event) => {
    const { name, value } = event.target;
    setLoginData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleLoginClick = () => {
    const signedUpUser = JSON.parse(localStorage.getItem("signUpUser"));
    if (signedUpUser.email === email && signedUpUser.password === password) {
      localStorage.setItem("isLoggedIn", true);
      navigate("/products");
    } else {
      alert("invalid email or password");
    }
  };

  return (
    <div className="container p-5">
      <div>
        <h1>Login</h1>

        <div className="my-4">
          <form onSubmit={handleLoginClick}>
            <label className="mt-2">Email</label>
            <br />
            <input
              type="email"
              name="email"
              id="email formControlLg"
              value={email}
              className="form-control form-control-lg w-75"
              placeholder="Email"
              onChange={handleChange}
              required
            />
            <br />
            <label className="mt-2">Password</label>
            <br />
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              className="form-control form-control-lg w-75"
              placeholder="Password"
              onChange={handleChange}
              required
            />
            <br />
            <Button variant="primary" type="submit" className="ml-2 mt-4">
              Login
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
