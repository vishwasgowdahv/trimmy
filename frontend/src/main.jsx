import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./contexts/AuthContext";
import { UrlProvider } from "./contexts/UrlContext";
import { AnalyticsProvider } from "./contexts/AnalyticsContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <UrlProvider>
        <AnalyticsProvider>
          <App />
        </AnalyticsProvider>
      </UrlProvider>
    </AuthProvider>
  </StrictMode>,
);
