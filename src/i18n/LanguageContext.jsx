import { createContext, useContext, useState, useEffect } from "react";
import { translations } from "./translations";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
    const [lang, setLang] = useState(() => {
        const saved = localStorage.getItem("fedes_lang");
        return saved || "es";
    });

    useEffect(() => {
        localStorage.setItem("fedes_lang", lang);
        document.documentElement.lang = lang;
    }, [lang]);

    const t = translations[lang];

    const toggleLang = () => {
        setLang(prev => prev === "es" ? "en" : "es");
    };

    return (
        <LanguageContext.Provider value={{ lang, setLang, t, toggleLang }}>
            {children}
        </LanguageContext.Provider>
    );
}

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
};
