import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Layout.module.css';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const location = useLocation();
    const [isQuickActionsOpen, setIsQuickActionsOpen] = useState(false);
    const floatBarRef = useRef<HTMLDivElement>(null);

    const navItems = [
        { path: '/', label: 'Juvantia', shortLabel: 'Home' },
        { path: '/land', label: 'Land Map', shortLabel: 'Land' },
        { path: '/robulus', label: 'Robulus', shortLabel: 'Robulus' },
        { path: '/domus', label: 'Domus', shortLabel: 'Domus' },
        { path: '/smart-contract', label: 'Smart Contract', shortLabel: 'Contract' },
    ];

    const quickActions = [
        { href: 'mailto:info@juvantia.org', label: 'Mail', icon: '✉' },
        { href: 'https://tabularium.juvantia.org', label: 'Tabularium', icon: '📜', external: true },
        { href: 'https://forum.juvantia.org', label: 'Forum', icon: '💬', external: true },
    ];

    // Scroll active item into view on mount and route change
    useEffect(() => {
        if (floatBarRef.current) {
            const activeIndex = navItems.findIndex(item => item.path === location.pathname);
            const links = floatBarRef.current.querySelectorAll('a');
            if (links[activeIndex]) {
                links[activeIndex].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
            }
        }
    }, [location.pathname]);

    return (
        <div className={styles.container}>
            {/* Desktop Navigation */}
            <nav className={styles.nav}>
                <Link to="/" className={styles.logoContainer}>
                    <img src="/images/logo.svg" alt="Juvantia" className={styles.logo} />
                </Link>

                <div className={styles.navContent}>
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`${styles.link} ${location.pathname === item.path ? styles.active : ''}`}
                        >
                            {item.label}
                            {location.pathname === item.path && (
                                <motion.div
                                    className={styles.underline}
                                    layoutId="underline"
                                />
                            )}
                        </Link>
                    ))}
                </div>
            </nav>

            <main className={styles.main}>
                {children}
            </main>

            {/* Desktop Footer */}
            <footer className={styles.footer}>
                <a href="mailto:info@juvantia.org" className={styles.footerLink}>info@juvantia.org</a>
                <a href="https://tabularium.juvantia.org" target="_blank" rel="noopener noreferrer" className={styles.footerLink}>Tabularium</a>
                <a href="https://forum.juvantia.org" target="_blank" rel="noopener noreferrer" className={styles.footerLink}>Forum</a>
            </footer>

            {/* Mobile Float Bar Navigation */}
            <div className={styles.floatBar}>
                <div className={styles.floatBarScroll} ref={floatBarRef}>
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`${styles.floatBarLink} ${location.pathname === item.path ? styles.floatBarLinkActive : ''}`}
                        >
                            {item.shortLabel}
                        </Link>
                    ))}
                </div>
            </div>

            {/* Quick Actions Pill */}
            <div className={styles.quickActionsPill}>
                <AnimatePresence>
                    {isQuickActionsOpen && (
                        <motion.div
                            className={styles.quickActionsBackdrop}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsQuickActionsOpen(false)}
                        />
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {isQuickActionsOpen && (
                        <motion.div
                            className={styles.quickActionsMenu}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            {quickActions.map((action, index) => (
                                <motion.a
                                    key={action.label}
                                    href={action.href}
                                    target={action.external ? '_blank' : undefined}
                                    rel={action.external ? 'noopener noreferrer' : undefined}
                                    className={styles.quickActionsItem}
                                    initial={{ opacity: 0, y: 20, scale: 0.8 }}
                                    animate={{ 
                                        opacity: 1, 
                                        y: 0, 
                                        scale: 1,
                                        transition: { delay: index * 0.05 }
                                    }}
                                    exit={{ 
                                        opacity: 0, 
                                        y: 10, 
                                        scale: 0.8,
                                        transition: { delay: (quickActions.length - index - 1) * 0.03 }
                                    }}
                                    onClick={() => setIsQuickActionsOpen(false)}
                                >
                                    <span className={styles.quickActionsItemIcon}>{action.icon}</span>
                                    {action.label}
                                </motion.a>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.button
                    className={`${styles.quickActionsButton} ${isQuickActionsOpen ? styles.quickActionsButtonOpen : ''}`}
                    onClick={() => setIsQuickActionsOpen(!isQuickActionsOpen)}
                    whileTap={{ scale: 0.9 }}
                    aria-label="Quick actions"
                >
                    <motion.span
                        animate={{ rotate: isQuickActionsOpen ? 45 : 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        {isQuickActionsOpen ? '✕' : '⋯'}
                    </motion.span>
                </motion.button>
            </div>
        </div>
    );
};

export default Layout;
