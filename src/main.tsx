import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "@ant-design/v5-patch-for-react-19";
import Provider from "./Provider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider />
  </StrictMode>
);
