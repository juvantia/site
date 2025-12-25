import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
    children: React.ReactNode;
    style?: React.CSSProperties;
    hoverEffect?: boolean;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, style, hoverEffect = true }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            whileHover={hoverEffect ? { y: -6, scale: 1.01 } : {}}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            style={{
                background: 'linear-gradient(135deg, rgba(25, 40, 38, 0.75) 0%, rgba(18, 32, 30, 0.85) 100%)',
                backdropFilter: 'blur(20px) brightness(1.2) saturate(1.3)',
                border: `1px solid ${isHovered ? 'rgba(0, 212, 255, 0.45)' : 'rgba(0, 212, 255, 0.15)'}`,
                borderRadius: '20px',
                padding: '2rem',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: isHovered
                    ? '0 0 40px rgba(0, 255, 136, 0.12), 0 0 60px rgba(0, 212, 255, 0.1), 0 20px 60px rgba(0, 0, 0, 0.4)'
                    : '0 10px 40px rgba(0, 0, 0, 0.3)',
                transition: 'border-color 0.4s ease, box-shadow 0.4s ease',
                ...style
            }}
        >
            {/* Top highlight line */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: '10%',
                right: '10%',
                height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(0, 255, 136, 0.4), rgba(0, 212, 255, 0.5), transparent)',
                opacity: isHovered ? 1 : 0,
                transition: 'opacity 0.4s ease'
            }} />

            {/* Glass Highlight - Glossy Effect */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '15%',
                background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.06) 0%, transparent 100%)',
                borderRadius: '20px 20px 0 0',
                pointerEvents: 'none',
                zIndex: 0
            }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
                {children}
            </div>
        </motion.div>
    );
};

export default GlassCard;
