import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "@mantine/core/styles.css";
import App from "./App";
import { MantineProvider } from "@mantine/core";
import { Provider as ReduxProvider } from "react-redux";
import { QueryClientProvider } from "@tanstack/react-query";
import { store } from "./store"; // Adjust the path as needed
import { queryClient } from "./queryClient"; // Adjust the path as needed

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReduxProvider store={store}>
        <MantineProvider>
          <App />
        </MantineProvider>
      </ReduxProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
