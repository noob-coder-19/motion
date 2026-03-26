import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./app.tsx";
import "./index.css";

// biome-ignore lint/style/noNonNullAssertion: this is a valid use case
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
