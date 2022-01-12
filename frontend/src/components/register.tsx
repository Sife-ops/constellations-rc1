import React from "react";

export const Register: React.FC = () => {
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log("register");
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
          register
        </button>
      </form>
    </div>
  );
};
