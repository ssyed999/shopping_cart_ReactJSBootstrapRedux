import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    fName: "",
    lName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { fName, lName, email, password, confirmPassword } = state;

  const handleTextChange = (event) => {
    const { name, value } = event.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignUpClick = () => {
    localStorage.setItem("signUpUser", JSON.stringify({ ...state }));
    navigate("/");
  };

  return (
    <div className="container p-5">
      <div>
        <h1>SignUp</h1>

        <div className="my-4 form-outline">
          <form onSubmit={handleSignUpClick} className="inputContainer">
            <label className="mt-2">First Name</label>
            <br />
            <input
              placeholder="First Name"
              id="fName"
              name="fName"
              value={fName}
              className="form-control form-control-lg w-75"
              onChange={handleTextChange}
              required
            />
            <br />
            <label className="mt-2">Last Name</label>
            <br />
            <input
              placeholder="Last Name"
              id="lName"
              className="form-control form-control-lg w-75"
              name="lName"
              value={lName}
              onChange={handleTextChange}
              required
            />
            <br />
            <label className="mt-2">Email</label>
            <br />
            <input
              placeholder="Email"
              id="email"
              type="email"
              className="form-control form-control-lg w-75"
              name="email"
              value={email}
              onChange={handleTextChange}
              required
            />
            <br />
            <label className="mt-2">Password</label>
            <br />
            <input
              placeholder="Password"
              id="password"
              className="form-control form-control-lg w-75"
              name="password"
              value={password}
              onChange={handleTextChange}
              type="password"
              required
            />
            <br />
            <label className="mt-2">Confirm Password</label>
            <br />
            <input
              placeholder="Confirm Password"
              id="confirmPassword"
              name="confirmPassword"
              className="form-control form-control-lg w-75"
              value={confirmPassword}
              onChange={handleTextChange}
              type="password"
              required
            />
            <br />
            <Button type="submit" variant="primary" className="ml-2 mt-4">
              Signup
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
