import React, { useEffect, useRef } from 'react';
// Correcting the GSAP import to use a CDN for browser compatibility
import { gsap } from 'https://cdn.skypack.dev/gsap';

// Capital Component - The main feature page
const Capital = () => {
  // Refs for DOM elements we'll animate or interact with
  const capitalContainerRef = useRef(null);
  const capitalGlowRef = useRef(null);
  const capitalCanvasRef = useRef(null);
  const capitalTitleRef = useRef(null);
  const capitalSubtitleRef = useRef(null);

  // Effect for setting up animations and event listeners
  useEffect(() => {
    // Ensure container is available before proceeding
    const container = capitalContainerRef.current;
    if (!container) return;

    const glow = capitalGlowRef.current;
    const canvas = capitalCanvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // --- 1. CURSOR GLOW EFFECT ---
    // Use GSAP to set the initial transform origin to the center
    gsap.set(glow, { xPercent: -50, yPercent: -50 });

    const handleMouseMove = (e) => {
      // GSAP now correctly moves the centered glow to the cursor position
      gsap.to(glow, {
        duration: 0.6,
        x: e.clientX,
        y: e.clientY,
        ease: 'power2.out',
      });
    };

    container.addEventListener('mousemove', handleMouseMove);

    // --- 2. CANVAS PARTICLE ANIMATION ---
    let particles = [];
    const particleCount = 100;

    // Initialize particles
    const initParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(Math.random() * canvas.width, Math.random() * canvas.height));
      }
    };

    // Set canvas size to fill the screen
    const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles(); // Re-initialize particles on resize
    };
    
    // Particle object definition
    class Particle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 1.5 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
      }
      update() {
        if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
        if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
        this.x += this.speedX;
        this.y += this.speedY;
      }
      draw() {
        ctx.fillStyle = 'rgba(254, 240, 138, 0.8)'; // Yellow-ish particles
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    resizeCanvas(); // Call after functions are defined
    window.addEventListener('resize', resizeCanvas);
    
    // Connect particles with lines
    const connectParticles = () => {
      let opacityValue = 1;
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          let distance = Math.sqrt(
            (particles[a].x - particles[b].x) * (particles[a].x - particles[b].x) +
            (particles[a].y - particles[b].y) * (particles[a].y - particles[b].y)
          );

          if (distance < 120) {
            opacityValue = 1 - distance / 120;
            ctx.strokeStyle = `rgba(254, 240, 138, ${opacityValue * 0.5})`; // Softer yellow lines
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    };

    // Animation loop for the canvas
    const animateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      connectParticles();
      animationFrameId = requestAnimationFrame(animateParticles);
    };
    animateParticles();


    // --- 3. GSAP TEXT ANIMATIONS ---
    // Split text into characters for the animation
    const splitText = (selector) => {
        const elem = document.querySelector(selector);
        if (!elem) return [];
        const chars = elem.innerText.split('').map(char => {
            const span = document.createElement('span');
            // Use non-breaking space for spaces to maintain layout
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.display = 'inline-block';
            return span;
        });
        elem.innerHTML = '';
        elem.append(...chars);
        return chars;
    }

    const titleChars = splitText('.capital-title-main');
    const subtitleChars = splitText('.capital-title-sub');

    // Create a GSAP timeline for sequencing animations
    const tl = gsap.timeline();

    // Animate the main title
    tl.from(titleChars, {
      duration: 1.2,
      opacity: 0,
      y: 80,
      rotateX: -90,
      stagger: 0.03,
      ease: 'power3.out',
    })
    // Animate the subtitle
    .from(subtitleChars, {
      duration: 1.2,
      opacity: 0,
      y: 80,
      rotateX: -90,
      stagger: 0.03,
      ease: 'power3.out',
    }, "-=1") // Overlap with previous animation
    // Animate the right-side content
    .from('.capital-content-section > *', {
        duration: 1.5,
        opacity: 0,
        x: 50,
        stagger: 0.2,
        ease: 'expo.out'
    }, "-=0.8");


    // --- 4. CLEANUP ---
    // This function runs when the component unmounts
    return () => {
      window.cancelAnimationFrame(animationFrameId);
      container.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []); // Empty dependency array means this effect runs only once on mount

  return (
    <div
      ref={capitalContainerRef}
      className="capital-container bg-black text-white min-h-screen w-full overflow-hidden relative font-sans flex items-center justify-center p-4"
    >
      {/* Canvas for particle background */}
      <canvas ref={capitalCanvasRef} className="capital-canvas absolute top-0 left-0 w-full h-full z-0"></canvas>

      {/* The yellow glow that follows the cursor */}
      <div
        ref={capitalGlowRef}
        className="capital-glow pointer-events-none absolute top-0 left-0 w-96 h-96 bg-yellow-400 rounded-full z-10"
        style={{
            filter: 'blur(150px)',
            opacity: 0.2
        }}
      ></div>

      {/* Main content grid */}
      <div className="capital-grid-container grid grid-cols-1 md:grid-cols-2 gap-16 items-center w-full max-w-7xl mx-auto z-20">
        
        {/* Left Side: Animated Title */}
        <div className="capital-title-section text-center md:text-left">
          <h1 
            ref={capitalTitleRef} 
            className="capital-title-main text-6xl md:text-8xl font-bold tracking-tighter leading-none text-white" 
            style={{ 
              perspective: 400,
              textShadow: '0 0 8px rgba(254, 240, 138, 0.6), 0 0 20px rgba(250, 204, 21, 0.4)'
            }}
          >
            Our Work
          </h1>
          <h2 
            ref={capitalSubtitleRef} 
            className="capital-title-sub text-6xl md:text-8xl font-bold tracking-tighter text-white" 
            style={{ 
              perspective: 400,
              textShadow: '0 0 8px rgba(254, 240, 138, 0.6), 0 0 20px rgba(250, 204, 21, 0.4)'
            }}
          >
            Your Success
          </h2>
        </div>

        {/* Right Side: IT Services Content */}
        <div className="capital-content-section space-y-6 text-white">
          <h3 className="capital-content-header text-3xl font-semibold" style={{textShadow: '0 0 8px rgba(254, 240, 138, 0.6)'}}>
            Empowering Your Vision with Cutting-Edge IT Solutions.
          </h3>
          <p className="capital-content-paragraph text-lg leading-relaxed" style={{textShadow: '0 0 5px rgba(255, 255, 255, 0.3)'}}>
            We provide a comprehensive suite of IT services designed to elevate your business. From cloud infrastructure and cybersecurity to bespoke software development, we are the architects of your digital transformation.
          </p>
          <p className="capital-content-paragraph text-lg leading-relaxed" style={{textShadow: '0 0 5px rgba(255, 255, 255, 0.3)'}}>
            Our expert team partners with you to understand your unique challenges and goals. We leverage the latest technologies to build robust, scalable, and secure systems that drive growth and efficiency, ensuring you stay ahead in a competitive market.
          </p>
        </div>

      </div>
    </div>
  );
};

export default Capital;
