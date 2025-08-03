import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Hero from '../components/Hero';
import bannersData from '../data/banners.json';
import testimonialsData from '../data/testimonials.json';

interface TestimonialImage {
  image: string;
}

const Testimonials: React.FC = () => {
  const [selectedTestimonial, setSelectedTestimonial] = useState(0);

  const detailedTestimonials: TestimonialImage[] = testimonialsData;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
    <div className="testimonials-page">
      {/* Hero Section */}
      <Hero 
        backgroundImage={bannersData.testimonials.backgroundImage}
        customTitle={bannersData.testimonials.title}
        customSubtitle={bannersData.testimonials.subtitle}
        customDescription={bannersData.testimonials.description}
        showButtons={bannersData.testimonials.showButtons}
        showFloatingElements={bannersData.testimonials.showFloatingElements}
      />

      {/* Featured Testimonial */}
      <section className="featured-testimonial">
        <motion.div 
          className="container"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="featured-content">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedTestimonial}
                className="featured-card"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
              >
                <div className="testimonial-content">
                  <div className="testimonial-image-large">
                    <img 
                      src={detailedTestimonials[selectedTestimonial].image} 
                      alt="Đánh giá dịch vụ cưới" 
                    />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Dots */}
            <div className="testimonial-nav">
              {detailedTestimonials.map((_, index) => (
                <motion.button
                  key={index}
                  className={`nav-dot ${index === selectedTestimonial ? 'active' : ''}`}
                  onClick={() => setSelectedTestimonial(index)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* All Testimonials Grid */}
      <section className="testimonials-grid">
        <motion.div 
          className="container"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2 variants={itemVariants} className="section-title">
            Đánh Giá Về Chúng Tôi
          </motion.h2>

          <div className="testimonials-list">
            {detailedTestimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="testimonial-card"
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.02 }}
                onClick={() => setSelectedTestimonial(index)}
              >
                <div className="testimonial-card-image">
                  <img src={testimonial.image} alt="Đánh giá dịch vụ cưới" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Statistics Section */}
      <section className="testimonials-stats">
        <motion.div 
          className="container"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
        <div className="stats-grid">
          <motion.div className="stat-item" whileHover={{ scale: 1.05 }}>
            <div className="stat-number">100+</div>
            <div className="stat-label">Cặp đôi hạnh phúc</div>
          </motion.div>

          <motion.div className="stat-item" whileHover={{ scale: 1.05 }}>
            <div className="stat-number">5.0</div>
            <div className="stat-label">Đánh giá trung bình</div>
          </motion.div>

          <motion.div className="stat-item" whileHover={{ scale: 1.05 }}>
            <div className="stat-number">10+</div>
            <div className="stat-label">Năm kinh nghiệm</div>
          </motion.div>

          <motion.div className="stat-item" whileHover={{ scale: 1.05 }}>
            <div className="stat-number">100%</div>
            <div className="stat-label">Mức độ hài lòng</div>
          </motion.div>
        </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="testimonials-cta">
        <motion.div 
          className="container"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
        <div className="cta-content">
          <h2>Sẵn sàng viết nên câu chuyện hạnh phúc của riêng bạn?</h2>
          <p>Hãy cùng hàng trăm cặp đôi đã tin tưởng chúng tôi trong ngày trọng đại</p>
          <motion.button 
            className="btn-primary large"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Bắt đầu hành trình của bạn
          </motion.button>
        </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Testimonials; 