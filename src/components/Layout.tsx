import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Layout.module.css';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navItems = [
        { path: '/', label: 'Juvantia' },
        { path: '/land', label: 'Land Map' },
        { path: '/robulus', label: 'Robulus' },
        { path: '/domus', label: 'Domus' },
        { path: '/smart-contract', label: 'Smart Contract' },
    ];

    return (
        <div className={styles.container}>
            <nav className={styles.nav}>
                {/* Desktop Logo - Hidden on mobile via CSS */}
                <Link to="/" className={styles.logoContainer}>
                    <img src="/images/logo.svg" alt="Juvantia" className={styles.logo} />
                </Link>

                {/* Desktop Nav - Hidden on mobile via CSS */}
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

                {/* Mobile Burger Button */}
                <button
                    className={styles.burgerButton}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle menu"
                >
                    <span className={`${styles.burgerLine} ${isMenuOpen ? styles.burgerLineOpen1 : ''}`} />
                    <span className={`${styles.burgerLine} ${isMenuOpen ? styles.burgerLineOpen2 : ''}`} />
                    <span className={`${styles.burgerLine} ${isMenuOpen ? styles.burgerLineOpen3 : ''}`} />
                </button>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        className={styles.mobileMenu}
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: 'tween', duration: 0.3 }}
                    >
                        <div className={styles.mobileMenuContent}>
                            <Link to="/" onClick={() => setIsMenuOpen(false)} className={styles.mobileLogoContainer}>
                                <img src="/images/logo.svg" alt="Juvantia" className={styles.mobileLogo} />
                            </Link>

                            <div className={styles.mobileNavLinks}>
                                {navItems.map((item) => (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        className={`${styles.mobileLink} ${location.pathname === item.path ? styles.mobileActive : ''}`}
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </div>

                            <div className={styles.mobileFooterLinks}>
                                <a href="mailto:info@juvantia.org" className={styles.mobileFooterLink}>info@juvantia.org</a>
                                <a href="https://tabularium.juvantia.org" target="_blank" rel="noopener noreferrer" className={styles.mobileFooterLink}>Tabularium</a>
                                <a href="https://forum.juvantia.org" target="_blank" rel="noopener noreferrer" className={styles.mobileFooterLink}>Forum</a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <main className={styles.main}>
                {children}
            </main>

            {/* Desktop Footer - Hidden on mobile via CSS */}
            <footer className={styles.footer}>
                <a href="mailto:info@juvantia.org" className={styles.footerLink}>info@juvantia.org</a>
                <a href="https://tabularium.juvantia.org" target="_blank" rel="noopener noreferrer" className={styles.footerLink}>Tabularium</a>
                <a href="https://forum.juvantia.org" target="_blank" rel="noopener noreferrer" className={styles.footerLink}>Forum</a>
            </footer>
        </div>
    );
};

export default Layout;
