import React from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import servicesData from '../data/services.json';
import bannersData from '../data/banners.json';

interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  price: string;
  image: string;
  features: string[];
}

const Services: React.FC = () => {

  // Import services data from JSON
  const services: Service[] = servicesData;

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
    <div className="services-page">
      {/* Hero Section */}
      <Hero 
        backgroundImage={bannersData.services.backgroundImage}
        customTitle={bannersData.services.title}
        customSubtitle={bannersData.services.subtitle}
        customDescription={bannersData.services.description}
        showButtons={bannersData.services.showButtons}
        showFloatingElements={bannersData.services.showFloatingElements}
      />

      {/* Services Detail Section */}
      <section className="services-detail">
        <motion.div 
          className="container"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="services-list">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                className={`service-detail-card ${index % 2 === 1 ? 'reverse' : ''}`}
                variants={itemVariants}
              >
                <div className="service-image-container">
                  <motion.img 
                    src={service.image} 
                    alt={service.title}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  />
                  <div className="service-icon-overlay">
                    <span className="service-icon-large">{service.icon}</span>
                  </div>
                </div>
                
                <div className="service-content-detail">
                  <h3>{service.title}</h3>
                  <p className="service-description">{service.description}</p>
                  
                  <div className="service-features">
                    <h4>Các dịch vụ bao gồm:</h4>
                    <ul>
                      {service.features.map((feature, featureIndex) => (
                        <motion.li 
                          key={featureIndex}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: featureIndex * 0.1 }}
                          viewport={{ once: true }}
                        >
                          ✓ {feature}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="service-pricing">
                    <span className="price">{service.price}</span>
                    <motion.button 
                      className="btn-primary"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Nhận Báo Giá
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="services-cta">
        <motion.div 
          className="container"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="cta-content">
            <h2>Sẵn sàng lên kế hoạch cho lễ cưới hoàn hảo của bạn?</h2>
            <p>Hãy để đội ngũ giàu kinh nghiệm của chúng tôi tạo nên một lễ cưới truyền thống Việt Nam như bạn hằng mơ ước</p>
            <motion.button 
              className="btn-primary large"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Gửi Tin Nhắn
            </motion.button>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Services; 