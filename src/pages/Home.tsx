import React, { useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import CursorGlow from '../components/CursorGlow';
import AnimatedBackground from '../components/AnimatedBackground';

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

const ShelterTabs: React.FC = () => {
    const shelterTypes = [
        { id: 'workshop', label: 'Workshop', description: 'The heart of industry. A space for crafting, repairing, and upgrading Robulus units to peak performance.', image: '/images/WOR.png' },
        { id: 'apartments', label: 'Robulus Apartments', description: 'Efficient, secure housing for your workforce. A rested Robulus is a productive Robulus.', image: '/images/RA.png' },
        { id: 'shop', label: 'Spare Parts Shop', description: 'Commerce in its purest form. A hub for trading essential components and energy cells.', image: '/images/SPS.png' },
        { id: 'club', label: 'Private Club', description: 'Where deals are made. An exclusive gathering place for networking, leisure, and influence.', image: '/images/CLUB.png' },
    ];

    const [selectedShelter, setSelectedShelter] = useState(shelterTypes[0]);
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
                    {shelterTypes.map((shelter) => (
                        <motion.button
                            key={shelter.id}
                            onClick={() => setSelectedShelter(shelter)}
                            whileTap={{ scale: 0.95 }}
                            style={{
                                flexShrink: 0,
                                scrollSnapAlign: 'start',
                                padding: '0.6rem 1rem',
                                background: selectedShelter.id === shelter.id
                                    ? 'linear-gradient(135deg, rgba(0, 255, 136, 0.2) 0%, rgba(0, 212, 255, 0.1) 100%)'
                                    : 'rgba(10, 15, 10, 0.6)',
                                color: selectedShelter.id === shelter.id ? 'var(--color-primary)' : 'var(--color-text-muted)',
                                border: `1px solid ${selectedShelter.id === shelter.id ? 'rgba(0, 255, 136, 0.4)' : 'rgba(0, 255, 136, 0.1)'}`,
                                borderRadius: '20px',
                                fontSize: '0.75rem',
                                cursor: 'pointer',
                                fontFamily: 'var(--font-heading)',
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em',
                                whiteSpace: 'nowrap',
                                boxShadow: selectedShelter.id === shelter.id ? '0 0 15px rgba(0, 255, 136, 0.2)' : 'none'
                            }}
                        >
                            {shelter.label}
                        </motion.button>
                    ))}
                </div>

                {/* Content Card */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={selectedShelter.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        style={{ padding: '0 1rem' }}
                    >
                        <ImageCard src={selectedShelter.image} alt={selectedShelter.label} aspectRatio="3/2" />
                        <div style={{ marginTop: '1.5rem' }}>
                            <h3 style={{
                                fontSize: '1.4rem',
                                background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                marginBottom: '0.75rem',
                                fontWeight: 400
                            }}>
                                {selectedShelter.label}
                            </h3>
                            <p style={{
                                fontSize: '0.95rem',
                                color: 'var(--color-text-muted)',
                                lineHeight: '1.7',
                                fontWeight: 300
                            }}>
                                {selectedShelter.description}
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
                    key={selectedShelter.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                    style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '450px' }}
                >
                    <ImageCard src={selectedShelter.image} alt={selectedShelter.label} aspectRatio="3/2" />
                    <div>
                        <h3 style={{
                            fontSize: '1.6rem',
                            background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            marginBottom: '0.75rem',
                            fontWeight: 400
                        }}>
                            {selectedShelter.label}
                        </h3>
                        <p style={{
                            fontSize: '1rem',
                            color: 'var(--color-text-muted)',
                            lineHeight: '1.7',
                            fontWeight: 300
                        }}>
                            {selectedShelter.description}
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
                {shelterTypes.map((shelter) => (
                    <motion.button
                        key={shelter.id}
                        onClick={() => setSelectedShelter(shelter)}
                        whileHover={{ x: selectedShelter.id === shelter.id ? 0 : -4 }}
                        style={{
                            padding: '1rem 1.5rem',
                            textAlign: 'right',
                            background: selectedShelter.id === shelter.id
                                ? 'linear-gradient(-90deg, rgba(0, 255, 136, 0.15) 0%, transparent 100%)'
                                : 'transparent',
                            color: selectedShelter.id === shelter.id ? 'var(--color-primary)' : 'var(--color-text-muted)',
                            border: 'none',
                            borderRight: `2px solid ${selectedShelter.id === shelter.id ? 'var(--color-primary)' : 'transparent'}`,
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
                            boxShadow: selectedShelter.id === shelter.id ? '0 0 20px rgba(0, 255, 136, 0.1)' : 'none'
                        }}
                    >
                        <span>{shelter.label}</span>
                        {selectedShelter.id === shelter.id && (
                            <motion.span
                                layoutId="shelterIndicator"
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

import PageTitle from '../components/PageTitle';

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
            <PageTitle title="JUVANTIA Mini-Robot Park" />
            <AnimatedBackground />
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
                justifyContent: isMobile ? 'center' : 'flex-start',
                textAlign: 'center',
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
                <motion.div style={{
                    opacity: heroOpacity,
                    zIndex: 3,
                    maxWidth: '1200px',
                    padding: '0 2rem',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '100%',
                    height: isMobile ? 'auto' : '100%',
                    paddingTop: isMobile ? '0' : '100px',
                    paddingBottom: isMobile ? '0' : '15vh'
                }}>
                    <div style={{
                        flex: isMobile ? '0 0 auto' : '1',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                        marginBottom: isMobile ? '2rem' : '0'
                    }}>
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
                            style={{
                                fontSize: 'clamp(3rem, 9vw, 8rem)',
                                background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-text) 40%, var(--color-secondary) 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                fontWeight: 400,
                                letterSpacing: '0.25em',
                                paddingLeft: '0.25em',
                                position: 'relative',
                                zIndex: 2
                            }}
                        >
                            JUVANTIA
                        </motion.h1>
                    </div>

                    {/* Hero Feature Plate */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: isMobile ? '2rem' : '3rem',
                            maxWidth: '1200px',
                            width: '100%',
                            padding: 0,
                            position: 'relative',
                            zIndex: 2
                        }}
                    >
                        {/* Images Side */}
                        <div style={{
                            display: 'flex',
                            gap: '1.5rem',
                            justifyContent: 'center',
                            flexWrap: 'wrap',
                            width: '100%'
                        }}>
                            {[
                                '/images/TP.png',
                                '/images/TP2.png'
                            ].map((src, idx) => (
                                <motion.div
                                    key={idx}
                                    whileHover={{ scale: 1.05, y: -5 }}
                                    style={{
                                        position: 'relative',
                                        borderRadius: '16px',
                                        overflow: 'hidden',
                                        boxShadow: '0 8px 30px rgba(0,0,0,0.4)',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        width: isMobile ? 'calc(50% - 0.75rem)' : '420px',
                                        height: isMobile ? '120px' : '260px',
                                    }}
                                >
                                    <div style={{
                                        position: 'absolute',
                                        inset: 0,
                                        background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.2))',
                                        zIndex: 1
                                    }} />
                                    <img
                                        src={src}
                                        alt={`Park preview ${idx + 1}`}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover'
                                        }}
                                    />
                                </motion.div>
                            ))}
                        </div>

                        {/* Text Side */}
                        <div style={{
                            textAlign: 'center',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem',
                            maxWidth: '900px'
                        }}>
                            <p style={{
                                fontSize: 'clamp(1rem, 1.5vw, 1.3rem)',
                                background: 'linear-gradient(90deg, var(--color-primary), var(--color-secondary))',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                lineHeight: '1.6',
                                fontWeight: 400,
                                margin: 0,
                                textShadow: '0 0 30px rgba(0, 255, 136, 0.3)'
                            }}>
                                A Teleoperated Mini-Robot Park with a self-contained internal economy.


                            </p>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Scroll Indicator - Hidden on mobile */}

            </section >

            {/* ===== OUR MISSION SECTION ===== */}
            <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                style={{
                    padding: isMobile ? '5rem 1rem' : '6rem 2rem',
                    background: 'transparent',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    position: 'relative',
                    zIndex: 1
                }}
            >
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '1px',
                    background: 'linear-gradient(90deg, transparent, rgba(0, 255, 136, 0.2), transparent)',
                }} />

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{
                        fontSize: isMobile ? '1.8rem' : 'clamp(2rem, 4vw, 2.8rem)',
                        marginBottom: '1rem',
                        background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        fontWeight: 400,
                        letterSpacing: isMobile ? '0.1em' : '0.15em',
                        textTransform: 'uppercase',
                        textAlign: 'center',
                        position: 'relative',
                        zIndex: 2
                    }}
                >
                    OUR MISSION
                </motion.h2>

                <div className="divider-glow" style={{ marginBottom: isMobile ? '3rem' : '4rem' }} />

                <GlassCard style={{
                    maxWidth: '1100px',
                    width: '100%',
                    padding: isMobile ? '2rem' : '3rem',
                    background: 'rgba(10, 15, 10, 0.4)'
                }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', textAlign: 'left' }}>
                        <p style={{
                            fontSize: isMobile ? '1.1rem' : '1.35rem',
                            lineHeight: '1.6',
                            color: 'var(--color-text)',
                            margin: 0,
                            fontWeight: 300,
                            textShadow: '0 2px 10px rgba(0,0,0,0.3)'
                        }}>
                            <span style={{ fontWeight: 600, color: '#fff' }}>To channel the explosive progress in robotics into a new kind of living physical ecosystem</span>: an outdoor technopark with reliable Wi‑Fi coverage and a unified 24V low‑voltage power grid.
                        </p>
                        <p style={{
                            fontSize: isMobile ? '1.1rem' : '1.35rem',
                            lineHeight: '1.6',
                            color: 'var(--color-text)',
                            margin: 0,
                            fontWeight: 300,
                            textShadow: '0 2px 10px rgba(0,0,0,0.3)'
                        }}>
                            A permanent home for thousands of teleoperated mini‑robots (from units 3D‑printed by enthusiasts to production models from manufacturers), where they live and work, piloted exclusively from the digital world.
                        </p>
                        <p style={{
                            fontSize: isMobile ? '1.1rem' : '1.35rem',
                            lineHeight: '1.6',
                            color: 'var(--color-text)',
                            margin: 0,
                            fontWeight: 300,
                            textShadow: '0 2px 10px rgba(0,0,0,0.3)'
                        }}>
                            The society of machines ranges from solitary "hermits" powered by their own solar panels to highly specialized workers: stationary repair-bots, camera drones broadcasting live feeds, and rugged rover-guides for remote visitors — all transacting within a shared, euro‑pegged digital economy.
                        </p>
                        <p style={{
                            fontSize: isMobile ? '1.1rem' : '1.35rem',
                            lineHeight: '1.6',
                            color: 'var(--color-text)',
                            margin: 0,
                            fontWeight: 300,
                            textShadow: '0 2px 10px rgba(0,0,0,0.3)'
                        }}>
                            In short, JUVANTIA will become the <span style={{ color: 'var(--color-primary)', fontWeight: 500 }}>premier field for engineering, research, testing, demonstration, and entertainment</span> in the world of mini‑robots.
                        </p>
                    </div>
                </GlassCard>

            </motion.section>

            {/* ===== PAX JUVANTIA SECTION ===== */}
            < motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                style={{
                    padding: isMobile ? '5rem 1rem' : '6rem 2rem',
                    background: 'transparent',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    position: 'relative',
                    zIndex: 1
                }}
            >
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{
                        fontSize: isMobile ? '1.8rem' : 'clamp(2rem, 4vw, 2.8rem)',
                        marginBottom: '1rem',
                        background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        fontWeight: 400,
                        letterSpacing: isMobile ? '0.1em' : '0.15em',
                        textTransform: 'uppercase',
                        textAlign: 'center',
                        position: 'relative',
                        zIndex: 2
                    }}
                >
                    RULES & GOVERNANCE
                </motion.h2>

                <div className="divider-glow" style={{ marginBottom: isMobile ? '3rem' : '5rem' }} />

                <div style={{
                    display: 'flex',
                    flexDirection: isMobile ? 'column' : 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: isMobile ? '3rem' : '4rem',
                    maxWidth: '1200px',
                    width: '100%',
                    position: 'relative',
                    zIndex: 2
                }}>
                    {/* Left Side: GIF */}
                    <motion.div
                        initial={{ opacity: 0, x: isMobile ? 0 : -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        style={{
                            flex: 1,
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '1rem',
                            position: 'relative',
                            zIndex: 2
                        }}
                    >
                        <img
                            src="/images/kustodia.gif"
                            alt="Kustodia"
                            style={{
                                width: '100%',
                                height: 'auto',
                                borderRadius: '12px',
                                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
                                border: '1px solid rgba(255, 255, 255, 0.1)'
                            }}
                        />
                        <a
                            href="https://www.youtube.com/watch?v=OOjda40t6Ng"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                color: 'var(--color-text-muted)',
                                textDecoration: 'none',
                                fontSize: '0.9rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                transition: 'color 0.2s'
                            }}
                            onMouseOver={(e) => e.currentTarget.style.color = 'var(--color-primary)'}
                            onMouseOut={(e) => e.currentTarget.style.color = 'var(--color-text-muted)'}
                        >
                            <span>source</span>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                <polyline points="15 3 21 3 21 9" />
                                <line x1="10" y1="14" x2="21" y2="3" />
                            </svg>
                        </a>
                    </motion.div>

                    {/* Right Side: Text & Card */}
                    <motion.div
                        initial={{ opacity: 0, x: isMobile ? 0 : 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        style={{
                            flex: 1,
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '2rem',
                            textAlign: isMobile ? 'center' : 'left',
                            position: 'relative',
                            zIndex: 2
                        }}
                    >
                        <p style={{
                            fontSize: isMobile ? '1.1rem' : '1.25rem',
                            color: 'var(--color-text-muted)',
                            lineHeight: '1.8',
                            fontWeight: 300,
                            margin: 0,
                            position: 'relative',
                            zIndex: 2
                        }}>
                            Your Remote Assets are protected under the JUVANTIA Charter.
                        </p>

                        <a href="https://tabularium.juvantia.org/rules/charter" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', width: '100%' }}>
                            <GlassCard style={{
                                padding: '2.5rem 2rem',
                                textAlign: isMobile ? 'center' : 'left',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '0.5rem',
                                height: 'auto'
                            }}>
                                <h3 style={{
                                    color: 'var(--color-primary)',
                                    fontSize: isMobile ? '1.4rem' : '1.6rem',
                                    fontWeight: 500,
                                    letterSpacing: '0.05em',
                                    textDecoration: 'underline',
                                    textUnderlineOffset: '4px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: isMobile ? 'center' : 'flex-start',
                                    gap: '0.5rem',
                                    position: 'relative',
                                    zIndex: 2
                                }}>
                                    Read Charter
                                    <svg width="0.8em" height="0.8em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.8 }}>
                                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                        <polyline points="15 3 21 3 21 9" />
                                        <line x1="10" y1="14" x2="21" y2="3" />
                                    </svg>
                                </h3>
                                <p style={{
                                    color: 'var(--color-text-muted)',
                                    fontSize: '1.1rem',
                                    lineHeight: '1.6',
                                    textTransform: 'lowercase',
                                    position: 'relative',
                                    zIndex: 2
                                }}>
                                    principles, governance, and safety.
                                </p>
                            </GlassCard>
                        </a>
                    </motion.div>
                </div>
            </motion.section >

            <SectionDivider />

            {/* ===== POWER & PROTECTION SECTION ===== */}
            <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                style={{
                    padding: isMobile ? '5rem 1rem' : '10rem 2rem',
                    background: 'transparent',
                    display: 'flex',
                    justifyContent: 'center',
                    position: 'relative',
                    zIndex: 1
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
                        style={{
                            width: isMobile ? '100%' : '50%',
                            position: 'relative',
                            zIndex: 2
                        }}
                    >
                        <ImageCard src="/images/charging_station.png" alt="Charging Station" aspectRatio="4/3" />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: isMobile ? 0 : 40, y: isMobile ? 20 : 0 }}
                        whileInView={{ opacity: 1, x: 0, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        style={{
                            width: isMobile ? '100%' : '50%',
                            position: 'relative',
                            zIndex: 2
                        }}
                    >
                        <h2 style={{
                            fontSize: isMobile ? '1.8rem' : 'clamp(2rem, 4vw, 2.8rem)',
                            marginBottom: '1.5rem',
                            fontWeight: 400,
                            position: 'relative',
                            zIndex: 2
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
                            fontWeight: 300,
                            position: 'relative',
                            zIndex: 2
                        }}>
                            You can receive charging via Pogo Pin Magnetic 4P.
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
                                <h4 style={{
                                    color: 'var(--color-text)',
                                    marginBottom: '0.5rem',
                                    fontSize: isMobile ? '1.05rem' : '1.2rem',
                                    fontWeight: 500,
                                    textTransform: 'none',
                                    position: 'relative',
                                    zIndex: 2
                                }}>
                                    Universal Energy
                                </h4>
                                <p style={{ fontSize: isMobile ? '0.9rem' : '0.95rem', color: 'var(--color-text-muted)', lineHeight: '1.6' }}>
                                    Standardized 24V charging infrastructure available across the park.
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
                    background: 'transparent',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    position: 'relative',
                    zIndex: 1
                }}
            >
                <div style={{ maxWidth: '1000px', width: '100%', textAlign: 'center', marginBottom: isMobile ? '3rem' : '5rem' }}>
                    <h2 style={{
                        fontSize: isMobile ? '1.8rem' : 'clamp(2rem, 4vw, 2.8rem)',
                        marginBottom: '1.5rem',
                        background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        fontWeight: 400,
                        position: 'relative',
                        zIndex: 2
                    }}>
                        The Economy
                    </h2>
                    <p style={{
                        fontSize: isMobile ? '1.1rem' : '1.3rem',
                        color: 'var(--color-text-muted)',
                        lineHeight: '1.8',
                        fontWeight: 300,
                        maxWidth: '800px',
                        margin: '0 auto',
                        position: 'relative',
                        zIndex: 2
                    }}>
                        JUVANTIA runs a real, self-contained economy: all value is created by participants and stays inside the park.
                    </p>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
                    gap: '2rem',
                    maxWidth: '1200px',
                    width: '100%',
                    position: 'relative',
                    zIndex: 2
                }}>
                    <GlassCard style={{ height: '100%', padding: '2.5rem 2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <h3 style={{ color: 'var(--color-primary)', fontSize: '1.4rem', fontWeight: 500, marginBottom: '0.5rem' }}>JUVANTIA Treasury</h3>
                        <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.7', fontSize: '1rem' }}>
                            All payments — land sales, services, fees, and taxes — go into a single public treasury and are spent solely on JUVANTIA’s development: infrastructure, services, events, and new districts.
                        </p>
                    </GlassCard>

                    <GlassCard style={{ height: '100%', padding: '2.5rem 2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <h3 style={{ color: 'var(--color-primary)', fontSize: '1.4rem', fontWeight: 500, marginBottom: '0.5rem' }}>COMMUNITY FIRST</h3>
                        <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.7', fontSize: '1rem' }}>
                            Individual participants do not pay any fees directly to the operator.
                        </p>
                        <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.7', fontSize: '1rem' }}>
                            Operational revenue comes only from commercial companies that use the park as an R&D, testing, or marketing platform.
                        </p>
                    </GlassCard>

                    <GlassCard style={{ height: '100%', padding: '2.5rem 2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <h3 style={{ color: 'var(--color-primary)', fontSize: '1.4rem', fontWeight: 500, marginBottom: '0.5rem' }}>Free Economy</h3>
                        <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.7', fontSize: '1rem' }}>
                            Prices, salaries, and projects are defined by participants and businesses themselves. JUVANTIA provides rules, dispute resolution, and infrastructure — everything else is driven by entrepreneurial initiative.
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
                    alignItems: 'center',
                    position: 'relative',
                    zIndex: 2
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
                            JUVANTIA’s monetary layer is based on euro-pegged stablecoins issued under the EU <a href="https://www.esma.europa.eu/esmas-activities/digital-finance-and-innovation/markets-crypto-assets-regulation-mica" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)', textDecoration: 'none', borderBottom: '1px solid rgba(0,255,136,0.3)' }}>MiCA</a> regulatory framework.
                        </p>
                        <p style={{
                            fontSize: isMobile ? '1rem' : '1.1rem',
                            color: 'var(--color-text-muted)',
                            lineHeight: '1.7'
                        }}>
                            JUVANTIA operates exclusively with regulated EUR stablecoins such as:
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
                            Taxes, fees, and treasury operations are settled in these assets, giving the park a clear, euro-denominated economic base.
                        </p>
                    </div>
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
                        The Arena Without Rules
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
                                    Your own broadcast tower: exclusive access to the Colosseum screen and speakers to stream your content in the Colosseum District.
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
                    background: 'transparent',
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
                        textAlign: 'center',
                        position: 'relative',
                        zIndex: 2
                    }}
                >
                    WHAT YOU CAN BUILD
                </motion.h2>
                <div className="divider-glow" style={{ marginBottom: isMobile ? '2rem' : '5rem' }} />
                <RolesTabs />

                <motion.a
                    href="https://www.youtube.com/@juvantia/playlists"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02, backgroundColor: 'rgba(255, 255, 255, 0.08)', borderColor: 'rgba(255, 255, 255, 0.3)' }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                        marginTop: '3rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        padding: '1rem 2rem',
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '100px',
                        textDecoration: 'none',
                        color: 'var(--color-text)',
                        cursor: 'pointer',
                        backdropFilter: 'blur(10px)',
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
                        transition: 'all 0.3s ease'
                    }}
                >
                    <img src="/images/YouTube_Logo_2017.svg" alt="YouTube" style={{ height: '30px', width: 'auto' }} />
                    <span style={{
                        fontSize: '0.9rem',
                        fontWeight: 400,
                        letterSpacing: '0.05em',
                        textTransform: 'uppercase'
                    }}>
                        Watch more enthusiast builds in our YouTube playlist
                    </span>
                </motion.a>
            </motion.section>

            <SectionDivider />

            {/* ===== SHELTER SECTION ===== */}
            <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                style={{
                    padding: isMobile ? '5rem 0' : '10rem 2rem',
                    background: 'transparent',
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
                        textAlign: 'center',
                        position: 'relative',
                        zIndex: 2
                    }}
                >
                    Build Your Shelter
                </motion.h2>
                <div className="divider-glow" style={{ marginBottom: isMobile ? '2rem' : '5rem' }} />
                <ShelterTabs />
            </motion.section>


        </>
    );
};

export default Home;
