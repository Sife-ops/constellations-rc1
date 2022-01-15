import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../generated/graphql";

export const Register: React.FC = () => {
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

  const [register] = useRegisterMutation();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(username, password);
    const response = await register({
      variables: {
        username,
        password,
      },
    });
    console.log(response);
    navigate("/login");
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
    <div className="class1">
      <div className="class2">
        <div className="class3 mb-2">
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
              <Button variant="success" type="submit">
                Register
              </Button>
            </div>
          </Form>
        </div>
        <div className="class4">
          <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
};
