import React from "react";
import ReactDOM from "react-dom/client";
import { LanguageProvider } from "./i18n/LanguageContext";
import App from "./App.jsx";
import "./styles/global.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <LanguageProvider>
            <App />
        </LanguageProvider>
    </React.StrictMode>
);
