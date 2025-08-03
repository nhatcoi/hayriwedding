import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import specialServicesData from '../data/specialServices.json';
import galleryHomeData from '../data/galleryHome.json';
import testimonialsHomeData from '../data/testimonialsHome.json';
import bannersData from '../data/banners.json';

interface SpecialService {
  id: number;
  title: string;
  description: string;
  icon: string;
  price: string;
  image: string;
}

interface Testimonial {
  id: number;
  name: string;
  text: string;
}

const Home: React.FC = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Import data from JSON files
  const specialServices: SpecialService[] = specialServicesData;
  const galleryHome: string[] = galleryHomeData;
  const testimonials: Testimonial[] = testimonialsHomeData;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

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
    <div className="home-page">
      {/* Hero Section */}
      <Hero 
        backgroundImage={bannersData.home.backgroundImage}
        customTitle={bannersData.home.title}
        customSubtitle={bannersData.home.subtitle}
        customDescription={bannersData.home.description}
        showButtons={bannersData.home.showButtons}
        showFloatingElements={bannersData.home.showFloatingElements}
      />

      {/* Featured Services Section */}
      <section className="featured-services">
        <motion.div 
          className="container"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h2 variants={itemVariants} className="section-title">
            Dịch Vụ Cao Cấp
          </motion.h2>
          <motion.p variants={itemVariants} className="section-subtitle">
            Những lễ cưới được tổ chức tinh tế, tôn vinh truyền thống Việt Nam với vẻ đẹp hiện đại
          </motion.p>
          
          <div className="services-grid">
            {specialServices.map((service, index) => (
              <motion.div
                key={index}
                className="service-card featured"
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.03,
                  y: -5,
                  transition: { type: "spring", stiffness: 300, damping: 20 }
                }}
              >
                <div className="service-image">
                  <img src={service.image} alt={service.title} />
                  <div className="service-overlay">
                    <div className="service-icon">{service.icon}</div>
                  </div>
                </div>
                <div className="service-content">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <div className="service-price">{service.price}</div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div variants={itemVariants} className="cta-section">
            <Link to="/services" className="btn-primary">
              Dịch Vụ →
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Gallery Preview Section */}
      <section className="gallery-preview">
        <motion.div 
          className="container"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2 variants={itemVariants} className="section-title">
            Tác Phẩm Đẹp
          </motion.h2>
          <motion.p variants={itemVariants} className="section-subtitle">
            Cùng chiêm ngưỡng những lễ cưới kỳ diệu chúng tôi đã tạo ra
          </motion.p>
          
          <div className="gallery-grid">
            {galleryHome.slice(0, 6).map((image, index) => (
              <motion.div
                key={index}
                className="gallery-item"
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.1,
                  y: -10,
                  transition: { type: "spring", stiffness: 300, damping: 20 }
                }}
              >
                <img src={image} alt={`Gallery ${index + 1}`} />
                <div className="gallery-overlay">
                  <span>Xem Chi Tiết</span>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div variants={itemVariants} className="cta-section">
            <Link to="/gallery" className="btn-secondary">
              Thư Viện →
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-preview">
        <motion.div 
          className="container"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2 variants={itemVariants} className="section-title">
            Cảm Nhận Của Khách Hàng
          </motion.h2>
          
          <div className="testimonials-slider">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                className="testimonial-card"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ type: "spring", stiffness: 80, damping: 20 }}
              >
                <div className="testimonial-content">
                  <p>"{testimonials[currentTestimonial]?.text}"</p>
                  <div className="testimonial-author">
                    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=80&q=80" alt="" />
                    <span>{testimonials[currentTestimonial]?.name}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            
            <div className="testimonial-dots">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  className={`dot ${index === currentTestimonial ? 'active' : ''}`}
                  onClick={() => setCurrentTestimonial(index)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>
          </div>

          <motion.div variants={itemVariants} className="cta-section">
            <Link to="/testimonials" className="btn-primary">
              Đánh Giá →
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};

export default Home; 