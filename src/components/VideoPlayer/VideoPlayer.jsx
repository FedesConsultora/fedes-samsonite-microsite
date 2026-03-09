import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";
import styles from "./VideoPlayer.module.scss";

export default function VideoPlayer({ src, poster, ariaLabel, className = "" }) {
    const [isMuted, setIsMuted] = useState(true);
    const [isHovered, setIsHovered] = useState(false);
    const videoRef = useRef(null);

    const toggleMute = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (videoRef.current) {
            const newMuted = !videoRef.current.muted;
            videoRef.current.muted = newMuted;
            setIsMuted(newMuted);
        }
    };

    return (
        <div
            className={`${styles.container} ${className}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <video
                ref={videoRef}
                className={styles.video}
                src={src}
                poster={poster}
                autoPlay
                muted
                loop
                playsInline
                aria-label={ariaLabel}
            />

            <button
                className={`${styles.volumeBtn} ${isHovered ? styles.visible : ""}`}
                onClick={toggleMute}
                aria-label={isMuted ? "Unmute video" : "Mute video"}
            >
                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
        </div>
    );
}
