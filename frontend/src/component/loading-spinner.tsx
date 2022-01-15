import React from "react";
import { Spinner } from "react-bootstrap";

export const LoadingSpinner: React.FC = () => {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Spinner animation="grow" variant="primary" />
      </div>
    </div>
  );
};
