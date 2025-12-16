import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { API_BASE_URL } from '../config/api';
import CursorGlow from '../components/CursorGlow';

// -----------------------------------------------------------------------------
// TYPES
// -----------------------------------------------------------------------------
type LayerType = 'physical' | 'governance' | 'connectivity' | 'digital';

interface Partner {
    name: string;
    logoUrl: string;
    website: string;
}

interface TechItem {
    id: string;
    name: string;
    description: string;
    layer: LayerType;
    color: string;
    partners: Partner[];
    x: number;
    y: number;
    w: number;
    h: number;
}

// -----------------------------------------------------------------------------
// TECH BLOCK - Metro Style (Windows 8)
// -----------------------------------------------------------------------------
const TechBlock: React.FC<{
    item: TechItem;
    onClick: () => void;
    isSelected: boolean;
    isHovered: boolean;
    onHover: (hover: boolean) => void;
}> = ({ item, onClick, isSelected, isHovered, onHover }) => {
    return (
        <motion.div
            onClick={onClick}
            onMouseEnter={() => onHover(true)}
            onMouseLeave={() => onHover(false)}
            draggable={false}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.15 }}
            style={{
                width: '100%',
                height: '100%',
                background: isSelected
                    ? 'linear-gradient(135deg, #00FF88 0%, #00D4FF 100%)'
                    : item.color,
                border: isHovered && !isSelected ? '3px solid #00ff88' : 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
                minHeight: 0
            }}
        >
            <h3 style={{
                margin: 0,
                fontSize: '1em',
                fontWeight: 600,
                textAlign: 'center',
                lineHeight: 1.2,
                padding: '8px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                color: 'white',
                textShadow: '0 2px 4px rgba(0,0,0,0.5)'
            }}>
                {item.name}
            </h3>
        </motion.div>
    );
};

