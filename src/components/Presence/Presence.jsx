import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import { motion } from "framer-motion";
import { useLanguage } from "../../i18n/LanguageContext";
import styles from "./Presence.module.scss";

// TopoJSON for the world
const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const markers = [
    { code: "MX", coordinates: [-102.5, 23.6], offset: [0, -15] },
    { code: "CO", coordinates: [-74.3, 4.6], offset: [40, 0] },
    { code: "PE", coordinates: [-75.0, -9.1], offset: [-20, 15] },
    { code: "CL", coordinates: [-71.5, -35.6], offset: [-30, 0] },
    { code: "AR", coordinates: [-63.6, -38.4], offset: [25, 20] },
    { code: "UY", coordinates: [-55.7, -32.5], offset: [35, 0] },
];

// IDs for the specific countries in the TopoJSON to highlight or interact with
const targetCountryIds = ["484", "170", "604", "152", "032", "858"]; // MX, CO, PE, CL, AR, UY

export default function Presence() {
    const { t } = useLanguage();

    return (
        <section id="presence" className={styles.section} aria-label={t.presence.title}>
            <div className={styles.inner}>
                <div className={styles.contentGrid}>
                    <motion.div
                        className={styles.textContent}
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <header className={styles.header}>
                            <h2 className={styles.mainTitle}>
                                {t.presence.title} <br />
                                <span>{t.presence.subtitle}</span>
                            </h2>
                            <p className={styles.lead}>
                                {t.presence.lead}
                            </p>
                        </header>

                        <div className={styles.opsFeature}>
                            <h3 className={styles.opsTitle}>{t.presence.opsTitle}</h3>
                            <ul className={styles.notes}>
                                {t.presence.features.map((f, i) => (
                                    <li key={i}><strong>{f.title}</strong> {f.desc}</li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>

                    <motion.div
                        className={styles.mapSide}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 }}
                    >
                        <div className={styles.mapWrapper}>
                            <ComposableMap
                                projection="geoMercator"
                                projectionConfig={{
                                    scale: 180,
                                    center: [-20, -10]
                                }}
                                className={styles.svgMap}
                                viewBox="0 0 400 520"
                            >
                                <Geographies geography={geoUrl}>
                                    {({ geographies }) =>
                                        geographies.map((geo) => {
                                            const isSelected = targetCountryIds.includes(geo.id);
                                            return (
                                                <Geography
                                                    key={geo.rsmKey}
                                                    geography={geo}
                                                    className={isSelected ? styles.geoActive : styles.geoBase}
                                                    style={{
                                                        default: { outline: "none" },
                                                        hover: { outline: "none" },
                                                        pressed: { outline: "none" },
                                                    }}
                                                />
                                            );
                                        })
                                    }
                                </Geographies>
                                {markers.map(({ code, coordinates, offset }) => (
                                    <Marker key={code} coordinates={coordinates}>
                                        <circle r={6} className={styles.dot} />
                                        <text
                                            textAnchor="middle"
                                            y={offset[1]}
                                            x={offset[0]}
                                            className={styles.mapLabel}
                                        >
                                            {t.presence.countries[code]}
                                        </text>
                                    </Marker>
                                ))}
                            </ComposableMap>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
