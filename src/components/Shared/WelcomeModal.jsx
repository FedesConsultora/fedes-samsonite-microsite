import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../../i18n/LanguageContext";
import styles from "./WelcomeModal.module.scss";
import fedesLogo from "../../assets/logo/FedesLogo.webp";

export default function WelcomeModal({ isOpen, onClose, customerLogo }) {
    const { t } = useLanguage();

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className={styles.overlay}>
                    <motion.div
                        className={styles.modal}
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className={styles.logos}>
                            <img src={fedesLogo} alt="Fedes Logo" className="logoFedes"/>
                            <div className={styles.divider} />
                            {customerLogo && (
                                <img src={customerLogo} alt="Customer Logo" className={styles.logo} />
                            )}
                        </div>
                        
                        <h2 className={styles.title}>{t.welcomeModal.title}</h2>
                        <p className={styles.message}>{t.welcomeModal.message}</p>
                        
                        <button className={styles.cta} onClick={onClose}>
                            {t.welcomeModal.cta}
                        </button>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
