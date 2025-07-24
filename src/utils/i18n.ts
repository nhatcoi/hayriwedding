import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// English translations
const en = {
  translation: {
    nav: {
      home: "Home",
      services: "Services",
      gallery: "Gallery",
      testimonials: "Testimonials",
      contact: "Contact",
      about: "About"
    },
    hero: {
      title: "Timeless Vietnamese",
      subtitle: "Gia Tiên Ceremonies",
      description: "Creating magical moments that honor tradition while celebrating your love story",
      viewWork: "View Our Work",
      getQuote: "Get Quote"
    },
    services: {
      title: "Our Premium Services",
      subtitle: "Expertly crafted celebrations that honor Vietnamese traditions with modern elegance",
      traditional: {
        title: "Traditional Gia Tiên Setup",
        description: "Complete traditional Vietnamese ceremony decoration with authentic red and gold motifs, ancestral altar arrangements.",
        price: "From $1,200"
      },
      floral: {
        title: "Floral Arrangements",
        description: "Elegant floral designs combining traditional Vietnamese flowers with modern sophisticated touches.",
        price: "From $800"
      },
      backdrop: {
        title: "Backdrop & Lighting",
        description: "Stunning ceremonial backdrops with ambient lighting to create the perfect romantic atmosphere.",
        price: "From $600"
      },
      planning: {
        title: "Complete Planning",
        description: "Full-service wedding planning specializing in Vietnamese traditions and modern celebrations.",
        price: "From $2,000"
      }
    },
    gallery: {
      title: "Our Beautiful Work",
      subtitle: "A glimpse into the magical ceremonies we've created",
      viewDetails: "View Details"
    },
    testimonials: {
      title: "What Our Couples Say",
      couples: [
        {
          name: "Linh & Minh",
          text: "HayriWedding made our Gia Tiên ceremony absolutely magical. Every detail was perfect, from the traditional decorations to the intimate atmosphere."
        },
        {
          name: "Thu & Duc", 
          text: "The team's attention to Vietnamese traditions combined with modern elegance created the wedding of our dreams. Highly recommended!"
        },
        {
          name: "Mai & Quan",
          text: "Professional, creative, and deeply respectful of our cultural heritage. Our families were moved to tears by the beautiful ceremony setup."
        }
      ]
    },
    contact: {
      title: "Let's Create Your Perfect Day",
      subtitle: "Ready to start planning your dream Vietnamese wedding ceremony?",
      form: {
        name: "Your Name",
        email: "Email Address",
        phone: "Phone Number",
        date: "Wedding Date",
        message: "Tell us about your dream wedding...",
        submit: "Send Message"
      }
    },
    footer: {
      tagline: "Creating timeless Vietnamese wedding memories",
      services: "Services",
      ceremoniesLink: "Gia Tiên Ceremonies",
      floralLink: "Floral Design",
      planningLink: "Event Planning",
      contact: "Contact",
      email: "hayriwedding@gmail.com",
      phone: "+84 97 431 04 09",
      address: "Ho Chi Minh City, Vietnam",
      rights: "Design by nhatcoi.space"
    },
    about: {
      title: "About HayriWedding",
      story: "Our Story",
      mission: "Our Mission",
      team: "Our Team"
    }
  }
};

