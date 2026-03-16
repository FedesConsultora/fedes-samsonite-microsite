import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { useLanguage } from "../../i18n/LanguageContext";
import styles from "./Scenario.module.scss";

// We import the videos from src/assets to let Vite handle them correctly
import case1Video from "../../assets/casos-de-exito/case1.webm";
import case1Poster from "../../assets/casos-de-exito/case1.webp";
import case2Video from "../../assets/casos-de-exito/case2.webm";
import case2Poster from "../../assets/casos-de-exito/case2.webp";
import case3Video from "../../assets/casos-de-exito/case3.webm";
import case3Poster from "../../assets/casos-de-exito/case3.webp";

const videoAssets = [
    { video: case1Video, poster: case1Poster },
    { video: case2Video, poster: case2Poster },
    { video: case3Video, poster: case3Poster }
];

function VideoCard({ item, className = "" }) {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(true);
    const [isMuted, setIsMuted] = useState(true);

    const togglePlay = (e) => {
        if (e) e.stopPropagation();
        if (videoRef.current) {
            if (videoRef.current.paused) {
                videoRef.current.play();
                setIsPlaying(true);
            } else {
                videoRef.current.pause();
                setIsPlaying(false);
            }
        }
    };

    const toggleMute = (e) => {
        e.stopPropagation();
        if (videoRef.current) {
            videoRef.current.muted = !videoRef.current.muted;
            setIsMuted(videoRef.current.muted);
        }
    };

    return (
        <motion.div
            className={`${styles.videoCard} ${className}`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={togglePlay}
        >
            <video
                ref={videoRef}
                className={styles.videoElement}
                src={item.video}
                poster={item.poster}
                autoPlay
                muted={isMuted}
                loop
                playsInline
            />
            {!isPlaying && (
                <div style={{
                    position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'rgba(0,0,0,0.3)', zIndex: 5
                }}>
                    <Play size={64} color="white" fill="white" style={{ opacity: 0.8 }} />
                </div>
            )}
            <div className={styles.cardOverlay}></div>
            <div className={styles.cardInfo}>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
            </div>

            <div className={styles.customControls}>
                <button className={styles.controlBtn} onClick={togglePlay} aria-label={isPlaying ? "Pause" : "Play"}>
                    {isPlaying ? <Pause fill="currentColor" /> : <Play fill="currentColor" />}
                </button>
                <button className={styles.controlBtn} onClick={toggleMute} aria-label={isMuted ? "Unmute" : "Mute"}>
                    {isMuted ? <VolumeX fill="currentColor" /> : <Volume2 fill="currentColor" />}
                </button>
            </div>
        </motion.div>
    );
}

export default function Scenario() {
    const { t } = useLanguage();
    const carouselRef = useRef(null);
    const [width, setWidth] = useState(0);

    useEffect(() => {
        const calculateWidth = () => {
            if (carouselRef.current) {
                setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
            }
        };

        calculateWidth();
        window.addEventListener("resize", calculateWidth);
        const timer = setTimeout(calculateWidth, 1000); // Give time for videos to load posters
        return () => {
            window.removeEventListener("resize", calculateWidth);
            clearTimeout(timer);
        };
    }, []);

    // Merge assets with translations
    const displayItems = t.scenario.cases.map((c, i) => ({
        ...c,
        ...videoAssets[i]
    }));

    return (
        <section id="scenario" className={styles.section} aria-label={t.scenario.title}>
            <div className={styles.inner}>
                <header className={styles.header}>
                    <h2 className={styles.title}>{t.scenario.title}</h2>
                    <p className={styles.subtitle}>
                        {t.scenario.subtitle}
                    </p>
                </header>
            </div>

            <div className={styles.carouselWrapper}>
                <motion.div
                    ref={carouselRef}
                    className={styles.carouselTrack}
                    drag={width > 0 ? "x" : false} // Only drag if items overflow
                    dragConstraints={{ right: 0, left: -width }}
                    dragElastic={0.1}
                >
                    {displayItems.map((item, idx) => (
                        <VideoCard
                            key={idx}
                            item={item}
                            className={idx === 0 ? styles.horizontal : ""}
                        />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
