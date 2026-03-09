import { motion } from "framer-motion";
import { useLanguage } from "../../i18n/LanguageContext";
import styles from "./Invitation.module.scss";
import { track } from "../../lib/track.js";
import VideoPlayer from "../VideoPlayer/VideoPlayer";

// Importing Case 3 assets
import case3Video from "../../assets/casos-de-exito/case3.webm";
import case3Poster from "../../assets/casos-de-exito/case3.webp";

export default function Invitation({ onContactClick }) {
    const { t } = useLanguage();
    const onCTA = (placement) => track("cta_click", { placement });

    return (
        <section id="contact" className={styles.section} aria-label="Invitación">
            <div className={styles.inner}>
                <div className={styles.grid}>
                    <motion.div
                        className={styles.contentSide}
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className={styles.card}>
                            <h2 className={styles.title}>
                                {t.invitation.title}
                            </h2>

                            <p className={styles.subtitle}>
                                {t.invitation.desc}
                            </p>

                            <div className={styles.actions}>
                                <button className={styles.primary} onClick={() => { onCTA("invitation"); onContactClick(); }}>
                                    {t.invitation.cta} <span aria-hidden="true">→</span>
                                </button>

                                <a className={styles.secondary} href="#top" onClick={() => onCTA("back_to_top")}>
                                    {t.common.backToTop} <span aria-hidden="true">↑</span>
                                </a>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        className={styles.videoSide}
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <div className={styles.videoCard}>
                            <VideoPlayer
                                src={case3Video}
                                poster={case3Poster}
                                ariaLabel="Success Case 3"
                                className={styles.video}
                            />
                            <div className={styles.videoCaption}>
                                <strong>{t.common.successCase}:</strong> Profit Efficiency (POAS)
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
