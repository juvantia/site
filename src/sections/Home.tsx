import * as React from 'react';
import { useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

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
        { id: 'builder', label: 'Basic Rover', description: 'Build a simple open-frame Robulus with basic suspension — perfect for driving around the park.', image: '/images/BUI.png' },
        { id: 'deliverer', label: 'Gripper Module', description: 'Add a gripper module to your Robulus to collect and transport materials.', image: '/images/DEL.png' },
        { id: 'bounty_hunter', label: 'Waterproof Shell', description: 'Install a protective plastic cover to keep your Robulus safe from rain and splashes.', image: '/images/BH.png' },
        { id: 'insurer', label: 'Omni Wheels', description: 'Use omni wheels for smooth movement without a steering mechanism — common in robotics and easy to control.', image: '/images/IN.png' },
        { id: 'fighter', label: 'Pusher Plate', description: 'Add a front pusher to compete in the Colosseum and move objects by force.', image: '/images/FI.png' },
        { id: 'bodyguard', label: 'Explorer Setup', description: 'Mount a higher-capacity battery to explore longer routes and cover more of the park.', image: '/images/BD.png' },
        { id: 'engineer', label: 'Acrylic Enclosure', description: 'Build a clear acrylic корпус to protect electronics — with careful sealing for waterproof performance.', image: '/images/ING.png' },
        { id: 'custom', label: 'Custom Build', description: 'Join the park economy: complete tasks, provide services, and earn income for your Robulus owner.', image: '/images/ANY.png' },
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
            <div style={{
                width: '100%',
                maxWidth: '100vw',
                overflow: 'hidden',
                position: 'relative',
                zIndex: 2
            }}>
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

    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(250px, 300px) minmax(300px, 450px)',
            gap: '3rem',
            width: '100%',
            maxWidth: '900px',
            alignItems: 'start',
            justifyContent: 'center',
            position: 'relative',
            zIndex: 2
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
            <div style={{
                width: '100%',
                maxWidth: '100vw',
                overflow: 'hidden',
                position: 'relative',
                zIndex: 2
            }}>
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

    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(300px, 450px) minmax(250px, 300px)',
            gap: '3rem',
            width: '100%',
            maxWidth: '900px',
            alignItems: 'start',
            justifyContent: 'center',
            position: 'relative',
            zIndex: 2
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

            {/* Ambient Glow - Mobile Dark Mode Pulse */}
            {isMobile && <div className="ambient-glow" />}

            {/* ===== HERO SECTION ===== */}
            <section style={{
                position: 'relative',
                height: isMobile ? '100vh' : '100vh',
                width: '100%',
                marginTop: isMobile ? '0' : '-80px',
                display: 'flex',
                alignItems: 'center',
                overflow: 'hidden',
                zIndex: 1
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

                {/* Dark Overlay — stronger on left, lighter on right */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: isMobile
                        ? 'linear-gradient(to bottom, rgba(5,10,9,0.88) 0%, rgba(5,10,9,0.75) 100%)'
                        : 'linear-gradient(to right, rgba(5,10,9,0.96) 0%, rgba(5,10,9,0.88) 45%, rgba(5,10,9,0.55) 70%, rgba(5,10,9,0.35) 100%)',
                    zIndex: 1
                }} />

                {/* Neon glow — top center */}
                <div style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0,
                    height: '500px',
                    background: 'radial-gradient(ellipse at 30% 0%, rgba(0, 255, 136, 0.07) 0%, transparent 65%)',
                    zIndex: 2,
                    pointerEvents: 'none'
                }} />

                {/* Vertical neon divider line (desktop only) */}
                {!isMobile && (
                    <motion.div
                        initial={{ scaleY: 0, opacity: 0 }}
                        animate={{ scaleY: 1, opacity: 1 }}
                        transition={{ delay: 1.2, duration: 1, ease: 'easeOut' }}
                        style={{
                            position: 'absolute',
                            left: '54%',
                            top: '15%',
                            bottom: '15%',
                            width: '1px',
                            background: 'linear-gradient(to bottom, transparent, rgba(0,255,136,0.3) 30%, rgba(0,255,136,0.3) 70%, transparent)',
                            zIndex: 3,
                            transformOrigin: 'top',
                            display: isMobile ? 'none' : 'block'
                        }}
                    />
                )}

                {/* Hero Content — full width */}
                <motion.div style={{
                    opacity: heroOpacity,
                    zIndex: 3,
                    width: '100%',
                    padding: isMobile ? '0 1.25rem' : '0 4rem',
                    display: 'flex',
                    flexDirection: isMobile ? 'column' : 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: isMobile ? '2.5rem' : '8rem',
                    paddingTop: isMobile ? '20px' : '80px'
                }}>

                    {/* ── LEFT COLUMN: Brand + Copy ── */}
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: isMobile ? '1.5rem' : '2rem',
                        flex: isMobile ? undefined : '0 1 auto',
                        maxWidth: isMobile ? '100%' : '650px',
                        textAlign: isMobile ? 'center' : 'left',
                        position: 'relative',
                        zIndex: 10
                    }}>


                        {/* JUVANTIA — untouched */}
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
                            style={{
                                fontSize: isMobile ? 'clamp(2.5rem, 12vw, 4rem)' : 'clamp(3rem, 9vw, 6.5rem)',
                                background: 'linear-gradient(135deg, #00FF88 0%, #dfe4e1 40%, #00D4FF 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                fontWeight: 400,
                                fontFamily: "'Cinzel', serif",
                                letterSpacing: '0.18em',
                                position: 'relative',
                                zIndex: 2,
                                lineHeight: 1,
                                margin: 0,
                                filter: 'drop-shadow(0 0 15px rgba(0, 212, 255, 0.4))'
                            }}
                        >
                            JUVANTIA
                        </motion.h1>

                        {/* Thin accent line */}
                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ delay: 0.9, duration: 0.8, ease: 'easeOut' }}
                            style={{
                                height: '1px',
                                width: isMobile ? '100%' : '380px',
                                background: 'linear-gradient(to right, rgba(0,255,136,0.6), rgba(0,212,255,0.3), transparent)',
                                transformOrigin: 'left'
                            }}
                        />

                        {/* Description */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7, duration: 0.8 }}
                            style={{
                                fontFamily: "'Space Grotesk', sans-serif",
                                fontSize: isMobile ? '0.9rem' : '1.1rem',
                                color: 'rgba(223, 228, 225, 0.75)',
                                lineHeight: 1.85,
                                fontWeight: 300,
                                margin: 0,
                                maxWidth: '480px'
                            }}
                        >
                            A Persistent Teleoperated Rover Technopark<br />
                            powered by a Role-based Economy.
                        </motion.p>




                    </div>

                    {/* ── RIGHT COLUMN: Single prominent landscape photo ── */}
                    {!isMobile ? (
                        <div style={{
                            flex: '0 0 560px',
                            maxWidth: '560px',
                            position: 'relative',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            paddingBottom: '20px'
                        }}>
                            <motion.div
                                initial={{ opacity: 0, x: 40, y: 20 }}
                                animate={{ opacity: 1, x: 0, y: 0 }}
                                transition={{ delay: 0.6, duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
                                whileHover={{ y: -6, scale: 1.02 }}
                                style={{
                                    position: 'relative',
                                    width: '100%',
                                    height: '315px',
                                    overflow: 'hidden',
                                    border: '1px solid rgba(0,255,136,0.15)',
                                    boxShadow: '0 30px 60px rgba(0,0,0,0.6)'
                                }}
                            >
                                <img src="/images/TP.png" alt="Juvantia Technopark" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.7s ease, filter 0.5s ease', filter: 'brightness(0.9) saturate(1.1)' }}
                                    onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.filter = 'brightness(1) saturate(1.2)'; }}
                                    onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.filter = 'brightness(0.9) saturate(1.1)'; }}
                                />
                                {/* Scanner corners — green */}
                                {['topLeft', 'topRight', 'bottomLeft', 'bottomRight'].map(pos => (
                                    <div key={pos} style={{
                                        position: 'absolute', width: '22px', height: '22px',
                                        borderColor: 'rgba(0,255,136,0.85)', borderStyle: 'solid', borderWidth: 0,
                                        ...(pos === 'topLeft' && { top: 18, left: 18, borderTopWidth: 2, borderLeftWidth: 2 }),
                                        ...(pos === 'topRight' && { top: 18, right: 18, borderTopWidth: 2, borderRightWidth: 2 }),
                                        ...(pos === 'bottomLeft' && { bottom: 18, left: 18, borderBottomWidth: 2, borderLeftWidth: 2 }),
                                        ...(pos === 'bottomRight' && { bottom: 18, right: 18, borderBottomWidth: 2, borderRightWidth: 2 }),
                                    }} />
                                ))}
                                {/* LIVE badge */}
                                <div style={{
                                    position: 'absolute', top: 18, left: 48,
                                    display: 'flex', alignItems: 'center', gap: '8px',
                                    background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(10px)',
                                    padding: '5px 12px', border: '1px solid rgba(0,255,136,0.25)'
                                }}>
                                    <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#00FF88', boxShadow: '0 0 10px #00FF88', display: 'block' }} />
                                    <span style={{ fontFamily: "'Space Grotesk'", fontSize: '0.68rem', letterSpacing: '0.2rem', color: '#00FF88', textTransform: 'uppercase' }}>Live System</span>
                                </div>
                                {/* Bottom gradient overlay */}
                                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '100px', background: 'linear-gradient(transparent, rgba(5,10,9,0.85))' }} />
                            </motion.div>
                        </div>
                    ) : (
                        /* Mobile: single landscape photo */
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.8 }}
                            style={{ width: '100%' }}
                        >
                            <div style={{ width: '100%', height: '180px', position: 'relative', overflow: 'hidden', border: '1px solid rgba(0,255,136,0.25)' }}>
                                <img src="/images/TP.png" alt="Park view" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.9)' }} />
                                {['topLeft', 'bottomRight'].map(pos => (
                                    <div key={pos} style={{
                                        position: 'absolute', width: '16px', height: '16px',
                                        borderColor: 'rgba(0,255,136,0.8)', borderStyle: 'solid', borderWidth: 0,
                                        ...(pos === 'topLeft' && { top: 12, left: 12, borderTopWidth: 2, borderLeftWidth: 2 }),
                                        ...(pos === 'bottomRight' && { bottom: 12, right: 12, borderBottomWidth: 2, borderRightWidth: 2 }),
                                    }} />
                                ))}
                            </div>
                        </motion.div>
                    )}

                </motion.div>

                {/* Bottom stat bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.4, duration: 0.8 }}
                    style={{
                        position: 'absolute',
                        bottom: isMobile ? 'calc(54px + env(safe-area-inset-bottom, 0px))' : 0,
                        left: 0, right: 0,
                        zIndex: 4,
                        background: 'rgba(5,10,9,0.7)',
                        backdropFilter: 'blur(12px)',
                        borderTop: '1px solid rgba(0,255,136,0.1)',
                        display: 'flex',
                        justifyContent: 'center',
                        padding: isMobile ? '0.5rem 1rem 0.2rem' : '1rem 5rem',
                        height: 'auto',
                        alignItems: 'center'
                    }}
                >
                    <div style={{ display: 'flex', gap: isMobile ? '1.5rem' : '4rem', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
                        {[
                            ['8 HECTARES', 'TOTAL AREA'],
                            ['24/7', 'CONSTANT PARK OPERATIONS'],
                            ['12V GRID', 'POWER NETWORK'],
                            ['BIOMETRIC', 'ASSET MANAGEMENT']
                        ].filter(item => !(isMobile && (item[0] === '24/7' || item[0] === 'BIOMETRIC'))).map(([val, label], i) => (
                            <React.Fragment key={label}>
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{ fontFamily: "'Cinzel'", fontSize: isMobile ? '0.75rem' : '1rem', fontWeight: 600, color: '#E6F0EB', letterSpacing: '0.08em', lineHeight: 1 }}>{val}</div>
                                    <div style={{ fontFamily: "'Space Grotesk'", fontSize: isMobile ? '0.5rem' : '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(0,255,136,0.55)', marginTop: isMobile ? '0px' : '2px', lineHeight: 1 }}>{label}</div>
                                </div>
                                {i < 3 && !isMobile && <div style={{ width: '1px', height: '28px', background: 'rgba(0,255,136,0.15)' }} />}
                            </React.Fragment>
                        ))}
                    </div>
                </motion.div>

            </section>

            {/* ===== TECHNOPARK FACILITY SECTION ===== */}
            <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                id="facility"
                style={{
                    padding: isMobile ? '2.5rem 1.25rem 3rem' : '8rem 2rem',
                    background: 'transparent',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    position: 'relative',
                    zIndex: 1
                }}
            >
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{ textAlign: 'center', marginBottom: isMobile ? '3rem' : '5rem', width: '100%' }}
                >

                    <h2 style={{
                        fontSize: isMobile ? '1.8rem' : 'clamp(2.3rem, 5vw, 3.2rem)',
                        background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        fontWeight: 400,
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        fontFamily: "'Cinzel', serif",
                        margin: '0 0 1.5rem'
                    }}>
                        Technopark Facility
                    </h2>
                    <div style={{
                        width: '60px',
                        height: '1px',
                        background: 'linear-gradient(90deg, transparent, var(--color-primary), transparent)',
                        margin: '0 auto'
                    }} />
                </motion.div>

                <div style={{ maxWidth: '1280px', width: '100%', display: 'flex', flexDirection: 'column', gap: isMobile ? '1.5rem' : '2rem' }}>

                    {/* ── ROW 1: Full-width HERO — Scale ── */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        style={{
                            position: 'relative',
                            display: 'grid',
                            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                            minHeight: isMobile ? 'auto' : '420px',
                            background: 'linear-gradient(135deg, rgba(18, 32, 30, 0.95) 0%, rgba(10, 15, 14, 0.98) 100%)',
                            border: '1px solid rgba(0, 255, 136, 0.12)',
                            overflow: 'hidden',
                            cursor: 'default'
                        }}
                        whileHover={{
                            borderColor: 'rgba(0, 255, 136, 0.35)',
                            boxShadow: '0 0 40px rgba(0, 255, 136, 0.08)'
                        }}
                    >
                        {/* Left: Image */}
                        <div style={{ position: 'relative', overflow: 'hidden', minHeight: isMobile ? '220px' : 'auto' }}>
                            <img
                                src="/images/4855.png"
                                alt="8 Hectares Technopark Scale"
                                style={{
                                    width: '100%', height: '100%',
                                    objectFit: 'cover',
                                    display: 'block',
                                    transition: 'transform 0.8s ease',
                                    filter: 'brightness(0.85) saturate(1.1)'
                                }}
                                onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.04)')}
                                onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                            />
                            {/* Scanner corners */}
                            {['topLeft', 'topRight', 'bottomLeft', 'bottomRight'].map(pos => (
                                <div key={pos} style={{
                                    position: 'absolute',
                                    width: '20px', height: '20px',
                                    borderColor: 'rgba(0, 255, 136, 0.7)',
                                    borderStyle: 'solid',
                                    borderWidth: 0,
                                    ...(pos === 'topLeft' && { top: 16, left: 16, borderTopWidth: 2, borderLeftWidth: 2 }),
                                    ...(pos === 'topRight' && { top: 16, right: 16, borderTopWidth: 2, borderRightWidth: 2 }),
                                    ...(pos === 'bottomLeft' && { bottom: 16, left: 16, borderBottomWidth: 2, borderLeftWidth: 2 }),
                                    ...(pos === 'bottomRight' && { bottom: 16, right: 16, borderBottomWidth: 2, borderRightWidth: 2 }),
                                }} />
                            ))}

                        </div>

                        {/* Right: Content */}
                        <div style={{
                            padding: isMobile ? '2rem 1.5rem' : '3.5rem',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            gap: '1.5rem',
                            borderLeft: isMobile ? 'none' : '1px solid rgba(0, 255, 136, 0.08)'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '1rem' }}>
                                <span style={{
                                    fontFamily: "'Cinzel', serif",
                                    fontSize: isMobile ? '4rem' : '6rem',
                                    lineHeight: 1,
                                    fontWeight: 600,
                                    background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    opacity: 0.25
                                }}>01</span>
                                <div>
                                    <p style={{
                                        fontFamily: "'Space Grotesk'",
                                        fontSize: '0.65rem',
                                        letterSpacing: '0.3em',
                                        textTransform: 'uppercase',
                                        color: 'var(--color-primary)',
                                        marginBottom: '0.4rem',
                                        opacity: 0.8
                                    }}>Scale</p>
                                    <h3 style={{
                                        fontFamily: "'Cinzel', serif",
                                        fontSize: isMobile ? '1.3rem' : '1.8rem',
                                        fontWeight: 400,
                                        letterSpacing: '0.08em',
                                        color: '#E6F0EB',
                                        textTransform: 'uppercase',
                                        margin: 0
                                    }}>8 Hectares</h3>
                                    <p style={{
                                        fontFamily: "'Space Grotesk'",
                                        fontSize: '0.75rem',
                                        color: 'rgba(0,255,136,0.6)',
                                        letterSpacing: '0.15em',
                                        marginTop: '0.25rem'
                                    }}>400 × 200 m</p>
                                </div>
                            </div>
                            <p style={{
                                fontFamily: "'Space Grotesk'",
                                fontSize: '1rem',
                                color: 'rgba(185, 203, 185, 0.85)',
                                lineHeight: 1.8,
                                fontWeight: 300
                            }}>
                                A vast, engineered environment designed to support complex logistics, territorial interests, and the concurrent operation of hundreds of rovers.
                            </p>
                            {/* Bottom accent bar */}
                            <div style={{
                                marginTop: 'auto',
                                paddingTop: '1.5rem',
                                borderTop: '1px solid rgba(0,255,136,0.1)',
                                display: 'flex',
                                gap: '2rem'
                            }}>
                                {[['RUBBER ROADS', '32 KM'], ['DISTRICTS', '12'], ['DOMUSES', '800+']].map(([label, val]) => (
                                    <div key={label}>
                                        <div style={{ fontFamily: "'Cinzel'", fontSize: '1.2rem', fontWeight: 600, color: 'var(--color-primary)' }}>{val}</div>
                                        <div style={{ fontFamily: "'Space Grotesk'", fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(185,203,185,0.5)', marginTop: '2px' }}>{label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* ── BLOCK 02: Inverted Split — Unified Network ── */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        style={{
                            position: 'relative',
                            display: 'grid',
                            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                            minHeight: isMobile ? 'auto' : '360px',
                            background: 'linear-gradient(135deg, rgba(10, 18, 22, 0.97) 0%, rgba(8, 14, 18, 0.99) 100%)',
                            border: '1px solid rgba(0, 212, 255, 0.12)',
                            overflow: 'hidden'
                        }}
                        whileHover={{
                            borderColor: 'rgba(0, 212, 255, 0.35)',
                            boxShadow: '0 0 40px rgba(0, 212, 255, 0.07)'
                        }}
                    >
                        {/* Left: Content (inverted from 01) */}
                        <div style={{
                            padding: isMobile ? '2rem 1.5rem' : '3rem 3.5rem',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            gap: '1.5rem',
                            borderRight: isMobile ? 'none' : '1px solid rgba(0, 212, 255, 0.08)',
                            order: isMobile ? 2 : 1
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <span style={{
                                    fontFamily: "'Cinzel', serif",
                                    fontSize: isMobile ? '4rem' : '6rem',
                                    lineHeight: 1, fontWeight: 600,
                                    background: 'linear-gradient(135deg, #00D4FF 0%, #00FF88 100%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    opacity: 0.2
                                }}>02</span>
                                <div>
                                    <p style={{ fontFamily: "'Space Grotesk'", fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#00D4FF', marginBottom: '0.4rem', opacity: 0.8 }}>Connectivity & Power</p>
                                    <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: isMobile ? '1.3rem' : '1.7rem', fontWeight: 400, letterSpacing: '0.08em', color: '#E6F0EB', textTransform: 'uppercase', margin: 0 }}>Unified Network</h3>

                                </div>
                            </div>
                            <p style={{ fontFamily: "'Space Grotesk'", fontSize: '1rem', color: 'rgba(185, 203, 185, 0.82)', lineHeight: 1.8, fontWeight: 300, margin: 0 }}>
                                Industrial-grade Wi-Fi (Low Latency) and a distributed 12V Power Grid covering the entire site. Automated charging stations ensure an infinite hardware lifecycle and your persistent presence in the ecosystem.
                            </p>
                            {/* Spec row */}
                            <div style={{ paddingTop: '1.25rem', borderTop: '1px solid rgba(0,212,255,0.1)', display: 'flex', gap: '2rem' }}>
                                {[['WIFI NODES', '48+'], ['VOLTAGE', '12V GRID'], ['NIGHT LIGHTING', '160+']].map(([label, val]) => (
                                    <div key={label}>
                                        <div style={{ fontFamily: "'Space Grotesk'", fontSize: '0.75rem', fontWeight: 600, color: '#00D4FF', letterSpacing: '0.1em' }}>{val}</div>
                                        <div style={{ fontFamily: "'Space Grotesk'", fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(185,203,185,0.4)', marginTop: '2px' }}>{label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right: Image */}
                        <div style={{ position: 'relative', overflow: 'hidden', minHeight: isMobile ? '220px' : 'auto', order: isMobile ? 1 : 2 }}>
                            <img
                                src="/images/charging_station.png"
                                alt="Charging Station Network"
                                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.8s ease, filter 0.5s ease', filter: 'brightness(0.8) saturate(1.2) hue-rotate(5deg)' }}
                                onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.04)'; e.currentTarget.style.filter = 'brightness(1) saturate(1.4) hue-rotate(5deg)'; }}
                                onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.filter = 'brightness(0.8) saturate(1.2) hue-rotate(5deg)'; }}
                            />
                            {/* Cyan scanner corners */}
                            {['topLeft', 'topRight', 'bottomLeft', 'bottomRight'].map(pos => (
                                <div key={pos} style={{
                                    position: 'absolute', width: '18px', height: '18px',
                                    borderColor: 'rgba(0, 212, 255, 0.7)', borderStyle: 'solid', borderWidth: 0,
                                    ...(pos === 'topLeft' && { top: 14, left: 14, borderTopWidth: 2, borderLeftWidth: 2 }),
                                    ...(pos === 'topRight' && { top: 14, right: 14, borderTopWidth: 2, borderRightWidth: 2 }),
                                    ...(pos === 'bottomLeft' && { bottom: 14, left: 14, borderBottomWidth: 2, borderLeftWidth: 2 }),
                                    ...(pos === 'bottomRight' && { bottom: 14, right: 14, borderBottomWidth: 2, borderRightWidth: 2 }),
                                }} />
                            ))}
                            {/* Cyan gradient overlay from left */}
                            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(8,14,18,0.6) 0%, transparent 40%)' }} />
                        </div>
                    </motion.div>

                    {/* ── BLOCK 03: Hero (image left) — Location ── */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.15 }}
                        style={{
                            position: 'relative',
                            display: 'grid',
                            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                            minHeight: isMobile ? 'auto' : '360px',
                            background: 'linear-gradient(135deg, rgba(8, 16, 14, 0.97) 0%, rgba(10, 18, 22, 0.99) 100%)',
                            border: '1px solid rgba(0, 212, 255, 0.12)',
                            overflow: 'hidden'
                        }}
                        whileHover={{
                            borderColor: 'rgba(0, 212, 255, 0.35)',
                            boxShadow: '0 0 40px rgba(0, 212, 255, 0.07)'
                        }}
                    >
                        {/* Left: Image */}
                        <div style={{ position: 'relative', overflow: 'hidden', minHeight: isMobile ? '220px' : 'auto' }}>
                            <img
                                src="/images/photo_2026-04-17_22-14-15.jpg"
                                alt="Southern Europe Location"
                                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.8s ease, filter 0.5s ease', filter: 'brightness(0.82) saturate(1.3)' }}
                                onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.04)'; e.currentTarget.style.filter = 'brightness(1.05) saturate(1.5)'; }}
                                onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.filter = 'brightness(0.82) saturate(1.3)'; }}
                            />
                            {/* Cyan scanner corners */}
                            {['topLeft', 'topRight', 'bottomLeft', 'bottomRight'].map(pos => (
                                <div key={pos} style={{
                                    position: 'absolute', width: '18px', height: '18px',
                                    borderColor: 'rgba(0, 212, 255, 0.65)', borderStyle: 'solid', borderWidth: 0,
                                    ...(pos === 'topLeft' && { top: 14, left: 14, borderTopWidth: 2, borderLeftWidth: 2 }),
                                    ...(pos === 'topRight' && { top: 14, right: 14, borderTopWidth: 2, borderRightWidth: 2 }),
                                    ...(pos === 'bottomLeft' && { bottom: 14, left: 14, borderBottomWidth: 2, borderLeftWidth: 2 }),
                                    ...(pos === 'bottomRight' && { bottom: 14, right: 14, borderBottomWidth: 2, borderRightWidth: 2 }),
                                }} />
                            ))}

                            {/* gradient: right fade */}
                            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to left, rgba(10,18,22,0.55) 0%, transparent 40%)' }} />
                        </div>

                        {/* Right: Content */}
                        <div style={{
                            padding: isMobile ? '2rem 1.5rem' : '3rem 3.5rem',
                            display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '1.5rem',
                            borderLeft: isMobile ? 'none' : '1px solid rgba(0, 212, 255, 0.08)'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <span style={{
                                    fontFamily: "'Cinzel', serif",
                                    fontSize: isMobile ? '4rem' : '6rem',
                                    lineHeight: 1, fontWeight: 600,
                                    background: 'linear-gradient(135deg, #00D4FF 0%, #00FF88 100%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    opacity: 0.2
                                }}>03</span>
                                <div>
                                    <p style={{ fontFamily: "'Space Grotesk'", fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#00D4FF', marginBottom: '0.4rem', opacity: 0.8 }}>Southern Europe</p>
                                    <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: isMobile ? '1.3rem' : '1.7rem', fontWeight: 400, letterSpacing: '0.08em', color: '#E6F0EB', textTransform: 'uppercase', margin: 0 }}>Location</h3>

                                </div>
                            </div>
                            <p style={{ fontFamily: "'Space Grotesk'", fontSize: '1rem', color: 'rgba(185, 203, 185, 0.82)', lineHeight: 1.8, fontWeight: 300, margin: 0 }}>
                                300+ sunny days per year — ideal for Solar R&D and renewable energy testing. The dry, frost-free climate prevents corrosion and condensation, significantly extending your hardware's operational lifespan.
                            </p>
                            {/* Climate stats */}
                            <div style={{ paddingTop: '1.25rem', borderTop: '1px solid rgba(0,212,255,0.1)', display: 'flex', gap: '2rem' }}>
                                {[['Sunny Days', '300+'], ['Frost Risk', 'Zero'], ['Humidity', 'Low']].map(([label, val]) => (
                                    <div key={label}>
                                        <div style={{ fontFamily: "'Space Grotesk'", fontSize: '0.75rem', fontWeight: 600, color: '#00D4FF', letterSpacing: '0.1em' }}>{val}</div>
                                        <div style={{ fontFamily: "'Space Grotesk'", fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(185,203,185,0.4)', marginTop: '2px' }}>{label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* ── BLOCK 04: Tactical Wide — Asset Protection ── */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        style={{
                            position: 'relative',
                            background: 'linear-gradient(135deg, rgba(12, 18, 16, 0.98) 0%, rgba(8, 12, 10, 0.99) 100%)',
                            border: '1px solid rgba(0, 255, 136, 0.12)',
                            overflow: 'hidden',
                            display: 'grid',
                            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr 1fr',
                            minHeight: isMobile ? 'auto' : '280px'
                        }}
                        whileHover={{
                            borderColor: 'rgba(0, 255, 136, 0.3)',
                            boxShadow: '0 0 50px rgba(0, 255, 136, 0.07)'
                        }}
                    >
                        {/* Column 1: Label + number */}
                        <div style={{
                            padding: isMobile ? '2rem 1.5rem 1rem' : '2.5rem 2.5rem',
                            display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '1.2rem',
                            borderRight: isMobile ? 'none' : '1px solid rgba(0,255,136,0.07)'
                        }}>
                            <div>
                                <p style={{ fontFamily: "'Space Grotesk'", fontSize: '0.62rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#00FF88', opacity: 0.7, margin: '0 0 0.5rem' }}>Physical & On-chain</p>
                                <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: isMobile ? '1.2rem' : '1.5rem', fontWeight: 400, letterSpacing: '0.08em', color: '#E6F0EB', textTransform: 'uppercase', margin: 0 }}>Asset Protection</h3>
                                <div style={{ width: '32px', height: '1px', background: '#00FF88', opacity: 0.35, marginTop: '1rem' }} />
                            </div>
                            {/* Phantom number */}
                            <span style={{
                                fontFamily: "'Cinzel'", fontSize: '5rem', fontWeight: 700, lineHeight: 1,
                                background: 'linear-gradient(135deg, #00FF88 0%, #00D4FF 100%)',
                                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                                opacity: 0.12, userSelect: 'none', display: 'block', marginTop: 'auto'
                            }}>04</span>
                        </div>

                        {/* Column 2: Two text blocks */}
                        <div style={{
                            padding: isMobile ? '1rem 1.5rem' : '2.5rem 2rem',
                            display: 'flex', flexDirection: 'column', gap: '1.5rem', justifyContent: 'center',
                            borderRight: isMobile ? 'none' : '1px solid rgba(0,255,136,0.07)'
                        }}>
                            {/* Physical */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                                    <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#00FF88', boxShadow: '0 0 6px #00FF88', flexShrink: 0 }} />
                                    <span style={{ fontFamily: "'Space Grotesk'", fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#E6F0EB' }}>Physical Perimeter</span>
                                </div>
                                <p style={{ fontFamily: "'Space Grotesk'", fontSize: '0.88rem', color: 'rgba(185,203,185,0.75)', lineHeight: 1.7, fontWeight: 300, margin: 0 }}>
                                    Fully secured site with strict guarantee against manual tampering. No unauthorized physical access — ever.
                                </p>
                            </div>
                            {/* On-chain */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                                    <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#00D4FF', boxShadow: '0 0 6px #00D4FF', flexShrink: 0 }} />
                                    <span style={{ fontFamily: "'Space Grotesk'", fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#E6F0EB' }}>On-Chain Ownership</span>
                                </div>
                                <p style={{ fontFamily: "'Space Grotesk'", fontSize: '0.88rem', color: 'rgba(185,203,185,0.75)', lineHeight: 1.7, fontWeight: 300, margin: 0 }}>
                                    Legal ownership anchored in the blockchain. All critical operations secured via biometrics and smart contracts.
                                </p>
                            </div>
                        </div>

                        {/* Column 3: GIF monitor */}
                        <div style={{ position: 'relative', overflow: 'hidden', minHeight: isMobile ? '200px' : 'auto' }}>
                            <img
                                src="/images/kustodia.gif"
                                alt="Kustodia Security System"
                                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'brightness(0.75) saturate(1.2) hue-rotate(-10deg)' }}
                            />
                            {/* Green scanner corners */}
                            {['topLeft', 'topRight', 'bottomLeft', 'bottomRight'].map(pos => (
                                <div key={pos} style={{
                                    position: 'absolute', width: '16px', height: '16px',
                                    borderColor: 'rgba(0, 255, 136, 0.8)', borderStyle: 'solid', borderWidth: 0,
                                    ...(pos === 'topLeft' && { top: 12, left: 12, borderTopWidth: 2, borderLeftWidth: 2 }),
                                    ...(pos === 'topRight' && { top: 12, right: 12, borderTopWidth: 2, borderRightWidth: 2 }),
                                    ...(pos === 'bottomLeft' && { bottom: 12, left: 12, borderBottomWidth: 2, borderLeftWidth: 2 }),
                                    ...(pos === 'bottomRight' && { bottom: 12, right: 12, borderBottomWidth: 2, borderRightWidth: 2 }),
                                }} />
                            ))}
                            {/* Scanning line animation */}
                            <div style={{
                                position: 'absolute', left: 0, right: 0,
                                height: '2px',
                                background: 'linear-gradient(90deg, transparent, rgba(0,255,136,0.6), transparent)',
                                animation: 'scanLine 3s linear infinite',
                                top: '30%'
                            }} />
                            <style>{`
                                @keyframes scanLine {
                                    0% { top: 10%; opacity: 0; }
                                    10% { opacity: 1; }
                                    90% { opacity: 1; }
                                    100% { top: 90%; opacity: 0; }
                                }
                            `}</style>
                            {/* KUSTODIA label */}
                            <div style={{
                                position: 'absolute', bottom: 12, left: 12,
                                fontFamily: "'Space Grotesk'", fontSize: '0.58rem',
                                letterSpacing: '0.25em', textTransform: 'uppercase',
                                color: 'rgba(0,255,136,0.7)'
                            }}>KUSTODIA · ACTIVE</div>
                            {/* Left fade */}
                            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(8,12,10,0.7) 0%, transparent 35%)' }} />
                        </div>
                    </motion.div>

                </div>
            </motion.section>

            <SectionDivider />

            {/* ===== COLOSSEUM SECTION ===== */}
            <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1 }}
                style={{
                    padding: isMobile ? '4rem 1rem' : '0rem 2rem',
                    background: 'transparent',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    position: 'relative',
                    zIndex: 1,
                    overflow: 'hidden'
                }}
            >
                {/* Background Atmosphere */}
                <div style={{
                    position: 'absolute',
                    top: '30%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '100%',
                    height: '800px',
                    background: 'radial-gradient(ellipse at center, rgba(255, 71, 87, 0.05) 0%, transparent 70%)',
                    pointerEvents: 'none',
                    zIndex: 0
                }} />

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{ position: 'relative', zIndex: 1, maxWidth: '1280px', width: '100%' }}
                >
                    {/* Header Block */}
                    <div style={{ textAlign: 'center', marginBottom: isMobile ? '2rem' : '3.5rem' }}>

                        <h2 style={{
                            fontSize: isMobile ? '1.8rem' : 'clamp(2.3rem, 5vw, 3.2rem)',
                            background: 'linear-gradient(135deg, #ff4757 0%, #ffa502 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            fontWeight: 400,
                            letterSpacing: '0.15em',
                            textTransform: 'uppercase',
                            fontFamily: "'Cinzel', serif",
                            margin: '0 auto 1.2rem',
                            filter: 'drop-shadow(0 0 20px rgba(255, 71, 87, 0.3))'
                        }}>
                            The Colosseum
                        </h2>
                        <p style={{
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontSize: isMobile ? '0.65rem' : '0.75rem',
                            color: 'rgba(255, 71, 87, 0.7)',
                            letterSpacing: '0.4em',
                            textTransform: 'uppercase',
                            marginBottom: '2rem'
                        }}>
                            The Arena Without Rules
                        </p>
                        <div style={{
                            width: '80px',
                            height: '1px',
                            background: 'linear-gradient(90deg, transparent, #ff4757, transparent)',
                            margin: '0 auto'
                        }} />
                    </div>

                    {/* Image & Description Grid */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: isMobile ? '1fr' : '1fr 450px',
                        gap: isMobile ? '2.5rem' : '5rem',
                        alignItems: 'center',
                        marginBottom: isMobile ? '0' : '2.5rem'
                    }}>
                        {/* Cinematic Image Frame */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            style={{
                                position: 'relative',
                                borderRadius: '4px',
                                overflow: 'hidden',
                                border: '1px solid rgba(255, 71, 87, 0.15)',
                                boxShadow: '0 30px 60px rgba(0,0,0,0.5)'
                            }}
                        >
                            <img
                                src="/images/colosseum_arena.png"
                                alt="The Colosseum Arena"
                                style={{ width: '100%', height: 'auto', display: 'block', filter: 'brightness(0.9) saturate(1.1)' }}
                            />

                            {/* Scanner corners */}
                            {['topLeft', 'topRight', 'bottomLeft', 'bottomRight'].map(pos => (
                                <div key={pos} style={{
                                    position: 'absolute', width: '24px', height: '24px',
                                    borderColor: 'rgba(255, 71, 87, 0.7)', borderStyle: 'solid', borderWidth: 0,
                                    ...(pos === 'topLeft' && { top: 16, left: 16, borderTopWidth: 2, borderLeftWidth: 2 }),
                                    ...(pos === 'topRight' && { top: 16, right: 16, borderTopWidth: 2, borderRightWidth: 2 }),
                                    ...(pos === 'bottomLeft' && { bottom: 16, left: 16, borderBottomWidth: 2, borderLeftWidth: 2 }),
                                    ...(pos === 'bottomRight' && { bottom: 16, right: 16, borderBottomWidth: 2, borderRightWidth: 2 }),
                                }} />
                            ))}



                            {/* Cinematic Overlay */}
                            <div style={{
                                position: 'absolute',
                                inset: 0,
                                background: 'linear-gradient(to top, rgba(10, 5, 5, 0.6) 0%, transparent 40%)',
                                pointerEvents: 'none'
                            }} />
                        </motion.div>

                        {/* Description Text */}
                        <div style={{ textAlign: isMobile ? 'center' : 'left' }}>
                            <h3 style={{
                                fontFamily: "'Cinzel', serif",
                                fontSize: '1.6rem',
                                color: '#E6F0EB',
                                marginBottom: '1.5rem',
                                letterSpacing: '0.1em',
                                fontWeight: 400
                            }}>
                                Fortress of Duels
                            </h3>
                            <p style={{
                                fontFamily: "'Space Grotesk', sans-serif",
                                fontSize: '1.1rem',
                                lineHeight: '1.9',
                                color: 'rgba(185, 203, 185, 0.85)',
                                fontWeight: 300,
                                margin: 0
                            }}>
                                A three-storey concrete fortress built for automated dominance. Claim the Winners’ Room, seize the arena’s grid, and project your influence across the entire Colosseum District.
                            </p>

                            <div style={{
                                marginTop: '2.5rem',
                                display: 'flex',
                                gap: '1.5rem',
                                justifyContent: isMobile ? 'center' : 'flex-start'
                            }}>
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{ fontFamily: "'Cinzel'", fontSize: '1.4rem', color: '#ff4757', fontWeight: 600 }}>3 Levels</div>
                                    <div style={{ fontFamily: "'Space Grotesk'", fontSize: '0.6rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.2em', textTransform: 'uppercase', marginTop: '4px' }}>Structure</div>
                                </div>
                                <div style={{ width: '1px', height: '40px', background: 'rgba(255,255,255,0.1)' }} />
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{ fontFamily: "'Cinzel'", fontSize: '1.4rem', color: '#ffa502', fontWeight: 600 }}>12 Meters</div>
                                    <div style={{ fontFamily: "'Space Grotesk'", fontSize: '0.6rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.2em', textTransform: 'uppercase', marginTop: '4px' }}>Height</div>
                                </div>
                            </div>
                        </div>
                    </div>


                </motion.div>
            </motion.section>
        </>
    );
};

export default Home;
