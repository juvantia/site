import React, { useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

// --- Components ---

const Section: React.FC<{ children: React.ReactNode; className?: string; style?: React.CSSProperties; id?: string }> = ({ children, className, style, id }) => (
    <motion.section
        id={id}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        className={className}
        style={{
            padding: '8rem 2rem',
            minHeight: '80vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            ...style
        }}
    >
        {children}
    </motion.section>
);

const GlassCard: React.FC<{ children: React.ReactNode; style?: React.CSSProperties; className?: string }> = ({ children, style, className }) => (
    <motion.div
        className={className}
        whileHover={{ y: -8, scale: 1.02 }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        style={{
            background: 'rgba(255, 255, 255, 0.02)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(212, 175, 55, 0.15)',
            borderRadius: '24px',
            padding: '2.5rem',
            boxShadow: '0 10px 40px rgba(0,0,0,0.4)',
            position: 'relative',
            overflow: 'hidden',
            ...style
        }}
        onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.4)';
            e.currentTarget.style.boxShadow = '0 20px 60px rgba(212, 175, 55, 0.2)';
        }}
        onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.15)';
            e.currentTarget.style.boxShadow = '0 10px 40px rgba(0,0,0,0.4)';
        }}
    >
        <div style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '200px',
            height: '200px',
            background: 'radial-gradient(circle, rgba(212, 175, 55, 0.08) 0%, transparent 70%)',
            pointerEvents: 'none'
        }} />
        {children}
    </motion.div>
);

const RolesTabs: React.FC = () => {
    const roles = [
        { id: 'builder', label: 'Builder', description: 'Construct the foundations of Juvantia. Architects of the physical realm.', image: '/images/BUI.png' },
        { id: 'deliverer', label: 'Deliverer', description: 'The lifeblood of the city. Transporting energy and resources where they are needed most.', image: '/images/DEL.png' },
        { id: 'bounty_hunter', label: 'Bounty Hunter', description: 'Enforce contracts. When words fail, you are the consequence.', image: '/images/BH.png' },
        { id: 'insurer', label: 'Insurer', description: 'Risk is inevitable. You make it manageable. Protect the assets of the elite.', image: '/images/IN.png' },
        { id: 'fighter', label: 'Fighter', description: 'Glory in the Colosseum. Credits in the bank. A legend in the making.', image: '/images/FI.png' },
        { id: 'bodyguard', label: 'Bodyguard', description: 'The ultimate shield. Your presence alone deters threats.', image: '/images/BD.png' },
        { id: 'engineer', label: 'Engineer', description: 'Maintain the machines that maintain the city. The technical wizards.', image: '/images/ING.png' },
        { id: 'custom', label: 'Whatever You Wish', description: 'Carve your own niche. If the economy needs it, you can become it.', image: '/images/ANY.png' },
    ];

    const [selectedRole, setSelectedRole] = useState(roles[0]);

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem', justifyContent: 'center', width: '100%', maxWidth: '1400px' }}>
            {/* Tabs List */}
            <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {roles.map((role) => (
                    <motion.button
                        key={role.id}
                        onClick={() => setSelectedRole(role)}
                        whileHover={{ x: selectedRole.id === role.id ? 0 : 10 }}
                        transition={{ duration: 0.2 }}
                        style={{
                            padding: '1.5rem 2rem',
                            textAlign: 'left',
                            background: selectedRole.id === role.id
                                ? 'linear-gradient(90deg, rgba(212, 175, 55, 0.15) 0%, transparent 100%)'
                                : 'rgba(255, 255, 255, 0.02)',
                            color: selectedRole.id === role.id ? 'var(--color-accent)' : 'var(--color-text-muted)',
                            borderLeft: `3px solid ${selectedRole.id === role.id ? 'var(--color-accent)' : 'transparent'}`,
                            borderTop: 'none',
                            borderRight: 'none',
                            borderBottom: 'none',
                            fontSize: '1.1rem',
                            cursor: 'pointer',
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            fontFamily: 'var(--font-heading)',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                            borderRadius: '12px 0 0 12px'
                        }}
                    >
                        <span style={{ flex: 1 }}>{role.label}</span>
                        {selectedRole.id === role.id && (
                            <motion.span
                                layoutId="roleArrow"
                                style={{ fontSize: '0.8em' }}
                                transition={{ duration: 0.3 }}
                            >
                                →
                            </motion.span>
                        )}
                    </motion.button>
                ))}
            </div>

            {/* Image & Description Area */}
            <div style={{ flex: '1 1 500px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={selectedRole.id}
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 1.05, y: -20 }}
                        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}
                    >
                        <div style={{
                            width: '100%',
                            maxWidth: '450px',
                            aspectRatio: '1/1',
                            background: 'radial-gradient(circle at center, rgba(212, 175, 55, 0.1) 0%, transparent 70%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '2.5rem',
                            borderRadius: '50%',
                            border: '1px solid rgba(212, 175, 55, 0.15)',
                            boxShadow: '0 0 80px rgba(212, 175, 55, 0.15)',
                            position: 'relative',
                            overflow: 'hidden'
                        }}>
                            <div style={{
                                position: 'absolute',
                                inset: 0,
                                background: `conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(212, 175, 55, 0.1) 90deg, transparent 180deg)`,
                                animation: 'rotate 20s linear infinite'
                            }} />
                            <img
                                src={selectedRole.image}
                                alt={selectedRole.label}
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                    borderRadius: '12px',
                                    filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.6))',
                                    transition: 'filter 0.3s ease',
                                    position: 'relative',
                                    zIndex: 1
                                }}
                            />
                        </div>
                        <h3 style={{
                            fontSize: '2.5rem',
                            background: 'linear-gradient(135deg, var(--color-accent) 0%, var(--color-text) 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            marginBottom: '1.5rem',
                            fontWeight: 300,
                            letterSpacing: '-0.01em'
                        }}>
                            {selectedRole.label}
                        </h3>
                        <p style={{
                            fontSize: '1.2rem',
                            textAlign: 'center',
                            color: 'var(--color-text-muted)',
                            maxWidth: '500px',
                            lineHeight: '1.8',
                            fontWeight: 300
                        }}>
                            {selectedRole.description}
                        </p>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

