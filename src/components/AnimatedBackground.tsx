import React, { useEffect, useState } from 'react';

interface Particle {
    id: number;
    x: number;
    y: number;
    size: number;
    duration: number;
    delay: number;
    color: 'primary' | 'secondary';
}

const AnimatedBackground: React.FC = () => {
    const [particles, setParticles] = useState<Particle[]>([]);

    useEffect(() => {
        // Generate random particles
        const generateParticles = () => {
            const particleCount = window.innerWidth < 768 ? 15 : 30;
            const newParticles: Particle[] = [];

            for (let i = 0; i < particleCount; i++) {
                newParticles.push({
                    id: i,
                    x: Math.random() * 100,
                    y: Math.random() * 100,
                    size: Math.random() * 3 + 1,
                    duration: Math.random() * 20 + 15,
                    delay: Math.random() * 10,
                    color: Math.random() > 0.5 ? 'primary' : 'secondary'
                });
            }
            setParticles(newParticles);
        };

        generateParticles();
        window.addEventListener('resize', generateParticles);
        return () => window.removeEventListener('resize', generateParticles);
    }, []);

    return (
        <div className="animated-background">
            {/* Base gradient layer */}
            <div className="bg-gradient-base" />

            {/* Grid overlay */}
            <div className="bg-grid" />

            {/* Radial glow spots */}
            <div className="bg-glow bg-glow-1" />
            <div className="bg-glow bg-glow-2" />
            <div className="bg-glow bg-glow-3" />

            {/* Floating particles */}
            <div className="bg-particles">
                {particles.map((particle) => (
                    <div
                        key={particle.id}
                        className={`particle particle-${particle.color}`}
                        style={{
                            left: `${particle.x}%`,
                            top: `${particle.y}%`,
                            width: `${particle.size}px`,
                            height: `${particle.size}px`,
                            animationDuration: `${particle.duration}s`,
                            animationDelay: `${particle.delay}s`,
                        }}
                    />
                ))}
            </div>

            {/* Scan line effect */}
            <div className="bg-scanline" />

            {/* Noise texture overlay */}
            <div className="bg-noise" />

            <style>{`
                .animated-background {
                    position: fixed;
                    inset: 0;
                    z-index: 0;
                    overflow: hidden;
                    pointer-events: none;
                }

                /* Base gradient - deep dark with subtle color hints */
                .bg-gradient-base {
                    position: absolute;
                    inset: 0;
                    background: 
                        radial-gradient(ellipse 80% 50% at 50% -20%, rgba(0, 212, 255, 0.1) 0%, transparent 50%),
                        radial-gradient(ellipse 60% 40% at 100% 100%, rgba(0, 212, 255, 0.08) 0%, transparent 50%),
                        radial-gradient(ellipse 50% 50% at 0% 80%, rgba(0, 255, 136, 0.06) 0%, rgba(0, 212, 255, 0.03) 30%, transparent 50%),
                        radial-gradient(ellipse 70% 40% at 80% 20%, rgba(0, 212, 255, 0.05) 0%, transparent 40%),
                        linear-gradient(180deg, 
                            #050a0a 0%, 
                            #0a100e 20%, 
                            #080d0c 50%,
                            #0a110e 80%,
                            #060a09 100%
                        );
                }

                /* Grid lines - compound blueprint effect */
                .bg-grid {
                    position: absolute;
                    inset: 0;
                    background-image: 
                        linear-gradient(rgba(0, 212, 255, 0.06) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(0, 212, 255, 0.06) 1px, transparent 1px),
                        linear-gradient(rgba(0, 212, 255, 0.05) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(0, 212, 255, 0.05) 1px, transparent 1px);
                    background-size: 
                        100px 100px,
                        100px 100px,
                        25px 25px,
                        25px 25px;
                    mask-image: radial-gradient(ellipse 100% 100% at 50% 50%, black 0%, transparent 85%);
                    -webkit-mask-image: radial-gradient(ellipse 100% 100% at 50% 50%, black 0%, transparent 85%);
                    animation: grid-pulse 8s ease-in-out infinite;
                }

                @keyframes grid-pulse {
                    0%, 100% { opacity: 0.6; }
                    50% { opacity: 1; }
                }

                /* Radial glow spots */
                .bg-glow {
                    position: absolute;
                    border-radius: 50%;
                    filter: blur(80px);
                    opacity: 0.5;
                    animation: glow-float 20s ease-in-out infinite;
                }

                .bg-glow-1 {
                    width: 600px;
                    height: 600px;
                    top: -200px;
                    right: -100px;
                    background: radial-gradient(circle, rgba(0, 212, 255, 0.25) 0%, transparent 70%);
                    animation-delay: 0s;
                }

                .bg-glow-2 {
                    width: 500px;
                    height: 500px;
                    bottom: -150px;
                    left: -100px;
                    background: radial-gradient(circle, rgba(0, 212, 255, 0.18) 0%, rgba(0, 255, 136, 0.08) 50%, transparent 70%);
                    animation-delay: -7s;
                }

                .bg-glow-3 {
                    width: 400px;
                    height: 400px;
                    top: 40%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background: radial-gradient(circle, rgba(0, 212, 255, 0.12) 0%, rgba(0, 255, 136, 0.06) 50%, transparent 70%);
                    animation-delay: -14s;
                }

                @keyframes glow-float {
                    0%, 100% { 
                        transform: translate(0, 0) scale(1);
                        opacity: 0.3;
                    }
                    25% { 
                        transform: translate(30px, -20px) scale(1.1);
                        opacity: 0.5;
                    }
                    50% { 
                        transform: translate(-20px, 30px) scale(0.95);
                        opacity: 0.4;
                    }
                    75% { 
                        transform: translate(20px, 20px) scale(1.05);
                        opacity: 0.35;
                    }
                }

                /* Floating particles */
                .bg-particles {
                    position: absolute;
                    inset: 0;
                }

                .particle {
                    position: absolute;
                    border-radius: 50%;
                    animation: particle-float linear infinite;
                    opacity: 0;
                }

                .particle-primary {
                    background: linear-gradient(135deg, #00ff88, #00d4ff);
                    box-shadow: 0 0 10px rgba(0, 255, 136, 0.8), 0 0 20px rgba(0, 212, 255, 0.5);
                }

                .particle-secondary {
                    background: linear-gradient(135deg, #00d4ff, #00ff88);
                    box-shadow: 0 0 10px rgba(0, 212, 255, 0.8), 0 0 20px rgba(0, 255, 136, 0.4);
                }

                @keyframes particle-float {
                    0% {
                        opacity: 0;
                        transform: translateY(0) translateX(0) scale(0);
                    }
                    10% {
                        opacity: 0.6;
                        transform: translateY(-20px) translateX(10px) scale(1);
                    }
                    50% {
                        opacity: 0.3;
                        transform: translateY(-100px) translateX(-20px) scale(0.8);
                    }
                    90% {
                        opacity: 0.5;
                        transform: translateY(-180px) translateX(15px) scale(0.6);
                    }
                    100% {
                        opacity: 0;
                        transform: translateY(-200px) translateX(0) scale(0);
                    }
                }

                /* Scan line effect */
                .bg-scanline {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(
                        transparent 0%,
                        rgba(0, 255, 136, 0.02) 50%,
                        transparent 100%
                    );
                    background-size: 100% 4px;
                    animation: scanline-move 10s linear infinite;
                    opacity: 0.5;
                }

                @keyframes scanline-move {
                    0% { background-position: 0 0; }
                    100% { background-position: 0 1000px; }
                }

                /* Noise texture - subtle grain */
                .bg-noise {
                    position: absolute;
                    inset: 0;
                    opacity: 0.04;
                    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
                }

                /* Mobile optimizations */
                @media (max-width: 768px) {
                    .bg-glow-1 { width: 300px; height: 300px; }
                    .bg-glow-2 { width: 250px; height: 250px; }
                    .bg-glow-3 { width: 200px; height: 200px; }
                    .bg-scanline { display: none; }
                    .bg-grid {
                        background-size: 
                            80px 80px,
                            80px 80px,
                            20px 20px,
                            20px 20px;
                    }
                }

                /* Reduce motion for accessibility */
                @media (prefers-reduced-motion: reduce) {
                    .bg-grid,
                    .bg-glow,
                    .particle,
                    .bg-scanline {
                        animation: none;
                    }
                    .particle { opacity: 0.3; }
                    .bg-glow { opacity: 0.3; }
                }
            `}</style>
        </div>
    );
};

export default AnimatedBackground;
