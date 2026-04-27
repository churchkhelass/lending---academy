import React, { useEffect, useRef, useState } from 'react';

const ScrollingText = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const scrollX = window.scrollX;
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      
      // Вариант 1: Простое линейное движение
      const moveX = scrollX * 0.5;
      const moveY = scrollY * 0.3;
      
      // Вариант 2: Круговое движение (раскомментировать если нужно)
      // const moveX = Math.sin(scrollY * 0.01) * 100;
      // const moveY = Math.cos(scrollX * 0.01) * 100;
      
      // Вариант 3: Диагональное движение с затуханием по краям
      // const maxMove = 200;
      // const moveX = Math.min(maxMove, Math.max(-maxMove, scrollY * 0.2));
      // const moveY = Math.min(maxMove, Math.max(-maxMove, scrollY * 0.15));
      
      setPosition({ x: moveX, y: moveY });
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Инициализация
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Дополнительный эффект для параллакса с разной скоростью
  useEffect(() => {
    if (!textRef.current) return;
    
    const handleParallaxScroll = () => {
      const scrollY = window.scrollY;
      const speed = isHovered ? 0.5 : 0.3;
      const yOffset = scrollY * speed;
      
      textRef.current.style.transform = `translate(${position.x}px, ${yOffset}px)`;
    };
    
    window.addEventListener('scroll', handleParallaxScroll);
    return () => window.removeEventListener('scroll', handleParallaxScroll);
  }, [position.x, isHovered]);
  
  const textStyles = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: `translate(calc(-50% + ${position.x}px), calc(-50% + ${position.y}px))`,
    fontSize: '3rem',
    fontWeight: 'bold',
    color: '#3b82f6',
    textAlign: 'center',
    whiteSpace: 'nowrap',
    transition: 'transform 0.1s ease-out',
    zIndex: 1000,
    cursor: 'pointer',
    textShadow: '2px 2px 4px rgba(0,0,0,0.2)'
  };
  
  return (
    <div ref={containerRef}>
      <div 
        ref={textRef}
        style={textStyles}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="scrolling-text"
      >
        🚀 Следуй за мной! Скролль вниз 🚀
      </div>
      
      {/* Контент для демонстрации скролла */}
      <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
        {[...Array(20)].map((_, i) => (
          <div key={i} style={{
            margin: '20px 0',
            padding: '20px',
            background: '#f0f0f0',
            borderRadius: '10px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <h3>Блок контента {i + 1}</h3>
            <p>Прокручивайте страницу, чтобы увидеть как движется текст вверху/внизу!</p>
          </div>
        ))}
      </div>
      
      <style jsx>{`
        .scrolling-text {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 15px 30px;
          border-radius: 50px;
          box-shadow: 0 10px 20px rgba(0,0,0,0.2);
          transition: all 0.3s ease;
        }
        
        .scrolling-text:hover {
          transform: scale(1.05);
          background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
        }
      `}</style>
    </div>
  );
};

export default ScrollingText;