import React, { useEffect, useState } from 'react';

interface MousePosition {
  x: number;
  y: number;
}

interface TrailPoint extends MousePosition {
  id: number;
}

const MouseFollower: React.FC = () => {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  const [trails, setTrails] = useState<TrailPoint[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    let trailId = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const newPosition = { x: e.clientX, y: e.clientY };
      setMousePosition(newPosition);
      setIsVisible(true);

      // Check if hovering over interactive elements
      const target = e.target as HTMLElement;
      const isInteractive = target.matches('button, a, input, .btn-primary, .btn-secondary, .nav-link, .language-toggle, .floating-contact-button') || 
                           target.closest('button, a, input, .btn-primary, .btn-secondary, .nav-link, .language-toggle, .floating-contact-button');
      setIsHovering(!!isInteractive);

      // Add new trail point
      const newTrail: TrailPoint = {
        x: e.clientX,
        y: e.clientY,
        id: trailId++
      };

      setTrails(prev => {
        const updated = [newTrail, ...prev];
        return updated.slice(0, 8); // Keep only last 8 trail points
      });
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      setTrails([]);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Add event listeners to document
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Cleanup trail points
    const cleanupInterval = setInterval(() => {
      setTrails(prev => prev.slice(0, 6));
    }, 100);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      clearInterval(cleanupInterval);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Main mouse follower */}
      <div 
        className={`mouse-follower ${isHovering ? 'hovering' : ''}`}
        style={{
          transform: `translate(${mousePosition.x - 10}px, ${mousePosition.y - 10}px) scale(${isHovering ? 1.5 : 1})`,
          background: isHovering 
            ? 'radial-gradient(circle, rgba(212, 175, 55, 1) 0%, rgba(212, 175, 55, 0.5) 50%, transparent 100%)'
            : 'radial-gradient(circle, rgba(212, 175, 55, 0.8) 0%, rgba(212, 175, 55, 0.3) 50%, transparent 100%)'
        }}
      />
      
      {/* Trail points */}
      {trails.map((trail, index) => (
        <div
          key={trail.id}
          className="mouse-trail"
          style={{
            transform: `translate(${trail.x - 3}px, ${trail.y - 3}px) scale(${(trails.length - index) / trails.length})`,
            opacity: (trails.length - index) / trails.length * 0.6
          }}
        />
      ))}
    </>
  );
};

export default MouseFollower; 