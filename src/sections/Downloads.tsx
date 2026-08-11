import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface DownloadItem {
  id: string;
  name: string;
  badgeImg: string;
  url?: string;
}

const citizenDownloads: DownloadItem[] = [
  {
    id: 'app-store',
    name: 'App Store',
    badgeImg: '/images/as.svg',
    url: '#',
  },
  {
    id: 'google-play',
    name: 'Google Play',
    badgeImg: '/images/gp.svg',
    url: '#',
  },
  {
    id: 'apk-download',
    name: 'Direct APK',
    badgeImg: '/images/apk.svg',
    url: '#',
  },
];

const deckDownloads: DownloadItem[] = [
  {
    id: 'macos',
    name: 'macOS Client',
    badgeImg: '/images/mas.svg',
    url: '#',
  },
  {
    id: 'windows',
    name: 'Windows Client',
    badgeImg: '/images/windows.svg',
    url: '#',
  },
];

const CitizenQrCode: React.FC = () => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 1.5rem auto',
      gap: '0.5rem',
    }}
  >
    <div
      style={{
        padding: '8px',
        background: '#FFFFFF',
        borderRadius: '4px',
        border: '1px solid rgba(0, 255, 136, 0.5)',
        boxShadow: '0 0 20px rgba(0, 255, 136, 0.25)',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 0 30px rgba(0, 255, 136, 0.5)';
        e.currentTarget.style.transform = 'scale(1.04)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 255, 136, 0.25)';
        e.currentTarget.style.transform = 'scale(1)';
      }}
    >
      <svg width="88" height="88" viewBox="0 0 29 29" shapeRendering="crispEdges">
        <rect width="29" height="29" fill="#FFFFFF" />
        {/* Finder Top-Left */}
        <rect x="2" y="2" width="7" height="7" fill="#050a09" />
        <rect x="3" y="3" width="5" height="5" fill="#FFFFFF" />
        <rect x="4" y="4" width="3" height="3" fill="#050a09" />

        {/* Finder Top-Right */}
        <rect x="20" y="2" width="7" height="7" fill="#050a09" />
        <rect x="21" y="3" width="5" height="5" fill="#FFFFFF" />
        <rect x="22" y="4" width="3" height="3" fill="#050a09" />

        {/* Finder Bottom-Left */}
        <rect x="2" y="20" width="7" height="7" fill="#050a09" />
        <rect x="3" y="21" width="5" height="5" fill="#FFFFFF" />
        <rect x="4" y="22" width="3" height="3" fill="#050a09" />

        {/* Alignment Pattern */}
        <rect x="20" y="20" width="5" height="5" fill="#050a09" />
        <rect x="21" y="21" width="3" height="3" fill="#FFFFFF" />
        <rect x="22" y="22" width="1" height="1" fill="#050a09" />

        {/* Timing bars & data modules */}
        <g fill="#050a09">
          <rect x="10" y="4" width="1" height="1" /><rect x="12" y="4" width="1" height="1" /><rect x="14" y="4" width="1" height="1" /><rect x="16" y="4" width="1" height="1" />
          <rect x="4" y="10" width="1" height="1" /><rect x="4" y="12" width="1" height="1" /><rect x="4" y="14" width="1" height="1" /><rect x="4" y="16" width="1" height="1" />

          <rect x="10" y="2" width="2" height="1" /><rect x="14" y="2" width="1" height="2" /><rect x="17" y="2" width="2" height="1" />
          <rect x="10" y="6" width="3" height="1" /><rect x="15" y="6" width="2" height="2" /><rect x="18" y="5" width="1" height="3" />
          <rect x="2" y="10" width="2" height="1" /><rect x="6" y="10" width="1" height="2" /><rect x="8" y="10" width="2" height="1" />
          <rect x="11" y="9" width="3" height="2" /><rect x="16" y="9" width="2" height="1" /><rect x="20" y="10" width="3" height="1" /><rect x="25" y="10" width="2" height="1" />
          <rect x="2" y="13" width="1" height="2" /><rect x="5" y="12" width="2" height="1" /><rect x="8" y="13" width="1" height="2" />
          <rect x="10" y="12" width="2" height="2" /><rect x="13" y="12" width="2" height="1" /><rect x="17" y="12" width="3" height="1" /><rect x="22" y="12" width="2" height="2" /><rect x="26" y="12" width="1" height="2" />
          <rect x="3" y="16" width="2" height="1" /><rect x="7" y="15" width="2" height="2" /><rect x="10" y="15" width="1" height="3" />
          <rect x="12" y="15" width="3" height="1" /><rect x="16" y="15" width="2" height="2" /><rect x="19" y="15" width="2" height="1" /><rect x="23" y="15" width="3" height="1" />
          <rect x="10" y="19" width="2" height="1" /><rect x="13" y="18" width="1" height="2" /><rect x="15" y="19" width="2" height="1" /><rect x="18" y="18" width="1" height="2" />
          <rect x="10" y="21" width="3" height="1" /><rect x="14" y="21" width="2" height="2" /><rect x="17" y="21" width="2" height="1" />
          <rect x="10" y="23" width="1" height="3" /><rect x="12" y="24" width="2" height="1" /><rect x="15" y="23" width="3" height="1" /><rect x="19" y="24" width="2" height="2" /><rect x="26" y="22" width="1" height="3" />
          <rect x="11" y="26" width="2" height="1" /><rect x="14" y="26" width="3" height="1" /><rect x="18" y="26" width="2" height="1" /><rect x="21" y="26" width="3" height="1" /><rect x="25" y="26" width="2" height="1" />
        </g>
      </svg>
    </div>
    <span
      style={{
        fontFamily: '"Space Grotesk", sans-serif',
        fontSize: '0.65rem',
        fontWeight: 600,
        letterSpacing: '0.14em',
        color: '#88A090',
        textTransform: 'uppercase',
      }}
    >
      Scan to open on phone
    </span>
  </div>
);

