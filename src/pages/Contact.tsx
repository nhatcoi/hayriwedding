import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Hero from '../components/Hero';

const Contact: React.FC = () => {
  const { t } = useTranslation();

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
    <div className="contact-page">
      {/* Hero Section */}
      <Hero 
        backgroundImage="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2048&q=80"
        customTitle={t('contact.title')}
        customSubtitle="Get In Touch"
        customDescription={t('contact.subtitle')}
        showButtons={false}
        showFloatingElements={false}
      />

      {/* Contact Section */}
      <section className="contact-content">
        <motion.div 
          className="container"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="contact-wrapper">
            {/* Contact Form */}
            <motion.div className="contact-form-section" variants={itemVariants}>
              <h3>Gửi tin nhắn</h3>
              <motion.form variants={itemVariants} className="contact-form">
                <div className="form-row">
                  <motion.div className="form-group" whileFocus={{ scale: 1.02 }}>
                    <input type="text" placeholder={t('contact.form.name')} required />
                  </motion.div>
                  <motion.div className="form-group" whileFocus={{ scale: 1.02 }}>
                    <input type="email" placeholder={t('contact.form.email')} required />
                  </motion.div>
                </div>
                <div className="form-row">
                  <motion.div className="form-group" whileFocus={{ scale: 1.02 }}>
                    <input type="tel" placeholder={t('contact.form.phone')} />
                  </motion.div>
                  <motion.div className="form-group" whileFocus={{ scale: 1.02 }}>
                    <input type="date" placeholder={t('contact.form.date')} />
                  </motion.div>
                </div>
                <motion.div className="form-group" whileFocus={{ scale: 1.02 }}>
                  <textarea placeholder={t('contact.form.message')} rows={5}></textarea>
                </motion.div>
                <motion.button 
                  type="submit"
                  className="btn-primary submit-btn"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {t('contact.form.submit')}
                </motion.button>
              </motion.form>
            </motion.div>

            {/* Contact Information */}
            <motion.div className="contact-info-section" variants={itemVariants}>
              <h3>Thông tin liên hệ</h3>
              
              <div className="contact-info">
                <motion.div 
                  className="info-item"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="info-icon">📧</div>
                  <div className="info-content">
                    <h4>Email</h4>
                    <p>{t('footer.email')}</p>
                  </div>
                </motion.div>

                <motion.div 
                  className="info-item"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="info-icon">📱</div>
                  <div className="info-content">
                    <h4>Phone</h4>
                    <p>{t('footer.phone')}</p>
                  </div>
                </motion.div>

                <motion.div 
                  className="info-item"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="info-icon">📍</div>
                  <div className="info-content">
                    <h4>Address</h4>
                    <p>{t('footer.address')}</p>
                  </div>
                </motion.div>

                <motion.div 
                  className="info-item"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="info-icon">🕒</div>
                  <div className="info-content">
                    <h4>Working Hours</h4>
                    <p>Mon - Fri: 9:00 AM - 6:00 PM</p>
                    <p>Sat - Sun: 10:00 AM - 4:00 PM</p>
                  </div>
                </motion.div>
              </div>

              {/* Social Media */}
              <div className="social-media">
                <h4>Follow Us</h4>
                <div className="social-links">
                  <motion.a href="#" whileHover={{ scale: 1.2, rotate: 5 }}>📘</motion.a>
                  <motion.a href="#" whileHover={{ scale: 1.2, rotate: -5 }}>📷</motion.a>
                  <motion.a href="#" whileHover={{ scale: 1.2, rotate: 5 }}>🐦</motion.a>
                  <motion.a href="#" whileHover={{ scale: 1.2, rotate: -5 }}>💼</motion.a>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Map Section */}
      <section className="map-section">
        <motion.div 
          className="container"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="map-placeholder">
            <h3>Địa chỉ</h3>
            <p>Ho Chi Minh City, Vietnam</p>
            <div className="map-img">
              <img 
                src="https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80" 
                alt="Location Map" 
              />
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Contact; 