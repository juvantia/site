import React, { useState, useEffect } from 'react';

const RobulusRegister: React.FC = () => {
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

    useEffect(() => {
        setIsVisible(true);
        fetch('http://localhost:3001/api/memorandums/count')
            .then(res => res.json())
            .then(data => setMemorandumCount(data.count))
            .catch(err => console.error('Failed to fetch count', err));
    }, []);

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
            const response = await fetch('http://localhost:3001/api/memorandums', {
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

    const target = 1000;
    const progress = Math.min((memorandumCount / target) * 100, 100);

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
                            src="/images/ROBULUS.png"
                            alt="Robulus"
                            style={{
                                maxWidth: '450px',
                                width: '100%',
                                height: 'auto',
                                borderRadius: '24px',
                                boxShadow: '0 20px 60px rgba(212, 175, 55, 0.3), 0 0 100px rgba(212, 175, 55, 0.1)',
                                transform: 'translateZ(0)',
                                transition: 'transform 0.3s ease',
                            }}
                            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02) translateZ(0)'}
                            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1) translateZ(0)'}
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
                        background: 'linear-gradient(135deg, var(--color-text) 0%, var(--color-accent) 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        fontWeight: 300,
                        letterSpacing: '-0.01em'
                    }}>
                        Juvantia will occupy real land when it receives 1000 memorandums for sending the required Robuli.
                        <br />
                        <span style={{
                            fontSize: '1.2rem',
                            background: 'linear-gradient(135deg, var(--color-accent) 0%, var(--color-primary) 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            fontWeight: 500
                        }}>
                            Join the movement to bring Juvantia to the physical world.
                        </span>
                    </p>
                </div>

                {/* Steps Section */}
                <div style={{ marginBottom: '6rem' }}>
                    <h2 style={{
                        textAlign: 'center',
                        marginBottom: '3rem',
                        fontSize: '2.5rem',
                        fontWeight: 300,
                        letterSpacing: '-0.02em',
                        background: 'linear-gradient(135deg, var(--color-accent) 0%, var(--color-text) 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}>
                        How to Participate
                    </h2>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '2rem'
                    }}>
                        {[
                            {
                                title: "Read Constitution",
                                text: (
                                    <span>
                                        Read and agree with{' '}
                                        <a
                                            href="https://tabularium.juvantia.org/lex/constitutio"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{
                                                color: 'var(--color-accent)',
                                                textDecoration: 'none',
                                                borderBottom: '1px solid var(--color-accent)',
                                                transition: 'all 0.3s ease'
                                            }}
                                        >
                                            Juvantia Constitution
                                        </a>
                                    </span>
                                ),
                                icon: "📜"
                            },
                            {
                                title: "Create Robulus",
                                text: (
                                    <span>
                                        Build on ESP32 with camera,{' '}
                                        <a
                                            href="https://tabylarium.juvantia.org/corpus/robulus"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{
                                                color: 'var(--color-accent)',
                                                textDecoration: 'none',
                                                borderBottom: '1px solid var(--color-accent)',
                                                transition: 'all 0.3s ease'
                                            }}
                                        >
                                            see specifications
                                        </a>
                                    </span>
                                ),
                                icon: "🤖"
                            },
                            {
                                title: "Install Firmware",
                                text: (
                                    <span>
                                        From{' '}
                                        <a
                                            href="https://github.com/juvantia"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{
                                                color: 'var(--color-accent)',
                                                textDecoration: 'none',
                                                borderBottom: '1px solid var(--color-accent)',
                                                transition: 'all 0.3s ease'
                                            }}
                                        >
                                            Juvantia GitHub
                                        </a>
                                    </span>
                                ),
                                icon: "⚙️"
                            },
                            { title: "Get Citizenship", text: "Register on juvantia.org", icon: "🏛️" },
                            { title: "Send by Parcel", text: "To Europe (Location TBD)", icon: "📦" },
                            { title: "Install Client", text: "For managing your Robulus (Windows initially)", icon: "💻" }
                        ].map((step, index) => (
                            <div
                                key={index}
                                style={{
                                    background: 'rgba(255, 255, 255, 0.02)',
                                    backdropFilter: 'blur(10px)',
                                    padding: '2.5rem',
                                    borderRadius: '24px',
                                    border: '1px solid rgba(212, 175, 55, 0.15)',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                    cursor: 'default'
                                }}
                                onMouseOver={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-8px)';
                                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
                                    e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.4)';
                                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(212, 175, 55, 0.2)';
                                }}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
                                    e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.15)';
                                    e.currentTarget.style.boxShadow = 'none';
                                }}
                            >
                                <div style={{
                                    position: 'absolute',
                                    top: 0,
                                    right: 0,
                                    width: '150px',
                                    height: '150px',
                                    background: 'radial-gradient(circle, rgba(212, 175, 55, 0.1) 0%, transparent 70%)',
                                    pointerEvents: 'none'
                                }} />

                                <div style={{
                                    fontSize: '3rem',
                                    marginBottom: '1rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1rem'
                                }}>
                                    <span style={{
                                        fontSize: '1.2rem',
                                        fontWeight: 700,
                                        color: 'var(--color-accent)',
                                        background: 'rgba(212, 175, 55, 0.1)',
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '12px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        {index + 1}
                                    </span>
                                    <span>{step.icon}</span>
                                </div>
                                <h3 style={{
                                    fontWeight: 600,
                                    marginBottom: '0.75rem',
                                    color: 'var(--color-text)',
                                    fontSize: '1.4rem',
                                    letterSpacing: '-0.01em'
                                }}>
                                    {step.title}
                                </h3>
                                <p style={{
                                    fontSize: '1rem',
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

                {/* Progress Section */}
                <div style={{
                    marginBottom: '6rem',
                    background: 'rgba(255, 255, 255, 0.02)',
                    backdropFilter: 'blur(20px)',
                    padding: '3rem',
                    borderRadius: '32px',
                    border: '1px solid rgba(212, 175, 55, 0.2)',
                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
                }}>
                    <h2 style={{
                        marginBottom: '2rem',
                        textAlign: 'center',
                        fontSize: '2rem',
                        fontWeight: 300,
                        letterSpacing: '-0.02em',
                        background: 'linear-gradient(135deg, var(--color-accent) 0%, var(--color-text) 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}>
                        Progress to Land Occupation
                    </h2>
                    <div style={{
                        background: 'rgba(0, 0, 0, 0.3)',
                        height: '40px',
                        borderRadius: '20px',
                        overflow: 'hidden',
                        position: 'relative',
                        border: '1px solid rgba(212, 175, 55, 0.2)'
                    }}>
                        <div style={{
                            width: `${progress}%`,
                            background: 'linear-gradient(90deg, var(--color-primary) 0%, var(--color-accent) 100%)',
                            height: '100%',
                            transition: 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)',
                            position: 'relative',
                            boxShadow: '0 0 20px rgba(212, 175, 55, 0.5)'
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
                            fontWeight: 700,
                            fontSize: '1.1rem',
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
                        fontSize: '0.9rem',
                        color: 'var(--color-text-muted)'
                    }}>
                        <span>Started</span>
                        <span>{progress.toFixed(1)}% Complete</span>
                    </div>
                </div>

                {/* Memorandum Form */}
                <div style={{
                    background: 'rgba(255, 255, 255, 0.02)',
                    backdropFilter: 'blur(20px)',
                    padding: '4rem',
                    borderRadius: '32px',
                    border: '1px solid rgba(212, 175, 55, 0.2)',
                    maxWidth: '900px',
                    margin: '0 auto',
                    boxShadow: '0 30px 80px rgba(0, 0, 0, 0.4)'
                }}>
                    <h2 style={{
                        textAlign: 'center',
                        marginBottom: '1rem',
                        fontSize: '2.5rem',
                        fontWeight: 300,
                        letterSpacing: '-0.02em',
                        background: 'linear-gradient(135deg, var(--color-accent) 0%, var(--color-text) 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}>
                        Memorandum of Intent
                    </h2>
                    <p style={{
                        textAlign: 'center',
                        marginBottom: '3rem',
                        color: 'var(--color-text-muted)',
                        fontSize: '1.1rem',
                        lineHeight: '1.8',
                        maxWidth: '700px',
                        margin: '0 auto 3rem'
                    }}>
                        We count only applications with confirmed experience or a concrete plan for building a Robulus.
                        Actual shipping will be possible only after electricity and wifi are provided to the selected territory.
                    </p>

                    {submitted ? (
                        <div style={{
                            textAlign: 'center',
                            padding: '3rem',
                            background: 'rgba(76, 175, 80, 0.1)',
                            borderRadius: '20px',
                            border: '1px solid rgba(76, 175, 80, 0.3)'
                        }}>
                            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✓</div>
                            <div style={{
                                color: '#4caf50',
                                fontSize: '1.5rem',
                                fontWeight: 500
                            }}>
                                Thank you! Your memorandum has been received.
                            </div>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            <div>
                                <label style={{
                                    display: 'block',
                                    marginBottom: '0.75rem',
                                    fontSize: '0.9rem',
                                    fontWeight: 500,
                                    color: 'var(--color-accent)',
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
                                        padding: '1rem 1.5rem',
                                        background: 'rgba(255, 255, 255, 0.05)',
                                        border: '1px solid rgba(212, 175, 55, 0.2)',
                                        color: 'var(--color-text)',
                                        borderRadius: '12px',
                                        fontSize: '1.1rem',
                                        transition: 'all 0.3s ease',
                                        outline: 'none'
                                    }}
                                    onFocus={(e) => {
                                        e.currentTarget.style.borderColor = 'var(--color-accent)';
                                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                                    }}
                                    onBlur={(e) => {
                                        e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.2)';
                                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                                    }}
                                />
                            </div>
                            <div>
                                <label style={{
                                    display: 'block',
                                    marginBottom: '0.75rem',
                                    fontSize: '0.9rem',
                                    fontWeight: 500,
                                    color: 'var(--color-accent)',
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
                                        padding: '1rem 1.5rem',
                                        background: 'rgba(255, 255, 255, 0.05)',
                                        border: '1px solid rgba(212, 175, 55, 0.2)',
                                        color: 'var(--color-text)',
                                        borderRadius: '12px',
                                        fontSize: '1.1rem',
                                        transition: 'all 0.3s ease',
                                        outline: 'none'
                                    }}
                                    onFocus={(e) => {
                                        e.currentTarget.style.borderColor = 'var(--color-accent)';
                                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                                    }}
                                    onBlur={(e) => {
                                        e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.2)';
                                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                                    }}
                                />
                            </div>
                            <div>
                                <label style={{
                                    display: 'block',
                                    marginBottom: '0.75rem',
                                    fontSize: '0.9rem',
                                    fontWeight: 500,
                                    color: 'var(--color-accent)',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.1em'
                                }}>
                                    Relevant Experience
                                </label>
                                <textarea
                                    name="experience"
                                    value={formData.experience}
                                    onChange={handleChange}
                                    rows={5}
                                    placeholder="YouTube, Forum, GitHub links, etc."
                                    style={{
                                        width: '100%',
                                        padding: '1rem 1.5rem',
                                        background: 'rgba(255, 255, 255, 0.05)',
                                        border: '1px solid rgba(212, 175, 55, 0.2)',
                                        color: 'var(--color-text)',
                                        borderRadius: '12px',
                                        fontSize: '1.1rem',
                                        transition: 'all 0.3s ease',
                                        outline: 'none',
                                        resize: 'vertical',
                                        fontFamily: 'inherit',
                                        lineHeight: '1.6'
                                    }}
                                    onFocus={(e) => {
                                        e.currentTarget.style.borderColor = 'var(--color-accent)';
                                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                                    }}
                                    onBlur={(e) => {
                                        e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.2)';
                                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                                    }}
                                />
                            </div>
                            <div>
                                <label style={{
                                    display: 'block',
                                    marginBottom: '0.75rem',
                                    fontSize: '0.9rem',
                                    fontWeight: 500,
                                    color: 'var(--color-accent)',
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
                                        padding: '1.5rem',
                                        background: 'rgba(255, 255, 255, 0.05)',
                                        border: '2px dashed rgba(212, 175, 55, 0.3)',
                                        color: 'var(--color-text)',
                                        borderRadius: '12px',
                                        cursor: formData.photos.length >= 5 ? 'not-allowed' : 'pointer',
                                        transition: 'all 0.3s ease'
                                    }}
                                />
                                {formData.photos.length > 0 && (
                                    <div style={{
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
                                        gap: '1rem',
                                        marginTop: '1rem'
                                    }}>
                                        {formData.photos.map((photo, index) => (
                                            <div key={index} style={{
                                                position: 'relative',
                                                aspectRatio: '1',
                                                borderRadius: '12px',
                                                overflow: 'hidden',
                                                border: '1px solid rgba(212, 175, 55, 0.2)'
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
                                                        top: '8px',
                                                        right: '8px',
                                                        background: 'rgba(244, 67, 54, 0.9)',
                                                        backdropFilter: 'blur(10px)',
                                                        color: '#fff',
                                                        border: 'none',
                                                        borderRadius: '8px',
                                                        width: '32px',
                                                        height: '32px',
                                                        cursor: 'pointer',
                                                        fontWeight: 'bold',
                                                        fontSize: '1.2rem',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        transition: 'all 0.2s ease'
                                                    }}
                                                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                                                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
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
                                    background: 'rgba(244, 67, 54, 0.1)',
                                    border: '1px solid rgba(244, 67, 54, 0.3)',
                                    borderRadius: '12px',
                                    color: '#ff6b6b',
                                    textAlign: 'center'
                                }}>
                                    {error}
                                </div>
                            )}

                            <div style={{
                                paddingTop: '2rem',
                                borderTop: '1px solid rgba(212, 175, 55, 0.2)',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '1.5rem'
                            }}>
                                <label style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1rem',
                                    cursor: 'pointer',
                                    padding: '1.5rem',
                                    background: 'rgba(255, 255, 255, 0.03)',
                                    borderRadius: '12px',
                                    border: '1px solid rgba(212, 175, 55, 0.2)',
                                    transition: 'all 0.3s ease'
                                }}
                                    onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'}
                                    onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)'}
                                >
                                    <input
                                        type="checkbox"
                                        name="readyToBuild"
                                        checked={formData.readyToBuild}
                                        onChange={handleChange}
                                        id="readyToBuild"
                                        style={{
                                            width: '24px',
                                            height: '24px',
                                            cursor: 'pointer',
                                            accentColor: 'var(--color-accent)'
                                        }}
                                    />
                                    <span style={{
                                        fontSize: '1.05rem',
                                        color: 'var(--color-text)',
                                        flex: 1
                                    }}>
                                        I am ready to build and send a Robulus within 6-8 months
                                    </span>
                                </label>

                                <button
                                    type="submit"
                                    disabled={!formData.readyToBuild}
                                    style={{
                                        padding: '1.5rem 3rem',
                                        background: formData.readyToBuild
                                            ? 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%)'
                                            : 'rgba(100, 100, 100, 0.3)',
                                        color: '#fff',
                                        border: 'none',
                                        borderRadius: '16px',
                                        fontSize: '1.2rem',
                                        fontWeight: 600,
                                        cursor: formData.readyToBuild ? 'pointer' : 'not-allowed',
                                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                        letterSpacing: '0.05em',
                                        textTransform: 'uppercase',
                                        boxShadow: formData.readyToBuild
                                            ? '0 10px 30px rgba(212, 175, 55, 0.3)'
                                            : 'none',
                                        position: 'relative',
                                        overflow: 'hidden'
                                    }}
                                    onMouseOver={(e) => {
                                        if (formData.readyToBuild) {
                                            e.currentTarget.style.transform = 'translateY(-2px)';
                                            e.currentTarget.style.boxShadow = '0 15px 40px rgba(212, 175, 55, 0.4)';
                                        }
                                    }}
                                    onMouseOut={(e) => {
                                        if (formData.readyToBuild) {
                                            e.currentTarget.style.transform = 'translateY(0)';
                                            e.currentTarget.style.boxShadow = '0 10px 30px rgba(212, 175, 55, 0.3)';
                                        }
                                    }}
                                >
                                    <span style={{ position: 'relative', zIndex: 1 }}>Submit Memorandum</span>
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>

            <style>
                {`
                    @keyframes float {
                        0%, 100% { transform: translate(0, 0) rotate(0deg); }
                        33% { transform: translate(30px, -30px) rotate(5deg); }
                        66% { transform: translate(-20px, 20px) rotate(-5deg); }
                    }
                    
                    @keyframes shimmer {
                        0% { transform: translateX(-100%); }
                        100% { transform: translateX(100%); }
                    }

                    input::placeholder,
                    textarea::placeholder {
                        color: rgba(224, 224, 224, 0.3);
                    }
                `}
            </style>
        </div>
    );
};

export default RobulusRegister;
