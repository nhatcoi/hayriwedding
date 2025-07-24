import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <motion.div 
        className="container"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="footer-content">
          <div className="footer-logo">
            <img src="/logohayri.png" alt="HayriWedding" />
            <h3>HayriWedding</h3>
            <p>{t('footer.tagline')}</p>
          </div>
          
          <div className="footer-links">
            <h4>{t('footer.services')}</h4>
            <Link to="/services">{t('footer.ceremoniesLink')}</Link>
            <Link to="/services">{t('footer.floralLink')}</Link>
            <Link to="/services">{t('footer.planningLink')}</Link>
          </div>
          
          <div className="footer-contact">
            <h4>{t('footer.contact')}</h4>
            <p>📧 {t('footer.email')}</p>
            <p>📱 {t('footer.phone')}</p>
            <p>📍 {t('footer.address')}</p>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {currentYear} HayriWedding. {t('footer.rights')}</p>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer; 