const Downloads: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <div
      style={{
        minHeight: 'auto',
        background: 'transparent',
        padding: isMobile ? '40px 1rem 20px' : '60px 20px 20px',
        position: 'relative',
        color: '#E6F0EB',
        width: '100%',
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}
    >
      {/* Ambient background glows matching Domus / Robulus */}
      <div
        style={{
          position: 'absolute',
          top: '5%',
          right: '-5%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(0,255,136,0.06) 0%, transparent 65%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '20%',
          left: '-5%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(0,212,255,0.04) 0%, transparent 65%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          maxWidth: '900px',
          width: '100%',
          margin: '0 auto',
          position: 'relative',
          zIndex: 2,
          boxSizing: 'border-box',
        }}
      >
        {/* Page Header matching Robulus / Domus proportions */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            textAlign: 'center',
            marginBottom: isMobile ? '2rem' : '2.5rem',
            width: '100%',
            boxSizing: 'border-box',
          }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: isMobile ? 'clamp(1.8rem, 8vw, 2.5rem)' : 'clamp(2.2rem, 4.5vw, 3.2rem)',
              fontWeight: 400,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              lineHeight: 1.05,
              background: 'linear-gradient(135deg, #00FF88 0%, #dfe4e1 45%, #00D4FF 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              margin: '0 0 1rem 0',
              filter: 'drop-shadow(0 0 20px rgba(0,212,255,0.3))',
            }}
          >
            Downloads
          </motion.h1>

          {/* Underline divider matching Domus/Robulus */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.6, duration: 0.8, ease: 'easeOut' }}
            style={{
              height: '1px',
              width: '180px',
              background: 'linear-gradient(to right, transparent, rgba(0,255,136,0.7), rgba(0,212,255,0.3), transparent)',
              margin: '0 auto',
              transformOrigin: 'center',
            }}
          />
        </motion.div>

        {/* SECTION 1: JUVANTIA CITIZEN */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            background: 'linear-gradient(135deg, rgba(25, 40, 38, 0.55) 0%, rgba(10, 15, 12, 0.9) 100%)',
            backdropFilter: 'blur(24px) saturate(1.3)',
            border: '1px solid rgba(0, 255, 136, 0.3)',
            borderRadius: '2px',
            padding: isMobile ? '1.75rem 1rem' : '2rem 1.75rem',
            marginBottom: isMobile ? '1.5rem' : '2rem',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 30px 80px rgba(0,0,0,0.7), 0 0 40px rgba(0, 255, 136, 0.08)',
            width: '100%',
            boxSizing: 'border-box',
          }}
        >
          {/* Top gradient accent line */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '2px',
              background: 'linear-gradient(90deg, transparent, #00FF88, rgba(0,255,136,0.6), transparent)',
            }}
          />

          {/* Glass reflection */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '40%',
              background: 'linear-gradient(180deg, rgba(255,255,255,0.025) 0%, transparent 100%)',
              pointerEvents: 'none',
            }}
          />

          {/* Scanner Corners */}
          <div style={{ position: 'absolute', top: '12px', left: '12px', width: '16px', height: '16px', borderTop: '2px solid #00FF88', borderLeft: '2px solid #00FF88' }} />
          <div style={{ position: 'absolute', top: '12px', right: '12px', width: '16px', height: '16px', borderTop: '2px solid #00FF88', borderRight: '2px solid #00FF88' }} />
          <div style={{ position: 'absolute', bottom: '12px', left: '12px', width: '16px', height: '16px', borderBottom: '2px solid #00FF88', borderLeft: '2px solid #00FF88' }} />
          <div style={{ position: 'absolute', bottom: '12px', right: '12px', width: '16px', height: '16px', borderBottom: '2px solid #00FF88', borderRight: '2px solid #00FF88' }} />

          {/* Section Title (fontWeight: 400) */}
          <h2
            style={{
              fontFamily: '"Cinzel", serif',
              fontSize: isMobile ? '1.2rem' : '1.35rem',
              fontWeight: 400,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#E6F0EB',
              margin: '0 0 1.25rem 0',
              textAlign: 'center',
            }}
          >
            Juvantia Citizen
          </h2>

          {/* Desktop Only QR Code Block */}
          {!isMobile && <CitizenQrCode />}

          {/* Badges Container Grid */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
              gap: isMobile ? '1rem' : '1.5rem',
              width: '100%',
              boxSizing: 'border-box',
            }}
          >
            {citizenDownloads.map((item) => (
              <motion.a
                key={item.id}
                href={item.url || '#'}
                whileHover={{ y: -4, scale: 1.03 }}
                transition={{ duration: 0.2 }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textDecoration: 'none',
                  outline: 'none',
                  borderRadius: '10px',
                  maxWidth: '100%',
                  transition: 'filter 0.3s ease, box-shadow 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.filter = 'drop-shadow(0 0 15px rgba(0, 255, 136, 0.4))';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.filter = 'none';
                }}
              >
                <img
                  src={item.badgeImg}
                  alt={item.name}
                  style={{
                    height: isMobile ? '50px' : '60px',
                    maxWidth: '100%',
                    width: 'auto',
                    objectFit: 'contain',
                  }}
                />
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* SECTION 2: JUVANTIA OPERATOR DECK */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            background: 'linear-gradient(135deg, rgba(25, 40, 38, 0.55) 0%, rgba(10, 15, 12, 0.9) 100%)',
            backdropFilter: 'blur(24px) saturate(1.3)',
            border: '1px solid rgba(0, 255, 136, 0.3)',
            borderRadius: '2px',
            padding: isMobile ? '1.75rem 1rem' : '2rem 1.75rem',
            marginBottom: '0',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 30px 80px rgba(0,0,0,0.7), 0 0 40px rgba(0, 255, 136, 0.08)',
            width: '100%',
            boxSizing: 'border-box',
          }}
        >
          {/* Top gradient accent line */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '2px',
              background: 'linear-gradient(90deg, transparent, #00FF88, rgba(0,255,136,0.6), transparent)',
            }}
          />

          {/* Glass reflection */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '40%',
              background: 'linear-gradient(180deg, rgba(255,255,255,0.025) 0%, transparent 100%)',
              pointerEvents: 'none',
            }}
          />

          {/* Scanner Corners */}
          <div style={{ position: 'absolute', top: '12px', left: '12px', width: '16px', height: '16px', borderTop: '2px solid #00FF88', borderLeft: '2px solid #00FF88' }} />
          <div style={{ position: 'absolute', top: '12px', right: '12px', width: '16px', height: '16px', borderTop: '2px solid #00FF88', borderRight: '2px solid #00FF88' }} />
          <div style={{ position: 'absolute', bottom: '12px', left: '12px', width: '16px', height: '16px', borderBottom: '2px solid #00FF88', borderLeft: '2px solid #00FF88' }} />
          <div style={{ position: 'absolute', bottom: '12px', right: '12px', width: '16px', height: '16px', borderBottom: '2px solid #00FF88', borderRight: '2px solid #00FF88' }} />

          {/* Section Title (fontWeight: 400) */}
          <h2
            style={{
              fontFamily: '"Cinzel", serif',
              fontSize: isMobile ? '1.2rem' : '1.35rem',
              fontWeight: 400,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#E6F0EB',
              margin: '0 0 1.5rem 0',
              textAlign: 'center',
            }}
          >
            Juvantia Operator Deck
          </h2>

          {/* Options Container Grid */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
              gap: isMobile ? '1rem' : '1.5rem',
              width: '100%',
              boxSizing: 'border-box',
            }}
          >
            {deckDownloads.map((item) => (
              <motion.a
                key={item.id}
                href={item.url || '#'}
                whileHover={{ y: -4, scale: 1.03 }}
                transition={{ duration: 0.2 }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textDecoration: 'none',
                  outline: 'none',
                  borderRadius: '10px',
                  maxWidth: '100%',
                  transition: 'filter 0.3s ease, box-shadow 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.filter = 'drop-shadow(0 0 15px rgba(0, 255, 136, 0.4))';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.filter = 'none';
                }}
              >
                <img
                  src={item.badgeImg}
                  alt={item.name}
                  style={{
                    height: isMobile ? '50px' : '60px',
                    maxWidth: '100%',
                    width: 'auto',
                    objectFit: 'contain',
                  }}
                />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Downloads;
