import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// ─── Scanner corners (identical to Domus) ────────────────────────────────────
const ScannerCorners: React.FC<{ color?: string; size?: number }> = ({
    color = 'rgba(0, 255, 136, 0.7)',
    size = 18,
}) => (
    <>
        {(['topLeft', 'topRight', 'bottomLeft', 'bottomRight'] as const).map(pos => (
            <div key={pos} style={{
                position: 'absolute',
                width: size, height: size,
                borderColor: color, borderStyle: 'solid', borderWidth: 0,
                ...(pos === 'topLeft'     && { top: 14, left: 14, borderTopWidth: 2, borderLeftWidth: 2 }),
                ...(pos === 'topRight'    && { top: 14, right: 14, borderTopWidth: 2, borderRightWidth: 2 }),
                ...(pos === 'bottomLeft'  && { bottom: 14, left: 14, borderBottomWidth: 2, borderLeftWidth: 2 }),
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

// ─── FadeIn wrapper (identical to Domus) ──────────────────────────────────────
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

// ─── Main Economics component ─────────────────────────────────────────────────
const Economics: React.FC = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth <= 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    // H1 Style (Style Sync with Domus)
    const h1Style = {
        fontFamily: "'Cinzel', serif",
        fontSize: isMobile ? 'clamp(2.4rem, 10vw, 3.5rem)' : 'clamp(3rem, 6vw, 4.5rem)',
        fontWeight: 400,
        letterSpacing: '0.12em',
        textTransform: 'uppercase' as const,
        lineHeight: 1.05,
        background: 'linear-gradient(135deg, #00FF88 0%, #dfe4e1 45%, #00D4FF 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
    };

    // H2 Section Header Base Style (Style Sync with Domus "Timeline" Header)
    const sectionH2BaseStyle = {
        fontFamily: "'Cinzel', serif",
        fontSize: isMobile ? '1.6rem' : 'clamp(1.8rem, 4vw, 2.8rem)',
        fontWeight: 400,
        textTransform: 'uppercase' as const,
        letterSpacing: '0.12em',
        textAlign: 'center' as const,
        color: '#E6F0EB',
        marginBottom: isMobile ? '1.5rem' : '2rem',
        lineHeight: 1.2,
    };

    const gradientSpanStyle = {
        background: 'linear-gradient(135deg, #00FF88, #00D4FF)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
    };

    const sectionDescStyle = {
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: '1.05rem',
        color: 'rgba(185,203,185,0.7)',
        lineHeight: 1.85,
        fontWeight: 300,
        maxWidth: '700px',
        margin: '0 auto',
        textAlign: 'center' as const,
    };

    return (
        <div style={{ minHeight: '100vh', background: 'transparent', position: 'relative', overflow: 'hidden' }}>

            {/* Ambient glows */}
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

            {/* ══════════════════ HERO ══════════════════ */}
            <section style={{
                padding: isMobile ? '5.5rem 1.25rem 2rem' : '7rem 2rem 5rem',
                maxWidth: '1280px',
                margin: '0 auto',
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                alignItems: 'center',
                gap: isMobile ? '1.5rem' : '6rem',
            }}>
                {/* Left: Copy */}
                <div style={{ flex: isMobile ? '0 0 auto' : '0 1 520px', width: isMobile ? '100%' : 'auto' }}>
                    <motion.h1
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
                        style={{
                            ...h1Style,
                            margin: isMobile ? '0 0 0.75rem' : '0 0 1.5rem',
                            filter: 'drop-shadow(0 0 20px rgba(0,212,255,0.3))'
                        }}
                    >
                        Economics
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
                            color: 'rgba(223,228,225,0.72)',
                            lineHeight: 1.85,
                            fontWeight: 300,
                            maxWidth: '520px',
                            margin: '0 0 2rem'
                        }}
                    >
                        The Juvantia economy is built on transparency, ownership rights, and the concept of programmable money. 
                        These are pure market mechanisms designed for the operation of your Robulus.
                    </motion.p>
                </div>

                {/* Right: Hero image */}
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
                            src="/images/economics.png"
                            alt="Juvantia Economics"
                            style={{
                                width: '100%',
                                height: 'auto',
                                display: 'block',
                                objectFit: 'cover',
                            }}
                        />
                        <div style={{
                            position: 'absolute', inset: 0,
                            background: 'linear-gradient(to top, rgba(5,10,9,0.5) 0%, transparent 50%)',
                            pointerEvents: 'none',
                        }} />
                        <ScannerCorners />
                    </div>
                </motion.div>
            </section>

            <NeonDivider />

            {/* ══════════════════ EURO Only ══════════════════ */}
            <section style={{
                padding: isMobile ? '1.5rem 1.25rem 4rem' : '8rem 3rem',
                maxWidth: '1280px',
                margin: '0 auto',
            }}>
                <FadeIn>
                    <h2 style={sectionH2BaseStyle}>
                        EURO <span style={gradientSpanStyle}>Only</span>
                    </h2>
                </FadeIn>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {/* BLOCK 1: Symbols + Intro */}
                    <FadeIn style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: isMobile ? '4rem' : '7rem' }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '3rem',
                            marginBottom: '2.5rem',
                        }}>
                            {/* Big € symbol */}
                            <div style={{
                                fontFamily: "'Cinzel', serif",
                                fontSize: isMobile ? '4.5rem' : '6rem',
                                fontWeight: 700,
                                lineHeight: 0.85,
                                color: '#00FF88',
                                textShadow: '0 0 60px rgba(0,255,136,0.3), 0 0 120px rgba(0,255,136,0.1)',
                                letterSpacing: '-0.04em',
                            }}>
                                €
                            </div>

                            <div style={{ width: '2px', height: '80px', background: 'rgba(0,255,136,0.15)' }} />

                            <div>
                                <img
                                    src="/images/67116d0daddc92483c813398_primary-logo-darkbg.svg"
                                    alt="Circle"
                                    style={{ height: isMobile ? '4rem' : '5.5rem', display: 'block', opacity: 0.95 }}
                                />
                            </div>
                        </div>

                        <p style={{
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontSize: '1.15rem',
                            color: 'rgba(185,203,185,0.85)',
                            lineHeight: 1.85,
                            fontWeight: 300,
                            textAlign: 'center',
                            maxWidth: '750px',
                            margin: 0,
                        }}>
                            The entire technopark economy operates on electronic money by Circle, expressed in EURO. 
                            This is the only currency supported across the entire Juvantia infrastructure.
                        </p>
                    </FadeIn>

                    {/* BLOCK 2: Wallet + No Spam Policy */}
                    <FadeIn delay={0.15} style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div style={{ position: 'relative', width: '100%', maxWidth: '560px', marginBottom: '3rem' }}>
                            <div style={{
                                position: 'relative',
                                border: '1px solid rgba(0,255,136,0.15)',
                                background: 'rgba(5,10,9,0.4)',
                                overflow: 'hidden',
                                boxShadow: '0 20px 50px rgba(0,0,0,0.5), 0 0 60px rgba(0,255,136,0.08)'
                            }}>
                                <img
                                    src="/images/wallet.png"
                                    alt="Unified Wallet"
                                    style={{ width: '100%', height: 'auto', display: 'block' }}
                                />
                                <div style={{
                                    position: 'absolute', inset: 0,
                                    background: 'linear-gradient(135deg, rgba(0,255,136,0.03) 0%, transparent 60%)',
                                    pointerEvents: 'none',
                                }} />
                                <ScannerCorners />
                            </div>
                            
                            {/* Decorative ambient glow under the wallet */}
                            <div style={{
                                position: 'absolute',
                                bottom: '-2.5rem',
                                left: '15%',
                                right: '15%',
                                height: '1px',
                                background: 'linear-gradient(90deg, transparent, rgba(0,255,136,0.4), transparent)',
                                filter: 'blur(3px)'
                            }} />
                        </div>

                        <p style={{
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontSize: '1.05rem',
                            color: 'rgba(185,203,185,0.6)',
                            lineHeight: 1.85,
                            fontWeight: 300,
                            textAlign: 'center',
                            maxWidth: '750px',
                            margin: 0,
                        }}>
                            No other tokens are allowed, displayed in the interfaces, or can be used. 
                            This completely eliminates financial spam and keeps a 100% focus on real economic roles.
                        </p>
                    </FadeIn>
                </div>
            </section>

            <NeonDivider />

            {/* ══════════════════ PROGRAMMABLE ECONOMY ══════════════════ */}
            <section style={{
                padding: isMobile ? '1.5rem 1.25rem 4rem' : '8rem 3rem',
                maxWidth: '1280px',
                margin: '0 auto',
            }}>
                <FadeIn>
                    <h2 style={sectionH2BaseStyle}>
                        Programmable <span style={gradientSpanStyle}>Economy</span>
                    </h2>
                    <p style={sectionDescStyle}>
                        The financial system is powered by EVM smart contracts. This technology turns regular money into programmable code, 
                        automating settlements and economic interactions between Robulus units.
                    </p>
                </FadeIn>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                    gap: '1.5rem',
                    marginTop: isMobile ? '3rem' : '5rem'
                }}>
                    {[
                        {
                            title: 'City Contracts',
                            desc: 'Ready-to-use Juvantia infrastructure contracts that support the core processes of the park. Settlements, leases, and service payments, all automated.',
                            accent: '#00FF88',
                        },
                        {
                            title: 'Custom Contracts',
                            desc: 'An open environment for creating your own EVM contracts. Program unique interactions between Robulus units and shape entirely new economic niches.',
                            accent: '#00D4FF',
                        },
                    ].map((card, i) => (
                        <FadeIn key={i} delay={i * 0.12}>
                            <div style={{
                                padding: '2.5rem',
                                background: 'rgba(18,29,27,0.9)',
                                border: `1px solid ${card.accent}18`,
                                position: 'relative',
                                height: '100%',
                                boxSizing: 'border-box',
                                transition: 'border-color 0.3s ease',
                            }}>
                                <div style={{
                                    position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                                    background: `linear-gradient(90deg, transparent, ${card.accent}80, transparent)`,
                                }} />

                                <h3 style={{
                                    fontFamily: "'Space Grotesk', sans-serif",
                                    fontSize: '1.25rem',
                                    fontWeight: 700,
                                    letterSpacing: '0.05em',
                                    textTransform: 'uppercase',
                                    color: '#dfe4e1',
                                    marginBottom: '1.25rem',
                                }}>{card.title}</h3>

                                <p style={{
                                    fontFamily: "'Space Grotesk', sans-serif",
                                    fontSize: '0.95rem',
                                    color: 'rgba(185,203,185,0.65)',
                                    lineHeight: 1.8,
                                    fontWeight: 300,
                                    margin: 0,
                                }}>{card.desc}</p>

                                <ScannerCorners color={`${card.accent}30`} size={12} />
                            </div>
                        </FadeIn>
                    ))}
                </div>
            </section>

            <NeonDivider />

            {/* ══════════════════ ASSET PROTECTION ══════════════════ */}
            <section style={{
                padding: isMobile ? '1.5rem 1.25rem 4rem' : '8rem 3rem',
                maxWidth: '1280px',
                margin: '0 auto',
            }}>
                <FadeIn>
                    <h2 style={sectionH2BaseStyle}>
                        Absolute Asset <span style={gradientSpanStyle}>Protection</span>
                    </h2>
                    <p style={sectionDescStyle}>
                        Your assets are registered on the blockchain but are managed intuitively, just like in a classic banking app.
                    </p>
                </FadeIn>

                <FadeIn style={{ marginTop: isMobile ? '3rem' : '5rem' }}>
                    <div style={{
                        padding: isMobile ? '2.5rem 2rem' : '3.5rem 4rem',
                        background: 'rgba(10,15,12,0.95)',
                        border: '1px solid rgba(255,71,87,0.15)',
                        position: 'relative',
                        display: 'grid',
                        gridTemplateColumns: isMobile ? '1fr' : 'auto 1fr',
                        gap: isMobile ? '2rem' : '4rem',
                        alignItems: 'center',
                    }}>
                        <div style={{
                            width: isMobile ? '72px' : '96px',
                            height: isMobile ? '72px' : '96px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '1px solid rgba(255,71,87,0.25)',
                            background: 'rgba(255,71,87,0.06)',
                            flexShrink: 0,
                        }}>
                            <svg 
                                viewBox="0 0 58.999 58.999" 
                                width={isMobile ? '40' : '54'} 
                                height={isMobile ? '40' : '54'} 
                                fill="#FF4757"
                            >
                                <g>
                                    <path d="M29.083,26.038c-0.53,0.154-0.836,0.708-0.683,1.239c0.027,0.093,2.697,9.591,1.962,30.687c-0.02,0.553,0.412,1.016,0.964,1.034c0.012,0.001,0.024,0.001,0.036,0.001c0.536,0,0.979-0.425,0.998-0.965c0.747-21.414-1.925-30.919-2.038-31.313C30.169,26.19,29.616,25.888,29.083,26.038z"/>
                                    <path d="M54.228,16.479C49.992,6.469,40.232,0,29.362,0c-3.587,0-7.085,0.701-10.396,2.083c-1.834,0.765-3.567,1.675-5.151,2.704c-0.463,0.302-0.595,0.921-0.294,1.384c0.302,0.463,0.922,0.595,1.384,0.294c1.483-0.964,3.108-1.817,4.831-2.536C22.803,2.648,26.041,2,29.362,2c10.064,0,19.102,5.989,23.023,15.259c1.63,3.854,2.511,10.95,2.891,14.838c0.051,0.517,0.485,0.902,0.994,0.902c0.032,0,0.065-0.002,0.099-0.005c0.549-0.054,0.951-0.543,0.897-1.093C56.789,27.015,55.875,20.372,54.228,16.479z"/>
                                    <path d="M10.851,9.711c0.394-0.387,0.397-1.021,0.01-1.414c-0.387-0.393-1.02-0.397-1.414-0.01C4.069,13.585-1.288,23.438,3.73,40.284c0.129,0.435,0.526,0.715,0.958,0.715c0.094,0,0.19-0.014,0.285-0.042c0.529-0.157,0.831-0.714,0.673-1.243C1.899,27.132,3.698,16.758,10.851,9.711z"/>
                                    <path d="M30.13,6.014c-3.06-0.119-6.038,0.432-8.853,1.606C11.471,11.711,6.257,22.494,9.15,32.704c0.289,1.021,0.585,2.107,0.744,3.189c0.358,2.449,0.377,6.956,0.377,14.105c0,0.553,0.447,1,1,1s1-0.447,1-1c0-7.458-0.019-11.804-0.398-14.396c-0.176-1.202-0.491-2.36-0.799-3.444c-2.617-9.236,2.1-18.992,10.973-22.693c2.548-1.063,5.259-1.546,8.012-1.454C37.17,8.267,45.23,14.535,47.661,21.7c2.104,6.199,2.122,16.76,1.861,26.271c-0.015,0.552,0.421,1.012,0.973,1.027c0.542-0.01,1.012-0.419,1.027-0.973c0.265-9.689,0.238-20.471-1.967-26.969C46.838,13.049,38.124,6.3,30.13,6.014z"/>
                                    <path d="M29.362,12c-1.087,0-2.169,0.117-3.218,0.349c-0.539,0.119-0.88,0.652-0.761,1.192c0.119,0.539,0.646,0.873,1.192,0.761c0.907-0.2,1.845-0.302,2.786-0.302c5.233,0,9.933,3.114,11.972,7.935c2.43,5.74,2.589,14.953,2.028,31.029c-0.02,0.552,0.412,1.016,0.964,1.034c0.012,0.001,0.024,0.001,0.036,0.001c0.536,0,0.979-0.425,0.998-0.965c0.584-16.723,0.406-25.758-2.185-31.879C40.823,15.594,35.401,12,29.362,12z"/>
                                    <path d="M21.935,16.337c0.452-0.317,0.562-0.941,0.244-1.393c-0.316-0.452-0.941-0.563-1.393-0.244c-5.15,3.616-7.388,10.563-5.565,17.295c0.021,0.073,2.051,7.462,2.051,19.004c0,0.553,0.447,1,1,1s1-0.447,1-1c0-11.813-2.038-19.232-2.123-19.535C15.548,25.55,17.472,19.471,21.935,16.337z"/>
                                    <path d="M39.272,48.006c0.004-0.553-0.44-1.003-0.993-1.007c-0.002,0-0.005,0-0.007,0c-0.549,0-0.996,0.443-1,0.993c-0.005,0.752,0.02,1.85,0.047,3.036c0.039,1.725,0.083,3.68,0.04,4.937c-0.02,0.552,0.412,1.015,0.965,1.033c0.012,0.001,0.023,0.001,0.035,0.001c0.536,0,0.979-0.425,0.998-0.966c0.046-1.313,0.001-3.299-0.039-5.051C39.291,49.82,39.267,48.743,39.272,48.006z"/>
                                    <path d="M29.362,19c-1.062,0-2.098,0.208-3.081,0.618c-3.892,1.624-5.783,6.015-4.4,10.214c0.754,2.289,1.391,14.272,1.391,26.167c0,0.553,0.447,1,1,1s1-0.447,1-1c0-10.707-0.57-23.995-1.49-26.792c-1.054-3.197,0.353-6.526,3.27-7.743C27.789,21.156,28.566,21,29.362,21c2.415,0,4.584,1.438,5.529,3.67c1.867,4.419,2.422,12.419,2.558,18.353c0.013,0.544,0.458,0.977,1,0.977c0.007,0,0.016,0,0.023,0c0.552-0.013,0.989-0.471,0.977-1.023c-0.141-6.106-0.726-14.375-2.72-19.093C35.475,20.917,32.583,19,29.362,19z"/>
                                </g>
                            </svg>
                        </div>

                        <div>
                            <h3 style={{
                                fontFamily: "'Space Grotesk', sans-serif",
                                fontSize: '1.15rem',
                                fontWeight: 700,
                                letterSpacing: '0.12em',
                                textTransform: 'uppercase',
                                color: '#dfe4e1',
                                marginBottom: '1rem',
                            }}>
                                Biometric Control
                            </h3>
                            <p style={{
                                fontFamily: "'Space Grotesk', sans-serif",
                                fontSize: '1rem',
                                color: 'rgba(185,203,185,0.7)',
                                lineHeight: 1.85,
                                fontWeight: 300,
                                margin: 0,
                            }}>
                                Any asset transfer, lease, or service payment requires physical confirmation through your personal device's biometrics (FaceID/TouchID). 
                                The infrastructure completely blocks unauthorized access — it is impossible to intercept control of your funds.
                            </p>
                        </div>

                        <div style={{
                            position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                            background: 'linear-gradient(90deg, transparent, rgba(255,71,87,0.5), transparent)',
                        }} />

                        <ScannerCorners color="rgba(255,71,87,0.4)" />
                    </div>
                </FadeIn>
            </section>

            <NeonDivider />

            {/* ══════════════════ ONBOARDING CTA ══════════════════ */}
            <section style={{
                padding: isMobile ? '1.5rem 1.25rem 8rem' : '8rem 3rem 12rem',
                maxWidth: '900px',
                margin: '0 auto',
            }}>
                <FadeIn>
                    <h2 style={{ ...sectionH2BaseStyle, textAlign: 'center' }}>
                        Experience the Economy <span style={gradientSpanStyle}>Now</span>
                    </h2>
                    <p style={sectionDescStyle}>
                        The testing environment is open to everyone. Explore the transaction logic and digital infrastructure in the testnet without any real investments.
                    </p>
                </FadeIn>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: isMobile ? '3rem' : '4rem' }}>
                    {[
                        {
                            step: '01',
                            label: 'Enter City',
                            text: <>Access the City interface at{' '}<a href="https://city.juvantia.org" target="_blank" rel="noopener noreferrer" style={{ color: '#00FF88', textDecoration: 'none', borderBottom: '1px solid rgba(0,255,136,0.3)' }}>city.juvantia.org</a>{' '}to find your deposit address.</>,
                        },
                        {
                            step: '02',
                            label: 'Get Test EURC',
                            text: <>Get test EURC at{' '}<a href="https://faucet.circle.com" target="_blank" rel="noopener noreferrer" style={{ color: '#00FF88', textDecoration: 'none', borderBottom: '1px solid rgba(0,255,136,0.3)' }}>faucet.circle.com</a>{' '}to fund your address and start exploring the economy.</>,
                        },
                        {
                            step: '03',
                            label: 'Visit Trade Hub',
                            text: <>Explore the <a href="https://city.juvantia.org/trade" target="_blank" rel="noopener noreferrer" style={{ color: '#00FF88', textDecoration: 'none', borderBottom: '1px solid rgba(0,255,136,0.3)' }}>Trade Hub</a> section. Different asset shares are listed there—you can buy shares and later sell them at a higher price as the value of that specific asset grows.</>,
                        },
                    ].map((item, idx) => (
                        <FadeIn key={idx} delay={idx * 0.1}>
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'auto auto 1fr',
                                gap: '1.5rem',
                                alignItems: 'start',
                                padding: '1.75rem 2rem',
                                background: 'rgba(10,15,12,0.95)',
                                border: '1px solid rgba(0,255,136,0.1)',
                                position: 'relative',
                            }}>
                                <div style={{
                                    fontFamily: "'Cinzel', serif",
                                    fontSize: '0.75rem',
                                    fontWeight: 600,
                                    color: '#00FF88',
                                    letterSpacing: '0.1em',
                                    opacity: 0.5,
                                    paddingTop: '2px',
                                    whiteSpace: 'nowrap',
                                }}>{item.step}</div>

                                <div style={{
                                    width: '1px',
                                    alignSelf: 'stretch',
                                    background: 'rgba(0,255,136,0.1)',
                                }} />

                                <div>
                                    <div style={{
                                        fontFamily: "'Space Grotesk', sans-serif",
                                        fontSize: '0.65rem',
                                        letterSpacing: '0.25em',
                                        textTransform: 'uppercase',
                                        color: '#00FF88',
                                        marginBottom: '0.5rem',
                                        opacity: 0.7,
                                    }}>{item.label}</div>
                                    <div style={{
                                        fontFamily: "'Space Grotesk', sans-serif",
                                        fontSize: '0.95rem',
                                        color: '#dfe4e1',
                                        lineHeight: 1.7,
                                        fontWeight: 300,
                                    }}>{item.text}</div>
                                </div>

                                <ScannerCorners size={10} color="rgba(0,255,136,0.2)" />
                            </div>
                        </FadeIn>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Economics;
