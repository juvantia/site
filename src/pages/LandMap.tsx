import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '../config/api';
import { MapContainer, TileLayer, Marker, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { motion, AnimatePresence } from 'framer-motion';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import CursorGlow from '../components/CursorGlow';
import PageTitle from '../components/PageTitle';
import AnimatedBackground from '../components/AnimatedBackground';

// --- LEAFLET MAP CONFIGURATION ---

// Fix for default marker icon in React-Leaflet
const icon = new Icon({
    iconUrl: markerIconPng,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

interface LandCandidate {
    id: number;
    name: string;
    country: string;
    description: string;
    lat: number;
    lng: number;
    size: string;
    features: string[];
    price_estimate: string;
}

const candidates: LandCandidate[] = [
    {
        id: 1,
        name: "Codru Valley Estate",
        country: "Moldova",
        description: "A lush, green expanse located near the historic Codru woods. Excellent soil quality and natural water sources.",
        lat: 47.2,
        lng: 28.5,
        size: "60,000 m²",
        features: ["Forest Access", "Natural Spring", "Rolling Hills"],
        price_estimate: "€120,000"
    },
    {
        id: 2,
        name: "Transylvanian Highland",
        country: "Romania",
        description: "Situated in the heart of the Carpathians, offering breathtaking mountain views and complete seclusion.",
        lat: 45.6,
        lng: 25.3,
        size: "60,000 m²",
        features: ["Mountain View", "Secluded", "Historic Region"],
        price_estimate: "€180,000"
    },
    {
        id: 3,
        name: "Apulian Olive Grove",
        country: "Italy (South)",
        description: "Sun-drenched land in the Puglia region, famous for its ancient olive trees and proximity to the Mediterranean coast.",
        lat: 40.8,
        lng: 17.1,
        size: "60,000 m²",
        features: ["Mediterranean Climate", "Olive Trees", "Coastal Breeze"],
        price_estimate: "€450,000"
    },
    {
        id: 4,
        name: "Cantabrian Green",
        country: "Spain (North)",
        description: "A vibrant, verdant plot in Northern Spain, combining the freshness of the Atlantic with rugged terrain.",
        lat: 43.2,
        lng: -4.5,
        size: "60,000 m²",
        features: ["Atlantic Climate", "Green Pastures", "Rugged Terrain"],
        price_estimate: "€320,000"
    },
    {
        id: 5,
        name: "Rhodope Valley",
        country: "Bulgaria",
        description: "Nestled in the scenic Rhodope Mountains, this land offers pristine nature, clean air, and access to mineral springs.",
        lat: 41.6,
        lng: 24.4,
        size: "60,000 m²",
        features: ["Mountain Springs", "Forest Trails", "Low Population Density"],
        price_estimate: "€95,000"
    },
    {
        id: 6,
        name: "Vardar Plains",
        country: "North Macedonia",
        description: "Fertile plains near the Vardar River, combining agricultural potential with proximity to historic sites.",
        lat: 41.5,
        lng: 21.7,
        size: "60,000 m²",
        features: ["River Access", "Fertile Soil", "Central Location"],
        price_estimate: "€85,000"
    }
];

// --- BLUEPRINT MAP CONFIGURATION ---

interface SalesZone {
    id: number;
    districtId: number;
    x: number;
    y: number;
    width: number;
    height: number;
}

interface Building {
    id: number;
    districtId: number;
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
    description: string;
    type: string;
    x: number;
    y: number;
    width: number;
    height: number;
    salesZones?: SalesZone[];
    buildings?: Building[];
}

const LandMap: React.FC = () => {
    // State for Leaflet Map
    const [selectedCandidate, setSelectedCandidate] = useState<LandCandidate | null>(null);

    // State for Blueprint Map
    const [districts, setDistricts] = useState<District[]>([]);
    const [selectedDistrict, setSelectedDistrict] = useState<District | null>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        fetch(`${API_BASE_URL}/districts`)
            .then(res => res.json())
            .then(data => setDistricts(data))
            .catch(err => console.error('Failed to fetch districts:', err));
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Blueprint Map Calculations
    const OVERVIEW_SCALE = 3;
    const maxX = districts.length > 0 ? Math.max(...districts.map(d => d.x + d.width)) : 400;
    const maxY = districts.length > 0 ? Math.max(...districts.map(d => d.y + d.height)) : 150;
    const MAP_WIDTH = Math.max(maxX, 400) * OVERVIEW_SCALE;
    const MAP_HEIGHT = Math.max(maxY, 150) * OVERVIEW_SCALE;

    return (
        <div style={{
            width: '100vw',
            minHeight: 'calc(100vh - 80px)',
            overflowY: 'auto',
            overflowX: 'hidden',
            background: 'var(--color-bg)',
            position: 'relative'
        }}>
            <PageTitle title="Land Map - JUVANTIA" />
            <AnimatedBackground />
            <CursorGlow size={350} opacity={0.12} />

            <div style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: isMobile ? '80px 1rem 40px' : '100px 2rem 60px',
                borderBottom: '1px solid rgba(0, 255, 136, 0.15)',
                position: 'relative',
                zIndex: 1
            }}>
                <h1 style={{
                    fontFamily: '"Cinzel", serif',
                    fontSize: isMobile ? '1.5rem' : '2.2rem',
                    marginBottom: isMobile ? '1rem' : '1.5rem',
                    letterSpacing: '0.1em',
                    background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textAlign: 'center',
                    position: 'relative',
                    zIndex: 2
                }}>
                    TERRA JUVANTIA
                </h1>
                <p style={{
                    color: 'var(--color-text-muted)',
                    marginBottom: isMobile ? '1.5rem' : '2.5rem',
                    textAlign: 'center',
                    maxWidth: '600px',
                    fontSize: isMobile ? '0.95rem' : '1.1rem',
                    padding: isMobile ? '0 0.5rem' : 0,
                    position: 'relative',
                    zIndex: 2
                }}>
                    Explore potential territories for the park.
                </p>

                <div style={{
                    width: isMobile ? '100%' : '800px',
                    height: isMobile ? '300px' : '400px',
                    maxWidth: '100%',
                    position: 'relative',
                    border: '1px solid rgba(0, 255, 136, 0.3)',
                    borderRadius: isMobile ? '12px' : '16px',
                    overflow: 'hidden',
                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4), 0 0 40px rgba(0, 255, 136, 0.1)',
                    zIndex: 2
                }}>
                    <MapContainer
                        center={[46.0, 12.0]}
                        zoom={4}
                        scrollWheelZoom={true}
                        style={{ width: '100%', height: '100%', zIndex: 1 }}
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                        />
                        {candidates.map(candidate => (
                            <React.Fragment key={candidate.id}>
                                <Circle
                                    center={[candidate.lat, candidate.lng]}
                                    pathOptions={{ color: '#00ff88', fillColor: '#00ff88', fillOpacity: 0.15, weight: 1 }}
                                    radius={50000}
                                    eventHandlers={{ click: () => setSelectedCandidate(candidate) }}
                                />
                                <Marker
                                    position={[candidate.lat, candidate.lng]}
                                    icon={icon}
                                    eventHandlers={{ click: () => setSelectedCandidate(candidate) }}
                                />
                            </React.Fragment>
                        ))}
                    </MapContainer>

                    {/* Candidate Overlay (Inside Square) */}
                    <AnimatePresence>
                        {selectedCandidate && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                style={{
                                    position: 'absolute',
                                    bottom: '16px',
                                    left: '16px',
                                    right: '16px',
                                    background: 'rgba(10, 15, 10, 0.95)',
                                    backdropFilter: 'blur(20px)',
                                    border: '1px solid rgba(0, 255, 136, 0.3)',
                                    borderRadius: '12px',
                                    padding: '1.25rem',
                                    zIndex: 1000,
                                    color: '#fff'
                                }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <div>
                                        <h3 style={{ color: 'var(--color-primary)', margin: '0 0 4px 0', fontFamily: '"Cinzel", serif', fontSize: '1.2rem' }}>{selectedCandidate.name}</h3>
                                        <div style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{selectedCandidate.country}</div>
                                    </div>
                                    <button onClick={() => setSelectedCandidate(null)} style={{ background: 'none', border: 'none', color: 'var(--color-text-muted)', fontSize: '1.5rem', cursor: 'pointer', padding: 0, lineHeight: 1 }}>×</button>
                                </div>
                                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', margin: '10px 0', lineHeight: 1.6 }}>{selectedCandidate.description}</p>
                                <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.9rem' }}>
                                    <div><span style={{ color: 'var(--color-text-muted)' }}>Size:</span> <span style={{ color: 'var(--color-primary)' }}>{selectedCandidate.size}</span></div>
                                    <div><span style={{ color: 'var(--color-text-muted)' }}>Est. Price:</span> <span style={{ color: 'var(--color-primary)' }}>{selectedCandidate.price_estimate}</span></div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <div style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: isMobile ? '40px 1rem' : '60px 2rem',
                backgroundImage: 'radial-gradient(rgba(0, 255, 136, 0.03) 1px, transparent 1px)',
                backgroundSize: '20px 20px',
                position: 'relative',
                zIndex: 1
            }}>
                <h2 style={{
                    fontFamily: '"Cinzel", serif',
                    fontSize: isMobile ? '1.3rem' : '1.8rem',
                    marginBottom: isMobile ? '2rem' : '3rem',
                    letterSpacing: '0.08em',
                    background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textAlign: 'center',
                    position: 'relative',
                    zIndex: 2
                }}>
                    DISTRICT MASTERPLAN
                </h2>

                <div style={{
                    maxWidth: '750px',
                    textAlign: 'center',
                    marginBottom: isMobile ? '2rem' : '3rem',
                    padding: '0 1rem',
                    width: '100%',
                    position: 'relative',
                    zIndex: 2
                }}>
                    <div style={{
                        display: 'flex',
                        flexDirection: isMobile ? 'column' : 'row',
                        gap: isMobile ? '1rem' : '1.5rem',
                        background: 'rgba(0, 255, 136, 0.03)',
                        border: '1px solid rgba(0, 255, 136, 0.15)',
                        padding: isMobile ? '1.25rem' : '1.5rem',
                        borderRadius: '16px'
                    }}>
                        <div style={{ flex: 1, textAlign: isMobile ? 'left' : 'center' }}>
                            <div style={{ color: 'var(--color-text-muted)', fontSize: isMobile ? '0.7rem' : '0.75rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Total Area</div>
                            <div style={{ color: 'var(--color-primary)', fontSize: isMobile ? '1rem' : '1.2rem', fontFamily: '"Cinzel", serif', marginTop: '4px' }}>6 Hectares</div>
                            <div style={{ color: 'var(--color-text-dim)', fontSize: isMobile ? '0.8rem' : '0.85rem' }}>60,000 m² / 645,834 sq ft</div>
                        </div>
                        <div style={{ flex: 1, textAlign: isMobile ? 'left' : 'center' }}>
                            <div style={{ color: 'var(--color-text-muted)', fontSize: isMobile ? '0.7rem' : '0.75rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Dimensions</div>
                            <div style={{ color: 'var(--color-primary)', fontSize: isMobile ? '1rem' : '1.2rem', fontFamily: '"Cinzel", serif', marginTop: '4px' }}>{Math.max(maxX, 400)}m × {Math.max(maxY, 150)}m</div>
                            <div style={{ color: 'var(--color-text-dim)', fontSize: isMobile ? '0.8rem' : '0.85rem' }}>{Math.round(Math.max(maxX, 400) * 3.28084)} ft × {Math.round(Math.max(maxY, 150) * 3.28084)} ft</div>
                        </div>
                        <div style={{ flex: 1, textAlign: isMobile ? 'left' : 'center' }}>
                            <div style={{ color: 'var(--color-text-muted)', fontSize: isMobile ? '0.7rem' : '0.75rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Perimeter</div>
                            <div style={{ color: 'var(--color-primary)', fontSize: isMobile ? '1rem' : '1.2rem', fontFamily: '"Cinzel", serif', marginTop: '4px' }}>{2 * (Math.max(maxX, 400) + Math.max(maxY, 150))}m</div>
                            <div style={{ color: 'var(--color-text-dim)', fontSize: isMobile ? '0.8rem' : '0.85rem' }}>{Math.round(2 * (Math.max(maxX, 400) + Math.max(maxY, 150)) * 3.28084)} ft</div>
                        </div>
                    </div>
                </div>

                <div style={{
                    width: '100%',
                    overflowX: 'auto',
                    WebkitOverflowScrolling: 'touch',
                    paddingBottom: '10px',
                    position: 'relative',
                    zIndex: 2
                }}>
                    <div
                        style={{
                            width: MAP_WIDTH,
                            height: MAP_HEIGHT,
                            background: 'linear-gradient(135deg, rgba(10, 20, 15, 1) 0%, rgba(5, 10, 8, 1) 100%)',
                            position: 'relative',
                            border: '1px solid rgba(0, 255, 136, 0.2)',
                            borderRadius: '8px',
                            boxShadow: '0 20px 80px rgba(0, 0, 0, 0.6), 0 0 40px rgba(0, 255, 136, 0.05)',
                            margin: '0 auto',
                            zIndex: 1
                        }}
                    >
                        {districts.map(d => (
                            <motion.div
                                key={d.id}
                                whileHover={{
                                    scale: 1.01,
                                    zIndex: 10,
                                    borderColor: 'rgba(0, 255, 136, 0.8)',
                                    boxShadow: '0 0 30px rgba(0, 255, 136, 0.2), inset 0 0 20px rgba(0, 255, 136, 0.05)',
                                }}
                                onClick={() => setSelectedDistrict(d)}
                                style={{
                                    position: 'absolute',
                                    left: d.x * OVERVIEW_SCALE,
                                    top: d.y * OVERVIEW_SCALE,
                                    width: d.width * OVERVIEW_SCALE,
                                    height: d.height * OVERVIEW_SCALE,
                                    background: 'linear-gradient(135deg, rgba(15, 30, 22, 1) 0%, rgba(10, 20, 15, 1) 100%)',
                                    border: '1px solid rgba(0, 255, 136, 0.25)',
                                    cursor: 'pointer',
                                    transition: 'border-color 0.3s ease',
                                    overflow: 'hidden',
                                    borderRadius: '4px'
                                }}
                            >
                                {d.salesZones?.map(zone => (
                                    <div
                                        key={zone.id}
                                        style={{
                                            position: 'absolute',
                                            left: zone.x * OVERVIEW_SCALE,
                                            top: zone.y * OVERVIEW_SCALE,
                                            width: zone.width * OVERVIEW_SCALE,
                                            height: zone.height * OVERVIEW_SCALE,
                                            background: 'rgba(0, 255, 136, 0.4)',
                                            border: '1px solid rgba(0, 255, 136, 0.7)',
                                            zIndex: 1
                                        }}
                                    />
                                ))}

                                {d.buildings?.map(b => (
                                    <div
                                        key={`b-${b.id}`}
                                        style={{
                                            position: 'absolute',
                                            left: b.x * OVERVIEW_SCALE,
                                            top: b.y * OVERVIEW_SCALE,
                                            width: b.width * OVERVIEW_SCALE,
                                            height: b.height * OVERVIEW_SCALE,
                                            zIndex: 2,
                                            pointerEvents: 'none'
                                        }}
                                    >
                                        <img
                                            src={b.imageUrl}
                                            alt={b.name}
                                            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                                        />
                                    </div>
                                ))}

                                <div style={{
                                    textAlign: 'center',
                                    padding: '5px',
                                    position: 'relative',
                                    zIndex: 2,
                                    background: 'rgba(0,0,0,0.3)',
                                    width: '100%',
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <h3 style={{
                                        fontSize: '0.85rem',
                                        color: '#ffffff',
                                        fontFamily: '"Cinzel", serif',
                                        textTransform: 'uppercase',
                                        letterSpacing: '1px',
                                        margin: 0,
                                        textShadow: '0 2px 4px rgba(0,0,0,0.9), 0 0 10px rgba(0,0,0,0.8)'
                                    }}>{d.name}</h3>
                                    <div style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                                        {d.width}m x {d.height}m
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Modal for Selected District (Blueprint) */}
            <AnimatePresence>
                {selectedDistrict && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: 'rgba(0,0,0,0.9)',
                            backdropFilter: 'blur(8px)',
                            zIndex: 2000,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                        onClick={() => setSelectedDistrict(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            style={{
                                width: '95vw',
                                height: '90vh',
                                background: 'var(--color-bg)',
                                border: '1px solid rgba(0, 255, 136, 0.2)',
                                borderRadius: '16px',
                                overflow: 'hidden',
                                display: 'flex',
                                flexDirection: 'column',
                                boxShadow: '0 30px 100px rgba(0, 0, 0, 0.7), 0 0 60px rgba(0, 255, 136, 0.1)'
                            }}
                        >
                            <div style={{
                                padding: '1.25rem 2rem',
                                borderBottom: '1px solid rgba(0, 255, 136, 0.15)',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                background: 'rgba(0, 255, 136, 0.03)'
                            }}>
                                <div>
                                    <h2 style={{ color: 'var(--color-primary)', margin: 0, fontFamily: '"Cinzel", serif', fontSize: '1.4rem' }}>{selectedDistrict.name}</h2>
                                    <p style={{ color: 'var(--color-text-muted)', margin: '4px 0 0 0', fontSize: '0.9rem' }}>{selectedDistrict.description}</p>
                                </div>
                                <button
                                    onClick={() => setSelectedDistrict(null)}
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        color: 'var(--color-text-muted)',
                                        fontSize: '2rem',
                                        cursor: 'pointer',
                                        padding: 0,
                                        lineHeight: 1
                                    }}
                                >
                                    ×
                                </button>
                            </div>
                            <div style={{ flex: 1, position: 'relative', background: 'rgba(5, 10, 8, 1)' }}>
                                <TransformWrapper
                                    initialScale={1}
                                    minScale={0.1}
                                    maxScale={10}
                                    centerOnInit
                                    limitToBounds={false}
                                >
                                    <TransformComponent wrapperStyle={{ width: '100%', height: '100%' }}>
                                        <div style={{
                                            width: selectedDistrict.width * 10,
                                            height: selectedDistrict.height * 10,
                                            background: 'rgba(8, 12, 10, 1)',
                                            position: 'relative',
                                            backgroundImage: `
                                                linear-gradient(rgba(0, 255, 136, 0.03) 1px, transparent 1px),
                                                linear-gradient(90deg, rgba(0, 255, 136, 0.03) 1px, transparent 1px)
                                            `,
                                            backgroundSize: '10px 10px',
                                            border: '1px solid rgba(0, 255, 136, 0.2)',
                                            boxShadow: '0 0 100px rgba(0, 0, 0, 0.8)'
                                        }}>
                                            {selectedDistrict.salesZones?.map(zone => (
                                                <motion.div
                                                    key={zone.id}
                                                    initial={{ opacity: 0.5 }}
                                                    whileHover={{
                                                        opacity: 1,
                                                        backgroundColor: 'rgba(0, 255, 136, 0.25)',
                                                        scale: 1.02,
                                                        transition: { duration: 0.2 }
                                                    }}
                                                    style={{
                                                        position: 'absolute',
                                                        left: zone.x * 10,
                                                        top: zone.y * 10,
                                                        width: zone.width * 10,
                                                        height: zone.height * 10,
                                                        background: 'rgba(0, 255, 136, 0.1)',
                                                        border: '1px solid rgba(0, 255, 136, 0.4)',
                                                        cursor: 'pointer',
                                                        zIndex: 5
                                                    }}
                                                />
                                            ))}

                                            {selectedDistrict.buildings?.map(b => (
                                                <motion.div
                                                    key={`detail-b-${b.id}`}
                                                    initial={{ opacity: 0, scale: 0.8 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    style={{
                                                        position: 'absolute',
                                                        left: b.x * 10,
                                                        top: b.y * 10,
                                                        width: b.width * 10,
                                                        height: b.height * 10,
                                                        zIndex: 20,
                                                        pointerEvents: 'none'
                                                    }}
                                                >
                                                    <img
                                                        src={b.imageUrl}
                                                        alt={b.name}
                                                        style={{
                                                            width: '100%',
                                                            height: '100%',
                                                            objectFit: 'contain',
                                                            filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.5))'
                                                        }}
                                                    />
                                                </motion.div>
                                            ))}
                                        </div>
                                    </TransformComponent>
                                </TransformWrapper>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default LandMap;
