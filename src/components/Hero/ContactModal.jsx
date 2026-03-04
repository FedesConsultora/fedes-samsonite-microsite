import { useState } from "react";
import Lottie from "lottie-react";
import coheteData from "../../assets/lotties/coheteThankYou.json";
import styles from "./Hero.module.scss";
import { useLanguage } from "../../i18n/LanguageContext";

export default function ContactModal({ isOpen, onClose }) {
    const { t } = useLanguage();
    const [status, setStatus] = useState("idle"); // idle, sending, success

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus("sending");

        // Simulate sending
        setTimeout(() => {
            setStatus("success");
            // Integration Point: martin@fedesconsultora.com and mmartinez@fedesconsultora.com
        }, 1800);
    };

    const c = t.contactModal;

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                <button className={styles.closeBtn} onClick={onClose}>&times;</button>

                {status !== "success" ? (
                    <>
                        <h2 className={styles.modalTitle}>{c.title}</h2>
                        <p className={styles.modalSub}>{c.subtitle}</p>

                        <form className={styles.modalForm} onSubmit={handleSubmit}>
                            <div className={styles.inputGroup}>
                                <label>{c.name}</label>
                                <input type="text" placeholder={c.placeholderName} required />
                            </div>

                            {/* Added Company Name field as requested */}
                            <div className={styles.inputGroup}>
                                <label>{c.company}</label>
                                <input type="text" placeholder={c.placeholderCompany} required />
                            </div>

                            <div className={styles.inputGroup}>
                                <label>{c.email}</label>
                                <input type="email" placeholder={c.placeholderEmail} required />
                            </div>

                            <div className={styles.inputGroup}>
                                <label>{c.subject}</label>
                                <select required>
                                    <option value="">{c.selectOption}</option>
                                    {c.options.map((opt, i) => (
                                        <option key={i} value={opt}>{opt}</option>
                                    ))}
                                </select>
                            </div>

                            <button
                                type="submit"
                                className={styles.submitBtn}
                                disabled={status === "sending"}
                            >
                                {status === "sending" ? c.sending : c.submit}
                            </button>
                        </form>
                    </>
                ) : (
                    <div className={styles.successState}>
                        <div className={styles.lottieWrap}>
                            <Lottie animationData={coheteData} loop={false} />
                        </div>
                        <h2 className={styles.modalTitle}>{c.successTitle}</h2>
                        <p className={styles.modalSub}>
                            {c.successText}
                        </p>
                        <button className={styles.closeBtnFinal} onClick={onClose}>{c.close}</button>
                    </div>
                )}
            </div>
        </div>
    );
}
