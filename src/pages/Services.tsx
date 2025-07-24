import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Hero from '../components/Hero';

const Services: React.FC = () => {
  const { t } = useTranslation();

  const services = [
    {
      title: "Trang trí truyền thống",
      description: "Dịch vụ trang trí theo phong cách truyền thống với sắc đỏ và vàng, thể hiện sự trang nghiêm và ấm cúng trong ngày trọng đại.",
      icon: "🏮",
      price: "Từ 5.000.000 VNĐ",
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      features: [
        "Trang trí màu đỏ và vàng truyền thống",
        "Bố trí bàn thờ gia tiên",
        "Chuẩn bị lễ trà theo nghi lễ Việt Nam",
        "Phối hợp âm nhạc truyền thống",
        "Tư vấn phong tục tập quán"
      ]
    },
    {
      title: "Trang trí hoa tươi",
      description: "Mang đến không gian tươi mới và lãng mạn với hoa tươi được bố trí tinh tế trong mọi góc sự kiện.",
      icon: "🌸",
      price: "Từ 7.000.000 VNĐ",
      image: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      features: [
        "Hoa cầm tay cô dâu và các bó hoa trang trí",
        "Trang trí vòm cưới bằng hoa",
        "Hoa để bàn tiệc",
        "Rải cánh hoa trong lễ cưới",
        "Cung cấp hoa tươi tận nơi"
      ]
    },
    {
      title: "Trang trí phông nền",
      description: "Thiết kế phông nền riêng biệt kết hợp ánh sáng chuyên nghiệp để tạo điểm nhấn và không gian lý tưởng cho ghi hình.",
      icon: "✨",
      price: "Từ 6.000.000 VNĐ",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      features: [
        "Thiết kế phông nền theo yêu cầu",
        "Lắp đặt hệ thống ánh sáng chuyên nghiệp",
        "Trang trí sân khấu và bàn thờ",
        "Ánh sáng phù hợp để chụp hình",
        "Tạo không gian ấm cúng, lung linh"
      ]
    },
    {
      title: "Tổ chức & điều phối cưới",
      description: "Tư vấn, lập kế hoạch và điều phối toàn bộ lễ cưới để bạn yên tâm tận hưởng ngày trọng đại một cách trọn vẹn.",
      icon: "💍",
      price: "Từ 10.000.000 VNĐ",
      image: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      features: [
        "Điều phối toàn bộ chương trình lễ cưới",
        "Làm việc với nhà cung cấp dịch vụ",
        "Lập kế hoạch chi tiết theo timeline",
        "Hướng dẫn các nghi lễ truyền thống",
        "Điều phối sự kiện trong ngày"
      ]
    }
  ];

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
        backgroundImage="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2048&q=80"
        customTitle={t('services.title')}
        customSubtitle="Professional Services"
        customDescription={t('services.subtitle')}
        showButtons={false}
        showFloatingElements={false}
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
                key={index}
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
              {t('contact.form.submit')}
            </motion.button>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Services; 