import React, { useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import CursorGlow from '../components/CursorGlow';

// --- Reusable Components ---

const SectionDivider: React.FC = () => (
    <div style={{
        width: '100%',
        height: '1px',
        background: 'linear-gradient(90deg, transparent 0%, rgba(0, 255, 136, 0.3) 50%, transparent 100%)',
        margin: '0'
    }} />
);

const GlassCard: React.FC<{
    children: React.ReactNode;
    style?: React.CSSProperties;
    hoverEffect?: boolean;
}> = ({ children, style, hoverEffect = true }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            whileHover={hoverEffect ? { y: -6, scale: 1.01 } : {}}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            style={{
                background: 'linear-gradient(135deg, rgba(15, 31, 23, 0.8) 0%, rgba(10, 15, 10, 0.9) 100%)',
                backdropFilter: 'blur(20px)',
                border: `1px solid ${isHovered ? 'rgba(0, 255, 136, 0.4)' : 'rgba(0, 255, 136, 0.12)'}`,
                borderRadius: '20px',
                padding: '2rem',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: isHovered
                    ? '0 0 40px rgba(0, 255, 136, 0.15), 0 20px 60px rgba(0, 0, 0, 0.4)'
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
                background: 'linear-gradient(90deg, transparent, rgba(0, 255, 136, 0.5), transparent)',
                opacity: isHovered ? 1 : 0,
                transition: 'opacity 0.4s ease'
            }} />
            {children}
        </motion.div>
    );
};

const ImageCard: React.FC<{
    src: string;
    alt: string;
    aspectRatio?: string;
}> = ({ src, alt, aspectRatio = '16/9' }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            style={{
                borderRadius: '24px',
                overflow: 'hidden',
                border: `1px solid ${isHovered ? 'rgba(0, 255, 136, 0.4)' : 'rgba(0, 255, 136, 0.15)'}`,
                boxShadow: isHovered
                    ? '0 0 50px rgba(0, 255, 136, 0.2), 0 30px 80px rgba(0, 0, 0, 0.5)'
                    : '0 20px 60px rgba(0, 0, 0, 0.4)',
                transition: 'border-color 0.5s ease, box-shadow 0.5s ease',
                aspectRatio,
                position: 'relative'
            }}
        >
            <img
                src={src}
                alt={alt}
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block'
                }}
            />
            <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(10, 15, 10, 0.6), transparent 50%)',
                pointerEvents: 'none'
            }} />
        </motion.div>
    );
};

