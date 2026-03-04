import styles from "./Comparison.module.scss";

export default function Comparison() {
    return (
        <section id="comparison" className={styles.section} aria-label="Lo que aprendimos a hacer">
            <div className={styles.inner}>
                <header className={styles.header}>
                    <h2 className={styles.title}>Lo que aprendimos a hacer</h2>
                    <p className={styles.subtitle}>
                        Superamos el modelo de "agencia de medios" tradicional para convertirnos en un partner estratégico financiero.
                    </p>
                </header>

                <div className={styles.tableWrapper}>
                    <div className={styles.table}>
                        <div className={styles.row}>
                            <div className={styles.th}>Agencia tradicional</div>
                            <div className={styles.th}>Fedes</div>
                        </div>

                        <div className={styles.row}>
                            <div className={styles.td}>Optimiza ROAS</div>
                            <div className={styles.tdStrong}>Optimiza contribución marginal (POAS)</div>
                        </div>

                        <div className={styles.row}>
                            <div className={styles.td}>Reporta métricas de plataforma</div>
                            <div className={styles.tdStrong}>Defiende decisiones financieras con evidencia</div>
                        </div>

                        <div className={styles.row}>
                            <div className={styles.td}>Ejecuta pedidos por canal</div>
                            <div className={styles.tdStrong}>Co-diseña inversión full funnel</div>
                        </div>

                        <div className={styles.row}>
                            <div className={styles.td}>“Más presupuesto = más crecimiento”</div>
                            <div className={styles.tdStrong}>Detecta saturación y reasigna con curvas marginales</div>
                        </div>

                        <div className={styles.row}>
                            <div className={styles.td}>MMM como proyecto aislado</div>
                            <div className={styles.tdStrong}>MMM continuo: modelo vivo + aprendizaje</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
