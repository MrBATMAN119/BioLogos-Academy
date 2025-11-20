import React, { useEffect, useRef } from 'react';

interface VisualizerProps {
  isActive: boolean;
  volume: number;
}

const Visualizer: React.FC<VisualizerProps> = ({ isActive, volume }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let phase = 0;

    const draw = () => {
      if (!isActive) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Draw idle circle
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, 50, 0, 2 * Math.PI);
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.3)'; // bio-accent
        ctx.lineWidth = 2;
        ctx.stroke();
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = 50 + (volume * 200); // React to volume

      // Core
      const gradient = ctx.createRadialGradient(centerX, centerY, 10, centerX, centerY, radius);
      gradient.addColorStop(0, 'rgba(251, 191, 36, 0.8)'); // bio-gold
      gradient.addColorStop(0.5, 'rgba(56, 189, 248, 0.5)'); // bio-accent
      gradient.addColorStop(1, 'rgba(56, 189, 248, 0)');

      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Orbital Waves
      ctx.strokeStyle = '#fbbf24';
      ctx.lineWidth = 2;
      
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        const waveRad = radius + 20 + (i * 15) + Math.sin(phase + i) * 5;
        ctx.arc(centerX, centerY, waveRad, 0, 2 * Math.PI);
        ctx.globalAlpha = 0.5 - (i * 0.15);
        ctx.stroke();
      }
      ctx.globalAlpha = 1.0;

      phase += 0.05;
      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isActive, volume]);

  return (
    <div className="w-full h-64 flex items-center justify-center">
      <canvas 
        ref={canvasRef} 
        width={400} 
        height={300} 
        className="w-full max-w-[400px]"
      />
    </div>
  );
};

export default Visualizer;
