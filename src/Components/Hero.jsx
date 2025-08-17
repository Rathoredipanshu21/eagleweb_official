import React, { useLayoutEffect, useRef } from 'react';

// This component uses Tailwind CSS for styling.
// Make sure you have Tailwind CSS set up in your project.

// IMPORTANT: This component relies on the GSAP library being loaded globally.
// Please ensure you include it in your project by adding this script
// tag to your `public/index.html` file, inside the `<head>` section: 
//
// <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>

// --- SVG Icon Components ---
const TwitterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-.424.727-.666 1.581-.666 2.477 0 1.61.82 3.027 2.053 3.848-.764-.024-1.482-.232-2.11-.583v.062c0 2.256 1.605 4.14 3.737 4.568-.39.106-.803.163-1.227.163-.3 0-.593-.028-.877-.082.593 1.85 2.303 3.2 4.334 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.063 1.323 4.518 2.09 7.141 2.09 8.571 0 13.267-7.095 12.979-13.569.895-.646 1.67-1.456 2.285-2.374z"/>
  </svg>
);
const LinkedinIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
);
const GithubIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
);
const InstagramIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.584.069-4.85c.149-3.225 1.664-4.771 4.919 4.919 1.266-.057 1.644-.069 4.85-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.359 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.359-.2 6.78-2.618 6.98-6.98.059-1.281.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.2-4.359-2.618-6.78-6.98-6.98-1.281-.059-1.689-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.441 1.441 1.441 1.441-.645 1.441-1.441-.645-1.44-1.441-1.44z"/></svg>
);
const Star = ({ size, left, top }) => (
  <div 
    className="floating-star absolute rounded-full bg-yellow-400"
    style={{
      width: `${size}px`, height: `${size}px`, left: `${left}%`, top: `${top}%`,
      boxShadow: `0 0 ${size * 2}px ${size * 0.5}px rgba(250, 204, 21, 0.7)`,
    }}
  ></div>
);

