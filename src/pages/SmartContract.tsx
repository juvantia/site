import React, { useState, useEffect } from 'react';
import CursorGlow from '../components/CursorGlow';
import PageTitle from '../components/PageTitle';

const SmartContract: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [activeCompareTab, setActiveCompareTab] = useState<'backend' | 'blockchain'>('blockchain');

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

    const comparisonData = [
        {
            aspect: 'Currency',
            backend: 'Game points that can be purchased but not withdrawn. A quasi-economy.',
            blockchain: 'Euro-pegged stablecoins let you plan your participation with real costs and real revenues, rather than in-game points.',
            winner: 'blockchain'
        },
        {
            aspect: 'Central Bank',
            backend: 'In-game points impossible to track or audit. Opaque supply and exchange rates.',
            blockchain: 'Transparent supply, transparent exchange rates. Full accountability.',
            winner: 'blockchain'
        },
        {
            aspect: 'Possibilities',
            backend: 'Limited to pre-programmed operations: buy, sell, service. No flexibility.',
            blockchain: 'Create any financial instruments, contracts, or agreements. Unlimited scenarios.',
            winner: 'blockchain'
        },
        {
            aspect: 'Onboarding',
            backend: 'Simpler: buy points and play. Lower barrier to entry.',
            blockchain: 'Onboarding is slightly more complex: you need basic blockchain knowledge.',
            winner: 'tie'
        },
        {
            aspect: 'Ownership',
            backend: 'Basic registry of owners. Limited exchange capabilities.',
            blockchain: 'Unlimited ownership and exchange possibilities. Direct Robulus-for-Shelter, triple swaps, etc.',
            winner: 'blockchain'
        },
        {
            aspect: 'Security Risk',
            backend: 'More protection from risky transactions due to limited capabilities.',
            blockchain: 'Higher personal responsibility: your assets are yours alone, and nobody can restore or return them.',
            winner: 'backend'
        }
    ];

    return (
        <div style={{
            minHeight: '100vh',
            background: 'var(--color-bg)',
            position: 'relative',
            overflow: 'hidden'
        }}>
            <PageTitle title="Smart Contract - JUVANTIA" />
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
                {/* Hero Section - Definition */}
                <div style={{
                    textAlign: 'center',
                    marginBottom: isMobile ? '4rem' : '6rem',
                    position: 'relative'
                }}>
                    <div style={{
                        maxWidth: '900px',
                        margin: '0 auto 3rem',
                        padding: isMobile ? '2rem 1.25rem' : '3rem 2.5rem',
                        background: 'linear-gradient(135deg, rgba(0, 255, 136, 0.03) 0%, rgba(0, 212, 255, 0.02) 100%)',
                        backdropFilter: 'blur(20px)',
                        borderRadius: isMobile ? '20px' : '24px',
                        border: '1px solid rgba(0, 255, 136, 0.15)',
                        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
                        textAlign: 'left'
                    }}>
                        <div style={{
                            marginBottom: '1.5rem',
                            paddingBottom: '1rem',
                            borderBottom: '1px solid rgba(0, 255, 136, 0.2)'
                        }}>
                            <h2 style={{
                                fontSize: isMobile ? '1.5rem' : '2rem',
                                color: 'var(--color-primary)',
                                fontWeight: 400,
                                letterSpacing: '0.02em',
                                margin: 0,
                                fontStyle: 'italic'
                            }}>
                                Smart Contract
                            </h2>
                        </div>
                        <p style={{
                            fontSize: isMobile ? '1rem' : '1.25rem',
                            lineHeight: '1.9',
                            color: 'var(--color-text-muted)',
                            fontWeight: 300,
                            margin: 0
                        }}>
                            Self-executing programs on then <span style={{ color: 'var(--color-primary)', fontWeight: 400 }}>blockchain</span> that define and automatically enforce rules for programmable value and assets.
                        </p>
                    </div>
                    <div className="divider-glow" />
                </div>

                {/* Introduction Section */}
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
                        The Foundation of Our Economy
                    </h2>
                    <p style={{
                        fontSize: isMobile ? '1rem' : '1.15rem',
                        lineHeight: '1.9',
                        color: 'var(--color-text-muted)',
                        textAlign: 'center',
                        maxWidth: '800px',
                        margin: '0 auto 2rem',
                        fontWeight: 300
                    }}>
                        We spent a long time analyzing which financial layer JUVANTIA should have. The choice came down to two options:
                    </p>

                    <div style={{
                        display: 'flex',
                        flexDirection: isMobile ? 'column' : 'row',
                        gap: isMobile ? '1.5rem' : '2rem',
                        marginTop: isMobile ? '2rem' : '3rem'
                    }}>
                        <div style={{
                            padding: isMobile ? '2rem 1.5rem' : '2.5rem 2rem',
                            background: 'rgba(255, 255, 255, 0.02)',
                            borderRadius: '20px',
                            border: '1px solid rgba(0, 255, 136, 0.1)',
                            textAlign: 'center',
                            position: 'relative',
                            flex: 1
                        }}>
                            <div style={{
                                marginBottom: '1.5rem',
                                display: 'flex',
                                justifyContent: 'center'
                            }}>
                                <img src="/images/backend.svg" alt="Backend" style={{ width: isMobile ? '40px' : '50px', height: isMobile ? '40px' : '50px', opacity: 0.8 }} />
                            </div>
                            <h3 style={{
                                color: 'var(--color-text)',
                                marginBottom: '1rem',
                                fontSize: isMobile ? '1.25rem' : '1.5rem',
                                fontWeight: 400
                            }}>
                                Custom Backend
                            </h3>
                            <p style={{
                                color: 'var(--color-text-muted)',
                                lineHeight: '1.7',
                                fontSize: isMobile ? '0.9rem' : '1rem'
                            }}>
                                Traditional game economy with internal points and centralized control.
                            </p>
                        </div>

                        <div style={{
                            padding: isMobile ? '2rem 1.5rem' : '2.5rem 2rem',
                            background: 'linear-gradient(135deg, rgba(0, 255, 136, 0.1) 0%, rgba(0, 212, 255, 0.05) 100%)',
                            borderRadius: '20px',
                            border: '2px solid rgba(0, 255, 136, 0.3)',
                            textAlign: 'center',
                            position: 'relative',
                            boxShadow: '0 10px 40px rgba(0, 255, 136, 0.15)',
                            flex: 1
                        }}>
                            <div style={{
                                position: 'absolute',
                                top: '-12px',
                                right: isMobile ? '10px' : '20px',
                                background: 'var(--color-primary)',
                                color: '#000',
                                padding: '0.4rem 1rem',
                                borderRadius: '10px',
                                fontSize: isMobile ? '0.7rem' : '0.8rem',
                                fontWeight: 600,
                                letterSpacing: '0.05em'
                            }}>
                                CHOSEN
                            </div>
                            <div style={{
                                marginBottom: '1.5rem',
                                display: 'flex',
                                justifyContent: 'center'
                            }}>
                                <img src="/images/ETH.svg" alt="Blockchain" style={{ width: isMobile ? '40px' : '50px', height: isMobile ? '40px' : '50px' }} />
                            </div>
                            <h3 style={{
                                color: 'var(--color-primary)',
                                marginBottom: '1rem',
                                fontSize: isMobile ? '1.25rem' : '1.5rem',
                                fontWeight: 400
                            }}>
                                Blockchain
                            </h3>
                            <p style={{
                                color: 'var(--color-text)',
                                lineHeight: '1.7',
                                fontSize: isMobile ? '0.9rem' : '1rem'
                            }}>
                                Decentralized economy with real value, transparency, and unlimited possibilities.
                            </p>
                        </div>
                    </div>

                    <div style={{
                        marginTop: isMobile ? '2rem' : '3rem',
                        padding: isMobile ? '1.5rem' : '2rem',
                        background: 'rgba(0, 255, 136, 0.03)',
                        borderRadius: '16px',
                        border: '1px solid rgba(0, 255, 136, 0.15)',
                        textAlign: 'center'
                    }}>
                        <p style={{
                            fontSize: isMobile ? '0.9rem' : '1.05rem',
                            color: 'var(--color-text)',
                            lineHeight: '1.8',
                            margin: 0
                        }}>
                            We studied similar projects like <span style={{ color: 'var(--color-primary)', fontWeight: 500 }}>EVE Online</span>, and <span style={{ color: 'var(--color-primary)', fontWeight: 500 }}>Decentraland</span>, which rely on their own internal points and closed-loop economies.<br />
                            But if we want to build a real economy where participants can <span style={{ color: 'var(--color-primary)', fontWeight: 500 }}>recover costs and sustain their Remote Assets through useful activity</span>, we use euro-pegged stablecoins and a neutral monetary framework — not an in-game “currency.”
                        </p>
                    </div>
                </div>

                {/* Comparison Table */}
                <div style={{
                    marginBottom: isMobile ? '4rem' : '6rem',
                    background: 'linear-gradient(135deg, rgba(0, 255, 136, 0.03) 0%, rgba(0, 212, 255, 0.02) 100%)',
                    backdropFilter: 'blur(20px)',
                    padding: isMobile ? '2rem 1.25rem' : '3rem 2rem',
                    borderRadius: isMobile ? '24px' : '32px',
                    border: '1px solid rgba(0, 255, 136, 0.15)',
                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
                    overflowX: isMobile ? 'visible' : 'auto'
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
                        Backend vs Blockchain
                    </h2>

                    {/* Mobile: Tab-based cards | Desktop: Table */}
                    {isMobile ? (
                        <div>
                            {/* Tab switcher */}
                            <div style={{
                                display: 'flex',
                                gap: '0.5rem',
                                marginBottom: '1.5rem',
                                background: 'rgba(10, 15, 10, 0.5)',
                                borderRadius: '12px',
                                padding: '0.25rem'
                            }}>
                                <button
                                    onClick={() => setActiveCompareTab('backend')}
                                    style={{
                                        flex: 1,
                                        padding: '0.75rem',
                                        background: activeCompareTab === 'backend' ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
                                        border: 'none',
                                        borderRadius: '10px',
                                        color: activeCompareTab === 'backend' ? 'var(--color-text)' : 'var(--color-text-muted)',
                                        fontSize: '0.85rem',
                                        fontWeight: 500,
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '0.5rem'
                                    }}
                                >
                                    <img src="/images/backend.svg" alt="" style={{ width: '16px', height: '16px', opacity: 0.7 }} />
                                    Backend
                                </button>
                                <button
                                    onClick={() => setActiveCompareTab('blockchain')}
                                    style={{
                                        flex: 1,
                                        padding: '0.75rem',
                                        background: activeCompareTab === 'blockchain' ? 'rgba(0, 255, 136, 0.15)' : 'transparent',
                                        border: activeCompareTab === 'blockchain' ? '1px solid rgba(0, 255, 136, 0.3)' : '1px solid transparent',
                                        borderRadius: '10px',
                                        color: activeCompareTab === 'blockchain' ? 'var(--color-primary)' : 'var(--color-text-muted)',
                                        fontSize: '0.85rem',
                                        fontWeight: 500,
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '0.5rem'
                                    }}
                                >
                                    <img src="/images/ETH.svg" alt="" style={{ width: '16px', height: '16px' }} />
                                    Blockchain
                                </button>
                            </div>

                            {/* Cards */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {comparisonData.map((item, index) => (
                                    <div key={index} style={{
                                        padding: '1.25rem',
                                        background: item.winner === activeCompareTab ? 'rgba(0, 255, 136, 0.08)' : 'rgba(0, 255, 136, 0.02)',
                                        borderRadius: '12px',
                                        border: item.winner === activeCompareTab ? '1px solid rgba(0, 255, 136, 0.3)' : '1px solid rgba(0, 255, 136, 0.1)'
                                    }}>
                                        <h4 style={{
                                            color: 'var(--color-primary)',
                                            fontSize: '0.9rem',
                                            fontWeight: 500,
                                            marginBottom: '0.75rem',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.5rem'
                                        }}>
                                            {item.winner === activeCompareTab && <span>✓</span>}
                                            {item.aspect}
                                        </h4>
                                        <p style={{
                                            color: 'var(--color-text-muted)',
                                            fontSize: '0.85rem',
                                            lineHeight: '1.7',
                                            margin: 0
                                        }}>
                                            {activeCompareTab === 'backend' ? item.backend : item.blockchain}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{
                                width: '100%',
                                borderCollapse: 'separate',
                                borderSpacing: '0',
                                minWidth: '600px'
                            }}>
                                <thead>
                                    <tr>
                                        <th style={{
                                            padding: '1.25rem',
                                            textAlign: 'left',
                                            background: 'rgba(0, 255, 136, 0.1)',
                                            color: 'var(--color-primary)',
                                            fontSize: '1.1rem',
                                            fontWeight: 500,
                                            borderBottom: '2px solid rgba(0, 255, 136, 0.3)',
                                            borderTopLeftRadius: '16px'
                                        }}>
                                            Aspect
                                        </th>
                                        <th style={{
                                            padding: '1.25rem',
                                            textAlign: 'left',
                                            background: 'rgba(255, 255, 255, 0.02)',
                                            color: 'var(--color-text)',
                                            fontSize: '1.1rem',
                                            fontWeight: 500,
                                            borderBottom: '2px solid rgba(0, 255, 136, 0.3)',
                                            borderLeft: '1px solid rgba(0, 255, 136, 0.1)'
                                        }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                                <img src="/images/backend.svg" alt="Backend" style={{ width: '20px', height: '20px', opacity: 0.7 }} />
                                                Backend
                                            </div>
                                        </th>
                                        <th style={{
                                            padding: '1.25rem',
                                            textAlign: 'left',
                                            background: 'rgba(0, 255, 136, 0.08)',
                                            color: 'var(--color-primary)',
                                            fontSize: '1.1rem',
                                            fontWeight: 500,
                                            borderBottom: '2px solid rgba(0, 255, 136, 0.3)',
                                            borderLeft: '1px solid rgba(0, 255, 136, 0.1)',
                                            borderTopRightRadius: '16px'
                                        }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                                <img src="/images/ETH.svg" alt="Blockchain" style={{ width: '20px', height: '20px' }} />
                                                Blockchain
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {comparisonData.map((item, index) => (
                                        <tr key={index} style={{
                                            background: index % 2 === 0 ? 'rgba(0, 255, 136, 0.02)' : 'transparent'
                                        }}>
                                            <td style={{
                                                padding: '1.25rem',
                                                color: 'var(--color-primary)',
                                                fontSize: '1rem',
                                                fontWeight: 500,
                                                verticalAlign: 'top',
                                                borderBottom: index === comparisonData.length - 1 ? 'none' : '1px solid rgba(0, 255, 136, 0.1)',
                                                ...(index === comparisonData.length - 1 && { borderBottomLeftRadius: '16px' })
                                            }}>
                                                {item.aspect}
                                            </td>
                                            <td style={{
                                                padding: '1.25rem',
                                                color: 'var(--color-text-muted)',
                                                fontSize: '0.95rem',
                                                lineHeight: '1.7',
                                                verticalAlign: 'top',
                                                borderLeft: '1px solid rgba(0, 255, 136, 0.1)',
                                                borderBottom: index === comparisonData.length - 1 ? 'none' : '1px solid rgba(0, 255, 136, 0.1)',
                                                background: item.winner === 'backend' ? 'rgba(0, 255, 136, 0.05)' : 'transparent'
                                            }}>
                                                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                                                    {item.winner === 'backend' && (
                                                        <span style={{ color: 'var(--color-primary)', fontSize: '1.1rem', flexShrink: 0 }}>✓</span>
                                                    )}
                                                    <span>{item.backend}</span>
                                                </div>
                                            </td>
                                            <td style={{
                                                padding: '1.25rem',
                                                color: 'var(--color-text-muted)',
                                                fontSize: '0.95rem',
                                                lineHeight: '1.7',
                                                verticalAlign: 'top',
                                                borderLeft: '1px solid rgba(0, 255, 136, 0.1)',
                                                borderBottom: index === comparisonData.length - 1 ? 'none' : '1px solid rgba(0, 255, 136, 0.1)',
                                                background: item.winner === 'blockchain' ? 'rgba(0, 255, 136, 0.05)' : 'transparent',
                                                ...(index === comparisonData.length - 1 && { borderBottomRightRadius: '16px' })
                                            }}>
                                                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                                                    {item.winner === 'blockchain' && (
                                                        <span style={{ color: 'var(--color-primary)', fontSize: '1.1rem', flexShrink: 0 }}>✓</span>
                                                    )}
                                                    <span>{item.blockchain}</span>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>



                {/* Conclusion Section */}
                <div style={{
                    background: 'linear-gradient(135deg, rgba(0, 255, 136, 0.03) 0%, rgba(0, 212, 255, 0.02) 100%)',
                    backdropFilter: 'blur(20px)',
                    padding: isMobile ? '2rem 1.25rem' : '4rem',
                    borderRadius: isMobile ? '24px' : '32px',
                    border: '1px solid rgba(0, 255, 136, 0.15)',
                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
                    textAlign: 'center'
                }}>
                    <h2 style={{
                        fontSize: isMobile ? '1.5rem' : '2.2rem',
                        fontWeight: 400,
                        letterSpacing: '-0.02em',
                        background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        marginBottom: isMobile ? '1.5rem' : '2rem'
                    }}>
                        Our Conclusion
                    </h2>
                    <p style={{
                        fontSize: isMobile ? '1rem' : '1.25rem',
                        lineHeight: '1.9',
                        color: 'var(--color-text)',
                        maxWidth: '800px',
                        margin: '0 auto',
                        fontWeight: 300
                    }}>
                        The <span style={{ color: 'var(--color-primary)', fontWeight: 500 }}>realism of the economy</span> and the <span style={{ color: 'var(--color-primary)', fontWeight: 500 }}>multitude of financial instruments</span> outweigh the limitations and virtual game points of a traditional backend.
                    </p>
                    <div style={{
                        marginTop: isMobile ? '2rem' : '3rem',
                        padding: isMobile ? '1.5rem' : '2rem',
                        background: 'rgba(0, 255, 136, 0.05)',
                        borderRadius: '16px',
                        border: '1px solid rgba(0, 255, 136, 0.15)'
                    }}>
                        <p style={{
                            fontSize: isMobile ? '0.95rem' : '1.1rem',
                            color: 'var(--color-text-muted)',
                            lineHeight: '1.8',
                            margin: 0,
                            fontStyle: 'italic'
                        }}>
                            Blockchain enables JUVANTIA to become not just a game, but a living, breathing economy where real value is created, traded, and earned through the labor of autonomous Robulus units.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SmartContract;
