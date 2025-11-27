import React, { useState, useEffect } from 'react';

const Domus: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const timelineSteps = [
        {
            title: "Land Registration",
            description: "Secure ownership or rental contract for your plot",
            icon: "📋",
            status: "available"
        },
        {
            title: "Infrastructure Setup",
            description: "Installation of electricity (24V) and network connectivity",
            duration: "2-3 months",
            icon: "⚡",
            status: "in-progress"
        },
        {
            title: "Domus Installation",
            description: "Build and install your Domus yourself in the technopark",
            duration: "3-6 months",
            icon: "🔨",
            isWindow: true,
            status: "open"
        },
        {
            title: "Robuli-Only Era",
            description: "Installation only possible via Robulus",
            duration: "∞",
            icon: "🤖",
            isWindow: true,
            status: "future"
        }
    ];

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #0a0a0a 0%, #1a0a0a 50%, #0a0a0a 100%)',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Animated Background Elements */}
            <div style={{
                position: 'absolute',
                top: '10%',
                right: '10%',
                width: '500px',
                height: '500px',
                background: 'radial-gradient(circle, rgba(212, 175, 55, 0.1) 0%, transparent 70%)',
                borderRadius: '50%',
                filter: 'blur(80px)',
                animation: 'float 20s ease-in-out infinite',
                pointerEvents: 'none'
            }} />
            <div style={{
                position: 'absolute',
                bottom: '10%',
                left: '10%',
                width: '400px',
                height: '400px',
                background: 'radial-gradient(circle, rgba(102, 0, 0, 0.15) 0%, transparent 70%)',
                borderRadius: '50%',
                filter: 'blur(80px)',
                animation: 'float 25s ease-in-out infinite reverse',
                pointerEvents: 'none'
            }} />

            <div style={{
                padding: '6rem 2rem 4rem',
                maxWidth: '1400px',
                margin: '0 auto',
                position: 'relative',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
            }}>
                {/* Hero Section */}
                <div style={{
                    textAlign: 'center',
                    marginBottom: '6rem',
                    position: 'relative'
                }}>
                    <div style={{
                        display: 'inline-block',
                        position: 'relative',
                        marginBottom: '3rem'
                    }}>
                        <img
                            src="/images/DOMUS1.png"
                            alt="Domus"
                            style={{
                                maxWidth: '600px',
                                width: '100%',
                                height: 'auto',
                                borderRadius: '24px',
                                boxShadow: '0 20px 60px rgba(212, 175, 55, 0.3), 0 0 100px rgba(212, 175, 55, 0.1)',
                                transform: 'translateZ(0)',
                                transition: 'transform 0.3s ease',
                            }}
                        />
                        <div style={{
                            position: 'absolute',
                            inset: '-20px',
                            background: 'linear-gradient(45deg, var(--color-accent), var(--color-primary))',
                            borderRadius: '24px',
                            opacity: 0.1,
                            filter: 'blur(30px)',
                            zIndex: -1
                        }} />
                    </div>

                    <p style={{
                        fontSize: '1.5rem',
                        lineHeight: '1.8',
                        maxWidth: '900px',
                        margin: '0 auto',
                        background: 'linear-gradient(135deg, var(--color-accent) 0%, var(--color-primary) 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        fontWeight: 400,
                        letterSpacing: '0.01em'
                    }}>
                        Build your structure in Juvantia.<br />
                        For personal use or commercial profit.
                    </p>
                </div>

                {/* What is Domus Section */}
                <div style={{
                    marginBottom: '6rem',
                    background: 'rgba(255, 255, 255, 0.02)',
                    backdropFilter: 'blur(20px)',
                    padding: '4rem',
                    borderRadius: '32px',
                    border: '1px solid rgba(212, 175, 55, 0.2)',
                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
                }}>
                    <h2 style={{
                        textAlign: 'center',
                        fontSize: '2.5rem',
                        fontWeight: 300,
                        letterSpacing: '-0.02em',
                        background: 'linear-gradient(135deg, var(--color-accent) 0%, var(--color-text) 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        marginBottom: '3rem'
                    }}>
                        What is a Domus?
                    </h2>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '2rem',
                        marginBottom: '3rem'
                    }}>
                        <div style={{
                            padding: '2rem',
                            background: 'rgba(255, 255, 255, 0.03)',
                            borderRadius: '16px',
                            border: '1px solid rgba(212, 175, 55, 0.15)'
                        }}>
                            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🏠</div>
                            <h3 style={{
                                color: 'var(--color-accent)',
                                marginBottom: '1rem',
                                fontSize: '1.3rem'
                            }}>
                                Personal or Commercial
                            </h3>
                            <p style={{
                                color: 'var(--color-text-muted)',
                                lineHeight: '1.7',
                                fontSize: '1.05rem'
                            }}>
                                Build a shelter for your Robulus or create a commercial space with smart contracts.
                            </p>
                        </div>
                        <div style={{
                            padding: '2rem',
                            background: 'rgba(255, 255, 255, 0.03)',
                            borderRadius: '16px',
                            border: '1px solid rgba(212, 175, 55, 0.15)'
                        }}>
                            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🛠️</div>
                            <h3 style={{
                                color: 'var(--color-accent)',
                                marginBottom: '1rem',
                                fontSize: '1.3rem'
                            }}>
                                Any Materials
                            </h3>
                            <p style={{
                                color: 'var(--color-text-muted)',
                                lineHeight: '1.7',
                                fontSize: '1.05rem'
                            }}>
                                Most Domus structures are built from MDF with waterproofing, but you're free to use any materials you choose.
                            </p>
                        </div>
                        <div style={{
                            padding: '2rem',
                            background: 'rgba(255, 255, 255, 0.03)',
                            borderRadius: '16px',
                            border: '1px solid rgba(212, 175, 55, 0.15)'
                        }}>
                            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🏛️</div>
                            <h3 style={{
                                color: 'var(--color-accent)',
                                marginBottom: '1rem',
                                fontSize: '1.3rem'
                            }}>
                                Citizenship Included
                            </h3>
                            <p style={{
                                color: 'var(--color-text-muted)',
                                lineHeight: '1.7',
                                fontSize: '1.05rem'
                            }}>
                                Register your Domus and receive Juvantian citizenship, even without owning a Robulus.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Primary Purpose Section */}
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '4rem',
                    alignItems: 'center',
                    marginBottom: '6rem'
                }}>
                    <div style={{ flex: '1 1 500px', maxWidth: '600px' }}>
                        <img
                            src="/images/DOMUS3.png"
                            alt="Domus Protection"
                            style={{
                                width: '100%',
                                height: 'auto',
                                borderRadius: '24px',
                                boxShadow: '0 20px 60px rgba(212, 175, 55, 0.2)',
                                border: '1px solid rgba(212, 175, 55, 0.2)'
                            }}
                        />
                    </div>
                    <div style={{ flex: '1 1 400px', maxWidth: '600px' }}>
                        <h2 style={{
                            fontSize: 'clamp(2rem, 4vw, 2.8rem)',
                            marginBottom: '2rem',
                            fontWeight: 300,
                            letterSpacing: '-0.01em',
                            color: 'var(--color-text)'
                        }}>
                            Primary{' '}
                            <span style={{
                                background: 'linear-gradient(135deg, var(--color-accent) 0%, var(--color-primary) 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent'
                            }}>
                                Purpose
                            </span>
                        </h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div style={{
                                padding: '1.5rem',
                                background: 'rgba(255, 255, 255, 0.03)',
                                borderLeft: '3px solid var(--color-accent)',
                                borderRadius: '0 12px 12px 0'
                            }}>
                                <h4 style={{
                                    color: 'var(--color-accent)',
                                    marginBottom: '0.5rem',
                                    fontSize: '1.2rem'
                                }}>
                                    Weather Protection
                                </h4>
                                <p style={{
                                    color: 'var(--color-text-muted)',
                                    lineHeight: '1.7',
                                    margin: 0
                                }}>
                                    Shield your Robulus from rain, snow, wind, and extreme temperatures.
                                </p>
                            </div>
                            <div style={{
                                padding: '1.5rem',
                                background: 'rgba(255, 255, 255, 0.03)',
                                borderLeft: '3px solid var(--color-accent)',
                                borderRadius: '0 12px 12px 0'
                            }}>
                                <h4 style={{
                                    color: 'var(--color-accent)',
                                    marginBottom: '0.5rem',
                                    fontSize: '1.2rem'
                                }}>
                                    Charging Station
                                </h4>
                                <p style={{
                                    color: 'var(--color-text-muted)',
                                    lineHeight: '1.7',
                                    margin: 0
                                }}>
                                    Safe, dedicated space for your Robulus to recharge on the 24V city grid.
                                </p>
                            </div>
                            <div style={{
                                padding: '1.5rem',
                                background: 'rgba(255, 255, 255, 0.03)',
                                borderLeft: '3px solid var(--color-accent)',
                                borderRadius: '0 12px 12px 0'
                            }}>
                                <h4 style={{
                                    color: 'var(--color-accent)',
                                    marginBottom: '0.5rem',
                                    fontSize: '1.2rem'
                                }}>
                                    Security
                                </h4>
                                <p style={{
                                    color: 'var(--color-text-muted)',
                                    lineHeight: '1.7',
                                    margin: 0
                                }}>
                                    Protection from theft and vandalism. Your Robulus is safe inside.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Land Requirements Section */}
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    flexDirection: 'row-reverse',
                    gap: '4rem',
                    alignItems: 'center',
                    marginBottom: '6rem'
                }}>
                    <div style={{ flex: '1 1 500px', maxWidth: '600px' }}>
                        <img
                            src="/images/DOMUS2.png"
                            alt="Land Requirements"
                            style={{
                                width: '100%',
                                height: 'auto',
                                borderRadius: '24px',
                                boxShadow: '0 20px 60px rgba(212, 175, 55, 0.2)',
                                border: '1px solid rgba(212, 175, 55, 0.2)'
                            }}
                        />
                    </div>
                    <div style={{ flex: '1 1 400px', maxWidth: '600px' }}>
                        <h2 style={{
                            fontSize: 'clamp(2rem, 4vw, 2.8rem)',
                            marginBottom: '2rem',
                            fontWeight: 300,
                            letterSpacing: '-0.01em',
                            background: 'linear-gradient(135deg, var(--color-accent) 0%, var(--color-text) 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}>
                            Land Requirements
                        </h2>
                        <p style={{
                            fontSize: '1.25rem',
                            marginBottom: '2rem',
                            lineHeight: '1.9',
                            color: 'var(--color-text-muted)',
                            fontWeight: 300
                        }}>
                            To install a Domus, you must own land in Juvantia or have a valid rental contract.
                        </p>
                        <div style={{
                            padding: '2rem',
                            background: 'rgba(212, 175, 55, 0.05)',
                            borderRadius: '16px',
                            border: '1px solid rgba(212, 175, 55, 0.2)'
                        }}>
                            <h4 style={{
                                color: 'var(--color-accent)',
                                marginBottom: '1rem',
                                fontSize: '1.3rem'
                            }}>
                                Two Options:
                            </h4>
                            <ul style={{
                                listStyle: 'none',
                                padding: 0,
                                margin: 0,
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '1rem'
                            }}>
                                <li style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1rem'
                                }}>
                                    <span style={{
                                        color: 'var(--color-accent)',
                                        fontSize: '1.5rem'
                                    }}>
                                        ✓
                                    </span>
                                    <span style={{
                                        color: 'var(--color-text)',
                                        fontSize: '1.1rem'
                                    }}>
                                        <strong>Land Ownership</strong> — Purchase your plot
                                    </span>
                                </li>
                                <li style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1rem'
                                }}>
                                    <span style={{
                                        color: 'var(--color-accent)',
                                        fontSize: '1.5rem'
                                    }}>
                                        ✓
                                    </span>
                                    <span style={{
                                        color: 'var(--color-text)',
                                        fontSize: '1.1rem'
                                    }}>
                                        <strong>Rental Contract</strong> — Lease from another citizen
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Timeline Section */}
                <div style={{
                    marginBottom: '6rem',
                    background: 'rgba(255, 255, 255, 0.02)',
                    backdropFilter: 'blur(20px)',
                    padding: '4rem',
                    borderRadius: '32px',
                    border: '1px solid rgba(212, 175, 55, 0.2)',
                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
                }}>
                    <h2 style={{
                        textAlign: 'center',
                        fontSize: '2.5rem',
                        fontWeight: 300,
                        letterSpacing: '-0.02em',
                        background: 'linear-gradient(135deg, var(--color-accent) 0%, var(--color-text) 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        marginBottom: '4rem'
                    }}>
                        Domus Installation Timeline
                    </h2>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                        gap: '2rem',
                        position: 'relative'
                    }}>
                        {timelineSteps.map((step, index) => (
                            <div
                                key={index}
                                style={{
                                    position: 'relative',
                                    padding: '2rem',
                                    background: step.isWindow
                                        ? (step.status === 'open' ? 'rgba(212, 175, 55, 0.15)' : 'rgba(102, 0, 0, 0.1)')
                                        : 'rgba(255, 255, 255, 0.03)',
                                    borderRadius: '16px',
                                    border: step.isWindow
                                        ? `2px solid ${step.status === 'open' ? 'var(--color-accent)' : 'var(--color-primary)'}`
                                        : '1px solid rgba(212, 175, 55, 0.15)',
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                {step.duration && (
                                    <div style={{
                                        position: 'absolute',
                                        top: '-12px',
                                        left: '20px',
                                        background: step.isWindow
                                            ? (step.status === 'open' ? 'var(--color-accent)' : 'var(--color-primary)')
                                            : 'rgba(100, 100, 100, 0.5)',
                                        color: step.isWindow ? '#000' : '#fff',
                                        padding: '0.3rem 1rem',
                                        borderRadius: '12px',
                                        fontSize: '0.85rem',
                                        fontWeight: 600,
                                        letterSpacing: '0.05em'
                                    }}>
                                        {step.duration}
                                    </div>
                                )}
                                <div style={{
                                    fontSize: '2.5rem',
                                    marginBottom: '1rem',
                                    marginTop: step.duration ? '1rem' : '0'
                                }}>
                                    {step.icon}
                                </div>
                                <h3 style={{
                                    color: step.isWindow
                                        ? (step.status === 'open' ? 'var(--color-accent)' : 'var(--color-primary)')
                                        : 'var(--color-text)',
                                    marginBottom: '0.75rem',
                                    fontSize: '1.3rem',
                                    fontWeight: 500
                                }}>
                                    {step.title}
                                </h3>
                                <p style={{
                                    color: 'var(--color-text-muted)',
                                    lineHeight: '1.6',
                                    margin: 0,
                                    fontSize: '0.95rem'
                                }}>
                                    {step.description}
                                </p>
                            </div>
                        ))}
                    </div>
                    <div style={{
                        marginTop: '3rem',
                        padding: '2rem',
                        background: 'rgba(212, 175, 55, 0.05)',
                        borderRadius: '16px',
                        border: '1px solid rgba(212, 175, 55, 0.2)',
                        textAlign: 'center'
                    }}>
                        <p style={{
                            fontSize: '1.15rem',
                            color: 'var(--color-text)',
                            marginBottom: '1rem',
                            lineHeight: '1.7'
                        }}>
                            <span style={{ color: 'var(--color-accent)', fontWeight: 500 }}>🔨 Open Window:</span> You can personally install your Domus during the 3-6 month period.
                        </p>
                        <p style={{
                            fontSize: '1.15rem',
                            color: 'var(--color-text)',
                            margin: 0,
                            lineHeight: '1.7'
                        }}>
                            <span style={{ color: 'var(--color-primary)', fontWeight: 500 }}>🤖 Robuli-Only:</span> After the window closes, installation is only possible via Robulus.
                        </p>
                    </div>
                </div>

                {/* Design Expectations Section */}
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '4rem',
                    alignItems: 'center',
                    marginBottom: '6rem'
                }}>
                    <div style={{ flex: '1 1 500px', maxWidth: '600px' }}>
                        <img
                            src="/images/DOMUS4.png"
                            alt="Domus Design"
                            style={{
                                width: '100%',
                                height: 'auto',
                                borderRadius: '24px',
                                boxShadow: '0 20px 60px rgba(212, 175, 55, 0.2)',
                                border: '1px solid rgba(212, 175, 55, 0.2)'
                            }}
                        />
                    </div>
                    <div style={{ flex: '1 1 400px', maxWidth: '600px' }}>
                        <h2 style={{
                            fontSize: 'clamp(2rem, 4vw, 2.8rem)',
                            marginBottom: '2rem',
                            fontWeight: 300,
                            letterSpacing: '-0.01em',
                            color: 'var(--color-text)'
                        }}>
                            Design{' '}
                            <span style={{
                                background: 'linear-gradient(135deg, var(--color-accent) 0%, var(--color-primary) 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent'
                            }}>
                                Expectations
                            </span>
                        </h2>
                        <p style={{
                            fontSize: '1.25rem',
                            marginBottom: '2rem',
                            lineHeight: '1.9',
                            color: 'var(--color-text-muted)',
                            fontWeight: 300
                        }}>
                            We expect your Domus to be aesthetically pleasing and contribute to the city's visual identity.
                        </p>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1.5rem'
                        }}>
                            <div style={{
                                padding: '1.5rem',
                                background: 'rgba(255, 255, 255, 0.03)',
                                borderRadius: '12px',
                                border: '1px solid rgba(212, 175, 55, 0.15)'
                            }}>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1rem',
                                    marginBottom: '0.5rem'
                                }}>
                                    <span style={{ fontSize: '1.5rem' }}>💡</span>
                                    <h4 style={{
                                        color: 'var(--color-accent)',
                                        fontSize: '1.2rem',
                                        margin: 0
                                    }}>
                                        Exterior Lighting
                                    </h4>
                                </div>
                                <p style={{
                                    color: 'var(--color-text-muted)',
                                    lineHeight: '1.7',
                                    margin: 0,
                                    paddingLeft: '2.5rem'
                                }}>
                                    Install attractive exterior lighting to enhance the cityscape at night.
                                </p>
                            </div>
                            <div style={{
                                padding: '1.5rem',
                                background: 'rgba(255, 255, 255, 0.03)',
                                borderRadius: '12px',
                                border: '1px solid rgba(212, 175, 55, 0.15)'
                            }}>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1rem',
                                    marginBottom: '0.5rem'
                                }}>
                                    <span style={{ fontSize: '1.5rem' }}>🎨</span>
                                    <h4 style={{
                                        color: 'var(--color-accent)',
                                        fontSize: '1.2rem',
                                        margin: 0
                                    }}>
                                        Aesthetic Design
                                    </h4>
                                </div>
                                <p style={{
                                    color: 'var(--color-text-muted)',
                                    lineHeight: '1.7',
                                    margin: 0,
                                    paddingLeft: '2.5rem'
                                }}>
                                    Create a visually appealing structure that adds character to Juvantia.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Electrical Connection Section */}
                <div style={{
                    marginBottom: '6rem',
                    background: 'rgba(255, 255, 255, 0.02)',
                    backdropFilter: 'blur(20px)',
                    padding: '4rem',
                    borderRadius: '32px',
                    border: '1px solid rgba(212, 175, 55, 0.2)',
                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
                }}>
                    <h2 style={{
                        textAlign: 'center',
                        fontSize: '2.5rem',
                        fontWeight: 300,
                        letterSpacing: '-0.02em',
                        background: 'linear-gradient(135deg, var(--color-accent) 0%, var(--color-text) 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        marginBottom: '4rem'
                    }}>
                        Electrical Connection
                    </h2>

                    {/* External Connection */}
                    <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '4rem',
                        alignItems: 'center',
                        marginBottom: '4rem',
                        padding: '3rem',
                        background: 'rgba(212, 175, 55, 0.05)',
                        borderRadius: '24px',
                        border: '1px solid rgba(212, 175, 55, 0.2)'
                    }}>
                        <div style={{ flex: '1 1 400px', maxWidth: '600px' }}>
                            <h3 style={{
                                fontSize: '1.8rem',
                                marginBottom: '1.5rem',
                                fontWeight: 400,
                                color: 'var(--color-accent)'
                            }}>
                                ⚡ External Connection
                            </h3>
                            <p style={{
                                fontSize: '1.15rem',
                                marginBottom: '1.5rem',
                                lineHeight: '1.8',
                                color: 'var(--color-text-muted)'
                            }}>
                                All Domus structures connect to the city grid via the standard 24V <span style={{ color: 'var(--color-accent)', fontWeight: 500 }}>GX16-4</span> plug connector.
                            </p>
                            <p style={{
                                fontSize: '1.05rem',
                                lineHeight: '1.7',
                                color: 'var(--color-text-muted)',
                                fontStyle: 'italic'
                            }}>
                                This GX16-4 connector powers your Domus from the Juvantia city electrical network.
                            </p>
                        </div>
                        <div style={{ flex: '1 1 350px', maxWidth: '400px', textAlign: 'center' }}>
                            <img
                                src="/images/plug.jpg"
                                alt="External GX16-4 connector"
                                style={{
                                    width: '100%',
                                    maxWidth: '350px',
                                    height: 'auto',
                                    borderRadius: '16px',
                                    boxShadow: '0 15px 40px rgba(212, 175, 55, 0.3)',
                                    border: '1px solid rgba(212, 175, 55, 0.3)'
                                }}
                            />
                            <p style={{
                                marginTop: '1rem',
                                color: 'var(--color-accent)',
                                fontSize: '1rem',
                                fontWeight: 500
                            }}>
                                GX16-4 City Connector (24V)
                            </p>
                        </div>
                    </div>

                    {/* Internal Connection */}
                    <div style={{
                        padding: '3rem',
                        background: 'rgba(255, 255, 255, 0.02)',
                        borderRadius: '24px',
                        border: '1px solid rgba(212, 175, 55, 0.15)'
                    }}>
                        <h3 style={{
                            fontSize: '1.8rem',
                            marginBottom: '2rem',
                            fontWeight: 400,
                            color: 'var(--color-text)',
                            textAlign: 'center'
                        }}>
                            🔌 Internal Charging (Inside Domus)
                        </h3>
                        <p style={{
                            fontSize: '1.1rem',
                            marginBottom: '3rem',
                            lineHeight: '1.8',
                            color: 'var(--color-text-muted)',
                            textAlign: 'center',
                            maxWidth: '800px',
                            margin: '0 auto 3rem'
                        }}>
                            Inside your Domus, you can choose how to charge your Robulus:
                        </p>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                            gap: '2rem'
                        }}>
                            {/* Juvantia Standard */}
                            <div style={{
                                padding: '2rem',
                                background: 'rgba(212, 175, 55, 0.08)',
                                borderRadius: '16px',
                                border: '2px solid rgba(212, 175, 55, 0.3)'
                            }}>
                                <div style={{
                                    display: 'inline-block',
                                    padding: '0.4rem 1rem',
                                    background: 'var(--color-accent)',
                                    color: '#000',
                                    borderRadius: '8px',
                                    fontSize: '0.85rem',
                                    fontWeight: 600,
                                    marginBottom: '1.5rem'
                                }}>
                                    FOR RENTAL / COMMERCIAL
                                </div>
                                <h4 style={{
                                    color: 'var(--color-accent)',
                                    marginBottom: '1.5rem',
                                    fontSize: '1.4rem'
                                }}>
                                    Juvantia Standard
                                </h4>
                                <p style={{
                                    color: 'var(--color-text-muted)',
                                    lineHeight: '1.8',
                                    fontSize: '1.05rem',
                                    marginBottom: '1.5rem'
                                }}>
                                    Required if your Domus is for rental or commercial use. The 4-pin magnetic connector ensures compatibility with all Robulus units.
                                </p>
                                <div style={{ textAlign: 'center' }}>
                                    <img
                                        src="/images/4P.jpg"
                                        alt="4-pin magnetic connector"
                                        style={{
                                            maxWidth: '100%',
                                            height: 'auto',
                                            borderRadius: '12px',
                                            border: '1px solid rgba(212, 175, 55, 0.3)',
                                            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)'
                                        }}
                                    />
                                    <p style={{
                                        marginTop: '0.75rem',
                                        fontSize: '0.95rem',
                                        color: 'var(--color-accent)',
                                        fontWeight: 500
                                    }}>
                                        4-Pin Magnetic Connector
                                    </p>
                                </div>
                            </div>

                            {/* Personal Use */}
                            <div style={{
                                padding: '2rem',
                                background: 'rgba(255, 255, 255, 0.03)',
                                borderRadius: '16px',
                                border: '1px solid rgba(212, 175, 55, 0.2)'
                            }}>
                                <div style={{
                                    display: 'inline-block',
                                    padding: '0.4rem 1rem',
                                    background: 'rgba(255, 255, 255, 0.1)',
                                    color: 'var(--color-text)',
                                    borderRadius: '8px',
                                    fontSize: '0.85rem',
                                    fontWeight: 600,
                                    marginBottom: '1.5rem'
                                }}>
                                    FOR PERSONAL USE
                                </div>
                                <h4 style={{
                                    color: 'var(--color-text)',
                                    marginBottom: '1.5rem',
                                    fontSize: '1.4rem'
                                }}>
                                    Any Connector
                                </h4>
                                <p style={{
                                    color: 'var(--color-text-muted)',
                                    lineHeight: '1.8',
                                    fontSize: '1.05rem',
                                    marginBottom: '1.5rem'
                                }}>
                                    For personal Domus, you're free to use any charging method you prefer.
                                </p>
                                <ul style={{
                                    color: 'var(--color-text-muted)',
                                    lineHeight: '2',
                                    fontSize: '1.05rem',
                                    paddingLeft: '1.5rem',
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

            <style>
                {`
                    @keyframes float {
                        0%, 100% { transform: translate(0, 0) rotate(0deg); }
                        33% { transform: translate(30px, -30px) rotate(5deg); }
                        66% { transform: translate(-20px, 20px) rotate(-5deg); }
                    }
                `}
            </style>
        </div>
    );
};

export default Domus;
