
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ReactQueryDevtools } from "react-query/devtools";
import { QueryClient, QueryClientProvider } from "react-query";
import { createWebStoragePersister } from "react-query/createWebStoragePersister";
import { persistQueryClient } from "react-query/persistQueryClient";

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

const qClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 60 * 24, // 24 hours is how long till our data is actually updated
      staleTime: 1000 * 60 * 60 * 12, // Stale after 12 hrs.
    },
  },
});
const localStoragePersister = createWebStoragePersister({ storage: window.localStorage });
persistQueryClient({
  queryClient: qClient,
  persister: localStoragePersister
});

root.render(
  <React.StrictMode>
    <QueryClientProvider client={qClient}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);
