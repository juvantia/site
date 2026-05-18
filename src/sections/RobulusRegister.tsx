import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// ─── Scanner corners (same as Domus) ─────────────────────────────────────────
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

// ─── Main component ───────────────────────────────────────────────────────────
const RobulusRegister: React.FC = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth <= 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    const components = [
        {
            index: '01',
            title: 'Design a 3D Model of Your Chassis',
            desc: (
                <>
                    Create a custom body for your Robulus — optimized for the park's terrain and your own aesthetic.
                    <br /><br />
                    You will need to print and assemble the body yourself. If you lack experience or access to a printer, 
                    you can find assembly help from enthusiasts at <a href="https://marketplace.juvantia.org" style={{ color: '#00FF88', textDecoration: 'none' }}>marketplace.juvantia.org</a>.
                </>
            ),
            tip: 'The easiest tool to start with is Shapr3D — intuitive enough to get a printable model within the first weeks.',
            images: [{ src: '/images/3D.png', alt: '3D model example' }],
            accent: '#00FF88' as const,
        },
        {
            index: '02',
            title: 'Get a Ready-made PCB or Build Your Own',
            desc: (
                <>
                    The Cyber Brick Juvantia Edition PCB is designed specifically for the technopark, allowing deep customization and offering extensive expansion capabilities.
                    <br /><br />
                    Custom builds must be based on the ESP32 S3 CAM module—the only supported platform for connecting to the park’s Wi-Fi networks.
                </>
            ),
            tip: '⚠️ NO HAND-SOLDERING: The technopark only accepts PCB-based designs to ensure long-term reliability and maintainability. Robots with direct-wired components will not be admitted.',
            images: [{ src: '/images/An-example-of-a-circuit-board-enclosure.png', alt: 'PCB board example' }],
            accent: '#00D4FF' as const,
        },
        {
            index: '03',
            title: 'Buy a Ready-made Platform or Build Custom',
            desc: 'You also have the option to create a completely bespoke platform with any custom equipment and hardware you desire.',
            tip: 'Batteries are optional: You don’t have to ship batteries with your robot, as the technopark can provide its own. This simplifies air delivery, which often restricts large lithium batteries.',
            images: [
                { src: '/images/photo_2026-04-18_23-02-35.jpg', alt: 'Platform parts' },
                { src: '/images/photo_2026-04-18_23-06-22.jpg', alt: 'Connection parts' },
                { src: '/images/photo_2026-04-18_23-07-10.jpg', alt: 'Hardware detail' },
                { src: '/images/photo_2026-04-18_23-07-59.jpg', alt: 'Assembly parts' },
                { src: '/images/photo_2026-04-18_23-08-37.jpg', alt: 'Components' },
                { src: '/images/cn-11134207-7ras8-mczt3mnzjw9709.webp', alt: 'Additional Hardware' },
            ],
            accent: '#00FF88' as const,
        },
    ];

    const howItWorks = [
        { num: '1', title: 'Buy or Build Your Own', text: 'Buy ready-made kits or build your own one.', icon: '🛠️' },
        { num: '2', title: 'Flash the Firmware', text: (
            <>
                Use the Fabrica service to install the firmware directly from your browser via USB.
            </>
        ), icon: '💻' },
        { num: '3', title: 'Send by Parcel', text: 'Ship your Robulus to our European location (TBD).', icon: '📦' },
        { num: '4', title: 'Control in JUVANTIA', text: 'Operate your robot remotely inside the open-air park.', icon: '🎮' },
    ];

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
                        Robulus
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
                        How to Design & Build Your Own Robulus
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

            {/* ══════════════════ COMPONENT CARDS ══════════════════ */}
            <section style={{ padding: isMobile ? '1.5rem 1.25rem 4rem' : '8rem 2rem', maxWidth: '1280px', margin: '0 auto' }}>
                <FadeIn>
                    <h2 style={{
                        fontFamily: "'Cinzel', serif",
                        fontSize: isMobile ? '1.6rem' : 'clamp(1.8rem, 4vw, 2.8rem)',
                        fontWeight: 400, textTransform: 'uppercase', letterSpacing: '0.12em',
                        textAlign: 'center', color: '#E6F0EB',
                        marginBottom: isMobile ? '3rem' : '5rem'
                    }}>
                        Build Your Own{' '}
                        <span style={{
                            background: 'linear-gradient(135deg, #00FF88, #00D4FF)',
                            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
                        }}>Robulus</span>
                    </h2>
                </FadeIn>

                <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '2rem' : '2.5rem' }}>
                    {components.map((comp, i) => (
                        <FadeIn key={comp.index} delay={i * 0.1}>
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: isMobile ? '1fr' : '1fr 380px',
                                border: `1px solid ${comp.accent === '#00FF88' ? 'rgba(0,255,136,0.15)' : 'rgba(0,212,255,0.15)'}`,
                                overflow: 'hidden',
                                background: 'rgba(10, 15, 12, 0.95)',
                                position: 'relative',
                            }}>
                                {/* Top accent line */}
                                <div style={{
                                    position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                                    background: `linear-gradient(90deg, ${comp.accent}, transparent)`
                                }} />

                                {/* Left: text */}
                                <div style={{
                                    padding: isMobile ? '2rem 1.5rem' : '2.5rem 3rem',
                                    display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '1.25rem',
                                    borderRight: isMobile ? 'none' : `1px solid ${comp.accent === '#00FF88' ? 'rgba(0,255,136,0.08)' : 'rgba(0,212,255,0.08)'}`,
                                    borderBottom: isMobile ? `1px solid ${comp.accent === '#00FF88' ? 'rgba(0,255,136,0.08)' : 'rgba(0,212,255,0.08)'}` : 'none',
                                }}>
                                    {/* Index */}
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <span style={{
                                            fontFamily: "'Cinzel', serif",
                                            fontSize: '2.2rem', color: comp.accent,
                                            opacity: 0.15, fontWeight: 700, lineHeight: 1, userSelect: 'none',
                                        }}>{comp.index}</span>
                                        <div style={{
                                            width: '40px', height: '1px',
                                            background: `linear-gradient(90deg, ${comp.accent}, transparent)`, opacity: 0.4,
                                        }} />
                                    </div>

                                    <h3 style={{
                                        fontFamily: "'Cinzel', serif",
                                        fontSize: isMobile ? '1rem' : '1.2rem',
                                        color: '#E6F0EB', fontWeight: 400,
                                        letterSpacing: '0.06em', margin: 0, lineHeight: 1.4,
                                    }}>
                                        {comp.title}
                                    </h3>

                                    <p style={{
                                        fontFamily: "'Space Grotesk', sans-serif",
                                        fontSize: '0.95rem', color: 'rgba(185,203,185,0.75)',
                                        lineHeight: 1.8, margin: 0, fontWeight: 300,
                                    }}>
                                        {comp.desc}
                                    </p>

                                    {/* Policy/Tip */}
                                    <div style={{
                                        marginTop: '1.25rem',
                                        padding: '1rem 1.25rem',
                                        background: comp.index === '02' ? 'rgba(255, 71, 87, 0.04)' : `rgba(${comp.accent === '#00FF88' ? '0,255,136' : '0,212,255'}, 0.04)`,
                                        border: `1px solid ${comp.index === '02' ? 'rgba(255, 71, 87, 0.1)' : (comp.accent === '#00FF88' ? 'rgba(0,255,136,0.1)' : 'rgba(0,212,255,0.1)')}`,
                                        position: 'relative',
                                    }}>
                                        <div style={{
                                            position: 'absolute', left: 0, top: 0, bottom: 0, width: '2px',
                                            background: comp.index === '02' ? '#FF4757' : comp.accent
                                        }} />
                                        <div style={{ paddingLeft: '0.25rem' }}>
                                            <div style={{
                                                fontFamily: "'Space Grotesk', sans-serif",
                                                fontSize: '0.58rem', fontWeight: 700,
                                                color: comp.index === '02' ? '#FF4757' : comp.accent, textTransform: 'uppercase',
                                                letterSpacing: '0.2em', marginBottom: '0.35rem'
                                            }}>{comp.index === '02' ? 'POLICY' : 'TIP'}</div>
                                            <p style={{
                                                fontFamily: "'Space Grotesk', sans-serif",
                                                fontSize: '0.85rem', color: 'rgba(185,203,185,0.6)',
                                                lineHeight: 1.65, margin: 0, fontStyle: 'italic',
                                            }}>
                                                {comp.tip}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Right: images */}
                                <div style={{
                                    padding: isMobile ? '1.5rem' : '2rem',
                                    display: 'flex', flexDirection: 'column',
                                    alignItems: 'center', justifyContent: 'center', gap: '1rem',
                                    background: 'rgba(0,0,0,0.2)',
                                    position: 'relative',
                                }}>
                                    {comp.images.length === 1 ? (
                                        <div style={{
                                            position: 'relative', overflow: 'hidden',
                                            border: `1px solid ${comp.accent === '#00FF88' ? 'rgba(0,255,136,0.15)' : 'rgba(0,212,255,0.15)'}`,
                                            boxShadow: '0 8px 40px rgba(0,0,0,0.5)',
                                            maxWidth: '300px', width: '100%', background: '#fff',
                                        }}>
                                            <div style={{
                                                position: 'absolute', inset: 0,
                                                background: `linear-gradient(135deg, rgba(${comp.accent === '#00FF88' ? '0,255,136' : '0,212,255'},0.08) 0%, transparent 60%)`,
                                                pointerEvents: 'none', zIndex: 1,
                                            }} />
                                            <img
                                                src={comp.images[0].src}
                                                alt={comp.images[0].alt}
                                                style={{ width: '100%', height: 'auto', display: 'block', position: 'relative', zIndex: 2 }}
                                            />
                                        </div>
                                    ) : (
                                        <div style={{
                                            display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)',
                                            gap: '0.5rem', width: '100%', maxWidth: '280px',
                                        }}>
                                            {comp.images.map((img, j) => (
                                                <div key={j} style={{
                                                    position: 'relative', overflow: 'hidden',
                                                    border: '1px solid rgba(0,255,136,0.1)',
                                                    boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
                                                    background: '#fff', aspectRatio: '4/3',
                                                }}>
                                                    <div style={{
                                                        position: 'absolute', inset: 0,
                                                        background: 'linear-gradient(135deg, rgba(0,255,136,0.06) 0%, rgba(0,0,0,0.15) 100%)',
                                                        pointerEvents: 'none', zIndex: 1,
                                                    }} />
                                                    <img
                                                        src={img.src} alt={img.alt}
                                                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    <ScannerCorners color={`${comp.accent === '#00FF88' ? 'rgba(0,255,136,0.4)' : 'rgba(0,212,255,0.4)'}`} size={14} />
                                </div>
                            </div>
                        </FadeIn>
                    ))}
                </div>
            </section>

            <NeonDivider />

            {/* ══════════════════ HOW IT WILL WORK ══════════════════ */}
            <section style={{ padding: isMobile ? '5rem 1.25rem 6rem' : '8rem 2rem 10rem', maxWidth: '1280px', margin: '0 auto' }}>
                <FadeIn>
                    <h2 style={{
                        fontFamily: "'Cinzel', serif",
                        fontSize: isMobile ? '1.6rem' : 'clamp(1.8rem, 4vw, 2.8rem)',
                        fontWeight: 400, textTransform: 'uppercase', letterSpacing: '0.12em',
                        textAlign: 'center', color: '#E6F0EB',
                        marginBottom: isMobile ? '3rem' : '5rem'
                    }}>
                        How It Will{' '}
                        <span style={{
                            background: 'linear-gradient(135deg, #00FF88, #00D4FF)',
                            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
                        }}>Work</span>
                    </h2>
                </FadeIn>

                <div style={{
                    display: isMobile ? 'flex' : 'grid',
                    ...(isMobile
                        ? { overflowX: 'auto', scrollSnapType: 'x mandatory', gap: '1rem', padding: '0.5rem 0 1rem', scrollbarWidth: 'none' as const }
                        : { gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem' }
                    )
                }}>
                    {howItWorks.map((step, idx) => (
                        <FadeIn key={idx} delay={idx * 0.1}>
                            <div style={{
                                padding: isMobile ? '1.75rem 1.5rem' : '2rem 1.75rem',
                                background: 'rgba(10,15,12,0.95)',
                                border: '1px solid rgba(0,255,136,0.12)',
                                position: 'relative',
                                height: '100%', boxSizing: 'border-box',
                                ...(isMobile && { flexShrink: 0, width: '240px', scrollSnapAlign: 'start' }),
                            }}>
                                {/* Top accent */}
                                <div style={{
                                    position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                                    background: 'linear-gradient(90deg, #00FF88, rgba(0,212,255,0.4), transparent)'
                                }} />

                                {/* Step number */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                                    <span style={{
                                        fontFamily: "'Space Grotesk', sans-serif",
                                        fontSize: '0.7rem', fontWeight: 700,
                                        color: '#00FF88', letterSpacing: '0.1em',
                                        background: 'rgba(0,255,136,0.08)',
                                        width: '28px', height: '28px',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        border: '1px solid rgba(0,255,136,0.2)',
                                    }}>{step.num}</span>
                                    <span style={{ fontSize: '1.2rem' }}>{step.icon}</span>
                                </div>

                                <h3 style={{
                                    fontFamily: "'Cinzel', serif",
                                    fontSize: '0.9rem', fontWeight: 400,
                                    color: '#E6F0EB', letterSpacing: '0.06em',
                                    textTransform: 'uppercase', marginBottom: '0.65rem', lineHeight: 1.4,
                                }}>{step.title}</h3>

                                <p style={{
                                    fontFamily: "'Space Grotesk', sans-serif",
                                    fontSize: '0.88rem', margin: 0,
                                    color: 'rgba(185,203,185,0.65)', lineHeight: 1.7, fontWeight: 300,
                                }}>{step.text}</p>

                                <ScannerCorners color="rgba(0,255,136,0.25)" size={12} />
                            </div>
                        </FadeIn>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default RobulusRegister;