// --- Tab Components ---

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
    const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' ? window.innerWidth <= 768 : false);

    React.useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Mobile version - horizontal swipe carousel
    if (isMobile) {
        return (
            <div style={{ width: '100%', maxWidth: '100vw', overflow: 'hidden' }}>
                {/* Pills navigation */}
                <div style={{
                    display: 'flex',
                    overflowX: 'auto',
                    scrollSnapType: 'x mandatory',
                    gap: '0.5rem',
                    padding: '0 1rem 1rem',
                    marginBottom: '1.5rem',
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                }}>
                    <style>{`.roles-pills::-webkit-scrollbar { display: none; }`}</style>
                    {roles.map((role) => (
                        <motion.button
                            key={role.id}
                            onClick={() => setSelectedRole(role)}
                            whileTap={{ scale: 0.95 }}
                            style={{
                                flexShrink: 0,
                                scrollSnapAlign: 'start',
                                padding: '0.6rem 1rem',
                                background: selectedRole.id === role.id
                                    ? 'linear-gradient(135deg, rgba(0, 255, 136, 0.2) 0%, rgba(0, 212, 255, 0.1) 100%)'
                                    : 'rgba(10, 15, 10, 0.6)',
                                color: selectedRole.id === role.id ? 'var(--color-primary)' : 'var(--color-text-muted)',
                                border: `1px solid ${selectedRole.id === role.id ? 'rgba(0, 255, 136, 0.4)' : 'rgba(0, 255, 136, 0.1)'}`,
                                borderRadius: '20px',
                                fontSize: '0.75rem',
                                cursor: 'pointer',
                                fontFamily: 'var(--font-heading)',
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em',
                                whiteSpace: 'nowrap',
                                boxShadow: selectedRole.id === role.id ? '0 0 15px rgba(0, 255, 136, 0.2)' : 'none'
                            }}
                        >
                            {role.label}
                        </motion.button>
                    ))}
                </div>

                {/* Content Card */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={selectedRole.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        style={{ padding: '0 1rem' }}
                    >
                        <ImageCard src={selectedRole.image} alt={selectedRole.label} aspectRatio="3/2" />
                        <div style={{ marginTop: '1.5rem' }}>
                            <h3 style={{
                                fontSize: '1.4rem',
                                background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                marginBottom: '0.75rem',
                                fontWeight: 400
                            }}>
                                {selectedRole.label}
                            </h3>
                            <p style={{
                                fontSize: '0.95rem',
                                color: 'var(--color-text-muted)',
                                lineHeight: '1.7',
                                fontWeight: 300
                            }}>
                                {selectedRole.description}
                            </p>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        );
    }

    // Desktop version - original layout
    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(250px, 300px) minmax(300px, 450px)',
            gap: '3rem',
            width: '100%',
            maxWidth: '900px',
            alignItems: 'start',
            justifyContent: 'center'
        }}>
            {/* Tabs List */}
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.25rem',
                background: 'rgba(10, 15, 10, 0.5)',
                borderRadius: '16px',
                padding: '0.5rem',
                border: '1px solid rgba(0, 255, 136, 0.1)'
            }}>
                {roles.map((role) => (
                    <motion.button
                        key={role.id}
                        onClick={() => setSelectedRole(role)}
                        whileHover={{ x: selectedRole.id === role.id ? 0 : 4 }}
                        style={{
                            padding: '1rem 1.5rem',
                            textAlign: 'left',
                            background: selectedRole.id === role.id
                                ? 'linear-gradient(90deg, rgba(0, 255, 136, 0.15) 0%, transparent 100%)'
                                : 'transparent',
                            color: selectedRole.id === role.id ? 'var(--color-primary)' : 'var(--color-text-muted)',
                            border: 'none',
                            borderLeft: `2px solid ${selectedRole.id === role.id ? 'var(--color-primary)' : 'transparent'}`,
                            fontSize: '0.95rem',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            fontFamily: 'var(--font-heading)',
                            textTransform: 'uppercase',
                            letterSpacing: '0.08em',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            borderRadius: '0 12px 12px 0',
                            boxShadow: selectedRole.id === role.id ? '0 0 20px rgba(0, 255, 136, 0.1)' : 'none'
                        }}
                    >
                        <span>{role.label}</span>
                        {selectedRole.id === role.id && (
                            <motion.span
                                layoutId="roleIndicator"
                                style={{
                                    width: '6px',
                                    height: '6px',
                                    borderRadius: '50%',
                                    background: 'var(--color-primary)',
                                    boxShadow: '0 0 10px var(--color-primary)'
                                }}
                            />
                        )}
                    </motion.button>
                ))}
            </div>

            {/* Content Area */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={selectedRole.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                    style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '400px' }}
                >
                    <ImageCard src={selectedRole.image} alt={selectedRole.label} aspectRatio="3/2" />
                    <div>
                        <h3 style={{
                            fontSize: '1.6rem',
                            background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            marginBottom: '0.75rem',
                            fontWeight: 400
                        }}>
                            {selectedRole.label}
                        </h3>
                        <p style={{
                            fontSize: '1rem',
                            color: 'var(--color-text-muted)',
                            lineHeight: '1.7',
                            fontWeight: 300
                        }}>
                            {selectedRole.description}
                        </p>
                    </div>
                </motion.div>
            </AnimatePresence>
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
    const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' ? window.innerWidth <= 768 : false);

    React.useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Mobile version - horizontal swipe carousel
    if (isMobile) {
        return (
            <div style={{ width: '100%', maxWidth: '100vw', overflow: 'hidden' }}>
                {/* Pills navigation */}
                <div style={{
                    display: 'flex',
                    overflowX: 'auto',
                    scrollSnapType: 'x mandatory',
                    gap: '0.5rem',
                    padding: '0 1rem 1rem',
                    marginBottom: '1.5rem',
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                }}>
                    {domusTypes.map((domus) => (
                        <motion.button
                            key={domus.id}
                            onClick={() => setSelectedDomus(domus)}
                            whileTap={{ scale: 0.95 }}
                            style={{
                                flexShrink: 0,
                                scrollSnapAlign: 'start',
                                padding: '0.6rem 1rem',
                                background: selectedDomus.id === domus.id
                                    ? 'linear-gradient(135deg, rgba(0, 255, 136, 0.2) 0%, rgba(0, 212, 255, 0.1) 100%)'
                                    : 'rgba(10, 15, 10, 0.6)',
                                color: selectedDomus.id === domus.id ? 'var(--color-primary)' : 'var(--color-text-muted)',
                                border: `1px solid ${selectedDomus.id === domus.id ? 'rgba(0, 255, 136, 0.4)' : 'rgba(0, 255, 136, 0.1)'}`,
                                borderRadius: '20px',
                                fontSize: '0.75rem',
                                cursor: 'pointer',
                                fontFamily: 'var(--font-heading)',
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em',
                                whiteSpace: 'nowrap',
                                boxShadow: selectedDomus.id === domus.id ? '0 0 15px rgba(0, 255, 136, 0.2)' : 'none'
                            }}
                        >
                            {domus.label}
                        </motion.button>
                    ))}
                </div>

                {/* Content Card */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={selectedDomus.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        style={{ padding: '0 1rem' }}
                    >
                        <ImageCard src={selectedDomus.image} alt={selectedDomus.label} aspectRatio="3/2" />
                        <div style={{ marginTop: '1.5rem' }}>
                            <h3 style={{
                                fontSize: '1.4rem',
                                background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                marginBottom: '0.75rem',
                                fontWeight: 400
                            }}>
                                {selectedDomus.label}
                            </h3>
                            <p style={{
                                fontSize: '0.95rem',
                                color: 'var(--color-text-muted)',
                                lineHeight: '1.7',
                                fontWeight: 300
                            }}>
                                {selectedDomus.description}
                            </p>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        );
    }

    // Desktop version - original layout
    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(300px, 450px) minmax(250px, 300px)',
            gap: '3rem',
            width: '100%',
            maxWidth: '900px',
            alignItems: 'start',
            justifyContent: 'center'
        }}>
            {/* Content Area */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={selectedDomus.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                    style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '450px' }}
                >
                    <ImageCard src={selectedDomus.image} alt={selectedDomus.label} aspectRatio="3/2" />
                    <div>
                        <h3 style={{
                            fontSize: '1.6rem',
                            background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            marginBottom: '0.75rem',
                            fontWeight: 400
                        }}>
                            {selectedDomus.label}
                        </h3>
                        <p style={{
                            fontSize: '1rem',
                            color: 'var(--color-text-muted)',
                            lineHeight: '1.7',
                            fontWeight: 300
                        }}>
                            {selectedDomus.description}
                        </p>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Tabs List */}
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.25rem',
                background: 'rgba(10, 15, 10, 0.5)',
                borderRadius: '16px',
                padding: '0.5rem',
                border: '1px solid rgba(0, 255, 136, 0.1)'
            }}>
                {domusTypes.map((domus) => (
                    <motion.button
                        key={domus.id}
                        onClick={() => setSelectedDomus(domus)}
                        whileHover={{ x: selectedDomus.id === domus.id ? 0 : -4 }}
                        style={{
                            padding: '1rem 1.5rem',
                            textAlign: 'right',
                            background: selectedDomus.id === domus.id
                                ? 'linear-gradient(-90deg, rgba(0, 255, 136, 0.15) 0%, transparent 100%)'
                                : 'transparent',
                            color: selectedDomus.id === domus.id ? 'var(--color-primary)' : 'var(--color-text-muted)',
                            border: 'none',
                            borderRight: `2px solid ${selectedDomus.id === domus.id ? 'var(--color-primary)' : 'transparent'}`,
                            fontSize: '0.95rem',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            fontFamily: 'var(--font-heading)',
                            textTransform: 'uppercase',
                            letterSpacing: '0.08em',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flexDirection: 'row-reverse',
                            borderRadius: '12px 0 0 12px',
                            boxShadow: selectedDomus.id === domus.id ? '0 0 20px rgba(0, 255, 136, 0.1)' : 'none'
                        }}
                    >
                        <span>{domus.label}</span>
                        {selectedDomus.id === domus.id && (
                            <motion.span
                                layoutId="domusIndicator"
                                style={{
                                    width: '6px',
                                    height: '6px',
                                    borderRadius: '50%',
                                    background: 'var(--color-primary)',
                                    boxShadow: '0 0 10px var(--color-primary)'
                                }}
                            />
                        )}
                    </motion.button>
                ))}
            </div>
        </div>
    );
};

