import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import styles from "./Scenario.module.scss";

const cases = [
    {
        id: 1,
        title: "Atribución e Incrementalidad",
        description: "Región Latam · Paid maduro · Escalamiento real",
        video: "/samsonite/assets/casos-de-exito/case1.mp4",
        poster: "/samsonite/assets/casos-de-exito/case1.webp"
    },
    {
        id: 2,
        title: "Curvas Marginales y MMM",
        description: "Optimización por país y etapa del funnel",
        video: "/samsonite/assets/casos-de-exito/case2.mp4",
        poster: "/samsonite/assets/casos-de-exito/case2.webp"
    },
    {
        id: 3,
        title: "Eficiencia de Ganancia (POAS)",
        description: "Modelo de contribución directa por SKU",
        video: "/samsonite/assets/casos-de-exito/case3.mp4",
        poster: "/samsonite/assets/casos-de-exito/case3.webp"
    }
];

function VideoCard({ item }) {
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
            className={styles.videoCard}
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
                <p>{item.description}</p>
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

    const displayItems = cases;

    return (
        <section id="scenario" className={styles.section} aria-label="Casos de éxito">
            <div className={styles.inner}>
                <header className={styles.header}>
                    <h2 className={styles.title}>Casos de éxito</h2>
                    <p className={styles.subtitle}>
                        Evidencia visual de nuestra metodología aplicada. No son solo reportes; son decisiones de negocio transformadas en resultados financieros.
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
                        <VideoCard key={`${item.id}-${idx}`} item={item} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
