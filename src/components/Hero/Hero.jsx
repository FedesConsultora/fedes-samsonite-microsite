import { motion } from "framer-motion";
import { useLanguage } from "../../i18n/LanguageContext";
import styles from "./Hero.module.scss";
import { track } from "../../lib/track.js";
import VideoPlayer from "../VideoPlayer/VideoPlayer";

import heroBg from "../../assets/hero/hero-bg.webp";
import case1Video from "../../assets/casos-de-exito/case1.webm";
import case1Poster from "../../assets/casos-de-exito/case1.webp";

export default function Hero({ onContactClick }) {
    const { t } = useLanguage();

    const onCTA = (e) => {
        if (e) e.preventDefault();
        track("cta_click", { placement: "hero" });
        onContactClick();
    };

    return (
        <section id="top" className={styles.hero} aria-label="Posicionamiento">
            <div className={styles.bg} aria-hidden="true">
                <img className={styles.bgImg} src={heroBg} alt="" loading="eager" />
                <div className={styles.overlay} />
            </div>

            <div className={styles.inner}>
                <motion.div
                    className={styles.copy}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <div className={styles.kicker}>Partner regional | Media + eCommerce + Analytics</div>

                    <h1 className={styles.title}>
                        {t.hero.title}
                    </h1>

                    <p className={styles.subtitle}>
                        {t.hero.subtitle.includes('\n') ? (
                            <>
                                {t.hero.subtitle.split('\n')[0].trim()}
                                <span className={styles.desktopBr}><br />de </span>
                                <span className={styles.mobileBr}> de <br /></span>
                                {t.hero.subtitle.split('\n')[1].trim().replace(/^de\s*/, '')}
                            </>
                        ) : t.hero.subtitle}
                    </p>

                    <div className={styles.actions}>
                        <button className={styles.primary} onClick={onCTA}>
                            {t.hero.ctaPrimary} <span aria-hidden="true">→</span>
                        </button>
                        <a className={styles.secondary} href="#why-fedes">
                            {t.hero.ctaSecondary} <span aria-hidden="true">↓</span>
                        </a>
                    </div>
                </motion.div>

                <motion.div
                    className={styles.media}
                    aria-label="Visual"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                >
                    <div className={styles.mediaCard}>
                        <VideoPlayer
                            src={case1Video}
                            poster={case1Poster}
                            ariaLabel="Success Case 1"
                            className={styles.video}
                        />
                        <div className={styles.mediaCaption}>
                            <strong>{t.common.successCase}:</strong> Attribution & Incrementality
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
