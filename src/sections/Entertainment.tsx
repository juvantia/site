import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { theme } from '../styles/theme';

// ─── Scanner corners (identical to Domus, Economics & RnD) ───────────────────
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
                ...(pos === 'topLeft' && { top: 12, left: 12, borderTopWidth: 2, borderLeftWidth: 2 }),
                ...(pos === 'topRight' && { top: 12, right: 12, borderTopWidth: 2, borderRightWidth: 2 }),
                ...(pos === 'bottomLeft' && { bottom: 12, left: 12, borderBottomWidth: 2, borderLeftWidth: 2 }),
                ...(pos === 'bottomRight' && { bottom: 12, right: 12, borderBottomWidth: 2, borderRightWidth: 2 }),
            }} />
        ))}
    </>
);

// ─── Thin neon divider ───────────────────────────────────────────────────────
const NeonDivider: React.FC<{ color?: string }> = ({ color = 'rgba(0, 255, 136, 0.25)' }) => (
    <div style={{
        width: '100%', height: '1px',
        background: `linear-gradient(90deg, transparent 0%, ${color} 50%, transparent 100%)`,
        margin: '0'
    }} />
);

// ─── Animated Section Wrapper ───────────────────────────────────────────────
const FadeIn: React.FC<{ children: React.ReactNode; delay?: number; style?: React.CSSProperties }> = ({
    children, delay = 0, style
}) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-60px' });
    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay, ease: [0.4, 0, 0.2, 1] }}
            style={style}
        >
            {children}
        </motion.div>
    );
};

