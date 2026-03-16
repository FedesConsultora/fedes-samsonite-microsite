import { motion } from "framer-motion";
import styles from "./Signals.module.scss";
import { useLanguage } from "../../i18n/LanguageContext";
import Folder from "./Folder";
import { partnerSignals } from "../../data/partnerSignals";

export default function Signals() {
    const { lang, t } = useLanguage();

    // Usamos los datos de partnerSignals y seleccionamos el contenido según el idioma actual
    const folderItems = partnerSignals.map((s, idx) => {
        const title = lang === 'es' ? s.title : s.title_en;
        const desc = lang === 'es' ? s.desc : s.desc_en;

        return (
            <div key={idx} className={styles.cardItem}>
                <div
                    className={styles.cardBg}
                    style={{ backgroundImage: `url(${s.image})` }}
                />
                <div className={styles.cardOverlay} />
                <div className={styles.cardInfo}>
                    <h3 className={styles.cardTitle}>{title}</h3>
                    <p className={styles.cardContent}>{desc}</p>
                </div>
            </div>
        );
    });

    return (
        <section id="why-fedes" className={styles.section} aria-label={t.signals.title}>
            <div className={styles.inner}>
                <motion.header
                    className={styles.header}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className={styles.title}>{t.signals.title}</h2>
                    <p className={styles.subtitle}>
                        {t.signals.subtitle}
                    </p>
                </motion.header>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 1 }}
            >
                <Folder
                    items={folderItems}
                    color="#b08d6a" // Light brown / tan leather color
                    hint={t.signals.drag}
                />
            </motion.div>
        </section>
    );
}
