import { WaveGradient, type SineWaveConfig } from './WaveGradient';

const HeaderGradient = () => {
   // Состояния для интерактивной настройки

   const greenBaseline = 0.15;
   const greenAmplitude = 0.1;
   const greenSpeed = 0.6;

   const blackBaseline = 0.6;
   const blackAmplitude = 0.05;
   const blackSpeed = 1.5;

   // Состояния для градиентов
   const greenGradientOpacity = 1;
   const blackGradientOpacity = 0.65;


   // Конфигурация волн с вертикальными градиентами
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
   return (
      <WaveGradient
         waves={waves}
         backgroundColor="#fff"
         animationDuration={8}
         className="footer-gradient"
         style={{rotate: '180deg'}}
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
            rotate: '180deg'
         }}>
            <p style={{
               fontSize: '20vw',
               margin: 0,
               opacity: 0.5,
            }}>
               а-я agency
            </p>

         </div>
      </WaveGradient>
   )
};

export default HeaderGradient;