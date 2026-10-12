import React, { useEffect, useRef } from 'react';

interface Petal {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotSpeed: number;
  swing: number;
  swingSpeed: number;
  opacity: number;
  type: 'petal' | 'sparkle' | 'heart';
}

export const WeddingPetalsCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const scrollVelocityRef = useRef<number>(0);
  const lastScrollYRef = useRef<number>(0);
  const lastScrollTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement.clientHeight || window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Track scroll velocity to animate petals dynamically on scroll
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const currentTime = Date.now();
      const dt = Math.max(1, currentTime - lastScrollTimeRef.current);
      const dy = currentScrollY - lastScrollYRef.current;
      
      const velocity = dy / dt;
      scrollVelocityRef.current = Math.min(Math.max(velocity * 3, -10), 10);
      
      lastScrollYRef.current = currentScrollY;
      lastScrollTimeRef.current = currentTime;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Initialize 24 romantic petals & sparkles
    const petalCount = 28;
    const petals: Petal[] = [];

    for (let i = 0; i < petalCount; i++) {
      const isSparkle = i % 5 === 0;
      const isHeart = i % 7 === 0;
      petals.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: isSparkle ? 2 + Math.random() * 2.5 : isHeart ? 8 + Math.random() * 5 : 10 + Math.random() * 12,
        speedY: 0.6 + Math.random() * 1.2,
        speedX: (Math.random() - 0.5) * 0.8,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.03,
        swing: Math.random() * Math.PI * 2,
        swingSpeed: 0.02 + Math.random() * 0.025,
        opacity: 0.35 + Math.random() * 0.45,
        type: isHeart ? 'heart' : isSparkle ? 'sparkle' : 'petal'
      });
    }

    const drawPetal = (p: Petal) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.globalAlpha = p.opacity;

      if (p.type === 'sparkle') {
        // Golden sparkling star
        ctx.fillStyle = '#fde047';
        ctx.beginPath();
        ctx.arc(0, 0, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowColor = '#fbbf24';
        ctx.shadowBlur = 6;
      } else if (p.type === 'heart') {
        // Soft pink heart
        ctx.fillStyle = '#ff7b92';
        ctx.beginPath();
        const s = p.size / 10;
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(-5 * s, -7 * s, -10 * s, 0, 0, 10 * s);
        ctx.bezierCurveTo(10 * s, 0, 5 * s, -7 * s, 0, 0);
        ctx.fill();
      } else {
        // Rose Petal with realistic curved shape & gradient
        const grad = ctx.createLinearGradient(-p.size, -p.size, p.size, p.size);
        grad.addColorStop(0, '#ffa8b8');
        grad.addColorStop(0.5, '#ff6e85');
        grad.addColorStop(1, '#e11d48');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.moveTo(0, -p.size);
        ctx.bezierCurveTo(p.size * 0.8, -p.size * 0.5, p.size * 0.9, p.size * 0.8, 0, p.size);
        ctx.bezierCurveTo(-p.size * 0.9, p.size * 0.8, -p.size * 0.8, -p.size * 0.5, 0, -p.size);
        ctx.fill();

        // Delicate inner petal highlight
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }

      ctx.restore();
    };

    const render = (_time: number) => {
      ctx.clearRect(0, 0, width, height);

      // Dampen scroll velocity smoothly back to 0
      scrollVelocityRef.current *= 0.92;
      const scrollExtra = scrollVelocityRef.current * 1.5;

      for (let i = 0; i < petals.length; i++) {
        const p = petals[i];
        p.swing += p.swingSpeed;
        p.rotation += p.rotSpeed + scrollExtra * 0.02;

        p.x += Math.sin(p.swing) * 0.9 + p.speedX;
        p.y += p.speedY + scrollExtra;

        // Wrap around horizontally
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;

        // Wrap around vertically
        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        } else if (p.y < -20) {
          p.y = height + 20;
          p.x = Math.random() * width;
        }

        drawPetal(p);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-30 opacity-80"
    />
  );
};
