
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const container = document.getElementById("root");
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!);

const theme = createTheme({
  typography: {
    fontFamily: "'IBM Plex Sans', sans-serif",
  },
  palette: {
    // primary: {
    //   main: "#000000",
    // },
    // text: {
    //   primary: "#ffffff",
    // },
  },
});

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
