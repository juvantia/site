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
    const heroScale = useTransform(scrollY, [0, 400], [1.0, 1.1]);
    const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' ? window.innerWidth <= 768 : false);
    const [block01ImageIndex, setBlock01ImageIndex] = useState(0);
    const block01Images = ['/images/11.jpg', '/images/4855.png'];
    const block01Alts = [
        'Proving ground scale visualization showing vast 8-hectare territory',
        '8 Hectares Proving Ground Scale with engineering infrastructure'
    ];

    const [block02ImageIndex, setBlock02ImageIndex] = useState(0);
    const block02Images = ['/images/charging_station2.jpg', '/images/charging_station.jpg'];
    const block02Alts = [
        'Industrial-grade magnetic charging station with MagSafe-like connection for rovers',
        'Distributed 12V power grid infrastructure and Wi-Fi coverage area'
    ];

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
                height: isMobile ? '100vh' : 'calc(100vh - 80px)',
                width: '100%',
                marginTop: isMobile ? '0' : '0',
                display: 'flex',
                alignItems: 'center',
                overflow: 'hidden',
                zIndex: 1
            }}>
                {/* Background Image with Parallax */}
                <motion.div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundImage: 'url(/images/hero.jpg)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center center',
                        y: heroImageY,
                        scale: heroScale
                    }}
                />

                {/* Dark Overlay — stronger on left, lighter on right */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: isMobile
                        ? 'linear-gradient(to bottom, rgba(5,10,9,0.6) 0%, rgba(5,10,9,0.4) 100%)'
                        : 'linear-gradient(to right, rgba(5,10,9,0.75) 0%, rgba(5,10,9,0.4) 45%, rgba(5,10,9,0.2) 70%, rgba(5,10,9,0.05) 100%)',
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
                    padding: isMobile ? '1.5rem' : '0 4rem',
                    display: 'flex',
                    flexDirection: isMobile ? 'column' : 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: isMobile ? '2rem' : '8rem',
                    flex: 1
                }}>

                    {/* ── LEFT COLUMN: Brand + Copy ── */}
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: isMobile ? 'center' : 'flex-start',
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
                                width: isMobile ? '200px' : '380px',
                                background: isMobile
                                    ? 'linear-gradient(90deg, transparent, rgba(0,255,136,0.6), transparent)'
                                    : 'linear-gradient(to right, rgba(0,255,136,0.6), rgba(0,212,255,0.3), transparent)',
                                transformOrigin: isMobile ? 'center' : 'left'
                            }}
                        />

                        {/* Description */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7, duration: 0.8 }}
                            style={{
                                fontFamily: "'Space Grotesk', sans-serif",
                                fontSize: isMobile ? '0.9rem' : '1.05rem',
                                color: 'rgba(223, 228, 225, 0.8)',
                                lineHeight: 1.7,
                                fontWeight: 300,
                                margin: 0,
                                maxWidth: '540px',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '0.85rem'
                            }}
                        >
                            <p style={{ margin: 0 }}>
                                A free-to-enter, open-access physical proving ground for teleoperated rovers.
                            </p>
                            <p style={{ margin: 0 }}>
                                It provides a testing and deployment environment for commercial R&D, university laboratories, and competitive entertainment.
                            </p>
                            <p style={{ margin: 0 }}>
                                The ecosystem is powered by a market-driven economy where participants earn by performing useful work and co-owning physical assets.
                            </p>
                        </motion.div>




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
                                <img src="/images/TP.png" alt="Juvantia Proving Ground" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.7s ease, filter 0.5s ease', filter: 'brightness(0.9) saturate(1.1)' }}
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

                {/* Bottom stat bar (Desktop only) */}
                {!isMobile && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.4, duration: 0.8 }}
                        style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0, right: 0,
                            zIndex: 4,
                            background: 'rgba(5,10,9,0.7)',
                            backdropFilter: 'blur(12px)',
                            borderTop: '1px solid rgba(0,255,136,0.1)',
                            display: 'flex',
                            justifyContent: 'center',
                            padding: '1rem 5rem',
                            height: 'auto',
                            alignItems: 'center'
                        }}
                    >
                        <div style={{ display: 'flex', gap: '4rem', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
                            {[
                                ['8 HECTARES', 'TOTAL AREA'],
                                ['24/7', 'CONSTANT PARK OPERATIONS'],
                                ['12V GRID', 'POWER NETWORK'],
                                ['BIOMETRIC', 'ASSET MANAGEMENT']
                            ].map(([val, label], i) => (
                                <React.Fragment key={label}>
                                    <div style={{ textAlign: 'center' }}>
                                        <div style={{ fontFamily: "'Cinzel'", fontSize: '1rem', fontWeight: 600, color: '#E6F0EB', letterSpacing: '0.08em', lineHeight: 1 }}>{val}</div>
                                        <div style={{ fontFamily: "'Space Grotesk'", fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(0,255,136,0.55)', marginTop: '2px', lineHeight: 1 }}>{label}</div>
                                    </div>
                                    {i < 3 && <div style={{ width: '1px', height: '28px', background: 'rgba(0,255,136,0.15)' }} />}
                                </React.Fragment>
                            ))}
                        </div>
                    </motion.div>
                )}

            </section>

            {/* ===== PROVING GROUND FACILITY SECTION ===== */}
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
                    transition={{ duration: 0.6 }}
                    style={{ textAlign: 'center', marginBottom: isMobile ? '3rem' : '5rem', width: '100%' }}
                >
                    <div style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: '0.75rem',
                        letterSpacing: '0.25em',
                        textTransform: 'uppercase',
                        color: 'var(--color-primary)',
                        marginBottom: '0.75rem',
                        fontWeight: 600
                    }}>
                        TERRAIN & INFRASTRUCTURE
                    </div>
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
                        Proving Ground Facility
                    </h2>
                    <div style={{
                        width: '60px',
                        height: '1px',
                        background: 'linear-gradient(90deg, transparent, var(--color-primary), transparent)',
                        margin: '0 auto'
                    }} />
                </motion.div>

                <div style={{ maxWidth: '1280px', width: '100%', display: 'flex', flexDirection: 'column', gap: isMobile ? '1.5rem' : '2rem' }}>

                    {/* ── BLOCK 01: Location (Southern Europe) ── */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        style={{
                            position: 'relative',
                            display: 'grid',
                            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                            minHeight: isMobile ? 'auto' : '400px',
                            background: 'linear-gradient(135deg, rgba(8, 16, 14, 0.97) 0%, rgba(10, 18, 22, 0.99) 100%)',
                            border: '1px solid rgba(0, 212, 255, 0.15)',
                            overflow: 'hidden'
                        }}
                        whileHover={{
                            borderColor: 'rgba(0, 212, 255, 0.35)',
                            boxShadow: '0 0 40px rgba(0, 212, 255, 0.08)'
                        }}
                    >
                        {/* Left: Image */}
                        <div style={{ position: 'relative', overflow: 'hidden', minHeight: isMobile ? '220px' : 'auto' }}>
                            <img
                                src="/images/photo_2026-04-17_22-14-15.jpg"
                                alt="Southern Europe Location"
                                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.8s ease, filter 0.5s ease', filter: 'brightness(0.85) saturate(1.25)' }}
                                onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.04)'; e.currentTarget.style.filter = 'brightness(1.02) saturate(1.4)'; }}
                                onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.filter = 'brightness(0.85) saturate(1.25)'; }}
                            />
                            {['topLeft', 'topRight', 'bottomLeft', 'bottomRight'].map(pos => (
                                <div key={pos} style={{
                                    position: 'absolute', width: '18px', height: '18px',
                                    borderColor: 'rgba(0, 212, 255, 0.7)', borderStyle: 'solid', borderWidth: 0,
                                    zIndex: 5,
                                    ...(pos === 'topLeft' && { top: 14, left: 14, borderTopWidth: 2, borderLeftWidth: 2 }),
                                    ...(pos === 'topRight' && { top: 14, right: 14, borderTopWidth: 2, borderRightWidth: 2 }),
                                    ...(pos === 'bottomLeft' && { bottom: 14, left: 14, borderBottomWidth: 2, borderLeftWidth: 2 }),
                                    ...(pos === 'bottomRight' && { bottom: 14, right: 14, borderBottomWidth: 2, borderRightWidth: 2 }),
                                }} />
                            ))}
                            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to left, rgba(10,18,22,0.55) 0%, transparent 40%)' }} />
                        </div>

                        {/* Right: Content */}
                        <div style={{
                            padding: isMobile ? '2rem 1.5rem' : '3.5rem',
                            display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '1.5rem',
                            borderLeft: isMobile ? 'none' : '1px solid rgba(0, 212, 255, 0.08)'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '1rem' }}>
                                <span style={{
                                    fontFamily: "'Cinzel', serif",
                                    fontSize: isMobile ? '4rem' : '6rem',
                                    lineHeight: 1, fontWeight: 600,
                                    background: 'linear-gradient(135deg, #00D4FF 0%, #00FF88 100%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    opacity: 0.25
                                }}>01</span>
                                <div>
                                    <p style={{ fontFamily: "'Space Grotesk'", fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#00D4FF', marginBottom: '0.4rem', opacity: 0.85 }}>Southern Europe</p>
                                    <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: isMobile ? '1.3rem' : '1.8rem', fontWeight: 400, letterSpacing: '0.08em', color: '#E6F0EB', textTransform: 'uppercase', margin: 0 }}>Location</h3>
                                </div>
                            </div>
                            <p style={{ fontFamily: "'Space Grotesk'", fontSize: '1rem', color: 'rgba(185, 203, 185, 0.85)', lineHeight: 1.8, fontWeight: 300, margin: 0 }}>
                                300+ sunny days per year — optimal for continuous solar R&amp;D, photovoltaic generation, and outdoor robotics. The dry, frost-free Mediterranean climate prevents corrosion and condensation, significantly extending your hardware's operational lifespan and enabling 24/7 all-season trials.
                            </p>
                            <div style={{ paddingTop: '1.25rem', borderTop: '1px solid rgba(0,212,255,0.1)', display: 'flex', gap: '2rem' }}>
                                {[['SUNNY DAYS', '300+'], ['FROST RISK', 'ZERO'], ['CONDENSATION', 'MINIMAL']].map(([label, val]) => (
                                    <div key={label}>
                                        <div style={{ fontFamily: "'Space Grotesk'", fontSize: '0.75rem', fontWeight: 600, color: '#00D4FF', letterSpacing: '0.1em' }}>{val}</div>
                                        <div style={{ fontFamily: "'Space Grotesk'", fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(185,203,185,0.4)', marginTop: '2px' }}>{label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* ── BLOCK 02: Scale — 8 Hectares ── */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.05 }}
                        style={{
                            position: 'relative',
                            display: 'grid',
                            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                            minHeight: isMobile ? 'auto' : '400px',
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
                        {/* Left: Content */}
                        <div style={{
                            padding: isMobile ? '2rem 1.5rem' : '3.5rem',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            gap: '1.5rem',
                            borderRight: isMobile ? 'none' : '1px solid rgba(0, 255, 136, 0.08)',
                            order: isMobile ? 2 : 1
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
                                }}>02</span>
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
                                A vast, engineered physical proving ground spanning 8 hectares (400 × 200 meters). Designed to support complex multi-rover logistics, territorial syndicates, industrial test loops, and concurrent operation of thousands of teleoperated rovers.
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

                        {/* Right: Image Carousel */}
                        <div style={{ position: 'relative', overflow: 'hidden', minHeight: isMobile ? '220px' : 'auto', order: isMobile ? 1 : 2 }}>
                            <AnimatePresence mode='wait'>
                                <motion.img
                                    key={block01ImageIndex}
                                    src={block01Images[block01ImageIndex]}
                                    alt={block01Alts[block01ImageIndex]}
                                    initial={{ opacity: 0, scale: 1.05 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.6, ease: 'easeInOut' }}
                                    style={{ 
                                        width: '100%', height: '100%', 
                                        objectFit: 'cover', 
                                        display: 'block', 
                                        filter: 'brightness(0.85) saturate(1.1)' 
                                    }}
                                />
                            </AnimatePresence>

                            {/* Switcher Controls */}
                            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 1rem', zIndex: 10 }}>
                                <button 
                                    onClick={() => setBlock01ImageIndex(prev => (prev === 0 ? block01Images.length - 1 : prev - 1))}
                                    style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(0, 255, 136, 0.3)', color: 'var(--color-primary)', width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)', transition: 'all 0.3s' }}
                                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0, 255, 136, 0.2)'; e.currentTarget.style.borderColor = 'var(--color-primary)'; }}
                                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.3)'; e.currentTarget.style.borderColor = 'rgba(0, 255, 136, 0.3)'; }}
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                                </button>
                                <button 
                                    onClick={() => setBlock01ImageIndex(prev => (prev === block01Images.length - 1 ? 0 : prev + 1))}
                                    style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(0, 255, 136, 0.3)', color: 'var(--color-primary)', width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)', transition: 'all 0.3s' }}
                                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0, 255, 136, 0.2)'; e.currentTarget.style.borderColor = 'var(--color-primary)'; }}
                                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.3)'; e.currentTarget.style.borderColor = 'rgba(0, 255, 136, 0.3)'; }}
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                                </button>
                            </div>

                            {/* Pagination Dots */}
                            <div style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '8px', zIndex: 10 }}>
                                {block01Images.map((_, i) => (
                                    <div 
                                        key={i}
                                        onClick={() => setBlock01ImageIndex(i)}
                                        style={{ 
                                            width: i === block01ImageIndex ? '20px' : '6px', 
                                            height: '6px', 
                                            borderRadius: '3px', 
                                            background: i === block01ImageIndex ? 'var(--color-primary)' : 'rgba(255,255,255,0.3)', 
                                            cursor: 'pointer',
                                            transition: 'all 0.3s ease'
                                        }} 
                                    />
                                ))}
                            </div>

                            {/* Scanner corners */}
                            {['topLeft', 'topRight', 'bottomLeft', 'bottomRight'].map(pos => (
                                <div key={pos} style={{
                                    position: 'absolute',
                                    width: '20px', height: '20px',
                                    borderColor: 'rgba(0, 255, 136, 0.7)',
                                    borderStyle: 'solid',
                                    borderWidth: 0,
                                    zIndex: 5,
                                    ...(pos === 'topLeft' && { top: 16, left: 16, borderTopWidth: 2, borderLeftWidth: 2 }),
                                    ...(pos === 'topRight' && { top: 16, right: 16, borderTopWidth: 2, borderRightWidth: 2 }),
                                    ...(pos === 'bottomLeft' && { bottom: 16, left: 16, borderBottomWidth: 2, borderLeftWidth: 2 }),
                                    ...(pos === 'bottomRight' && { bottom: 16, right: 16, borderBottomWidth: 2, borderRightWidth: 2 }),
                                }} />
                            ))}
                        </div>
                    </motion.div>

                    {/* ── BLOCK 03: Unified Network — Electricity & Power Grid ── */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        style={{
                            position: 'relative',
                            display: 'grid',
                            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                            minHeight: isMobile ? 'auto' : '380px',
                            background: 'linear-gradient(135deg, rgba(10, 18, 22, 0.97) 0%, rgba(8, 14, 18, 0.99) 100%)',
                            border: '1px solid rgba(0, 212, 255, 0.15)',
                            overflow: 'hidden'
                        }}
                        whileHover={{
                            borderColor: 'rgba(0, 212, 255, 0.35)',
                            boxShadow: '0 0 40px rgba(0, 212, 255, 0.08)'
                        }}
                    >
                        {/* Left: Image Carousel */}
                        <div style={{ position: 'relative', overflow: 'hidden', minHeight: isMobile ? '220px' : 'auto' }}>
                            <AnimatePresence mode='wait'>
                                <motion.img
                                    key={block02ImageIndex}
                                    src={block02Images[block02ImageIndex]}
                                    alt={block02Alts[block02ImageIndex]}
                                    initial={{ opacity: 0, scale: 1.05 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.6, ease: 'easeInOut' }}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'brightness(0.85) saturate(1.2)' }}
                                />
                            </AnimatePresence>

                            {/* Switcher Controls */}
                            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 1rem', zIndex: 10 }}>
                                <button 
                                    onClick={() => setBlock02ImageIndex(prev => (prev === 0 ? block02Images.length - 1 : prev - 1))}
                                    style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(0,212,255,0.3)', color: '#00D4FF', width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)', transition: 'all 0.3s' }}
                                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,212,255,0.2)'; e.currentTarget.style.borderColor = '#00D4FF'; }}
                                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.3)'; e.currentTarget.style.borderColor = 'rgba(0,212,255,0.3)'; }}
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                                </button>
                                <button 
                                    onClick={() => setBlock02ImageIndex(prev => (prev === block02Images.length - 1 ? 0 : prev + 1))}
                                    style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(0,212,255,0.3)', color: '#00D4FF', width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)', transition: 'all 0.3s' }}
                                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,212,255,0.2)'; e.currentTarget.style.borderColor = '#00D4FF'; }}
                                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.3)'; e.currentTarget.style.borderColor = 'rgba(0,212,255,0.3)'; }}
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                                </button>
                            </div>

                            {/* Pagination Dots */}
                            <div style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '8px', zIndex: 10 }}>
                                {block02Images.map((_, i) => (
                                    <div 
                                        key={i}
                                        onClick={() => setBlock02ImageIndex(i)}
                                        style={{ 
                                            width: i === block02ImageIndex ? '20px' : '6px', 
                                            height: '6px', 
                                            borderRadius: '3px', 
                                            background: i === block02ImageIndex ? '#00D4FF' : 'rgba(255,255,255,0.3)', 
                                            cursor: 'pointer',
                                            transition: 'all 0.3s ease'
                                        }} 
                                    />
                                ))}
                            </div>

                            {/* Scanner corners */}
                            {['topLeft', 'topRight', 'bottomLeft', 'bottomRight'].map(pos => (
                                <div key={pos} style={{
                                    position: 'absolute', width: '18px', height: '18px',
                                    borderColor: 'rgba(0, 212, 255, 0.7)', borderStyle: 'solid', borderWidth: 0,
                                    zIndex: 5,
                                    ...(pos === 'topLeft' && { top: 14, left: 14, borderTopWidth: 2, borderLeftWidth: 2 }),
                                    ...(pos === 'topRight' && { top: 14, right: 14, borderTopWidth: 2, borderRightWidth: 2 }),
                                    ...(pos === 'bottomLeft' && { bottom: 14, left: 14, borderBottomWidth: 2, borderLeftWidth: 2 }),
                                    ...(pos === 'bottomRight' && { bottom: 14, right: 14, borderBottomWidth: 2, borderRightWidth: 2 }),
                                }} />
                            ))}
                            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(8,14,18,0.6) 0%, transparent 40%)', pointerEvents: 'none', zIndex: 4 }} />
                        </div>

                        {/* Right: Content */}
                        <div style={{
                            padding: isMobile ? '2rem 1.5rem' : '3.5rem',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            gap: '1.5rem',
                            borderLeft: isMobile ? 'none' : '1px solid rgba(0, 212, 255, 0.08)',
                        }}>
                            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '1rem' }}>
                                <span style={{
                                    fontFamily: "'Cinzel', serif",
                                    fontSize: isMobile ? '4rem' : '6rem',
                                    lineHeight: 1, fontWeight: 600,
                                    background: 'linear-gradient(135deg, #00D4FF 0%, #00FF88 100%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    opacity: 0.25
                                }}>03</span>
                                <div>
                                    <p style={{ fontFamily: "'Space Grotesk'", fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#00D4FF', marginBottom: '0.4rem', opacity: 0.85 }}>Power &amp; Energy</p>
                                    <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: isMobile ? '1.3rem' : '1.7rem', fontWeight: 400, letterSpacing: '0.08em', color: '#E6F0EB', textTransform: 'uppercase', margin: 0 }}>Unified Network</h3>
                                </div>
                            </div>
                            <p style={{ fontFamily: "'Space Grotesk'", fontSize: '1rem', color: 'rgba(185, 203, 185, 0.82)', lineHeight: 1.8, fontWeight: 300, margin: 0 }}>
                                A distributed 12V electrical grid with integrated magnetic charging stations covering the entire territory. The entire physical backbone is engineered on heavy-duty underground twisted-pair cabling, routed beneath the terrain surface and linking every charging station, distribution node, and infrastructure point across the facility. Standardized charging terminals allow Robulus rovers to snap on automatically with MagSafe-like ease.
                            </p>
                            <div style={{ paddingTop: '1.25rem', borderTop: '1px solid rgba(0,212,255,0.1)', display: 'flex', gap: '2rem' }}>
                                {[['GRID VOLTAGE', '12V DC'], ['CHARGING', 'MAGNETIC SNAP'], ['NIGHT LIGHTING', '160+ NODES']].map(([label, val]) => (
                                    <div key={label}>
                                        <div style={{ fontFamily: "'Space Grotesk'", fontSize: '0.75rem', fontWeight: 600, color: '#00D4FF', letterSpacing: '0.1em' }}>{val}</div>
                                        <div style={{ fontFamily: "'Space Grotesk'", fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(185,203,185,0.4)', marginTop: '2px' }}>{label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* ── BLOCK 04: Teleoperation Wi-Fi Network (Video & Control) ── */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.15 }}
                        style={{
                            position: 'relative',
                            display: 'grid',
                            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                            minHeight: isMobile ? 'auto' : '380px',
                            background: 'linear-gradient(135deg, rgba(14, 26, 22, 0.97) 0%, rgba(9, 16, 14, 0.99) 100%)',
                            border: '1px solid rgba(0, 255, 136, 0.15)',
                            overflow: 'hidden'
                        }}
                        whileHover={{
                            borderColor: 'rgba(0, 255, 136, 0.35)',
                            boxShadow: '0 0 40px rgba(0, 255, 136, 0.08)'
                        }}
                    >
                        {/* Left: Content */}
                        <div style={{
                            padding: isMobile ? '2rem 1.5rem' : '3.5rem',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            gap: '1.5rem',
                            borderRight: isMobile ? 'none' : '1px solid rgba(0, 255, 136, 0.08)',
                            order: isMobile ? 2 : 1
                        }}>
                            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '1rem' }}>
                                <span style={{
                                    fontFamily: "'Cinzel', serif",
                                    fontSize: isMobile ? '4rem' : '6rem',
                                    lineHeight: 1, fontWeight: 600,
                                    background: 'linear-gradient(135deg, #00FF88 0%, #00D4FF 100%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    opacity: 0.25
                                }}>04</span>
                                <div>
                                    <p style={{ fontFamily: "'Space Grotesk'", fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--color-primary)', marginBottom: '0.4rem', opacity: 0.85 }}>Telemetry &amp; Video Link</p>
                                    <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: isMobile ? '1.3rem' : '1.7rem', fontWeight: 400, letterSpacing: '0.08em', color: '#E6F0EB', textTransform: 'uppercase', margin: 0 }}>Wi-Fi Telemetry Grid</h3>
                                </div>
                            </div>
                            <p style={{ fontFamily: "'Space Grotesk'", fontSize: '1rem', color: 'rgba(185, 203, 185, 0.85)', lineHeight: 1.8, fontWeight: 300, margin: 0 }}>
                                An industrial-grade Wi-Fi mesh network covering the entire 8-hectare facility. High-bandwidth, low-jitter wireless access points transmit live high-definition FPV video streams directly from rover cameras to remote pilots worldwide, while simultaneously receiving sub-millisecond teleoperation and steering control commands without packet drops.
                            </p>
                            <div style={{ paddingTop: '1.25rem', borderTop: '1px solid rgba(0,255,136,0.1)', display: 'flex', gap: '2rem' }}>
                                {[['WIFI MESH', '48+ NODES'], ['FPV VIDEO', '1080P STREAM'], ['CONTROL LINK', 'SUB-50MS']].map(([label, val]) => (
                                    <div key={label}>
                                        <div style={{ fontFamily: "'Space Grotesk'", fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-primary)', letterSpacing: '0.1em' }}>{val}</div>
                                        <div style={{ fontFamily: "'Space Grotesk'", fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(185,203,185,0.4)', marginTop: '2px' }}>{label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right: Image */}
                        <div style={{ position: 'relative', overflow: 'hidden', minHeight: isMobile ? '220px' : 'auto', order: isMobile ? 1 : 2 }}>
                            <img
                                src="/images/TP.png"
                                alt="Rover FPV Video Stream and Wi-Fi Control Link"
                                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.8s ease, filter 0.5s ease', filter: 'brightness(0.9) saturate(1.15)' }}
                                onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.04)'; e.currentTarget.style.filter = 'brightness(1.05) saturate(1.3)'; }}
                                onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.filter = 'brightness(0.9) saturate(1.15)'; }}
                            />
                            {['topLeft', 'topRight', 'bottomLeft', 'bottomRight'].map(pos => (
                                <div key={pos} style={{
                                    position: 'absolute', width: '18px', height: '18px',
                                    borderColor: 'rgba(0, 255, 136, 0.7)', borderStyle: 'solid', borderWidth: 0,
                                    zIndex: 5,
                                    ...(pos === 'topLeft' && { top: 14, left: 14, borderTopWidth: 2, borderLeftWidth: 2 }),
                                    ...(pos === 'topRight' && { top: 14, right: 14, borderTopWidth: 2, borderRightWidth: 2 }),
                                    ...(pos === 'bottomLeft' && { bottom: 14, left: 14, borderBottomWidth: 2, borderLeftWidth: 2 }),
                                    ...(pos === 'bottomRight' && { bottom: 14, right: 14, borderBottomWidth: 2, borderRightWidth: 2 }),
                                }} />
                            ))}
                            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(9,16,14,0.5) 0%, transparent 40%)' }} />
                        </div>
                    </motion.div>

                    {/* ── BLOCK 05: Internal Communication — Junctum Network (BLE & Internal API) ── */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        style={{
                            position: 'relative',
                            display: 'grid',
                            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                            minHeight: isMobile ? 'auto' : '380px',
                            background: 'linear-gradient(135deg, rgba(8, 16, 20, 0.97) 0%, rgba(10, 15, 18, 0.99) 100%)',
                            border: '1px solid rgba(0, 212, 255, 0.15)',
                            overflow: 'hidden'
                        }}
                        whileHover={{
                            borderColor: 'rgba(0, 212, 255, 0.35)',
                            boxShadow: '0 0 40px rgba(0, 212, 255, 0.08)'
                        }}
                    >
                        {/* Left: Image */}
                        <div style={{ position: 'relative', overflow: 'hidden', minHeight: isMobile ? '220px' : 'auto' }}>
                            <img
                                src="/images/PCB.jpg"
                                alt="Juvantia Robulus Hardware Platform running Junctum Network"
                                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.8s ease, filter 0.5s ease', filter: 'brightness(0.9) contrast(1.1) saturate(1.1)' }}
                                onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.04)'; e.currentTarget.style.filter = 'brightness(1.05) contrast(1.15) saturate(1.2)'; }}
                                onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.filter = 'brightness(0.9) contrast(1.1) saturate(1.1)'; }}
                            />
                            {['topLeft', 'topRight', 'bottomLeft', 'bottomRight'].map(pos => (
                                <div key={pos} style={{
                                    position: 'absolute', width: '18px', height: '18px',
                                    borderColor: 'rgba(0, 212, 255, 0.7)', borderStyle: 'solid', borderWidth: 0,
                                    zIndex: 5,
                                    ...(pos === 'topLeft' && { top: 14, left: 14, borderTopWidth: 2, borderLeftWidth: 2 }),
                                    ...(pos === 'topRight' && { top: 14, right: 14, borderTopWidth: 2, borderRightWidth: 2 }),
                                    ...(pos === 'bottomLeft' && { bottom: 14, left: 14, borderBottomWidth: 2, borderLeftWidth: 2 }),
                                    ...(pos === 'bottomRight' && { bottom: 14, right: 14, borderBottomWidth: 2, borderRightWidth: 2 }),
                                }} />
                            ))}
                            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to left, rgba(10,15,18,0.55) 0%, transparent 40%)' }} />
                        </div>

                        {/* Right: Content */}
                        <div style={{
                            padding: isMobile ? '2rem 1.5rem' : '3.5rem',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            gap: '1.5rem',
                            borderLeft: isMobile ? 'none' : '1px solid rgba(0, 212, 255, 0.08)'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '1rem' }}>
                                <span style={{
                                    fontFamily: "'Cinzel', serif",
                                    fontSize: isMobile ? '4rem' : '6rem',
                                    lineHeight: 1, fontWeight: 600,
                                    background: 'linear-gradient(135deg, #00D4FF 0%, #00FF88 100%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    opacity: 0.25
                                }}>05</span>
                                <div>
                                    <p style={{ fontFamily: "'Space Grotesk'", fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#00D4FF', marginBottom: '0.4rem', opacity: 0.85 }}>Internal Communication</p>
                                    <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: isMobile ? '1.3rem' : '1.7rem', fontWeight: 400, letterSpacing: '0.08em', color: '#E6F0EB', textTransform: 'uppercase', margin: 0 }}>Junctum Network</h3>
                                </div>
                            </div>
                            <p style={{ fontFamily: "'Space Grotesk'", fontSize: '1rem', color: 'rgba(185, 203, 185, 0.85)', lineHeight: 1.8, fontWeight: 300, margin: 0 }}>
                                Inside the facility, teleoperators communicate with each other and with stationary infrastructure — charging docks, smart gates, and sensors — through a proprietary protocol: <strong>JUNCTUM NETWORK</strong>. Rather than generic Bluetooth, Junctum merges our custom core engine process with low-energy BLE transport and an internal real-time event API, enabling seamless coordination between every operator and every fixed device across the terrain.
                            </p>
                        </div>
                    </motion.div>

                    {/* ── BLOCK 06: Tactical Wide — Asset Protection ── */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.25 }}
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
                                <p style={{ fontFamily: "'Space Grotesk'", fontSize: '0.62rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#00FF88', opacity: 0.7, margin: '0 0 0.5rem' }}>Physical &amp; On-chain</p>
                                <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: isMobile ? '1.2rem' : '1.5rem', fontWeight: 400, letterSpacing: '0.08em', color: '#E6F0EB', textTransform: 'uppercase', margin: 0 }}>Asset Protection</h3>
                                <div style={{ width: '32px', height: '1px', background: '#00FF88', opacity: 0.35, marginTop: '1rem' }} />
                            </div>
                            {/* Phantom number */}
                            <span style={{
                                fontFamily: "'Cinzel'", fontSize: '5rem', fontWeight: 700, lineHeight: 1,
                                background: 'linear-gradient(135deg, #00FF88 0%, #00D4FF 100%)',
                                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                                opacity: 0.12, userSelect: 'none', display: 'block', marginTop: 'auto'
                            }}>06</span>
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
        </>
    );
};

export default Home;
