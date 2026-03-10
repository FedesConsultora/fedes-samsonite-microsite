import { useState, useRef, useEffect } from 'react';
import styles from './Folder.module.scss';

const darkenColor = (hex, percent) => {
    let color = hex.startsWith('#') ? hex.slice(1) : hex;
    if (color.length === 3) {
        color = color.split('').map(c => c + c).join('');
    }
    const num = parseInt(color, 16);
    let r = (num >> 16) & 0xff;
    let g = (num >> 8) & 0xff;
    let b = num & 0xff;
    r = Math.max(0, Math.min(255, Math.floor(r * (1 - percent))));
    g = Math.max(0, Math.min(255, Math.floor(g * (1 - percent))));
    b = Math.max(0, Math.min(255, Math.floor(b * (1 - percent))));
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
};

const Folder = ({ color = '#b08d6a', size = 1, items = [], className = '', hint = '' }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const containerRef = useRef(null);
    const folderRef = useRef(null);
    const [touchStart, setTouchStart] = useState(null);
    const autoCycleTimeoutRef = useRef(null);

    // Function to start/reset the auto-cycle
    const startAutoCycle = () => {
        stopAutoCycle();
        autoCycleTimeoutRef.current = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % items.length);
        }, 3500); // Rotate every 3.5 seconds
    };

    const stopAutoCycle = () => {
        if (autoCycleTimeoutRef.current) {
            clearInterval(autoCycleTimeoutRef.current);
        }
    };

    useEffect(() => {
        // Observer for OPENING: watches the folder element, fires when 100% visible
        const openObserver = new IntersectionObserver(
            ([entry]) => {
                if (entry.intersectionRatio >= 1.0) {
                    setIsOpen(true);
                    startAutoCycle();
                }
            },
            { threshold: 1.0 }
        );

        // Observer for CLOSING: watches the full container (folder + cards area)
        // Closes when more than 80% of the area has left the viewport
        const closeObserver = new IntersectionObserver(
            ([entry]) => {
                if (entry.intersectionRatio < 0.4) {
                    setIsOpen(false);
                    stopAutoCycle();
                }
            },
            { threshold: [0, 0.2] }
        );

        if (folderRef.current) {
            openObserver.observe(folderRef.current);
        }
        if (containerRef.current) {
            closeObserver.observe(containerRef.current);
        }

        return () => {
            if (folderRef.current) {
                openObserver.unobserve(folderRef.current);
            }
            if (containerRef.current) {
                closeObserver.unobserve(containerRef.current);
            }
            stopAutoCycle();
        };
    }, [items.length]);

    const folderStyle = {
        '--folder-color': color,
        '--folder-color-dark': darkenColor(color, 0.2),
        transform: `scale(${size})`,
    };

    const handleCardClick = (e, displayIndex) => {
        e.stopPropagation();
        stopAutoCycle(); // Pause auto-rotation on interaction
        if (displayIndex < 0) {
            setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
        } else if (displayIndex > 0) {
            setActiveIndex((prev) => (prev + 1) % items.length);
        }
        // Optional: resume after a long delay
        setTimeout(startAutoCycle, 5000);
    };

    // Touch handlers for swiping
    const handleTouchStart = (e) => {
        stopAutoCycle();
        setTouchStart(e.touches[0].clientX);
    };

    const handleTouchEnd = (e) => {
        if (!touchStart) return;
        const touchEnd = e.changedTouches[0].clientX;
        const diff = touchStart - touchEnd;

        if (Math.abs(diff) > 40) { // Threshold for swipe
            if (diff > 0) {
                // Swipe left -> Next
                setActiveIndex((prev) => (prev + 1) % items.length);
            } else {
                // Swipe right -> Prev
                setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
            }
        }
        setTouchStart(null);
        setTimeout(startAutoCycle, 5000);
    };

    return (
        <div
            ref={containerRef}
            className={`${styles.folderContainer} ${className}`}
            style={folderStyle}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            <div
                ref={folderRef}
                className={`${styles.folder} ${isOpen ? styles.open : ''}`}
            >
                <div className={styles.folderBack}>
                    {items.map((item, i) => {
                        const total = items.length;
                        let displayIndex = i - activeIndex;
                        if (displayIndex > total / 2) displayIndex -= total;
                        if (displayIndex <= -total / 2) displayIndex += total;

                        const isActive = displayIndex === 0;

                        return (
                            <div
                                key={i}
                                className={`
                  ${styles.paper} 
                  ${isOpen ? styles[`paperPos${displayIndex + 3}`] : ''} 
                  ${isActive ? styles.active : ''}
                `}
                                onClick={(e) => handleCardClick(e, displayIndex)}
                                style={{
                                    zIndex: (isOpen ? 40 - Math.abs(displayIndex) * 10 : 5),
                                    opacity: isOpen && Math.abs(displayIndex) <= 2 ? 1 : 0,
                                    visibility: isOpen ? 'visible' : 'hidden',
                                    pointerEvents: isOpen ? 'auto' : 'none'
                                }}
                            >
                                {item}
                            </div>
                        );
                    })}
                    <div className={styles.folderFront}></div>
                </div>
            </div>
            {isOpen && (
                <div className={styles.hintText}>
                    {hint}
                </div>
            )}
        </div>
    );
};

export default Folder;