const DomusTabs: React.FC = () => {
    const domusTypes = [
        { id: 'workshop', label: 'Workshop', description: 'The heart of industry. A space for crafting, repairing, and upgrading Robulus units to peak performance.', image: '/images/WOR.png' },
        { id: 'apartments', label: 'Robulus Apartments', description: 'Efficient, secure housing for your workforce. A rested Robulus is a productive Robulus.', image: '/images/RA.png' },
        { id: 'shop', label: 'Spare Parts Shop', description: 'Commerce in its purest form. A hub for trading essential components and energy cells.', image: '/images/SPS.png' },
        { id: 'club', label: 'Private Club', description: 'Where deals are made. An exclusive gathering place for networking, leisure, and influence.', image: '/images/CLUB.png' },
    ];

    const [selectedDomus, setSelectedDomus] = useState(domusTypes[0]);

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem', justifyContent: 'center', width: '100%', maxWidth: '1400px', flexDirection: 'row-reverse' }}>
            {/* Tabs List */}
            <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {domusTypes.map((domus) => (
                    <motion.button
                        key={domus.id}
                        onClick={() => setSelectedDomus(domus)}
                        whileHover={{ x: selectedDomus.id === domus.id ? 0 : -10 }}
                        transition={{ duration: 0.2 }}
                        style={{
                            padding: '1.5rem 2rem',
                            textAlign: 'right',
                            background: selectedDomus.id === domus.id
                                ? 'linear-gradient(-90deg, rgba(212, 175, 55, 0.15) 0%, transparent 100%)'
                                : 'rgba(255, 255, 255, 0.02)',
                            color: selectedDomus.id === domus.id ? 'var(--color-accent)' : 'var(--color-text-muted)',
                            borderRight: `3px solid ${selectedDomus.id === domus.id ? 'var(--color-accent)' : 'transparent'}`,
                            borderTop: 'none',
                            borderLeft: 'none',
                            borderBottom: 'none',
                            fontSize: '1.1rem',
                            cursor: 'pointer',
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            fontFamily: 'var(--font-heading)',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            display: 'flex',
                            flexDirection: 'row-reverse',
                            alignItems: 'center',
                            gap: '1rem',
                            borderRadius: '0 12px 12px 0'
                        }}
                    >
                        <span style={{ flex: 1 }}>{domus.label}</span>
                        {selectedDomus.id === domus.id && (
                            <motion.span
                                layoutId="domusArrow"
                                style={{ fontSize: '0.8em' }}
                                transition={{ duration: 0.3 }}
                            >
                                ←
                            </motion.span>
                        )}
                    </motion.button>
                ))}
            </div>

            {/* Image & Description Area */}
            <div style={{ flex: '1 1 500px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={selectedDomus.id}
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 30 }}
                        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}
                    >
                        <div style={{
                            width: '100%',
                            maxWidth: '600px',
                            aspectRatio: '16/9',
                            overflow: 'hidden',
                            borderRadius: '24px',
                            border: '1px solid rgba(212, 175, 55, 0.2)',
                            marginBottom: '2.5rem',
                            position: 'relative',
                            boxShadow: '0 30px 80px rgba(0,0,0,0.6)'
                        }}>
                            <img
                                src={selectedDomus.image}
                                alt={selectedDomus.label}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                }}
                            />
                            <div style={{
                                position: 'absolute',
                                inset: 0,
                                background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent 60%)'
                            }} />
                        </div>
                        <h3 style={{
                            fontSize: '2.5rem',
                            background: 'linear-gradient(135deg, var(--color-accent) 0%, var(--color-text) 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            marginBottom: '1.5rem',
                            fontWeight: 300,
                            letterSpacing: '-0.01em'
                        }}>
                            {selectedDomus.label}
                        </h3>
                        <p style={{
                            fontSize: '1.2rem',
                            textAlign: 'center',
                            color: 'var(--color-text-muted)',
                            maxWidth: '500px',
                            lineHeight: '1.8',
                            fontWeight: 300
                        }}>
                            {selectedDomus.description}
                        </p>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

