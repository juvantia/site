import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export interface FAQItem {
    id: string;
    question: string;
    answer: React.ReactNode;
}

const faqItems: FAQItem[] = [
    {
        id: 'who-is-it-for',
        question: "WHO IS THIS PARK FOR?",
        answer: "JUVANTIA is built for tech enthusiasts, engineers, makers, and creators who want to operate their Robulus remotely via teleoperation — whether for pure entertainment, building a automated business, or conducting hardware/software R&D in a persistent real-world environment."
    },
    {
        id: 'cost',
        question: "HOW MUCH DOES IT COST?",
        answer: "Access to the technopark is completely free. Your only operational costs are standard taxes on specific platform services and physical asset ownership. Electricity is not a mandatory expense if your installation utilizes local solar or wind power generation."
    },
    {
        id: 'what-is-robulus',
        question: "WHAT IS A ROBULUS?",
        answer: "Robulus (or Robul) is a teleoperated mini-robot built by anyone (enthusiasts, teams, small manufacturers) that complies with JUVANTIA technical/safety standards and can remain operational for extended periods with minimal human intervention."
    },
    {
        id: 'ready-made-robulus',
        question: "CAN I BUY A READY-MADE ROBULUS?",
        answer: "Yes, absolutely. You can order a brand-new Robulus with any custom configuration (just like configuring a vehicle) directly from the technopark. Alternatively, you can purchase pre-owned Robulus units on the secondary market via the Trade Hub."
    },
    {
        id: 'build-custom-robulus',
        question: "CAN I BUILD MY OWN CUSTOM ROBULUS?",
        answer: "Yes, you can assemble a custom Robulus using our official chassis or your own design, and our standard PCB or a custom board. The mandatory requirement is using the ESP32-P4 microcontroller and adhering to the physical dimensions, power limits, and safety standards specified in the Tabularium. You can ship your fully assembled Robulus to the park or send us custom parts for on-site assembly."
    },
    {
        id: 'size',
        question: "HOW LARGE IS THE PARK?",
        answer: "The planned fenced territory is 6–8 hectares."
    },
    {
        id: 'physical-presence',
        question: "DO I NEED TO TRAVEL TO THE PHYSICAL PARK TO INSTALL OR MAINTAIN MY HARDWARE?",
        answer: "No, physical presence is strictly optional. Human access inside the technopark perimeter is restricted at all times to ensure site safety and operational security. Regular participants are not permitted inside the facility, even during scheduled technical windows. Physical deployment, unboxing, and hardware maintenance on-site are handled exclusively by authorized park contributors and engineering staff. You can deliver or collect your hardware via standard postal and courier services, or hand it over in person at the park entrance checkpoint."
    },
    {
        id: 'shipping',
        question: "HOW DO I SEND MY ROBULUS TO THE PARK?",
        answer: "You can ship it using any parcel delivery service to the park address (published once the territory is secured). The Operator’s representatives will receive it, register it, and place it into operation inside the park."
    },
    {
        id: 'what-is-domus',
        question: "WHAT IS A DOMUS, AND HOW DO I INSTALL ONE IN JUVANTIA?",
        answer: "A Domus is a physical shelter installed on a licensed sector in the park, functioning as a garage, charging station, or commercial shop for your Robulus. You can design a Domus yourself and delegate its fabrication to an official contributor, who will deploy it during the nearest service window. Alternatively, you can bring a pre-assembled Domus to the park entrance and hand it over to an official contributor. Physical installation inside the park perimeter is performed exclusively by authorized contributors during technical windows."
    },
    {
        id: 'storage-charging',
        question: "WHERE WILL MY ROBULUS BE STORED AND CHARGED?",
        answer: (
            <div>
                You have several options:
                <ul style={{ paddingLeft: '1.5rem', margin: '0.5rem 0' }}>
                    <li style={{ marginBottom: '0.25rem' }}>Install your own Domus on a Licensed Sector, with a power connection available on-site.</li>
                    <li style={{ marginBottom: '0.25rem' }}>Mount a solar panel on your Domus roof (where applicable).</li>
                    <li style={{ marginBottom: '0.25rem' }}>Rent charging/storage capacity from the park or from another participant.</li>
                </ul>
            </div>
        )
    },
    {
        id: 'repairs',
        question: "MY ROBULUS BROKE — WHAT DO I DO?",
        answer: "We expect that by 2027, remote repair capabilities (robotic manipulators / “robo arms”) will make on-site repairs possible without your physical presence. Otherwise, you can arrange return shipping the same way you shipped the Robulus in the first place."
    },
    {
        id: 'what-is-apu',
        question: "WHAT IS AN APU (ASSET PASSPORT UNIT)?",
        answer: "An APU (Asset Passport Unit) is the secure digital passport for a physical asset in JUVANTIA (Robulus, Domus, or Sector). APUs certify property ownership and grant holders the right to actively participate in the asset's lifecycle — voting on operational decisions, selecting service providers, and shaping the asset's future. Holders may receive service rewards for their active participation in the park ecosystem, distributed directly to their account in Euros."
    },
    {
        id: 'currency',
        question: "WHICH CURRENCY IS USED FOR PAYMENTS AND PAYOUTS?",
        answer: "The entire JUVANTIA economy operates with the intuitive user experience of a modern neo-bank, strictly displayed in Euros (€). Under the hood, all settlements, automated rentals, and APU yield payouts are processed in Euro-backed electronic money (EURC) via non-custodial accounts managed directly from your device using biometrics (Face ID or fingerprint authentication)."
    },
    {
        id: 'prove-ownership',
        question: "HOW DO I PROVE OWNERSHIP OF MY PHYSICAL ASSETS (ROBULUS, DOMUS OR SECTOR)?",
        answer: "Upon registering your physical asset with the park, JUVANTIA issues an Asset Passport Unit (APU) — a digital passport confirming 100% ownership of your property. Holding an APU grants you full control rights as well as automated, pro-rata Euro revenue payouts generated by the asset's operations inside the park."
    },
    {
        id: 'sell-transfer-asset',
        question: "CAN I SELL OR TRANSFER MY ROBULUS, DOMUS, OR SECTOR?",
        answer: "Yes. Every physical asset in the park is represented by an Asset Passport Unit (APU). You can list your full APU or sell fractional APU shares to other participants on the Trade Hub secondary marketplace at any time."
    },
    {
        id: 'sell-fractionally',
        question: "CAN I SELL MY ASSET FRACTIONALLY (PARTIALLY)?",
        answer: "Yes, absolutely. You can sell any percentage share of your asset's APU (Asset Passport Unit) at any price you consider fair on the Trade Hub. Co-owners holding fractional APU shares automatically receive their proportional share of all yield and rental payouts in Euros."
    },
    {
        id: 'ownership-control',
        question: "DOES OWNERSHIP PERCENTAGE AFFECT CONTROL OVER THE ASSET?",
        answer: "Yes. The park recognizes as the asset operator the participant holding a 51% APU (Asset Passport Unit) stake or backed by 51% of co-owners' votes. For example, if you own 45% of a Robulus APU, you remain its operator as long as other owners holding at least 6% vote for you. If co-owners holding 51% vote to reassign control to another driver, you relinquish operational teleoperation rights while fully retaining your 45% APU share and revenue yield rights."
    },
    {
        id: 'permanently-remove-robulus',
        question: "CAN I PERMANENTLY REMOVE MY ROBULUS FROM THE PARK FOR MAINTENANCE OR PERSONAL USE?",
        answer: "Yes, provided you hold 100% of the asset's APU (Asset Passport Unit). If you have sold fractional APU shares, you must either obtain formal authorization from the majority of co-owners via vote or deposit a full market value collateral on the day of retrieval."
    },
    {
        id: 'protection-confiscation-damage',
        question: "ARE MY PHYSICAL ASSETS PROTECTED FROM CONFISCATION OR DAMAGE?",
        answer: "Yes. The Park Charter guarantees the inviolability of participant property. The park perimeter is physically secured against unauthorized human access. Asset reassignment or restriction can only occur through a binding ruling of the collegial Multi-Model Tribunal in cases of proven damage to park infrastructure or other participants' property."
    },
    {
        id: 'content-behavioral-rules',
        question: "WHAT ARE THE MAIN CONTENT AND BEHAVIORAL RULES IN JUVANTIA?",
        answer: "JUVANTIA is a strictly technology-first and neutral public space. Real-world political, national, or religious agendas are prohibited. All activity must focus strictly on robotics, engineering, physical-digital commerce, and the development of the park ecosystem."
    },
    {
        id: 'colosseum',
        question: "WHAT IS THE COLOSSEUM?",
        answer: "The Colosseum is a separate arena zone where teams compete to hold control and earn defined benefits. Participation is voluntary, but you must assume a higher risk of damage: Robuli can be broken during assaults and defense. The Colosseum may operate under a separate rule set from the main park zone."
    }
];

