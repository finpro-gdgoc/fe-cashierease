import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import QueryProvider from "./providers/QueryProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <div className="mx-auto w-full max-w-screen-xl">
      <QueryProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QueryProvider>
    </div>
  </StrictMode>
);
