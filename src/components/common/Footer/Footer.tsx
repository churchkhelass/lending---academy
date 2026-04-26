// components/Footer.jsx
// import React from 'react';
import './Footer.scss';
import logoFooter from '../../../assets/logoFooter.png'
import { navLinks } from '../../../utils/pageList';
import { Button } from '@heroui/react';
// import { ArrowRight } from '@gravity-ui/uikit';


export interface NavLink {
  href: string;
  label: string;
}


const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">

        <div className="footer__section">
          <div className="footer__contacts-container">
            <ul className="footer__contacts ">
              <li className="footer__section__left">Телефон</li>
              <li className="footer__section__right">Телеграмм канал</li>
              <span className="footer__section__left">+7 (993) 900-80-57</span>
              <span className="footer__section__right">@a_yagency</span>
            </ul>
            <ul className="footer__contacts">
              <li className="footer__section__left">Почта</li>
              <li className="footer__section__right">Телеграмм аккаунт</li>
              <span className="footer__section__left">info@a-ya.io</span>
              <span className="footer__section__right">@AY_agency</span>
            </ul>
          </div>
        </div>

        <div className="footer__content">

          <div className="footer__section__button">
            <div className="footer__section__left">
              <Button className="footer__button positive">начать проект</Button>
            </div>
            {/* <div className="footer__section__right">
              <Button size="lg" className="footer__button negative button__top"> подняться</Button>
            </div> */}
            <div className="footer__section__right">
              <Button size="lg" className="footer__button negative"> на главную</Button>
            </div>
          </div>

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