import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config/api';
import CursorGlow from '../components/CursorGlow';
import { AdminAuthWrapper } from '../components/AdminAuthWrapper';
import * as ReactGridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

// RGL Import - Back to Responsive for working resize
const getResponsiveGridLayout = () => {
    const rgl = ReactGridLayout as any;
    return rgl.Responsive || rgl.ResponsiveGridLayout || rgl.default?.Responsive || rgl.default;
};

const ResponsiveGridLayout = getResponsiveGridLayout();

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

    // Grid Props
    x: number;
    y: number;
    w: number;
    h: number;
}

// -----------------------------------------------------------------------------
// COMPONENT
// -----------------------------------------------------------------------------
const AdminTechStackContent: React.FC = () => {
    // Canvas config
    const ROW_HEIGHT = 20; // Very thin tiles (≈1.25rem)
    // const COLS = 12; // Unused, defined in Grid props

    const [items, setItems] = useState<TechItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [layoutChanged, setLayoutChanged] = useState(false);

    // Editor
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<TechItem | null>(null);

    // Admin Secret
    const getAdminSecret = () => localStorage.getItem('admin_secret') || '';

    useEffect(() => {
        fetchItems();
    }, []);

    // Physics Engine: Gravity Down
    const MAX_ROWS = 20; // Define floor

    const applyGravityDown = (currentLayout: TechItem[]) => {
        // Sort items by Y descending (bottom items first)
        const sorted = [...currentLayout].sort((a, b) => (b.y + b.h) - (a.y + a.h));

        const settled: TechItem[] = [];

        // Simple collision detection
        const collides = (item: TechItem, candidates: TechItem[]) => {
            return candidates.some(c => {
                if (c.id === item.id) return false;
                // Check X overlap
                if (item.x + item.w <= c.x || item.x >= c.x + c.w) return false;
                // Check Y overlap
                if (item.y + item.h <= c.y || item.y >= c.y + c.h) return false;
                return true;
            });
        };

        sorted.forEach(item => {
            let newY = MAX_ROWS - item.h; // Start at floor

            // Move up until no collision
            while (newY >= 0) {
                const candidate = { ...item, y: newY };
                // Check collision with already settled items (which are below or at same level)
                if (!collides(candidate, settled)) {
                    break;
                }
                newY--;
            }

            // Safety: ensure >= 0
            if (newY < 0) newY = 0;

            settled.push({ ...item, y: newY });
        });

        return settled;
    };



    // -------------------------------------------------------------------------
    // API
    // -------------------------------------------------------------------------
    const fetchItems = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/tech-stack`);
            const data = await res.json();
            console.log('Raw data from backend:', data);
            console.log('First item from backend:', data[0]);
            // Map backend data to local structure if needed, or assume loose match
            // Backend likely returns { ...props, colStart, rowStart etc } from previous version.
            // We need to normalize to x,y,w,h.
            const normalized = data.map((d: any) => {
                // Try to parse partners from textColor field (workaround for backend limitation)
                let partners: Partner[] = [];
                try {
                    if (d.textColor && d.textColor.startsWith('[')) {
                        partners = JSON.parse(d.textColor);
                    }
                } catch (e) {
                    console.warn('Failed to parse partners from textColor:', e);
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
                    h: d.rowSpan || 2,
                    // Preserve backend fields for round-trip
                    role: d.role,
                    partner: d.partner,
                    heightRatio: d.heightRatio,
                    displayOrder: d.displayOrder,
                    textColor: d.textColor
                };
            });
            setItems(normalized);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    // Convert rgba to hex format for backend
    const rgbaToHex = (rgba: string): string => {
        // If already hex, return as is
        if (rgba.startsWith('#')) return rgba;

        // Parse rgba(r, g, b, a) format
        const match = rgba.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/);
        if (!match) return rgba; // Return original if can't parse

        const r = parseInt(match[1]);
        const g = parseInt(match[2]);
        const b = parseInt(match[3]);

        return '#' + [r, g, b].map(x => {
            const hex = x.toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        }).join('');
    };

    const saveAll = async () => {
        try {
            console.log('Items before save:', items);
            console.log('First item before save:', items[0]);
            // Convert back to backend expected format if needed, or just save standard
            // We successfully used x,y,w,h in local state. 
            // We'll translate back to colStart/rowStart for compatibility if backend expects it.
            const payload = items.map((i, idx) => ({
                id: i.id,
                name: i.name,
                description: i.description,
                layer: i.layer,
                color: rgbaToHex(i.color),
                partners: i.partners || [],
                // Grid coordinates - translate from frontend x,y,w,h to backend format
                colStart: i.x + 1,
                rowStart: i.y + 1,
                gridSpan: i.w,
                rowSpan: i.h,
                // Required backend fields with defaults
                role: (i as any).role || i.layer || 'Component',
                partner: (i as any).partner || '',
                heightRatio: (i as any).heightRatio || 1,
                displayOrder: (i as any).displayOrder || idx,
                verticalAlign: 'end',
                // Store partners as JSON in textColor (workaround for backend limitation)
                textColor: i.partners && i.partners.length > 0 ? JSON.stringify(i.partners) : null
            }));

            console.log('Sending payload to backend:', payload);
            console.log('First item partners:', payload[0]?.partners);

            // Batch save
            for (const item of payload) {
                await fetch(`${API_BASE_URL}/tech-stack`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'x-admin-secret': getAdminSecret() },
                    body: JSON.stringify(item)
                });
            }
            setLayoutChanged(false);
        } catch (err) {
            alert('Error saving');
        }
    };

    const deleteItem = async (id: string) => {
        if (!confirm('Delete item?')) return;
        try {
            await fetch(`${API_BASE_URL}/tech-stack/${id}`, {
                method: 'DELETE',
                headers: { 'x-admin-secret': getAdminSecret() }
            });
            setItems(prev => prev.filter(i => i.id !== id));
            setIsModalOpen(false);
        } catch (e) {
            alert('Error deleting');
        }
    };

    // -------------------------------------------------------------------------
    // HANDLERS
    // -------------------------------------------------------------------------


    const openCreate = () => {
        setEditingItem({
            id: crypto.randomUUID(),
            name: '',
            description: '',
            layer: 'physical',
            color: '#1a1a1a',
            partners: [],
            x: 0,
            y: 0, // RGL will handle placement
            w: 4,
            h: 3
        });
        setIsModalOpen(true);
    };

    const openEdit = (item: TechItem) => {
        setEditingItem({ ...item });
        setIsModalOpen(true);
    };

    const saveModal = () => {
        if (!editingItem) return;
        console.log('Saving modal item with partners:', editingItem.partners);
        // Update local state
        setItems(prev => {
            const exists = prev.find(i => i.id === editingItem.id);
            if (exists) {
                return prev.map(i => i.id === editingItem.id ? editingItem : i);
            }
            return [...prev, editingItem];
        });
        setLayoutChanged(true);
        setIsModalOpen(false);
    };

    // -------------------------------------------------------------------------
    // RENDER
    // -------------------------------------------------------------------------
    if (loading) return <div style={{ color: 'white', padding: 50 }}>Loading...</div>;

    // Standard Layout (No Mirroring)
    return (
        <div style={{ minHeight: '100vh', background: '#09090b', padding: '20px', color: '#e5e7eb' }}>
            <CursorGlow />

            {/* --- HEADER --- */}
            <div style={{ maxWidth: 1400, margin: '0 auto 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 600 }}>Tech Stack Manager</h1>
                <div style={{ display: 'flex', gap: 10 }}>
                    {layoutChanged && (
                        <button onClick={saveAll} style={{ background: '#f59e0b', color: 'black', border: 'none', padding: '8px 16px', borderRadius: 6, fontWeight: 'bold', cursor: 'pointer' }}>
                            Save Changes
                        </button>
                    )}
                    <button onClick={openCreate} style={{ background: '#22c55e', color: 'black', border: 'none', padding: '8px 16px', borderRadius: 6, fontWeight: 'bold', cursor: 'pointer' }}>
                        + Add
                    </button>
                </div>
            </div>

            {/* --- GRID (Standard) --- */}
            <div style={{ maxWidth: 1400, margin: '0 auto', background: '#000', borderRadius: 12, border: '1px solid #27272a', padding: 20, minHeight: '80vh' }}>
                <div style={{ minHeight: '800px', position: 'relative' }}>

                    {/* Floor Visual */}
                    <div style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: 2,
                        background: '#22c55e',
                        opacity: 0.5,
                        zIndex: 0
                    }} />

                    {/* CSS Override */}
                    <style>{`
                        .react-grid-item {
                            min-height: 0px !important;
                        }
                        .react-grid-layout {
                            min-height: 0px !important;
                        }
                    `}</style>

                    <ResponsiveGridLayout
                        className="layout"
                        layouts={{
                            lg: items.map(i => ({ i: i.id, x: i.x, y: i.y, w: i.w, h: i.h }))
                        }}
                        breakpoints={{ lg: 1360 }}
                        cols={{ lg: 12 }}
                        rowHeight={ROW_HEIGHT}
                        width={1360}

                        compactType={null}

                        onLayoutChange={(layout: any) => {
                            if (!layout || !Array.isArray(layout) || layout.length === 0) return;

                            const updated = items.map(item => {
                                const layoutItem = layout.find((l: any) => l && l.i === item.id);
                                if (layoutItem && layoutItem.h !== undefined) {
                                    return { ...item, x: layoutItem.x, y: layoutItem.y, w: layoutItem.w, h: layoutItem.h };
                                }
                                return item;
                            });
                            setItems(updated);
                            setLayoutChanged(true);
                        }}
                    >
                        {items.map(item => (
                            <div key={item.id} style={{
                                background: item.color,
                                borderRadius: 8,
                                border: '1px solid rgba(255,255,255,0.1)',
                                overflow: 'hidden',
                                display: 'flex',
                                flexDirection: 'column',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.5)',
                                minHeight: 0,
                                position: 'relative'
                            }}>
                                {/* Edit button - absolute positioned */}
                                <button
                                    onClick={(e) => { e.stopPropagation(); openEdit(item); }}
                                    onMouseDown={e => e.stopPropagation()}
                                    style={{
                                        position: 'absolute',
                                        top: 4,
                                        right: 4,
                                        background: 'rgba(0,0,0,0.3)',
                                        border: 'none',
                                        color: '#9ca3af',
                                        cursor: 'pointer',
                                        fontSize: '1.1em',
                                        width: 24,
                                        height: 24,
                                        borderRadius: 4,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        zIndex: 10,
                                        flexShrink: 0
                                    }}
                                >✎</button>

                                {/* Only name - minimal padding */}
                                <div style={{
                                    padding: '6px 8px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    height: '100%',
                                    overflow: 'hidden',
                                    minHeight: 0
                                }}>
                                    <h3 style={{
                                        margin: 0,
                                        fontSize: '0.95em',
                                        fontWeight: 'bold',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        textAlign: 'center',
                                        lineHeight: 1.2
                                    }}>{item.name}</h3>
                                </div>
                            </div>
                        ))}
                    </ResponsiveGridLayout>
                </div>
            </div>

            {/* --- MODAL --- */}
            {isModalOpen && editingItem && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 9999 }}>
                    <div style={{ background: '#18181b', border: '1px solid #3f3f46', borderRadius: 12, width: 600, maxWidth: '95vw', padding: 24, maxHeight: '90vh', overflowY: 'auto' }}>
                        <h2 style={{ marginTop: 0 }}>Edit Item</h2>

                        <div style={{ display: 'grid', gap: 16 }}>
                            {/* Basic Fields */}
                            <div>
                                <label style={{ display: 'block', marginBottom: 4, fontSize: '0.9em', color: '#a1a1aa' }}>Name</label>
                                <input
                                    value={editingItem.name}
                                    onChange={e => setEditingItem({ ...editingItem, name: e.target.value })}
                                    style={{ width: '100%', background: '#27272a', border: '1px solid #3f3f46', color: 'white', borderRadius: 6, padding: '8px' }}
                                />
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: 4, fontSize: '0.9em', color: '#a1a1aa' }}>Layer</label>
                                    <select
                                        value={editingItem.layer}
                                        onChange={e => setEditingItem({ ...editingItem, layer: e.target.value as any })}
                                        style={{ width: '100%', background: '#27272a', border: '1px solid #3f3f46', padding: '8px', color: 'white', borderRadius: 6 }}
                                    >
                                        <option value="physical">Physical</option>
                                        <option value="governance">Governance</option>
                                        <option value="connectivity">Connectivity</option>
                                        <option value="digital">Digital</option>
                                    </select>
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: 4, fontSize: '0.9em', color: '#a1a1aa' }}>Color</label>
                                    <input
                                        type="color"
                                        value={editingItem.color}
                                        onChange={e => setEditingItem({ ...editingItem, color: e.target.value })}
                                        style={{ width: '100%', height: 38, padding: 0, border: 'none', background: 'transparent' }}
                                    />
                                </div>
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: 4, fontSize: '0.9em', color: '#a1a1aa' }}>Description (MD)</label>
                                <textarea
                                    value={editingItem.description}
                                    onChange={e => setEditingItem({ ...editingItem, description: e.target.value })}
                                    rows={5}
                                    style={{ width: '100%', background: '#27272a', border: '1px solid #3f3f46', padding: '8px', color: 'white', borderRadius: 6, fontFamily: 'monospace' }}
                                />
                            </div>

                            {/* Partners */}
                            <div>
                                <label style={{ display: 'block', marginBottom: 8, fontSize: '0.9em', color: '#a1a1aa' }}>Partners</label>
                                <div style={{ display: 'grid', gap: 8 }}>
                                    {editingItem.partners.map((p, idx) => (
                                        <div key={idx} style={{ display: 'flex', gap: 8, background: '#27272a', padding: 8, borderRadius: 6 }}>
                                            <input placeholder="Name" value={p.name} onChange={e => { const n = [...editingItem.partners]; n[idx].name = e.target.value; setEditingItem({ ...editingItem, partners: n }) }} style={{ flex: 1, background: '#3f3f46', border: 'none', color: 'white', padding: 4, borderRadius: 4 }} />
                                            <input placeholder="Logo URL" value={p.logoUrl} onChange={e => { const n = [...editingItem.partners]; n[idx].logoUrl = e.target.value; setEditingItem({ ...editingItem, partners: n }) }} style={{ flex: 1, background: '#3f3f46', border: 'none', color: 'white', padding: 4, borderRadius: 4 }} />
                                            <button onClick={() => { const n = [...editingItem.partners]; n.splice(idx, 1); setEditingItem({ ...editingItem, partners: n }); }} style={{ color: 'red', border: 'none', background: 'transparent', cursor: 'pointer' }}>×</button>
                                        </div>
                                    ))}
                                    <button
                                        onClick={() => setEditingItem({ ...editingItem, partners: [...editingItem.partners, { name: '', logoUrl: '', website: '' }] })}
                                        style={{ background: 'rgba(255,255,255,0.1)', border: '1px dashed #555', padding: 8, borderRadius: 6, color: '#aaa', cursor: 'pointer' }}
                                    >
                                        + Add Partner
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div style={{ marginTop: 24, display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
                            <button onClick={() => deleteItem(editingItem.id)} style={{ marginRight: 'auto', background: 'transparent', color: '#ef4444', border: 'none', cursor: 'pointer' }}>Delete</button>
                            <button onClick={() => setIsModalOpen(false)} style={{ background: 'transparent', border: '1px solid #555', color: 'white', padding: '8px 16px', borderRadius: 6, cursor: 'pointer' }}>Cancel</button>
                            <button onClick={saveModal} style={{ background: '#22c55e', border: 'none', color: 'black', padding: '8px 16px', borderRadius: 6, fontWeight: 'bold', cursor: 'pointer' }}>Done</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const AdminTechStack: React.FC = () => (
    <AdminAuthWrapper>
        <AdminTechStackContent />
    </AdminAuthWrapper>
);

export default AdminTechStack;
