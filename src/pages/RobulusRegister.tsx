import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config/api';
import CursorGlow from '../components/CursorGlow';
import PageTitle from '../components/PageTitle';

const RobulusRegister: React.FC = () => {
    // ... (state hooks)
    const [memorandumCount, setMemorandumCount] = useState<number>(0);
    const [formData, setFormData] = useState({
        name: '',
        contact: '',
        readyToBuild: false,
        experience: '',
        photos: [] as string[]
    });
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 100);
        const checkMobile = () => setIsMobile(window.innerWidth <= 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        fetch(`${API_BASE_URL}/memorandums/count`)
            .then(res => res.json())
            .then(data => setMemorandumCount(data.count))
            .catch(() => { }); // Removed unused err
        return () => {
            clearTimeout(timer);
            window.removeEventListener('resize', checkMobile);
        };
    }, []);

    // ... (handlers)
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;

        const maxFiles = 5;
        const remainingSlots = maxFiles - formData.photos.length;
        const filesToProcess = Math.min(files.length, remainingSlots);

        for (let i = 0; i < filesToProcess; i++) {
            const file = files[i];
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({
                    ...prev,
                    photos: [...prev.photos, reader.result as string]
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const removePhoto = (index: number) => {
        setFormData(prev => ({
            ...prev,
            photos: prev.photos.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            const response = await fetch(`${API_BASE_URL}/memorandums`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    photos: JSON.stringify(formData.photos)
                })
            });
            if (response.ok) {
                setSubmitted(true);
            } else {
                setError('Failed to submit memorandum. Please try again.');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        }
    };

    const target = 100;
    const progress = Math.min((memorandumCount / target) * 100, 100);

    return (
        <div style={{
            minHeight: '100vh',
            background: 'var(--color-bg)',
            position: 'relative',
            overflow: 'hidden'
        }}>
            <PageTitle title="Robulus Register - JUVANTIA" />
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
                    marginBottom: isMobile ? '3rem' : '4rem',
                    position: 'relative'
                }}>
                    <h2 style={{
                        fontSize: isMobile ? '1.8rem' : 'clamp(2rem, 4vw, 2.5rem)',
                        lineHeight: '1.4',
                        maxWidth: '800px',
                        margin: '0 auto 3rem',
                        background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        fontWeight: 400,
                        letterSpacing: '-0.02em',
                        textTransform: 'uppercase'
                    }}>
                        FROM CONCEPT TO TECHNOPARK
                    </h2>

                    <div style={{
                        display: 'inline-block',
                        position: 'relative',
                        marginBottom: isMobile ? '2rem' : '3rem'
                    }}>
                        <img
                            src="/images/ROBULUS.png"
                            alt="Robulus"
                            style={{
                                maxWidth: isMobile ? '280px' : '400px',
                                width: '100%',
                                height: 'auto',
                                borderRadius: isMobile ? '20px' : '24px',
                                boxShadow: '0 20px 60px rgba(0, 255, 136, 0.2), 0 0 80px rgba(0, 255, 136, 0.1)',
                                border: '1px solid rgba(0, 255, 136, 0.2)',
                                transform: 'translateZ(0)',
                                transition: 'all 0.4s ease',
                            }}
                            onMouseOver={(e) => {
                                if (!isMobile) {
                                    e.currentTarget.style.transform = 'scale(1.02) translateZ(0)';
                                    e.currentTarget.style.boxShadow = '0 25px 70px rgba(0, 255, 136, 0.3), 0 0 100px rgba(0, 255, 136, 0.15)';
                                }
                            }}
                            onMouseOut={(e) => {
                                if (!isMobile) {
                                    e.currentTarget.style.transform = 'scale(1) translateZ(0)';
                                    e.currentTarget.style.boxShadow = '0 20px 60px rgba(0, 255, 136, 0.2), 0 0 80px rgba(0, 255, 136, 0.1)';
                                }
                            }}
                        />
                    </div>

                    <p style={{
                        fontSize: isMobile ? '1.1rem' : '1.35rem',
                        lineHeight: '1.8',
                        maxWidth: '800px',
                        margin: '0 auto',
                        background: 'linear-gradient(135deg, var(--color-text) 0%, var(--color-primary) 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        fontWeight: 300,
                        letterSpacing: '-0.01em'
                    }}>
                        The first milestone is a proof of concept: 100 accepted Memorandums of Intent from people ready to build and send their Robulus to the future technopark.
                    </p>
                </div>

                {/* Progress Section */}
                <div style={{
                    marginBottom: isMobile ? '4rem' : '6rem',
                    background: 'linear-gradient(135deg, rgba(0, 255, 136, 0.03) 0%, rgba(0, 212, 255, 0.02) 100%)',
                    backdropFilter: 'blur(20px)',
                    padding: isMobile ? '2rem 1.25rem' : '3rem',
                    borderRadius: isMobile ? '24px' : '28px',
                    border: '1px solid rgba(0, 255, 136, 0.15)',
                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
                }}>
                    <h2 style={{
                        marginBottom: isMobile ? '1.5rem' : '2rem',
                        textAlign: 'center',
                        fontSize: isMobile ? '1.3rem' : '1.8rem',
                        fontWeight: 400,
                        letterSpacing: '-0.02em',
                        background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}>
                        PROOF-OF-CONCEPT PROGRESS
                    </h2>
                    <div style={{
                        background: 'rgba(0, 0, 0, 0.3)',
                        height: '40px',
                        borderRadius: '20px',
                        overflow: 'hidden',
                        position: 'relative',
                        border: '1px solid rgba(0, 255, 136, 0.2)'
                    }}>
                        <div style={{
                            width: `${progress}%`,
                            background: 'linear-gradient(90deg, var(--color-primary) 0%, var(--color-secondary) 100%)',
                            height: '100%',
                            transition: 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)',
                            position: 'relative',
                            boxShadow: '0 0 30px rgba(0, 255, 136, 0.4)'
                        }}>
                            <div style={{
                                position: 'absolute',
                                inset: 0,
                                background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.3) 50%, transparent 100%)',
                                animation: 'shimmer 2s infinite'
                            }} />
                        </div>
                        <span style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            color: '#fff',
                            fontWeight: 600,
                            fontSize: '1rem',
                            textShadow: '0 2px 10px rgba(0,0,0,0.5)',
                            letterSpacing: '0.05em'
                        }}>
                            {memorandumCount} / {target} Robuli
                        </span>
                    </div>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginTop: '1rem',
                        fontSize: '0.85rem',
                        color: 'var(--color-text-muted)'
                    }}>
                        <span>Started</span>
                        <span>{progress.toFixed(1)}% Complete</span>
                    </div>
                </div>

                {/* Steps Section */}
                <div style={{ marginBottom: isMobile ? '4rem' : '6rem' }}>
                    <h2 style={{
                        textAlign: 'center',
                        marginBottom: isMobile ? '2rem' : '3rem',
                        fontSize: isMobile ? '1.5rem' : '2.2rem',
                        fontWeight: 400,
                        letterSpacing: '-0.02em',
                        background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}>
                        HOW IT WILL WORK
                    </h2>

                    {/* Mobile: Horizontal scroll | Desktop: Grid */}
                    <div style={isMobile ? {
                        display: 'flex',
                        overflowX: 'auto',
                        scrollSnapType: 'x mandatory',
                        gap: '1rem',
                        padding: '0.5rem 0',
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none'
                    } : {
                        display: 'grid',
                        gridTemplateColumns: 'repeat(4, 1fr)',
                        gap: '1.5rem'
                    }}>
                        <style>{`.steps-scroll::-webkit-scrollbar { display: none; }`}</style>
                        {[
                            {
                                title: "Build or Buy a Robulus",
                                text: (
                                    <span>
                                        Any platform is welcome — as long as it supports Wi-Fi connectivity and meets the{' '}
                                        <a
                                            href="https://tabularium.juvantia.org/corpus/robulus/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{
                                                color: 'var(--color-primary)',
                                                textDecoration: 'none',
                                                borderBottom: '1px solid var(--color-primary)',
                                                transition: 'all 0.3s ease'
                                            }}
                                        >
                                            Robulus specifications
                                        </a>.
                                    </span>
                                ),
                                icon: "🤖"
                            },
                            {
                                title: "Set Up a Control Client",
                                text: "Use our open-source client, or build your own. With modern AI tooling, creating a custom client is straightforward.",
                                icon: "💻"
                            },
                            {
                                title: "Send by Parcel",
                                text: "Ship your Robulus to Europe (location TBD).",
                                icon: "📦"
                            },
                            {
                                title: "Control Robulus in JUVANTIA",
                                text: "Operate your Robulus remotely inside the JUVANTIA technopark.",
                                icon: "🎮"
                            }
                        ].map((step, index) => (
                            <div
                                key={index}
                                style={{
                                    background: 'linear-gradient(135deg, rgba(0, 255, 136, 0.03) 0%, rgba(0, 212, 255, 0.02) 100%)',
                                    backdropFilter: 'blur(10px)',
                                    padding: isMobile ? '1.5rem' : '2rem',
                                    borderRadius: isMobile ? '16px' : '20px',
                                    border: '1px solid rgba(0, 255, 136, 0.12)',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                    cursor: 'default',
                                    ...(isMobile && {
                                        flexShrink: 0,
                                        width: '260px',
                                        scrollSnapAlign: 'start'
                                    })
                                }}
                                onMouseOver={(e) => {
                                    if (!isMobile) {
                                        e.currentTarget.style.transform = 'translateY(-6px)';
                                        e.currentTarget.style.borderColor = 'rgba(0, 255, 136, 0.4)';
                                        e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 255, 136, 0.15)';
                                    }
                                }}
                                onMouseOut={(e) => {
                                    if (!isMobile) {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.borderColor = 'rgba(0, 255, 136, 0.12)';
                                        e.currentTarget.style.boxShadow = 'none';
                                    }
                                }}
                            >
                                <div style={{
                                    fontSize: isMobile ? '2rem' : '2.5rem',
                                    marginBottom: '1rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1rem'
                                }}>
                                    <span style={{
                                        fontSize: isMobile ? '0.85rem' : '1rem',
                                        fontWeight: 600,
                                        color: 'var(--color-primary)',
                                        background: 'rgba(0, 255, 136, 0.1)',
                                        width: isMobile ? '30px' : '36px',
                                        height: isMobile ? '30px' : '36px',
                                        borderRadius: '10px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        {index + 1}
                                    </span>
                                    <span>{step.icon}</span>
                                </div>
                                <h3 style={{
                                    fontWeight: 500,
                                    marginBottom: '0.5rem',
                                    color: 'var(--color-text)',
                                    fontSize: isMobile ? '1rem' : '1.2rem',
                                    letterSpacing: '-0.01em'
                                }}>
                                    {step.title}
                                </h3>
                                <p style={{
                                    fontSize: isMobile ? '0.85rem' : '0.95rem',
                                    margin: 0,
                                    color: 'var(--color-text-muted)',
                                    lineHeight: '1.6'
                                }}>
                                    {step.text}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>



                {/* Memorandum Form */}
                <div style={{
                    background: 'linear-gradient(135deg, rgba(0, 255, 136, 0.03) 0%, rgba(0, 212, 255, 0.02) 100%)',
                    backdropFilter: 'blur(20px)',
                    padding: isMobile ? '2rem 1.25rem' : '3rem',
                    borderRadius: isMobile ? '24px' : '28px',
                    border: '1px solid rgba(0, 255, 136, 0.15)',
                    maxWidth: '800px',
                    margin: '0 auto',
                    boxShadow: '0 30px 80px rgba(0, 0, 0, 0.4)'
                }}>
                    <h2 style={{
                        textAlign: 'center',
                        marginBottom: '1rem',
                        fontSize: isMobile ? '1.5rem' : '2rem',
                        fontWeight: 400,
                        letterSpacing: '-0.02em',
                        background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}>
                        Memorandum of Intent
                    </h2>
                    <div style={{
                        marginBottom: isMobile ? '2rem' : '3rem',
                        maxWidth: '700px',
                        margin: isMobile ? '0 auto 2rem' : '0 auto 3rem',
                        textAlign: 'left',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem'
                    }}>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <span style={{ color: 'var(--color-primary)', fontSize: '1.2rem' }}>•</span>
                            <p style={{ color: 'var(--color-text-muted)', fontSize: isMobile ? '0.9rem' : '1rem', lineHeight: '1.6', margin: 0 }}>
                                We only count memorandums from applicants with <strong>proven experience</strong> in robotics or 3D printing, or with a clear and realistic plan for building a Robulus.
                            </p>
                        </div>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <span style={{ color: 'var(--color-primary)', fontSize: '1.2rem' }}>•</span>
                            <p style={{ color: 'var(--color-text-muted)', fontSize: isMobile ? '0.9rem' : '1rem', lineHeight: '1.6', margin: 0 }}>
                                The first <strong>100 approved memorandums</strong> will each receive <strong>1 m² Perpetual Plot License</strong> in JUVANTIA, effective upon the launch of the physical technopark.
                            </p>
                        </div>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <span style={{ color: 'var(--color-primary)', fontSize: '1.2rem' }}>•</span>
                            <p style={{ color: 'var(--color-text-muted)', fontSize: isMobile ? '0.9rem' : '1rem', lineHeight: '1.6', margin: 0 }}>
                                Actual shipping of Robuli will start only after electricity and connectivity are provided at the selected territory.
                            </p>
                        </div>
                    </div>

                    {submitted ? (
                        <div style={{
                            textAlign: 'center',
                            padding: '3rem',
                            background: 'rgba(0, 255, 136, 0.1)',
                            borderRadius: '20px',
                            border: '1px solid rgba(0, 255, 136, 0.3)'
                        }}>
                            <div style={{ fontSize: '3rem', marginBottom: '1rem', color: 'var(--color-primary)' }}>✓</div>
                            <div style={{
                                color: 'var(--color-primary)',
                                fontSize: '1.4rem',
                                fontWeight: 500
                            }}>
                                Thank you! Your memorandum has been received.
                            </div>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div>
                                <label style={{
                                    display: 'block',
                                    marginBottom: '0.5rem',
                                    fontSize: '0.85rem',
                                    fontWeight: 500,
                                    color: 'var(--color-primary)',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.1em'
                                }}>
                                    Name / Alias
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '1rem 1.25rem',
                                        background: 'rgba(0, 255, 136, 0.03)',
                                        border: '1px solid rgba(0, 255, 136, 0.2)',
                                        color: 'var(--color-text)',
                                        borderRadius: '12px',
                                        fontSize: '1rem',
                                        transition: 'all 0.3s ease',
                                        outline: 'none'
                                    }}
                                    onFocus={(e) => {
                                        e.currentTarget.style.borderColor = 'var(--color-primary)';
                                        e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 255, 136, 0.15)';
                                    }}
                                    onBlur={(e) => {
                                        e.currentTarget.style.borderColor = 'rgba(0, 255, 136, 0.2)';
                                        e.currentTarget.style.boxShadow = 'none';
                                    }}
                                />
                            </div>
                            <div>
                                <label style={{
                                    display: 'block',
                                    marginBottom: '0.5rem',
                                    fontSize: '0.85rem',
                                    fontWeight: 500,
                                    color: 'var(--color-primary)',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.1em'
                                }}>
                                    Contact Email
                                </label>
                                <input
                                    type="email"
                                    name="contact"
                                    value={formData.contact}
                                    onChange={handleChange}
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '1rem 1.25rem',
                                        background: 'rgba(0, 255, 136, 0.03)',
                                        border: '1px solid rgba(0, 255, 136, 0.2)',
                                        color: 'var(--color-text)',
                                        borderRadius: '12px',
                                        fontSize: '1rem',
                                        transition: 'all 0.3s ease',
                                        outline: 'none'
                                    }}
                                    onFocus={(e) => {
                                        e.currentTarget.style.borderColor = 'var(--color-primary)';
                                        e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 255, 136, 0.15)';
                                    }}
                                    onBlur={(e) => {
                                        e.currentTarget.style.borderColor = 'rgba(0, 255, 136, 0.2)';
                                        e.currentTarget.style.boxShadow = 'none';
                                    }}
                                />
                            </div>
                            <div>
                                <label style={{
                                    display: 'block',
                                    marginBottom: '0.5rem',
                                    fontSize: '0.85rem',
                                    fontWeight: 500,
                                    color: 'var(--color-primary)',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.1em'
                                }}>
                                    Relevant Experience
                                </label>
                                <textarea
                                    name="experience"
                                    value={formData.experience}
                                    onChange={handleChange}
                                    rows={4}
                                    placeholder="YouTube, Forum, GitHub links, etc."
                                    style={{
                                        width: '100%',
                                        padding: '1rem 1.25rem',
                                        background: 'rgba(0, 255, 136, 0.03)',
                                        border: '1px solid rgba(0, 255, 136, 0.2)',
                                        color: 'var(--color-text)',
                                        borderRadius: '12px',
                                        fontSize: '1rem',
                                        transition: 'all 0.3s ease',
                                        outline: 'none',
                                        resize: 'vertical',
                                        fontFamily: 'inherit',
                                        lineHeight: '1.6'
                                    }}
                                    onFocus={(e) => {
                                        e.currentTarget.style.borderColor = 'var(--color-primary)';
                                        e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 255, 136, 0.15)';
                                    }}
                                    onBlur={(e) => {
                                        e.currentTarget.style.borderColor = 'rgba(0, 255, 136, 0.2)';
                                        e.currentTarget.style.boxShadow = 'none';
                                    }}
                                />
                            </div>
                            <div>
                                <label style={{
                                    display: 'block',
                                    marginBottom: '0.5rem',
                                    fontSize: '0.85rem',
                                    fontWeight: 500,
                                    color: 'var(--color-primary)',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.1em'
                                }}>
                                    Photos (max 5)
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={handlePhotoUpload}
                                    disabled={formData.photos.length >= 5}
                                    style={{
                                        width: '100%',
                                        padding: '1.25rem',
                                        background: 'rgba(0, 255, 136, 0.03)',
                                        border: '2px dashed rgba(0, 255, 136, 0.25)',
                                        color: 'var(--color-text)',
                                        borderRadius: '12px',
                                        cursor: formData.photos.length >= 5 ? 'not-allowed' : 'pointer',
                                        transition: 'all 0.3s ease'
                                    }}
                                />
                                {formData.photos.length > 0 && (
                                    <div style={{
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
                                        gap: '1rem',
                                        marginTop: '1rem'
                                    }}>
                                        {formData.photos.map((photo, index) => (
                                            <div key={index} style={{
                                                position: 'relative',
                                                aspectRatio: '1',
                                                borderRadius: '12px',
                                                overflow: 'hidden',
                                                border: '1px solid rgba(0, 255, 136, 0.2)'
                                            }}>
                                                <img
                                                    src={photo}
                                                    alt={`Photo ${index + 1}`}
                                                    style={{
                                                        width: '100%',
                                                        height: '100%',
                                                        objectFit: 'cover'
                                                    }}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => removePhoto(index)}
                                                    style={{
                                                        position: 'absolute',
                                                        top: '6px',
                                                        right: '6px',
                                                        background: 'rgba(255, 71, 87, 0.9)',
                                                        color: '#fff',
                                                        border: 'none',
                                                        borderRadius: '8px',
                                                        width: '28px',
                                                        height: '28px',
                                                        cursor: 'pointer',
                                                        fontWeight: 'bold',
                                                        fontSize: '1rem',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center'
                                                    }}
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {error && (
                                <div style={{
                                    padding: '1rem',
                                    background: 'rgba(255, 71, 87, 0.1)',
                                    border: '1px solid rgba(255, 71, 87, 0.3)',
                                    borderRadius: '12px',
                                    color: '#ff6b6b',
                                    textAlign: 'center'
                                }}>
                                    {error}
                                </div>
                            )}

                            <div style={{
                                paddingTop: '1.5rem',
                                borderTop: '1px solid rgba(0, 255, 136, 0.15)',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '1.5rem'
                            }}>
                                <label style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1rem',
                                    cursor: 'pointer',
                                    padding: '1.25rem',
                                    background: 'rgba(0, 255, 136, 0.03)',
                                    borderRadius: '12px',
                                    border: '1px solid rgba(0, 255, 136, 0.15)',
                                    transition: 'all 0.3s ease'
                                }}
                                    onMouseOver={(e) => e.currentTarget.style.background = 'rgba(0, 255, 136, 0.06)'}
                                    onMouseOut={(e) => e.currentTarget.style.background = 'rgba(0, 255, 136, 0.03)'}
                                >
                                    <input
                                        type="checkbox"
                                        name="readyToBuild"
                                        checked={formData.readyToBuild}
                                        onChange={handleChange}
                                        id="readyToBuild"
                                        style={{
                                            width: '22px',
                                            height: '22px',
                                            cursor: 'pointer',
                                            accentColor: 'var(--color-primary)'
                                        }}
                                    />
                                    <span style={{
                                        fontSize: '1rem',
                                        color: 'var(--color-text)',
                                        flex: 1
                                    }}>
                                        I am ready to build and send a Robulus when the territory opens (planned for early 2027).
                                    </span>
                                </label>

                                <button
                                    type="submit"
                                    disabled={!formData.readyToBuild}
                                    style={{
                                        padding: '1.25rem 2.5rem',
                                        background: formData.readyToBuild
                                            ? 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)'
                                            : 'rgba(100, 100, 100, 0.3)',
                                        color: formData.readyToBuild ? '#000' : '#666',
                                        border: 'none',
                                        borderRadius: '14px',
                                        fontSize: '1.1rem',
                                        fontWeight: 600,
                                        cursor: formData.readyToBuild ? 'pointer' : 'not-allowed',
                                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                        letterSpacing: '0.05em',
                                        textTransform: 'uppercase',
                                        boxShadow: formData.readyToBuild
                                            ? '0 10px 30px rgba(0, 255, 136, 0.3)'
                                            : 'none'
                                    }}
                                    onMouseOver={(e) => {
                                        if (formData.readyToBuild) {
                                            e.currentTarget.style.transform = 'translateY(-2px)';
                                            e.currentTarget.style.boxShadow = '0 15px 40px rgba(0, 255, 136, 0.4)';
                                        }
                                    }}
                                    onMouseOut={(e) => {
                                        if (formData.readyToBuild) {
                                            e.currentTarget.style.transform = 'translateY(0)';
                                            e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 255, 136, 0.3)';
                                        }
                                    }}
                                >
                                    Submit Memorandum
                                </button>
                                <p style={{
                                    textAlign: 'center',
                                    fontSize: '0.8rem',
                                    color: 'var(--color-text-muted)',
                                    marginTop: '1rem',
                                    opacity: 0.7
                                }}>
                                    By submitting this form, you agree to our <a href="/legal" target="_blank" style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>Privacy Policy & Terms</a>.
                                </p>
                            </div>

                            <div style={{
                                marginTop: '2rem',
                                padding: '1.5rem',
                                background: 'rgba(0, 255, 136, 0.05)',
                                borderRadius: '16px',
                                border: '1px solid rgba(0, 255, 136, 0.1)',
                                textAlign: 'center'
                            }}>
                                <p style={{
                                    margin: 0,
                                    color: 'var(--color-text-muted)',
                                    fontSize: '0.9rem',
                                    lineHeight: '1.6',
                                    fontStyle: 'italic'
                                }}>
                                    By submitting a memorandum, you help move Juvantia from concept to a real, physical technopark.
                                </p>
                            </div>
                        </form>
                    )}
                </div>
            </div>

            <style>
                {`
                    @keyframes shimmer {
                        0% { transform: translateX(-100%); }
                        100% { transform: translateX(100%); }
                    }

                    input::placeholder,
                    textarea::placeholder {
                        color: rgba(139, 168, 154, 0.5);
                    }
                `}
            </style>
        </div>
    );
};

export default RobulusRegister;
