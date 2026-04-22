import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

// ─── Reusable scanner corners ───────────────────────────────────────────────
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
                ...(pos === 'topLeft' && { top: 14, left: 14, borderTopWidth: 2, borderLeftWidth: 2 }),
                ...(pos === 'topRight' && { top: 14, right: 14, borderTopWidth: 2, borderRightWidth: 2 }),
                ...(pos === 'bottomLeft' && { bottom: 14, left: 14, borderBottomWidth: 2, borderLeftWidth: 2 }),
                ...(pos === 'bottomRight' && { bottom: 14, right: 14, borderBottomWidth: 2, borderRightWidth: 2 }),
            }} />
        ))}
    </>
);



// ─── Thin neon divider ────────────────────────────────────────────────────────
const NeonDivider = () => (
    <div style={{
        width: '100%', height: '1px',
        background: 'linear-gradient(90deg, transparent 0%, rgba(0,255,136,0.25) 50%, transparent 100%)',
        margin: '0'
    }} />
);

// ─── Animated section wrapper ─────────────────────────────────────────────────
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

// ─── Feature card ─────────────────────────────────────────────────────────────
const FeatureCard: React.FC<{
    icon: string; title: string; text: string; accent?: string; delay?: number;
}> = ({ icon, title, text, accent = '#00FF88', delay = 0 }) => {
    const [hovered, setHovered] = useState(false);
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-60px' });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay, ease: [0.4, 0, 0.2, 1] }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                padding: '2rem 1.75rem',
                background: hovered ? 'rgba(0,255,136,0.05)' : 'rgba(18, 29, 27, 0.9)',
                border: `1px solid ${hovered ? 'rgba(0,255,136,0.3)' : 'rgba(0,255,136,0.1)'}`,
                borderRadius: '2px',
                position: 'relative',
                transition: 'all 0.4s ease',
                boxShadow: hovered ? '0 0 30px rgba(0,255,136,0.08)' : 'none',
                cursor: 'default'
            }}
        >
            {/* Top accent line */}
            <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
                opacity: hovered ? 1 : 0, transition: 'opacity 0.4s ease'
            }} />
            <div style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '0.65rem', letterSpacing: '0.4em', textTransform: 'uppercase',
                color: accent, marginBottom: '1.25rem'
            }}>
                <span style={{ opacity: 0.9 }}>{title}</span>
            </div>
            <p style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '0.95rem', color: 'rgba(185,203,185,0.75)',
                lineHeight: 1.8, fontWeight: 300, margin: 0
            }}>{text}</p>
        </motion.div>
    );
};

