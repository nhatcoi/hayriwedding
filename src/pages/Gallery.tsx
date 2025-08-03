import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Hero from '../components/Hero';
import galleryAlbumsData from '../data/galleryAlbums.json';
import bannersData from '../data/banners.json';

interface GalleryImage {
  id: number;
  src: string;
  title: string;
  description: string;
}

interface Category {
  id: number;
  name: string;
}

interface GalleryAlbum {
  id: number;
  thumbnail: string;
  category: Category;
  title: string;
  description: string;
  images: GalleryImage[];
}

const Gallery: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState(0);
  const [selectedAlbum, setSelectedAlbum] = useState<GalleryAlbum | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Import gallery data and generate filters
  const galleryAlbums: GalleryAlbum[] = galleryAlbumsData;
  
  // Generate unique filters from albums data
  const filters = [
    { id: 0, name: 'All' },
    ...Array.from(
      new Set(galleryAlbums.map(album => album.category.id))
    ).map(categoryId => {
      const category = galleryAlbums.find(album => album.category.id === categoryId)?.category;
      return { id: categoryId, name: category?.name || '' };
    })
  ];



  const filteredAlbums = activeFilter === 0
    ? galleryAlbums 
    : galleryAlbums.filter(album => album.category.id === activeFilter);

  // Pagination calculations
  const totalPages = Math.ceil(filteredAlbums.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageAlbums = filteredAlbums.slice(startIndex, endIndex);

  // Handle filter change - reset to page 1
  const handleFilterChange = (filterId: number) => {
    setActiveFilter(filterId);
    setCurrentPage(1);
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of gallery
    document.querySelector('.gallery-content')?.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start' 
    });
  };

  // Handle album selection
  const handleAlbumClick = (album: GalleryAlbum) => {
    setSelectedAlbum(album);
    setCurrentImageIndex(0);
  };

  // Handle image navigation in modal with direction tracking
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right');

  const handlePrevImage = () => {
    if (selectedAlbum) {
      setSlideDirection('left');
      setCurrentImageIndex(prev => 
        prev === 0 ? selectedAlbum.images.length - 1 : prev - 1
      );
    }
  };

  const handleNextImage = () => {
    if (selectedAlbum) {
      setSlideDirection('right');
      setCurrentImageIndex(prev => 
        prev === selectedAlbum.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  // Get preview images for carousel effect
  const getPrevImageIndex = () => {
    if (!selectedAlbum) return -1;
    return currentImageIndex === 0 ? selectedAlbum.images.length - 1 : currentImageIndex - 1;
  };

  const getNextImageIndex = () => {
    if (!selectedAlbum) return -1;
    return currentImageIndex === selectedAlbum.images.length - 1 ? 0 : currentImageIndex + 1;
  };

  // Keyboard navigation for modal
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!selectedAlbum) return;

      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();
          handlePrevImage();
          break;
        case 'ArrowRight':
          event.preventDefault();
          handleNextImage();
          break;
        case 'Escape':
          event.preventDefault();
          setSelectedAlbum(null);
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedAlbum]);

  // Close modal when clicking outside
  const handleModalClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setSelectedAlbum(null);
    }
  };

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
        backgroundImage={bannersData.gallery.backgroundImage}
        customTitle={bannersData.gallery.title}
        customSubtitle={bannersData.gallery.subtitle}
        customDescription={bannersData.gallery.description}
        showButtons={bannersData.gallery.showButtons}
        showFloatingElements={bannersData.gallery.showFloatingElements}
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
                key={filter.id}
                className={`filter-btn ${activeFilter === filter.id ? 'active' : ''}`}
                onClick={() => handleFilterChange(filter.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {filter.name}
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
              {currentPageAlbums.map((album, index) => (
                <motion.div
                  key={album.id}
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
                  onClick={() => handleAlbumClick(album)}
                  layoutId={`album-${album.id}`}
                >
                  <img src={album.thumbnail} alt={album.title} />
                  <div className="gallery-overlay">
                    <div className="gallery-info">
                      <h3>{album.title}</h3>
                      <p>{album.description}</p>
                      {/*<span className="album-count">{album.images.length} ảnh</span>*/}
                      <span className="view-btn">Xem Chi Tiết</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <motion.div 
              className="pagination"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <motion.button
                className={`pagination-btn ${currentPage === 1 ? 'disabled' : ''}`}
                onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                whileHover={{ scale: currentPage > 1 ? 1.05 : 1 }}
                whileTap={{ scale: currentPage > 1 ? 0.95 : 1 }}
                disabled={currentPage === 1}
              >
                ← Trước
              </motion.button>

              <div className="pagination-numbers">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <motion.button
                    key={pageNum}
                    className={`pagination-number ${currentPage === pageNum ? 'active' : ''}`}
                    onClick={() => handlePageChange(pageNum)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {pageNum}
                  </motion.button>
                ))}
              </div>

              <motion.button
                className={`pagination-btn ${currentPage === totalPages ? 'disabled' : ''}`}
                onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                whileHover={{ scale: currentPage < totalPages ? 1.05 : 1 }}
                whileTap={{ scale: currentPage < totalPages ? 0.95 : 1 }}
                disabled={currentPage === totalPages}
              >
                Sau →
              </motion.button>
            </motion.div>
          )}

          {/* Pagination Info */}
          <motion.div 
            className="pagination-info"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <p>Hiển thị {startIndex + 1}-{Math.min(endIndex, filteredAlbums.length)} của {filteredAlbums.length} bộ sưu tập</p>
          </motion.div>
        </div>
      </section>

      {/* Album Modal */}
      <AnimatePresence>
        {selectedAlbum && (
          <motion.div 
            className="album-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleModalClick}
          >
            <motion.div 
              className="modal-content"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="carousel-container">
                {/* Previous Preview Image */}
                {selectedAlbum.images.length > 1 && (
                  <motion.div 
                    className="preview-image-container prev-preview"
                    key={`prev-${currentImageIndex}`}
                    initial={{ opacity: 0, x: -30, scale: 0.9 }}
                    animate={{ opacity: 0.6, x: 0, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    whileHover={{ opacity: 0.9, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <img 
                      src={selectedAlbum.images[getPrevImageIndex()].src}
                      alt="Previous"
                      className="preview-image"
                      onClick={handlePrevImage}
                    />
                  </motion.div>
                )}

                {/* Main Image */}
                <motion.div 
                  className="main-image-container"
                  key={currentImageIndex}
                  initial={{ 
                    opacity: 0, 
                    x: slideDirection === 'right' ? 100 : -100,
                    scale: 0.95
                  }}
                  animate={{ 
                    opacity: 1, 
                    x: 0, 
                    scale: 1 
                  }}
                  exit={{ 
                    opacity: 0, 
                    x: slideDirection === 'right' ? -100 : 100,
                    scale: 0.95
                  }}
                  transition={{ 
                    duration: 0.5, 
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                >
                  <img 
                    src={selectedAlbum.images[currentImageIndex].src} 
                    alt={selectedAlbum.images[currentImageIndex].title}
                    className="modal-image-main"
                  />
                </motion.div>

                {/* Next Preview Image */}
                {selectedAlbum.images.length > 1 && (
                  <motion.div 
                    className="preview-image-container next-preview"
                    key={`next-${currentImageIndex}`}
                    initial={{ opacity: 0, x: 30, scale: 0.9 }}
                    animate={{ opacity: 0.6, x: 0, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    whileHover={{ opacity: 0.9, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <img 
                      src={selectedAlbum.images[getNextImageIndex()].src}
                      alt="Next"
                      className="preview-image"
                      onClick={handleNextImage}
                    />
                  </motion.div>
                )}
                
                <button 
                  className="modal-close-btn"
                  onClick={() => setSelectedAlbum(null)}
                  aria-label="Close album"
                  title="Close album (Esc)"
                >
                  ✕
                </button>
                
                {selectedAlbum.images.length > 1 && (
                  <>
                    <button 
                      className="nav-btn prev-btn"
                      onClick={handlePrevImage}
                      aria-label="Previous image"
                      title="Previous image (←)"
                    >
                      ←
                    </button>
                    <button 
                      className="nav-btn next-btn"
                      onClick={handleNextImage}
                      aria-label="Next image"
                      title="Next image (→)"
                    >
                      →
                    </button>
                  </>
                )}
              </div>
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
              Báo Giá
            </motion.button>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Gallery; 