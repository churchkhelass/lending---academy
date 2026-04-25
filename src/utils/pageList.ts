 export interface NavLink {
  href: string;
  label: string;
}
 
 export const navLinks: NavLink[] = [
    { href: '#home', label: 'Главная' },
    { href: '#aboutus', label: 'О нас' },
    { href: '#services', label: 'Услуги' },
    { href: '#cases', label: 'Кейсы' },
    { href: '#reviews', label: 'Отзывы' },
    { href: '#contact', label: 'Связаться' },
    { href: '#blog', label: 'Блог' },
  ];