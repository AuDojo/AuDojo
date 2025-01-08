import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "./app";
import { SortProvider } from "./contexts";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SortProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </SortProvider>
  </React.StrictMode>
);
