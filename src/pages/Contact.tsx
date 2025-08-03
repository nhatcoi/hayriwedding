import React from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import bannersData from '../data/banners.json';
import navigationData from '../data/navigation.json';

const Contact: React.FC = () => {

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
      {/* <Hero 
        backgroundImage={bannersData.contact.backgroundImage}
        customTitle={bannersData.contact.title}
        customSubtitle={bannersData.contact.subtitle}
        customDescription={bannersData.contact.description}
        showButtons={bannersData.contact.showButtons}
        showFloatingElements={bannersData.contact.showFloatingElements}
      /> */}

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
                    <input type="text" placeholder={navigationData.contact.form.name} required />
                  </motion.div>
                  <motion.div className="form-group" whileFocus={{ scale: 1.02 }}>
                    <input type="email" placeholder={navigationData.contact.form.email} required />
                  </motion.div>
                </div>
                <div className="form-row">
                  <motion.div className="form-group" whileFocus={{ scale: 1.02 }}>
                    <input type="tel" placeholder={navigationData.contact.form.phone} />
                  </motion.div>
                  <motion.div className="form-group" whileFocus={{ scale: 1.02 }}>
                    <input type="date" placeholder={navigationData.contact.form.date} />
                  </motion.div>
                </div>
                <motion.div className="form-group" whileFocus={{ scale: 1.02 }}>
                  <textarea placeholder={navigationData.contact.form.message} rows={5}></textarea>
                </motion.div>
                <motion.button 
                  type="submit"
                  className="btn-primary submit-btn"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {navigationData.contact.form.submit}
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
                  <div className="info-icon"></div>
                  <div className="info-content">
                    <h4>Email</h4>
                    <p>{navigationData.footer.email}</p>
                  </div>
                </motion.div>

                <motion.div 
                  className="info-item"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="info-icon"></div>
                  <div className="info-content">
                    <h4>Phone</h4>
                    <p>{navigationData.footer.phone}</p>
                  </div>
                </motion.div>

                <motion.div 
                  className="info-item"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="info-icon"></div>
                  <div className="info-content">
                    <h4>Address</h4>
                    <p>{navigationData.footer.address}</p>
                  </div>
                </motion.div>

                <motion.div 
                  className="info-item"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="info-icon"></div>
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
                  <motion.a
                    href="https://www.facebook.com/hayriwedding"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0"/>
                    </svg>
                  </motion.a>
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