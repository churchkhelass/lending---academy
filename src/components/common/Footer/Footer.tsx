// components/Footer.jsx
// import React from 'react';
import './Footer.scss';
import logoFooter from '../../../assets/logoFooter.png'
import { navLinks } from '../../../utils/pageList';

export interface NavLink {
  href: string;
  label: string;
}

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__content">
          
          <div className="footer__section">
            <ul className="footer__links links__label">
              {navLinks.map((link: NavLink) => (
                <li key={link.href}>
                  <a href={link.href} className="header__nav-link">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer__section">
            <h4 className="footer__subtitle">связаться</h4>
            <ul className="footer__contacts">
              <li>Почта</li>
              <span>a-yagency@yandex.com</span>
              <li>Телефон</li>
              <span>+7 (993) 900-80-57</span>
              <li>Телеграмм канал</li>
              <span>@AY_agency</span>
              <li>Телеграмм аккаунт</li>
              <span>@a_yagency</span>
            </ul>
          </div>
          <button className="footer__button positive">начать проект</button>
          <button className="footer__button negative">на главную</button>
          <div className="footer__section">
            <img src={logoFooter} alt="Logo" className="footer__logo" />
          </div>
        </div>
        <div className="footer__bottom">
          <div className='footer__links'>
            <a href="#politic">Политика конфеденциальности</a>

          </div>

          <p>&copy; 2025. All rights reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;