import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "./app";
import "./index.css";
import "./translation/i18n.ts";

const rootId = "root";
let rootElement = document.getElementById(rootId);

// Create root if it doesnt exist
if (!rootElement) {
  rootElement = document.createElement("div");
  rootElement.id = rootId;
  document.body.appendChild(rootElement);
}

createRoot(rootElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
