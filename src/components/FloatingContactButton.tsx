import React from 'react';

const FloatingContactButton: React.FC = () => {
  const handleContactClick = () => {
    window.open('https://facebook.com/messages/t/278556888663700', '_blank', 'noopener,noreferrer');
  };

  return (
    <button 
      className="floating-contact-button"
      onClick={handleContactClick}
      title="Nhắn tin qua Messenger"
    >
      <img src="/messenger.png" alt="Messenger" className="messenger-img" />
    </button>
  );
};

export default FloatingContactButton; 