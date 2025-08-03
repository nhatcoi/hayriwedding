import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import navigationData from '../data/navigation.json';

const Footer: React.FC = () => {
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
            <p>{navigationData.footer.tagline}</p>
          </div>
          
          <div className="footer-links">
            <h4>{navigationData.footer.services}</h4>
            <Link to="/services">{navigationData.footer.ceremoniesLink}</Link>
            <Link to="/services">{navigationData.footer.floralLink}</Link>
            <Link to="/services">{navigationData.footer.planningLink}</Link>
          </div>
          
          <div className="footer-contact">
            <h4>{navigationData.footer.contact}</h4>
            <p>{navigationData.footer.email}</p>
            <p>{navigationData.footer.phone}</p>
            <p>{navigationData.footer.address}</p>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {currentYear} HayriWedding. {navigationData.footer.rights}</p>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer; 