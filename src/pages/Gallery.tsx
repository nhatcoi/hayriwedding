import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Hero from '../components/Hero';

const Gallery: React.FC = () => {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const filters = [
    { key: 'all', label: 'All' },
    { key: 'traditional', label: 'Nghi lễ truyền thống' },
    { key: 'floral', label: 'Trang trí hoa' },
    { key: 'backdrop', label: 'Backdrops' },
    { key: 'reception', label: 'Khác' }
  ];

  const galleryImages = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      category: 'traditional',
      title: 'Trang Trí Lễ Cưới Truyền Thống',
      description: 'Trang trí lễ cưới truyền thống với sắc đỏ và vàng tuyệt đẹp'
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      category: 'floral',
      title: 'Trang Trí Hoa Tinh Tế',
      description: 'Thiết kế hoa sang trọng kết hợp nét truyền thống Việt Nam'
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      category: 'reception',
      title: 'Trang Trí Tiệc Cưới',
      description: 'Không gian tiệc cưới thanh lịch với ánh sáng lãng mạn'
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      category: 'backdrop',
      title: 'Phông Nền Lễ Cưới',
      description: 'Phông nền nổi bật với hệ thống ánh sáng chuyên nghiệp'
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      category: 'floral',
      title: 'Bộ Sưu Tập Hoa Cầm Tay Cô Dâu',
      description: 'Bó hoa cô dâu thủ công từ hoa tươi'
    },
    {
      id: 6,
      src: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      category: 'traditional',
      title: 'Bố Trí Bàn Thờ Gia Tiên',
      description: 'Bàn thờ tổ tiên truyền thống với trang trí trang nghiêm'
    },
    {
      id: 7,
      src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      category: 'reception',
      title: 'Bố Trí Bàn Tiệc',
      description: 'Bố trí bàn tiệc tinh tế cho tiệc cưới'
    },
    {
      id: 8,
      src: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      category: 'backdrop',
      title: 'Trang Trí Vòm Cưới',
      description: 'Vòm cưới đẹp mắt với hoa tươi trang trí'
    },
    {
      id: 9,
      src: "https://images.unsplash.com/photo-1597149738901-e7c15c2ca2b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      category: 'traditional',
      title: 'Trang Trí Lễ Trà',
      description: 'Bố trí lễ trà truyền thống theo phong tục Việt Nam'
    }
  ];

  const filteredImages = activeFilter === 'all'
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeFilter);

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
    <div className="gallery-page">
      {/* Hero Section */}
      <Hero 
        backgroundImage="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
        customTitle={t('gallery.title')}
        customSubtitle="Our Portfolio"
        customDescription={t('gallery.subtitle')}
        showButtons={false}
        showFloatingElements={false}
      />

      {/* Gallery Section */}
      <section className="gallery-content">
        <div className="container">
          {/* Filter Buttons */}
          <motion.div 
            className="gallery-filters"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {filters.map((filter) => (
              <motion.button
                key={filter.key}
                className={`filter-btn ${activeFilter === filter.key ? 'active' : ''}`}
                onClick={() => setActiveFilter(filter.key)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {filter.label}
              </motion.button>
            ))}
          </motion.div>

          {/* Gallery Grid */}
          <motion.div 
            className="gallery-grid"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            key={activeFilter}
          >
            <AnimatePresence>
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  className="gallery-item"
                  variants={itemVariants}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ 
                    scale: 1.05,
                    y: -10,
                    transition: { type: "spring", stiffness: 300, damping: 20 }
                  }}
                  onClick={() => setSelectedImage(image.src)}
                  layoutId={`image-${image.id}`}
                >
                  <img src={image.src} alt={image.title} />
                  <div className="gallery-overlay">
                    <div className="gallery-info">
                      <h3>{image.title}</h3>
                      <p>{image.description}</p>
                      <span className="view-btn">{t('gallery.viewDetails')}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            className="image-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div 
              className="modal-content"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img src={selectedImage} alt="Gallery Detail" />
              <button 
                className="close-btn"
                onClick={() => setSelectedImage(null)}
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA Section */}
      <section className="gallery-cta">
        <motion.div 
          className="container"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="cta-content">
            <h2>Sẵn sàng viết nên câu chuyện của riêng bạn?</h2>
            <p>Hãy để chúng tôi thiết kế một lễ cưới truyền thống Việt Nam thật đẹp dành riêng cho bạn</p>
            <motion.button 
              className="btn-primary large"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {t('hero.getQuote')}
            </motion.button>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Gallery; 