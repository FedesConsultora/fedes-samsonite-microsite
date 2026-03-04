import styles from "./StickyCTA.module.scss";
import { track } from "../../lib/track.js";

export default function StickyCTA({ onContactClick }) {
    const onCTA = () => {
        track("cta_click", { placement: "sticky" });
        onContactClick();
    };

    return (
        <div className={styles.wrap} aria-label="CTA persistente">
            <div className={styles.inner}>
                <div className={styles.text}>
                    <strong>Incrementalidad real</strong>
                    <span> · Partner regional · POAS · MMM continuo</span>
                </div>

                <button className={styles.cta} onClick={onCTA}>
                    Agendar 30 min <span aria-hidden="true">→</span>
                </button>
            </div>
        </div>
    );
}
