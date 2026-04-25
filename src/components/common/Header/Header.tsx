// components/common/Header.tsx
import React, { useState } from 'react';
import useScroll from '../../../hooks/useScroll';
import Container from '../Container/Container';
import './Header.scss';
import logoHeader from '../../../assets/logoHeader.png'
import { navLinks } from '../../../utils/pageList';

export interface NavLink {
  href: string;
  label: string;
}
const Header = (): React.ReactElement => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const isScrolled: boolean = useScroll(50);

  const toggleMenu = (): void => setIsOpen(!isOpen);
  const closeMenu = (): void => setIsOpen(false);


  return (
    <header className={`header ${isScrolled ? 'header--scrolled' : ''}`}>
      <Container className="header__container">
        <a href="#home" className="header__logo">
          {/* <span className="header__logo-text">Logo</span> */}
          <img src={logoHeader} alt="Logo" className="header__logo-text" />
        </a>

        <nav className="header__nav">
          <ul className="header__nav-list">
            {navLinks.map((link: NavLink) => (
              <li key={link.href}>
                <a href={link.href} className="header__nav-link">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <button
          className={`header__burger ${isOpen ? 'header__burger--active' : ''}`}
          onClick={toggleMenu}
          aria-label="Меню"
          aria-expanded={isOpen}
        >
          <span className="header__burger-line"></span>
          {/* <span className="header__burger-line"></span> */}
          <span className="header__burger-line"></span>
        </button>

        <div className={`header__mobile-menu ${isOpen ? 'header__mobile-menu--open' : ''}`}>
          <nav className="header__mobile-nav">
            <ul className="header__mobile-nav-list">
              {navLinks.map((link: NavLink) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="header__mobile-nav-link"
                    onClick={closeMenu}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Container>
    </header>
  );
};

export default Header;