import React, { useEffect, useRef, useState } from 'react';

interface CursorGlowProps {
    size?: number;
    color?: string;
    opacity?: number;
}

const CursorGlow: React.FC<CursorGlowProps> = ({
    size = 300,
    color = '0, 255, 136',
    opacity = 0.15
}) => {
    const glowRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const rafRef = useRef<number | null>(null);
    const targetRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            targetRef.current = { x: e.clientX, y: e.clientY };
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseLeave = () => {
            setIsVisible(false);
        };

        // Smooth animation loop
        const animate = () => {
            setPosition(prev => ({
                x: prev.x + (targetRef.current.x - prev.x) * 0.15,
                y: prev.y + (targetRef.current.y - prev.y) * 0.15
            }));
            rafRef.current = requestAnimationFrame(animate);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseleave', handleMouseLeave);
        rafRef.current = requestAnimationFrame(animate);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseleave', handleMouseLeave);
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }
        };
    }, [isVisible]);

    return (
        <div
            ref={glowRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: `${size}px`,
                height: `${size}px`,
                borderRadius: '50%',
                background: `radial-gradient(circle, rgba(${color}, ${opacity}) 0%, rgba(${color}, ${opacity * 0.5}) 30%, transparent 70%)`,
                pointerEvents: 'none',
                zIndex: 9999,
                transform: `translate(${position.x - size / 2}px, ${position.y - size / 2}px)`,
                opacity: isVisible ? 1 : 0,
                transition: 'opacity 0.3s ease',
                mixBlendMode: 'screen',
                filter: 'blur(2px)'
            }}
        />
    );
};

export default CursorGlow;

