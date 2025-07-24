import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

interface HeroProps {
  backgroundImage?: string;
  showFloatingElements?: boolean;
  customTitle?: string;
  customSubtitle?: string;
  customDescription?: string;
  showButtons?: boolean;
}

const Hero: React.FC<HeroProps> = ({
  backgroundImage = "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2048&q=80",
  showFloatingElements = true,
  customTitle,
  customSubtitle,
  customDescription,
  showButtons = true
}) => {
  const { t } = useTranslation();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <section className="hero">
      {/* Background Image */}
      <div className="hero-bg-image">
        <img src={backgroundImage} alt="Vietnamese Wedding" />
        <div className="hero-overlay"></div>
      </div>

      {/* Parallax Background with Animated Elements */}
      <motion.div className="hero-background" style={{ y }}>
        {showFloatingElements && (
          <div className="floating-elements">
            {/* Floating Geometric Shapes */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={`shape-${i}`}
                className="floating-shape"
                animate={{
                  y: [-30, 30, -30],
                  x: [-10, 10, -10],
                  rotate: [0, 180, 360],
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  duration: 8 + i * 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{
                  left: `${15 + i * 15}%`,
                  top: `${25 + (i % 2) * 30}%`
                }}
              />
            ))}
            
            {/* Light Particles */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={`particle-${i}`}
                className="light-particle"
                animate={{
                  y: [-100, -20, -100],
                  opacity: [0, 1, 0],
                  scale: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 4 + Math.random() * 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: Math.random() * 2
                }}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`
                }}
              />
            ))}

            {/* Elegant Rings */}
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={`ring-${i}`}
                className="elegant-ring"
                animate={{
                  scale: [1, 1.5, 1],
                  rotate: [0, 360],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{
                  duration: 10 + i * 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{
                  left: `${20 + i * 20}%`,
                  top: `${30 + (i % 2) * 40}%`
                }}
              />
            ))}
          </div>
        )}
      </motion.div>
      
      <motion.div 
        className="hero-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 variants={itemVariants} className="hero-title">
          <span className="title-line">{customTitle || t('hero.title')}</span>
          <span className="title-accent">{customSubtitle || t('hero.subtitle')}</span>
        </motion.h1>
        <motion.p variants={itemVariants} className="hero-subtitle">
          {customDescription || t('hero.description')}
        </motion.p>
        {showButtons && (
          <motion.div variants={itemVariants} className="hero-buttons">
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/gallery" className="btn-primary">
                {t('hero.viewWork')}
              </Link>
            </motion.div>
            <motion.button 
              className="btn-secondary"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.open('https://www.facebook.com/messages/t/278556888663700', '_blank', 'noopener,noreferrer')}
            >
              {t('hero.getQuote')}
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
};

export default Hero; 