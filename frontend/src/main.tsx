import "./index.css";
import App from "./App";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { GlobalProvider } from "./utility/context";
import { createClient, Provider } from "urql";

const client = createClient({
  url: "http://localhost:4000/graphql",
});

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <GlobalProvider>
        <Provider value={client}>
          <App />
        </Provider>
      </GlobalProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
