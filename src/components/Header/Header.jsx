import { useState, useRef, useEffect } from "react";
import { useLanguage } from "../../i18n/LanguageContext";
import styles from "./Header.module.scss";
import logo from "../../assets/logo/FedesLogo.webp";

export default function Header({ onContactClick }) {
    const { t, lang, setLang } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close on click outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const languages = [
        { code: "es", label: "ES", flag: "🇦🇷" },
        { code: "en", label: "EN", flag: "🇺🇸" }
    ];

    const currentLang = languages.find(l => l.code === lang);

    return (
        <header className={styles.header}>
            <div className={styles.inner}>
                <a className={styles.brand} href="#top" aria-label="Fedes">
                    <img src={logo} alt="Fedes Logo" className={styles.logo} />
                </a>

                <nav className={styles.nav} aria-label="Secciones">
                    <a href="#why-fedes">{t.nav.why}</a>
                    <a href="#framework">{t.nav.how}</a>
                    <a href="#presence">{t.nav.latam}</a>

                    <button
                        className={styles.contactBtn}
                        onClick={onContactClick}
                    >
                        {t.nav.contact}
                    </button>

                    <div className={styles.langWrapper} ref={dropdownRef}>
                        <button
                            className={styles.langToggle}
                            onClick={() => setIsOpen(!isOpen)}
                            aria-haspopup="true"
                            aria-expanded={isOpen}
                        >
                            <span className={styles.flag}>{currentLang.flag}</span>
                            <span className={styles.label}>{currentLang.label}</span>
                            <span className={`${styles.chevron} ${isOpen ? styles.chevronUp : ""}`}>▾</span>
                        </button>

                        {isOpen && (
                            <div className={styles.dropdown}>
                                {languages.map((l) => (
                                    <button
                                        key={l.code}
                                        className={`${styles.dropdownItem} ${lang === l.code ? styles.activeLang : ""}`}
                                        onClick={() => {
                                            setLang(l.code);
                                            setIsOpen(false);
                                        }}
                                    >
                                        <span className={styles.flag}>{l.flag}</span>
                                        <span className={styles.label}>{l.label}</span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </nav>
            </div>
        </header>
    );
}
