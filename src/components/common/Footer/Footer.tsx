// components/Footer.jsx
// import React from 'react';
import './Footer.scss';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__content">
          <div className="footer__section">
            <h3 className="footer__title">Логотип</h3>
            <p className="footer__description">
              Краткое описание компании или слоган.
            </p>
          </div>
          <div className="footer__section">
            <h4 className="footer__subtitle">Навигация</h4>
            <ul className="footer__links">
              <li><a href="#home">Главная</a></li>
              <li><a href="#about">О нас</a></li>
              <li><a href="#services">Услуги</a></li>
              <li><a href="#contact">Контакты</a></li>
            </ul>
          </div>
          <div className="footer__section">
            <h4 className="footer__subtitle">Контакты</h4>
            <ul className="footer__contacts">
              <li>Email: info@example.com</li>
              <li>Телефон: +7 (123) 456-78-90</li>
            </ul>
          </div>
        </div>
        <div className="footer__bottom">
          <p>&copy; 2024 Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;