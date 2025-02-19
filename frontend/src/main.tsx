import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./app";
import "./styles/global.css";
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
  <StrictMode>
    <App />
  </StrictMode>
);
