// WaveGradientMain.tsx
import { useState } from 'react';
import { WaveGradient, type SineWaveConfig } from './WaveGradient';

const WaveGradientMain = () => {
  // Состояния для интерактивной настройки
  const [greenBaseline, setGreenBaseline] = useState(0.5);
  const [greenAmplitude, setGreenAmplitude] = useState(0.25);
  const [greenSpeed, setGreenSpeed] = useState(1.2);
  
  const [blackBaseline, setBlackBaseline] = useState(0.2);
  const [blackAmplitude, setBlackAmplitude] = useState(0.2);
  const [blackSpeed, setBlackSpeed] = useState(1.5);
  
//   const [whiteBaseline, setWhiteBaseline] = useState(0.85);
//   const [whiteAmplitude, setWhiteAmplitude] = useState(0.15);
//   const [whiteSpeed, setWhiteSpeed] = useState(0.8);

  // Состояния для градиентов
  const [greenGradientOpacity, setGreenGradientOpacity] = useState(0.7);
  const [blackGradientOpacity, setBlackGradientOpacity] = useState(0.8);
//   const [whiteGradientOpacity, setWhiteGradientOpacity] = useState(0.5);

  // Конфигурация волн с вертикальными градиентами
  const waves: SineWaveConfig[] = [
   //  {
   //    color: '#FFFFFF',
   //    gradientColor: `rgba(255,255,255,${whiteGradientOpacity * 0.3})`,
   //    amplitude: whiteAmplitude,
   //    frequency: 1.5,
   //    speed: whiteSpeed,
   //    baseline: whiteBaseline,
   //    phase: 0,
   //    fillUnder: true,
   //    fillOpacity: whiteGradientOpacity,
   //  },
    {
      color: '#AFE118',
      gradientColor: `rgba(175,225,24,${greenGradientOpacity * 0.3})`,
      amplitude: greenAmplitude,
      frequency: 2.0,
      speed: greenSpeed,
      baseline: greenBaseline,
      phase: 45,
      fillUnder: true,
      fillOpacity: greenGradientOpacity,
    },
    {
      color: '#000000',
      gradientColor: `rgba(0,0,0,${blackGradientOpacity * 0.3})`,
      amplitude: blackAmplitude,
      frequency: 2.5,
      speed: blackSpeed,
      baseline: blackBaseline,
      phase: 90,
      fillUnder: true,
      fillOpacity: blackGradientOpacity,
    },
  ];

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Панель управления */}
      <div style={{
        position: 'fixed',
        top: 20,
        right: 20,
        background: 'rgba(0,0,0,0.8)',
        backdropFilter: 'blur(10px)',
        padding: '1rem',
        borderRadius: '1rem',
        color: 'white',
        fontFamily: 'system-ui',
        fontSize: '0.8rem',
        zIndex: 100,
        width: '280px',
        maxHeight: '90vh',
        overflowY: 'auto',
        pointerEvents: 'auto',
      }}>
        <h3 style={{ margin: '0 0 1rem 0' }}>🎮 Управление волнами</h3>
        
        {/* Пояснение про градиент */}
        <div style={{ 
          marginBottom: '1rem', 
          padding: '0.5rem',
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '0.5rem',
          fontSize: '0.7rem'
        }}>
          🌈 Вертикальный градиент: цвет → прозрачный
          <br />
          Создает плавный переход вниз по оси Y
        </div>

        {/* Зелёная волна */}
        <div style={{ marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <div style={{ width: '16px', height: '16px', background: '#AFE118', borderRadius: '3px' }}></div>
            <strong>Зелёная волна</strong>
          </div>
          <label>Базовая линия: {greenBaseline.toFixed(2)}</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={greenBaseline}
            onChange={(e) => setGreenBaseline(parseFloat(e.target.value))}
            style={{ width: '100%', margin: '5px 0' }}
          />
          <label>Амплитуда: {greenAmplitude.toFixed(2)}</label>
          <input
            type="range"
            min="0"
            max="0.5"
            step="0.01"
            value={greenAmplitude}
            onChange={(e) => setGreenAmplitude(parseFloat(e.target.value))}
            style={{ width: '100%', margin: '5px 0' }}
          />
          <label>Скорость: {greenSpeed.toFixed(2)}</label>
          <input
            type="range"
            min="0"
            max="3"
            step="0.1"
            value={greenSpeed}
            onChange={(e) => setGreenSpeed(parseFloat(e.target.value))}
            style={{ width: '100%', margin: '5px 0' }}
          />
          <label>Прозрачность градиента: {greenGradientOpacity.toFixed(2)}</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={greenGradientOpacity}
            onChange={(e) => setGreenGradientOpacity(parseFloat(e.target.value))}
            style={{ width: '100%', margin: '5px 0' }}
          />
        </div>

        {/* Чёрная волна */}
        <div style={{ marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <div style={{ width: '16px', height: '16px', background: '#000000', border: '1px solid #fff', borderRadius: '3px' }}></div>
            <strong>Чёрная волна</strong>
          </div>
          <label>Базовая линия: {blackBaseline.toFixed(2)}</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={blackBaseline}
            onChange={(e) => setBlackBaseline(parseFloat(e.target.value))}
            style={{ width: '100%', margin: '5px 0' }}
          />
          <label>Амплитуда: {blackAmplitude.toFixed(2)}</label>
          <input
            type="range"
            min="0"
            max="0.5"
            step="0.01"
            value={blackAmplitude}
            onChange={(e) => setBlackAmplitude(parseFloat(e.target.value))}
            style={{ width: '100%', margin: '5px 0' }}
          />
          <label>Скорость: {blackSpeed.toFixed(2)}</label>
          <input
            type="range"
            min="0"
            max="3"
            step="0.1"
            value={blackSpeed}
            onChange={(e) => setBlackSpeed(parseFloat(e.target.value))}
            style={{ width: '100%', margin: '5px 0' }}
          />
          <label>Прозрачность градиента: {blackGradientOpacity.toFixed(2)}</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={blackGradientOpacity}
            onChange={(e) => setBlackGradientOpacity(parseFloat(e.target.value))}
            style={{ width: '100%', margin: '5px 0' }}
          />
        </div>

        {/* Белая волна */}
        {/* <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <div style={{ width: '16px', height: '16px', background: '#FFFFFF', borderRadius: '3px' }}></div>
            <strong>Белая волна</strong>
          </div>
          <label>Базовая линия: {whiteBaseline.toFixed(2)}</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={whiteBaseline}
            onChange={(e) => setWhiteBaseline(parseFloat(e.target.value))}
            style={{ width: '100%', margin: '5px 0' }}
          />
          <label>Амплитуда: {whiteAmplitude.toFixed(2)}</label>
          <input
            type="range"
            min="0"
            max="0.5"
            step="0.01"
            value={whiteAmplitude}
            onChange={(e) => setWhiteAmplitude(parseFloat(e.target.value))}
            style={{ width: '100%', margin: '5px 0' }}
          />
          <label>Скорость: {whiteSpeed.toFixed(2)}</label>
          <input
            type="range"
            min="0"
            max="3"
            step="0.1"
            value={whiteSpeed}
            onChange={(e) => setWhiteSpeed(parseFloat(e.target.value))}
            style={{ width: '100%', margin: '5px 0' }}
          />
          <label>Прозрачность градиента: {whiteGradientOpacity.toFixed(2)}</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={whiteGradientOpacity}
            onChange={(e) => setWhiteGradientOpacity(parseFloat(e.target.value))}
            style={{ width: '100%', margin: '5px 0' }}
          />
        </div>*/}
      </div> 

      {/* Компонент с волнами */}
      <WaveGradient
        waves={waves}
        backgroundColor="#fff"
        animationDuration={8}
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
        }}>
          <h1 style={{ 
            fontSize: 'clamp(2rem, 5vw, 3.5rem)', 
            marginBottom: '1rem',
            textShadow: '0 2px 20px rgba(0,0,0,0.5)'
          }}>
            🌊 Волновой градиент
          </h1>
          
          <div style={{
            background: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(10px)',
            padding: '1.5rem 2rem',
            borderRadius: '1.5rem',
            marginTop: '2rem',
            maxWidth: '500px',
          }}>
            <p style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>
              Каждая волна имеет вертикальный градиент:
            </p>
            <ul style={{ textAlign: 'left', fontSize: '0.9rem', opacity: 0.9 }}>
              <li>✨ Индивидуальная базовая линия</li>
              <li>📊 Своя амплитуда и частота</li>
              <li>⚡ Отдельная скорость движения</li>
              <li>🌈 Вертикальный градиент (цвет → прозрачный)</li>
              <li>🎨 Плавное "затирание" линии вниз по оси Y</li>
            </ul>
          </div>
        </div>
      </WaveGradient>
    </div>
  );
}

export default WaveGradientMain;