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

const Folder = ({ color = '#b08d6a', size = 1, items = [], className = '' }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const containerRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                // Trigger open when the folder is at least 30% visible in the viewport
                if (entry.isIntersecting) {
                    setIsOpen(true);
                } else {
                    setIsOpen(false);
                    // Optional: reset index when closing
                    // setActiveIndex(0);
                }
            },
            {
                threshold: 0.3,
                rootMargin: "-100px 0px" // Add some margin so it doesn't flip at the very edge
            }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            if (containerRef.current) {
                observer.unobserve(containerRef.current);
            }
        };
    }, []);

    const folderStyle = {
        '--folder-color': color,
        '--folder-color-dark': darkenColor(color, 0.2),
        transform: `scale(${size})`,
    };

    const handleCardClick = (e, displayIndex) => {
        e.stopPropagation();
        if (displayIndex < 0) {
            setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
        } else if (displayIndex > 0) {
            setActiveIndex((prev) => (prev + 1) % items.length);
        }
    };

    return (
        <div
            ref={containerRef}
            className={`${styles.folderContainer} ${className}`}
            style={folderStyle}
        >
            <div className={`${styles.folder} ${isOpen ? styles.open : ''}`}>
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
        </div>
    );
};

export default Folder;
