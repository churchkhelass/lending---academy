// import Contact from '../assets/O_contacts.png';
// import Prosto from '../assets/O_neProstoSite.png';
// import Sell from '../assets/O_siteMustSell.png';
// import Team from '../assets/O_team.png';
// import KPI from '../assets/O_workFromKPI.png';

export interface NavLink {
  href: string;
  label: string;
}

// interface Photo {
//   id: number;
//   src: string;
//   alt: string;
//   action: () => void;
// }

export const navLinks: NavLink[] = [
  { href: '#aboutus', label: 'О нас' },
  { href: '#services', label: 'Услуги' },
  { href: '#cases', label: 'Кейсы' },
  { href: '#reviews', label: 'Отзывы' },
  { href: '#contact', label: 'Связаться' },
  { href: '#blog', label: 'Блог' },
];

// export const photosHeader: Photo[] = [
//   {
//     id: 1,
//     src: Contact,
//     alt: 'Contact',
//     action: () => alert('Открыт контакт! Свяжитесь с нами для сотрудничества.')
//   },
//   {
//     id: 2,
//     src: Prosto,
//     alt: 'Prosto Site',
//     action: () => alert('Переход на Ne Prosto Site - уникальный веб-проект')
//   },
//   {
//     id: 3,
//     src: Sell,
//     alt: 'Site Must Sell',
//     action: () => alert('Site Must Sell - ваш сайт будет продавать!')
//   },
//   {
//     id: 4,
//     src: Team,
//     alt: 'Team',
//     action: () => alert('Наша команда - лучшие профессионалы')
//   },
//   {
//     id: 5,
//     src: KPI,
//     alt: 'Work From KPI',
//     action: () => alert('Работа по KPI - эффективное управление')
//   }
// ];