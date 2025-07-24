import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Hero from '../components/Hero';

interface GalleryImage {
  id: number;
  src: string;
  title: string;
  description: string;
}

interface GalleryAlbum {
  id: number;
  thumbnail: string;
  category: string;
  title: string;
  description: string;
  images: GalleryImage[];
}

const Gallery: React.FC = () => {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedAlbum, setSelectedAlbum] = useState<GalleryAlbum | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const filters = [
    { key: 'all', label: 'All' },
    { key: 'traditional', label: 'Nghi lễ truyền thống' },
    { key: 'floral', label: 'Trang trí hoa' },
    { key: 'backdrop', label: 'Backdrops' },
    { key: 'reception', label: 'Khác' }
  ];

  const galleryAlbums: GalleryAlbum[] = [
    {
      id: 1,
      thumbnail: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: 'traditional',
      title: 'Trang Trí Lễ Cưới Truyền Thống',
      description: 'Trang trí lễ cưới truyền thống với sắc đỏ và vàng tuyệt đẹp',
      images: [
        {
          id: 1,
          src: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
          title: 'Không gian chính',
          description: 'Trang trí chính với màu đỏ vàng truyền thống'
        },
        {
          id: 2,
          src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
          title: 'Chi tiết trang trí',
          description: 'Các chi tiết nhỏ trong lễ cưới truyền thống'
        },
        {
          id: 3,
          src: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
          title: 'Bàn thờ gia tiên',
          description: 'Bàn thờ trang nghiêm cho nghi lễ'
        }
      ]
    },
    {
      id: 2,
      thumbnail: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: 'floral',
      title: 'Trang Trí Hoa Tinh Tế',
      description: 'Thiết kế hoa sang trọng kết hợp nét truyền thống Việt Nam',
      images: [
        {
          id: 4,
          src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
          title: 'Hoa cưới chính',
          description: 'Thiết kế hoa chính cho lễ cưới'
        },
        {
          id: 5,
          src: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
          title: 'Hoa cầm tay cô dâu',
          description: 'Bó hoa cưới đặc biệt cho cô dâu'
        },
        {
          id: 6,
          src: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
          title: 'Trang trí bàn tiệc',
          description: 'Hoa trang trí bàn tiệc sang trọng'
        }
      ]
    },
    {
      id: 3,
      thumbnail: "https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: 'reception',
      title: 'Trang Trí Tiệc Cưới',
      description: 'Không gian tiệc cưới thanh lịch với ánh sáng lãng mạn',
      images: [
        {
          id: 7,
          src: "https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
          title: 'Không gian tiệc',
          description: 'Không gian tiệc cưới sang trọng'
        },
        {
          id: 8,
          src: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
          title: 'Ánh sáng tiệc cưới',
          description: 'Hệ thống ánh sáng chuyên nghiệp'
        },
        {
          id: 9,
          src: "https://images.unsplash.com/photo-1478146896981-b80fe463b330?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
          title: 'Bố cục bàn tiệc',
          description: 'Bố trí bàn ghế hoàn hảo'
        }
      ]
    },
    {
      id: 4,
      thumbnail: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: 'backdrop',
      title: 'Phông Nền Lễ Cưới',
      description: 'Phông nền nổi bật với hệ thống ánh sáng chuyên nghiệp',
      images: [
        {
          id: 10,
          src: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
          title: 'Phông chính',
          description: 'Phông nền chính cho buổi lễ'
        },
        {
          id: 11,
          src: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
          title: 'Vòm hoa cưới',
          description: 'Vòm cưới trang trí hoa tươi'
        },
        {
          id: 12,
          src: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
          title: 'Backdrop chụp ảnh',
          description: 'Góc chụp ảnh đặc biệt cho cô dâu chú rể'
        }
      ]
    },
    {
      id: 5,
      thumbnail: "https://images.unsplash.com/photo-1597149738901-e7c15c2ca2b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: 'traditional',
      title: 'Trang Trí Lễ Trà',
      description: 'Bố trí lễ trà truyền thống theo phong tục Việt Nam',
      images: [
        {
          id: 13,
          src: "https://images.unsplash.com/photo-1597149738901-e7c15c2ca2b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
          title: 'Bàn lễ trà',
          description: 'Bàn lễ trà truyền thống'
        },
        {
          id: 14,
          src: "https://images.unsplash.com/photo-1574169208507-84376144848b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
          title: 'Trang phục áo dài',
          description: 'Không gian trang phục áo dài'
        },
        {
          id: 15,
          src: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
          title: 'Nghi thức cúng bái',
          description: 'Không gian trang nghiêm cho nghi thức'
        }
      ]
    },
    {
      id: 6,
      thumbnail: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: 'floral',
      title: 'Hoa Sen Truyền Thống',
      description: 'Trang trí với hoa sen - biểu tượng của sự thuần khiết',
      images: [
        {
          id: 16,
          src: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
          title: 'Hoa sen chính',
          description: 'Trang trí hoa sen tươi'
        },
        {
          id: 17,
          src: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
          title: 'Lá sen trang trí',
          description: 'Lá sen xanh mướt làm nền'
        },
        {
          id: 18,
          src: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
          title: 'Hồ sen mini',
          description: 'Hồ sen mini trang trí'
        }
      ]
    },
    {
      id: 7,
      thumbnail: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: 'backdrop',
      title: 'Phông Cưới Hiện Đại',
      description: 'Phông nền hiện đại kết hợp truyền thống',
      images: [
        {
          id: 19,
          src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
          title: 'Phông hiện đại',
          description: 'Thiết kế phông cưới hiện đại'
        },
        {
          id: 20,
          src: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
          title: 'Ánh sáng LED',
          description: 'Hệ thống đèn LED hiện đại'
        },
        {
          id: 21,
          src: "https://images.unsplash.com/photo-1540206276207-3af25c08abc4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
          title: 'Backdrop 3D',
          description: 'Phông nền 3D độc đáo'
        }
      ]
    },
    {
      id: 8,
      thumbnail: "https://images.unsplash.com/photo-1516997121675-4c2d1684aa3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: 'reception',
      title: 'Tiệc Cưới Ngoài Trời',
      description: 'Không gian tiệc cưới ngoài trời lãng mạn',
      images: [
        {
          id: 22,
          src: "https://images.unsplash.com/photo-1516997121675-4c2d1684aa3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
          title: 'Sân vườn tiệc cưới',
          description: 'Không gian sân vườn xanh mát'
        },
        {
          id: 23,
          src: "https://images.unsplash.com/photo-1519167758481-83f29c52c7d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
          title: 'Đèn trang trí ngoài trời',
          description: 'Hệ thống đèn trang trí sân vườn'
        },
        {
          id: 24,
          src: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
          title: 'Bàn tiệc sân vườn',
          description: 'Bố trí bàn tiệc ngoài trời'
        }
      ]
    },
    {
      id: 9,
      thumbnail: "https://images.unsplash.com/photo-1525258436361-c79ad5426e81?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: 'traditional',
      title: 'Lễ Thành Hôn Truyền Thống',
      description: 'Nghi thức thành hôn theo phong tục cổ truyền',
      images: [
        {
          id: 25,
          src: "https://images.unsplash.com/photo-1525258436361-c79ad5426e81?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
          title: 'Lễ cưới truyền thống',
          description: 'Không gian lễ cưới cổ truyền'
        },
        {
          id: 26,
          src: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
          title: 'Bàn thờ gia tiên',
          description: 'Bàn thờ trang nghiêm'
        },
        {
          id: 27,
          src: "https://images.unsplash.com/photo-1516997121675-4c2d1684aa3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
          title: 'Mâm quả cưới',
          description: 'Mâm quả truyền thống'
        }
      ]
    },
    {
      id: 10,
      thumbnail: "https://images.unsplash.com/photo-1556287784-c79d6bb8bf92?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: 'floral',
      title: 'Hoa Lan Trắng Thanh Khiết',
      description: 'Trang trí với hoa lan trắng tinh khôi',
      images: [
        {
          id: 28,
          src: "https://images.unsplash.com/photo-1556287784-c79d6bb8bf92?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
          title: 'Hoa lan trắng',
          description: 'Hoa lan trắng tinh khôi'
        },
        {
          id: 29,
          src: "https://images.unsplash.com/photo-1487070183336-b863922373d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
          title: 'Trang trí bàn hoa lan',
          description: 'Bàn trang trí hoa lan sang trọng'
        },
        {
          id: 30,
          src: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
          title: 'Lối đi hoa lan',
          description: 'Lối đi trang trí hoa lan'
        }
      ]
    },
    {
      id: 11,
      thumbnail: "https://images.unsplash.com/photo-1478146896981-b80fe463b330?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: 'reception',
      title: 'Tiệc Cưới Trong Nhà',
      description: 'Không gian tiệc cưới trong nhà ấm cúng',
      images: [
        {
          id: 31,
          src: "https://images.unsplash.com/photo-1478146896981-b80fe463b330?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
          title: 'Sảnh tiệc chính',
          description: 'Sảnh tiệc trong nhà sang trọng'
        },
        {
          id: 32,
          src: "https://images.unsplash.com/photo-1540206276207-3af25c08abc4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
          title: 'Trang trí trần nhà',
          description: 'Trang trí trần nhà lộng lẫy'
        },
        {
          id: 33,
          src: "https://images.unsplash.com/photo-1487070183336-b863922373d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
          title: 'Ánh sáng ấm áp',
          description: 'Hệ thống ánh sáng ấm áp'
        }
      ]
    },
    {
      id: 12,
      thumbnail: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: 'backdrop',
      title: 'Phông Cưới Sang Trọng',
      description: 'Phông nền sang trọng với chất liệu cao cấp',
      images: [
        {
          id: 34,
          src: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
          title: 'Phông sang trọng',
          description: 'Phông nền vải cao cấp'
        },
        {
          id: 35,
          src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
          title: 'Chi tiết trang trí',
          description: 'Chi tiết trang trí tinh xảo'
        },
        {
          id: 36,
          src: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
          title: 'Ánh sáng spotlight',
          description: 'Hệ thống ánh sáng chuyên nghiệp'
        }
      ]
    },
    {
      id: 13,
      thumbnail: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: 'traditional',
      title: 'Trang Trí Altar Cưới',
      description: 'Bàn thờ cưới trang trọng theo phong tục',
      images: [
        {
          id: 37,
          src: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
          title: 'Bàn thờ cưới',
          description: 'Bàn thờ cưới trang nghiêm'
        },
        {
          id: 38,
          src: "https://images.unsplash.com/photo-1574169208507-84376144848b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
          title: 'Đồ thờ cúng',
          description: 'Đồ thờ cúng truyền thống'
        },
        {
          id: 39,
          src: "https://images.unsplash.com/photo-1525258436361-c79ad5426e81?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
          title: 'Hương đèn trang trọng',
          description: 'Hương đèn trong nghi lễ'
        }
      ]
    },
    {
      id: 14,
      thumbnail: "https://images.unsplash.com/photo-1574169208507-84376144848b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: 'traditional',
      title: 'Áo Dài Cưới Truyền Thống',
      description: 'Không gian cho áo dài cưới Việt Nam',
      images: [
        {
          id: 40,
          src: "https://images.unsplash.com/photo-1574169208507-84376144848b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
          title: 'Áo dài cô dâu',
          description: 'Áo dài cưới truyền thống đỏ'
        },
        {
          id: 41,
          src: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
          title: 'Phụ kiện áo dài',
          description: 'Phụ kiện truyền thống đi kèm'
        },
        {
          id: 42,
          src: "https://images.unsplash.com/photo-1597149738901-e7c15c2ca2b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
          title: 'Không gian thay đồ',
          description: 'Không gian thay áo dài đẹp'
        }
      ]
    },
    {
      id: 15,
      thumbnail: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: 'reception',
      title: 'Tiệc Cưới Ánh Nến',
      description: 'Tiệc cưới lãng mạn với ánh nến ấm áp',
      images: [
        {
          id: 43,
          src: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
          title: 'Tiệc ánh nến',
          description: 'Không gian tiệc với nến trang trí'
        },
        {
          id: 44,
          src: "https://images.unsplash.com/photo-1519167758481-83f29c52c7d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
          title: 'Bàn nến lãng mạn',
          description: 'Bàn tiệc với nến trang trí'
        },
        {
          id: 45,
          src: "https://images.unsplash.com/photo-1478146896981-b80fe463b330?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
          title: 'Ánh sáng nến ấm áp',
          description: 'Ánh nến tạo không khí ấm cúng'
        }
      ]
    }
  ];

  const filteredAlbums = activeFilter === 'all'
    ? galleryAlbums 
    : galleryAlbums.filter(album => album.category === activeFilter);

  // Pagination calculations
  const totalPages = Math.ceil(filteredAlbums.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageAlbums = filteredAlbums.slice(startIndex, endIndex);

  // Handle filter change - reset to page 1
  const handleFilterChange = (filterKey: string) => {
    setActiveFilter(filterKey);
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

  // Handle image navigation in modal
  const handlePrevImage = () => {
    if (selectedAlbum) {
      setCurrentImageIndex(prev => 
        prev === 0 ? selectedAlbum.images.length - 1 : prev - 1
      );
    }
  };

  const handleNextImage = () => {
    if (selectedAlbum) {
      setCurrentImageIndex(prev => 
        prev === selectedAlbum.images.length - 1 ? 0 : prev + 1
      );
    }
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
        backgroundImage="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
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
                onClick={() => handleFilterChange(filter.key)}
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
                      <span className="album-count">{album.images.length} ảnh</span>
                      <span className="view-btn">{t('gallery.viewDetails')}</span>
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
              <div className="image-only-container">
                <img 
                  src={selectedAlbum.images[currentImageIndex].src} 
                  alt={selectedAlbum.images[currentImageIndex].title}
                  className="modal-image-only"
                />
                
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
              {t('hero.getQuote')}
            </motion.button>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Gallery; 