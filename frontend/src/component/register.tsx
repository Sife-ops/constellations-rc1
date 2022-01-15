import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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

  return (
    <div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();

          console.log(username, password);
          const response = await register({
            variables: {
              username,
              password,
            },
          });

          console.log(response);
          // navigate("/")
        }}
      >
        <input
          type="text"
          onChange={(e) =>
            setForm((form) => ({
              ...form,
              username: e.target.value,
            }))
          }
        />
        <input
          type="text"
          onChange={(e) =>
            setForm((form) => ({
              ...form,
              password: e.target.value,
            }))
          }
        />
        <button type="submit">register</button>
      </form>
    </div>
  );
};