const Home: React.FC = () => {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const opacityHero = useTransform(scrollY, [0, 400], [1, 0]);

    return (
        <>
            {/* Hero Section */}
            <div style={{
                position: 'relative',
                height: '100vh',
                width: '100%',
                marginTop: '-80px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                color: 'var(--color-text)',
                overflow: 'hidden'
            }}>
                {/* Animated Background Blobs */}
                <div style={{
                    position: 'absolute',
                    top: '15%',
                    right: '10%',
                    width: '600px',
                    height: '600px',
                    background: 'radial-gradient(circle, rgba(212, 175, 55, 0.15) 0%, transparent 70%)',
                    borderRadius: '50%',
                    filter: 'blur(100px)',
                    animation: 'float 25s ease-in-out infinite',
                    pointerEvents: 'none'
                }} />
                <div style={{
                    position: 'absolute',
                    bottom: '10%',
                    left: '5%',
                    width: '500px',
                    height: '500px',
                    background: 'radial-gradient(circle, rgba(102, 0, 0, 0.2) 0%, transparent 70%)',
                    borderRadius: '50%',
                    filter: 'blur(100px)',
                    animation: 'float 20s ease-in-out infinite reverse',
                    pointerEvents: 'none'
                }} />

                <motion.div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '120%',
                    backgroundImage: 'url(/images/hero_city.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    zIndex: -1,
                    filter: 'brightness(0.3)',
                    y: y1
                }} />

                <motion.div style={{ opacity: opacityHero, zIndex: 1, maxWidth: '90%' }}>
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.9, letterSpacing: '0.1em' }}
                        animate={{ opacity: 1, scale: 1, letterSpacing: '0.25em' }}
                        transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
                        style={{
                            fontSize: 'clamp(3rem, 8vw, 8rem)',
                            marginBottom: '2rem',
                            background: 'linear-gradient(135deg, var(--color-accent) 0%, var(--color-text) 50%, var(--color-accent) 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            fontWeight: 300,
                            position: 'relative'
                        }}
                    >
                        JUVANTIA
                        <div style={{
                            position: 'absolute',
                            bottom: '-10px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: '60%',
                            height: '1px',
                            background: 'linear-gradient(90deg, transparent, var(--color-accent), transparent)'
                        }} />
                    </motion.h1>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 1.2 }}
                    >
                        <p style={{
                            fontSize: 'clamp(1.1rem, 1.5vw, 1.6rem)',
                            maxWidth: '900px',
                            color: 'var(--color-text)',
                            lineHeight: '1.9',
                            margin: '0 auto',
                            fontWeight: 300,
                            letterSpacing: '0.02em'
                        }}>
                            <span style={{
                                background: 'linear-gradient(135deg, var(--color-accent) 0%, var(--color-primary) 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                fontWeight: 400
                            }}>
                                A non-profit technopark without human participation,
                                <br />
                                inspired by the Roman Republic with own real economy and politics.
                            </span>
                        </p>
                    </motion.div>
                </motion.div>

                <motion.div
                    animate={{ y: [0, 12, 0] }}
                    transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                    style={{
                        position: 'absolute',
                        bottom: '3rem',
                        color: 'var(--color-accent)',
                        opacity: 0.6,
                        fontSize: '0.9rem',
                        letterSpacing: '0.2em',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}
                >
                    <div style={{
                        width: '1px',
                        height: '40px',
                        background: 'linear-gradient(to bottom, transparent, var(--color-accent))'
                    }} />
                    SCROLL
                </motion.div>
            </div>

            {/* Concept Section */}
            <Section style={{
                background: 'linear-gradient(to bottom, #0a0a0a, #050505)',
                position: 'relative'
            }}>
                <motion.h2
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    style={{
                        fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                        marginBottom: '1.5rem',
                        background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        letterSpacing: '0.1em',
                        fontWeight: 300
                    }}
                >
                    Pax Juvantia
                </motion.h2>
                <div style={{
                    width: '120px',
                    height: '2px',
                    background: 'linear-gradient(90deg, transparent, var(--color-accent), transparent)',
                    marginBottom: '3.5rem'
                }} />

                <p style={{
                    fontSize: 'clamp(1.2rem, 2vw, 1.5rem)',
                    maxWidth: '900px',
                    textAlign: 'center',
                    lineHeight: '1.9',
                    marginBottom: '5rem',
                    fontWeight: 300,
                    color: 'var(--color-text-muted)'
                }}>
                    In Juvantia, the Law is absolute.{' '}
                    <span style={{
                        color: 'var(--color-accent)',
                        fontStyle: 'italic',
                        fontSize: '1.1em'
                    }}>
                        Dura lex, sed lex.
                    </span>
                    <br />
                    Everyone is equal before it.
                </p>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                    gap: '3rem',
                    maxWidth: '800px',
                    width: '100%',
                    marginBottom: '4rem'
                }}>
                    <a href="https://tabularium.juvantia.org/lex/constitutio" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                        <GlassCard style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%' }}>
                            <div style={{
                                width: '120px',
                                height: '120px',
                                borderRadius: '50%',
                                background: 'radial-gradient(circle, rgba(212, 175, 55, 0.15) 0%, transparent 70%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: '2rem'
                            }}>
                                <img
                                    src="/images/icon_constitution.png"
                                    alt="Constitution"
                                    style={{
                                        width: '80px',
                                        filter: 'drop-shadow(0 0 20px rgba(212, 175, 55, 0.4))'
                                    }}
                                />
                            </div>
                            <h3 style={{
                                color: 'var(--color-accent)',
                                marginBottom: '1rem',
                                fontSize: '1.6rem',
                                fontWeight: 400,
                                letterSpacing: '0.05em'
                            }}>
                                Constitution
                            </h3>
                            <p style={{
                                textAlign: 'center',
                                color: 'var(--color-text-muted)',
                                fontSize: '1rem',
                                lineHeight: '1.6'
                            }}>
                                The foundation of our society.
                            </p>
                        </GlassCard>
                    </a>
                    <a href="https://tabularium.juvantia.org/lex/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                        <GlassCard style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%' }}>
                            <div style={{
                                width: '120px',
                                height: '120px',
                                borderRadius: '50%',
                                background: 'radial-gradient(circle, rgba(212, 175, 55, 0.15) 0%, transparent 70%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: '2rem'
                            }}>
                                <img
                                    src="/images/icon_constitution.png"
                                    alt="Laws"
                                    style={{
                                        width: '80px',
                                        filter: 'drop-shadow(0 0 20px rgba(212, 175, 55, 0.4))'
                                    }}
                                />
                            </div>
                            <h3 style={{
                                color: 'var(--color-accent)',
                                marginBottom: '1rem',
                                fontSize: '1.6rem',
                                fontWeight: 400,
                                letterSpacing: '0.05em'
                            }}>
                                Laws
                            </h3>
                            <p style={{
                                textAlign: 'center',
                                color: 'var(--color-text-muted)',
                                fontSize: '1rem',
                                lineHeight: '1.6'
                            }}>
                                The rules we live by.
                            </p>
                        </GlassCard>
                    </a>
                </div>
            </Section>

            {/* Infrastructure & Protection */}
            <Section style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap: '6rem',
                background: 'linear-gradient(135deg, #0a0a0a 0%, #1a0505 100%)',
                alignItems: 'center'
            }}>
                <div style={{ flex: '1 1 500px', maxWidth: '600px' }}>
                    <motion.div
                        whileHover={{ scale: 1.03 }}
                        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                        style={{
                            borderRadius: '24px',
                            overflow: 'hidden',
                            boxShadow: '0 30px 80px rgba(102, 0, 0, 0.3)',
                            border: '1px solid rgba(102, 0, 0, 0.3)',
                            position: 'relative'
                        }}
                    >
                        <img
                            src="/images/charging_station.png"
                            alt="Standardized Charging Station"
                            style={{ width: '100%', display: 'block' }}
                        />
                        <div style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent 50%)'
                        }} />
                    </motion.div>
                </div>
                <div style={{ flex: '1 1 400px', maxWidth: '600px' }}>
                    <h2 style={{
                        fontSize: 'clamp(2rem, 4vw, 2.8rem)',
                        marginBottom: '2rem',
                        fontWeight: 300,
                        letterSpacing: '-0.01em'
                    }}>
                        Power &{' '}
                        <span style={{
                            background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}>
                            Protection
                        </span>
                    </h2>
                    <p style={{
                        fontSize: '1.25rem',
                        marginBottom: '3rem',
                        lineHeight: '1.9',
                        color: 'var(--color-text-muted)',
                        fontWeight: 300
                    }}>
                        The city is the shield. The safety of every citizen and their Robulus is our paramount priority.
                    </p>
                    <GlassCard style={{
                        padding: '2rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1.5rem'
                    }}>
                        <div style={{
                            fontSize: '3rem',
                            width: '80px',
                            height: '80px',
                            borderRadius: '20px',
                            background: 'rgba(212, 175, 55, 0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            ⚡
                        </div>
                        <div>
                            <h4 style={{
                                color: 'var(--color-text)',
                                marginBottom: '0.5rem',
                                fontSize: '1.4rem',
                                fontWeight: 500
                            }}>
                                Universal Energy
                            </h4>
                            <p style={{
                                fontSize: '1rem',
                                color: 'var(--color-text-muted)',
                                lineHeight: '1.6'
                            }}>
                                Standardized 24V charging infrastructure available city-wide.
                            </p>
                        </div>
                    </GlassCard>
                </div>
            </Section>

            {/* Economy */}
            <Section style={{
                flexDirection: 'row-reverse',
                flexWrap: 'wrap',
                gap: '6rem',
                background: '#0a0a0a',
                alignItems: 'center'
            }}>
                <div style={{ flex: '1 1 500px', maxWidth: '600px' }}>
                    <motion.div
                        whileHover={{ scale: 1.03 }}
                        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                        style={{
                            borderRadius: '24px',
                            overflow: 'hidden',
                            boxShadow: '0 30px 80px rgba(212, 175, 55, 0.3)',
                            border: '1px solid rgba(212, 175, 55, 0.3)',
                            position: 'relative'
                        }}
                    >
                        <img
                            src="/images/ai_bank.png"
                            alt="AI Central Bank"
                            style={{ width: '100%', display: 'block' }}
                        />
                        <div style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent 50%)'
                        }} />
                    </motion.div>
                </div>
                <div style={{ flex: '1 1 400px', maxWidth: '600px' }}>
                    <h2 style={{
                        fontSize: 'clamp(2rem, 4vw, 2.8rem)',
                        marginBottom: '2rem',
                        background: 'linear-gradient(135deg, var(--color-accent) 0%, var(--color-text) 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        fontWeight: 300,
                        letterSpacing: '-0.01em'
                    }}>
                        The Economy
                    </h2>
                    <p style={{
                        fontSize: '1.25rem',
                        lineHeight: '1.9',
                        marginBottom: '2rem',
                        color: 'var(--color-text-muted)',
                        fontWeight: 300
                    }}>
                        The official currency is the{' '}
                        <strong style={{
                            color: 'var(--color-accent)',
                            fontWeight: 500
                        }}>
                            Juvantian Denarius (JVD)
                        </strong>.
                    </p>
                    <p style={{
                        fontSize: '1.15rem',
                        lineHeight: '1.9',
                        marginBottom: '2rem',
                        color: 'var(--color-text-muted)',
                        fontWeight: 300
                    }}>
                        The City maintains its own independent budget, fueled by two primary sources:
                    </p>
                    <ul style={{
                        paddingLeft: '0',
                        marginTop: '1.5rem',
                        listStyleType: 'none',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem'
                    }}>
                        <li style={{
                            padding: '1rem 1.5rem',
                            background: 'rgba(212, 175, 55, 0.05)',
                            borderLeft: '3px solid var(--color-accent)',
                            borderRadius: '0 8px 8px 0',
                            color: 'var(--color-text-muted)'
                        }}>
                            Direct payments and contributions.
                        </li>
                        <li style={{
                            padding: '1rem 1.5rem',
                            background: 'rgba(212, 175, 55, 0.05)',
                            borderLeft: '3px solid var(--color-accent)',
                            borderRadius: '0 8px 8px 0',
                            color: 'var(--color-text-muted)'
                        }}>
                            Taxes on goods and services sold within Juvantia.
                        </li>
                    </ul>
                    <p style={{
                        fontSize: '1.15rem',
                        lineHeight: '1.9',
                        color: 'var(--color-text)',
                        marginTop: '2rem',
                        fontWeight: 300
                    }}>
                        We rely on{' '}
                        <span style={{ color: 'var(--color-accent)', fontWeight: 500 }}>production</span>,{' '}
                        <span style={{ color: 'var(--color-accent)', fontWeight: 500 }}>service</span>, and the tangible value of{' '}
                        <span style={{ color: 'var(--color-accent)', fontWeight: 500 }}>energy</span>.
                        <br />
                        <span style={{ fontStyle: 'italic', color: 'var(--color-text-muted)' }}>
                            A transparent economy for a civilized age.
                        </span>
                    </p>
                </div>
            </Section>

            {/* Politics */}
            <Section style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap: '6rem',
                background: 'linear-gradient(135deg, #1a0505 0%, #0a0a0a 100%)',
                alignItems: 'center'
            }}>
                <div style={{ flex: '1 1 500px', maxWidth: '600px' }}>
                    <motion.div
                        whileHover={{ scale: 1.03 }}
                        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                        style={{
                            borderRadius: '24px',
                            overflow: 'hidden',
                            boxShadow: '0 30px 80px rgba(102, 0, 0, 0.4)',
                            border: '1px solid rgba(102, 0, 0, 0.3)',
                            position: 'relative'
                        }}
                    >
                        <img
                            src="/images/roman_senate_robots.png"
                            alt="Roman Senate Robots"
                            style={{ width: '100%', display: 'block' }}
                        />
                        <div style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent 50%)'
                        }} />
                    </motion.div>
                </div>
                <div style={{ flex: '1 1 400px', maxWidth: '600px' }}>
                    <h2 style={{
                        fontSize: 'clamp(2rem, 4vw, 2.8rem)',
                        marginBottom: '2rem',
                        fontWeight: 300,
                        letterSpacing: '0.05em',
                        color: 'var(--color-text)'
                    }}>
                        Res Publica
                    </h2>
                    <p style={{
                        fontSize: '1.25rem',
                        marginBottom: '2rem',
                        lineHeight: '1.9',
                        color: 'var(--color-text-muted)',
                        fontWeight: 300
                    }}>
                        Politics in Juvantia is not a simulation. It is real.
                        Public offices are elected, and the city lives by the laws adopted by these politicians.
                    </p>
                    <p style={{
                        fontSize: '1.3rem',
                        marginBottom: '3rem',
                        lineHeight: '1.9',
                        color: 'var(--color-accent)',
                        fontStyle: 'italic',
                        fontWeight: 400
                    }}>
                        You have the right to stand for election.
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <GlassCard style={{ padding: '1.5rem 2rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                            <div style={{
                                fontSize: '2.5rem',
                                width: '70px',
                                height: '70px',
                                borderRadius: '16px',
                                background: 'rgba(212, 175, 55, 0.1)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                🏛️
                            </div>
                            <div>
                                <strong style={{
                                    color: 'var(--color-text)',
                                    display: 'block',
                                    marginBottom: '0.5rem',
                                    fontSize: '1.3rem'
                                }}>
                                    Senator
                                </strong>
                                <span style={{ fontSize: '1rem', color: 'var(--color-text-muted)', lineHeight: '1.6' }}>
                                    Debate and pass the laws that govern the city.
                                </span>
                            </div>
                        </GlassCard>
                        <GlassCard style={{ padding: '1.5rem 2rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                            <div style={{
                                fontSize: '2.5rem',
                                width: '70px',
                                height: '70px',
                                borderRadius: '16px',
                                background: 'rgba(212, 175, 55, 0.1)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                👑
                            </div>
                            <div>
                                <strong style={{
                                    color: 'var(--color-text)',
                                    display: 'block',
                                    marginBottom: '0.5rem',
                                    fontSize: '1.3rem'
                                }}>
                                    Consul
                                </strong>
                                <span style={{ fontSize: '1rem', color: 'var(--color-text-muted)', lineHeight: '1.6' }}>
                                    Lead the executive branch and guide the city's future.
                                </span>
                            </div>
                        </GlassCard>
                    </div>
                </div>
            </Section>

            {/* The Colosseum */}
            <Section style={{
                backgroundImage: 'linear-gradient(rgba(0,0,0,0.85), rgba(0,0,0,0.75)), url(/images/colosseum_arena.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed',
                color: 'var(--color-text)',
                textAlign: 'center',
                borderTop: '1px solid rgba(102, 0, 0, 0.3)',
                borderBottom: '1px solid rgba(102, 0, 0, 0.3)',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.5) 100%)',
                    pointerEvents: 'none'
                }} />

                <div style={{ position: 'relative', zIndex: 1 }}>
                    <h2 style={{
                        fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                        marginBottom: '1rem',
                        background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        textTransform: 'uppercase',
                        letterSpacing: '0.2em',
                        fontWeight: 300
                    }}>
                        The Colosseum
                    </h2>
                    <h3 style={{
                        fontSize: 'clamp(1.2rem, 2vw, 1.6rem)',
                        marginBottom: '4rem',
                        color: 'var(--color-text-muted)',
                        fontWeight: 300,
                        letterSpacing: '0.2em',
                        fontStyle: 'italic'
                    }}>
                        The Arena Without Law
                    </h3>

                    <p style={{
                        fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
                        maxWidth: '800px',
                        marginBottom: '5rem',
                        lineHeight: '1.9',
                        fontWeight: 300,
                        margin: '0 auto 5rem'
                    }}>
                        A massive concrete structure, three stories of brutal challenges.
                        Different channels, different paths, one goal:{' '}
                        <strong style={{
                            color: 'var(--color-accent)',
                            fontWeight: 500
                        }}>
                            The Summit
                        </strong>.
                    </p>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '2.5rem',
                        width: '100%',
                        maxWidth: '1200px',
                        margin: '0 auto'
                    }}>
                        <GlassCard style={{
                            background: 'rgba(102, 0, 0, 0.15)',
                            border: '1px solid rgba(102, 0, 0, 0.4)',
                            backdropFilter: 'blur(30px)'
                        }}>
                            <h4 style={{
                                color: 'var(--color-accent)',
                                marginBottom: '1.5rem',
                                fontSize: '1.5rem',
                                fontWeight: 500
                            }}>
                                King of the Hill
                            </h4>
                            <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.7' }}>
                                Reach the Winners' Room and hold your ground against all comers.
                            </p>
                        </GlassCard>
                        <GlassCard style={{
                            background: 'rgba(102, 0, 0, 0.15)',
                            border: '1px solid rgba(102, 0, 0, 0.4)',
                            backdropFilter: 'blur(30px)'
                        }}>
                            <h4 style={{
                                color: 'var(--color-accent)',
                                marginBottom: '1.5rem',
                                fontSize: '1.5rem',
                                fontWeight: 500
                            }}>
                                The Prize
                            </h4>
                            <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.7' }}>
                                3 Charging Connects + Passive Income in JVD.
                            </p>
                        </GlassCard>
                        <GlassCard style={{
                            background: 'rgba(102, 0, 0, 0.15)',
                            border: '1px solid rgba(102, 0, 0, 0.4)',
                            backdropFilter: 'blur(30px)'
                        }}>
                            <h4 style={{
                                color: 'var(--color-accent)',
                                marginBottom: '1.5rem',
                                fontSize: '1.5rem',
                                fontWeight: 500
                            }}>
                                The Voice
                            </h4>
                            <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.7' }}>
                                Exclusive access to the city screen to broadcast your content.
                            </p>
                        </GlassCard>
                    </div>
                </div>
            </Section>

            {/* Roles */}
            <Section style={{ background: '#0a0a0a' }}>
                <h2 style={{
                    fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                    marginBottom: '1.5rem',
                    letterSpacing: '0.05em',
                    fontWeight: 300,
                    background: 'linear-gradient(135deg, var(--color-text) 0%, var(--color-accent) 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                }}>
                    Choose Your Path
                </h2>
                <div style={{
                    width: '100px',
                    height: '2px',
                    background: 'linear-gradient(90deg, transparent, var(--color-primary), transparent)',
                    marginBottom: '5rem'
                }} />
                <RolesTabs />
            </Section>

            {/* Domus Section */}
            <Section style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #050505 100%)' }}>
                <h2 style={{
                    fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                    marginBottom: '1.5rem',
                    letterSpacing: '0.05em',
                    fontWeight: 300,
                    background: 'linear-gradient(135deg, var(--color-text) 0%, var(--color-accent) 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                }}>
                    Build Your Domus
                </h2>
                <div style={{
                    width: '100px',
                    height: '2px',
                    background: 'linear-gradient(90deg, transparent, var(--color-primary), transparent)',
                    marginBottom: '5rem'
                }} />
                <DomusTabs />
            </Section>

            {/* Footer / CTA */}
            <Section style={{
                minHeight: '70vh',
                background: 'radial-gradient(circle at center, #1a0505 0%, #0a0a0a 70%)',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div style={{
                    position: 'absolute',
                    top: '20%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '800px',
                    height: '800px',
                    background: 'radial-gradient(circle, rgba(212, 175, 55, 0.08) 0%, transparent 70%)',
                    borderRadius: '50%',
                    filter: 'blur(100px)',
                    pointerEvents: 'none'
                }} />

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
                    style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}
                >
                    <h2 style={{
                        fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                        marginBottom: '3rem',
                        background: 'linear-gradient(135deg, var(--color-accent) 0%, var(--color-text) 50%, var(--color-accent) 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        letterSpacing: '0.25em',
                        fontWeight: 300
                    }}>
                        Lex Est Rex
                    </h2>
                    <div style={{
                        width: '60%',
                        height: '1px',
                        background: 'linear-gradient(90deg, transparent, var(--color-accent), transparent)',
                        margin: '0 auto 3rem'
                    }} />
                    <p style={{
                        fontSize: 'clamp(1.2rem, 2.5vw, 2rem)',
                        maxWidth: '900px',
                        color: 'var(--color-text-muted)',
                        fontStyle: 'italic',
                        fontWeight: 300,
                        lineHeight: '1.8',
                        margin: '0 auto'
                    }}>
                        "All you have to do is follow the law...
                        <br />
                        <span style={{
                            color: 'var(--color-accent)',
                            fontSize: '0.95em'
                        }}>
                            or manage to stay outside of it, if you can."
                        </span>
                    </p>
                </motion.div>
            </Section>

            <style>
                {`
                    @keyframes float {
                        0%, 100% { transform: translate(0, 0) rotate(0deg); }
                        33% { transform: translate(40px, -40px) rotate(3deg); }
                        66% { transform: translate(-30px, 30px) rotate(-3deg); }
                    }
                    
                    @keyframes rotate {
                        from { transform: rotate(0deg); }
                        to { transform: rotate(360deg); }
                    }
                `}
            </style>
        </>
    );
};

export default Home;