// --- Main Component ---

const Home: React.FC = () => {
    const { scrollY } = useScroll();
    const heroImageY = useTransform(scrollY, [0, 600], [0, 150]);
    const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
    const heroScale = useTransform(scrollY, [0, 400], [1, 1.1]);
    const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' ? window.innerWidth <= 768 : false);

    React.useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <>
            {/* Cursor Glow Effect */}
            <CursorGlow size={350} opacity={0.12} />

            {/* Ambient Glow - Mobile Dark Mode Pulse */}
            {isMobile && <div className="ambient-glow" />}

            {/* ===== HERO SECTION ===== */}
            <section style={{
                position: 'relative',
                height: '100vh',
                width: '100%',
                marginTop: '-80px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                overflow: 'hidden'
            }}>
                {/* Background Image with Parallax */}
                <motion.div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundImage: 'url(/images/hero_city.png)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        y: heroImageY,
                        scale: heroScale
                    }}
                />

                {/* Dark Overlay */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to bottom, rgba(10, 15, 10, 0.7) 0%, rgba(10, 15, 10, 0.85) 100%)',
                    zIndex: 1
                }} />

                {/* Top Gradient Accent */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '400px',
                    background: 'radial-gradient(ellipse at 50% 0%, rgba(0, 255, 136, 0.08) 0%, transparent 70%)',
                    zIndex: 2,
                    pointerEvents: 'none'
                }} />

                {/* Hero Content */}
                <motion.div style={{ opacity: heroOpacity, zIndex: 3, maxWidth: '1000px', padding: '0 2rem' }}>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
                        style={{
                            fontSize: 'clamp(3rem, 9vw, 8rem)',
                            marginBottom: '1.5rem',
                            background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-text) 40%, var(--color-secondary) 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            fontWeight: 400,
                            letterSpacing: '0.25em',
                            paddingLeft: '0.25em',
                            position: 'relative'
                        }}
                    >
                        JUVANTIA
                    </motion.h1>

                    {/* Animated Underline */}
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 0.5, duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                        style={{
                            width: '200px',
                            height: '2px',
                            background: 'linear-gradient(90deg, var(--color-primary), var(--color-secondary))',
                            margin: '0 auto 3rem',
                            boxShadow: '0 0 20px rgba(0, 255, 136, 0.5)',
                            transformOrigin: 'center'
                        }}
                    />

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 1 }}
                        style={{
                            fontSize: 'clamp(1rem, 2vw, 1.4rem)',
                            color: 'var(--color-text)',
                            lineHeight: '1.8',
                            fontWeight: 300,
                            maxWidth: '700px',
                            margin: '0 auto'
                        }}
                    >
                        A technopark of teleoperated mini-robots,
                        <br />
                        <span style={{ color: 'var(--color-text-muted)' }}>
                            with no humans on site and a closed internal economy.
                        </span>
                    </motion.p>
                </motion.div>

                {/* Scroll Indicator - Hidden on mobile */}
                {!isMobile && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.6 }}
                        transition={{ delay: 1.2 }}
                        style={{
                            position: 'absolute',
                            bottom: '3rem',
                            zIndex: 3,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '1rem'
                        }}
                    >
                        <motion.div
                            animate={{ y: [0, 8, 0] }}
                            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                            style={{
                                width: '1px',
                                height: '50px',
                                background: 'linear-gradient(to bottom, transparent, var(--color-primary))'
                            }}
                        />
                        <span style={{
                            fontSize: '0.7rem',
                            letterSpacing: '0.3em',
                            color: 'var(--color-primary)',
                            fontFamily: 'var(--font-heading)'
                        }}>
                            SCROLL
                        </span>
                    </motion.div>
                )}
            </section>

            {/* ===== PAX JUVANTIA SECTION ===== */}
            <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                style={{
                    padding: isMobile ? '5rem 1rem' : '10rem 2rem',
                    background: 'var(--color-bg)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center'
                }}
            >
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{
                        fontSize: isMobile ? '1.8rem' : 'clamp(2rem, 5vw, 3.5rem)',
                        marginBottom: '1rem',
                        background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        fontWeight: 400,
                        letterSpacing: isMobile ? '0.1em' : '0.15em'
                    }}
                >
                    Pax Juvantia
                </motion.h2>

                <div className="divider-glow" style={{ marginBottom: isMobile ? '2rem' : '3rem' }} />

                <p style={{
                    fontSize: isMobile ? '1.1rem' : '1.3rem',
                    maxWidth: '700px',
                    color: 'var(--color-text-muted)',
                    lineHeight: '1.8',
                    marginBottom: isMobile ? '3rem' : '5rem',
                    fontWeight: 300,
                    padding: isMobile ? '0 0.5rem' : 0
                }}>
                    In Juvantia, the Law is absolute.{' '}
                    <br />
                    <span style={{ color: 'var(--color-primary)', fontStyle: 'italic' }}>
                        Dura lex, sed lex.
                    </span>
                </p>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: isMobile ? '1.5rem' : '2rem',
                    maxWidth: '800px',
                    width: '100%',
                    padding: isMobile ? '0 1rem' : 0
                }}>
                    <a href="https://tabularium.juvantia.org/lex/constitutio" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                        <GlassCard style={{ height: '100%', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '3rem 2rem' }}>
                            <h3 style={{ color: 'var(--color-primary)', fontSize: isMobile ? '1.4rem' : '1.8rem', marginBottom: '1rem', fontWeight: 500, letterSpacing: '0.05em' }}>
                                Constitution
                            </h3>
                            <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem', lineHeight: '1.6' }}>
                                The foundation of our society.
                            </p>
                        </GlassCard>
                    </a>

                    <a href="https://tabularium.juvantia.org/lex/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                        <GlassCard style={{ height: '100%', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '3rem 2rem' }}>
                            <h3 style={{ color: 'var(--color-primary)', fontSize: isMobile ? '1.4rem' : '1.8rem', marginBottom: '1rem', fontWeight: 500, letterSpacing: '0.05em' }}>
                                Laws
                            </h3>
                            <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem', lineHeight: '1.6' }}>
                                The rules we live by.
                            </p>
                        </GlassCard>
                    </a>
                </div>
            </motion.section>

            <SectionDivider />

            {/* ===== POWER & PROTECTION SECTION ===== */}
            <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                style={{
                    padding: isMobile ? '5rem 1rem' : '10rem 2rem',
                    background: 'linear-gradient(135deg, var(--color-bg) 0%, var(--color-bg-elevated) 100%)',
                    display: 'flex',
                    justifyContent: 'center'
                }}
            >
                <div style={{
                    display: 'flex',
                    flexDirection: isMobile ? 'column' : 'row',
                    gap: isMobile ? '2rem' : '6rem',
                    maxWidth: '1200px',
                    width: '100%',
                    alignItems: 'center'
                }}>
                    <motion.div
                        initial={{ opacity: 0, x: isMobile ? 0 : -40, y: isMobile ? 20 : 0 }}
                        whileInView={{ opacity: 1, x: 0, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        style={{ width: isMobile ? '100%' : '50%' }}
                    >
                        <ImageCard src="/images/charging_station.png" alt="Charging Station" aspectRatio="4/3" />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: isMobile ? 0 : 40, y: isMobile ? 20 : 0 }}
                        whileInView={{ opacity: 1, x: 0, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        style={{ width: isMobile ? '100%' : '50%' }}
                    >
                        <h2 style={{
                            fontSize: isMobile ? '1.8rem' : 'clamp(2rem, 4vw, 2.8rem)',
                            marginBottom: '1.5rem',
                            fontWeight: 400
                        }}>
                            Power &{' '}
                            <span style={{
                                background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent'
                            }}>
                                Protection
                            </span>
                        </h2>
                        <p style={{
                            fontSize: isMobile ? '1rem' : '1.15rem',
                            color: 'var(--color-text-muted)',
                            lineHeight: '1.8',
                            marginBottom: '2rem',
                            fontWeight: 300
                        }}>
                            You can receive charging via Pogo Pin Magnetic, 4P.
                        </p>

                        <GlassCard style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                            <div style={{
                                fontSize: isMobile ? '2rem' : '2.5rem',
                                width: isMobile ? '56px' : '70px',
                                height: isMobile ? '56px' : '70px',
                                borderRadius: '16px',
                                background: 'rgba(0, 255, 136, 0.1)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0
                            }}>
                                ⚡
                            </div>
                            <div>
                                <h4 style={{ color: 'var(--color-text)', marginBottom: '0.5rem', fontSize: isMobile ? '1.05rem' : '1.2rem', fontWeight: 500, textTransform: 'none' }}>
                                    Universal Energy
                                </h4>
                                <p style={{ fontSize: isMobile ? '0.9rem' : '0.95rem', color: 'var(--color-text-muted)', lineHeight: '1.6' }}>
                                    Standardized 24V charging infrastructure available city-wide.
                                </p>
                            </div>
                        </GlassCard>
                    </motion.div>
                </div>
            </motion.section>

            <SectionDivider />

            {/* ===== ECONOMY SECTION ===== */}
            <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                style={{
                    padding: isMobile ? '5rem 1rem' : '10rem 2rem',
                    background: 'var(--color-bg)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
            >
                <div style={{ maxWidth: '1000px', width: '100%', textAlign: 'center', marginBottom: isMobile ? '3rem' : '5rem' }}>
                    <h2 style={{
                        fontSize: isMobile ? '1.8rem' : 'clamp(2rem, 4vw, 2.8rem)',
                        marginBottom: '1.5rem',
                        background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        fontWeight: 400
                    }}>
                        The Economy
                    </h2>
                    <p style={{
                        fontSize: isMobile ? '1.1rem' : '1.3rem',
                        color: 'var(--color-text-muted)',
                        lineHeight: '1.8',
                        fontWeight: 300,
                        maxWidth: '800px',
                        margin: '0 auto'
                    }}>
                        Juvantia runs a real, closed economy: all value is created by participants and stays inside the City.
                    </p>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
                    gap: '2rem',
                    maxWidth: '1200px',
                    width: '100%'
                }}>
                    <GlassCard style={{ height: '100%', padding: '2.5rem 2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <h3 style={{ color: 'var(--color-primary)', fontSize: '1.4rem', fontWeight: 500, marginBottom: '0.5rem' }}>City Budget</h3>
                        <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.7', fontSize: '1rem' }}>
                            All payments — land sales, services, fees and taxes — go into a single public budget and are spent only on Juvantia’s development: infrastructure, services, events and new districts.
                        </p>
                    </GlassCard>

                    <GlassCard style={{ height: '100%', padding: '2.5rem 2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <h3 style={{ color: 'var(--color-primary)', fontSize: '1.4rem', fontWeight: 500, marginBottom: '0.5rem' }}>CITIZENS FIRST</h3>
                        <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.7', fontSize: '1rem' }}>
                            Individual participants do not pay any fees to the operator directly.
                        </p>
                        <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.7', fontSize: '1rem' }}>
                            Operational revenue is earned only from commercial companies that use the technopark as an R&D, testing or marketing platform.
                        </p>
                    </GlassCard>

                    <GlassCard style={{ height: '100%', padding: '2.5rem 2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <h3 style={{ color: 'var(--color-primary)', fontSize: '1.4rem', fontWeight: 500, marginBottom: '0.5rem' }}>Free Economy</h3>
                        <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.7', fontSize: '1rem' }}>
                            Prices, salaries and projects are defined by citizens and businesses themselves. The City provides rules, justice and infrastructure — everything else is driven by entrepreneurial initiative.
                        </p>
                    </GlassCard>
                </div>

                <div style={{
                    marginTop: '5rem',
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                    gap: isMobile ? '3rem' : '4rem',
                    maxWidth: '1200px',
                    width: '100%',
                    alignItems: 'center'
                }}>
                    {/* Left Side: Logos */}
                    <GlassCard style={{
                        padding: isMobile ? '1.5rem' : '3rem',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '2rem',
                        background: 'linear-gradient(135deg, rgba(10, 15, 10, 0.6) 0%, rgba(0, 255, 136, 0.05) 100%)',
                        border: '1px solid rgba(0, 255, 136, 0.15)'
                    }}>
                        <h3 style={{
                            color: 'var(--color-primary)',
                            fontSize: '1.2rem',
                            letterSpacing: '0.1em',
                            marginBottom: '1rem',
                            textAlign: 'center',
                            fontFamily: 'var(--font-heading)'
                        }}>
                            EURO-PEGGED STABLECOINS
                        </h3>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(4, 1fr)',
                            gap: isMobile ? '0.5rem' : '1.5rem',
                            justifyItems: 'center',
                            alignItems: 'center',
                            width: '100%'
                        }}>
                            {[
                                { id: 'EURC', url: 'https://www.circle.com/eurc' },
                                { id: 'EURS', url: 'https://eurs.stasis.net/' },
                                { id: 'EURQ', url: 'https://www.quantoz.com/products/eurq-usdq' },
                                { id: 'EUROe', url: 'https://www.euroe.com/' }
                            ].map(token => (
                                <motion.a
                                    key={token.id}
                                    href={token.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.1 }}
                                    style={{
                                        position: 'relative',
                                        width: isMobile ? '45px' : '60px',
                                        height: isMobile ? '45px' : '60px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        textDecoration: 'none',
                                        cursor: 'pointer'
                                    }}
                                >
                                    {/* Green Glow Behind */}
                                    <div style={{
                                        position: 'absolute',
                                        inset: -10,
                                        background: 'radial-gradient(circle, rgba(0, 255, 136, 0.2) 0%, transparent 70%)',
                                        borderRadius: '50%',
                                        filter: 'blur(10px)'
                                    }} />
                                    <motion.img
                                        src={`/images/${token.id}.svg`}
                                        alt={token.id}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            position: 'relative',
                                            zIndex: 1,
                                            filter: 'drop-shadow(0 0 8px rgba(0, 255, 136, 0.3))'
                                        }}
                                        whileHover={{
                                            filter: 'drop-shadow(0 0 20px rgba(0, 255, 136, 0.6))'
                                        }}
                                        transition={{ duration: 0.3 }}
                                    />
                                </motion.a>
                            ))}
                        </div>
                    </GlassCard>

                    {/* Right Side: Text */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <p style={{
                            fontSize: isMobile ? '1.1rem' : '1.25rem',
                            color: 'var(--color-text)',
                            lineHeight: '1.8',
                            fontWeight: 300
                        }}>
                            Juvantia’s monetary layer is based on euro-pegged stablecoins issued under the EU <a href="https://www.esma.europa.eu/esmas-activities/digital-finance-and-innovation/markets-crypto-assets-regulation-mica" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)', textDecoration: 'none', borderBottom: '1px solid rgba(0,255,136,0.3)' }}>MiCA</a> regulatory framework.
                        </p>
                        <p style={{
                            fontSize: isMobile ? '1rem' : '1.1rem',
                            color: 'var(--color-text-muted)',
                            lineHeight: '1.7'
                        }}>
                            The City Treasury operates only with regulated EUR stablecoins such as:
                        </p>
                        <ul style={{
                            listStyle: 'none',
                            padding: 0,
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: '0.8rem'
                        }}>
                            {['EURC', 'EURS', 'EURQ', 'EUROe'].map(item => (
                                <li key={item} style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.8rem',
                                    color: 'var(--color-primary)',
                                    fontSize: '1.1rem',
                                    fontWeight: 500
                                }}>
                                    <span style={{ width: '8px', height: '8px', background: 'var(--color-primary)', borderRadius: '50%', boxShadow: '0 0 10px var(--color-primary)' }} />
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <p style={{
                            fontSize: isMobile ? '1rem' : '1.1rem',
                            color: 'var(--color-text-muted)',
                            lineHeight: '1.7'
                        }}>
                            Taxes, fees and budget operations are settled in these assets, which gives the technopark a clear, euro-denominated economic base.
                        </p>
                    </div>
                </div>
            </motion.section>

            <SectionDivider />

            {/* ===== POLITICS SECTION ===== */}
            <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                style={{
                    padding: isMobile ? '5rem 1rem' : '10rem 2rem',
                    background: 'linear-gradient(135deg, var(--color-bg-elevated) 0%, var(--color-bg) 100%)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
            >
                <div style={{ maxWidth: '1000px', width: '100%', textAlign: 'center', marginBottom: isMobile ? '3rem' : '5rem' }}>
                    <h2 style={{
                        fontSize: isMobile ? '1.8rem' : 'clamp(2rem, 4vw, 2.8rem)',
                        marginBottom: '1.5rem',
                        background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        fontWeight: 400
                    }}>
                        Res Publica
                    </h2>
                </div>

                <div style={{
                    display: 'flex',
                    flexDirection: isMobile ? 'column' : 'row',
                    gap: isMobile ? '3rem' : '6rem',
                    maxWidth: '1200px',
                    width: '100%',
                    alignItems: 'flex-start'
                }}>
                    {/* Left Column: Text */}
                    <motion.div
                        initial={{ opacity: 0, x: isMobile ? 0 : -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        style={{ width: isMobile ? '100%' : '50%', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
                    >
                        <p style={{ fontSize: isMobile ? '1.1rem' : '1.25rem', color: 'var(--color-text)', lineHeight: '1.8', fontWeight: 300 }}>
                            Politics in Juvantia is not a simulation. It is a real republic where citizens choose their leaders and laws.
                        </p>
                        <p style={{ fontSize: isMobile ? '1rem' : '1.1rem', color: 'var(--color-text-muted)', lineHeight: '1.8' }}>
                            Every citizen has the right — and the responsibility — to take part in public life: to vote, propose changes, or stand for office.
                        </p>
                        <p style={{ fontSize: isMobile ? '1rem' : '1.1rem', color: 'var(--color-text-muted)', lineHeight: '1.8' }}>
                            Two branches of power guide the City’s fate: the Consul and the Senatus.
                        </p>

                        <div style={{ marginTop: '1rem' }}>
                            <p style={{
                                fontSize: isMobile ? '1.1rem' : '1.2rem',
                                color: 'var(--color-primary)',
                                fontWeight: 500,
                                lineHeight: '1.6'
                            }}>
                                You have the right to stand for election — and shape Juvantia’s future.
                            </p>
                        </div>
                    </motion.div>

                    {/* Right Column: Blocks */}
                    <motion.div
                        initial={{ opacity: 0, x: isMobile ? 0 : 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        style={{ width: isMobile ? '100%' : '50%', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
                    >
                        <GlassCard style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '2rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{ fontSize: '2rem' }}>👑</div>
                                <h3 style={{ color: 'var(--color-text)', fontSize: '1.4rem', fontWeight: 500 }}>Consul</h3>
                            </div>
                            <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.7' }}>
                                The elected head of the executive branch. Leads the city administration, develops infrastructure and services, and executes the budget approved by the Senate.
                            </p>
                        </GlassCard>

                        <GlassCard style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '2rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{ fontSize: '2rem' }}>🏛️</div>
                                <h3 style={{ color: 'var(--color-text)', fontSize: '1.4rem', fontWeight: 500 }}>Senatus</h3>
                            </div>
                            <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.7' }}>
                                Eight elected senators debate and pass the laws that everyone must follow. They appoint <strong>Custodia Juvantiae</strong> — the civic guard that protects order, comfort and property in the City, accountable only to the Senatus.
                            </p>
                        </GlassCard>
                    </motion.div>
                </div>
            </motion.section>

            <SectionDivider />

            {/* ===== COLOSSEUM SECTION ===== */}
            <section style={{
                position: 'relative',
                padding: isMobile ? '5rem 1rem' : '10rem 2rem',
                background: 'linear-gradient(rgba(10, 15, 10, 0.92), rgba(10, 15, 10, 0.88)), url(/images/colosseum_arena.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: isMobile ? 'scroll' : 'fixed',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                borderTop: '1px solid rgba(255, 71, 87, 0.2)',
                borderBottom: '1px solid rgba(255, 71, 87, 0.2)'
            }}>
                {/* Red glow overlay */}
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: isMobile ? '300px' : '600px',
                    height: isMobile ? '300px' : '600px',
                    background: 'radial-gradient(circle, rgba(255, 71, 87, 0.08) 0%, transparent 60%)',
                    pointerEvents: 'none'
                }} />

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{ position: 'relative', zIndex: 1, maxWidth: '1200px', width: '100%' }}
                >
                    <h2 style={{
                        fontSize: isMobile ? '2rem' : 'clamp(2.5rem, 6vw, 4rem)',
                        marginBottom: '0.5rem',
                        background: 'linear-gradient(135deg, #ff4757 0%, #ffa502 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        letterSpacing: isMobile ? '0.1em' : '0.2em',
                        fontWeight: 400
                    }}>
                        The Colosseum
                    </h2>
                    <p style={{
                        fontSize: isMobile ? '1rem' : '1.2rem',
                        color: 'var(--color-text-muted)',
                        fontStyle: 'italic',
                        letterSpacing: '0.15em',
                        marginBottom: isMobile ? '2rem' : '4rem'
                    }}>
                        The Arena Without Law
                    </p>

                    <p style={{
                        fontSize: isMobile ? '1rem' : '1.2rem',
                        maxWidth: '700px',
                        margin: isMobile ? '0 auto 3rem' : '0 auto 5rem',
                        lineHeight: '1.8',
                        color: 'var(--color-text)',
                        fontWeight: 300,
                        padding: isMobile ? '0 0.5rem' : 0
                    }}>
                        A three-storey concrete fortress for robotic duels. Different channels, different formats — one goal: <span style={{
                            background: 'linear-gradient(135deg, #ff4757 0%, #ffa502 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            fontWeight: 600
                        }}>claim the Winners’ Room and keep control of the Colosseum.</span>
                    </p>

                    {/* Mobile: Horizontal scroll | Desktop: Grid */}
                    <div style={isMobile ? {
                        display: 'flex',
                        overflowX: 'auto',
                        scrollSnapType: 'x mandatory',
                        gap: '1rem',
                        padding: '0.5rem 0',
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                        width: '100%'
                    } : {
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: '1.5rem',
                        width: '100%',
                        maxWidth: '1000px',
                        margin: '0 auto'
                    }}>
                        <style>{`.colosseum-scroll::-webkit-scrollbar { display: none; }`}</style>

                        <div style={isMobile ? { flexShrink: 0, width: '280px', scrollSnapAlign: 'start' } : { height: '100%' }}>
                            <GlassCard style={{
                                background: 'rgba(255, 71, 87, 0.08)',
                                border: '1px solid rgba(255, 71, 87, 0.25)',
                                textAlign: 'center',
                                padding: isMobile ? '1.5rem 1.25rem' : '2rem 1.5rem',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }} hoverEffect={!isMobile}>
                                <h4 style={{ color: '#ff4757', marginBottom: '1rem', fontSize: isMobile ? '1.1rem' : '1.2rem', fontWeight: 500, textTransform: 'uppercase' }}>
                                    KING OF THE HILL
                                </h4>
                                <p style={{ color: 'var(--color-text-muted)', fontSize: isMobile ? '0.85rem' : '0.9rem', lineHeight: '1.7' }}>
                                    Reach the Winners’ Room, take over the arena’s power grid and hold your position against all challengers.
                                </p>
                            </GlassCard>
                        </div>

                        <div style={isMobile ? { flexShrink: 0, width: '280px', scrollSnapAlign: 'start' } : { height: '100%' }}>
                            <GlassCard style={{
                                background: 'rgba(255, 165, 2, 0.08)',
                                border: '1px solid rgba(255, 165, 2, 0.25)',
                                textAlign: 'center',
                                padding: isMobile ? '1.5rem 1.25rem' : '2rem 1.5rem',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }} hoverEffect={!isMobile}>
                                <h4 style={{ color: '#ffa502', marginBottom: '1rem', fontSize: isMobile ? '1.1rem' : '1.2rem', fontWeight: 500, textTransform: 'uppercase' }}>
                                    THE PRIZE
                                </h4>
                                <p style={{ color: 'var(--color-text-muted)', fontSize: isMobile ? '0.85rem' : '0.9rem', lineHeight: '1.7' }}>
                                    Free energy for the champion: 3 permanent Charging Connects plus a weekly payout.
                                </p>
                            </GlassCard>
                        </div>

                        <div style={isMobile ? { flexShrink: 0, width: '280px', scrollSnapAlign: 'start' } : { height: '100%' }}>
                            <GlassCard style={{
                                background: 'rgba(255, 71, 87, 0.08)',
                                border: '1px solid rgba(255, 71, 87, 0.25)',
                                textAlign: 'center',
                                padding: isMobile ? '1.5rem 1.25rem' : '2rem 1.5rem',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }} hoverEffect={!isMobile}>
                                <h4 style={{ color: '#ff4757', marginBottom: '1rem', fontSize: isMobile ? '1.1rem' : '1.2rem', fontWeight: 500, textTransform: 'uppercase' }}>
                                    THE VOICE
                                </h4>
                                <p style={{ color: 'var(--color-text-muted)', fontSize: isMobile ? '0.85rem' : '0.9rem', lineHeight: '1.7' }}>
                                    Your own broadcast tower: exclusive access to the Colosseum screen and speakers to stream your content to the City.
                                </p>
                            </GlassCard>
                        </div>
                    </div>

                    {/* 3D Simulation CTA */}
                    <div style={{
                        marginTop: isMobile ? '3rem' : '5rem',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '1.5rem',
                        padding: '0 1rem'
                    }}>
                        <p style={{
                            fontSize: isMobile ? '1rem' : '1.2rem',
                            color: 'var(--color-text)',
                            fontWeight: 300,
                            maxWidth: '600px'
                        }}>
                            Explore the 3D simulation of the Colosseum to see how the arena actually works.
                        </p>
                        <motion.a
                            href="https://colosseum.juvantia.org"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            style={{
                                display: 'inline-block',
                                padding: '1rem 2rem',
                                background: 'linear-gradient(135deg, #ff4757 0%, #ffa502 100%)',
                                borderRadius: '30px',
                                color: 'white',
                                textDecoration: 'none',
                                fontSize: '1rem',
                                fontWeight: 600,
                                letterSpacing: '0.05em',
                                boxShadow: '0 4px 20px rgba(255, 71, 87, 0.4)',
                                border: '1px solid rgba(255, 255, 255, 0.2)'
                            }}
                        >
                            View 3D Simulation
                        </motion.a>
                    </div>
                </motion.div>
            </section>

            <SectionDivider />

            {/* ===== ROLES SECTION ===== */}
            <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                style={{
                    padding: isMobile ? '5rem 0' : '10rem 2rem',
                    background: 'var(--color-bg)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
            >
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{
                        fontSize: isMobile ? '1.6rem' : 'clamp(2rem, 5vw, 3rem)',
                        marginBottom: '1rem',
                        background: 'linear-gradient(135deg, var(--color-text) 0%, var(--color-primary) 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        fontWeight: 400,
                        letterSpacing: '0.1em',
                        padding: isMobile ? '0 1rem' : 0,
                        textAlign: 'center'
                    }}
                >
                    Choose Your Path
                </motion.h2>
                <div className="divider-glow" style={{ marginBottom: isMobile ? '2rem' : '5rem' }} />
                <RolesTabs />
            </motion.section>

            <SectionDivider />

            {/* ===== DOMUS SECTION ===== */}
            <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                style={{
                    padding: isMobile ? '5rem 0' : '10rem 2rem',
                    background: 'linear-gradient(180deg, var(--color-bg) 0%, var(--color-bg-elevated) 100%)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
            >
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{
                        fontSize: isMobile ? '1.6rem' : 'clamp(2rem, 5vw, 3rem)',
                        marginBottom: '1rem',
                        background: 'linear-gradient(135deg, var(--color-text) 0%, var(--color-primary) 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        fontWeight: 400,
                        letterSpacing: '0.1em',
                        padding: isMobile ? '0 1rem' : 0,
                        textAlign: 'center'
                    }}
                >
                    Build Your Domus
                </motion.h2>
                <div className="divider-glow" style={{ marginBottom: isMobile ? '2rem' : '5rem' }} />
                <DomusTabs />
            </motion.section>

            <SectionDivider />

            {/* ===== FOOTER CTA SECTION ===== */}
            <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                style={{
                    padding: isMobile ? '6rem 1.5rem' : '12rem 2rem',
                    background: 'radial-gradient(ellipse at center, rgba(0, 255, 136, 0.03) 0%, var(--color-bg) 60%)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    position: 'relative'
                }}
            >
                <motion.h2
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="gradient-text-animated"
                    style={{
                        fontSize: isMobile ? '2.2rem' : 'clamp(3rem, 8vw, 6rem)',
                        marginBottom: '2rem',
                        letterSpacing: isMobile ? '0.1em' : '0.2em',
                        fontWeight: 400
                    }}
                >
                    Lex Est Rex
                </motion.h2>

                <div style={{
                    width: isMobile ? '100px' : '150px',
                    height: '2px',
                    background: 'linear-gradient(90deg, transparent, var(--color-primary), var(--color-secondary), transparent)',
                    margin: '0 auto 3rem',
                    boxShadow: '0 0 20px rgba(0, 255, 136, 0.4)'
                }} />

                <p style={{
                    fontSize: isMobile ? '1rem' : 'clamp(1.1rem, 2vw, 1.5rem)',
                    maxWidth: '800px',
                    color: 'var(--color-text-muted)',
                    fontStyle: 'italic',
                    lineHeight: '1.8',
                    fontWeight: 300
                }}>
                    "All you have to do is follow the law...
                    <br />
                    <span style={{ color: 'var(--color-primary)' }}>
                        or manage to stay outside of it, if you can."
                    </span>
                </p>
            </motion.section>
        </>
    );
};

export default Home;
