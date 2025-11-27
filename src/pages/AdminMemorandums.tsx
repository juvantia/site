import React, { useEffect, useState } from 'react';

interface Memorandum {
    id: number;
    createdAt: string;
    name: string;
    contact: string;
    readyToBuild: boolean;
    experience: string;
    photos: string | null;
    status: string;
}

const AdminMemorandums: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [accessCode, setAccessCode] = useState('');
    const [authError, setAuthError] = useState('');

    const [memorandums, setMemorandums] = useState<Memorandum[]>([]);
    const [filter, setFilter] = useState<string>('ALL');
    const [loading, setLoading] = useState(true);

    const checkAuth = () => {
        const storedCode = localStorage.getItem('admin_secret');
        if (storedCode) {
            setIsAuthenticated(true);
            fetchMemorandums(storedCode);
        } else {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, we might validate against the server first, 
        // but here we just save it and try to use it.
        localStorage.setItem('admin_secret', accessCode);
        setIsAuthenticated(true);
        fetchMemorandums(accessCode);
    };

    const handleLogout = () => {
        localStorage.removeItem('admin_secret');
        setIsAuthenticated(false);
        setAccessCode('');
        setMemorandums([]);
    };

    const fetchMemorandums = async (secret: string) => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:3001/api/memorandums', {
                headers: {
                    'x-admin-secret': secret
                }
            });

            if (response.status === 403) {
                setAuthError('Invalid Access Code');
                setIsAuthenticated(false);
                localStorage.removeItem('admin_secret');
                return;
            }

            const data = await response.json();
            setMemorandums(data);
            setAuthError('');
        } catch (error) {
            console.error('Failed to fetch memorandums', error);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id: number, newStatus: string) => {
        const secret = localStorage.getItem('admin_secret');
        if (!secret) return;

        try {
            await fetch(`http://localhost:3001/api/memorandums/${id}/status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'x-admin-secret': secret
                },
                body: JSON.stringify({ status: newStatus })
            });
            fetchMemorandums(secret);
        } catch (error) {
            console.error('Failed to update status', error);
        }
    };

    const deleteMemorandum = async (id: number) => {
        const secret = localStorage.getItem('admin_secret');
        if (!secret) return;

        if (!confirm('Are you sure you want to delete this memorandum?')) return;
        try {
            await fetch(`http://localhost:3001/api/memorandums/${id}`, {
                method: 'DELETE',
                headers: {
                    'x-admin-secret': secret
                }
            });
            fetchMemorandums(secret);
        } catch (error) {
            console.error('Failed to delete memorandum', error);
        }
    };

    const filteredMemorandums = filter === 'ALL'
        ? memorandums
        : memorandums.filter(m => m.status === filter);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'PENDING': return '#ffa500';
            case 'APPROVED': return '#4caf50';
            case 'REJECTED': return '#f44336';
            case 'COMPLETED': return '#2196f3';
            default: return '#999';
        }
    };

    const statusCounts = {
        ALL: memorandums.length,
        PENDING: memorandums.filter(m => m.status === 'PENDING').length,
        APPROVED: memorandums.filter(m => m.status === 'APPROVED').length,
        REJECTED: memorandums.filter(m => m.status === 'REJECTED').length,
        COMPLETED: memorandums.filter(m => m.status === 'COMPLETED').length
    };

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
        <div style={{
            padding: '2rem',
            minHeight: '100vh',
            background: '#0a0a0a',
            color: '#e0e0e0'
        }}>
            <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h1 style={{
                        margin: 0,
                        background: 'linear-gradient(45deg, #ff4d4d, #8b0000)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        fontSize: '2.5rem'
                    }}>
                        Robulus Memorandums
                    </h1>
                    <button
                        onClick={handleLogout}
                        style={{
                            padding: '0.5rem 1rem',
                            background: 'transparent',
                            border: '1px solid #333',
                            color: '#888',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Lock System
                    </button>
                </div>

                {/* Stats Bar */}
                <div style={{
                    display: 'flex',
                    gap: '1rem',
                    marginBottom: '2rem',
                    flexWrap: 'wrap'
                }}>
                    {Object.entries(statusCounts).map(([status, count]) => (
                        <button
                            key={status}
                            onClick={() => setFilter(status)}
                            style={{
                                padding: '1rem 1.5rem',
                                background: filter === status ? '#8b0000' : 'rgba(255, 255, 255, 0.05)',
                                border: '1px solid rgba(139, 0, 0, 0.5)',
                                color: '#fff',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                transition: 'all 0.3s'
                            }}
                        >
                            <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{count}</div>
                            <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>{status}</div>
                        </button>
                    ))}
                </div>

                {/* Memorandums List */}
                {loading ? (
                    <div style={{ textAlign: 'center', padding: '2rem' }}>Loading...</div>
                ) : filteredMemorandums.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '2rem', opacity: 0.5 }}>
                        No memorandums found
                    </div>
                ) : (
                    <div style={{ display: 'grid', gap: '1rem' }}>
                        {filteredMemorandums.map(memo => (
                            <div
                                key={memo.id}
                                style={{
                                    background: 'rgba(20, 20, 20, 0.9)',
                                    border: `1px solid ${getStatusColor(memo.status)}`,
                                    borderRadius: '8px',
                                    padding: '1.5rem',
                                    transition: 'transform 0.2s',
                                }}
                            >
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'flex-start',
                                    marginBottom: '1rem'
                                }}>
                                    <div>
                                        <h3 style={{
                                            margin: 0,
                                            marginBottom: '0.5rem',
                                            color: '#ff4d4d'
                                        }}>
                                            {memo.name}
                                        </h3>
                                        <div style={{
                                            fontSize: '0.8rem',
                                            opacity: 0.6
                                        }}>
                                            {new Date(memo.createdAt).toLocaleString()} • ID: {memo.id}
                                        </div>
                                    </div>
                                    <div style={{
                                        padding: '0.5rem 1rem',
                                        background: getStatusColor(memo.status),
                                        borderRadius: '4px',
                                        fontSize: '0.8rem',
                                        fontWeight: 'bold'
                                    }}>
                                        {memo.status}
                                    </div>
                                </div>

                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                                    gap: '1rem',
                                    marginBottom: '1rem'
                                }}>
                                    <div>
                                        <strong>Contact:</strong> {memo.contact}
                                    </div>
                                    <div>
                                        <strong>Ready to Build:</strong> {memo.readyToBuild ? '✅ Yes' : '❌ No'}
                                    </div>
                                </div>

                                {memo.experience && (
                                    <div style={{ marginBottom: '1rem' }}>
                                        <strong>Experience:</strong>
                                        <div style={{
                                            marginTop: '0.5rem',
                                            padding: '0.75rem',
                                            background: 'rgba(0, 0, 0, 0.3)',
                                            borderRadius: '4px',
                                            whiteSpace: 'pre-wrap'
                                        }}>
                                            {memo.experience}
                                        </div>
                                    </div>
                                )}

                                {memo.photos && (() => {
                                    try {
                                        const photoUrls = JSON.parse(memo.photos);
                                        return photoUrls.length > 0 && (
                                            <div style={{ marginBottom: '1rem' }}>
                                                <strong>Photos ({photoUrls.length}):</strong>
                                                <div style={{
                                                    display: 'flex',
                                                    gap: '0.5rem',
                                                    marginTop: '0.5rem',
                                                    flexWrap: 'wrap'
                                                }}>
                                                    {photoUrls.map((photo: string, index: number) => (
                                                        <img
                                                            key={index}
                                                            src={photo}
                                                            alt={`Prototype ${index + 1}`}
                                                            style={{
                                                                width: '120px',
                                                                height: '120px',
                                                                objectFit: 'cover',
                                                                borderRadius: '4px',
                                                                border: '1px solid #444',
                                                                cursor: 'pointer'
                                                            }}
                                                            onClick={() => window.open(photo, '_blank')}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        );
                                    } catch {
                                        return null;
                                    }
                                })()}

                                <div style={{
                                    display: 'flex',
                                    gap: '0.5rem',
                                    marginTop: '1rem',
                                    paddingTop: '1rem',
                                    borderTop: '1px solid rgba(255, 255, 255, 0.1)'
                                }}>
                                    <button
                                        onClick={() => updateStatus(memo.id, 'APPROVED')}
                                        style={{
                                            padding: '0.5rem 1rem',
                                            background: '#4caf50',
                                            color: '#fff',
                                            border: 'none',
                                            borderRadius: '4px',
                                            cursor: 'pointer',
                                            fontSize: '0.9rem'
                                        }}
                                    >
                                        Approve
                                    </button>
                                    <button
                                        onClick={() => updateStatus(memo.id, 'REJECTED')}
                                        style={{
                                            padding: '0.5rem 1rem',
                                            background: '#f44336',
                                            color: '#fff',
                                            border: 'none',
                                            borderRadius: '4px',
                                            cursor: 'pointer',
                                            fontSize: '0.9rem'
                                        }}
                                    >
                                        Reject
                                    </button>
                                    <button
                                        onClick={() => updateStatus(memo.id, 'COMPLETED')}
                                        style={{
                                            padding: '0.5rem 1rem',
                                            background: '#2196f3',
                                            color: '#fff',
                                            border: 'none',
                                            borderRadius: '4px',
                                            cursor: 'pointer',
                                            fontSize: '0.9rem'
                                        }}
                                    >
                                        Complete
                                    </button>
                                    <button
                                        onClick={() => updateStatus(memo.id, 'PENDING')}
                                        style={{
                                            padding: '0.5rem 1rem',
                                            background: '#ffa500',
                                            color: '#fff',
                                            border: 'none',
                                            borderRadius: '4px',
                                            cursor: 'pointer',
                                            fontSize: '0.9rem'
                                        }}
                                    >
                                        Reset
                                    </button>
                                    <div style={{ flex: 1 }} />
                                    <button
                                        onClick={() => deleteMemorandum(memo.id)}
                                        style={{
                                            padding: '0.5rem 1rem',
                                            background: '#800',
                                            color: '#fff',
                                            border: 'none',
                                            borderRadius: '4px',
                                            cursor: 'pointer',
                                            fontSize: '0.9rem'
                                        }}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminMemorandums;
