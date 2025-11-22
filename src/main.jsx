import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./components/context/AuthProvider";
import { TabProvider } from "./components/context/TabProvider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <TabProvider>
        <App />
      </TabProvider>
    </AuthProvider>
  </StrictMode>
);
