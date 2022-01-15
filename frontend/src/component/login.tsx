import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../generated/graphql";
import { setAccessToken } from "../utility/token";

export const Login: React.FC = () => {
  // const navigate = useNavigate();

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

  return (
    <div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();

          console.log(username, password);
          const response = await login({
            variables: {
              username,
              password,
            },
          });

          console.log(response);

          const accessToken = response?.data?.login?.accessToken;
          if (accessToken) setAccessToken(accessToken);

          window.location.reload();
        }}
      >
        <div>
          <div>
            <label>username:</label>
          </div>
          <input
            type="text"
            onChange={(e) =>
              setForm((form) => ({
                ...form,
                username: e.target.value,
              }))
            }
          />
        </div>
        <div>
          <div>
            <label>password:</label>
          </div>
          <input
            type="text"
            onChange={(e) =>
              setForm((form) => ({
                ...form,
                password: e.target.value,
              }))
            }
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};
