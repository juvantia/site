import React, { useRef, useEffect, useMemo } from 'react';
import * as THREE from 'three';

interface ParticleBackgroundProps {
    particleCount?: number;
    connectionDistance?: number;
    mouseInfluence?: number;
    speed?: number;
    opacity?: number;
}

const ParticleBackground: React.FC<ParticleBackgroundProps> = ({
    particleCount = 120,
    connectionDistance = 150,
    mouseInfluence = 100,
    speed = 0.3,
    opacity = 1
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const mouseRef = useRef({ x: 0, y: 0 });
    const animationRef = useRef<number>();

    const colors = useMemo(() => ({
        primary: new THREE.Color(0x00ff88),
        secondary: new THREE.Color(0x00d4ff),
        background: new THREE.Color(0x0a0f0a)
    }), []);

    useEffect(() => {
        if (!containerRef.current) return;

        const container = containerRef.current;
        const width = container.clientWidth;
        const height = container.clientHeight;

        // Scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        camera.position.z = 300;

        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
            powerPreference: 'low-power'
        });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setClearColor(0x000000, 0);
        container.appendChild(renderer.domElement);

        // Particles
        const particles: {
            position: THREE.Vector3;
            velocity: THREE.Vector3;
            originalPosition: THREE.Vector3;
        }[] = [];

        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const particleColors = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount; i++) {
            const x = (Math.random() - 0.5) * width;
            const y = (Math.random() - 0.5) * height;
            const z = (Math.random() - 0.5) * 100;

            positions[i * 3] = x;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = z;

            // Random color between primary and secondary
            const mixFactor = Math.random();
            const color = colors.primary.clone().lerp(colors.secondary, mixFactor);
            particleColors[i * 3] = color.r;
            particleColors[i * 3 + 1] = color.g;
            particleColors[i * 3 + 2] = color.b;

            particles.push({
                position: new THREE.Vector3(x, y, z),
                velocity: new THREE.Vector3(
                    (Math.random() - 0.5) * speed,
                    (Math.random() - 0.5) * speed,
                    (Math.random() - 0.5) * speed * 0.5
                ),
                originalPosition: new THREE.Vector3(x, y, z)
            });
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

        // Particle material with glow effect
        const particleMaterial = new THREE.PointsMaterial({
            size: 3,
            vertexColors: true,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending,
            sizeAttenuation: true
        });

        const pointCloud = new THREE.Points(geometry, particleMaterial);
        scene.add(pointCloud);

        // Lines for connections
        const lineGeometry = new THREE.BufferGeometry();
        const lineMaterial = new THREE.LineBasicMaterial({
            color: colors.primary,
            transparent: true,
            opacity: 0.15,
            blending: THREE.AdditiveBlending
        });
        const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
        scene.add(lines);

        // Mouse tracking
        const handleMouseMove = (event: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            mouseRef.current.x = ((event.clientX - rect.left) / width - 0.5) * width;
            mouseRef.current.y = -((event.clientY - rect.top) / height - 0.5) * height;
        };

        container.addEventListener('mousemove', handleMouseMove);

        // Animation loop
        const animate = () => {
            const positions = geometry.attributes.position.array as Float32Array;
            const linePositions: number[] = [];

            for (let i = 0; i < particles.length; i++) {
                const particle = particles[i];

                // Update position based on velocity
                particle.position.add(particle.velocity);

                // Boundary check with smooth bounce
                const boundX = width / 2;
                const boundY = height / 2;
                const boundZ = 50;

                if (Math.abs(particle.position.x) > boundX) {
                    particle.velocity.x *= -1;
                    particle.position.x = Math.sign(particle.position.x) * boundX;
                }
                if (Math.abs(particle.position.y) > boundY) {
                    particle.velocity.y *= -1;
                    particle.position.y = Math.sign(particle.position.y) * boundY;
                }
                if (Math.abs(particle.position.z) > boundZ) {
                    particle.velocity.z *= -1;
                }

                // Mouse influence
                const dx = mouseRef.current.x - particle.position.x;
                const dy = mouseRef.current.y - particle.position.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < mouseInfluence && dist > 0) {
                    const force = (mouseInfluence - dist) / mouseInfluence;
                    particle.position.x -= dx * force * 0.02;
                    particle.position.y -= dy * force * 0.02;
                }

                // Update buffer
                positions[i * 3] = particle.position.x;
                positions[i * 3 + 1] = particle.position.y;
                positions[i * 3 + 2] = particle.position.z;

                // Find connections
                for (let j = i + 1; j < particles.length; j++) {
                    const other = particles[j];
                    const distance = particle.position.distanceTo(other.position);

                    if (distance < connectionDistance) {
                        linePositions.push(
                            particle.position.x, particle.position.y, particle.position.z,
                            other.position.x, other.position.y, other.position.z
                        );
                    }
                }
            }

            geometry.attributes.position.needsUpdate = true;

            // Update lines
            lineGeometry.setAttribute(
                'position',
                new THREE.Float32BufferAttribute(linePositions, 3)
            );

            // Subtle camera movement
            camera.position.x += (mouseRef.current.x * 0.01 - camera.position.x) * 0.02;
            camera.position.y += (mouseRef.current.y * 0.01 - camera.position.y) * 0.02;
            camera.lookAt(scene.position);

            renderer.render(scene, camera);
            animationRef.current = requestAnimationFrame(animate);
        };

        animate();

        // Handle resize
        const handleResize = () => {
            const newWidth = container.clientWidth;
            const newHeight = container.clientHeight;

            camera.aspect = newWidth / newHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(newWidth, newHeight);
        };

        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
            container.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
            container.removeChild(renderer.domElement);
            geometry.dispose();
            particleMaterial.dispose();
            lineGeometry.dispose();
            lineMaterial.dispose();
            renderer.dispose();
        };
    }, [particleCount, connectionDistance, mouseInfluence, speed, colors]);

    return (
        <div
            ref={containerRef}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 0,
                opacity,
                pointerEvents: 'none'
            }}
        />
    );
};

export default ParticleBackground;

