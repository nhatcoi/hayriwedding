import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Hero from '../components/Hero';

const About: React.FC = () => {
  const { t } = useTranslation();

  const teamMembers = [
    {
      name: "Linh Nguyen",
      role: "Founder & Creative Director",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
      bio: "With over 15 years of experience in traditional Vietnamese weddings, Linh brings authentic cultural knowledge and modern design sensibility."
    },
    {
      name: "Minh Tran",
      role: "Lead Wedding Planner",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
      bio: "Minh specializes in coordinating complex multi-cultural ceremonies, ensuring every tradition is honored with precision and care."
    },
    {
      name: "Thu Pham",
      role: "Floral Designer",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
      bio: "Thu creates stunning floral arrangements that blend traditional Vietnamese flowers with contemporary design elements."
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
    <div className="about-page">
      {/* Hero Section */}
      <Hero 
        backgroundImage="https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2048&q=80"
        customTitle={t('about.title')}
        customSubtitle="Our Story"
        customDescription="Preserving Vietnamese wedding traditions with modern elegance"
        showButtons={false}
        showFloatingElements={false}
      />

      {/* Our Story Section */}
      <section className="our-story">
        <motion.div 
          className="container"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="story-content">
          <motion.div className="story-text" variants={itemVariants}>
            <h2>{t('about.story')}</h2>
            <p>
              Được thành lập vào năm 2010, HayriWedding bắt đầu như một dự án đầy đam mê nhằm gìn giữ và tôn vinh
              những giá trị truyền thống của nghi lễ Gia Tiên Việt Nam. Người sáng lập của chúng tôi, chị Linh Nguyễn, 
              đã nhận ra nhu cầu cấp thiết về những nhà tổ chức cưới thực sự am hiểu ý nghĩa văn hóa 
              và các chi tiết tinh tế trong lễ cưới truyền thống Việt.
            </p>
            <p>
              Trải qua nhiều năm, chúng tôi vinh dự đồng hành cùng hàng trăm cặp đôi để tạo nên những khoảnh khắc diệu kỳ, 
              kết hợp hài hòa giữa nét truyền thống lâu đời và phong cách hiện đại. 
              Mỗi buổi lễ mà chúng tôi thực hiện đều là một câu chuyện tình yêu riêng biệt, 
              đồng thời tôn vinh di sản văn hóa sâu sắc làm nên nét đẹp độc đáo của lễ cưới Việt Nam.
            </p>
          </motion.div>
            
            <motion.div className="story-image" variants={itemVariants}>
              <img 
                src="https://images.unsplash.com/photo-1606216794074-735e91aa2c92?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                alt="Our Story" 
              />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Mission Section */}
      <section className="our-mission">
        <motion.div 
          className="container"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="mission-content">
            <h2>{t('about.mission')}</h2>
            <div className="mission-grid">
          <motion.div 
            className="mission-item"
            whileHover={{ scale: 1.05, y: -5 }}
          >
            <div className="mission-icon">🏮</div>
            <h3>Gìn giữ văn hóa</h3>
            <p>Tôn vinh và lưu giữ các nghi lễ cưới truyền thống Việt Nam cho thế hệ mai sau</p>
          </motion.div>

          <motion.div 
            className="mission-item"
            whileHover={{ scale: 1.05, y: -5 }}
          >
            <div className="mission-icon">💝</div>
            <h3>Trải nghiệm cá nhân hóa</h3>
            <p>Thiết kế lễ cưới độc đáo phản ánh câu chuyện tình yêu và bản sắc riêng của từng cặp đôi</p>
          </motion.div>

          <motion.div 
            className="mission-item"
            whileHover={{ scale: 1.05, y: -5 }}
          >
            <div className="mission-icon">✨</div>
            <h3>Vẻ đẹp hiện đại</h3>
            <p>Kết hợp tinh tế giữa truyền thống và thiết kế đương đại để tạo nên vẻ đẹp vượt thời gian</p>
          </motion.div>
        </div>
          </div>
        </motion.div>
      </section>

      {/* Team Section
      <section className="our-team">
        <motion.div 
          className="container"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2 variants={itemVariants} className="section-title">
            {t('about.team')}
          </motion.h2>
          <motion.p variants={itemVariants} className="section-subtitle">
            Meet the passionate team behind your dream wedding
          </motion.p>
          
          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                className="team-member"
                variants={itemVariants}
                whileHover={{ y: -10 }}
              >
                <div className="member-image">
                  <img src={member.image} alt={member.name} />
                </div>
                <div className="member-info">
                  <h3>{member.name}</h3>
                  <h4>{member.role}</h4>
                  <p>{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section> */}

      {/* Values Section */}
      <section className="our-values">
        <motion.div 
          className="container"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="values-content">
          <h2>Vì sao chọn HayriWedding?</h2>
          <div className="values-list">
            <motion.div className="value-item" whileHover={{ x: 10 }}>
              <span className="value-number">01</span>
              <div>
                <h3>Chuyên môn đích thực</h3>
                <p>Hiểu biết sâu sắc về các nghi lễ cưới và giá trị văn hóa Việt Nam</p>
              </div>
            </motion.div>

            <motion.div className="value-item" whileHover={{ x: 10 }}>
              <span className="value-number">02</span>
              <div>
                <h3>Chú trọng từng chi tiết</h3>
                <p>Lên kế hoạch tỉ mỉ và thực hiện chỉn chu để mọi thứ đều hoàn hảo</p>
              </div>
            </motion.div>

            <motion.div className="value-item" whileHover={{ x: 10 }}>
              <span className="value-number">03</span>
              <div>
                <h3>Dịch vụ cá nhân hóa</h3>
                <p>Tiếp cận linh hoạt theo đúng mong muốn và truyền thống riêng của gia đình bạn</p>
              </div>
            </motion.div>

            <motion.div className="value-item" whileHover={{ x: 10 }}>
              <span className="value-number">04</span>
              <div>
                <h3>Đối tác chất lượng</h3>
                <p>Mạng lưới nhà cung cấp đáng tin cậy cùng cam kết đem lại sự hoàn hảo</p>
              </div>
            </motion.div>
          </div>
        </div>
        </motion.div>
      </section>
    </div>
  );
};

export default About; 