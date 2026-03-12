import React, { useEffect, useRef } from 'react';

const ParticleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;
    let time = 0;
    let scrollProgress = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Smooth scroll tracking
    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll > 0) {
        // Use the first 600px of scroll for the sphere→ocean morph
        scrollProgress = Math.min(window.scrollY / 600, 1);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // ── Generate dots on a Fibonacci sphere ──
    const DOT_COUNT = 2500;
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));
    const dots = [];

    for (let i = 0; i < DOT_COUNT; i++) {
      const y = 1 - (i / (DOT_COUNT - 1)) * 2; // -1 to 1
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = goldenAngle * i;

      dots.push({
        // Normalised sphere coords
        sx: Math.cos(theta) * radiusAtY,
        sy: y,
        sz: Math.sin(theta) * radiusAtY,
        // Per-dot variation
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.4 + 0.8,
        size: Math.random() * 1.8 + 0.8,
        baseOpacity: Math.random() * 0.4 + 0.55,
      });
    }

    // Ease function for smooth morph
    const easeInOutCubic = (t) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const animate = () => {
      time += 0.008;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const W = canvas.width;
      const H = canvas.height;
      const centerX = W / 2;
      const centerY = H / 2;
      const sphereR = Math.min(W, H) * 0.42;

      const t = easeInOutCubic(scrollProgress); // morph factor 0→1

      // Sphere rotation (slows down as it morphs)
      const rotSpeed = 0.25 * (1 - t * 0.7);
      const rotY = time * rotSpeed;
      const rotX = Math.sin(time * 0.12) * 0.3 * (1 - t);

      const cosRY = Math.cos(rotY);
      const sinRY = Math.sin(rotY);
      const cosRX = Math.cos(rotX);
      const sinRX = Math.sin(rotX);

      // Scroll amount for ocean wave offset
      const waveScroll = window.scrollY * 0.3;

      // Project each dot
      const projected = [];

      for (let i = 0; i < DOT_COUNT; i++) {
        const d = dots[i];

        // ── Sphere position ──
        // Subtle inner movement: dots pulse slightly
        const pulse = 1 + Math.sin(time * d.speed + d.phase) * 0.04;
        let sx = d.sx * pulse;
        let sy = d.sy * pulse;
        let sz = d.sz * pulse;

        // Rotate Y
        let rx = sx * cosRY - sz * sinRY;
        let rz = sx * sinRY + sz * cosRY;
        // Rotate X
        let ry = sy * cosRX - rz * sinRX;
        let rz2 = sy * sinRX + rz * cosRX;

        // Perspective projection
        const perspective = 1.8;
        const scale = perspective / (perspective + rz2 * 0.6);
        const sphereScreenX = centerX + rx * sphereR * scale;
        const sphereScreenY = centerY + ry * sphereR * scale;
        const sphereSize = d.size * scale;
        const depthOpacity = 0.45 + (rz2 + 1) * 0.35; // front brighter

        // ── Ocean position ──
        // Spread dots across the full width
        const col = i % Math.ceil(Math.sqrt(DOT_COUNT));
        const row = Math.floor(i / Math.ceil(Math.sqrt(DOT_COUNT)));
        const cols = Math.ceil(Math.sqrt(DOT_COUNT));
        const rows = Math.ceil(DOT_COUNT / cols);

        const oceanX = (col / cols) * W * 1.1 - W * 0.05;
        const oceanBaseY = H * 0.45 + (row / rows) * H * 0.35;

        // Layered waves
        const wx = oceanX + waveScroll;
        const oceanY =
          oceanBaseY +
          Math.sin(wx * 0.008 + time * 1.6) * 25 +
          Math.sin(wx * 0.015 + time * 2.2 + d.phase) * 12 +
          Math.cos(wx * 0.004 + time * 0.9) * 18 +
          Math.sin((wx * 0.02 + row * 0.5) + time * 1.2) * 8;

        const oceanSize = d.size * 0.8;
        const oceanOpacity = 0.25 + Math.sin(wx * 0.01 + time) * 0.15;

        // ── Lerp sphere → ocean ──
        const finalX = sphereScreenX + (oceanX - sphereScreenX) * t;
        const finalY = sphereScreenY + (oceanY - sphereScreenY) * t;
        const finalSize = sphereSize + (oceanSize - sphereSize) * t;
        const finalOpacity = d.baseOpacity * (depthOpacity + (oceanOpacity - depthOpacity) * t);

        projected.push({
          x: finalX,
          y: finalY,
          size: finalSize,
          opacity: Math.max(0.05, Math.min(1, finalOpacity)),
          z: rz2,
        });
      }

      // Sort by depth so back dots render first (sphere effect)
      if (t < 0.8) {
        projected.sort((a, b) => a.z - b.z);
      }

      // ── Draw all dots ──
      for (let i = 0; i < projected.length; i++) {
        const p = projected[i];
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 212, 170, ${p.opacity})`;
        ctx.fill();
      }

      // Bright glow in center for sphere phase
      if (t < 1) {
        const glowAlpha = 0.14 * (1 - t);
        const grad = ctx.createRadialGradient(
          centerX, centerY, 0,
          centerX, centerY, sphereR * 1.5
        );
        grad.addColorStop(0, `rgba(0, 230, 184, ${glowAlpha})`);
        grad.addColorStop(0.5, `rgba(0, 212, 170, ${glowAlpha * 0.4})`);
        grad.addColorStop(1, 'rgba(0, 212, 170, 0)');
        ctx.fillStyle = grad;
        ctx.fillRect(centerX - sphereR * 1.5, centerY - sphereR * 1.5, sphereR * 3, sphereR * 3);
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
};

export default ParticleBackground;
