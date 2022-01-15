import React from "react";

export const Login: React.FC = () => {
  return (
    <div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          console.log("login");
        }}
      >
        <div>
          <input
            //
            type="text"
          />
        </div>
        <div>
          <input
            //
            type="password"
          />
        </div>
        <button
          //
          type="submit"
        >
          login
        </button>
      </form>
    </div>
  );
};
