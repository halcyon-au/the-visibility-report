import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ChakraProvider } from "@chakra-ui/react"; // TODO: Switch To Chakra

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
