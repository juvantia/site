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
    const [isMobile, setIsMobile] = useState(false);

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
    const [isMobile, setIsMobile] = useState(false);

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
    const [isMobile, setIsMobile] = useState(false);

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
                            paddingRight: '0.25em',
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
                        A non-profit technopark without human participation,
                        <br />
                        <span style={{ color: 'var(--color-text-muted)' }}>
                            inspired by the Roman Republic with own real economy and politics.
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
                    <span style={{ color: 'var(--color-primary)', fontStyle: 'italic' }}>
                        Dura lex, sed lex.
                    </span>
                    <br />
                    Everyone is equal before it.
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
                        <GlassCard style={{ height: '100%', textAlign: 'center' }}>
                            <div style={{
                                width: isMobile ? '80px' : '100px',
                                height: isMobile ? '80px' : '100px',
                                margin: '0 auto 1.5rem',
                                borderRadius: '50%',
                                background: 'radial-gradient(circle, rgba(0, 255, 136, 0.1) 0%, transparent 70%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <img src="/images/icon_constitution.png" alt="Constitution" style={{ width: isMobile ? '48px' : '60px', filter: 'brightness(1.1)' }} />
                            </div>
                            <h3 style={{ color: 'var(--color-primary)', fontSize: isMobile ? '1.2rem' : '1.4rem', marginBottom: '0.75rem', fontWeight: 500 }}>
                                Constitution
                            </h3>
                            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>
                                The foundation of our society.
                            </p>
                        </GlassCard>
                    </a>

                    <a href="https://tabularium.juvantia.org/lex/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                        <GlassCard style={{ height: '100%', textAlign: 'center' }}>
                            <div style={{
                                width: isMobile ? '80px' : '100px',
                                height: isMobile ? '80px' : '100px',
                                margin: '0 auto 1.5rem',
                                borderRadius: '50%',
                                background: 'radial-gradient(circle, rgba(0, 255, 136, 0.1) 0%, transparent 70%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <img src="/images/laws.png" alt="Laws" style={{ width: isMobile ? '48px' : '60px', filter: 'brightness(1.1)' }} />
                            </div>
                            <h3 style={{ color: 'var(--color-primary)', fontSize: isMobile ? '1.2rem' : '1.4rem', marginBottom: '0.75rem', fontWeight: 500 }}>
                                Laws
                            </h3>
                            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>
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
                        style={{ order: isMobile ? 2 : 1, width: isMobile ? '100%' : '50%' }}
                    >
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
                            fontSize: isMobile ? '1rem' : '1.15rem',
                            color: 'var(--color-text-muted)',
                            lineHeight: '1.8',
                            marginBottom: '1.5rem',
                            fontWeight: 300
                        }}>
                            The official currency is the{' '}
                            <strong style={{ color: 'var(--color-primary)', fontWeight: 500 }}>
                                Juvantian Denarius (JVD)
                            </strong>.
                        </p>
                        <p style={{
                            fontSize: isMobile ? '0.9rem' : '1rem',
                            color: 'var(--color-text-muted)',
                            lineHeight: '1.8',
                            marginBottom: '1.5rem',
                            fontWeight: 300
                        }}>
                            The City maintains its own independent budget:
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
                            <div style={{
                                padding: isMobile ? '0.85rem 1rem' : '1rem 1.25rem',
                                background: 'rgba(0, 255, 136, 0.05)',
                                borderLeft: '2px solid var(--color-primary)',
                                borderRadius: '0 8px 8px 0',
                                color: 'var(--color-text-muted)',
                                fontSize: isMobile ? '0.9rem' : '0.95rem'
                            }}>
                                Direct payments and contributions
                            </div>
                            <div style={{
                                padding: isMobile ? '0.85rem 1rem' : '1rem 1.25rem',
                                background: 'rgba(0, 255, 136, 0.05)',
                                borderLeft: '2px solid var(--color-primary)',
                                borderRadius: '0 8px 8px 0',
                                color: 'var(--color-text-muted)',
                                fontSize: isMobile ? '0.9rem' : '0.95rem'
                            }}>
                                Taxes on goods and services
                            </div>
                        </div>

                        <p style={{ fontSize: isMobile ? '0.9rem' : '1rem', color: 'var(--color-text)', lineHeight: '1.8', fontWeight: 300 }}>
                            We rely on <span style={{ color: 'var(--color-primary)' }}>production</span>,{' '}
                            <span style={{ color: 'var(--color-primary)' }}>service</span>, and the tangible value of{' '}
                            <span style={{ color: 'var(--color-primary)' }}>energy</span>.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: isMobile ? 0 : 40, y: isMobile ? 20 : 0 }}
                        whileInView={{ opacity: 1, x: 0, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        style={{ order: 1, width: isMobile ? '100%' : '50%' }}
                    >
                        <ImageCard src="/images/ai_bank.png" alt="AI Central Bank" aspectRatio="4/3" />
                    </motion.div>
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
                        <ImageCard src="/images/roman_senate_robots.png" alt="Roman Senate Robots" aspectRatio="4/3" />
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
                            fontWeight: 400,
                            color: 'var(--color-text)'
                        }}>
                            Res Publica
                        </h2>
                        <p style={{
                            fontSize: isMobile ? '1rem' : '1.15rem',
                            color: 'var(--color-text-muted)',
                            lineHeight: '1.8',
                            marginBottom: '1.5rem',
                            fontWeight: 300
                        }}>
                            Politics in Juvantia is not a simulation. It is real. Public offices are elected.
                        </p>
                        <p style={{
                            fontSize: isMobile ? '1.05rem' : '1.2rem',
                            color: 'var(--color-primary)',
                            fontStyle: 'italic',
                            marginBottom: '2rem',
                            fontWeight: 400
                        }}>
                            You have the right to stand for election.
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <GlassCard style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: isMobile ? '1.25rem' : '1.5rem' }}>
                                <div style={{
                                    fontSize: isMobile ? '1.6rem' : '2rem',
                                    width: isMobile ? '50px' : '60px',
                                    height: isMobile ? '50px' : '60px',
                                    borderRadius: '14px',
                                    background: 'rgba(0, 255, 136, 0.1)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0
                                }}>
                                    🏛️
                                </div>
                                <div>
                                    <h4 style={{ color: 'var(--color-text)', fontSize: isMobile ? '1rem' : '1.1rem', marginBottom: '0.25rem', fontWeight: 500, textTransform: 'none' }}>
                                        Senator
                                    </h4>
                                    <p style={{ fontSize: isMobile ? '0.85rem' : '0.9rem', color: 'var(--color-text-muted)' }}>
                                        Debate and pass the laws that govern the city.
                                    </p>
                                </div>
                            </GlassCard>

                            <GlassCard style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: isMobile ? '1.25rem' : '1.5rem' }}>
                                <div style={{
                                    fontSize: isMobile ? '1.6rem' : '2rem',
                                    width: isMobile ? '50px' : '60px',
                                    height: isMobile ? '50px' : '60px',
                                    borderRadius: '14px',
                                    background: 'rgba(0, 255, 136, 0.1)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0
                                }}>
                                    👑
                                </div>
                                <div>
                                    <h4 style={{ color: 'var(--color-text)', fontSize: isMobile ? '1rem' : '1.1rem', marginBottom: '0.25rem', fontWeight: 500, textTransform: 'none' }}>
                                        Consul
                                    </h4>
                                    <p style={{ fontSize: isMobile ? '0.85rem' : '0.9rem', color: 'var(--color-text-muted)' }}>
                                        Lead the executive branch and guide the city's future.
                                    </p>
                                </div>
                            </GlassCard>
                        </div>
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
                        A massive concrete structure, three stories of brutal challenges.
                        Different channels, different paths, one goal:{' '}
                        <strong style={{ color: '#ff4757' }}>The Summit</strong>.
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
                        maxWidth: '1000px'
                    }}>
                        <style>{`.colosseum-scroll::-webkit-scrollbar { display: none; }`}</style>
                        
                        <div style={isMobile ? { flexShrink: 0, width: '280px', scrollSnapAlign: 'start' } : {}}>
                            <GlassCard style={{ 
                                background: 'rgba(255, 71, 87, 0.08)', 
                                border: '1px solid rgba(255, 71, 87, 0.25)',
                                textAlign: 'center',
                                padding: isMobile ? '1.5rem 1.25rem' : '2rem 1.5rem',
                                height: '100%'
                            }} hoverEffect={!isMobile}>
                                <h4 style={{ color: '#ff4757', marginBottom: '1rem', fontSize: isMobile ? '1.1rem' : '1.2rem', fontWeight: 500 }}>
                                    King of the Hill
                                </h4>
                                <p style={{ color: 'var(--color-text-muted)', fontSize: isMobile ? '0.85rem' : '0.9rem', lineHeight: '1.7' }}>
                                    Reach the Winners' Room and hold your ground against all comers.
                                </p>
                            </GlassCard>
                        </div>

                        <div style={isMobile ? { flexShrink: 0, width: '280px', scrollSnapAlign: 'start' } : {}}>
                            <GlassCard style={{ 
                                background: 'rgba(255, 165, 2, 0.08)', 
                                border: '1px solid rgba(255, 165, 2, 0.25)',
                                textAlign: 'center',
                                padding: isMobile ? '1.5rem 1.25rem' : '2rem 1.5rem',
                                height: '100%'
                            }} hoverEffect={!isMobile}>
                                <h4 style={{ color: '#ffa502', marginBottom: '1rem', fontSize: isMobile ? '1.1rem' : '1.2rem', fontWeight: 500 }}>
                                    The Prize
                                </h4>
                                <p style={{ color: 'var(--color-text-muted)', fontSize: isMobile ? '0.85rem' : '0.9rem', lineHeight: '1.7' }}>
                                    3 Charging Connects + Passive Income in JVD.
                                </p>
                            </GlassCard>
                        </div>

                        <div style={isMobile ? { flexShrink: 0, width: '280px', scrollSnapAlign: 'start' } : {}}>
                            <GlassCard style={{ 
                                background: 'rgba(255, 71, 87, 0.08)', 
                                border: '1px solid rgba(255, 71, 87, 0.25)',
                                textAlign: 'center',
                                padding: isMobile ? '1.5rem 1.25rem' : '2rem 1.5rem',
                                height: '100%'
                            }} hoverEffect={!isMobile}>
                                <h4 style={{ color: '#ff4757', marginBottom: '1rem', fontSize: isMobile ? '1.1rem' : '1.2rem', fontWeight: 500 }}>
                                    The Voice
                                </h4>
                                <p style={{ color: 'var(--color-text-muted)', fontSize: isMobile ? '0.85rem' : '0.9rem', lineHeight: '1.7' }}>
                                    Exclusive access to the city screen to broadcast your content.
                                </p>
                            </GlassCard>
                        </div>
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
