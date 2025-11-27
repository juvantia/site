import React, { useState, useEffect } from 'react';

const SmartContract: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const comparisonData = [
        {
            aspect: 'Currency',
            backend: 'Game points that can be purchased but not withdrawn. A quasi-economy.',
            blockchain: 'Freely convertible currency with real economic value (JVD).',
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
            blockchain: 'Seamless UX experience. Minimal difference for regular players.',
            winner: 'tie'
        },
        {
            aspect: 'Ownership',
            backend: 'Basic registry of owners. Limited exchange capabilities.',
            blockchain: 'Unlimited ownership and exchange possibilities. Direct Robulus-for-Domus, triple swaps, etc.',
            winner: 'blockchain'
        },
        {
            aspect: 'Security Risk',
            backend: 'More protection from risky transactions due to limited capabilities.',
            blockchain: 'Higher risk: careless transactions can lose funds. Mitigated by using only Juvantia-certified smart contracts and JVD token.',
            winner: 'backend'
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
                {/* Hero Section - Definition */}
                <div style={{
                    textAlign: 'center',
                    marginBottom: '6rem',
                    position: 'relative'
                }}>
                    <div style={{
                        maxWidth: '1000px',
                        margin: '0 auto 3rem',
                        padding: '3rem 2.5rem',
                        background: 'rgba(255, 255, 255, 0.02)',
                        backdropFilter: 'blur(20px)',
                        borderRadius: '24px',
                        border: '1px solid rgba(212, 175, 55, 0.2)',
                        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
                        textAlign: 'left'
                    }}>
                        <div style={{
                            marginBottom: '1.5rem',
                            paddingBottom: '1rem',
                            borderBottom: '1px solid rgba(212, 175, 55, 0.2)'
                        }}>
                            <h2 style={{
                                fontSize: '2rem',
                                color: 'var(--color-accent)',
                                fontWeight: 400,
                                letterSpacing: '0.02em',
                                margin: 0,
                                fontStyle: 'italic'
                            }}>
                                Smart Contract
                            </h2>
                        </div>
                        <p style={{
                            fontSize: '1.3rem',
                            lineHeight: '1.9',
                            color: 'var(--color-text-muted)',
                            fontWeight: 300,
                            margin: 0
                        }}>
                            Programs running on the blockchain in the <span style={{ color: 'var(--color-accent)', fontWeight: 400 }}>EVM</span> (Ethereum Virtual Machine) standard.
                            <br /><br />
                            Juvantia operates on <span style={{ color: 'var(--color-accent)', fontWeight: 400 }}>Soneium</span> — an L2 blockchain built on Ethereum.
                        </p>
                    </div>
                    <div style={{
                        width: '120px',
                        height: '2px',
                        background: 'linear-gradient(90deg, transparent, var(--color-accent), transparent)',
                        margin: '0 auto'
                    }} />
                </div>

                {/* Introduction Section */}
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
                        The Foundation of Our Economy
                    </h2>
                    <p style={{
                        fontSize: '1.25rem',
                        lineHeight: '1.9',
                        color: 'var(--color-text-muted)',
                        textAlign: 'center',
                        maxWidth: '900px',
                        margin: '0 auto 2rem',
                        fontWeight: 300
                    }}>
                        We spent a long time analyzing which financial layer Juvantia should have. The choice came down to two options:
                    </p>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                        gap: '3rem',
                        marginTop: '3rem'
                    }}>
                        <div style={{
                            padding: '3rem 2rem',
                            background: 'rgba(255, 255, 255, 0.03)',
                            borderRadius: '24px',
                            border: '1px solid rgba(212, 175, 55, 0.15)',
                            textAlign: 'center',
                            position: 'relative'
                        }}>
                            <div style={{
                                marginBottom: '1.5rem',
                                display: 'flex',
                                justifyContent: 'center'
                            }}>
                                <img src="/images/backend.svg" alt="Backend" style={{ width: '60px', height: '60px' }} />
                            </div>
                            <h3 style={{
                                color: 'var(--color-text)',
                                marginBottom: '1rem',
                                fontSize: '1.8rem',
                                fontWeight: 400
                            }}>
                                Custom Backend
                            </h3>
                            <p style={{
                                color: 'var(--color-text-muted)',
                                lineHeight: '1.7',
                                fontSize: '1.05rem'
                            }}>
                                Traditional game economy with internal points and centralized control.
                            </p>
                        </div>

                        <div style={{
                            padding: '3rem 2rem',
                            background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.15) 0%, rgba(212, 175, 55, 0.05) 100%)',
                            borderRadius: '24px',
                            border: '2px solid rgba(212, 175, 55, 0.3)',
                            textAlign: 'center',
                            position: 'relative',
                            boxShadow: '0 10px 40px rgba(212, 175, 55, 0.2)'
                        }}>
                            <div style={{
                                position: 'absolute',
                                top: '-15px',
                                right: '20px',
                                background: 'var(--color-accent)',
                                color: '#000',
                                padding: '0.4rem 1.2rem',
                                borderRadius: '12px',
                                fontSize: '0.85rem',
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
                                <img src="/images/ETH.svg" alt="Blockchain" style={{ width: '60px', height: '60px' }} />
                            </div>
                            <h3 style={{
                                color: 'var(--color-accent)',
                                marginBottom: '1rem',
                                fontSize: '1.8rem',
                                fontWeight: 400
                            }}>
                                Blockchain
                            </h3>
                            <p style={{
                                color: 'var(--color-text)',
                                lineHeight: '1.7',
                                fontSize: '1.05rem'
                            }}>
                                Decentralized economy with real value, transparency, and unlimited possibilities.
                            </p>
                        </div>
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
                            lineHeight: '1.8',
                            margin: 0
                        }}>
                            We studied similar projects like <span style={{ color: 'var(--color-accent)', fontWeight: 500 }}>EVE Online</span>, which use their own backend and internal game points that they call "currency."<br />
                            But if we want to build a <span style={{ color: 'var(--color-accent)', fontWeight: 500 }}>real economy</span> where you can earn from your Robulus's actions, we need a freely convertible currency and an independent central bank.
                        </p>
                    </div>
                </div>

                {/* Comparison Table */}
                <div style={{
                    marginBottom: '6rem',
                    background: 'rgba(255, 255, 255, 0.02)',
                    backdropFilter: 'blur(20px)',
                    padding: '3rem 2rem',
                    borderRadius: '32px',
                    border: '1px solid rgba(212, 175, 55, 0.2)',
                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
                    overflowX: 'auto'
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
                        Backend vs Blockchain
                    </h2>

                    <div style={{
                        overflowX: 'auto'
                    }}>
                        <table style={{
                            width: '100%',
                            borderCollapse: 'separate',
                            borderSpacing: '0',
                            minWidth: '600px'
                        }}>
                            <thead>
                                <tr>
                                    <th style={{
                                        padding: '1.5rem',
                                        textAlign: 'left',
                                        background: 'rgba(212, 175, 55, 0.1)',
                                        color: 'var(--color-accent)',
                                        fontSize: '1.2rem',
                                        fontWeight: 500,
                                        borderBottom: '2px solid rgba(212, 175, 55, 0.3)',
                                        borderTopLeftRadius: '16px'
                                    }}>
                                        Aspect
                                    </th>
                                    <th style={{
                                        padding: '1.5rem',
                                        textAlign: 'left',
                                        background: 'rgba(255, 255, 255, 0.03)',
                                        color: 'var(--color-text)',
                                        fontSize: '1.2rem',
                                        fontWeight: 500,
                                        borderBottom: '2px solid rgba(212, 175, 55, 0.3)',
                                        borderLeft: '1px solid rgba(212, 175, 55, 0.15)'
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                            <img src="/images/backend.svg" alt="Backend" style={{ width: '24px', height: '24px' }} />
                                            Backend
                                        </div>
                                    </th>
                                    <th style={{
                                        padding: '1.5rem',
                                        textAlign: 'left',
                                        background: 'rgba(212, 175, 55, 0.08)',
                                        color: 'var(--color-accent)',
                                        fontSize: '1.2rem',
                                        fontWeight: 500,
                                        borderBottom: '2px solid rgba(212, 175, 55, 0.3)',
                                        borderLeft: '1px solid rgba(212, 175, 55, 0.15)',
                                        borderTopRightRadius: '16px'
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                            <img src="/images/ETH.svg" alt="Blockchain" style={{ width: '24px', height: '24px' }} />
                                            Blockchain
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {comparisonData.map((item, index) => (
                                    <tr key={index} style={{
                                        background: index % 2 === 0 ? 'rgba(255, 255, 255, 0.02)' : 'transparent'
                                    }}>
                                        <td style={{
                                            padding: '1.5rem',
                                            color: 'var(--color-accent)',
                                            fontSize: '1.1rem',
                                            fontWeight: 500,
                                            verticalAlign: 'top',
                                            borderBottom: index === comparisonData.length - 1 ? 'none' : '1px solid rgba(212, 175, 55, 0.1)',
                                            ...(index === comparisonData.length - 1 && { borderBottomLeftRadius: '16px' })
                                        }}>
                                            {item.aspect}
                                        </td>
                                        <td style={{
                                            padding: '1.5rem',
                                            color: 'var(--color-text-muted)',
                                            fontSize: '1rem',
                                            lineHeight: '1.7',
                                            verticalAlign: 'top',
                                            borderLeft: '1px solid rgba(212, 175, 55, 0.15)',
                                            borderBottom: index === comparisonData.length - 1 ? 'none' : '1px solid rgba(212, 175, 55, 0.1)',
                                            background: item.winner === 'backend' ? 'rgba(212, 175, 55, 0.05)' : 'transparent'
                                        }}>
                                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                                                {item.winner === 'backend' && (
                                                    <span style={{ color: 'var(--color-accent)', fontSize: '1.2rem', flexShrink: 0 }}>✓</span>
                                                )}
                                                <span>{item.backend}</span>
                                            </div>
                                        </td>
                                        <td style={{
                                            padding: '1.5rem',
                                            color: 'var(--color-text-muted)',
                                            fontSize: '1rem',
                                            lineHeight: '1.7',
                                            verticalAlign: 'top',
                                            borderLeft: '1px solid rgba(212, 175, 55, 0.15)',
                                            borderBottom: index === comparisonData.length - 1 ? 'none' : '1px solid rgba(212, 175, 55, 0.1)',
                                            background: item.winner === 'blockchain' ? 'rgba(212, 175, 55, 0.05)' : 'transparent',
                                            ...(index === comparisonData.length - 1 && { borderBottomRightRadius: '16px' })
                                        }}>
                                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                                                {item.winner === 'blockchain' && (
                                                    <span style={{ color: 'var(--color-accent)', fontSize: '1.2rem', flexShrink: 0 }}>✓</span>
                                                )}
                                                <span>{item.blockchain}</span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Security Warning Section */}
                <div style={{
                    marginBottom: '6rem',
                    background: 'linear-gradient(135deg, rgba(102, 0, 0, 0.15) 0%, rgba(212, 175, 55, 0.05) 100%)',
                    backdropFilter: 'blur(20px)',
                    padding: '4rem',
                    borderRadius: '32px',
                    border: '2px solid rgba(212, 175, 55, 0.3)',
                    boxShadow: '0 20px 60px rgba(212, 175, 55, 0.2)'
                }}>
                    <div style={{
                        textAlign: 'center',
                        marginBottom: '3rem'
                    }}>
                        <div style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>🛡️</div>
                        <h2 style={{
                            fontSize: '2.5rem',
                            fontWeight: 300,
                            letterSpacing: '-0.02em',
                            background: 'linear-gradient(135deg, var(--color-accent) 0%, var(--color-primary) 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            marginBottom: '2rem'
                        }}>
                            Staying Safe in Juvantia
                        </h2>
                        <p style={{
                            fontSize: '1.25rem',
                            lineHeight: '1.9',
                            color: 'var(--color-text)',
                            maxWidth: '900px',
                            margin: '0 auto',
                            fontWeight: 300
                        }}>
                            Yes, blockchain comes with slightly higher risks. Careless transactions can lead to lost funds and various types of fraud.
                        </p>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '2rem'
                    }}>
                        <div style={{
                            padding: '2.5rem',
                            background: 'rgba(255, 255, 255, 0.05)',
                            borderRadius: '20px',
                            border: '1px solid rgba(212, 175, 55, 0.3)',
                            textAlign: 'center'
                        }}>
                            <div style={{
                                width: '80px',
                                height: '80px',
                                margin: '0 auto 1.5rem',
                                borderRadius: '50%',
                                background: 'rgba(212, 175, 55, 0.15)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '2rem'
                            }}>
                                ✓
                            </div>
                            <h3 style={{
                                color: 'var(--color-accent)',
                                marginBottom: '1rem',
                                fontSize: '1.4rem',
                                fontWeight: 500
                            }}>
                                Certified Smart Contracts
                            </h3>
                            <p style={{
                                color: 'var(--color-text-muted)',
                                lineHeight: '1.7',
                                margin: 0,
                                fontSize: '1.05rem'
                            }}>
                                Only use smart contracts certified by Juvantia to ensure safety and legitimacy.
                            </p>
                        </div>

                        <div style={{
                            padding: '2.5rem',
                            background: 'rgba(255, 255, 255, 0.05)',
                            borderRadius: '20px',
                            border: '1px solid rgba(212, 175, 55, 0.3)',
                            textAlign: 'center'
                        }}>
                            <div style={{
                                width: '80px',
                                height: '80px',
                                margin: '0 auto 1.5rem',
                                borderRadius: '50%',
                                background: 'rgba(212, 175, 55, 0.15)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '2rem'
                            }}>
                                💰
                            </div>
                            <h3 style={{
                                color: 'var(--color-accent)',
                                marginBottom: '1rem',
                                fontSize: '1.4rem',
                                fontWeight: 500
                            }}>
                                Use Only JVD
                            </h3>
                            <p style={{
                                color: 'var(--color-text-muted)',
                                lineHeight: '1.7',
                                margin: 0,
                                fontSize: '1.05rem'
                            }}>
                                Stick to Dinarium (JVD) — the official Juvantia token — for all transactions.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Conclusion Section */}
                <div style={{
                    background: 'rgba(255, 255, 255, 0.02)',
                    backdropFilter: 'blur(20px)',
                    padding: '4rem',
                    borderRadius: '32px',
                    border: '1px solid rgba(212, 175, 55, 0.2)',
                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
                    textAlign: 'center'
                }}>
                    <h2 style={{
                        fontSize: '2.5rem',
                        fontWeight: 300,
                        letterSpacing: '-0.02em',
                        background: 'linear-gradient(135deg, var(--color-accent) 0%, var(--color-text) 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        marginBottom: '2rem'
                    }}>
                        Our Conclusion
                    </h2>
                    <p style={{
                        fontSize: '1.4rem',
                        lineHeight: '1.9',
                        color: 'var(--color-text)',
                        maxWidth: '900px',
                        margin: '0 auto',
                        fontWeight: 300
                    }}>
                        The <span style={{ color: 'var(--color-accent)', fontWeight: 500 }}>realism of the economy</span> and the <span style={{ color: 'var(--color-accent)', fontWeight: 500 }}>multitude of financial instruments</span> outweigh the limitations and virtual game points of a traditional backend.
                    </p>
                    <div style={{
                        marginTop: '3rem',
                        padding: '2rem',
                        background: 'rgba(212, 175, 55, 0.08)',
                        borderRadius: '16px',
                        border: '1px solid rgba(212, 175, 55, 0.2)'
                    }}>
                        <p style={{
                            fontSize: '1.2rem',
                            color: 'var(--color-text-muted)',
                            lineHeight: '1.8',
                            margin: 0,
                            fontStyle: 'italic'
                        }}>
                            Blockchain enables Juvantia to become not just a game, but a living, breathing economy where real value is created, traded, and earned through the labor of autonomous Robulus units.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SmartContract;
