import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { AdminAuthWrapper } from '../components/AdminAuthWrapper';

interface SalesZone {
    id?: number; // Optional for preview zones
    districtId?: number;
    x: number;
    y: number;
    width: number;
    height: number;
}

interface Building {
    id?: number;
    districtId?: number;
    x: number;
    y: number;
    width: number;
    height: number;
    imageUrl: string;
    name?: string;
}

interface District {
    id: number;
    name: string;
    type: string;
    x: number;
    y: number;
    width: number;
    height: number;
    salesZones?: SalesZone[];
    buildings?: Building[];
}

const AdminMap: React.FC = () => {
    const [districts, setDistricts] = useState<District[]>([]);
    const [status, setStatus] = useState('');
    const [selectedDistrictId, setSelectedDistrictId] = useState<number | null>(null);

    // Helper to get admin headers
    const getAdminHeaders = () => {
        const secret = localStorage.getItem('admin_secret');
        return {
            'Content-Type': 'application/json',
            'x-admin-secret': secret || ''
        };
    };

    // Generator State
    const [genParams, setGenParams] = useState({
        lotWidth: 5,
        lotDepth: 2,
        roadWidth: 1,
        gapBetweenLots: 0,
        startX: 0,
        startY: 0,
        areaWidth: 50,
        areaHeight: 50,
        splitIntoTiles: true,
        lotsPerBlock: 6
    });
    const [previewZones, setPreviewZones] = useState<SalesZone[]>([]);

    // Building State
    const [newBuilding, setNewBuilding] = useState<Building>({
        x: 0,
        y: 0,
        width: 20,
        height: 20,
        imageUrl: '/images/senatus.svg',
        name: ''
    });

    // Scale for visualization
    const VISUAL_SCALE = 3;
    const MAP_WIDTH = 400 * VISUAL_SCALE;
    const MAP_HEIGHT = 150 * VISUAL_SCALE;

    const fetchDistricts = () => {
        fetch('http://localhost:3001/api/districts')
            .then(res => {
                if (!res.ok) throw new Error('Failed to connect to server');
                return res.json();
            })
            .then(data => setDistricts(data))
            .catch(err => {
                console.error(err);
                setStatus('Error: Could not connect to backend');
            });
    };

    useEffect(() => {
        fetchDistricts();
    }, []);

    const updateDistrict = (id: number, field: keyof District, value: number) => {
        setDistricts(prev => prev.map(d => d.id === id ? { ...d, [field]: value } : d));
    };

    const saveConfiguration = async () => {
        setStatus('Saving...');
        try {
            const updates = districts.map(d =>
                fetch(`http://localhost:3001/api/districts/${d.id}`, {
                    method: 'PUT',
                    headers: getAdminHeaders(),
                    body: JSON.stringify({
                        x: d.x,
                        y: d.y,
                        width: d.width,
                        height: d.height
                    })
                })
            );

            await Promise.all(updates);
            setStatus('Saved successfully!');
            setTimeout(() => setStatus(''), 2000);
        } catch (e) {
            setStatus('Error saving');
        }
    };

    const deleteSalesZone = async (id: number) => {
        if (!confirm('Delete this zone?')) return;
        try {
            await fetch(`http://localhost:3001/api/sales-zones/${id}`, {
                method: 'DELETE',
                headers: getAdminHeaders()
            });
            fetchDistricts();
        } catch (e) {
            console.error(e);
        }
    };

    const addBuilding = async () => {
        if (!selectedDistrictId) return;
        try {
            const res = await fetch('http://localhost:3001/api/buildings', {
                method: 'POST',
                headers: getAdminHeaders(),
                body: JSON.stringify({
                    ...newBuilding,
                    districtId: selectedDistrictId
                })
            });
            if (res.ok) {
                fetchDistricts();
                setStatus('Building added!');
            } else {
                setStatus('Error adding building');
            }
        } catch (e) {
            console.error(e);
            setStatus('Error connecting to backend');
        }
    };

    const deleteBuilding = async (id: number) => {
        if (!confirm('Delete this building?')) return;
        try {
            await fetch(`http://localhost:3001/api/buildings/${id}`, {
                method: 'DELETE',
                headers: getAdminHeaders()
            });
            fetchDistricts();
        } catch (e) {
            console.error(e);
        }
    };

    // --- GENERATOR LOGIC ---
    const generateSuburbiaPreview = () => {
        if (!selectedDistrictId) return;
        const district = districts.find(d => d.id === selectedDistrictId);
        if (!district) return;

        const zones: SalesZone[] = [];
        const { lotWidth, lotDepth, roadWidth, gapBetweenLots, startX, startY, areaWidth, areaHeight, splitIntoTiles, lotsPerBlock } = genParams;

        // User Requirement:
        // 1. Block = 2 rows of lots back-to-back (Total Depth = 2 * lotDepth).
        // 2. Road runs between these blocks (vertically separated by road).
        // 3. Horizontally: lotsPerBlock lots side-by-side, then a "Lane" (gap).

        const BLOCK_DEPTH = lotDepth * 2;
        const LANE_WIDTH = roadWidth; // Use road width for the lane gap as well, or could be smaller.

        let currentRelY = roadWidth; // Start with a road at the top

        // Helper to add a "Lot" which might be a single zone or many 1x1 zones
        const addLot = (x: number, y: number, w: number, h: number) => {
            if (splitIntoTiles) {
                // Create 1x1 tiles filling the area
                for (let i = 0; i < w; i++) {
                    for (let j = 0; j < h; j++) {
                        zones.push({
                            x: x + i,
                            y: y + j,
                            width: 1,
                            height: 1
                        });
                    }
                }
            } else {
                // Create single zone
                zones.push({
                    x,
                    y,
                    width: w,
                    height: h
                });
            }
        };

        while (currentRelY + BLOCK_DEPTH <= areaHeight) {
            // We are placing a "Block" of 2 rows (Back-to-Back)

            // Row 1 (Top Row of the block)
            let currentRelX = 0;
            let lotsInRow = 0;

            while (currentRelX + lotWidth <= areaWidth) {
                // Check if we need a lane gap
                if (lotsInRow > 0 && lotsInRow % lotsPerBlock === 0) {
                    currentRelX += LANE_WIDTH;
                    // Check if we still fit after lane
                    if (currentRelX + lotWidth > areaWidth) break;
                }

                // Place Top Lot
                addLot(startX + currentRelX, startY + currentRelY, lotWidth, lotDepth);

                // Place Bottom Lot (Back-to-Back) - directly below, no gap
                addLot(startX + currentRelX, startY + currentRelY + lotDepth, lotWidth, lotDepth);

                currentRelX += lotWidth + gapBetweenLots; // gapBetweenLots is usually 0 for this pattern
                lotsInRow++;
            }

            // Move Y past this block (2 rows) + Road
            currentRelY += BLOCK_DEPTH + roadWidth;
        }

        setPreviewZones(zones);
    };

    const commitPreview = async () => {
        if (!selectedDistrictId || previewZones.length === 0) return;

        try {
            const res = await fetch('http://localhost:3001/api/sales-zones/bulk', {
                method: 'POST',
                headers: getAdminHeaders(),
                body: JSON.stringify({
                    districtId: selectedDistrictId,
                    zones: previewZones
                })
            });

            if (res.ok) {
                setPreviewZones([]);
                fetchDistricts();
                setStatus('Zones generated successfully!');
            } else {
                setStatus('Error generating zones');
            }
        } catch (e) {
            console.error(e);
            setStatus('Error connecting to backend');
        }
    };

    const clearPreview = () => {
        setPreviewZones([]);
    };

    const getColorByType = (type: string) => {
        switch (type) {
            case 'government': return '#660000';
            case 'residential_high': return '#d4af37';
            case 'residential_mid': return '#8b4513';
            case 'residential_low': return '#556b2f';
            case 'industrial': return '#2f4f4f';
            case 'agricultural': return '#228b22';
            case 'entertainment': return '#800080';
            case 'gateway': return '#708090';
            default: return '#333';
        }
    };

    return (
        <div style={{ padding: '2rem', background: '#1a1a1a', minHeight: '100vh', color: '#fff' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
                <h1>Map Admin: District Layout</h1>
                <div>
                    <span style={{ marginRight: '1rem', color: '#4caf50' }}>{status}</span>
                    <button
                        onClick={saveConfiguration}
                        style={{
                            padding: '10px 20px',
                            background: 'var(--color-accent)',
                            border: 'none',
                            fontWeight: 'bold',
                            cursor: 'pointer'
                        }}
                    >
                        SAVE LAYOUT
                    </button>
                </div>
            </div>

            <div style={{
                width: MAP_WIDTH,
                height: MAP_HEIGHT,
                border: '2px solid #555',
                position: 'relative',
                background: '#000',
                margin: '0 auto',
                backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)',
                backgroundSize: `${10 * VISUAL_SCALE}px ${10 * VISUAL_SCALE}px` // 10m grid
            }}>
                {/* DEBUG: Check if districts exist */}
                {districts.length === 0 && <div style={{ color: 'white', padding: 20 }}>No districts loaded. Status: {status}</div>}

                {districts.map(d => (
                    <motion.div
                        key={d.id}
                        drag
                        dragMomentum={false}
                        onDragEnd={(_, info) => {
                            const deltaX = info.offset.x / VISUAL_SCALE;
                            const deltaY = info.offset.y / VISUAL_SCALE;
                            updateDistrict(d.id, 'x', Math.round(d.x + deltaX));
                            updateDistrict(d.id, 'y', Math.round(d.y + deltaY));
                        }}
                        animate={{
                            x: d.x * VISUAL_SCALE,
                            y: d.y * VISUAL_SCALE
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: d.width * VISUAL_SCALE,
                            height: d.height * VISUAL_SCALE,
                            backgroundColor: getColorByType(d.type),
                            border: selectedDistrictId === d.id ? '2px solid #fff' : '1px solid rgba(255,255,255,0.5)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'move',
                            opacity: 0.9,
                            color: '#fff',
                            fontSize: '0.8rem',
                            textAlign: 'center',
                            zIndex: 10
                        }}
                        onClick={() => setSelectedDistrictId(d.id)}
                    >
                        <div>
                            {d.name}
                            <br />
                            <span style={{ fontSize: '0.6rem' }}>({d.width}x{d.height})</span>
                        </div>

                        {/* Render Existing Sales Zones */}
                        {d.salesZones?.map(z => (
                            <div
                                key={z.id}
                                style={{
                                    position: 'absolute',
                                    left: z.x * VISUAL_SCALE,
                                    top: z.y * VISUAL_SCALE,
                                    width: z.width * VISUAL_SCALE,
                                    height: z.height * VISUAL_SCALE,
                                    background: 'rgba(0, 255, 0, 0.3)',
                                    border: '1px dashed #0f0',
                                    pointerEvents: 'none'
                                }}
                            />
                        ))}

                        {/* Render Buildings */}
                        {d.buildings?.map(b => (
                            <div
                                key={`b-${b.id}`}
                                style={{
                                    position: 'absolute',
                                    left: b.x * VISUAL_SCALE,
                                    top: b.y * VISUAL_SCALE,
                                    width: b.width * VISUAL_SCALE,
                                    height: b.height * VISUAL_SCALE,
                                    pointerEvents: 'none',
                                    zIndex: 25
                                }}
                            >
                                <img
                                    src={b.imageUrl}
                                    alt={b.name}
                                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                                />
                            </div>
                        ))}

                        {/* Render Generation Area Boundary */}
                        {selectedDistrictId === d.id && (
                            <div
                                style={{
                                    position: 'absolute',
                                    left: genParams.startX * VISUAL_SCALE,
                                    top: genParams.startY * VISUAL_SCALE,
                                    width: genParams.areaWidth * VISUAL_SCALE,
                                    height: genParams.areaHeight * VISUAL_SCALE,
                                    border: '2px dashed #00bfff',
                                    pointerEvents: 'none',
                                    zIndex: 15
                                }}
                            />
                        )}

                        {/* Render Preview Zones */}
                        {selectedDistrictId === d.id && previewZones.map((z, idx) => (
                            <div
                                key={`preview-${idx}`}
                                style={{
                                    position: 'absolute',
                                    left: z.x * VISUAL_SCALE,
                                    top: z.y * VISUAL_SCALE,
                                    width: z.width * VISUAL_SCALE,
                                    height: z.height * VISUAL_SCALE,
                                    background: 'rgba(255, 215, 0, 0.4)', // Gold/Yellow
                                    border: '1px dotted #ffd700',
                                    pointerEvents: 'none',
                                    zIndex: 20
                                }}
                            />
                        ))}
                    </motion.div>
                ))}
            </div>

            <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1rem' }}>
                {districts.map(d => (
                    <div key={d.id} style={{
                        background: selectedDistrictId === d.id ? '#333' : '#222',
                        padding: '1rem',
                        borderRadius: '4px',
                        border: selectedDistrictId === d.id ? '1px solid var(--color-accent)' : 'none'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h4 style={{ color: getColorByType(d.type), margin: 0 }}>{d.name}</h4>
                            <button onClick={() => setSelectedDistrictId(d.id)} style={{ fontSize: '0.8rem' }}>
                                {selectedDistrictId === d.id ? 'Selected' : 'Select'}
                            </button>
                        </div>

                        {/* Generator UI */}
                        {selectedDistrictId === d.id && (
                            <div style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(0,0,0,0.3)', borderRadius: '4px' }}>
                                <h5 style={{ marginTop: 0, color: '#ffd700' }}>Suburbia Generator</h5>

                                <div style={{ marginBottom: '10px', paddingBottom: '10px', borderBottom: '1px solid #444' }}>
                                    <h6 style={{ margin: '0 0 5px 0', color: '#00bfff' }}>Generation Area</h6>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5px' }}>
                                        <label>Start X: <input type="number" value={genParams.startX} onChange={e => setGenParams({ ...genParams, startX: Number(e.target.value) })} style={{ width: '50px' }} /></label>
                                        <label>Start Y: <input type="number" value={genParams.startY} onChange={e => setGenParams({ ...genParams, startY: Number(e.target.value) })} style={{ width: '50px' }} /></label>
                                        <label>Width: <input type="number" value={genParams.areaWidth} onChange={e => setGenParams({ ...genParams, areaWidth: Number(e.target.value) })} style={{ width: '50px' }} /></label>
                                        <label>Height: <input type="number" value={genParams.areaHeight} onChange={e => setGenParams({ ...genParams, areaHeight: Number(e.target.value) })} style={{ width: '50px' }} /></label>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', gap: '10px', marginTop: '10px', marginBottom: '10px' }}>
                                    <button
                                        onClick={() => setGenParams({ ...genParams, lotWidth: 1, lotDepth: 1, gapBetweenLots: 0, roadWidth: 0 })}
                                        style={{ flex: 1, padding: '5px', background: '#333', color: '#fff', border: '1px solid #444', cursor: 'pointer' }}
                                    >
                                        Grid (1x1m)
                                    </button>
                                    <button
                                        onClick={() => setGenParams({ ...genParams, lotWidth: 5, lotDepth: 5, gapBetweenLots: 1, roadWidth: 2 })}
                                        style={{ flex: 1, padding: '5px', background: '#333', color: '#fff', border: '1px solid #444', cursor: 'pointer' }}
                                    >
                                        Village (5x5m)
                                    </button>
                                    <button
                                        onClick={() => setGenParams({ ...genParams, lotWidth: 5, lotDepth: 2, gapBetweenLots: 0, roadWidth: 1 })}
                                        style={{ flex: 1, padding: '5px', background: '#333', color: '#fff', border: '1px solid #444', cursor: 'pointer' }}
                                    >
                                        Suburbia
                                    </button>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
                                    <label>
                                        Lot Width (m):
                                        <input type="number" value={genParams.lotWidth} onChange={e => setGenParams({ ...genParams, lotWidth: Number(e.target.value) })} style={{ width: '100%', background: '#444', color: '#fff', border: 'none', padding: '5px' }} />
                                    </label>
                                    <label>
                                        Lot Depth (m):
                                        <input type="number" value={genParams.lotDepth} onChange={e => setGenParams({ ...genParams, lotDepth: Number(e.target.value) })} style={{ width: '100%', background: '#444', color: '#fff', border: 'none', padding: '5px' }} />
                                    </label>
                                    <label>
                                        Road Width (m):
                                        <input type="number" value={genParams.roadWidth} onChange={e => setGenParams({ ...genParams, roadWidth: Number(e.target.value) })} style={{ width: '100%', background: '#444', color: '#fff', border: 'none', padding: '5px' }} />
                                    </label>
                                    <label>
                                        Gap (m):
                                        <input type="number" value={genParams.gapBetweenLots} onChange={e => setGenParams({ ...genParams, gapBetweenLots: Number(e.target.value) })} style={{ width: '100%', background: '#444', color: '#fff', border: 'none', padding: '5px' }} />
                                    </label>
                                    <label>
                                        Lots per Block:
                                        <input type="number" value={genParams.lotsPerBlock} onChange={e => setGenParams({ ...genParams, lotsPerBlock: Number(e.target.value) })} style={{ width: '100%', background: '#444', color: '#fff', border: 'none', padding: '5px' }} />
                                    </label>
                                    <label style={{ gridColumn: 'span 2', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                                        <input
                                            type="checkbox"
                                            checked={genParams.splitIntoTiles}
                                            onChange={e => setGenParams({ ...genParams, splitIntoTiles: e.target.checked })}
                                        />
                                        Retail Mode (Split into 1x1m Tiles)
                                    </label>
                                </div>

                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <button onClick={generateSuburbiaPreview} style={{ flex: 1, padding: '5px', background: '#555', color: '#fff', border: 'none', cursor: 'pointer' }}>
                                        Preview
                                    </button>
                                    {previewZones.length > 0 && (
                                        <>
                                            <button onClick={commitPreview} style={{ flex: 1, padding: '5px', background: '#d4af37', color: '#000', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>
                                                COMMIT
                                            </button>
                                            <button onClick={clearPreview} style={{ flex: 0.5, padding: '5px', background: '#800', color: '#fff', border: 'none', cursor: 'pointer' }}>
                                                X
                                            </button>
                                        </>
                                    )}
                                </div>

                                <div style={{ marginTop: '20px', borderTop: '1px solid #333', paddingTop: '20px', display: 'flex', gap: '10px' }}>
                                    <button
                                        onClick={async () => {
                                            if (confirm('Are you sure you want to DELETE ALL zones in this district? This cannot be undone.')) {
                                                try {
                                                    const res = await fetch(`http://localhost:3001/api/sales-zones/district/${selectedDistrictId}`, {
                                                        method: 'DELETE',
                                                        headers: getAdminHeaders()
                                                    });
                                                    if (res.ok) {
                                                        // Refresh
                                                        const updatedDistricts = districts.map(d =>
                                                            d.id === selectedDistrictId ? { ...d, salesZones: [] } : d
                                                        );
                                                        setDistricts(updatedDistricts);
                                                        alert('All zones cleared!');
                                                    } else {
                                                        alert('Failed to clear zones');
                                                    }
                                                } catch (err) {
                                                    console.error(err);
                                                    alert('Error clearing zones');
                                                }
                                            }
                                        }}
                                        style={{
                                            flex: 1,
                                            padding: '10px',
                                            background: '#dc3545',
                                            color: '#fff',
                                            border: 'none',
                                            fontWeight: 'bold',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        DANGER: CLEAR ALL
                                    </button>

                                    <button
                                        onClick={async () => {
                                            if (confirm('Delete zones ONLY within the current blue dashed area?')) {
                                                try {
                                                    const res = await fetch(`http://localhost:3001/api/sales-zones/district/${selectedDistrictId}/clear-area`, {
                                                        method: 'POST',
                                                        headers: getAdminHeaders(),
                                                        body: JSON.stringify({
                                                            x: genParams.startX,
                                                            y: genParams.startY,
                                                            width: genParams.areaWidth,
                                                            height: genParams.areaHeight
                                                        })
                                                    });
                                                    if (res.ok) {
                                                        fetchDistricts(); // Reload to see changes
                                                        alert('Area cleared!');
                                                    } else {
                                                        alert('Failed to clear area');
                                                    }
                                                } catch (err) {
                                                    console.error(err);
                                                    alert('Error clearing area');
                                                }
                                            }
                                        }}
                                        style={{
                                            flex: 1,
                                            padding: '10px',
                                            background: '#ff9800',
                                            color: '#fff',
                                            border: 'none',
                                            fontWeight: 'bold',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        CLEAR AREA ONLY
                                    </button>
                                </div>

                                <div style={{ marginTop: '10px', fontSize: '0.8rem', color: '#aaa' }}>
                                    Existing Zones: {d.salesZones?.length || 0} | Preview: {previewZones.length}
                                </div>

                                {/* List of existing zones with delete option */}
                                {d.salesZones && d.salesZones.length > 0 && (
                                    <div style={{ marginTop: '10px', maxHeight: '100px', overflowY: 'auto', borderTop: '1px solid #444', paddingTop: '5px' }}>
                                        {d.salesZones.map(z => (
                                            <div key={z.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', marginBottom: '2px' }}>
                                                <span>Zone #{z.id} ({z.width}x{z.height})</span>
                                                <button onClick={() => deleteSalesZone(z.id!)} style={{ color: 'red', background: 'none', border: 'none', cursor: 'pointer' }}>x</button>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <div style={{ marginTop: '20px', borderTop: '1px solid #444', paddingTop: '10px' }}>
                                    <h5 style={{ marginTop: 0, color: '#ff9800' }}>Add Building</h5>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5px' }}>
                                        <label>X: <input type="number" value={newBuilding.x} onChange={e => setNewBuilding({ ...newBuilding, x: Number(e.target.value) })} style={{ width: '50px' }} /></label>
                                        <label>Y: <input type="number" value={newBuilding.y} onChange={e => setNewBuilding({ ...newBuilding, y: Number(e.target.value) })} style={{ width: '50px' }} /></label>
                                        <label>W: <input type="number" value={newBuilding.width} onChange={e => setNewBuilding({ ...newBuilding, width: Number(e.target.value) })} style={{ width: '50px' }} /></label>
                                        <label>H: <input type="number" value={newBuilding.height} onChange={e => setNewBuilding({ ...newBuilding, height: Number(e.target.value) })} style={{ width: '50px' }} /></label>
                                    </div>
                                    <div style={{ marginTop: '5px' }}>
                                        <label>Image:</label>
                                        <select
                                            value={newBuilding.imageUrl}
                                            onChange={e => setNewBuilding({ ...newBuilding, imageUrl: e.target.value })}
                                            style={{ width: '100%', background: '#333', color: '#fff', border: '1px solid #555' }}
                                        >
                                            <option value="/images/senatus.svg">Senatus</option>
                                            <option value="/images/OC.svg">OC</option>
                                            <option value="/images/PRAETOR.svg">Praetor</option>
                                        </select>
                                    </div>
                                    <div style={{ marginTop: '5px' }}>
                                        <label>Name: <input type="text" value={newBuilding.name || ''} onChange={e => setNewBuilding({ ...newBuilding, name: e.target.value })} style={{ width: '100%', background: '#333', color: '#fff', border: '1px solid #555' }} /></label>
                                    </div>
                                    <button onClick={addBuilding} style={{ marginTop: '10px', width: '100%', padding: '5px', background: '#ff9800', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>ADD BUILDING</button>
                                </div>

                                {/* List Buildings */}
                                {d.buildings && d.buildings.length > 0 && (
                                    <div style={{ marginTop: '10px', borderTop: '1px solid #444', paddingTop: '5px' }}>
                                        <h6 style={{ margin: '0 0 5px 0', color: '#aaa' }}>Existing Buildings</h6>
                                        {d.buildings.map(b => (
                                            <div key={b.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', marginBottom: '2px' }}>
                                                <span>{b.name || 'Building'} ({b.width}x{b.height})</span>
                                                <button onClick={() => deleteBuilding(b.id!)} style={{ color: 'red', background: 'none', border: 'none', cursor: 'pointer' }}>x</button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

const AdminMapWithAuth: React.FC = () => (
    <AdminAuthWrapper>
        <AdminMap />
    </AdminAuthWrapper>
);

export default AdminMapWithAuth;
