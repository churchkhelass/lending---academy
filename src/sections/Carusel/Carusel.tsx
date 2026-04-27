import { useState } from 'react';
import ArrowButton from '../../assets/ArrowButton.png';
import './Carusel.scss';

const items = [
   {
      id: 1,
      title: 'MINIMONOKINI',
      description: 'Интернет-магазин женского белья премиального качества',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400'
   },
   {
      id: 2,
      title: 'NAJD',
      description: 'Лендинг для дубайского парфюмерного дома',
      image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400'
   },
   {
      id: 3,
      title: 'ARQa Tobacco',
      description: `Личный кабинет для поставщика табака`,
      image: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=400'
   },
   {
      id: 4,
      title: 'Car Diary',
      description: 'Цифровой помощник автовладельца для учёта расходов и аналитики',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400',
   }
];
const Carusel = () => {
   const [currentIndex, setCurrentIndex] = useState(0);

   const nextSlide = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
   };

   const prevSlide = () => {
      setCurrentIndex((prevIndex) =>
         prevIndex === 0 ? items.length - 1 : prevIndex - 1
      );
   };

   return (
      <div className="carusel-container">
         <div className="carusel-wrapper">
            {items.map((item, index) => (
               <div
                  key={item.id}
                  className={`carusel-card ${index === currentIndex ? 'active' : ''}`}
                  style={{
                     transform: `translateX(${(index - currentIndex) * 110}%)`,
                     opacity: index === currentIndex ? 1 : 0.5,
                     zIndex: index === currentIndex ? 10 : 1,
                  }}
               >
                  <div className="card-image">
                     <img src={item.image} alt={item.title} />
                  </div>
                  <div className="card-content" style={{
                     filter: index === currentIndex ? 'blur(0px)' : 'blur(0px)'
                  }}>
                     <div style={{padding: '5px 5px 0 5px'}}>
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                     </div>
                     <button className="card-button">
                        <img src={ArrowButton} alt="Open" />
                        <p>УЗНАТЬ ПОДРОБНЕЕ</p>
                        <img src={ArrowButton} alt="Open" />

                     </button>
                  </div>
               </div>
            ))}
         </div>

         <button className="carusel-btn prev-btn" onClick={prevSlide}>
            ❮
         </button>
         <button className="carusel-btn next-btn" onClick={nextSlide}>
            ❯
         </button>

         <div className="carusel-dots">
            {items.map((_, index) => (
               <span
                  key={index}
                  className={`dot ${index === currentIndex ? 'active' : ''}`}
                  onClick={() => setCurrentIndex(index)}
               />
            ))}
         </div>
      </div>
   );
};

export default Carusel;