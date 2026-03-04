import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import styles from "./Signals.module.scss";
import { partnerSignals } from "../../data/partnerSignals.js";
import { useLanguage } from "../../i18n/LanguageContext";

export default function Signals() {
    const { t, lang } = useLanguage();
    const [activeIndex, setActiveIndex] = useState(0);
    const [isUserInteracting, setIsUserInteracting] = useState(false);
    const [isInitialRoulette, setIsInitialRoulette] = useState(true);
    const [isFocused, setIsFocused] = useState(false);

    // Drag state
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [dragOffset, setDragOffset] = useState(0);

    const timerRef = useRef(null);
    const interactionTimeoutRef = useRef(null);

    // Initial Roulette effect
    useEffect(() => {
        let count = 0;
        const totalSteps = 12;
        const interval = setInterval(() => {
            setActiveIndex(prev => (prev + 1) % partnerSignals.length);
            count++;
            if (count >= totalSteps) {
                clearInterval(interval);
                setIsInitialRoulette(false);
            }
        }, 150);
        return () => clearInterval(interval);
    }, []);

    // Auto-cycling - Keep it running even if focused as requested
    useEffect(() => {
        if (isInitialRoulette || isUserInteracting || isDragging) return;

        timerRef.current = setInterval(() => {
            setActiveIndex(prev => (prev + 1) % partnerSignals.length);
        }, 3000);

        return () => clearInterval(timerRef.current);
    }, [isInitialRoulette, isUserInteracting, isDragging]);

    const resetInteraction = () => {
        setIsUserInteracting(true);
        if (interactionTimeoutRef.current) clearTimeout(interactionTimeoutRef.current);
        interactionTimeoutRef.current = setTimeout(() => {
            setIsUserInteracting(false);
        }, 5000); // Resume auto-cycle after 5s of inactivity
    };

    const handleCardClick = (idx, e) => {
        if (isDragging && Math.abs(dragOffset) > 10) return;

        resetInteraction();

        if (activeIndex !== idx) {
            // First: move the card to the center (rotate the wheel)
            setActiveIndex(idx);
            setIsFocused(false);
        } else {
            // Second: if it's already centered, expand it
            setIsFocused(!isFocused);
        }
    };

    // Drag Logic
    const onStart = (e) => {
        if (isFocused) return;
        setIsDragging(true);
        setStartX(e.pageX || e.touches[0].pageX);
        setDragOffset(0);
        resetInteraction();
    };

    const onMove = (e) => {
        if (!isDragging) return;
        const x = e.pageX || e.touches[0].pageX;
        const diff = x - startX;
        setDragOffset(diff);

        // If dragged enough, move index
        if (Math.abs(diff) > 70) {
            if (diff > 0) {
                setActiveIndex(prev => (prev - 1 + partnerSignals.length) % partnerSignals.length);
            } else {
                setActiveIndex(prev => (prev + 1) % partnerSignals.length);
            }
            setStartX(x);
            setDragOffset(0);
        }
    };

    const onEnd = () => {
        setIsDragging(false);
    };

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
                className={styles.walletContainer}
                onMouseDown={onStart}
                onMouseMove={onMove}
                onMouseUp={onEnd}
                onMouseLeave={onEnd}
                onTouchStart={onStart}
                onTouchMove={onMove}
                onTouchEnd={onEnd}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1 }}
            >
                <div className={styles.cardsWrapper}>
                    {partnerSignals.map((s, idx) => {
                        const isActive = activeIndex === idx;
                        const isSelected = isActive && isFocused;

                        const relativeIndex = (idx - activeIndex + partnerSignals.length) % partnerSignals.length;
                        let displayIndex = relativeIndex;
                        if (displayIndex > partnerSignals.length / 2) {
                            displayIndex -= partnerSignals.length;
                        }

                        const currentTitle = lang === "en" ? s.title_en : s.title;
                        const currentDesc = lang === "en" ? s.desc_en : s.desc;

                        return (
                            <article
                                key={idx}
                                className={`
                                    ${styles.card}
                                    ${isActive ? styles.active : ""}
                                    ${isInitialRoulette ? styles.rouletteAnim : ""}
                                `}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleCardClick(idx, e);
                                }}
                                style={{
                                    "--display-index": displayIndex,
                                    "--abs-index": Math.abs(displayIndex),
                                    zIndex: 30 + (partnerSignals.length - Math.abs(displayIndex)),
                                    opacity: isSelected ? 0 : 1,
                                    pointerEvents: isFocused ? "none" : "auto"
                                }}
                            >
                                <div className={styles.cardInner}>
                                    <div className={styles.cardTop}>
                                        <div className={styles.cardIcon}></div>
                                        <span className={styles.cardBrand}>Fedes · {String(idx + 1).padStart(2, "0")}</span>
                                    </div>
                                    <h3 className={styles.cardTitle}>{currentTitle}</h3>
                                    <p className={styles.cardContent}>{currentDesc}</p>
                                </div>
                            </article>
                        );
                    })}
                </div>

                {/* Realistic Leather Wallet Body */}
                <div className={styles.walletBody} />

                {/* Golden label & drag handle inside the wallet */}
                <div className={styles.walletLabel}>{t.signals.label}</div>
                <div className={styles.dragHint}>
                    <div className={styles.dragPill} />
                    {t.signals.drag}
                    <div className={styles.dragPill} />
                </div>
            </motion.div>

            {/* Portal for focused card */}
            {isFocused && createPortal(
                <>
                    <div
                        className={`${styles.activeOverlay} ${styles.visible}`}
                        onClick={() => setIsFocused(false)}
                    />
                    <article
                        className={`${styles.card} ${styles.focused}`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className={styles.cardInner}>
                            <div className={styles.cardTop}>
                                <div className={styles.cardIcon}></div>
                                <span className={styles.cardBrand}>Fedes · {String(activeIndex + 1).padStart(2, "0")}</span>
                            </div>
                            <h3 className={styles.cardTitle}>
                                {lang === "en" ? partnerSignals[activeIndex].title_en : partnerSignals[activeIndex].title}
                            </h3>
                            <p className={styles.cardContent}>
                                {lang === "en" ? partnerSignals[activeIndex].desc_en : partnerSignals[activeIndex].desc}
                            </p>
                            {partnerSignals[activeIndex].image && (
                                <div className={styles.cardImageContainer}>
                                    <img
                                        src={partnerSignals[activeIndex].image}
                                        alt={lang === "en" ? partnerSignals[activeIndex].title_en : partnerSignals[activeIndex].title}
                                        className={styles.cardImage}
                                    />
                                </div>
                            )}
                        </div>
                    </article>
                    <button
                        className={styles.closeBtn}
                        onClick={() => setIsFocused(false)}
                    >
                        ✕
                    </button>
                </>,
                document.body
            )}
        </section>
    );
}
