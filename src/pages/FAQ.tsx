import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PageTitle from '../components/PageTitle';
import CursorGlow from '../components/CursorGlow';
import { motion } from 'framer-motion';
import AnimatedBackground from '../components/AnimatedBackground';

const FAQ: React.FC = () => {
    const location = useLocation();

    useEffect(() => {
        if (location.hash) {
            const id = location.hash.replace('#', '');
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [location]);

    const faqItems = [
        {
            id: 'who-is-it-for',
            question: "Who is this technopark for?",
            answer: "JUVANTIA is for anyone who wants to remotely operate their own mini-robot in a real, open-air technopark environment."
        },
        {
            id: 'cost',
            question: "How much does it cost?",
            answer: (
                <>
                    Access to the technopark is free. You only cover:
                    <ul style={{ paddingLeft: '1.5rem', margin: '0.5rem 0' }}>
                        <li style={{ marginBottom: '0.25rem' }}>shipping your Robulus to Europe (at your own expense), and</li>
                        <li style={{ marginBottom: '0.25rem' }}>electricity for charging at the retail energy price + 20%.</li>
                    </ul>
                </>
            )
        },
        {
            id: 'what-is-robulus',
            question: "What is a Robulus?",
            answer: "Robulus (or Robul) is a teleoperated mini-robot built by anyone (enthusiasts, teams, small manufacturers) that complies with JUVANTIA technical/safety standards and can remain operational for extended periods with minimal human intervention."
        },
        {
            id: 'shipping',
            question: "How do I send my Robulus to the technopark?",
            answer: "You can ship it using any parcel delivery service to the technopark address (published once the territory is secured). The Operator’s representatives will receive it, register it, and place it into operation inside the technopark."
        },
        {
            id: 'storage-charging',
            question: "Where will my Robulus be stored and charged?",
            answer: (
                <>
                    You have several options:
                    <ul style={{ paddingLeft: '1.5rem', margin: '0.5rem 0' }}>
                        <li style={{ marginBottom: '0.25rem' }}>Install your own Shelter on a Licensed Plot, with a power connection available on-site.</li>
                        <li style={{ marginBottom: '0.25rem' }}>Mount a solar panel on your Shelter roof (where applicable).</li>
                    </ul>
                    Rent charging/storage capacity from the technopark or from another participant.
                </>
            )
        },
        {
            id: 'size',
            question: "How large is the technopark?",
            answer: "The planned fenced territory is 6–8 hectares."
        },
        {
            id: 'participation-without-robot',
            question: "I don’t want to build a Robulus. Can I still participate?",
            answer: "Yes. We are actively working with partners to adapt existing robots to JUVANTIA standards. It is likely that by launch you will be able to buy a ready-made mini-robot suitable for the technopark."
        },
        {
            id: 'colosseum',
            question: "What is the Colosseum?",
            answer: "The Colosseum is a separate arena zone where teams compete to hold control and earn defined benefits. Participation is voluntary, but you must assume a higher risk of damage: Robuli can be broken during assaults and defense. The Colosseum may operate under a separate rule set from the main technopark zone."
        },
        {
            id: 'safety',
            question: "If I build my Robulus with expensive components, how is safety handled?",
            answer: "The technopark is designed around asset protection and safety. Planned measures include high-quality surveillance coverage and incident review procedures. If a party is found responsible for proven damage, they may be required to compensate the loss under the technopark’s dispute and enforcement process."
        },
        {
            id: 'repairs',
            question: "My Robulus broke — what do I do?",
            answer: "We expect that by 2027, remote repair capabilities (robotic manipulators / “robo arms”) will make on-site repairs possible without your physical presence. Otherwise, you can arrange return shipping the same way you shipped the Robulus in the first place."
        }
    ];

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)',
            padding: '100px 20px 40px',
            position: 'relative',
            color: 'white'
        }}>
            <PageTitle title="FAQ - JUVANTIA" />
            <AnimatedBackground />
            <CursorGlow />

            <div style={{
                maxWidth: '800px',
                margin: '0 auto',
                position: 'relative',
                zIndex: 1
            }}>
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    style={{
                        textAlign: 'center',
                        marginBottom: '4rem',
                        position: 'relative',
                        zIndex: 2
                    }}
                >
                    <h1 style={{
                        fontFamily: '"Cinzel", serif',
                        fontSize: 'clamp(2rem, 5vw, 3rem)',
                        marginBottom: '1rem',
                        letterSpacing: '0.1em',
                        background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        position: 'relative',
                        zIndex: 2
                    }}>
                        FAQ
                    </h1>
                    <p style={{
                        color: 'rgba(255,255,255,0.6)',
                        fontSize: '1.1rem',
                        position: 'relative',
                        zIndex: 2
                    }}>
                        Frequently Asked Questions about the technopark.
                    </p>
                </motion.div>

                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2rem',
                    position: 'relative',
                    zIndex: 2
                }}>
                    {faqItems.map((item, index) => (
                        <motion.div
                            key={item.id}
                            id={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            style={{
                                background: 'rgba(255, 255, 255, 0.03)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                borderRadius: '12px',
                                padding: '2rem',
                                position: 'relative',
                                scrollMarginTop: '120px',
                                cursor: 'pointer',
                                transition: 'border-color 0.2s, background 0.2s',
                                zIndex: 2
                            }}
                            whileHover={{
                                borderColor: 'rgba(0, 255, 136, 0.4)',
                                background: 'rgba(255, 255, 255, 0.05)'
                            }}
                            onClick={() => {
                                window.history.pushState(null, '', `#${item.id}`);
                                const element = document.getElementById(item.id);
                                if (element) {
                                    element.scrollIntoView({ behavior: 'smooth' });
                                }
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', marginBottom: '1rem' }}>
                                <h2 style={{
                                    fontSize: '1.3rem',
                                    margin: 0,
                                    color: 'var(--color-primary)',
                                    lineHeight: '1.4'
                                }}>
                                    {item.question}
                                </h2>
                                <div
                                    style={{
                                        color: 'rgba(255, 255, 255, 0.3)',
                                        textDecoration: 'none',
                                        fontSize: '1.2rem',
                                        padding: '0.2rem 0.5rem',
                                        borderRadius: '4px',
                                        transition: 'all 0.2s',
                                        flexShrink: 0
                                    }}
                                >
                                    #
                                </div>
                            </div>
                            <div style={{
                                color: 'rgba(255, 255, 255, 0.8)',
                                lineHeight: '1.6',
                                fontSize: '1rem'
                            }}>
                                {item.answer}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FAQ;
