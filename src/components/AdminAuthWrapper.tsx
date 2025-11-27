import React, { useEffect, useState } from 'react';

interface AdminAuthWrapperProps {
    children: React.ReactNode;
}

export const AdminAuthWrapper: React.FC<AdminAuthWrapperProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [accessCode, setAccessCode] = useState('');
    const [authError, setAuthError] = useState('');
    const [loading, setLoading] = useState(true);

    const checkAuth = () => {
        const storedCode = localStorage.getItem('admin_secret');
        if (storedCode) {
            validateCode(storedCode);
        } else {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    const validateCode = async (secret: string) => {
        setLoading(true);
        try {
            // Test the code against a protected endpoint
            const response = await fetch('http://localhost:3001/api/memorandums', {
                headers: {
                    'x-admin-secret': secret
                }
            });

            if (response.status === 403) {
                setAuthError('Invalid Access Code');
                setIsAuthenticated(false);
                localStorage.removeItem('admin_secret');
            } else {
                setIsAuthenticated(true);
                setAuthError('');
            }
        } catch (error) {
            console.error('Failed to validate access code', error);
            setAuthError('Connection error');
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        localStorage.setItem('admin_secret', accessCode);
        validateCode(accessCode);
    };

    const handleLogout = () => {
        localStorage.removeItem('admin_secret');
        setIsAuthenticated(false);
        setAccessCode('');
        window.location.reload(); // Reset state completely
    };

    if (loading) {
        return (
            <div style={{
                minHeight: '100vh',
                background: '#0a0a0a',
                color: '#e0e0e0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <div>Loading...</div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <div style={{
                minHeight: '100vh',
                background: '#0a0a0a',
                color: '#e0e0e0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column'
            }}>
                <div style={{
                    background: 'rgba(20, 20, 20, 0.9)',
                    padding: '2rem',
                    borderRadius: '8px',
                    border: '1px solid #333',
                    width: '100%',
                    maxWidth: '400px',
                    textAlign: 'center'
                }}>
                    <h2 style={{ marginBottom: '1.5rem', color: '#ff4d4d' }}>Restricted Access</h2>
                    <form onSubmit={handleLogin}>
                        <input
                            type="password"
                            value={accessCode}
                            onChange={(e) => setAccessCode(e.target.value)}
                            placeholder="Enter Access Code"
                            autoFocus
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                marginBottom: '1rem',
                                background: '#1a1a1a',
                                border: '1px solid #333',
                                color: 'white',
                                borderRadius: '4px',
                                fontSize: '1rem'
                            }}
                        />
                        {authError && (
                            <div style={{ color: '#f44336', marginBottom: '1rem', fontSize: '0.9rem' }}>
                                {authError}
                            </div>
                        )}
                        <button
                            type="submit"
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                background: '#8b0000',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                fontSize: '1rem',
                                fontWeight: 'bold'
                            }}
                        >
                            Unlock
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div style={{
                position: 'fixed',
                top: '1rem',
                right: '1rem',
                zIndex: 9999
            }}>
                <button
                    onClick={handleLogout}
                    style={{
                        padding: '0.5rem 1rem',
                        background: 'rgba(20, 20, 20, 0.9)',
                        border: '1px solid #333',
                        color: '#888',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '0.9rem'
                    }}
                >
                    🔒 Lock System
                </button>
            </div>
            {children}
        </div>
    );
};