const Entertainment: React.FC = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth <= 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    return (
        <div style={theme.layout.rootContainer}>

            {/* ── Ambient Background Glows ──────────────────────────────────────── */}
            <div style={{
                position: 'absolute', top: '10%', right: '-5%',
                width: '700px', height: '700px',
                background: 'radial-gradient(circle, rgba(255, 71, 87, 0.04) 0%, transparent 65%)',
                filter: 'blur(100px)', pointerEvents: 'none'
            }} />
            <div style={{
                position: 'absolute', top: '55%', left: '-5%',
                width: '650px', height: '650px',
                background: 'radial-gradient(circle, rgba(0, 212, 255, 0.03) 0%, transparent 65%)',
                filter: 'blur(100px)', pointerEvents: 'none'
            }} />

            {/* ══════════════════ HERO HEADER ══════════════════ */}
            <section style={{
                padding: isMobile ? '5.5rem 1.25rem 3rem' : '8rem 2rem 5rem',
                maxWidth: '1280px', margin: '0 auto', textAlign: 'center',
                position: 'relative', zIndex: 1
            }}>
                <FadeIn>
                    <h1 style={{
                        ...theme.typography.h1(isMobile),
                        margin: '0 auto 1.5rem',
                        maxWidth: '960px',
                        textAlign: 'center'
                    }}>
                        COMPETITIVE ENTERTAINMENT
                    </h1>

                    <div style={{
                        ...theme.layout.heroUnderline(isMobile),
                        margin: '0 auto 1.75rem'
                    }} />

                    <p style={{
                        ...theme.typography.heroDesc(isMobile),
                        maxWidth: '780px',
                        margin: '0 auto',
                        textAlign: 'center'
                    }}>
                        Entertainment in Juvantia is physically consequential. Out here, there are no virtual simulations or algorithmic shortcuts.
                    </p>
                </FadeIn>
            </section>

            <NeonDivider color="rgba(255, 71, 87, 0.25)" />

            {/* ══════════════════ MODULE 1: THE COLOSSEUM ══════════════════ */}
            <section id="colosseum" style={{
                padding: isMobile ? '3.5rem 1.25rem 4rem' : '6rem 2rem 7rem',
                maxWidth: '1280px', margin: '0 auto',
                position: 'relative', zIndex: 1
            }}>
                <FadeIn>
                    <div style={{ textAlign: 'center', marginBottom: isMobile ? '2rem' : '3.5rem' }}>
                        <h2 style={{
                            ...theme.typography.h2(isMobile),
                            background: 'linear-gradient(135deg, #FF4757 0%, #FFA502 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            filter: 'drop-shadow(0 0 25px rgba(255,71,87,0.3))',
                            margin: 0
                        }}>
                            THE COLOSSEUM
                        </h2>
                    </div>

                    {/* Arena Showcase Grid */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: isMobile ? '1fr' : '1.1fr 0.9fr',
                        gap: isMobile ? '2rem' : '3.5rem',
                        alignItems: 'center'
                    }}>
                        {/* Arena Image Card */}
                        <div style={{
                            ...theme.layout.card('rgba(255, 71, 87, 0.25)'),
                            padding: '12px',
                            boxShadow: '0 25px 50px rgba(0,0,0,0.6)'
                        }}>
                            <ScannerCorners color="#FF4757" size={20} />
                            <div style={{ position: 'relative', overflow: 'hidden' }}>
                                <img
                                    src="/images/colosseum_arena.jpg"
                                    alt="Juvantia Colosseum Arena"
                                    style={{ width: '100%', height: 'auto', display: 'block', filter: 'brightness(0.92) contrast(1.05)' }}
                                />
                            </div>
                        </div>

                        {/* Colosseum Single Objective Card */}
                        <div style={{
                            ...theme.layout.card('rgba(255, 71, 87, 0.25)'),
                            padding: isMobile ? '1.75rem' : '2.5rem',
                            boxShadow: '0 20px 45px rgba(0,0,0,0.5)'
                        }}>
                            <ScannerCorners color="#FF4757" size={20} />
                            <h3 style={{
                                ...theme.typography.h3,
                                color: '#E6F0EB',
                                marginBottom: '1.25rem'
                            }}>
                                COMMUNITY OCCUPATION & SIEGE
                            </h3>
                            <p style={{
                                ...theme.typography.body,
                                fontSize: isMobile ? '0.95rem' : '1.05rem',
                                lineHeight: 1.85,
                                marginBottom: '1.25rem'
                            }}>
                                The objective is for your community to seize control of the Colosseum to broadcast on and operate its massive screen, monetize commercial screen time, and receive free electrical power at arena charging stations.
                            </p>
                            <p style={{
                                ...theme.typography.body,
                                fontSize: isMobile ? '0.95rem' : '1.05rem',
                                lineHeight: 1.85,
                                marginBottom: '1.25rem'
                            }}>
                                The citadel gates unlock once every two weeks for new challenger syndicates attempting to conquer the building. To retain command and continuous revenues, your community must hold its ground and survive the siege.
                            </p>
                            <p style={{
                                ...theme.typography.body,
                                fontSize: isMobile ? '0.95rem' : '1.05rem',
                                lineHeight: 1.85,
                                color: 'rgba(255, 71, 87, 0.9)',
                                margin: 0
                            }}>
                                The Colosseum perimeter is designated as <strong>Terra Nullius</strong>, operating strictly outside the protection and jurisdiction of Custodia.
                            </p>
                        </div>
                    </div>
                </FadeIn>
            </section>

            <NeonDivider color="rgba(0, 212, 255, 0.25)" />

            {/* ══════════════════ MODULE 2: STONECRACY ══════════════════ */}
            <section id="stonecracy" style={{
                padding: isMobile ? '3.5rem 1.25rem 5rem' : '6rem 2rem 8rem',
                maxWidth: '1280px', margin: '0 auto',
                position: 'relative', zIndex: 1
            }}>
                <FadeIn>
                    <div style={{ textAlign: 'center', marginBottom: isMobile ? '2rem' : '3.5rem' }}>
                        <h2 style={{
                            ...theme.typography.h2(isMobile),
                            background: 'linear-gradient(135deg, #00D4FF 0%, #00FF88 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            filter: 'drop-shadow(0 0 25px rgba(0,212,255,0.3))',
                            margin: 0
                        }}>
                            STONECRACY
                        </h2>
                    </div>

                    {/* Stonecracy Showcase Grid: Text on Left, Image on Right */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: isMobile ? '1fr' : '1fr 1.1fr',
                        gap: isMobile ? '2rem' : '3.5rem',
                        alignItems: 'center'
                    }}>
                        {/* Concept Copy Card */}
                        <div style={{
                            ...theme.layout.card('rgba(0, 212, 255, 0.25)'),
                            padding: isMobile ? '1.75rem' : '2.5rem',
                            boxShadow: '0 20px 45px rgba(0,0,0,0.5)'
                        }}>
                            <ScannerCorners color="#00D4FF" size={20} />
                            <h3 style={{
                                ...theme.typography.h3,
                                fontSize: isMobile ? '1.25rem' : '1.5rem',
                                color: '#E6F0EB',
                                marginBottom: '1rem'
                            }}>
                                PHYSICAL LABOR OVER ARTIFICIAL INFLATION
                            </h3>
                            <p style={{
                                ...theme.typography.body,
                                fontSize: isMobile ? '0.95rem' : '1.05rem',
                                lineHeight: 1.85,
                                margin: 0
                            }}>
                                Juvantia rejects virtual "play-to-earn" schemes that print tokens out of thin air. Instead, our political economy is rooted in physical reality: teams locate custom <strong>photopolymer 3D-printed crystal artifacts</strong> seeded across the wild outdoor sectors. Capturing and delivering these crystals requires precision teleoperated manipulation—and yields genuine <strong>civic governance influence in Civitas</strong>.
                            </p>
                        </div>

                        {/* Stonecracy Image Card */}
                        <div style={{
                            ...theme.layout.card('rgba(0, 212, 255, 0.25)'),
                            padding: '12px',
                            boxShadow: '0 25px 50px rgba(0,0,0,0.6)'
                        }}>
                            <ScannerCorners color="#00D4FF" size={20} />
                            <div style={{ position: 'relative', overflow: 'hidden' }}>
                                <img
                                    src="/images/stonecracy.jpg"
                                    alt="Juvantia Stonecracy Physical Crystal Harvesting"
                                    style={{ width: '100%', height: 'auto', display: 'block', filter: 'brightness(0.92) contrast(1.05)' }}
                                />
                            </div>
                        </div>
                    </div>
                </FadeIn>
            </section>

        </div>
    );
};

export default Entertainment;
