/** @format */
import "./login.css";

import { Link, useNavigate } from "react-router-dom";

import { UserLogin } from "../../services/interfaces";
import React, { useState } from "react";
import { loginService } from "../../services/authService";
import swal from "sweetalert";

const Login = () => {
  const navigation = useNavigate();

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleChangesValues = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues((values: UserLogin) => ({
      ...values,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const response: any = await loginService.Login(values);

    if (!response) {
      swal({
        title: "login error",
        text: "Invalid username and/or password",
        icon: "error",
        timer: 6000,
      });
    }

    const jwt = response.data.token;
    const userId = response.data.user.id;

    if (jwt) {
      localStorage.setItem("jwt", jwt);
      localStorage.setItem("userId", userId);
      swal({
        title: "Welcome",
        icon: "success",
        timer: 3000,
      });
      navigation("/profiles");
    }
  };

  return (
    <div className="login">
      <main>
        <section className="login-section">
          <form className="login-content" onSubmit={handleLogin}>
            <input
              type='text'
              name='email'
              id='email'
              placeholder=' Enter your login email'
              required
              onChange={handleChangesValues}
            />

            <input
              type='password'
              name='password'
              id='password'
              placeholder=' Enter your access password'
              required
              onChange={handleChangesValues}
            />

            <p className="login-description">
              You don't have an account created{" "}
              <strong>
                <Link to={"/singup"}>Create one here!</Link>
              </strong>
            </p>

            <button type='submit'>Login</button>
          </form>
        </section>
      </main>
    </div>
  );
};

export default Login;
