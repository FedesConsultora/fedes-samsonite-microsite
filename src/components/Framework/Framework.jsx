import { motion } from "framer-motion";
import { useLanguage } from "../../i18n/LanguageContext";
import styles from "./Framework.module.scss";
import VideoPlayer from "../VideoPlayer/VideoPlayer";

// Importing video and poster from src/assets
import case2Video from "../../assets/casos-de-exito/case2.webm";
import case2Poster from "../../assets/casos-de-exito/case2.webp";

export default function Framework() {
    const { t } = useLanguage();

    return (
        <section id="framework" className={styles.section} aria-label="Framework">
            <div className={styles.inner}>
                <div className={styles.grid}>
                    <motion.header
                        className={styles.header}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className={styles.title}>{t.framework.title}</h2>
                        <p className={styles.subtitle}>
                            {t.framework.subtitle}
                        </p>
                    </motion.header>

                    <motion.div
                        className={styles.videoSide}
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 }}
                    >
                        <div className={styles.videoCard}>
                            <VideoPlayer
                                src={case2Video}
                                poster={case2Poster}
                                ariaLabel="Success Case 2"
                                className={styles.video}
                            />
                            <div className={styles.videoCaption}>
                                <strong>{t.common.successCase}:</strong> Marginal Optimization & MMM
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        className={styles.contentSide}
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.4 }}
                    >
                        <ol className={styles.list}>
                            {t.framework.steps.map((s, idx) => (
                                <li key={idx} className={styles.item}>
                                    <div className={styles.badge}>{String(idx + 1).padStart(2, "0")}</div>
                                    <div>
                                        <h3 className={styles.itemTitle}>{s.title}</h3>
                                        <p className={styles.itemDesc}>{s.desc}</p>
                                    </div>
                                </li>
                            ))}
                        </ol>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
