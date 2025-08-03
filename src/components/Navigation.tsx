import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import navigationData from '../data/navigation.json';

const Navigation: React.FC = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { path: '/', key: 'home', label: navigationData.nav.home },
    { path: '/services', key: 'services', label: navigationData.nav.services },
    { path: '/gallery', key: 'gallery', label: navigationData.nav.gallery },
    { path: '/testimonials', key: 'testimonials', label: navigationData.nav.testimonials },
    { path: '/about', key: 'about', label: navigationData.nav.about },
    { path: '/contact', key: 'contact', label: navigationData.nav.contact }
  ];

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <motion.nav 
      className="nav"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
    >
      <div className="nav-container">
        <motion.div className="nav-logo" whileHover={{ scale: 1.05 }}>
          <Link to="/" className="logo-link" onClick={closeMobileMenu}>
            <img src="/logohayri.png" alt="HayriWedding" />
            <span>HayriWedding</span>
          </Link>
        </motion.div>
        
        <div className="nav-content">
          {/* Desktop Navigation */}
          <div className="nav-links desktop-nav">
            {navLinks.map(({ path, key, label }) => (
              <motion.div key={key} whileHover={{ y: -2 }}>
                <Link 
                  to={path}
                  className={`nav-link ${location.pathname === path ? 'active' : ''}`}
                >
                  {label}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="mobile-menu-button"
            onClick={toggleMobileMenu}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="hamburger-line"
              animate={isMobileMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.div
              className="hamburger-line"
              animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
            <motion.div
              className="hamburger-line"
              animate={isMobileMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="mobile-menu-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMobileMenu}
            />
            
            {/* Mobile Menu */}
            <motion.div
              className="mobile-menu"
              initial={{ x: '100%' }}
              animate={{ x: '0%' }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="mobile-menu-content">
                <div className="mobile-nav-links">
                  {navLinks.map(({ path, key, label }, index) => (
                    <motion.div
                      key={key}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link 
                        to={path}
                        className={`mobile-nav-link ${location.pathname === path ? 'active' : ''}`}
                        onClick={closeMobileMenu}
                      >
                        {label}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navigation; 