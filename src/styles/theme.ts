import type { CSSProperties } from 'react';

// ─── Master Typography & Visual Tokens ──────────────────────────────────────
export const theme = {
    colors: {
        primary: '#00FF88',
        secondary: '#00D4FF',
        danger: '#FF4757',
        warning: '#FFA502',
        textIntense: '#E6F0EB',
        textMuted: 'rgba(223, 228, 225, 0.72)',
        textSubtle: 'rgba(185, 203, 185, 0.7)',
        surfaceCard: '#171d1b',
        surfaceInset: '#0a0f0e',
        borderGhost: 'rgba(59, 75, 61, 0.3)',
        borderPrimary: 'rgba(0, 255, 136, 0.2)',
        borderSecondary: 'rgba(0, 212, 255, 0.2)',
    },

    // ─── Shared Typography Generator ────────────────────────────────────────
    typography: {
        h1: (isMobile: boolean): CSSProperties => ({
            fontFamily: "'Cinzel', serif",
            fontSize: isMobile ? 'clamp(2.4rem, 10vw, 3.5rem)' : 'clamp(3rem, 6vw, 4.5rem)',
            fontWeight: 400,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            lineHeight: 1.05,
            background: 'linear-gradient(135deg, #00FF88 0%, #dfe4e1 45%, #00D4FF 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            margin: isMobile ? '0 0 0.75rem' : '0 0 1.5rem',
            filter: 'drop-shadow(0 0 20px rgba(0,212,255,0.3))'
        }),

        h2: (isMobile: boolean): CSSProperties => ({
            fontFamily: "'Cinzel', serif",
            fontSize: isMobile ? '1.6rem' : 'clamp(1.8rem, 4vw, 2.8rem)',
            fontWeight: 400,
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            textAlign: 'center',
            color: '#E6F0EB',
            marginBottom: isMobile ? '1.5rem' : '2rem',
            lineHeight: 1.2,
        }),

        h3: {
            fontFamily: "'Cinzel', serif",
            fontSize: '1.35rem',
            color: '#E6F0EB',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            margin: '0 0 0.8rem',
            fontWeight: 500
        } as CSSProperties,

        gradientSpan: {
            background: 'linear-gradient(135deg, #00FF88, #00D4FF)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
        } as CSSProperties,

        heroDesc: (isMobile: boolean): CSSProperties => ({
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: isMobile ? '1rem' : '1.15rem',
            color: 'rgba(223, 228, 225, 0.72)',
            lineHeight: 1.85,
            fontWeight: 300,
            maxWidth: '540px',
            margin: '0 0 2rem'
        }),

        sectionDesc: {
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '1.05rem',
            color: 'rgba(185, 203, 185, 0.7)',
            lineHeight: 1.85,
            fontWeight: 300,
            maxWidth: '700px',
            margin: '0 auto',
            textAlign: 'center',
        } as CSSProperties,

        body: {
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '0.95rem',
            color: 'rgba(223, 228, 225, 0.8)',
            lineHeight: 1.75,
            fontWeight: 300
        } as CSSProperties,

        eyebrow: (color = '#00FF88'): CSSProperties => ({
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '0.75rem',
            fontWeight: 600,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color
        })
    },

    // ─── Shared Layout & Divider Decorators ──────────────────────────────────
    layout: {
        rootContainer: {
            minHeight: '100vh',
            background: 'transparent',
            position: 'relative',
            overflow: 'hidden'
        } as CSSProperties,

        heroUnderline: (isMobile: boolean): CSSProperties => ({
            height: '1px',
            width: '220px',
            background: 'linear-gradient(to right, rgba(0,255,136,0.7), rgba(0,212,255,0.3), transparent)',
            transformOrigin: 'left',
            marginBottom: isMobile ? '1rem' : '1.75rem'
        }),

        card: (accent = 'rgba(0, 255, 136, 0.2)'): CSSProperties => ({
            background: '#171d1b',
            border: `1px solid ${accent}`,
            position: 'relative'
        })
    }
};