// -----------------------------------------------------------------------------
// COMPONENT
// -----------------------------------------------------------------------------
const Tech: React.FC = () => {
    const ROW_HEIGHT = 20;

    const [items, setItems] = useState<TechItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedItem, setSelectedItem] = useState<TechItem | null>(null);
    const [hoveredId, setHoveredId] = useState<string | null>(null);
    const detailsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/tech-stack`);
                const data = await res.json();
                const normalized = data.map((d: any) => {
                    // Parse partners from textColor field (workaround for backend limitation)
                    let partners: Partner[] = [];
                    try {
                        if (d.textColor && d.textColor.startsWith('[')) {
                            partners = JSON.parse(d.textColor);
                        }
                    } catch (e) {
                        console.warn('Failed to parse partners:', e);
                    }

                    return {
                        id: d.id,
                        name: d.name || 'Untitled',
                        description: d.description || '',
                        layer: d.layer || 'physical',
                        color: d.color || '#333',
                        partners: partners,
                        x: (d.colStart || 1) - 1,
                        y: (d.rowStart || 1) - 1,
                        w: d.gridSpan || 4,
                        h: d.rowSpan || 2
                    };
                });
                console.log('Loaded items with partners:', normalized);
                setItems(normalized);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };
        fetchItems();
    }, []);

    // Scroll to details when item selected
    useEffect(() => {
        if (selectedItem && detailsRef.current) {
            detailsRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }, [selectedItem]);

    if (loading) {
        return (
            <div style={{
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white'
            }}>
                Loading...
            </div>
        );
    }

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)',
            padding: '40px 20px 40px',
            position: 'relative',
            overflow: 'hidden'
        }}>
            <CursorGlow />

            {/* Hide resize handles */}
            <style>{`
                .react-resizable-handle {
                    display: none !important;
                }
            `}</style>

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                style={{ textAlign: 'center', marginBottom: '3rem', position: 'relative', zIndex: 1 }}
            >
                <h1 style={{
                    fontSize: '3rem',
                    fontWeight: 700,
                    background: 'linear-gradient(135deg, #00d4ff 0%, #00ff88 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    marginBottom: '1rem'
                }}>
                    Technology Stack
                </h1>
                <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.7)', maxWidth: '800px', margin: '0 auto', lineHeight: 1.6 }}>
                    Juvantia is designed as a construction kit of cutting-edge technologies, assembled into a single coherent system to create a park that is maximally progressive in results—while remaining realistic, implementable, and grounded in what already exists today.
                </p>
            </motion.div>

            {/* Grid Container */}
            <div
                className="tech-grid-container"
                style={{
                    maxWidth: '1400px',
                    margin: '0 auto 3rem',
                    overflowX: 'auto',
                    position: 'relative',
                    zIndex: 1
                }}
            >
                {/* Disable drag & drop */}
                <style>{`
                    /* Hide scrollbar but keep scroll functionality */
                    .tech-grid-container {
                        scrollbar-width: none; /* Firefox */
                        -ms-overflow-style: none; /* IE and Edge */
                    }
                    .tech-grid-container::-webkit-scrollbar {
                        display: none; /* Chrome, Safari, Opera */
                    }
                    
                    .layout .react-grid-item {
                        user-select: none;
                        -webkit-user-drag: none;
                        cursor: pointer !important;
                        pointer-events: auto !important;
                    }
                    .layout .react-grid-item.react-draggable {
                        cursor: pointer !important;
                    }
                    .layout .react-grid-item.react-draggable.react-draggable-dragging {
                        pointer-events: none !important;
                    }
                    .layout .react-grid-item > .react-resizable-handle {
                        display: none !important;
                        pointer-events: none !important;
                    }
                    .layout .react-grid-item.cssTransforms {
                        transition: none !important;
                    }
                    .layout .react-grid-item * {
                        user-select: none !important;
                        -webkit-user-drag: none !important;
                    }
                `}</style>

                <div style={{ minWidth: 1360, padding: '0 20px' }}>
                    {/* Simple positioned grid - no drag & drop */}
                    <div
                        className="layout"
                        style={{
                            position: 'relative',
                            height: Math.max(...items.map(i => (i.y + i.h) * ROW_HEIGHT)),
                            width: 1360
                        }}
                    >
                        {items.map(item => (
                            <div
                                key={item.id}
                                draggable={false}
                                style={{
                                    position: 'absolute',
                                    left: (item.x / 12) * 100 + '%',
                                    top: item.y * ROW_HEIGHT,
                                    width: (item.w / 12) * 100 + '%',
                                    height: item.h * ROW_HEIGHT,
                                    userSelect: 'none'
                                }}
                            >
                                <TechBlock
                                    item={item}
                                    onClick={() => setSelectedItem(item)}
                                    isSelected={selectedItem?.id === item.id}
                                    isHovered={hoveredId === item.id}
                                    onHover={(hover) => setHoveredId(hover ? item.id : null)}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Details Section Below Grid */}
            <div ref={detailsRef} style={{
                maxWidth: '1200px',
                margin: '0 auto',
                padding: '40px 20px',
                position: 'relative',
                zIndex: 1
            }}>
                {selectedItem ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        style={{
                            position: 'relative',
                            background: '#18181b',
                            border: `2px solid ${selectedItem.color}`,
                            boxShadow: `0 0 40px ${selectedItem.color}44`,
                            padding: '40px',
                            marginBottom: '3rem'
                        }}
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setSelectedItem(null)}
                            style={{
                                position: 'absolute',
                                top: 20,
                                right: 20,
                                background: 'rgba(255,255,255,0.1)',
                                border: 'none',
                                color: 'white',
                                width: 32,
                                height: 32,
                                cursor: 'pointer',
                                fontSize: '1.5rem',
                                lineHeight: 1,
                                zIndex: 10,
                                transition: '0.2s'
                            }}
                            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
                            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                        >
                            ×
                        </button>

                        {/* Header */}
                        <div style={{
                            color: selectedItem.color,
                            fontSize: '0.9rem',
                            fontWeight: 'bold',
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            marginBottom: '1rem',
                            opacity: 0.8
                        }}>
                            {selectedItem.layer}
                        </div>

                        <h2 style={{
                            fontSize: '2.5rem',
                            margin: '0 0 1.5rem',
                            color: 'white',
                            lineHeight: 1.2
                        }}>
                            {selectedItem.name}
                        </h2>

                        {/* Partners - horizontal row */}
                        {selectedItem.partners.length > 0 && (
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 16,
                                marginBottom: '2rem'
                            }}>
                                <div style={{
                                    color: '#71717a',
                                    textTransform: 'uppercase',
                                    fontSize: '0.85rem',
                                    letterSpacing: '0.1em',
                                    fontWeight: 600,
                                    minWidth: 80
                                }}>
                                    Partners:
                                </div>
                                <div style={{
                                    display: 'flex',
                                    gap: 12,
                                    flexWrap: 'wrap',
                                    flex: 1
                                }}>
                                    {selectedItem.partners.map((p, idx) => (
                                        <a
                                            key={idx}
                                            href={p.website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 12,
                                                background: '#27272a',
                                                padding: '8px 16px',
                                                textDecoration: 'none',
                                                color: 'white',
                                                transition: '0.2s',
                                                borderRadius: 4
                                            }}
                                            onMouseEnter={e => e.currentTarget.style.background = '#3f3f46'}
                                            onMouseLeave={e => e.currentTarget.style.background = '#27272a'}
                                        >
                                            <div style={{
                                                height: 32,
                                                width: 'auto',
                                                overflow: 'hidden',
                                                flexShrink: 0,
                                                display: 'flex',
                                                alignItems: 'center'
                                            }}>
                                                {p.logoUrl && <img src={p.logoUrl} alt="" style={{ height: '100%', width: 'auto', objectFit: 'contain' }} />}
                                            </div>
                                            <span style={{ fontWeight: 500 }}>{p.name}</span>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Description - with paragraph breaks */}
                        <div style={{
                            fontSize: '1.1rem',
                            lineHeight: 1.8,
                            color: '#d4d4d8'
                        }}>
                            {(selectedItem.description || "No description provided.").split('\n\n').map((paragraph, idx) => (
                                <p key={idx} style={{ margin: idx === 0 ? '0 0 1rem' : '0 0 1rem' }}>
                                    {paragraph}
                                </p>
                            ))}
                        </div>
                    </motion.div>
                ) : (
                    <div style={{
                        textAlign: 'center',
                        padding: '60px 20px',
                        color: 'rgba(255,255,255,0.3)',
                        fontSize: '1.2rem'
                    }}>
                        Select a technology to view details
                    </div>
                )}
            </div>
        </div>
    );
};

export default Tech;
