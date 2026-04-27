import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';

// Импорт изображений
import contact from '../../../assets/oContact.png';
import neProstoSite from '../../../assets/oNeProstoSite.png';
import siteMustSell from '../../../assets/oSiteMustSell.png';
import team from '../../../assets/oTeam.png';
import workFromKPI from '../../../assets/oWorkFromKPI.png';

interface Point {
  x: number;
  y: number;
}

const MathCurvesWithPhotos: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const [time, setTime] = useState<number>(0);

  // Параметры кривых
  const curve1 = useCallback((x: number): number => -Math.sqrt(x) + 2.4, []);
  const curve2 = useCallback((x: number): number => x * x + 0.5, []);

  // Область отображения
  const xMin: number = 0;
  const xMax: number = 2;
  const yMin: number = 0;
  const yMax: number = 2;

  // Конфигурация точек
  const POINTS_ON_CURVE1 = 2;
  const POINTS_ON_CURVE2 = 3;
  
  // Массив изображений
  const images = useMemo(() => [
    contact,
    neProstoSite,
    siteMustSell,
    team,
    workFromKPI
  ], []);

  // Pre-load images
  const loadedImages = useRef<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState<boolean>(false);

  // Загрузка изображений
  useEffect(() => {
    const loadPromises = images.map((src, index) => {
      return new Promise<HTMLImageElement>((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
          loadedImages.current[index] = img;
          resolve(img);
        };
        img.onerror = () => {
          console.warn(`Failed to load image ${index}`);
          // Создаем цветную заглушку
          const canvas = document.createElement('canvas');
          canvas.width = 32;
          canvas.height = 32;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.fillStyle = `hsl(${index * 72}, 70%, 50%)`;
            ctx.fillRect(0, 0, 32, 32);
            ctx.fillStyle = 'white';
            ctx.font = 'bold 16px monospace';
            ctx.fillText(`${index + 1}`, 12, 22);
          }
          const fallbackImg = new Image();
          fallbackImg.src = canvas.toDataURL();
          loadedImages.current[index] = fallbackImg;
          resolve(fallbackImg);
        };
      });
    });

    Promise.all(loadPromises).then(() => {
      setImagesLoaded(true);
    });
  }, [images]);

  // Анимация времени
  useEffect(() => {
    const animate = (): void => {
      setTime(prev => prev + 0.002);
      animationRef.current = requestAnimationFrame(animate);
    };
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Получение позиций точек на кривых
  const getPointOnCurve1 = useCallback((index: number): { x: number; y: number } => {
    const t = (time + index / POINTS_ON_CURVE1) % 1;
    const x = xMin + t * (xMax - xMin);
    const y = curve1(x);
    return { x, y };
  }, [time, curve1, xMin, xMax]);

  const getPointOnCurve2 = useCallback((index: number): { x: number; y: number } => {
    const cycleLength = 0.8;
    const t = (time + index / POINTS_ON_CURVE2) % cycleLength;
    const x = xMin + (t / cycleLength) * (xMax - xMin);
    const y = curve2(x);
    return { x, y };
  }, [time, curve2, xMin, xMax]);

  // Рисование кадра
  useEffect(() => {
    if (!imagesLoaded) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width: number = canvas.clientWidth;
    const height: number = canvas.clientHeight;
    
    canvas.width = width;
    canvas.height = height;
    
    // Функция преобразования координат
    const toPixel = (x: number, y: number): Point => {
        const px = (x - xMin) / (xMax - xMin) * width;
        const py = height - (y - yMin) / (yMax - yMin) * height;
        return { x: px, y: py };
    };

    // Очистка и рисование фона
    ctx.fillStyle = '#1A1A1A';
    ctx.fillRect(0, 0, width, height);
    
    // Рисование сетки (опционально, для лучшей ориентации)
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= 4; i++) {
      const x = xMin + (i / 4) * (xMax - xMin);
      const y = yMin + (i / 4) * (yMax - yMin);
      const { x: px, y: py } = toPixel(x, yMin);
      const { x: px2, y: py2 } = toPixel(x, yMax);
      const { x: px3, y: py3 } = toPixel(xMin, y);
      const { x: px4, y: py4 } = toPixel(xMax, y);
      
      ctx.beginPath();
      ctx.moveTo(px, py);
      ctx.lineTo(px2, py2);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(px3, py3);
      ctx.lineTo(px4, py4);
      ctx.stroke();
    }
    
    // Рисование кривых
    const drawCurve = (curve: (x: number) => number, color: string): void => {
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = 2.5;
      let firstPoint = true;
      
      for (let x = xMin; x <= xMax; x += 0.01) {
        const y = curve(x);
        if (y >= yMin && y <= yMax) {
          const { x: px, y: py } = toPixel(x, y);
          if (firstPoint) {
            ctx.moveTo(px, py);
            firstPoint = false;
          } else {
            ctx.lineTo(px, py);
          }
        } else {
          firstPoint = true;
        }
      }
      ctx.stroke();
    };
    
    drawCurve(curve1, 'grey');
    drawCurve(curve2, 'grey');
    
    // Функция рисования фото
    const drawPhoto = (image: HTMLImageElement, x: number, y: number, borderColor: string, label?: string): void => {
      ctx.save();
            
      // Рисуем изображение
      ctx.drawImage(image, x - 100, y - 100, 200, 200);
            
      ctx.restore();
    };
    
    // Распределение изображений по точкам
    // Всего 5 точек, используем все 5 изображений по порядку
    const getImageForPoint = (pointIndex: number): HTMLImageElement => {
      return loadedImages.current[pointIndex % images.length];
    };
    
    // Рисуем точки на первой кривой (2 точки)
    for (let i = 0; i < POINTS_ON_CURVE1; i++) {
      const { x, y } = getPointOnCurve1(i);
      if (y >= yMin && y <= yMax) {
        const { x: px, y: py } = toPixel(x, y);
        const image = getImageForPoint(i);
        drawPhoto(image, px, py, '#ff6b6b', `P${i + 1}`);
      }
    }
    
    // Рисуем точки на второй кривой (3 точки)
    for (let i = 0; i < POINTS_ON_CURVE2; i++) {
      const { x, y } = getPointOnCurve2(i);
      if (y >= yMin && y <= yMax) {
        const { x: px, y: py } = toPixel(x, y);
        const image = getImageForPoint(i + POINTS_ON_CURVE1);
        drawPhoto(image, px, py, '', `P${i + 1 + POINTS_ON_CURVE1}`);
      }
    }
    
    // Легенда
    // ctx.font = '12px monospace';
    // ctx.fillStyle = '#888';
    // ctx.fillText('Кривая 1: y = -√x + 2.4 (2 фото)', 15, 30);
    // ctx.fillText('Кривая 2: y = x² + 0.5 (3 фото)', 15, 50);
    // ctx.fillStyle = '#666';
    // ctx.font = '10px monospace';
    // ctx.fillText('5 фотографий движутся с одинаковым интервалом', 15, 70);
    
  }, [time, curve1, curve2, imagesLoaded, images.length, getPointOnCurve1, getPointOnCurve2]);

  return (
    <div style={{
      position: 'relative',
      width: '100vw',
      height: '50vh',
      backgroundColor: '#1A1A1A',
      overflow: 'hidden'
    }}>
      <canvas 
        ref={canvasRef} 
        style={{
          width: '100%',
          height: '100%',
          display: 'block'
        }}
      />
      {!imagesLoaded && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: 'white',
          fontFamily: 'monospace',
          backgroundColor: 'rgba(0,0,0,0.8)',
          padding: '10px 20px',
          borderRadius: '8px'
        }}>
          Загрузка изображений...
        </div>
      )}
    </div>
  );
};

export default MathCurvesWithPhotos;