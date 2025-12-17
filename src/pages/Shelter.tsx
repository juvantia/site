import React, { useState, useEffect } from 'react';
import CursorGlow from '../components/CursorGlow';
import PageTitle from '../components/PageTitle';

const Shelter: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 100);
        const checkMobile = () => setIsMobile(window.innerWidth <= 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => {
            clearTimeout(timer);
            window.removeEventListener('resize', checkMobile);
        };
    }, []);

    const timelineSteps = [
        {
            title: "Land Registration",
            description: "JUVANTIA secures the physical territory for the technopark. The official map and landscape are revealed, signaling readiness for construction.",
            icon: "📋",
            phase: "preparation" // оранжевый - подготовка
        },
        {
            title: "Infrastructure Setup",
            description: "Installation of electricity (24V) and network connectivity",
            duration: "2-3 months",
            icon: "⚡",
            phase: "preparation" // оранжевый - подготовка
        },
        {
            title: "Shelter Installation",
            description: "Build and install your Shelter yourself in the technopark",
            duration: "3-6 months",
            icon: "🔨",
            isWindow: true,
            phase: "active" // зелёный - можно устанавливать
        },
        {
            title: "Robuli-Only Era",
            description: "Installation only possible via Robulus",
            duration: "∞",
            icon: "🤖",
            isWindow: true,
            phase: "future" // красный - будущее
        }
    ];

    // Цвета для фаз timeline
    const phaseColors = {
        preparation: { bg: '#ff9500', shadow: 'rgba(255, 149, 0, 0.5)' },
        active: { bg: 'var(--color-primary)', shadow: 'rgba(0, 255, 136, 0.5)' },
        future: { bg: '#ff4757', shadow: 'rgba(255, 71, 87, 0.5)' }
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: 'var(--color-bg)',
            position: 'relative',
            overflow: 'hidden'
        }}>
            <PageTitle title="Shelter - JUVANTIA" />
            <CursorGlow size={350} opacity={0.12} />

            {/* Animated Background Elements */}
            <div style={{
                position: 'absolute',
                top: '10%',
                right: '10%',
                width: '500px',
                height: '500px',
                background: 'radial-gradient(circle, rgba(0, 255, 136, 0.08) 0%, transparent 70%)',
                borderRadius: '50%',
                filter: 'blur(80px)',
                pointerEvents: 'none'
            }} />
            <div style={{
                position: 'absolute',
                bottom: '10%',
                left: '10%',
                width: '400px',
                height: '400px',
                background: 'radial-gradient(circle, rgba(0, 212, 255, 0.06) 0%, transparent 70%)',
                borderRadius: '50%',
                filter: 'blur(80px)',
                pointerEvents: 'none'
            }} />

            <div style={{
                padding: isMobile ? '4rem 1rem 4rem' : '6rem 2rem 4rem',
                maxWidth: '1200px',
                margin: '0 auto',
                position: 'relative',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
            }}>
                {/* Hero Section */}
                <div style={{
                    textAlign: 'center',
                    marginBottom: isMobile ? '4rem' : '6rem',
                    position: 'relative'
                }}>
                    <div style={{
                        display: 'inline-block',
                        position: 'relative',
                        marginBottom: isMobile ? '2rem' : '3rem'
                    }}>
                        <img
                            src="/images/DOMUS1.png"
                            alt="Shelter"
                            style={{
                                maxWidth: isMobile ? '100%' : '550px',
                                width: '100%',
                                height: 'auto',
                                borderRadius: isMobile ? '20px' : '24px',
                                boxShadow: '0 20px 60px rgba(0, 255, 136, 0.2), 0 0 80px rgba(0, 255, 136, 0.1)',
                                border: '1px solid rgba(0, 255, 136, 0.2)',
                                transform: 'translateZ(0)',
                                transition: 'transform 0.3s ease',
                            }}
                        />
                    </div>

                    <p style={{
                        fontSize: isMobile ? '1.1rem' : '1.35rem',
                        lineHeight: '1.8',
                        maxWidth: '800px',
                        margin: '0 auto',
                        background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        fontWeight: 400,
                        letterSpacing: '0.01em'
                    }}>
                        Build your structure in JUVANTIA.<br />
                        For personal use or commercial profit.
                    </p>
                </div>

                {/* What is Domus Section */}
                <div style={{
                    marginBottom: isMobile ? '4rem' : '6rem',
                    background: 'linear-gradient(135deg, rgba(0, 255, 136, 0.03) 0%, rgba(0, 212, 255, 0.02) 100%)',
                    backdropFilter: 'blur(20px)',
                    padding: isMobile ? '2rem 1.25rem' : '4rem',
                    borderRadius: isMobile ? '24px' : '32px',
                    border: '1px solid rgba(0, 255, 136, 0.15)',
                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
                }}>
                    <h2 style={{
                        textAlign: 'center',
                        fontSize: isMobile ? '1.5rem' : '2.2rem',
                        fontWeight: 400,
                        letterSpacing: '-0.02em',
                        background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        marginBottom: isMobile ? '2rem' : '3rem'
                    }}>
                        What is a Shelter?
                    </h2>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(280px, 1fr))',
                        gap: isMobile ? '1rem' : '1.5rem',
                        marginBottom: isMobile ? '2rem' : '3rem'
                    }}>
                        {[
                            { icon: '🏠', title: 'Personal or Commercial', text: 'Build a shelter for your Robulus or create a commercial space with smart contracts.' },
                            { icon: '🛠️', title: 'Any Materials', text: 'Most Shelter structures are built from MDF with waterproofing, but you\'re free to use any materials you choose.' },
                            { icon: '🏛️', title: 'Membership Included', text: 'Register your Shelter and receive JUVANTIA membership, even without owning a Robulus.' }
                        ].map((item, idx) => (
                            <div key={idx} style={{
                                padding: isMobile ? '1.5rem' : '2rem',
                                background: 'rgba(0, 255, 136, 0.03)',
                                borderRadius: '16px',
                                border: '1px solid rgba(0, 255, 136, 0.12)',
                                transition: 'all 0.3s ease'
                            }}>
                                <div style={{ fontSize: isMobile ? '2rem' : '2.5rem', marginBottom: '1rem' }}>{item.icon}</div>
                                <h3 style={{
                                    color: 'var(--color-primary)',
                                    marginBottom: '0.75rem',
                                    fontSize: isMobile ? '1.05rem' : '1.2rem'
                                }}>
                                    {item.title}
                                </h3>
                                <p style={{
                                    color: 'var(--color-text-muted)',
                                    lineHeight: '1.7',
                                    fontSize: isMobile ? '0.9rem' : '0.95rem'
                                }}>
                                    {item.text}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Primary Purpose Section */}
                <div style={{
                    display: 'flex',
                    flexDirection: isMobile ? 'column' : 'row',
                    gap: isMobile ? '2rem' : '4rem',
                    alignItems: 'center',
                    marginBottom: isMobile ? '4rem' : '6rem'
                }}>
                    <div style={{ width: isMobile ? '100%' : '50%' }}>
                        <img
                            src="/images/DOMUS3.png"
                            alt="Shelter Protection"
                            style={{
                                width: '100%',
                                height: 'auto',
                                borderRadius: isMobile ? '20px' : '24px',
                                boxShadow: '0 20px 60px rgba(0, 255, 136, 0.15)',
                                border: '1px solid rgba(0, 255, 136, 0.2)'
                            }}
                        />
                    </div>
                    <div style={{ width: isMobile ? '100%' : '50%' }}>
                        <h2 style={{
                            fontSize: isMobile ? '1.5rem' : 'clamp(1.8rem, 4vw, 2.4rem)',
                            marginBottom: isMobile ? '1.5rem' : '2rem',
                            fontWeight: 400,
                            letterSpacing: '-0.01em',
                            color: 'var(--color-text)'
                        }}>
                            Primary{' '}
                            <span style={{
                                background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent'
                            }}>
                                Purpose
                            </span>
                        </h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {[
                                { title: 'Weather Protection', text: 'Shield your Robulus from rain, snow, wind, and extreme temperatures.' },
                                { title: 'Charging Station', text: 'Safe, dedicated space for your Robulus to recharge on the 24V Technopark grid.' },
                                { title: 'Security', text: 'Protection from theft and vandalism. Your Robulus is safe inside.' }
                            ].map((item, idx) => (
                                <div key={idx} style={{
                                    padding: isMobile ? '1rem' : '1.25rem',
                                    background: 'rgba(0, 255, 136, 0.03)',
                                    borderLeft: '2px solid var(--color-primary)',
                                    borderRadius: '0 12px 12px 0'
                                }}>
                                    <h4 style={{
                                        color: 'var(--color-primary)',
                                        marginBottom: '0.4rem',
                                        fontSize: isMobile ? '1rem' : '1.1rem'
                                    }}>
                                        {item.title}
                                    </h4>
                                    <p style={{
                                        color: 'var(--color-text-muted)',
                                        lineHeight: '1.7',
                                        margin: 0,
                                        fontSize: isMobile ? '0.9rem' : '0.95rem'
                                    }}>
                                        {item.text}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Land Requirements Section */}
                <div style={{
                    display: 'flex',
                    flexDirection: isMobile ? 'column' : 'row',
                    gap: isMobile ? '2rem' : '4rem',
                    alignItems: 'center',
                    marginBottom: isMobile ? '4rem' : '6rem'
                }}>
                    <div style={{ order: isMobile ? 2 : 1, width: isMobile ? '100%' : '50%' }}>
                        <h2 style={{
                            fontSize: isMobile ? '1.5rem' : 'clamp(1.8rem, 4vw, 2.4rem)',
                            marginBottom: isMobile ? '1.5rem' : '2rem',
                            fontWeight: 400,
                            letterSpacing: '-0.01em',
                            background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}>
                            Land Requirements
                        </h2>
                        <p style={{
                            fontSize: isMobile ? '1rem' : '1.15rem',
                            marginBottom: isMobile ? '1.5rem' : '2rem',
                            lineHeight: '1.9',
                            color: 'var(--color-text-muted)',
                            fontWeight: 300
                        }}>
                            To install a Shelter, you must own land in JUVANTIA or have a valid rental contract.
                        </p>
                        <div style={{
                            padding: isMobile ? '1.5rem' : '2rem',
                            background: 'rgba(0, 255, 136, 0.05)',
                            borderRadius: '16px',
                            border: '1px solid rgba(0, 255, 136, 0.2)'
                        }}>
                            <h4 style={{
                                color: 'var(--color-primary)',
                                marginBottom: '1rem',
                                fontSize: isMobile ? '1.05rem' : '1.2rem'
                            }}>
                                Two Options:
                            </h4>
                            <ul style={{
                                listStyle: 'none',
                                padding: 0,
                                margin: 0,
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '0.75rem'
                            }}>
                                <li style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <span style={{ color: 'var(--color-primary)', fontSize: isMobile ? '1.1rem' : '1.3rem' }}>✓</span>
                                    <span style={{ color: 'var(--color-text)', fontSize: isMobile ? '0.9rem' : '1rem' }}>
                                        <strong>Land Ownership</strong> — Purchase your plot
                                    </span>
                                </li>
                                <li style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <span style={{ color: 'var(--color-primary)', fontSize: isMobile ? '1.1rem' : '1.3rem' }}>✓</span>
                                    <span style={{ color: 'var(--color-text)', fontSize: isMobile ? '0.9rem' : '1rem' }}>
                                        <strong>Rental Contract</strong> — Lease from another citizen
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div style={{ order: 1, width: isMobile ? '100%' : '50%' }}>
                        <img
                            src="/images/DOMUS2.png"
                            alt="Land Requirements"
                            style={{
                                width: '100%',
                                height: 'auto',
                                borderRadius: isMobile ? '20px' : '24px',
                                boxShadow: '0 20px 60px rgba(0, 255, 136, 0.15)',
                                border: '1px solid rgba(0, 255, 136, 0.2)'
                            }}
                        />
                    </div>
                </div>

                {/* Timeline Section */}
                <div style={{
                    marginBottom: isMobile ? '4rem' : '6rem',
                    background: 'linear-gradient(135deg, rgba(0, 255, 136, 0.03) 0%, rgba(0, 212, 255, 0.02) 100%)',
                    backdropFilter: 'blur(20px)',
                    padding: isMobile ? '2rem 1.25rem' : '4rem',
                    borderRadius: isMobile ? '24px' : '32px',
                    border: '1px solid rgba(0, 255, 136, 0.15)',
                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
                }}>
                    <h2 style={{
                        textAlign: 'center',
                        fontSize: isMobile ? '1.5rem' : '2.2rem',
                        fontWeight: 400,
                        letterSpacing: '-0.02em',
                        background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        marginBottom: isMobile ? '2rem' : '4rem'
                    }}>
                        Shelter Installation Timeline
                    </h2>

                    {/* Mobile: Vertical timeline | Desktop: Grid */}
                    <div style={isMobile ? {
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1.5rem',
                        position: 'relative',
                        paddingLeft: '2rem'
                    } : {
                        display: 'grid',
                        gridTemplateColumns: 'repeat(4, 1fr)',
                        gap: '1.5rem',
                        position: 'relative'
                    }}>

                        {timelineSteps.map((step, index) => (
                            <div
                                key={index}
                                style={{
                                    position: 'relative',
                                    padding: isMobile ? '1.5rem' : '2rem',
                                    background: step.phase === 'active'
                                        ? 'rgba(0, 255, 136, 0.1)'
                                        : step.phase === 'future'
                                            ? 'rgba(255, 71, 87, 0.08)'
                                            : 'rgba(0, 255, 136, 0.03)',
                                    borderRadius: '16px',
                                    border: step.isWindow
                                        ? `2px solid ${step.phase === 'active' ? 'var(--color-primary)' : 'rgba(255, 71, 87, 0.4)'}`
                                        : '1px solid rgba(0, 255, 136, 0.12)',
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                {/* Timeline dot */}
                                <div style={{
                                    position: 'absolute',
                                    left: isMobile ? 'calc(-2rem - 6px)' : '50%',
                                    top: isMobile ? '50%' : '-24px',
                                    transform: isMobile ? 'translateY(-50%)' : 'translateX(-50%)',
                                    width: '14px',
                                    height: '14px',
                                    borderRadius: '50%',
                                    background: phaseColors[step.phase as keyof typeof phaseColors].bg,
                                    boxShadow: `0 0 10px ${phaseColors[step.phase as keyof typeof phaseColors].shadow}`,
                                    zIndex: 2
                                }} />

                                {step.duration && (
                                    <div style={{
                                        position: isMobile ? 'static' : 'absolute',
                                        top: '-10px',
                                        left: '16px',
                                        display: 'inline-block',
                                        background: step.phase === 'future' ? '#ff4757' : 'rgba(0, 255, 136, 0.8)',
                                        color: step.phase === 'future' ? '#fff' : '#fff',
                                        padding: '0.25rem 0.75rem',
                                        borderRadius: '8px',
                                        fontSize: isMobile ? '0.7rem' : '0.8rem',
                                        fontWeight: 600,
                                        letterSpacing: '0.03em',
                                        marginBottom: isMobile ? '0.75rem' : 0
                                    }}>
                                        {step.duration}
                                    </div>
                                )}
                                <div style={{
                                    fontSize: isMobile ? '1.6rem' : '2rem',
                                    marginBottom: '0.75rem',
                                    marginTop: step.duration && !isMobile ? '0.5rem' : '0'
                                }}>
                                    {step.icon}
                                </div>
                                <h3 style={{
                                    color: step.phase === 'active'
                                        ? 'var(--color-primary)'
                                        : step.phase === 'future'
                                            ? '#ff4757'
                                            : 'var(--color-text)',
                                    marginBottom: '0.5rem',
                                    fontSize: isMobile ? '1rem' : '1.15rem',
                                    fontWeight: 500
                                }}>
                                    {step.title}
                                </h3>
                                <p style={{
                                    color: 'var(--color-text-muted)',
                                    lineHeight: '1.6',
                                    margin: 0,
                                    fontSize: isMobile ? '0.85rem' : '0.9rem'
                                }}>
                                    {step.description}
                                </p>
                            </div>
                        ))}
                    </div>
                    <div style={{
                        marginTop: isMobile ? '1.5rem' : '2.5rem',
                        padding: isMobile ? '1.25rem' : '1.5rem',
                        background: 'rgba(0, 255, 136, 0.03)',
                        borderRadius: '16px',
                        border: '1px solid rgba(0, 255, 136, 0.15)',
                        textAlign: 'center'
                    }}>
                        <p style={{
                            fontSize: isMobile ? '0.9rem' : '1rem',
                            color: 'var(--color-text)',
                            marginBottom: '0.75rem',
                            lineHeight: '1.7'
                        }}>
                            <span style={{ color: 'var(--color-primary)', fontWeight: 500 }}>🔨 Open Window:</span> You can personally install your Shelter during the 3-6 month period.
                        </p>
                        <p style={{
                            fontSize: isMobile ? '0.9rem' : '1rem',
                            color: 'var(--color-text)',
                            margin: 0,
                            lineHeight: '1.7'
                        }}>
                            <span style={{ color: '#ff4757', fontWeight: 500 }}>🤖 Robuli-Only:</span> After the window closes, installation is only possible via Robulus.
                        </p>
                    </div>
                </div>

                {/* Design Expectations Section */}
                <div style={{
                    display: 'flex',
                    flexDirection: isMobile ? 'column' : 'row',
                    gap: isMobile ? '2rem' : '4rem',
                    alignItems: 'center',
                    marginBottom: isMobile ? '4rem' : '6rem'
                }}>
                    <div style={{ width: isMobile ? '100%' : '50%' }}>
                        <img
                            src="/images/DOMUS4.png"
                            alt="Shelter Design"
                            style={{
                                width: '100%',
                                height: 'auto',
                                borderRadius: isMobile ? '20px' : '24px',
                                boxShadow: '0 20px 60px rgba(0, 255, 136, 0.15)',
                                border: '1px solid rgba(0, 255, 136, 0.2)'
                            }}
                        />
                    </div>
                    <div style={{ width: isMobile ? '100%' : '50%' }}>
                        <h2 style={{
                            fontSize: isMobile ? '1.5rem' : 'clamp(1.8rem, 4vw, 2.4rem)',
                            marginBottom: isMobile ? '1.5rem' : '2rem',
                            fontWeight: 400,
                            letterSpacing: '-0.01em',
                            color: 'var(--color-text)'
                        }}>
                            Design{' '}
                            <span style={{
                                background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent'
                            }}>
                                Expectations
                            </span>
                        </h2>
                        <p style={{
                            fontSize: isMobile ? '1rem' : '1.15rem',
                            marginBottom: isMobile ? '1.5rem' : '2rem',
                            lineHeight: '1.9',
                            color: 'var(--color-text-muted)',
                            fontWeight: 300
                        }}>
                            We expect your Shelter to be aesthetically pleasing and contribute to the Technopark's visual identity.
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {[
                                { icon: '💡', title: 'Exterior Lighting', text: 'Install attractive exterior lighting to enhance the cityscape at night.' },
                                { icon: '🎨', title: 'Aesthetic Design', text: 'Create a visually appealing structure that adds character to JUVANTIA.' }
                            ].map((item, idx) => (
                                <div key={idx} style={{
                                    padding: isMobile ? '1rem' : '1.25rem',
                                    background: 'rgba(0, 255, 136, 0.03)',
                                    borderRadius: '12px',
                                    border: '1px solid rgba(0, 255, 136, 0.12)'
                                }}>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.75rem',
                                        marginBottom: '0.4rem'
                                    }}>
                                        <span style={{ fontSize: isMobile ? '1.1rem' : '1.3rem' }}>{item.icon}</span>
                                        <h4 style={{
                                            color: 'var(--color-primary)',
                                            fontSize: isMobile ? '1rem' : '1.1rem',
                                            margin: 0
                                        }}>
                                            {item.title}
                                        </h4>
                                    </div>
                                    <p style={{
                                        color: 'var(--color-text-muted)',
                                        lineHeight: '1.7',
                                        margin: 0,
                                        paddingLeft: isMobile ? '1.85rem' : '2.05rem',
                                        fontSize: isMobile ? '0.9rem' : '0.95rem'
                                    }}>
                                        {item.text}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Electrical Connection Section */}
                <div style={{
                    marginBottom: '4rem',
                    background: 'linear-gradient(135deg, rgba(0, 255, 136, 0.03) 0%, rgba(0, 212, 255, 0.02) 100%)',
                    backdropFilter: 'blur(20px)',
                    padding: isMobile ? '2rem 1.25rem' : '4rem',
                    borderRadius: isMobile ? '24px' : '32px',
                    border: '1px solid rgba(0, 255, 136, 0.15)',
                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
                }}>
                    <h2 style={{
                        textAlign: 'center',
                        fontSize: isMobile ? '1.5rem' : '2.2rem',
                        fontWeight: 400,
                        letterSpacing: '-0.02em',
                        background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        marginBottom: isMobile ? '2rem' : '4rem'
                    }}>
                        Electrical Connection
                    </h2>

                    {/* External Connection */}
                    <div style={{
                        display: 'flex',
                        flexDirection: isMobile ? 'column' : 'row',
                        gap: isMobile ? '1.5rem' : '3rem',
                        alignItems: 'center',
                        marginBottom: isMobile ? '2rem' : '3rem',
                        padding: isMobile ? '1.5rem' : '2.5rem',
                        background: 'rgba(0, 255, 136, 0.05)',
                        borderRadius: '20px',
                        border: '1px solid rgba(0, 255, 136, 0.2)'
                    }}>
                        <div style={{ width: isMobile ? '100%' : '60%' }}>
                            <h3 style={{
                                fontSize: isMobile ? '1.2rem' : '1.5rem',
                                marginBottom: '1.25rem',
                                fontWeight: 400,
                                color: 'var(--color-primary)'
                            }}>
                                ⚡ External Connection
                            </h3>
                            <p style={{
                                fontSize: isMobile ? '0.95rem' : '1.05rem',
                                marginBottom: '1rem',
                                lineHeight: '1.8',
                                color: 'var(--color-text-muted)'
                            }}>
                                All Shelter structures connect to the Technopark grid via the standard 24V <span style={{ color: 'var(--color-primary)', fontWeight: 500 }}>GX16-4</span> plug connector.
                            </p>
                            <p style={{
                                fontSize: isMobile ? '0.85rem' : '0.95rem',
                                lineHeight: '1.7',
                                color: 'var(--color-text-muted)',
                                fontStyle: 'italic'
                            }}>
                                This GX16-4 connector powers your Shelter from the JUVANTIA Technopark electrical network.
                            </p>
                        </div>
                        <div style={{ textAlign: 'center', width: isMobile ? '100%' : '40%' }}>
                            <img
                                src="/images/plug.jpg"
                                alt="External GX16-4 connector"
                                style={{
                                    width: '100%',
                                    maxWidth: isMobile ? '200px' : '300px',
                                    height: 'auto',
                                    borderRadius: '16px',
                                    boxShadow: '0 15px 40px rgba(0, 255, 136, 0.2)',
                                    border: '1px solid rgba(0, 255, 136, 0.25)'
                                }}
                            />
                            <p style={{
                                marginTop: '0.75rem',
                                color: 'var(--color-primary)',
                                fontSize: isMobile ? '0.85rem' : '0.95rem',
                                fontWeight: 500
                            }}>
                                GX16-4 Technopark Connector (24V)
                            </p>
                        </div>
                    </div>

                    {/* Internal Connection */}
                    <div style={{
                        padding: isMobile ? '1.5rem' : '2.5rem',
                        background: 'rgba(0, 255, 136, 0.02)',
                        borderRadius: '20px',
                        border: '1px solid rgba(0, 255, 136, 0.12)'
                    }}>
                        <h3 style={{
                            fontSize: isMobile ? '1.2rem' : '1.5rem',
                            marginBottom: '1.5rem',
                            fontWeight: 400,
                            color: 'var(--color-text)',
                            textAlign: 'center'
                        }}>
                            🔌 Internal Charging (Inside Shelter)
                        </h3>
                        <p style={{
                            fontSize: isMobile ? '0.9rem' : '1rem',
                            marginBottom: isMobile ? '1.5rem' : '2.5rem',
                            lineHeight: '1.8',
                            color: 'var(--color-text-muted)',
                            textAlign: 'center',
                            maxWidth: '700px',
                            margin: isMobile ? '0 auto 1.5rem' : '0 auto 2.5rem'
                        }}>
                            Inside your Shelter, you can choose how to charge your Robulus:
                        </p>

                        <div style={{
                            display: 'flex',
                            flexDirection: isMobile ? 'column' : 'row',
                            gap: '1.5rem'
                        }}>
                            {/* Juvantia Standard */}
                            <div style={{
                                padding: isMobile ? '1.5rem' : '2rem',
                                background: 'rgba(0, 255, 136, 0.08)',
                                borderRadius: '16px',
                                border: '2px solid rgba(0, 255, 136, 0.25)',
                                flex: 1
                            }}>
                                <div style={{
                                    display: 'inline-block',
                                    padding: '0.3rem 0.75rem',
                                    background: 'var(--color-primary)',
                                    color: '#000',
                                    borderRadius: '6px',
                                    fontSize: isMobile ? '0.65rem' : '0.75rem',
                                    fontWeight: 600,
                                    marginBottom: '1rem'
                                }}>
                                    FOR RENTAL / COMMERCIAL
                                </div>
                                <h4 style={{
                                    color: 'var(--color-primary)',
                                    marginBottom: '1rem',
                                    fontSize: isMobile ? '1.05rem' : '1.2rem'
                                }}>
                                    JUVANTIA Standard
                                </h4>
                                <p style={{
                                    color: 'var(--color-text-muted)',
                                    lineHeight: '1.8',
                                    fontSize: isMobile ? '0.85rem' : '0.95rem',
                                    marginBottom: '1.25rem'
                                }}>
                                    Required if your Shelter is for rental or commercial use. The 4-pin magnetic connector ensures compatibility with all Robulus units.
                                </p>
                                <div style={{ textAlign: 'center' }}>
                                    <img
                                        src="/images/4P.jpg"
                                        alt="4-pin magnetic connector"
                                        style={{
                                            maxWidth: '100%',
                                            height: 'auto',
                                            borderRadius: '12px',
                                            border: '1px solid rgba(0, 255, 136, 0.25)',
                                            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)'
                                        }}
                                    />
                                    <p style={{
                                        marginTop: '0.5rem',
                                        fontSize: isMobile ? '0.8rem' : '0.85rem',
                                        color: 'var(--color-primary)',
                                        fontWeight: 500
                                    }}>
                                        4-Pin Magnetic Connector
                                    </p>
                                </div>
                            </div>

                            {/* Personal Use */}
                            <div style={{
                                padding: isMobile ? '1.5rem' : '2rem',
                                background: 'rgba(0, 255, 136, 0.02)',
                                borderRadius: '16px',
                                border: '1px solid rgba(0, 255, 136, 0.15)',
                                flex: 1
                            }}>
                                <div style={{
                                    display: 'inline-block',
                                    padding: '0.3rem 0.75rem',
                                    background: 'rgba(255, 255, 255, 0.1)',
                                    color: 'var(--color-text)',
                                    borderRadius: '6px',
                                    fontSize: isMobile ? '0.65rem' : '0.75rem',
                                    fontWeight: 600,
                                    marginBottom: '1rem'
                                }}>
                                    FOR PERSONAL USE
                                </div>
                                <h4 style={{
                                    color: 'var(--color-text)',
                                    marginBottom: '1rem',
                                    fontSize: isMobile ? '1.05rem' : '1.2rem'
                                }}>
                                    Any Connector
                                </h4>
                                <p style={{
                                    color: 'var(--color-text-muted)',
                                    lineHeight: '1.8',
                                    fontSize: isMobile ? '0.85rem' : '0.95rem',
                                    marginBottom: '1rem'
                                }}>
                                    For personal Shelter, you're free to use any charging method you prefer.
                                </p>
                                <ul style={{
                                    color: 'var(--color-text-muted)',
                                    lineHeight: '2',
                                    fontSize: isMobile ? '0.85rem' : '0.95rem',
                                    paddingLeft: '1.25rem',
                                    margin: 0
                                }}>
                                    <li>Custom connectors</li>
                                    <li>Wireless charging</li>
                                    <li>Any voltage/amperage</li>
                                    <li>Proprietary solutions</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Shelter;
