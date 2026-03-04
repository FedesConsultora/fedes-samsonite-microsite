import { useLanguage } from "../../i18n/LanguageContext";
import styles from "./Footer.module.scss";
import logo from "../../assets/logo/FedesLogo.webp";

export default function Footer() {
    const { t, lang } = useLanguage();
    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footer} aria-label="Footer">
            <div className={styles.inner}>
                <div className={styles.left}>
                    <div className={styles.brand}>
                        <img src={logo} alt="Fedes Logo" className={styles.logo} />
                    </div>
                    <div className={styles.meta}>
                        {lang === "es" ? "Consultora · Performance · Tecnología · Operación regional" : "Consultancy · Performance · Technology · Regional Operation"}
                        <br />
                        © {currentYear} Fedes. {lang === "es" ? "Todos los derechos reservados." : "All rights reserved."}
                    </div>
                </div>

                <div className={styles.right}>
                    <a href="#why-fedes">{t.nav.why}</a>
                    <a href="#framework">{t.nav.how}</a>
                    <a href="#presence">{t.nav.latam}</a>
                    <a href="#contact">{t.nav.contact}</a>
                </div>
            </div>
        </footer>
    );
}
