import { useState } from "react";
import { Accordion } from '@heroui/react';
import Container from "../../components/common/Container/Container";
import ArrowClose from '../../assets/ArrowClose.png';
import ArrowOpen from '../../assets/ArrowOpen.png';
import './Accardion.scss';

const items = [
   {
      content: "Мы создаём не «сайты», а полноценные веб-продукты, которые решают бизнес-задачи. От сложных личных кабинетов и корпоративных порталов до высоконагруженных интернет-магазинов. Каждая строка кода пишется с одной целью — чтобы ваш digital-инструмент работал на рост и приносил клиентов с первого дня.",
      title: "WEB РАЗРАБОТКА",
   },
   {
      content: "Yes, you can modify or cancel your order before it's shipped. Once your order is processed, you can't make changes.",
      title: "РАЗРАБОТКА МОБИЛЬНЫХ ПРИЛОЖЕНИЙ",
   },
   {
      content: "We accept all major credit cards, including Visa, Mastercard, and American Express.",
      title: "TG MINI APPS",
   },
   {
      content: "Shipping costs vary based on your location and the size of your order. We offer free shipping for orders over $50.",
      title: "digital маркетинг",
   },
   {
      content: "Yes, we ship to most countries. Please check our shipping rates and policies for more information.",
      title: "UX/UI ДИЗАЙН",
   },
];

const Accardion = () => {
   const [activeIndex, setActiveIndex] = useState<number | null>(null);

   const handleToggle = (index: number) => {
      setActiveIndex(activeIndex === index ? null : index);
   };

   return (
      <Container maxWidth="xl">
         <div style={{ marginTop: '5vh' }}>

            <Accordion className="w-full">
               {items.map((item, index) => {
                  const isActive = activeIndex === index;

                  return (
                     <Accordion.Item key={index}>
                        <Accordion.Heading>
                           <Accordion.Trigger onClick={() => handleToggle(index)}>
                              <span style={{ color: isActive ? '#AFE118' : 'inherit', fontSize: '2rem', fontWeight: '500', textTransform: 'uppercase' }}>
                                 {item.title}
                              </span>
                              <Accordion.Indicator>
                                 <span style={{ color: isActive ? '#AFE118' : 'inherit' }}>
                                    {isActive ? (
                                       <img src={ArrowOpen} alt="Close" />
                                    ) : (
                                       <img src={ArrowClose} alt="Open" />
                                    )}
                                 </span>
                              </Accordion.Indicator>
                           </Accordion.Trigger>
                        </Accordion.Heading>
                        <Accordion.Panel>
                           <Accordion.Body>{item.content}</Accordion.Body>
                        </Accordion.Panel>
                     </Accordion.Item>
                  );
               })}
            </Accordion>
         </div>
      </Container>
   );
}

export default Accardion;