const FAQ: React.FC = () => {
    const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
    const [copiedId, setCopiedId] = useState<string | null>(null);

    useEffect(() => {
        const hash = window.location.hash;
        if (hash) {
            const id = hash.replace('#', '');
            setOpenItems(prev => ({ ...prev, [id]: true }));
            const element = document.getElementById(id);
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth' });
                }, 300);
            }
        }
    }, []);

    const toggleItem = (id: string) => {
        setOpenItems(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const handleCopyId = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        const url = `${window.location.origin}${window.location.pathname}#${id}`;
        navigator.clipboard.writeText(url);
        setCopiedId(id);
        window.history.pushState(null, '', `#${id}`);
        setOpenItems(prev => ({ ...prev, [id]: true }));
        setTimeout(() => setCopiedId(null), 2000);
    };

    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: '#050a09', // Surface Low - Deep Robotics Mat Base
            backgroundImage: `
                linear-gradient(to right, rgba(0, 255, 136, 0.04) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(0, 255, 136, 0.04) 1px, transparent 1px),
                linear-gradient(to right, rgba(0, 255, 136, 0.015) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(0, 255, 136, 0.015) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px, 100px 100px, 20px 20px, 20px 20px',
            padding: '120px 20px 80px',
            position: 'relative',
            color: '#E6F0EB'
        }}>
            <div style={{
                maxWidth: '800px',
                margin: '0 auto',
                position: 'relative',
                zIndex: 2
            }}>
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    style={{
                        textAlign: 'center',
                        marginBottom: '3.5rem',
                        position: 'relative'
                    }}
                >
                    <h1 style={{
                        fontFamily: '"Cinzel", serif',
                        fontSize: 'clamp(2.2rem, 5vw, 3.2rem)',
                        fontWeight: 600,
                        marginBottom: '0.5rem',
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        background: 'linear-gradient(135deg, #00FF88 0%, #00D4FF 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        textShadow: '0 0 30px rgba(0, 255, 136, 0.25)'
                    }}>
                        FAQ
                    </h1>
                </motion.div>

                {/* FAQ Accordion List - Always present in DOM for LLM bots & SEO */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.25rem'
                }}>
                    {faqItems.map((item, index) => {
                        const isOpen = !!openItems[item.id];

                        return (
                            <motion.div
                                key={item.id}
                                id={item.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: index * 0.03 }}
                                style={{
                                    background: '#171d1b', // Surface Medium - Opaque
                                    border: isOpen ? '1px solid rgba(0, 255, 136, 0.5)' : '1px solid rgba(59, 75, 61, 0.4)',
                                    borderRadius: '8px',
                                    padding: '1.5rem 1.75rem',
                                    position: 'relative',
                                    scrollMarginTop: '120px',
                                    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                                    boxShadow: isOpen ? '0 0 25px rgba(0, 255, 136, 0.12)' : '0 4px 20px rgba(0, 0, 0, 0.4)',
                                    cursor: 'pointer'
                                }}
                                onClick={() => toggleItem(item.id)}
                                onMouseEnter={(e) => {
                                    if (!isOpen) {
                                        e.currentTarget.style.borderColor = 'rgba(0, 255, 136, 0.35)';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (!isOpen) {
                                        e.currentTarget.style.borderColor = 'rgba(59, 75, 61, 0.4)';
                                    }
                                }}
                            >
                                {/* Header / Question Bar */}
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    gap: '1rem'
                                }}>
                                    <h2 style={{
                                        fontFamily: '"Cinzel", serif',
                                        fontSize: '1.15rem',
                                        fontWeight: 600,
                                        color: isOpen ? '#00FF88' : '#E6F0EB',
                                        letterSpacing: '0.04em',
                                        textTransform: 'uppercase',
                                        lineHeight: '1.4',
                                        margin: 0,
                                        transition: 'color 0.25s ease'
                                    }}>
                                        {item.question}
                                    </h2>

                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.75rem',
                                        flexShrink: 0
                                    }}>
                                        <button
                                            onClick={(e) => handleCopyId(item.id, e)}
                                            title="Copy link"
                                            style={{
                                                background: copiedId === item.id ? 'rgba(0, 255, 136, 0.2)' : 'transparent',
                                                border: 'none',
                                                color: copiedId === item.id ? '#00FF88' : 'rgba(230, 240, 235, 0.3)',
                                                fontSize: '1.1rem',
                                                padding: '0.2rem 0.4rem',
                                                borderRadius: '4px',
                                                cursor: 'pointer',
                                                transition: 'all 0.2s ease'
                                            }}
                                        >
                                            #
                                        </button>

                                        {/* Expand/Collapse Chevron Indicator */}
                                        <motion.span
                                            animate={{ rotate: isOpen ? 180 : 0 }}
                                            transition={{ duration: 0.3 }}
                                            style={{
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                width: '24px',
                                                height: '24px',
                                                color: isOpen ? '#00FF88' : 'rgba(230, 240, 235, 0.4)',
                                                fontSize: '14px'
                                            }}
                                        >
                                            ▼
                                        </motion.span>
                                    </div>
                                </div>

                                {/* Answer Body - ALWAYS rendered in DOM for LLM bots & SSG, animated height for users */}
                                <motion.div
                                    initial={false}
                                    animate={{
                                        height: isOpen ? 'auto' : 0,
                                        opacity: isOpen ? 1 : 0,
                                        marginTop: isOpen ? 16 : 0,
                                        paddingTop: isOpen ? 16 : 0
                                    }}
                                    transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                                    style={{
                                        overflow: 'hidden',
                                        borderTop: isOpen ? '1px solid rgba(0, 255, 136, 0.15)' : '1px solid transparent',
                                        transition: 'border-color 0.3s ease'
                                    }}
                                >
                                    <div style={{
                                        fontFamily: 'Inter, system-ui, sans-serif',
                                        color: '#b9cbb9',
                                        lineHeight: '1.65',
                                        fontSize: '0.98rem'
                                    }}>
                                        {item.answer}
                                    </div>
                                </motion.div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default FAQ;
