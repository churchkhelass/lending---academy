// WaveGradient.tsx
import React, { type CSSProperties, useEffect, useRef } from 'react';
import './WaveGradient.scss';

export interface SineWaveConfig {
  /** Цвет волны */
  color: string;
  /** Второй цвет для градиента (если указан, создается вертикальный градиент) */
  gradientColor?: string;
  /** Амплитуда волны (высота колебаний) */
  amplitude: number;
  /** Частота волны (количество волн на экран) */
  frequency: number;
  /** Скорость движения волны */
  speed: number;
  /** Базовая линия (Y-координата центра волны, 0-1 от высоты) */
  baseline: number;
  /** Фаза волны (сдвиг в градусах) */
  phase: number;
  /** Заполнять ли область под волной */
  fillUnder: boolean;
  /** Прозрачность заливки (0-1) */
  fillOpacity?: number;
}

export interface WaveGradientProps {
  /** Конфигурация волн (можно передать массив) */
  waves?: SineWaveConfig[];
  /** Фоновый цвет (заполняет весь блок) */
  backgroundColor?: string;
  /** Скорость анимации в секундах (полный цикл) */
  animationDuration?: number;
  /** Дочерние элементы */
  children?: React.ReactNode;
  /** Дополнительные CSS-классы */
  className?: string;
  /** Дополнительные inline-стили */
  style?: CSSProperties;
  /** Прозрачность всего компонента */
  opacity?: number;
  /** Z-index компонента */
  zIndex?: number;
}

// Конфигурация по умолчанию для трёх волн с градиентами
const DEFAULT_WAVES: SineWaveConfig[] = [
  // {
  //   color: '#FFFFFF',
  //   gradientColor: 'rgba(255,255,255,0)',
  //   amplitude: 0.15,
  //   frequency: 1.5,
  //   speed: 0.8,
  //   baseline: 0.85,
  //   phase: 0,
  //   fillUnder: true,
  //   fillOpacity: 0.5,
  // },
  {
    color: '#1A1A1A',
    gradientColor: '#000000',
    amplitude: 0.2,
    frequency: 2.5,
    speed: 1.5,
    baseline: 0.2,
    phase: 90,
    fillUnder: true,
    fillOpacity: 1,
  },
  {
    color: '#AFE118',
    gradientColor: 'rgba(175,225,24,0)',
    amplitude: 0.25,
    frequency: 2.0,
    speed: 1.2,
    baseline: 0.5,
    phase: 45,
    fillUnder: true,
    fillOpacity: 1,
  },
];

/**
 * WaveGradient - компонент с волновым градиентом
 * 
 * Принцип работы:
 * - Каждая волна движется по синусоиде с индивидуальными параметрами
 * - Область под волной заполняется вертикальным градиентом (от цвета волны к прозрачному)
 * - Плавный переход создает эффект "затирания" линии
 */
