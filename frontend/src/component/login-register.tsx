import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { setAccessToken } from "../utility/token";
import { useLoginMutation, useRegisterMutation } from "../generated/graphql";

export enum LoginRegisterEnum {
  Login = "login",
  Register = "register"
}

interface Props {
  variant: string;
}

export const LoginRegister: React.FC<Props> = ({ variant }) => {
  const navigate = useNavigate();

  interface Form {
    username: string;
    password: string;
  }

  const initialForm: Form = {
    username: "",
    password: "",
  };

  const [{ username, password }, setForm] = useState<Form>(initialForm);

  const [login] = useLoginMutation();
  const [register] = useRegisterMutation();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (variant === "login") {
      const response = await login({
        variables: {
          username,
          password,
        },
      });
      const accessToken = response?.data?.login?.accessToken;
      if (accessToken) setAccessToken(accessToken);
    } else {
      await register({
        variables: {
          username,
          password,
        },
      });
      navigate("/login");
    }
    window.location.reload();
  };

  const handleUsername = (e: any) =>
    setForm((form) => ({
      ...form,
      username: e.target.value,
    }));

  const handlePassword = (e: any) =>
    setForm((form) => ({
      ...form,
      password: e.target.value,
    }));

  return (
    <div className="loginRegister__outer">
      <div className="loginRegister__inner">
        <div className="loginRegister__window mb-2">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                value={username}
                placeholder="Enter username"
                onChange={handleUsername}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                placeholder="Enter password"
                onChange={handlePassword}
              />
            </Form.Group>
            <div className="d-grid gap-2">
              {variant === "login" ? (
                <Button variant="primary" type="submit">
                  Login
                </Button>
              ) : (
                <Button variant="success" type="submit">
                  Register
                </Button>
              )}
            </div>
          </Form>
        </div>
        <div className="loginRegister__link">
          {variant === "login" ? (
            <Link to="/register">Register</Link>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>
      </div>
    </div>
  );
};
