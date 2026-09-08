import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

// ─── Scanner corners (Neon Architect style) ─────────────────────────────────────────
const ScannerCorners: React.FC<{ color?: string; size?: number }> = ({
    color = 'rgba(0, 255, 136, 0.7)',
    size = 18
}) => (
    <>
        {(['topLeft', 'topRight', 'bottomLeft', 'bottomRight'] as const).map(pos => (
            <div key={pos} style={{
                position: 'absolute',
                width: size, height: size,
                borderColor: color, borderStyle: 'solid', borderWidth: 0,
                zIndex: 3,
                pointerEvents: 'none',
                ...(pos === 'topLeft'     && { top: 12, left: 12, borderTopWidth: 2, borderLeftWidth: 2 }),
                ...(pos === 'topRight'    && { top: 12, right: 12, borderTopWidth: 2, borderRightWidth: 2 }),
                ...(pos === 'bottomLeft'  && { bottom: 12, left: 12, borderBottomWidth: 2, borderLeftWidth: 2 }),
                ...(pos === 'bottomRight' && { bottom: 12, right: 12, borderBottomWidth: 2, borderRightWidth: 2 }),
            }} />
        ))}
    </>
);

// ─── Thin neon divider ────────────────────────────────────────────────────────
const NeonDivider = () => (
    <div style={{
        width: '100%', height: '1px',
        background: 'linear-gradient(90deg, transparent 0%, rgba(0,255,136,0.25) 50%, transparent 100%)',
    }} />
);

// ─── FadeIn wrapper ───────────────────────────────────────────────────────────
const FadeIn: React.FC<{ children: React.ReactNode; delay?: number; style?: React.CSSProperties }> = ({
    children, delay = 0, style
}) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });
    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay, ease: [0.4, 0, 0.2, 1] }}
            style={style}
        >
            {children}
        </motion.div>
    );
};

// ─── PathCard: glassmorphic option card with hover-lift ───────────────────────
const PathCard: React.FC<{
    accent: string; title: string; delay?: number; children: React.ReactNode;
}> = ({ accent, title, delay = 0, children }) => {
    const [hovered, setHovered] = useState(false);
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                background: hovered
                    ? 'linear-gradient(135deg, rgba(25, 40, 38, 0.7) 0%, rgba(10, 15, 12, 0.85) 100%)'
                    : 'linear-gradient(135deg, rgba(18, 30, 28, 0.5) 0%, rgba(10, 15, 12, 0.7) 100%)',
                border: `1px solid ${hovered ? accent + '40' : accent + '18'}`,
                borderRadius: '2px',
                padding: '1.5rem',
                display: 'flex', flexDirection: 'column', gap: '1rem',
                position: 'relative',
                transition: 'all 0.35s ease',
                boxShadow: hovered
                    ? `0 12px 40px rgba(0,0,0,0.5), 0 0 20px ${accent}08`
                    : '0 4px 20px rgba(0,0,0,0.3)',
                transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
            }}
        >
            {/* Top accent gradient line */}
            <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
                background: `linear-gradient(90deg, transparent, ${accent}50, transparent)`,
                opacity: hovered ? 1 : 0,
                transition: 'opacity 0.35s ease',
            }} />
            <h3 style={{
                fontFamily: "'Cinzel', serif",
                color: accent,
                margin: 0,
                fontSize: '0.9rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                fontWeight: 600,
            }}>
                {title}
            </h3>
            <div style={{ marginTop: 'auto' }}>
                {children}
            </div>
        </motion.div>
    );
};

// ─── ImageThumb: hover-zoom image with neon accent border ─────────────────────
const ImageThumb: React.FC<{
    src: string; alt: string; accent: string; tall?: boolean;
}> = ({ src, alt, accent, tall = false }) => {
    const [hovered, setHovered] = useState(false);
    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                border: `1px solid ${hovered ? accent + '45' : accent + '20'}`,
                borderRadius: '2px',
                overflow: 'hidden',
                position: 'relative',
                transition: 'border-color 0.35s ease, box-shadow 0.35s ease',
                boxShadow: hovered
                    ? `0 10px 35px rgba(0,0,0,0.5), 0 0 15px ${accent}10`
                    : '0 4px 15px rgba(0,0,0,0.3)',
            }}
        >
            <img
                src={src}
                alt={alt}
                style={{
                    width: '100%',
                    height: tall ? '160px' : '110px',
                    objectFit: 'cover',
                    display: 'block',
                    transition: 'transform 0.5s ease, filter 0.5s ease',
                    transform: hovered ? 'scale(1.05)' : 'scale(1)',
                    filter: hovered ? 'brightness(1.1)' : 'brightness(0.95)',
                }}
            />
            {/* Bottom gradient overlay */}
            <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%',
                background: `linear-gradient(to top, rgba(5,10,9,0.5) 0%, transparent 100%)`,
                pointerEvents: 'none',
            }} />
        </div>
    );
};

