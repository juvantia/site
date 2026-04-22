import * as React from 'react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../components/GlassCard';

const EconomyGeneral: React.FC = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const tokens = [
        { id: 'EURC', name: 'EURC', url: 'https://www.circle.com/eurc' },
        { id: 'EURS', name: 'EURS', url: 'https://eurs.stasis.net/' },
        { id: 'EURQ', name: 'EURQ', url: 'https://www.quantoz.com/products/eurq-usdq' },
        { id: 'EUROe', name: 'EUROe', url: 'https://www.euroe.com/' }
    ];

    return (
        <section style={{
            padding: isMobile ? '4rem 1rem' : '6rem 2rem',
            background: 'transparent',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative',
            zIndex: 1
        }}>
            <div style={{ maxWidth: '1000px', width: '100%', textAlign: 'center', marginBottom: isMobile ? '3rem' : '5rem' }}>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                        fontSize: isMobile ? '2.5rem' : 'clamp(3rem, 6vw, 4.5rem)',
                        marginBottom: '1.5rem',
                        background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        fontWeight: 400,
                        fontFamily: "'Cinzel', serif",
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase'
                    }}
                >
                    The Economy
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    style={{
                        fontSize: isMobile ? '1.1rem' : '1.4rem',
                        color: 'var(--color-text-muted)',
                        lineHeight: '1.8',
                        fontWeight: 300,
                        maxWidth: '800px',
                        margin: '0 auto',
                        fontFamily: "'Space Grotesk', sans-serif"
                    }}
                >
                    JUVANTIA runs a real, self-contained economy: all value is created by participants and stays inside the park.
                </motion.p>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
                gap: '2rem',
                maxWidth: '1200px',
                width: '100%',
                marginBottom: isMobile ? '4rem' : '8rem'
            }}>
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                    <GlassCard style={{ height: '100%', padding: '2.5rem 2rem', display: 'flex', flexDirection: 'column', gap: '1rem', border: '1px solid rgba(0, 255, 136, 0.2)' }}>
                        <h3 style={{ color: 'var(--color-primary)', fontSize: '1.4rem', fontWeight: 500, marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>JUVANTIA Treasury</h3>
                        <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.7', fontSize: '1.05rem', fontWeight: 300 }}>
                            All payments — land sales, services, fees, and taxes — go into a single public treasury and are spent solely on JUVANTIA’s development: infrastructure, services, events, and new districts.
                        </p>
                    </GlassCard>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
                    <GlassCard style={{ height: '100%', padding: '2.5rem 2rem', display: 'flex', flexDirection: 'column', gap: '1rem', border: '1px solid rgba(0, 255, 136, 0.2)' }}>
                        <h3 style={{ color: 'var(--color-primary)', fontSize: '1.4rem', fontWeight: 500, marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>COMMUNITY FIRST</h3>
                        <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.7', fontSize: '1.05rem', fontWeight: 300 }}>
                            Individual participants do not pay any fees directly to the operator. Operational revenue comes only from commercial companies that use the park as an R&D, testing, or marketing platform.
                        </p>
                    </GlassCard>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
                    <GlassCard style={{ height: '100%', padding: '2.5rem 2rem', display: 'flex', flexDirection: 'column', gap: '1rem', border: '1px solid rgba(0, 255, 136, 0.2)' }}>
                        <h3 style={{ color: 'var(--color-primary)', fontSize: '1.4rem', fontWeight: 500, marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Free Economy</h3>
                        <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.7', fontSize: '1.05rem', fontWeight: 300 }}>
                            Prices, salaries, and projects are defined by participants and businesses themselves. JUVANTIA provides rules, dispute resolution, and infrastructure — everything else is driven by entrepreneurial initiative.
                        </p>
                    </GlassCard>
                </motion.div>
            </div>

            {/* Stablecoins Section */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : '1fr 1.2fr',
                gap: isMobile ? '3rem' : '5rem',
                maxWidth: '1200px',
                width: '100%',
                alignItems: 'center',
                paddingBottom: '4rem'
            }}>
                <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                    <GlassCard style={{
                        padding: isMobile ? '2rem' : '3.5rem',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '2.5rem',
                        background: 'linear-gradient(135deg, rgba(10, 15, 10, 0.6) 0%, rgba(0, 255, 136, 0.05) 100%)',
                        border: '1px solid rgba(0, 255, 136, 0.15)'
                    }}>
                        <h3 style={{
                            color: 'var(--color-primary)',
                            fontSize: '1.3rem',
                            letterSpacing: '0.15em',
                            marginBottom: '1rem',
                            textAlign: 'center',
                            fontFamily: "'Cinzel', serif",
                            textTransform: 'uppercase'
                        }}>
                            EURO-PEGGED STABLECOINS
                        </h3>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(4, 1fr)',
                            gap: isMobile ? '1rem' : '2rem',
                            justifyItems: 'center',
                            alignItems: 'center',
                            width: '100%'
                        }}>
                            {tokens.map(token => (
                                <motion.a
                                    key={token.id}
                                    href={token.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.1, y: -5 }}
                                    style={{
                                        position: 'relative',
                                        width: isMobile ? '50px' : '70px',
                                        height: isMobile ? '50px' : '70px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        textDecoration: 'none'
                                    }}
                                >
                                    <div style={{
                                        position: 'absolute',
                                        inset: -15,
                                        background: 'radial-gradient(circle, rgba(0, 255, 136, 0.15) 0%, transparent 70%)',
                                        borderRadius: '50%',
                                        filter: 'blur(10px)'
                                    }} />
                                    <img
                                        src={`/images/${token.id}.svg`}
                                        alt={token.name}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            position: 'relative',
                                            zIndex: 1,
                                            filter: 'drop-shadow(0 0 12px rgba(0, 255, 136, 0.4))'
                                        }}
                                    />
                                </motion.a>
                            ))}
                        </div>
                    </GlassCard>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, x: 30 }} 
                    whileInView={{ opacity: 1, x: 0 }} 
                    viewport={{ once: true }}
                    style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
                >
                    <p style={{
                        fontSize: isMobile ? '1.1rem' : '1.3rem',
                        color: 'var(--color-text)',
                        lineHeight: '1.8',
                        fontWeight: 300,
                        margin: 0
                    }}>
                        JUVANTIA’s monetary layer is based on euro-pegged stablecoins issued under the EU <a href="https://www.esma.europa.eu/esmas-activities/digital-finance-and-innovation/markets-crypto-assets-regulation-mica" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)', textDecoration: 'none', borderBottom: '1px solid rgba(0,255,136,0.3)', fontWeight: 500 }}>MiCA</a> regulatory framework.
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                        <p style={{ fontSize: '1.1rem', color: 'var(--color-text-muted)', opacity: 0.8, margin: 0 }}>
                            We operate exclusively with regulated EUR stablecoins to provide a stable, predictable base for your investments and operations.
                        </p>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(2, 1fr)',
                            gap: '1rem'
                        }}>
                            {['EURC', 'EURS', 'EURQ', 'EUROe'].map(item => (
                                <div key={item} style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.8rem',
                                    color: 'var(--color-primary)',
                                    fontSize: '1.1rem',
                                    fontWeight: 500,
                                    background: 'rgba(0, 255, 136, 0.05)',
                                    padding: '0.8rem 1.2rem',
                                    borderRadius: '12px',
                                    border: '1px solid rgba(0, 255, 136, 0.1)'
                                }}>
                                    <span style={{ width: '6px', height: '6px', background: 'var(--color-primary)', borderRadius: '50%', boxShadow: '0 0 10px var(--color-primary)' }} />
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>
                    <p style={{
                        fontSize: '1.05rem',
                        color: 'var(--color-text-muted)',
                        lineHeight: '1.7',
                        margin: 0,
                        fontStyle: 'italic'
                    }}>
                        Taxes, fees, and treasury operations are settled in these assets, giving the park a clear, euro-denominated economic base.
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default EconomyGeneral;
