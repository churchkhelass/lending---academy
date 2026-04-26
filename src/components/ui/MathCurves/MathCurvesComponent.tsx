import React, { useRef, useEffect, useState, useCallback } from 'react';

interface Point {
  x: number;
  y: number;
}

// interface CanvasDimensions {
//   width: number;
//   height: number;
// }

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

  useEffect(() => {
    const animate = (): void => {
      setTime(prev => prev + 0.005);
      animationRef.current = requestAnimationFrame(animate);
    };
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width: number = canvas.clientWidth;
    const height: number = canvas.clientHeight;
    
    // Устанавливаем реальные размеры canvas
    canvas.width = width;
    canvas.height = height;
    
    // Функция преобразования координат
    const toPixel = (x: number, y: number): Point => {
      const px = (x - xMin) / (xMax - xMin) * width;
      const py = height - (y - yMin) / (yMax - yMin) * height;
      return { x: px, y: py };
    };
    
    // Рисуем тёмный фон
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, width, height);
    
    // Функция для рисования кривой
    const drawCurve = (curve: (x: number) => number): void => {
      ctx.beginPath();
      let firstPoint: boolean = true;
      
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
    
    // Рисуем кривые
    ctx.save();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1.5;
    
    drawCurve(curve1);
    drawCurve(curve2);
    
    ctx.restore();
    
    // Движущаяся точка для кривой 1
    const t1: number = time % 1;
    const x1: number = xMin + t1 * (xMax - xMin);
    const y1: number = curve1(x1);
    const { x: px1, y: py1 } = toPixel(x1, y1);
    
    // Движущаяся точка для кривой 2
    const t2: number = time % 1;
    const x2: number = xMin + t2 * (xMax - xMin);
    const y2: number = curve2(x2);
    const { x: px2, y: py2 } = toPixel(x2, y2);
    
    // Рисуем круглые "фотографии"
    const drawPhoto = (x: number, y: number, color: string): void => {
      ctx.save();
      ctx.shadowBlur = 0;
      ctx.beginPath();
      ctx.arc(x, y, 14, 0, 2 * Math.PI);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Имитация фото (маленький квадратик или блик)
      ctx.beginPath();
      ctx.arc(x - 3, y - 3, 3, 0, 2 * Math.PI);
      ctx.fillStyle = 'rgba(255,255,255,0.6)';
      ctx.fill();
      
      ctx.beginPath();
      ctx.rect(x - 6, y + 2, 12, 8);
      ctx.fillStyle = 'rgba(0,0,0,0.5)';
      ctx.fill();
      ctx.fillStyle = '#ffd966';
      ctx.fillRect(x - 5, y + 3, 10, 6);
      ctx.restore();
    };
    
    drawPhoto(px1, py1, '#ff6b6b');
    drawPhoto(px2, py2, '#6b9fff');
    
    // Легенда
    ctx.font = '12px monospace';
    ctx.fillStyle = '#888';
    ctx.fillText('y = √x', 15, 30);
    ctx.fillText('y = x²', 15, 50);
    
  }, [time, curve1, curve2, xMin, xMax, yMin, yMax]);

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
    </div>
  );
};

export default MathCurvesWithPhotos;