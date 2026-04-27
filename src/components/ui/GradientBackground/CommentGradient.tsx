import { WaveGradient, type SineWaveConfig } from './WaveGradient';
import { useRef, useEffect, useState } from 'react';

const HeaderGradient = () => {
   const greenBaseline = 0.15;
   const greenAmplitude = 0.1;
   const greenSpeed = 0.6;

   const blackBaseline = 0.6;
   const blackAmplitude = 0.05;
   const blackSpeed = 1.5;

   const greenGradientOpacity = 1;
   const blackGradientOpacity = 0.65;

   const waves: SineWaveConfig[] = [
      {
         color: '#AFE118',
         gradientColor: `rgba(175,225,24,${greenGradientOpacity * 0.3})`,
         amplitude: greenAmplitude,
         frequency: 1.0,
         speed: greenSpeed,
         baseline: greenBaseline,
         phase: 45,
         fillUnder: true,
         fillOpacity: greenGradientOpacity,
      },
      {
         color: '#1A1A1A',
         gradientColor: `rgba(26,26,26,${blackGradientOpacity * 0.3})`,
         amplitude: blackAmplitude,
         frequency: 1,
         speed: blackSpeed,
         baseline: blackBaseline,
         phase: 90,
         fillUnder: true,
         fillOpacity: blackGradientOpacity,
      },
   ];

   const marqueeText = "а-я agency • ";
   const [duration, setDuration] = useState(15);
   const row1Ref = useRef<HTMLDivElement>(null);
   const row2Ref = useRef<HTMLDivElement>(null);

   // Вычисляем длительность анимации на основе ширины текста (5px в секунду)
   useEffect(() => {
      const calculateDuration = () => {
         if (row1Ref.current) {
            const textWidth = row1Ref.current.scrollWidth / 2; // Половина, т.к. дублируем
            const newDuration = textWidth / 5; // 5px в секунду
            setDuration(Math.max(8, newDuration)); // Минимум 8 секунд
         }
      };
      
      calculateDuration();
      window.addEventListener('resize', calculateDuration);
      return () => window.removeEventListener('resize', calculateDuration);
   }, []);

   return (
      <WaveGradient
         waves={waves}
         backgroundColor="#fff"
         animationDuration={8}
         className="footer-gradient"
         style={{ rotate: '180deg' }}
      >
         <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            color: 'white',
            textAlign: 'center',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            position: 'relative',
            zIndex: 2,
            rotate: '180deg',
            paddingBottom: '10px',
            textTransform: 'uppercase',
            overflow: 'hidden',
            gap: '8px',
            fontSize: '3rem',
            lineHeight: '1',
         }}>
            {/* Строка 1 - движение вправо */}
            <div style={{
               width: '100%',
               overflow: 'hidden',
               maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
               WebkitMaskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
            }}>
               <div
                  ref={row1Ref}
                  style={{
                     display: 'inline-block',
                     whiteSpace: 'nowrap',
                     animation: `scrollRight ${duration}s linear infinite`,
                     willChange: 'transform',
                  }}
               >
                  <span>{marqueeText}</span>
                  <span>{marqueeText}</span>
                  <span>{marqueeText}</span>
                  <span>{marqueeText}</span>
                  <span>{marqueeText}</span>
                  <span>{marqueeText}</span>
                  <span>{marqueeText}</span>
                  <span>{marqueeText}</span>
                  <span>{marqueeText}</span>
                  <span>{marqueeText}</span>
               </div>
            </div>

            {/* Строка 2 - движение влево */}
            <div style={{
               width: '100%',
               overflow: 'hidden',
               maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
               WebkitMaskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
            }}>
               <div
                  ref={row2Ref}
                  style={{
                     display: 'inline-block',
                     whiteSpace: 'nowrap',
                     animation: `scrollLeft ${duration}s linear infinite`,
                     willChange: 'transform',
                  }}
               >
                  <span>{marqueeText}</span>
                  <span>{marqueeText}</span>
                  <span>{marqueeText}</span>
                  <span>{marqueeText}</span>
                  <span>{marqueeText}</span>
                  <span>{marqueeText}</span>
                  <span>{marqueeText}</span>
                  <span>{marqueeText}</span>
                  <span>{marqueeText}</span>
                  <span>{marqueeText}</span>
               </div>
            </div>
         </div>

         <style>{`
            @keyframes scrollRight {
               0% {
                  transform: translateX(-50%);
               }
               100% {
                  transform: translateX(0%);
               }
            }
            
            @keyframes scrollLeft {
               0% {
                  transform: translateX(0%);
               }
               100% {
                  transform: translateX(-50%);
               }
            }
         `}</style>
      </WaveGradient>
   )
};

export default HeaderGradient;