// ─── Main component ───────────────────────────────────────────────────────────
const RobulusRegister: React.FC = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [activeTab, setActiveTab] = useState<'easy' | 'medium' | 'hard'>('easy');

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth <= 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    const buildPaths = [
        {
            id: 'easy' as const,
            tag: 'EASY PATH',
            title: 'BUY IN PARK',
            accent: '#00FF88', // Green
            shortDesc: 'Buy a ready-made Robulus directly inside the park and instantly access its remote control. You only need to choose:',
            chassis: [
                { src: '/images/shassis1.webp', alt: 'Chassis Option 1' },
                { src: '/images/shassis2.webp', alt: 'Chassis Option 2' }
            ],
            body: { src: '/images/body.jpg', alt: '3D Body Option' },
            hardware: [
                'High-Output Battery Pack',
                'Drive Motors',
                'LED Headlight Modules',
                'HD Camera Module',
                'Telemetry Antenna',
                'Microphone',
                'Audio Speaker'
            ]
        },
        {
            id: 'medium' as const,
            tag: 'MEDIUM PATH',
            title: 'CUSTOM MERCATUS ORDER',
            accent: '#FFB800', // Yellow / Gold
            shortDesc: 'Find a contributor on mercatus.juvantia.org to commission a custom build and delivery of your Robulus. You can also order the 3D body shell from a separate contributor.',
            details: [
                {
                    title: 'COMMISSION ASSEMBLY ON MERCATUS',
                    text: (
                        <>
                            Find a contributor on{' '}
                            <a 
                                href="https://mercatus.juvantia.org" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                style={{ color: '#FFB800', textDecoration: 'underline', fontWeight: 600 }}
                            >
                                mercatus.juvantia.org
                            </a>{' '}
                            and order a custom build and delivery of your Robulus directly to the park.
                        </>
                    )
                },
                {
                    title: 'SEPARATE 3D BODY ORDER',
                    text: 'You can commission the 3D-printed body shell from a different contributor for maximum modularity.'
                }
            ],
            images: []
        },
        {
            id: 'hard' as const,
            tag: 'HARD PATH',
            title: 'FULL CUSTOMIZATION',
            accent: '#FF4757', // Red
            shortDesc: 'Design your custom robot according to official specifications. Ship the required parts by delivery to the park. The park can 3D print the body shell and assemble your Robulus on-site if it matches requirements. Use the official Juvantia Robulus Platform PCB or design your own.',
            details: [
                {
                    title: 'OFFICIAL SPECIFICATION DESIGN',
                    text: 'Design your robot according to official specifications and ship the required hardware components by parcel delivery directly to the park.'
                },
                {
                    title: 'PARK PRINT & ASSEMBLY',
                    text: 'The park can 3D print the body shell and assemble your Robulus on-site if it meets technical compliance standards.'
                },
                {
                    title: 'PCB ARCHITECTURE FREEDOM',
                    text: 'You can utilize the official Juvantia Robulus Platform PCB or engineer your own bespoke printed circuit board.'
                }
            ],
            images: [
                { src: '/images/PCB.jpg', alt: 'Juvantia Robulus PCB' }
            ]
        }
    ];



    const activePathData = buildPaths.find(p => p.id === activeTab)!;

    return (
        <div style={{ background: 'var(--color-bg)', position: 'relative', overflow: 'hidden' }}>

            {/* ── Ambient glows ──────────────────────────────────────────── */}
            <div style={{
                position: 'absolute', top: '5%', right: '-5%',
                width: '600px', height: '600px',
                background: 'radial-gradient(circle, rgba(0,255,136,0.06) 0%, transparent 65%)',
                filter: 'blur(80px)', pointerEvents: 'none'
            }} />
            <div style={{
                position: 'absolute', bottom: '20%', left: '-5%',
                width: '500px', height: '500px',
                background: 'radial-gradient(circle, rgba(0,212,255,0.04) 0%, transparent 65%)',
                filter: 'blur(80px)', pointerEvents: 'none'
            }} />

            {/* ══════════════════ HERO ══════════════════ */}
            <section style={{
                position: 'relative',
                padding: isMobile ? '5.5rem 1.25rem 2rem' : '7rem 2rem 5rem',
                maxWidth: '1280px', margin: '0 auto',
                display: 'flex', flexDirection: isMobile ? 'column' : 'row',
                alignItems: 'center', gap: isMobile ? '1.5rem' : '6rem'
            }}>
                {/* Left: Text */}
                <div style={{ flex: isMobile ? '0 0 auto' : '0 1 520px', width: isMobile ? '100%' : 'auto' }}>
                    <motion.h1
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
                        style={{
                            fontFamily: "'Cinzel', serif",
                            fontSize: isMobile ? 'clamp(2rem, 9vw, 3rem)' : 'clamp(2.8rem, 5.5vw, 4rem)',
                            fontWeight: 400, letterSpacing: '0.12em',
                            textTransform: 'uppercase', lineHeight: 1.05,
                            background: 'linear-gradient(135deg, #00FF88 0%, #dfe4e1 45%, #00D4FF 100%)',
                            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                            margin: isMobile ? '0 0 0.75rem' : '0 0 1.5rem',
                            filter: 'drop-shadow(0 0 20px rgba(0,212,255,0.3))'
                        }}
                    >
                        ROBULUS
                    </motion.h1>

                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 0.6, duration: 0.8, ease: 'easeOut' }}
                        style={{
                            height: '1px', width: '220px',
                            background: 'linear-gradient(to right, rgba(0,255,136,0.7), rgba(0,212,255,0.3), transparent)',
                            transformOrigin: 'left', marginBottom: isMobile ? '1rem' : '1.75rem'
                        }}
                    />

                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        style={{
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontSize: isMobile ? '1rem' : '1.15rem',
                            color: 'rgba(223,228,225,0.72)', lineHeight: 1.85,
                            fontWeight: 300, margin: '0 0 2rem'
                        }}
                    >
                        Deploy, order, or engineer your teleoperated rover
                    </motion.p>
                </div>

                {/* Right: Hero image */}
                <motion.div
                    initial={{ opacity: 0, x: 32, y: 16 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
                    style={{ flex: '0 0 auto', width: isMobile ? '180px' : '420px', position: 'relative' }}
                >
                    <div style={{
                        position: 'relative', overflow: 'hidden',
                        border: '1px solid rgba(0,255,136,0.15)',
                        boxShadow: '0 30px 70px rgba(0,0,0,0.6), 0 0 60px rgba(0,255,136,0.06)'
                    }}>
                        <img
                            src="/images/ROBULUS.png"
                            alt="Robulus"
                            style={{
                                width: '100%', height: 'auto', display: 'block',
                                filter: 'brightness(0.95) saturate(1.1)'
                            }}
                        />
                        <div style={{
                            position: 'absolute', inset: 0,
                            background: 'linear-gradient(to top, rgba(5,10,9,0.4) 0%, transparent 50%)'
                        }} />
                        <ScannerCorners />
                    </div>
                </motion.div>
            </section>

            <NeonDivider />

            {/* ══════════════════ BUILD YOUR OWN ROBULUS (PREMIUM TABBED SYSTEM) ══════════════════ */}
            <section style={{ padding: isMobile ? '4rem 1.25rem 5rem' : '7rem 2rem 9rem', maxWidth: '1280px', margin: '0 auto', position: 'relative' }}>

                {/* Section ambient glow keyed to active tab */}
                <div style={{
                    position: 'absolute',
                    top: '10%', left: '50%', transform: 'translateX(-50%)',
                    width: '800px', height: '500px',
                    background: `radial-gradient(ellipse, ${activePathData.accent}08 0%, transparent 70%)`,
                    filter: 'blur(100px)', pointerEvents: 'none',
                    transition: 'background 0.6s ease',
                }} />

                <FadeIn>
                    <div style={{ textAlign: 'center', marginBottom: isMobile ? '0.75rem' : '1rem' }}>
                        <span style={{
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontSize: '0.65rem', fontWeight: 700,
                            letterSpacing: '0.3em', textTransform: 'uppercase',
                            color: '#00FF88', opacity: 0.7,
                        }}>
                            THREE PATHS — ONE DESTINATION
                        </span>
                    </div>
                    <div style={{ textAlign: 'center', marginBottom: isMobile ? '2.5rem' : '3.5rem' }}>
                        <h2 style={{
                            fontFamily: "'Cinzel', serif",
                            fontSize: isMobile ? '1.6rem' : 'clamp(2rem, 4.5vw, 3.2rem)',
                            fontWeight: 400, textTransform: 'uppercase', letterSpacing: '0.12em',
                            color: '#E6F0EB', margin: 0, lineHeight: 1.15,
                        }}>
                            OWN YOUR{' '}
                            <span style={{
                                background: 'linear-gradient(135deg, #00FF88, #00D4FF)',
                                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                                filter: 'drop-shadow(0 0 12px rgba(0,255,136,0.3))',
                            }}>ROBULUS</span>
                        </h2>
                    </div>
                </FadeIn>

                {/* ── Glassmorphic Tab Bar ── */}
                <FadeIn delay={0.1}>
                    <div
                        role="tablist"
                        aria-label="Robulus Build Paths"
                        style={{
                            display: 'flex',
                            position: 'relative',
                            background: 'linear-gradient(135deg, rgba(25, 40, 38, 0.6) 0%, rgba(18, 32, 30, 0.7) 100%)',
                            backdropFilter: 'blur(20px) saturate(1.4)',
                            border: '1px solid rgba(59, 75, 61, 0.3)',
                            borderRadius: '2px',
                            marginBottom: isMobile ? '2rem' : '2.5rem',
                            overflow: 'hidden',
                        }}
                    >
                        {buildPaths.map((path, idx) => {
                            const isActive = activeTab === path.id;
                            return (
                                <button
                                    key={path.id}
                                    role="tab"
                                    aria-selected={isActive}
                                    onClick={() => setActiveTab(path.id)}
                                    style={{
                                        flex: 1,
                                        padding: isMobile ? '1rem 0.75rem' : '1.4rem 1.5rem',
                                        background: 'transparent',
                                        border: 'none',
                                        borderRight: idx < buildPaths.length - 1 ? '1px solid rgba(59, 75, 61, 0.2)' : 'none',
                                        color: isActive ? '#E6F0EB' : 'rgba(185,203,185,0.45)',
                                        cursor: 'pointer',
                                        transition: 'color 0.35s ease',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '0.4rem',
                                        position: 'relative',
                                        zIndex: 2,
                                    }}
                                >
                                    <span style={{
                                        fontFamily: "'Space Grotesk', sans-serif",
                                        fontSize: isMobile ? '0.55rem' : '0.62rem',
                                        fontWeight: 600,
                                        letterSpacing: '0.18em',
                                        textTransform: 'uppercase',
                                        color: isActive ? path.accent : 'rgba(185,203,185,0.35)',
                                        transition: 'color 0.35s ease',
                                    }}>
                                        {path.tag}
                                    </span>
                                    <span style={{
                                        fontFamily: "'Cinzel', serif",
                                        fontSize: isMobile ? '0.72rem' : '0.92rem',
                                        fontWeight: 600,
                                        letterSpacing: '0.08em',
                                        textTransform: 'uppercase',
                                        transition: 'color 0.35s ease',
                                    }}>
                                        {path.title}
                                    </span>

                                    {/* Active indicator bar (bottom) */}
                                    <motion.div
                                        animate={{
                                            scaleX: isActive ? 1 : 0,
                                            opacity: isActive ? 1 : 0,
                                        }}
                                        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                                        style={{
                                            position: 'absolute', bottom: 0, left: '15%', right: '15%', height: '2px',
                                            background: `linear-gradient(90deg, transparent, ${path.accent}, transparent)`,
                                            transformOrigin: 'center',
                                        }}
                                    />
                                </button>
                            );
                        })}

                        {/* Glass highlight top edge */}
                        <div style={{
                            position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
                            background: 'linear-gradient(90deg, transparent 10%, rgba(255,255,255,0.06) 50%, transparent 90%)',
                            pointerEvents: 'none',
                        }} />
                    </div>
                </FadeIn>

                {/* ── Tab Content Panel ── */}
                <div style={{ position: 'relative', minHeight: isMobile ? '500px' : '420px' }}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            role="tabpanel"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2, ease: 'easeInOut' }}
                            style={{
                                background: 'linear-gradient(135deg, rgba(25, 40, 38, 0.55) 0%, rgba(10, 15, 12, 0.9) 100%)',
                                backdropFilter: 'blur(24px) saturate(1.3)',
                                border: `1px solid ${activePathData.accent}30`,
                                borderRadius: '2px',
                                position: 'relative',
                                overflow: 'hidden',
                                boxShadow: `0 30px 80px rgba(0,0,0,0.7), 0 0 40px ${activePathData.accent}08`,
                            }}
                        >
                            {/* Top gradient accent line */}
                            <div style={{
                                position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                                background: `linear-gradient(90deg, transparent, ${activePathData.accent}, ${activePathData.accent}60, transparent)`,
                            }} />

                            {/* Glass reflection */}
                            <div style={{
                                position: 'absolute', top: 0, left: 0, right: 0, height: '40%',
                                background: 'linear-gradient(180deg, rgba(255,255,255,0.025) 0%, transparent 100%)',
                                pointerEvents: 'none',
                            }} />

                            {/* Description header area */}
                            <div style={{
                                padding: isMobile ? '1.75rem 1.5rem' : '2.25rem 3rem',
                                borderBottom: `1px solid ${activePathData.accent}15`,
                                position: 'relative',
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                                    <div style={{
                                        width: '32px', height: '2px',
                                        background: `linear-gradient(90deg, ${activePathData.accent}, transparent)`,
                                    }} />
                                    <span style={{
                                        fontFamily: "'Space Grotesk', sans-serif",
                                        fontSize: '0.6rem', fontWeight: 700,
                                        letterSpacing: '0.25em', textTransform: 'uppercase',
                                        color: activePathData.accent, opacity: 0.8,
                                    }}>
                                        {activePathData.tag}
                                    </span>
                                </div>
                                <p style={{
                                    fontFamily: "'Space Grotesk', sans-serif",
                                    fontSize: isMobile ? '0.92rem' : '1.02rem',
                                    color: 'rgba(223,228,225,0.8)',
                                    margin: 0,
                                    fontWeight: 300,
                                    lineHeight: 1.8,
                                    maxWidth: '720px',
                                }}>
                                    {activePathData.shortDesc}
                                </p>
                            </div>

                            {/* Main Body Content */}
                            <div style={{ padding: isMobile ? '1.75rem 1.5rem' : '2.5rem 3rem' }}>
                                {/* ── EASY PATH (GREEN) ── */}
                                {activeTab === 'easy' && (
                                    <div style={{
                                        display: 'grid',
                                        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr 1.3fr',
                                        gap: isMobile ? '1.5rem' : '1.75rem',
                                    }}>
                                        {/* Chassis Options Card */}
                                        <PathCard accent="#00FF88" title="CHASSIS OPTIONS" delay={0}>
                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }}>
                                                {activePathData.chassis?.map((img, i) => (
                                                    <ImageThumb key={i} src={img.src} alt={img.alt} accent="#00FF88" />
                                                ))}
                                            </div>
                                        </PathCard>

                                        {/* Body Shell Card */}
                                        <PathCard accent="#00FF88" title="BODY SHELL OPTIONS" delay={0.08}>
                                            {activePathData.body && (
                                                <ImageThumb src={activePathData.body.src} alt={activePathData.body.alt} accent="#00FF88" tall />
                                            )}
                                        </PathCard>

                                        {/* Hardware Suite Card */}
                                        <PathCard accent="#00FF88" title="HARDWARE SUITE" delay={0.16}>
                                            <ul style={{
                                                listStyle: 'none', padding: 0, margin: 0,
                                                display: 'flex', flexDirection: 'column', gap: '0.65rem',
                                            }}>
                                                {activePathData.hardware?.map((item, i) => (
                                                    <li key={i} style={{
                                                        fontFamily: "'Space Grotesk', sans-serif",
                                                        fontSize: '0.82rem',
                                                        fontWeight: 400,
                                                        color: 'rgba(223,228,225,0.85)',
                                                        display: 'flex', alignItems: 'center', gap: '0.75rem',
                                                        paddingLeft: '0.25rem',
                                                    }}>
                                                        <div style={{
                                                            width: '5px', height: '5px', borderRadius: '50%',
                                                            background: '#00FF88',
                                                            boxShadow: '0 0 6px rgba(0,255,136,0.4)',
                                                            flexShrink: 0,
                                                        }} />
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </PathCard>
                                    </div>
                                )}

                                {/* ── MEDIUM PATH (YELLOW) ── */}
                                {activeTab === 'medium' && (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                        {activePathData.details?.map((item, idx) => (
                                            <motion.div
                                                key={idx}
                                                initial={{ opacity: 0, x: -16 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: idx * 0.1, duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
                                                style={{
                                                    background: 'linear-gradient(135deg, rgba(25, 40, 38, 0.5) 0%, rgba(10, 15, 12, 0.7) 100%)',
                                                    border: '1px solid rgba(255, 184, 0, 0.18)',
                                                    padding: '1.5rem 1.75rem',
                                                    position: 'relative',
                                                    borderRadius: '2px',
                                                    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                                                }}
                                                onMouseEnter={(e) => {
                                                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,184,0,0.35)';
                                                    (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 30px rgba(0,0,0,0.4), 0 0 20px rgba(255,184,0,0.06)';
                                                }}
                                                onMouseLeave={(e) => {
                                                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,184,0,0.18)';
                                                    (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                                                }}
                                            >
                                                {/* Left accent bar */}
                                                <div style={{
                                                    position: 'absolute', top: '12px', left: 0, bottom: '12px', width: '2px',
                                                    background: 'linear-gradient(180deg, #FFB800, rgba(255,184,0,0.2))',
                                                    borderRadius: '1px',
                                                }} />
                                                <h3 style={{
                                                    fontFamily: "'Cinzel', serif",
                                                    fontSize: '0.95rem',
                                                    color: '#FFB800',
                                                    margin: '0 0 0.6rem',
                                                    textTransform: 'uppercase',
                                                    letterSpacing: '0.08em',
                                                    fontWeight: 600,
                                                }}>
                                                    {item.title}
                                                </h3>
                                                <p style={{
                                                    fontFamily: "'Space Grotesk', sans-serif",
                                                    fontSize: '0.88rem',
                                                    color: 'rgba(223,228,225,0.78)',
                                                    lineHeight: 1.75,
                                                    margin: 0,
                                                    fontWeight: 300,
                                                }}>
                                                    {item.text}
                                                </p>
                                            </motion.div>
                                        ))}
                                    </div>
                                )}

                                {/* ── HARD PATH (RED) ── */}
                                {activeTab === 'hard' && (
                                    <div style={{
                                        display: 'grid',
                                        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                                        gap: isMobile ? '2rem' : '2.5rem',
                                        alignItems: 'start',
                                    }}>
                                        {/* Lightweight detail list */}
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                            {activePathData.details?.map((item, idx) => (
                                                <motion.div
                                                    key={idx}
                                                    initial={{ opacity: 0, y: 12 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: idx * 0.08, duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                                                    style={{
                                                        paddingLeft: '1.25rem',
                                                        borderLeft: '2px solid rgba(255,71,87,0.25)',
                                                    }}
                                                >
                                                    <h3 style={{
                                                        fontFamily: "'Cinzel', serif",
                                                        fontSize: '0.88rem',
                                                        color: '#FF4757',
                                                        margin: '0 0 0.4rem',
                                                        textTransform: 'uppercase',
                                                        letterSpacing: '0.08em',
                                                        fontWeight: 600,
                                                    }}>
                                                        {item.title}
                                                    </h3>
                                                    <p style={{
                                                        fontFamily: "'Space Grotesk', sans-serif",
                                                        fontSize: '0.88rem',
                                                        color: 'rgba(223,228,225,0.72)',
                                                        lineHeight: 1.7,
                                                        margin: 0,
                                                        fontWeight: 300,
                                                    }}>
                                                        {item.text}
                                                    </p>
                                                </motion.div>
                                            ))}
                                        </div>

                                        {/* PCB image — full height */}
                                        <motion.div
                                            initial={{ opacity: 0, y: 16 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.15, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                                        >
                                            <div
                                                style={{
                                                    border: '1px solid rgba(255,71,87,0.2)',
                                                    borderRadius: '2px',
                                                    overflow: 'hidden',
                                                    boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
                                                }}
                                            >
                                                <img src="/images/PCB.jpg" alt="Juvantia Robulus PCB" style={{
                                                    width: '100%',
                                                    height: 'auto',
                                                    display: 'block',
                                                    filter: 'brightness(0.95)',
                                                }} />
                                            </div>
                                        </motion.div>
                                    </div>
                                )}
                            </div>

                            <ScannerCorners color={activePathData.accent} size={16} />
                        </motion.div>
                    </AnimatePresence>
                </div>
            </section>


        </div>
    );
};

export default RobulusRegister;


