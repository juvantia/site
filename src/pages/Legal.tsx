import React from 'react';
import CursorGlow from '../components/CursorGlow';

const Legal: React.FC = () => {
    return (
        <div style={{
            minHeight: '100vh',
            background: 'var(--color-bg)',
            position: 'relative',
            padding: '6rem 2rem 4rem',
            color: 'var(--color-text)'
        }}>
            <CursorGlow size={350} opacity={0.12} />

            <div style={{
                maxWidth: '800px',
                margin: '0 auto',
                position: 'relative',
                zIndex: 1
            }}>
                <h1 style={{
                    fontSize: 'clamp(2rem, 4vw, 3rem)',
                    marginBottom: '2rem',
                    background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textAlign: 'center'
                }}>
                    Legal Information
                </h1>

                <div style={{
                    background: 'rgba(0, 0, 0, 0.2)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(0, 255, 136, 0.1)',
                    borderRadius: '24px',
                    padding: '2rem',
                    marginBottom: '2rem'
                }}>
                    <h2 style={{ color: 'var(--color-primary)', marginBottom: '1rem', fontSize: '1.5rem' }}>Privacy Policy</h2>
                    <p style={{ marginBottom: '1rem', lineHeight: '1.6', color: 'var(--color-text-muted)' }}>
                        <strong>Last updated: December 2025</strong>
                    </p>
                    <p style={{ marginBottom: '1rem', lineHeight: '1.6', color: 'var(--color-text-muted)' }}>
                        At Civitas Juvantia Digitalis, we believe in minimizing data collection.
                        We do not use third-party tracking cookies, analytics services, or advertising pixels.
                        This means we do not track your behavior across the internet.
                    </p>
                    <p style={{ marginBottom: '1rem', lineHeight: '1.6', color: 'var(--color-text-muted)' }}>
                        <strong>Data we collect:</strong><br />
                        When you submit a Memorandum of Intent or register, we collect the information you explicitly provide:
                        Name, Email, Experience details, and uploaded photos.
                    </p>
                    <p style={{ marginBottom: '1rem', lineHeight: '1.6', color: 'var(--color-text-muted)' }}>
                        <strong>How we use it:</strong><br />
                        We use this data solely to process your application, verify your eligibility for the technopark,
                        and contact you regarding your citizenship status. We do not sell or share your data with third parties.
                    </p>
                </div>

                <div style={{
                    background: 'rgba(0, 0, 0, 0.2)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(0, 255, 136, 0.1)',
                    borderRadius: '24px',
                    padding: '2rem'
                }}>
                    <h2 style={{ color: 'var(--color-primary)', marginBottom: '1rem', fontSize: '1.5rem' }}>Terms of Service</h2>
                    <p style={{ marginBottom: '1rem', lineHeight: '1.6', color: 'var(--color-text-muted)' }}>
                        <strong>1. The Project</strong><br />
                        Juvantia is an experimental robotic technopark project. All timelines (including the 2027 target) are estimates and goals, not guarantees.
                    </p>
                    <p style={{ marginBottom: '1rem', lineHeight: '1.6', color: 'var(--color-text-muted)' }}>
                        <strong>2. Contributions</strong><br />
                        By submitting designs, code, or applications, you agree that you have the right to share them.
                        We respect your intellectual property, but by participating in the "res publica" (public affairs) of Juvantia,
                        you agree to act in accordance with the project's Constitution.
                    </p>
                    <p style={{ marginBottom: '0', lineHeight: '1.6', color: 'var(--color-text-muted)' }}>
                        <strong>3. User Conduct</strong><br />
                        We reserve the right to reject memorandums or revoke digital citizenship for behavior that violates our community standards or the Constitution.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Legal;