export const WaveGradient: React.FC<WaveGradientProps> = ({
  waves = DEFAULT_WAVES,
  backgroundColor = '#1a1a2e',
  animationDuration = 10,
  children,
  className = '',
  style = {},
  opacity = 1,
  zIndex = 0,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const timeRef = useRef<number>(0);
  const animationRef = useRef<number>(0);

  // Эффект для анимации волн
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let startTime: number | null = null;

    const resizeObserver = new ResizeObserver(() => {
      if (container) {
        const rect = container.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
        drawWaves(timeRef.current);
      }
    });

    resizeObserver.observe(container);

    // Функция для вычисления Y-координаты синусоиды
    const getWaveY = (
      x: number,
      config: SineWaveConfig,
      time: number,
      width: number,
      height: number
    ): number => {
      const { amplitude, frequency, speed, baseline, phase } = config;

      // Нормализуем x от 0 до 2PI * frequency
      const normalizedX = (x / width) * Math.PI * 2 * frequency;

      // Добавляем временной сдвиг и фазу
      const timeShift = time * speed;
      const phaseRad = (phase * Math.PI) / 180;

      // Вычисляем значение синуса (-amplitude..amplitude)
      const sinValue = amplitude * Math.sin(normalizedX + timeShift + phaseRad);

      // Преобразуем в координату Y (базовая линия + отклонение)
      const baselineY = baseline * height;
      const y = baselineY + sinValue * height;

      return Math.max(0, Math.min(height, y));
    };

    // Создание вертикального градиента для заливки под волной
    const createVerticalGradient = (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      width: number,
      height: number,
      waveConfig: SineWaveConfig
    ): CanvasGradient => {
      const { color, gradientColor, fillOpacity = 0.3 } = waveConfig;

      // Создаем градиент от верхней точки кривой до низа
      const gradient = ctx.createLinearGradient(x, y, x, height - 50);

      // Прозрачный сверху (у линии)
      gradient.addColorStop(0, 'rgba(0,0,0,0)');

      // Плавный переход к непрозрачному цвету внизу
      if (gradientColor) {
        gradient.addColorStop(0.3, gradientColor);
        gradient.addColorStop(1, color);
      } else {
        gradient.addColorStop(0.3, color);
        gradient.addColorStop(1, color);
      }

      return gradient;
    };

    // Основная функция отрисовки
    const drawWaves = (time: number) => {
      if (!canvas || !ctx) return;

      const width = canvas.width;
      const height = canvas.height;

      if (width === 0 || height === 0) return;

      // Очищаем canvas
      ctx.clearRect(0, 0, width, height);

      // 1. Рисуем фон
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 50, width, height);

      // Сортируем волны по baseline (от нижних к верхним для правильного наложения)
      const sortedWaves = [...waves].sort((a, b) => a.baseline - b.baseline);

      // 2. Рисуем каждую волну
      for (const waveConfig of sortedWaves) {
        // Массивы для хранения точек
        const points: { x: number; y: number }[] = [];

        // Проходим по всем пикселям по X
        for (let x = 0; x <= width; x++) {
          const y = getWaveY(x, waveConfig, time, width, height);
          points.push({ x, y });
        }

        // Если нужно заполнить область под волной
        if (waveConfig.fillUnder) {
          // Для каждого сегмента создаем свой градиент для плавного перехода
          for (let i = 0; i < points.length - 1; i++) {
            const startPoint = points[i];
            const endPoint = points[i + 1];

            // Создаем путь для текущего сегмента
            ctx.beginPath();
            ctx.moveTo(startPoint.x, startPoint.y);
            ctx.lineTo(endPoint.x, endPoint.y);
            ctx.lineTo(endPoint.x, height);
            ctx.lineTo(startPoint.x, height);
            ctx.closePath();

            // Создаем вертикальный градиент для этого сегмента
            const avgY = (startPoint.y + endPoint.y) / 2;
            const gradient = createVerticalGradient(ctx, startPoint.x, avgY, width, height, waveConfig);

            ctx.fillStyle = gradient;
            ctx.fill();
          }
          ctx.strokeStyle = waveConfig.color;
          ctx.lineWidth = 2;
          ctx.globalAlpha = waveConfig.fillOpacity ?? 0.8;
          ctx.stroke();
        } else {
          // Только линия без заливки
          ctx.beginPath();
          for (let i = 0; i < points.length; i++) {
            if (i === 0) {
              ctx.moveTo(points[i].x, points[i].y);
            } else {
              ctx.lineTo(points[i].x, points[i].y);
            }
          }
          ctx.strokeStyle = waveConfig.color;
          ctx.lineWidth = 3;
          ctx.globalAlpha = 1;
          ctx.stroke();
        }
      }

      // Сброс глобальной прозрачности
      ctx.globalAlpha = 1.0;
    };

    const animate = (timestamp: number) => {
      if (startTime === null) {
        startTime = timestamp;
      }

      const elapsed = timestamp - startTime;
      // Нормализуем время для анимации (полный цикл за animationDuration секунд)
      const time = (elapsed / 1000) * (Math.PI * 2 / animationDuration);
      timeRef.current = time;

      drawWaves(time);

      animationRef.current = requestAnimationFrame(animate);
    };

    // Начальная отрисовка
    const rect = container.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    drawWaves(0);

    // Запуск анимации
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      resizeObserver.disconnect();
    };
  }, [waves, backgroundColor, animationDuration]);

  const containerStyle: CSSProperties = {
    position: 'relative',
    width: '100%',
    // height: '20vh',
    // minHeight: 'inherit',
    opacity,
    zIndex,
    overflow: 'hidden',
    ...style,
  };

const contentStyle: CSSProperties = {
  position: 'relative',
  zIndex: 2,
  width: '100%',
  height: '100%',
  pointerEvents: 'auto',
};

return (
  <div ref={containerRef} className={`wave-gradient ${className}`} style={containerStyle}>
    <canvas
      ref={canvasRef}
      className="wave-gradient__canvas"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'block',
        pointerEvents: 'none',
      }}
    />
    <div style={contentStyle}>{children}</div>
  </div>
);
};

export default WaveGradient;