// ─── Main component ───────────────────────────────────────────────────────────
const Domus: React.FC = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth <= 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    const timelineSteps = [
        {
            title: 'Technopark Infrastructure Installation',
            description: 'Build and install your Domus yourself in the park before the official launch.',
            duration: '3–6 months',
            phase: 'active' as const,
        },
        {
            title: '24/7 Park Operations',
            description: 'Park is fully operational. Human access restricted.',
            duration: '1–2 months',
            phase: 'future' as const,
        },
        {
            title: 'Technopark Maintenance',
            description: 'Scheduled time for installation and maintenance of your Domuses.',
            duration: '1–2 days',
            phase: 'maintenance' as const,
        },
        {
            title: '24/7 Park Operations',
            description: 'Park is fully operational. Human access restricted.',
            duration: '1–2 months',
            phase: 'future' as const,
        },
        {
            title: 'Technopark Maintenance',
            description: 'Scheduled time for installation and maintenance of your Domuses.',
            duration: '1–2 days',
            phase: 'maintenance' as const,
        },
    ];

    const phaseConfig = {
        active: { color: '#00FF88', label: 'INSTALLATION WINDOW' },
        future: { color: '#FF4757', label: 'OPERATIONS LIVE' },
        maintenance: { color: '#00FF88', label: 'SERVICE WINDOW' },
    };

    return (
        <div style={{ background: 'var(--color-bg)', position: 'relative', overflow: 'hidden' }}>

            {/* ── Ambient glows ─────────────────────────────────────────── */}
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
                            fontSize: isMobile ? 'clamp(2.4rem, 10vw, 3.5rem)' : 'clamp(3rem, 6vw, 4.5rem)',
                            fontWeight: 400, letterSpacing: '0.12em',
                            textTransform: 'uppercase', lineHeight: 1.05,
                            background: 'linear-gradient(135deg, #00FF88 0%, #dfe4e1 45%, #00D4FF 100%)',
                            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                            margin: isMobile ? '0 0 0.75rem' : '0 0 1.5rem',
                            filter: 'drop-shadow(0 0 20px rgba(0,212,255,0.3))'
                        }}
                    >
                        Domus
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
                        Your permanent base inside JUVANTIA. Build a structure on a licensed plot — charge your Robulus, run a business, shape the park's cityscape.
                    </motion.p>


                </div>

                {/* Right: Hero image */}
                <motion.div
                    initial={{ opacity: 0, x: 32, y: 16 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
                    style={{ flex: '0 0 auto', width: isMobile ? '220px' : '520px', position: 'relative' }}
                >
                    <div style={{
                        position: 'relative', overflow: 'hidden',
                        border: '1px solid rgba(0,255,136,0.15)',
                        boxShadow: '0 30px 70px rgba(0,0,0,0.6), 0 0 60px rgba(0,255,136,0.06)'
                    }}>
                        <img
                            src="/images/DOMUS1.png"
                            alt="Domus Structure"
                            style={{ width: '100%', height: 'auto', display: 'block', filter: 'brightness(0.92) saturate(1.1)' }}
                        />
                        <div style={{
                            position: 'absolute', inset: 0,
                            background: 'linear-gradient(to top, rgba(5,10,9,0.5) 0%, transparent 50%)'
                        }} />
                        <ScannerCorners />

                        {/* Bottom label */}
                        <div style={{
                            position: 'absolute', bottom: 14, left: 14,
                            fontFamily: "'Space Grotesk'", fontSize: '0.55rem',
                            letterSpacing: '0.25em', textTransform: 'uppercase',
                            color: 'rgba(0,255,136,0.5)'
                        }}>DOMUS · JUVANTIA PARK</div>
                    </div>
                </motion.div>
            </section>

            <NeonDivider />

            {/* ══════════════════ WHAT IS A DOMUS ══════════════════ */}
            <section style={{ padding: isMobile ? '1.5rem 1.25rem 4rem' : '8rem 2rem', maxWidth: '1280px', margin: '0 auto' }}>
                <FadeIn>

                    <h2 style={{
                        fontFamily: "'Cinzel', serif",
                        fontSize: isMobile ? '1.6rem' : 'clamp(1.8rem, 4vw, 2.8rem)',
                        fontWeight: 400, textTransform: 'uppercase', letterSpacing: '0.12em',
                        textAlign: 'center', color: '#E6F0EB', marginBottom: isMobile ? '3rem' : '5rem'
                    }}>
                        What is a <span style={{
                            background: 'linear-gradient(135deg, #00FF88, #00D4FF)',
                            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
                        }}>Domus</span>?
                    </h2>
                </FadeIn>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
                    gap: isMobile ? '1rem' : '1.5rem'
                }}>
                    <FeatureCard
                        icon="◈"
                        title="Personal or Commercial"
                        text="Build a Domus for your Robulus or create a commercial space — workshop, shop, or club. Your structure, your rules, enforced by smart contracts."
                        accent="#00FF88"
                        delay={0}
                    />
                    <FeatureCard
                        icon="◈"
                        title="Any Materials"
                        text="Most Domus structures are built from MDF with waterproofing, but you're free to use any materials you choose — wood, metal, composite panels."
                        accent="#00D4FF"
                        delay={0.1}
                    />
                    <FeatureCard
                        icon="◈"
                        title="Connected to the City Grid"
                        text="Receive 12V from the city grid and get billed for every watt consumed. Full metering, transparent settlement."
                        accent="#00FF88"
                        delay={0.2}
                    />
                </div>
            </section>

            <NeonDivider />

            {/* ══════════════════ PLOT REQUIREMENTS ══════════════════ */}
            <section style={{ padding: isMobile ? '1.5rem 1.25rem 4rem' : '8rem 2rem', maxWidth: '1280px', margin: '0 auto' }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                    gap: isMobile ? '3rem' : '6rem',
                    alignItems: 'center'
                }}>
                    {/* Image */}
                    <FadeIn delay={0.1}>
                        <div style={{
                            position: 'relative', overflow: 'hidden',
                            border: '1px solid rgba(0,255,136,0.12)',
                            boxShadow: '0 24px 60px rgba(0,0,0,0.5)'
                        }}>
                            <img
                                src="/images/DOMUS2.png"
                                alt="Plot Requirements"
                                style={{ width: '100%', height: 'auto', display: 'block', filter: 'brightness(0.88) saturate(1.1)' }}
                            />
                            <div style={{
                                position: 'absolute', inset: 0,
                                background: 'linear-gradient(to right, rgba(5,10,9,0.3) 0%, transparent 50%)'
                            }} />
                            <ScannerCorners color="rgba(0,212,255,0.5)" size={16} />
                            <div style={{
                                position: 'absolute', bottom: 14, left: 14,
                                fontFamily: "'Space Grotesk'", fontSize: '0.55rem',
                                letterSpacing: '0.25em', textTransform: 'uppercase',
                                color: 'rgba(0,212,255,0.55)'
                            }}>PLOT · LICENSED TERRITORY</div>
                        </div>
                    </FadeIn>

                    {/* Text */}
                    <FadeIn delay={0.2}>

                        <h2 style={{
                            fontFamily: "'Cinzel', serif",
                            fontSize: isMobile ? '1.6rem' : 'clamp(1.8rem, 3.5vw, 2.6rem)',
                            fontWeight: 400, textTransform: 'uppercase', letterSpacing: '0.1em',
                            color: '#E6F0EB', marginBottom: '1.25rem', lineHeight: 1.2
                        }}>
                            Plot Requirements
                        </h2>
                        <p style={{
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontSize: isMobile ? '1rem' : '1.05rem',
                            color: 'rgba(185,203,185,0.75)', lineHeight: 1.85,
                            fontWeight: 300, marginBottom: '2rem'
                        }}>
                            To install a Domus, you must hold a licensed plot in JUVANTIA or have a valid lease agreement.
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {[
                                { label: 'Perpetual Plot License', desc: 'Acquire a non-expiring plot license. Full ownership, on-chain title.' },
                                { label: 'Term Plot License', desc: 'Rent or lease a plot under a time-limited license with renewal options.' }
                            ].map((opt, i) => (
                                <div key={i} style={{
                                    display: 'flex', gap: '1.25rem', alignItems: 'flex-start',
                                    padding: '1.25rem 1.5rem',
                                    background: 'rgba(0,255,136,0.03)',
                                    border: '1px solid rgba(0,255,136,0.1)',
                                    position: 'relative',
                                    transition: 'all 0.3s ease'
                                }}>
                                    <div style={{
                                        width: 2, height: '100%', position: 'absolute', left: 0, top: 0,
                                        background: 'linear-gradient(to bottom, #00FF88, #00D4FF)'
                                    }} />
                                    <div>
                                        <div style={{
                                            fontFamily: "'Cinzel', serif",
                                            fontSize: '0.8rem', fontWeight: 500,
                                            textTransform: 'uppercase', letterSpacing: '0.1em',
                                            color: '#00FF88', marginBottom: '0.4rem'
                                        }}>{opt.label}</div>
                                        <div style={{
                                            fontFamily: "'Space Grotesk', sans-serif",
                                            fontSize: '0.88rem', color: 'rgba(185,203,185,0.65)',
                                            lineHeight: 1.7, fontWeight: 300
                                        }}>{opt.desc}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </FadeIn>
                </div>
            </section>

            <NeonDivider />

            {/* ══════════════════ TIMELINE ══════════════════ */}
            <section style={{ padding: isMobile ? '1.5rem 1.25rem 4rem' : '8rem 2rem', maxWidth: '1280px', margin: '0 auto' }}>
                <FadeIn>
                    <h2 style={{
                        fontFamily: "'Cinzel', serif",
                        fontSize: isMobile ? '1.6rem' : 'clamp(1.8rem, 4vw, 2.8rem)',
                        fontWeight: 400, textTransform: 'uppercase', letterSpacing: '0.12em',
                        textAlign: 'center', color: '#E6F0EB',
                        marginBottom: isMobile ? '3rem' : '5rem'
                    }}>
                        Domus Installation <span style={{
                            background: 'linear-gradient(135deg, #00FF88, #00D4FF)',
                            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
                        }}>Timeline</span>
                    </h2>
                </FadeIn>

                {/* Desktop: horizontal grid */}
                {!isMobile ? (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1.25rem', position: 'relative' }}>
                        {/* Connector line */}
                        <div style={{
                            position: 'absolute', top: '28px', left: '10%', right: '10%', height: '1px',
                            background: 'linear-gradient(90deg, rgba(0,255,136,0.15), rgba(0,212,255,0.15), rgba(0,255,136,0.15))',
                            zIndex: 0
                        }} />

                        {timelineSteps.map((step, i) => {
                            const cfg = phaseConfig[step.phase];
                            return (
                                <FadeIn key={i} delay={i * 0.1}>
                                    <div style={{
                                        position: 'relative', zIndex: 1,
                                        padding: '1.75rem 1.25rem',
                                        background: step.phase === 'future'
                                            ? 'rgba(18, 29, 27, 0.92)'
                                            : 'rgba(18, 29, 27, 0.95)',
                                        border: `1px solid ${step.phase === 'future'
                                            ? 'rgba(255, 71, 87, 0.2)'
                                            : 'rgba(0, 255, 136, 0.2)'}`,
                                        height: '100%',
                                        boxSizing: 'border-box'
                                    }}>
                                        <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
                                            <div style={{
                                                display: 'inline-block',
                                                padding: '0.2rem 0.8rem',
                                                background: step.phase === 'future'
                                                    ? 'rgba(255, 71, 87, 0.1)'
                                                    : 'rgba(0, 255, 136, 0.1)',
                                                border: `1px solid ${cfg.color}40`,
                                                borderRadius: '20px',
                                                fontSize: '0.65rem',
                                                fontFamily: "'Space Grotesk', sans-serif",
                                                letterSpacing: '0.1em', textTransform: 'uppercase',
                                                color: cfg.color
                                            }}>{step.duration}</div>
                                        </div>
                                        <div style={{ marginBottom: '1rem' }}>
                                            <span style={{
                                                fontFamily: "'Space Grotesk', sans-serif",
                                                fontSize: '0.55rem', letterSpacing: '0.25em', textTransform: 'uppercase',
                                                color: cfg.color, opacity: 0.75
                                            }}>{cfg.label}</span>
                                        </div>
                                        <h3 style={{
                                            fontFamily: "'Cinzel', serif",
                                            fontSize: '0.82rem', fontWeight: 500,
                                            textTransform: 'uppercase', letterSpacing: '0.05em',
                                            color: cfg.color,
                                            marginBottom: '0.75rem', lineHeight: 1.4
                                        }}>{step.title}</h3>
                                        <p style={{
                                            fontFamily: "'Space Grotesk', sans-serif",
                                            fontSize: '0.82rem', color: 'rgba(185,203,185,0.65)',
                                            lineHeight: 1.7, fontWeight: 300, margin: '0 0 1rem'
                                        }}>{step.description}</p>

                                    </div>
                                </FadeIn>
                            );
                        })}
                    </div>
                ) : (
                    /* Mobile: vertical */
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', paddingLeft: '1.5rem', position: 'relative' }}>
                        <div style={{
                            position: 'absolute', top: 0, bottom: 0, left: 0, width: '1px',
                            background: 'linear-gradient(to bottom, #00FF88, rgba(0,212,255,0.3), rgba(255,71,87,0.2))'
                        }} />
                        {timelineSteps.map((step, i) => {
                            const cfg = phaseConfig[step.phase];
                            return (
                                <div key={i} style={{
                                    padding: '1.5rem',
                                    background: 'rgba(10, 15, 12, 0.98)',
                                    border: `1px solid ${step.phase === 'future' ? 'rgba(255, 71, 87, 0.15)' : 'rgba(0, 255, 136, 0.2)'}`,
                                    position: 'relative'
                                }}>
                                    <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
                                        <span style={{
                                            fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.65rem',
                                            letterSpacing: '0.1em', textTransform: 'uppercase', color: cfg.color,
                                            background: `rgba(${step.phase === 'future' ? '255,71,87' : '0,255,136'},0.12)`,
                                            padding: '0.25rem 0.8rem',
                                            border: `1px solid ${cfg.color}40`,
                                            borderRadius: '20px'
                                        }}>{step.duration}</span>
                                    </div>
                                    <div style={{
                                        fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.55rem',
                                        letterSpacing: '0.2em', textTransform: 'uppercase',
                                        color: cfg.color, opacity: 0.7, marginBottom: '0.4rem'
                                    }}>{cfg.label}</div>
                                    <h3 style={{
                                        fontFamily: "'Cinzel', serif", fontSize: '0.9rem',
                                        fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em',
                                        color: cfg.color,
                                        marginBottom: '0.5rem'
                                    }}>{step.title}</h3>
                                    <p style={{
                                        fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.85rem',
                                        color: 'rgba(185,203,185,0.65)', lineHeight: 1.7, fontWeight: 300, margin: '0 0 0.75rem'
                                    }}>{step.description}</p>

                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Legend */}
                <FadeIn delay={0.3}>
                    <div style={{
                        marginTop: isMobile ? '2rem' : '3.5rem',
                        display: 'flex', flexWrap: 'wrap', gap: '1.5rem',
                        justifyContent: 'center',
                        padding: '1.5rem 2rem',
                        background: 'rgba(18,29,27,0.6)',
                        border: '1px solid rgba(0,255,136,0.08)'
                    }}>
                        {[
                            { color: '#00FF88', label: 'Installation Window — Manual setup allowed' },
                            { color: '#FF4757', label: '24/7 Operations — Access restricted' },
                        ].map((item, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                                <div style={{ width: 8, height: 8, borderRadius: '50%', background: item.color, boxShadow: `0 0 10px ${item.color}` }} />
                                <span style={{
                                    fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.7rem',
                                    letterSpacing: '0.1em', textTransform: 'uppercase',
                                    color: 'rgba(185,203,185,0.55)'
                                }}>{item.label}</span>
                            </div>
                        ))}
                    </div>
                </FadeIn>
            </section>

            <NeonDivider />

            {/* ══════════════════ DESIGN EXPECTATIONS ══════════════════ */}
            <section style={{ padding: isMobile ? '1.5rem 1.25rem 4rem' : '8rem 2rem', maxWidth: '1280px', margin: '0 auto' }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                    gap: isMobile ? '3rem' : '6rem',
                    alignItems: 'center'
                }}>
                    {/* Text */}
                    <FadeIn delay={0.1}>

                        <h2 style={{
                            fontFamily: "'Cinzel', serif",
                            fontSize: isMobile ? '1.6rem' : 'clamp(1.8rem, 3.5vw, 2.6rem)',
                            fontWeight: 400, textTransform: 'uppercase', letterSpacing: '0.1em',
                            color: '#E6F0EB', marginBottom: '1.25rem', lineHeight: 1.2
                        }}>
                            Design <span style={{
                                background: 'linear-gradient(135deg, #00FF88, #00D4FF)',
                                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
                            }}>Expectations</span>
                        </h2>
                        <p style={{
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontSize: isMobile ? '1rem' : '1.05rem',
                            color: 'rgba(185,203,185,0.75)', lineHeight: 1.85,
                            fontWeight: 300, marginBottom: '2rem'
                        }}>
                            We expect your Domus to be aesthetically pleasing and contribute to the park's visual identity.
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                            {[
                                { icon: '◈', accent: '#00FF88', title: 'Exterior Lighting', text: 'Install attractive exterior lighting to enhance the cityscape at night.' },
                                { icon: '◈', accent: '#00D4FF', title: 'Aesthetic Design', text: 'Create a visually appealing structure that adds character to JUVANTIA.' }
                            ].map((item, i) => (
                                <div key={i} style={{
                                    display: 'flex', gap: '1rem', alignItems: 'flex-start',
                                    padding: '1.25rem 1.5rem',
                                    background: 'rgba(18,29,27,0.9)',
                                    border: `1px solid ${i === 0 ? 'rgba(0,255,136,0.12)' : 'rgba(0,212,255,0.1)'}`,
                                    position: 'relative'
                                }}>
                                    <div style={{
                                        position: 'absolute', left: 0, top: 0, bottom: 0, width: '2px',
                                        background: item.accent
                                    }} />
                                    <div style={{ paddingLeft: '0.25rem' }}>
                                        <div style={{
                                            fontFamily: "'Cinzel', serif", fontSize: '0.78rem', fontWeight: 500,
                                            textTransform: 'uppercase', letterSpacing: '0.1em',
                                            color: item.accent, marginBottom: '0.35rem'
                                        }}>{item.title}</div>
                                        <div style={{
                                            fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.88rem',
                                            color: 'rgba(185,203,185,0.65)', lineHeight: 1.7, fontWeight: 300
                                        }}>{item.text}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </FadeIn>

                    {/* Image */}
                    <FadeIn delay={0.25}>
                        <div style={{
                            position: 'relative', overflow: 'hidden',
                            border: '1px solid rgba(0,255,136,0.12)',
                            boxShadow: '0 24px 60px rgba(0,0,0,0.5)'
                        }}>
                            <img
                                src="/images/DOMUS4.png"
                                alt="Domus Design"
                                style={{ width: '100%', height: 'auto', display: 'block', filter: 'brightness(0.88) saturate(1.1)' }}
                            />
                            <div style={{
                                position: 'absolute', inset: 0,
                                background: 'linear-gradient(to top, rgba(5,10,9,0.4) 0%, transparent 60%)'
                            }} />
                            <ScannerCorners size={16} />
                            <div style={{
                                position: 'absolute', bottom: 14, left: 14,
                                fontFamily: "'Space Grotesk'", fontSize: '0.55rem',
                                letterSpacing: '0.25em', textTransform: 'uppercase',
                                color: 'rgba(0,255,136,0.5)'
                            }}>DOMUS · DESIGN CONCEPT</div>
                        </div>
                    </FadeIn>
                </div>
            </section>

            <NeonDivider />

            {/* ══════════════════ ELECTRICAL CONNECTION ══════════════════ */}
            <section style={{ padding: isMobile ? '5rem 1.25rem 6rem' : '8rem 2rem 10rem', maxWidth: '1280px', margin: '0 auto' }}>
                <FadeIn>

                    <h2 style={{
                        fontFamily: "'Cinzel', serif",
                        fontSize: isMobile ? '1.6rem' : 'clamp(1.8rem, 4vw, 2.8rem)',
                        fontWeight: 400, textTransform: 'uppercase', letterSpacing: '0.12em',
                        textAlign: 'center', color: '#E6F0EB',
                        marginBottom: isMobile ? '3rem' : '5rem'
                    }}>
                        Electrical <span style={{
                            background: 'linear-gradient(135deg, #00FF88, #00D4FF)',
                            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
                        }}>Connection</span>
                    </h2>
                </FadeIn>

                <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '1.5rem' : '1.5rem' }}>

                    {/* External Connection */}
                    <FadeIn delay={0.1}>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: isMobile ? '1fr' : '1fr 320px',
                            gap: isMobile ? '2rem' : '4rem',
                            alignItems: 'center',
                            padding: isMobile ? '2rem 1.5rem' : '3rem 3.5rem',
                            background: 'rgba(0,255,136,0.03)',
                            border: '1px solid rgba(0,255,136,0.15)',
                            position: 'relative'
                        }}>
                            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, #00FF88, rgba(0,212,255,0.4), transparent)' }} />

                            <div>
                                <div style={{
                                    display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem'
                                }}>
                                    <span style={{ fontSize: '1.1rem' }}>⚡</span>
                                    <span style={{
                                        fontFamily: "'Cinzel', serif", fontSize: isMobile ? '1rem' : '1.25rem',
                                        fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#00FF88'
                                    }}>External Connection</span>
                                </div>
                                <p style={{
                                    fontFamily: "'Space Grotesk', sans-serif",
                                    fontSize: isMobile ? '0.95rem' : '1rem', lineHeight: 1.85,
                                    color: 'rgba(185,203,185,0.75)', fontWeight: 300, marginBottom: '1rem'
                                }}>
                                    All Domus structures connect to the park grid via the standard 12V <strong style={{ color: '#00FF88', fontWeight: 500 }}>1.5mm 2Pin AMP Superseal</strong> plug connector.
                                </p>
                                <p style={{
                                    fontFamily: "'Space Grotesk', sans-serif",
                                    fontSize: '0.88rem', lineHeight: 1.75,
                                    color: 'rgba(185,203,185,0.5)', fontStyle: 'italic'
                                }}>
                                    This 1.5mm 2Pin AMP Superseal connector powers your Domus from the JUVANTIA park electrical network.
                                </p>
                            </div>

                            <div style={{ textAlign: 'center' }}>
                                <div style={{
                                    position: 'relative', overflow: 'hidden',
                                    border: '1px solid rgba(0,255,136,0.2)',
                                    boxShadow: '0 12px 40px rgba(0,0,0,0.4), 0 0 30px rgba(0,255,136,0.06)',
                                    background: '#fff'
                                }}>
                                    <div style={{
                                        position: 'absolute', inset: 0,
                                        background: 'linear-gradient(135deg, rgba(0,255,136,0.08) 0%, transparent 60%)',
                                        zIndex: 1, pointerEvents: 'none'
                                    }} />
                                    <img
                                        src="/images/2-Pin-AMP-Superseal-Female-Automotive-Connector.webp"
                                        alt="1.5mm 2Pin AMP Superseal connector"
                                        style={{ width: '100%', height: 'auto', display: 'block', position: 'relative', zIndex: 2 }}
                                    />
                                </div>
                                <p style={{
                                    marginTop: '0.85rem',
                                    fontFamily: "'Space Grotesk', sans-serif",
                                    fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase',
                                    color: '#00FF88', opacity: 0.75
                                }}>1.5mm 2Pin AMP Superseal · 12V</p>
                            </div>
                        </div>
                    </FadeIn>

                    {/* Internal Connection */}
                    <FadeIn delay={0.2}>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: isMobile ? '1fr' : '1fr 320px',
                            gap: isMobile ? '2rem' : '4rem',
                            alignItems: 'center',
                            padding: isMobile ? '2rem 1.5rem' : '3rem 3.5rem',
                            background: 'rgba(18,29,27,0.8)',
                            border: '1px solid rgba(0,212,255,0.12)',
                            position: 'relative'
                        }}>
                            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, #00D4FF, rgba(0,255,136,0.3), transparent)' }} />

                            <div>
                                <div style={{
                                    display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem'
                                }}>
                                    <span style={{ fontSize: '1.1rem' }}>🔌</span>
                                    <span style={{
                                        fontFamily: "'Cinzel', serif", fontSize: isMobile ? '1rem' : '1.25rem',
                                        fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#00D4FF'
                                    }}>Internal Charging</span>
                                </div>
                                <p style={{
                                    fontFamily: "'Space Grotesk', sans-serif",
                                    fontSize: isMobile ? '0.95rem' : '1rem', lineHeight: 1.85,
                                    color: 'rgba(185,203,185,0.75)', fontWeight: 300, marginBottom: '1rem'
                                }}>
                                    Inside your Domus, you can choose how to charge your Robulus. We recommend the <strong style={{ color: '#00FF88', fontWeight: 500 }}>JUVANTIA Standard Pogo Magnetic 4P</strong> for maximum compatibility.
                                </p>
                                <p style={{
                                    fontFamily: "'Space Grotesk', sans-serif",
                                    fontSize: '0.88rem', lineHeight: 1.75,
                                    color: 'rgba(185,203,185,0.5)', fontStyle: 'italic'
                                }}>
                                    To ensure your Domus can be resold to another participant—use a stepper-motor-driven height-adjustable charging unit (<a href="https://tabularium.juvantia.org" style={{ color: '#00D4FF', textDecoration: 'underline' }}>detailed instructions here</a>).
                                </p>
                            </div>

                            <div style={{ textAlign: 'center' }}>
                                <div style={{
                                    position: 'relative', overflow: 'hidden',
                                    border: '1px solid rgba(0,212,255,0.15)',
                                    boxShadow: '0 12px 40px rgba(0,0,0,0.4), 0 0 24px rgba(0,212,255,0.05)',
                                    background: '#fff'
                                }}>
                                    <div style={{
                                        position: 'absolute', inset: 0,
                                        background: 'linear-gradient(135deg, rgba(0,212,255,0.07) 0%, transparent 60%)',
                                        zIndex: 1, pointerEvents: 'none'
                                    }} />
                                    <img
                                        src="/images/4P.jpg"
                                        alt="4-pin magnetic connector"
                                        style={{ width: '100%', height: 'auto', display: 'block', position: 'relative', zIndex: 2 }}
                                    />
                                </div>
                                <p style={{
                                    marginTop: '0.85rem',
                                    fontFamily: "'Space Grotesk', sans-serif",
                                    fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase',
                                    color: '#00D4FF', opacity: 0.75
                                }}>JUVANTIA Standard · 4-Pin Magnetic</p>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>

        </div>
    );
};

export default Domus;
