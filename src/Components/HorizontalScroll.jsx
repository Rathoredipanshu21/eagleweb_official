import React, { useLayoutEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';

// GSAP and ScrollTrigger are expected to be loaded globally via script tags
// in the HTML file for this environment.

// --- Main App Component ---
function HorizontalScroll() {
  const mainRef = useRef(null);
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useLayoutEffect(() => {
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;

    if (!gsap || !ScrollTrigger) {
      console.error("GSAP or ScrollTrigger not loaded!");
      return;
    }
    
    gsap.registerPlugin(ScrollTrigger);

    const textElement = textRef.current;

    // Use a matchMedia instance for responsive GSAP animations
    const ctx = gsap.context(() => {
      // Create a single timeline for both pinning and animation for better synchronization
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: mainRef.current,
          start: "top top",
          end: () => "+=" + (textElement.scrollWidth - window.innerWidth),
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true, // Recalculates on resize
        },
      });

      // Animate the text horizontally on the timeline
      tl.to(textElement, {
        x: () => -(textElement.scrollWidth - window.innerWidth),
        ease: "none",
      });

    }, mainRef);

    // Cleanup function
    return () => ctx.revert();
  }, []);

  return (
    <main ref={mainRef} className="relative w-full h-screen bg-gray-900 text-white font-sans overflow-hidden flex items-center">
      <div ref={containerRef} className="w-full">
        {/* Responsive font sizes and padding */}
        <div 
          ref={textRef} 
          className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tighter whitespace-nowrap"
        >
          <span className="text-gray-500 px-4 md:px-8 lg:px-10">Eagle Web • IT Services & Consulting •</span>
          <span className="text-yellow-400 px-4 md:px-8 lg:px-10" style={{ filter: 'drop-shadow(0 0 15px rgba(250, 204, 21, 0.5))' }}>
            We don't just build websites, we build from your vision.
          </span>
           <span className="text-gray-500 px-4 md:px-8 lg:px-10">Engineering digital experiences through the customer's eyes.</span>
        </div>
      </div>
    </main>
  );
}

export default HorizontalScroll;

// --- Boilerplate for rendering the React app ---
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<HorizontalScroll />);