// Vietnamese translations
const vi = {
  translation: {
    nav: {
      home: "Trang Chủ",
      services: "Dịch Vụ",
      gallery: "Thư Viện",
      testimonials: "Đánh Giá",
      contact: "Liên Hệ",
      about: "Về Chúng Tôi"
    },
    hero: {
      title: "Lễ Cưới Việt Nam",
      subtitle: "Gia Tiên Truyền Thống",
      description: "Tạo nên những khoảnh khắc kỳ diệu, tôn vinh truyền thống và ăn mừng câu chuyện tình yêu của bạn",
      viewWork: "Xem Tác Phẩm",
      getQuote: "Báo Giá"
    },
    services: {
      title: "Dịch Vụ Cao Cấp",
      subtitle: "Những lễ cưới được tổ chức tinh tế, tôn vinh truyền thống Việt Nam với vẻ đẹp hiện đại",
      traditional: {
        title: "Lễ Gia Tiên Truyền Thống",
        description: "Trang trí lễ cưới Việt Nam đầy đủ với họa tiết đỏ vàng chính thống, bàn thờ tổ tiên.",
        price: "Từ 30.000.000₫"
      },
      floral: {
        title: "Trang Trí Hoa",
        description: "Thiết kế hoa tươi thanh lịch kết hợp hoa truyền thống Việt Nam với phong cách hiện đại tinh tế.",
        price: "Từ 20.000.000₫"
      },
      backdrop: {
        title: "Phông Nền & Ánh Sáng",
        description: "Phông nền lễ cưới tuyệt đẹp với ánh sáng ấm cúng tạo nên không gian lãng mạn hoàn hảo.",
        price: "Từ 15.000.000₫"
      },
      planning: {
        title: "Tổ Chức Trọn Gói",
        description: "Dịch vụ tổ chức lễ cưới trọn gói chuyên về truyền thống Việt Nam và lễ cưới hiện đại.",
        price: "Từ 50.000.000₫"
      }
    },
    gallery: {
      title: "Tác Phẩm Đẹp",
      subtitle: "Cùng chiêm ngưỡng những lễ cưới kỳ diệu chúng tôi đã tạo ra",
      viewDetails: "Xem Chi Tiết"
    },
    testimonials: {
      title: "Cảm Nhận Của Khách Hàng",
      couples: [
        {
          name: "Linh & Minh",
          text: "HayriWedding đã làm cho lễ Gia Tiên của chúng tôi thật kỳ diệu. Mọi chi tiết đều hoàn hảo, từ trang trí truyền thống đến không gian ấm cúng."
        },
        {
          name: "Thu & Đức",
          text: "Sự chú ý của đội ngũ đến truyền thống Việt Nam kết hợp với vẻ đẹp hiện đại đã tạo nên đám cưới trong mơ của chúng tôi. Rất đáng khuyến khích!"
        },
        {
          name: "Mai & Quân",
          text: "Chuyên nghiệp, sáng tạo và tôn trọng sâu sắc di sản văn hóa của chúng tôi. Gia đình chúng tôi đã xúc động đến rơi nước mắt với bố trí lễ cưới tuyệt đẹp."
        }
      ]
    },
    contact: {
      title: "Hãy Tạo Nên Ngày Hoàn Hảo",
      subtitle: "Sẵn sàng bắt đầu lập kế hoạch cho lễ cưới Việt Nam trong mơ của bạn?",
      form: {
        name: "Họ Tên",
        email: "Địa Chỉ Email",
        phone: "Số Điện Thoại",
        date: "Ngày Cưới",
        message: "Hãy chia sẻ về đám cưới trong mơ của bạn...",
        submit: "Gửi Tin Nhắn"
      }
    },
    footer: {
      tagline: "Tạo nên những kỷ niệm cưới Việt Nam vượt thời gian",
      services: "Dịch Vụ",
      ceremoniesLink: "Lễ Gia Tiên",
      floralLink: "Thiết Kế Hoa",
      planningLink: "Tổ Chức Sự Kiện",
      contact: "Liên Hệ",
      email: "hayriwedding@gmail.com",
      phone: "+84 97 431 04 09",
      address: "TP. Hồ Chí Minh, Việt Nam",
      rights: "Design by nhatcoi.space"
    },
    about: {
      title: "Về HayriWedding",
      story: "Câu Chuyện",
      mission: "Sứ Mệnh",
      team: "Đội Ngũ"
    }
  }
};

// Get language from localStorage or default to Vietnamese
const savedLanguage = localStorage.getItem('i18nextLng') || 'vi';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en,
      vi
    },
    lng: savedLanguage, // Use saved language or default to Vietnamese
    fallbackLng: 'vi', // Fallback to Vietnamese instead of English
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['localStorage'],
      caches: ['localStorage']
    }
  });

// Set Vietnamese as default if no language is saved
if (!localStorage.getItem('i18nextLng')) {
  localStorage.setItem('i18nextLng', 'vi');
}

export default i18n; 