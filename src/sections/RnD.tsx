import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { theme } from '../styles/theme';

// ─── Scanner corners (identical to Domus & Economics) ───────────────────────
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

// ─── Thin neon divider (identical to Domus & Economics) ─────────────────────
const NeonDivider = () => (
    <div style={{
        width: '100%', height: '1px',
        background: 'linear-gradient(90deg, transparent 0%, rgba(0,255,136,0.25) 50%, transparent 100%)',
        margin: '0'
    }} />
);

// ─── FadeIn wrapper ─────────────────────────────────────────────────────────
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

const RnD: React.FC = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [activeTrack, setActiveTrack] = useState<'industry' | 'academia'>('industry');

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth <= 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    const tracks = [
        {
            id: 'industry' as const,
            tag: 'TRACK A // COMMERCIAL',
            title: 'INDUSTRY & STARTUPS',
            heading: 'HARDWARE COMPANIES & STARTUPS',
            description: 'Accelerate your cycle from laboratory prototyping to field validation without investing hundreds of thousands into private testing infrastructure. Deploy prototypes directly to the park and operate 24/7 in non-sterile outdoor conditions:',
            items: [
                { title: 'Zero Facility CAPEX', desc: 'No land acquisition, perimeter fencing, weatherproofing, or base-station network overhead.' },
                { title: 'Continuous Reliability Runs', desc: 'Stress-test drivetrains, thermal dissipation, suspension, and battery wear across hundreds of hours.' },
                { title: 'Global Remote Demos', desc: 'Demonstrate active prototypes to investors and enterprise buyers worldwide via Operator Deck.' },
                { title: 'Dedicated Domus Garages', desc: 'Private workshop sectors with continuous power, wired telemetry links, and secure hardware storage.' }
            ]
        },
        {
            id: 'academia' as const,
            tag: 'TRACK B // SCIENTIFIC',
            title: 'ACADEMIA & RESEARCH',
            heading: 'UNIVERSITY LABORATORIES & RESEARCH',
            description: 'Provide research departments and students with direct remote access to outdoor robotics experimentation without physical relocation. Test autonomy stacks and gather authentic sensor datasets under genuine physics:',
            items: [
                { title: 'Sim-to-Real Benchmarking', desc: 'Test Isaac Sim and Gazebo models against real moisture, wheel slip, loose stones, and lighting shifts.' },
                { title: 'Physical AI Dataset Gathering', desc: 'Collect synchronised camera, IMU, and BLE beacon streams with authentic physical sensory noise.' },
                { title: 'Cross-Campus Competitions', desc: 'Host remote student hackathons, teleoperation trials, and gripper challenges on shared park hardware.' },
                { title: 'Open Protocol Architecture', desc: 'Deploy experimental firmware on ESP32 or official Juvantia PCBs via Web-Serial and WSS interfaces.' }
            ]
        }
    ];

    const currentTrack = tracks.find(t => t.id === activeTrack) || tracks[0];

    return (
        <div style={theme.layout.rootContainer}>

            {/* ── Ambient glows (same as Domus & Economics) ────────────────── */}
            <div style={{
                position: 'absolute', top: '10%', right: '-10%',
                width: '700px', height: '700px',
                background: 'radial-gradient(circle, rgba(0,255,136,0.04) 0%, transparent 65%)',
                filter: 'blur(100px)', pointerEvents: 'none'
            }} />
            <div style={{
                position: 'absolute', bottom: '20%', left: '-10%',
                width: '600px', height: '600px',
                background: 'radial-gradient(circle, rgba(0,212,255,0.03) 0%, transparent 65%)',
                filter: 'blur(100px)', pointerEvents: 'none'
            }} />

            {/* ══════════════════ HERO (STYLE SYNC WITH DOMUS / ECONOMICS) ══════════════════ */}
            <section style={{
                position: 'relative',
                padding: isMobile ? '5.5rem 1.25rem 2rem' : '7rem 2rem 5rem',
                maxWidth: '1280px', margin: '0 auto',
                display: 'flex', flexDirection: isMobile ? 'column' : 'row',
                alignItems: 'center', gap: isMobile ? '1.5rem' : '6rem'
            }}>
                {/* Left: Copy */}
                <div style={{ flex: isMobile ? '0 0 auto' : '0 1 540px', width: isMobile ? '100%' : 'auto' }}>
                    <motion.h1
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
                        style={theme.typography.h1(isMobile)}
                    >
                        PROVING GROUND
                    </motion.h1>

                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 0.6, duration: 0.8, ease: 'easeOut' }}
                        style={theme.layout.heroUnderline(isMobile)}
                    />

                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        style={theme.typography.heroDesc(isMobile)}
                    >
                        A secure, purpose-built outdoor infrastructure for teleoperated and autonomous robotics. 
                        Step beyond sterile private testbeds into a living, non-sterile environment—operating, testing, and coexisting alongside other machines, real operators, and shared infrastructure.
                    </motion.p>
                </div>

                {/* Right: Hero Image Frame */}
                <motion.div
                    initial={{ opacity: 0, x: 32, y: 16 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
                    style={{ flex: '0 0 auto', width: isMobile ? '240px' : '520px', position: 'relative' }}
                >
                    <div style={{
                        position: 'relative', overflow: 'hidden',
                        border: '1px solid rgba(0,255,136,0.15)',
                        boxShadow: '0 30px 70px rgba(0,0,0,0.6), 0 0 60px rgba(0,255,136,0.06)'
                    }}>
                        <img
                            src="/images/TP.png"
                            alt="Juvantia Proving Ground"
                            style={{ width: '100%', height: 'auto', display: 'block', filter: 'brightness(0.92) saturate(1.1)' }}
                        />
                        <div style={{
                            position: 'absolute', inset: 0,
                            background: 'linear-gradient(to top, rgba(5,10,9,0.5) 0%, transparent 50%)',
                            pointerEvents: 'none'
                        }} />
                        <ScannerCorners />
                        <div style={{
                            position: 'absolute', bottom: 14, left: 14,
                            fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.55rem',
                            letterSpacing: '0.25em', textTransform: 'uppercase',
                            color: 'rgba(0,255,136,0.7)'
                        }}>
                            PROVING GROUND · R&D FACILITY
                        </div>
                    </div>
                </motion.div>
            </section>

            <NeonDivider />

            {/* ══════════════════ HARDWARE FOUNDATION: ESP32-P4 ══════════════════ */}
            <section style={{
                padding: isMobile ? '2.5rem 1.25rem 4rem' : '7rem 3rem',
                maxWidth: '1280px', margin: '0 auto'
            }}>
                <FadeIn>
                    <h2 style={theme.typography.h2(isMobile)}>
                        THE HARDWARE <span style={theme.typography.gradientSpan}>FOUNDATION</span>
                    </h2>

                    <div style={{
                        marginTop: isMobile ? '2rem' : '3.5rem',
                        display: 'grid',
                        gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
                        gap: isMobile ? '1.5rem' : '2rem'
                    }}>
                        {/* Card 1: ESP32-P4 Architecture */}
                        <div style={{
                            ...theme.layout.card('rgba(0, 255, 136, 0.25)'),
                            padding: isMobile ? '1.8rem 1.4rem' : '2.2rem 1.8rem',
                            display: 'flex', flexDirection: 'column'
                        }}>
                            <ScannerCorners color="#00FF88" size={18} />
                            <h3 style={{
                                ...theme.typography.h3,
                                fontSize: isMobile ? '1.05rem' : '1.2rem',
                                lineHeight: 1.35,
                                marginBottom: '1rem'
                            }}>
                                ESP32-P4 ARCHITECTURE
                            </h3>
                            <p style={{
                                ...theme.typography.body,
                                fontSize: '0.9rem',
                                lineHeight: 1.7,
                                margin: 0
                            }}>
                                The official Juvantia Robulus Platform board is built on the ESP32-P4 chip, providing vehicle control, telemetry streaming, and park mesh networking out of the box.
                            </p>
                        </div>

                        {/* Card 2: Bring Your Own Compute */}
                        <div style={{
                            ...theme.layout.card('rgba(0, 255, 136, 0.25)'),
                            padding: isMobile ? '1.8rem 1.4rem' : '2.2rem 1.8rem',
                            display: 'flex', flexDirection: 'column'
                        }}>
                            <ScannerCorners color="#00FF88" size={18} />
                            <h3 style={{
                                ...theme.typography.h3,
                                fontSize: isMobile ? '1.05rem' : '1.2rem',
                                lineHeight: 1.35,
                                marginBottom: '1rem'
                            }}>
                                BRING YOUR OWN COMPUTE
                            </h3>
                            <p style={{
                                ...theme.typography.body,
                                fontSize: '0.9rem',
                                lineHeight: 1.7,
                                margin: 0
                            }}>
                                Keep your ROS2 stacks and autonomy algorithms. Connect your own Nvidia Jetson, Raspberry Pi, LiDAR, or neural accelerators directly to the P4 vehicle bridge.
                            </p>
                        </div>

                        {/* Card 3: Bespoke Designs */}
                        <div style={{
                            ...theme.layout.card('rgba(0, 255, 136, 0.25)'),
                            padding: isMobile ? '1.8rem 1.4rem' : '2.2rem 1.8rem',
                            display: 'flex', flexDirection: 'column'
                        }}>
                            <ScannerCorners color="#00FF88" size={18} />
                            <h3 style={{
                                ...theme.typography.h3,
                                fontSize: isMobile ? '1.05rem' : '1.2rem',
                                lineHeight: 1.35,
                                marginBottom: '1rem'
                            }}>
                                BESPOKE DESIGNS
                            </h3>
                            <p style={{
                                ...theme.typography.body,
                                fontSize: '0.9rem',
                                lineHeight: 1.7,
                                margin: 0
                            }}>
                                Deploy on our reference carrier board or integrate your own hardware. For proprietary research or unique industrial form factors, we are open to discussing bespoke solutions.
                            </p>
                        </div>
                    </div>
                </FadeIn>
            </section>

            <NeonDivider />

            {/* ══════════════════ INDUSTRY & ACADEMIA (TWO TRACKS) ══════════════════ */}
            <section style={{
                padding: isMobile ? '2.5rem 1.25rem 6rem' : '7rem 3rem 11rem',
                maxWidth: '1280px', margin: '0 auto'
            }}>
                <FadeIn>
                    <h2 style={theme.typography.h2(isMobile)}>
                        INDUSTRY & <span style={theme.typography.gradientSpan}>ACADEMIA</span>
                    </h2>
                    <p style={theme.typography.sectionDesc}>
                        Tailored deployment paths eliminating proving ground barriers for both commercial product development and scientific research.
                    </p>

                    {/* ── Tactical Tab Bar (same as Robulus page) ── */}
                    <div style={{ marginTop: isMobile ? '2rem' : '3.5rem', marginBottom: isMobile ? '1.5rem' : '2rem' }}>
                        <div
                            role="tablist"
                            aria-label="Industry and Academia Tracks"
                            style={{
                                display: 'flex',
                                position: 'relative',
                                background: '#171d1b',
                                border: '1px solid rgba(0, 255, 136, 0.25)',
                                overflow: 'hidden',
                            }}
                        >
                            {tracks.map((track, idx) => {
                                const isActive = activeTrack === track.id;
                                return (
                                    <button
                                        key={track.id}
                                        role="tab"
                                        aria-selected={isActive}
                                        onClick={() => setActiveTrack(track.id)}
                                        style={{
                                            flex: 1,
                                            padding: isMobile ? '1.1rem 0.75rem' : '1.4rem 1.5rem',
                                            background: isActive ? 'rgba(0, 255, 136, 0.06)' : 'transparent',
                                            border: 'none',
                                            borderRight: idx < tracks.length - 1 ? '1px solid rgba(59, 75, 61, 0.3)' : 'none',
                                            color: isActive ? '#E6F0EB' : 'rgba(185, 203, 185, 0.45)',
                                            cursor: 'pointer',
                                            transition: 'all 0.35s ease',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            position: 'relative',
                                            zIndex: 2,
                                        }}
                                    >
                                        <span style={{
                                            fontFamily: "'Cinzel', serif",
                                            fontSize: isMobile ? '0.85rem' : '1.05rem',
                                            fontWeight: 600,
                                            letterSpacing: '0.12em',
                                            textTransform: 'uppercase',
                                            color: isActive ? '#00FF88' : 'rgba(185, 203, 185, 0.6)',
                                            transition: 'color 0.35s ease',
                                        }}>
                                            {track.title}
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
                                                background: 'linear-gradient(90deg, transparent, #00FF88, transparent)',
                                                transformOrigin: 'center',
                                            }}
                                        />
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* ── Tab Content Panel ── */}
                    <div style={{ position: 'relative' }}>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTrack}
                                role="tabpanel"
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -12 }}
                                transition={{ duration: 0.25, ease: 'easeInOut' }}
                                style={{
                                    ...theme.layout.card('rgba(0, 255, 136, 0.25)'),
                                    padding: isMobile ? '1.8rem 1.4rem' : '2.8rem 3rem',
                                    position: 'relative',
                                    boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
                                }}
                            >
                                <ScannerCorners color="#00FF88" size={18} />

                                {/* Top gradient accent line */}
                                <div style={{
                                    position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                                    background: 'linear-gradient(90deg, transparent, #00FF88, rgba(0,255,136,0.6), transparent)',
                                }} />

                                {/* Header inside panel */}
                                <div style={{
                                    paddingBottom: '1.75rem',
                                    borderBottom: '1px solid rgba(0, 255, 136, 0.12)',
                                    marginBottom: '2rem'
                                }}>
                                    <h3 style={{
                                        ...theme.typography.h3,
                                        fontSize: isMobile ? '1.2rem' : '1.5rem',
                                        marginBottom: '0.8rem',
                                    }}>
                                        {currentTrack.heading}
                                    </h3>
                                    <p style={{
                                        ...theme.typography.body,
                                        margin: 0,
                                        maxWidth: '900px'
                                    }}>
                                        {currentTrack.description}
                                    </p>
                                </div>

                                {/* Grid of 4 capabilities */}
                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                                    gap: isMobile ? '1.25rem' : '1.75rem'
                                }}>
                                    {currentTrack.items.map((item, idx) => (
                                        <div key={idx} style={{
                                            background: '#0a0f0e',
                                            border: '1px solid rgba(59, 75, 61, 0.3)',
                                            padding: isMobile ? '1.25rem 1rem' : '1.5rem 1.5rem',
                                            position: 'relative',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: '0.4rem'
                                        }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                <span style={{ color: '#00FF88', fontSize: '0.85rem' }}>▹</span>
                                                <strong style={{
                                                    fontFamily: "'Space Grotesk', sans-serif",
                                                    color: '#E6F0EB',
                                                    fontSize: '0.95rem',
                                                    fontWeight: 600,
                                                    letterSpacing: '0.04em'
                                                }}>
                                                    {item.title}
                                                </strong>
                                            </div>
                                            <p style={{
                                                fontFamily: "'Space Grotesk', sans-serif",
                                                color: 'rgba(223, 228, 225, 0.72)',
                                                fontSize: '0.88rem',
                                                lineHeight: 1.65,
                                                margin: 0,
                                                paddingLeft: '18px'
                                            }}>
                                                {item.desc}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </FadeIn>
            </section>

        </div>
    );
};

export default RnD;
