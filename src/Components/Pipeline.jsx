import React, { useLayoutEffect, useRef, useEffect, useState } from 'react';
// Import GSAP and its plugins from a CDN
import { gsap } from 'https://cdn.skypack.dev/gsap';
import { MotionPathPlugin } from 'https://cdn.skypack.dev/gsap/MotionPathPlugin';

// Register the GSAP plugin
gsap.registerPlugin(MotionPathPlugin);

// Pipeline Component
export default function Pipeline() {
  const appRef = useRef(null);
  const pipelineRef = useRef(null); // This ref will be for the motion path
  const ball1Ref = useRef(null);
  const ball2Ref = useRef(null);
  const textRefs = useRef([]);
  textRefs.current = [];

  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });

  // Add items to the textRefs array
  const addToRefs = (el) => {
    if (el && !textRefs.current.includes(el)) {
      textRefs.current.push(el);
    }
  };

  // Handle cursor movement for the glow effect
  useEffect(() => {
    const handleMouseMove = (event) => {
      setCursorPos({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);


  // GSAP Animations
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // --- Pipeline Animation ---
      const path = pipelineRef.current;
      if (path) {
         const tl = gsap.timeline({ repeat: -1, yoyo: false, repeatDelay: 0 });
         tl.to([ball1Ref.current, ball2Ref.current], {
            duration: 5,
            ease: "power1.inOut",
            motionPath: {
                path: path,
                align: path,
                alignOrigin: [0.5, 0.5],
                autoRotate: false, // Set to false for a smoother helix feel
            },
            stagger: 2.5, // Stagger the start of the two balls
        });
      }

      // --- Text Animation ---
      if (textRefs.current.length > 0) {
        gsap.fromTo(textRefs.current, {
          x: 100,
          opacity: 0,
        }, {
          x: 0,
          opacity: 1,
          duration: 1.5,
          stagger: {
            each: 0.15,
            from: "start",
          },
          ease: "power3.out",
          repeat: -1,
          yoyo: true,
          repeatDelay: 1,
        });
      }

    }, appRef); // scope the context to the appRef
    
    return () => ctx.revert(); // cleanup
  }, []);

  return (
    // Added 'pipeline-container' class to the root element for style scoping
    <div ref={appRef} className="pipeline-container bg-black text-white font-sans min-h-screen w-full flex items-center justify-center overflow-hidden relative select-none">
      
      {/* Cursor Glow Effect */}
      <div 
        className="pointer-events-none fixed -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl z-40"
        style={{
          left: `${cursorPos.x}px`,
          top: `${cursorPos.y}px`,
          width: '250px',
          height: '250px',
          background: 'radial-gradient(circle, rgba(255,255,0,0.2) 0%, rgba(255,250,0,0) 60%)'
        }}
      />

      <div className="container mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-16 items-center z-10">
        
        {/* Left Content Section */}
        <div className="flex flex-col gap-8 text-center md:text-left">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            Stop losing your own money, join us and start earning!
          </h1>
          <div className="flex gap-4 justify-center md:justify-start mt-4">
            <button className="bg-white text-black font-semibold py-3 px-8 rounded-full hover:bg-gray-200 transition-colors duration-300">
              Join Us
            </button>
            <button className="bg-green-500 text-white font-semibold py-3 px-8 rounded-full hover:bg-green-600 transition-colors duration-300">
              Free trial
            </button>
          </div>
        </div>

        {/* Right Animation Section */}
        <div className="relative h-[500px] w-full flex items-center justify-center">
            {/* The SVG pipeline path for the animation */}
            <svg width="100%" height="100%" viewBox="0 0 250 500" className="absolute top-0 left-0 overflow-visible">
                <defs>
                    <filter id="glow">
                        <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>
                {/* This is the visual path for the second strand of the helix */}
                <path 
                    d="M 125,20 C 0,100 250,150 125,250 C 0,350 250,400 125,480" 
                    fill="none" 
                    stroke="rgba(255, 255, 255, 0.2)" 
                    strokeWidth="10"
                    style={{filter: 'url(#glow)'}}
                />
                {/* This is the motion path the balls  follow, and the first visual strand */}
                <path 
                    ref={pipelineRef}
                    d="M 125,20 C 250,100 0,150 125,250 C 250,350 0,400 125,480" 
                    fill="none" 
                    stroke="rgba(255, 255, 255, 0.2)" 
                    strokeWidth="10" 
                    style={{filter: 'url(#glow)'}}
                />
            </svg>

            {/* The animated balls */}
            <div ref={ball1Ref} className="absolute w-12 h-12 bg-gradient-to-br from-cyan-400 to-green-400 rounded-full shadow-lg shadow-cyan-500/50" />
            <div ref={ball2Ref} className="absolute w-12 h-12 bg-gradient-to-br from-cyan-400 to-green-400 rounded-full shadow-lg shadow-cyan-500/50" />
          
            {/* The animated text background */}
            <div className="absolute inset-0 flex flex-col items-center justify-around text-6xl font-extrabold text-green-300/80 -z-10">
              {Array.from({ length: 6 }).map((_, index) => (
                <span key={index} ref={addToRefs}>Start earning</span>
              ))}
            </div>
        </div>
      </div>
    </div>
  );
}