// --- Main App Component ---
export default function App() {
  const comp = useRef(null);

  useLayoutEffect(() => {
    const gsap = window.gsap;
    if (!gsap) {
      console.error("GSAP not found. Please ensure the GSAP library is loaded.");
      return;
    }

    const ctx = gsap.context(() => {
      
      const elements = gsap.utils.toArray('.floating-element, .floating-star');
      const heroContent = comp.current;

      const handleMouseMove = (event) => {
        const { clientX, clientY } = event;
        const xPercent = clientX / window.innerWidth - 0.5;
        const yPercent = clientY / window.innerHeight - 0.5;

        gsap.to(".cursor-light", {
          '--x': `${clientX}px`,
          '--y': `${clientY}px`,
          duration: 0.6,
          ease: 'power2.out',
        });

        elements.forEach(el => {
          const depth = parseFloat(el.dataset.depth || 0);
          const rotateX = yPercent * depth * -50;
          const rotateY = xPercent * depth * 50;
          gsap.to(el, {
            rotationX: rotateX,
            rotationY: rotateY,
            z: Math.abs(xPercent * depth * 100),
            duration: 1.2,
            ease: 'power3.out',
          });
        });
      };
      
      heroContent.addEventListener('mousemove', handleMouseMove);

      elements.forEach(el => {
        const isStar = el.classList.contains('floating-star');
        el.dataset.depth = Math.random() * 0.4 + 0.1;

        gsap.to(el, {
          x: `random(-250, 250)`,
          y: `random(-250, 250)`,
          duration: 'random(10, 20)',
          ease: 'none',
          repeat: -1,
          yoyo: true,
        });

        if (isStar) {
          gsap.to(el, {
            opacity: 'random(0.3, 1)', scale: 'random(0.8, 1.2)',
            duration: 'random(2, 4)', ease: 'power1.inOut',
            repeat: -1, yoyo: true,
          });
        }
      });

      const heroText = gsap.utils.toArray('.hero-text');
      heroText.forEach(text => {
        const chars = text.textContent.split(''); text.textContent = '';
        chars.forEach(char => {
          const span = document.createElement('span');
          span.textContent = char === ' ' ? '\u00A0' : char;
          span.className = 'char inline-block'; text.appendChild(span);
        });
      });

      const tl = gsap.timeline({ delay: 0.5 });
      tl.from('.char', {
        y: 80, opacity: 0, skewX: 45, filter: 'blur(10px)',
        stagger: 0.04, duration: 1.2, ease: 'power4.out',
      })
      .from(".sub-text", {
        y: 40, opacity: 0, filter: 'blur(5px)',
        duration: 1, ease: 'power3.out',
      }, "-=1")
      .from(".cta-button, .social-icons", {
        scale: 0.8, opacity: 0, stagger: 0.1,
        duration: 0.8, ease: "back.out(1.7)",
      }, "-=0.7");

    }, comp);

    return () => { ctx.revert(); };
  }, []);

  const mathExpressions = [
    'a²+b²=c²', 'f(x) = ax² + bx + c', 'Σ', '∫(x)dx', 'E=mc²', '∇·E=ρ/ε₀', '∂Ψ/∂t', 'd/dx', '√-1', 'lim x→∞', 'π ≈ 3.14159', 'Fib(n)', 'λf=c', 'x = (-b ± √(b²-4ac))/2a', 'e^(iπ) + 1 = 0', '∇²'
  ];
  const stars = [
    { size: 3, left: 10, top: 20 }, { size: 2, left: 80, top: 30 }, { size: 4, left: 90, top: 70 },
    { size: 2, left: 25, top: 85 }, { size: 3, left: 5, top: 60 }, { size: 2, left: 50, top: 10 },
    { size: 3, left: 70, top: 90 }, { size: 2, left: 30, top: 40 }, { size: 3, left: 95, top: 5 },
    { size: 2, left: 5, top: 95 }, { size: 4, left: 45, top: 50 }, { size: 2, left: 60, top: 25 },
    { size: 3, left: 15, top: 5 }, { size: 2, left: 85, top: 55 }, { size: 3, left: 98, top: 45 },
  ];

  return (
    <section ref={comp} className="hero-container relative w-full h-screen bg-black text-white overflow-hidden">
      
      <div className="absolute top-0 left-0 w-full h-1/2 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(250, 204, 21, 0.20), transparent 70%)'
        }}
      ></div>

      <div 
        className="cursor-light fixed inset-0 pointer-events-none z-30"
        style={{
          '--x': '50vw', '--y': '50vh',
          background: 'radial-gradient(circle at var(--x) var(--y), rgba(250, 204, 21, 0.25), transparent 30vw)'
        }}
      ></div>
      
      <div className="absolute inset-0 w-full h-full" style={{ perspective: '1200px' }}>
        {mathExpressions.map((exp, i) => (
          <div 
            key={`math-${i}`} 
            className="floating-element absolute text-gray-400 border border-gray-800 rounded-lg px-4 py-2 text-lg font-mono bg-black/50 backdrop-blur-sm opacity-40"
            style={{ 
              top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`,
              transform: 'translate(-50%, -50%)'
            }}
          >
            {exp}
          </div>
        ))}
        {stars.map((star, i) => <Star key={`star-${i}`} {...star} />)}
      </div>

      <div className="relative z-10 w-full h-full flex flex-col justify-center items-center text-center p-4">
        <div>
          <h1 className="hero-text text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-gray-100">
            Engineering the Future.
          </h1>
          {/* UPDATED: Reduced top margin for tighter spacing */}
          <h1 className="hero-text text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-yellow-400 mt-1">
            Innovative IT Solutions.
          </h1>
        </div>
        {/* UPDATED: Reduced top margin for tighter spacing */}
        <p className="sub-text max-w-3xl mx-auto mt-4 text-base md:text-lg text-gray-300">
          We build robust, scalable, and custom software to propel your business into the next generation of technology.
        </p>
        
       
      </div>
        
      <div className="social-icons absolute bottom-8 left-8 z-10 flex flex-row items-center gap-4">
        <span className="text-gray-500 text-sm font-medium mr-2">Follow us on:</span>
        <a href="#" className="text-gray-500 hover:text-yellow-400 transition-colors duration-300 transform hover:scale-110"><TwitterIcon /></a>
        <a href="#" className="text-gray-500 hover:text-yellow-400 transition-colors duration-300 transform hover:scale-110"><LinkedinIcon /></a>
        <a href="#" className="text-gray-500 hover:text-yellow-400 transition-colors duration-300 transform hover:scale-110"><GithubIcon /></a>
        <a href="#" className="text-gray-500 hover:text-yellow-400 transition-colors duration-300 transform hover:scale-110"><InstagramIcon /></a>
      </div>
    </section>
  );
}