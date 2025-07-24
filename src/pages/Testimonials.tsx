import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Hero from '../components/Hero';

const Testimonials: React.FC = () => {
  const { t } = useTranslation();
  const [selectedTestimonial, setSelectedTestimonial] = useState(0);

  const testimonials = t('testimonials.couples', { returnObjects: true }) as Array<{
    name: string;
    text: string;
  }>;

  const detailedTestimonials = [
    {
      ...testimonials[0],
      rating: 5,
      date: "March 2024",
      event: "Traditional Gia Tiên Ceremony",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
      location: "Ho Chi Minh City"
    },
    {
      ...testimonials[1],
      rating: 5,
      date: "February 2024",
      event: "Modern Vietnamese Wedding",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
      location: "Hanoi"
    },
    {
      ...testimonials[2],
      rating: 5,
      date: "January 2024",
      event: "Complete Wedding Planning",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
      location: "Da Nang"
    },
    {
      name: "An & David",
      text: "As an international couple, we were worried about incorporating Vietnamese traditions properly. HayriWedding guided us through every step and created a beautiful ceremony that honored both cultures.",
      rating: 5,
      date: "December 2023",
      event: "Cross-Cultural Wedding",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
      location: "Ho Chi Minh City"
    },
    {
      name: "Hong & Nam",
      text: "The floral arrangements were absolutely stunning! Every detail was perfect and the team made our special day stress-free and magical.",
      rating: 5,
      date: "November 2023",
      event: "Floral Design & Decoration",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
      location: "Can Tho"
    },
    {
      name: "Vy & Kien",
      text: "HayriWedding transformed our vision into reality. The traditional setup was authentic and beautiful, and our families were so impressed with the attention to cultural details.",
      rating: 5,
      date: "October 2023",
      event: "Traditional Ceremony Setup",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
      location: "Hue"
    }
  ];

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

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`star ${i < rating ? 'filled' : ''}`}>
        ⭐
      </span>
    ));
  };

  return (
    <div className="testimonials-page">
      {/* Hero Section */}
      <Hero 
        backgroundImage="https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2048&q=80"
        customTitle={t('testimonials.title')}
        customSubtitle="Client Stories"
        customDescription = "Chia sẻ từ những cặp đôi đã đồng hành cùng chúng tôi trong ngày hạnh phúc"
        showButtons={false}
        showFloatingElements={false}
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
                  <div className="quote-icon">"</div>
                  <p>{detailedTestimonials[selectedTestimonial].text}</p>
                  <div className="testimonial-meta">
                    <img 
                      src={detailedTestimonials[selectedTestimonial].image} 
                      alt={detailedTestimonials[selectedTestimonial].name} 
                    />
                    <div className="meta-info">
                      <h3>{detailedTestimonials[selectedTestimonial].name}</h3>
                      <div className="rating">
                        {renderStars(detailedTestimonials[selectedTestimonial].rating)}
                      </div>
                      <span className="event">{detailedTestimonials[selectedTestimonial].event}</span>
                      <span className="location">{detailedTestimonials[selectedTestimonial].location} • {detailedTestimonials[selectedTestimonial].date}</span>
                    </div>
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
            What Our Clients Say
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
                <div className="card-header">
                  <img src={testimonial.image} alt={testimonial.name} />
                  <div className="header-info">
                    <h3>{testimonial.name}</h3>
                    <div className="rating-small">
                      {renderStars(testimonial.rating)}
                    </div>
                    <span className="date">{testimonial.date}</span>
                  </div>
                </div>
                <p className="testimonial-text">{testimonial.text}</p>
                <div className="card-footer">
                  <span className="event-type">{testimonial.event}</span>
                  <span className="location">{testimonial.location}</span>
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