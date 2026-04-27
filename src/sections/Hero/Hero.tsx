// sections/Hero.tsx (Экран №1):
import React from 'react';
import Container from '../../components/common/Container/Container';
import './Hero.scss';

interface HeroProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  onCtaClick?: () => void;
}

const Hero = ({ 
  // title = 'Добро пожаловать',
  subtitle = `Мы — ваша внешняя продукт-команда. Погружаемся в ваш 
  бизнес, анализируем аудиторию и рынок, проектируем решение,
  которое конвертирует, и воплощаем его в коде. Наш результат — 
  не просто «сданный проект», а работающий digital-инструмент,
  который приносит заявки и клиентов. Мы отвечаем за процесс от
  первой встречи до запуска и первых результатов.`,
  // ctaText = 'Начать',
  onCtaClick 
}: HeroProps): React.ReactElement => {
  const handleClick = (): void => {
    if (onCtaClick) {
      onCtaClick();
    } else {
      const featuresSection = document.getElementById('features');
      featuresSection?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="hero">
      <Container>
        <div className="hero__content">
          {/* <h1 className="hero__title">{title}</h1> */}
          <p className="hero__subtitle">{subtitle}</p>
          {/* <button onClick={handleClick} className="hero__cta">
            {ctaText}
          </button> */}
        </div>
      </Container>
    </section>
  );
};

export default Hero;