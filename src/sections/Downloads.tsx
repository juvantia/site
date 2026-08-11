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
              margin: '0 0 1.5rem 0',
              textAlign: 'center',
            }}
          >
            Juvantia Citizen
          </h2>

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
