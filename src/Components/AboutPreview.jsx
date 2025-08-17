import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// This component uses Tailwind CSS for styling.
// Make sure you have Tailwind CSS set up in your project.

// IMPORTANT: This component relies on the GSAP library and its ScrollTrigger plugin.
// Please ensure you include them in your project, for example, by adding
// these script tags to your `public/index.html` file:
// <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
// <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>

// Register the ScrollTrigger plugin with GSAP
gsap.registerPlugin(ScrollTrigger);

const AboutPreview = () => {
  const comp = useRef(null);

  // Data for the grid items, now including responsive Tailwind classes for layout
  const stats = [
    { id: 1, value: '400+', text: 'Projects Completed', classes: 'lg:col-span-2' },
    { id: 2, value: '96+', text: 'Happy Clients', classes: 'lg:col-start-3' },
    { id: 3, value: '24/7', text: 'Support', classes: 'lg:col-start-4 lg:row-span-2' },
    { id: 4, value: '10+', text: 'Years of Experience', classes: 'lg:row-span-2 lg:row-start-2' },
    { id: 5, value: '15K+', text: 'Lines of Code', classes: 'lg:col-start-2 lg:col-span-2 lg:row-start-2' },
    { id: 6, value: 'Agile', text: 'Methodology', classes: 'lg:col-start-2 lg:row-start-3' },
    { id: 7, value: 'Global', text: 'Clientele', classes: 'lg:col-start-3 lg:col-span-2 lg:row-start-3' },
    { id: 8, value: '100%', text: 'Satisfaction', classes: 'lg:row-start-4' },
    { id: 9, value: 'Innovative', text: 'Solutions', classes: 'lg:col-start-2 lg:row-start-4' },
    { id: 10, value: 'Dedicated', text: 'Team', classes: 'lg:col-start-3 lg:col-span-2 lg:row-start-4' },
  ];

  useLayoutEffect(() => {
    // Ensure GSAP is available
    if (!gsap) {
      console.error("GSAP and/or ScrollTrigger not found. Please ensure the libraries are loaded.");
      return;
    }

    // Create a GSAP context for cleanup
    const ctx = gsap.context(() => {
      // Main timeline for the entrance animation, triggered by scrolling
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: comp.current,
          start: "top 70%", // Start animation when 70% of the component is in view
          end: "bottom 30%",
          toggleActions: "play none none reverse", // Play on enter, reverse on leave
        }
      });

      // Animate the background grid lines
      tl.from(".aboutpreview-grid-line", {
        scale: 0,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.1,
      });

      // Animate each stat item
      tl.from(".aboutpreview-stat-item", {
        opacity: 0,
        y: 50,
        scale: 0.9,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.15,
      }, "-=0.8"); // Overlap with grid line animation for a smoother effect

      // Add individual hover effects to each stat item
      const items = gsap.utils.toArray('.aboutpreview-stat-item');
      items.forEach(item => {
        item.addEventListener('mouseenter', () => {
          gsap.to(item, { 
            scale: 1.05, 
            boxShadow: '0 0 30px 5px rgba(250, 204, 21, 0.6)',
            duration: 0.3,
            ease: 'power2.out'
          });
        });

        item.addEventListener('mouseleave', () => {
          gsap.to(item, { 
            scale: 1, 
            boxShadow: '0 0 20px 3px rgba(250, 204, 21, 0.4)',
            duration: 0.3,
            ease: 'power2.out'
          });
        });
      });

    }, comp);

    // Cleanup function to revert animations and remove triggers
    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={comp} 
      className="aboutpreview-container relative w-full min-h-screen bg-black text-white z-10 flex justify-center items-center p-4 sm:p-6 md:p-8 overflow-hidden"
    >
      {/* Background Grid Lines */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <div key={`v-${i}`} className="aboutpreview-grid-line absolute top-0 bottom-0 bg-gray-800/50" style={{ left: `${(i + 1) * 9.1}%`, width: '1px' }}></div>
        ))}
        {[...Array(10)].map((_, i) => (
          <div key={`h-${i}`} className="aboutpreview-grid-line absolute left-0 right-0 bg-gray-800/50" style={{ top: `${(i + 1) * 9.1}%`, height: '1px' }}></div>
        ))}
      </div>

      {/* Main Grid Container */}
      <div 
        className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-4 gap-4 p-4"
      >
        {stats.map(stat => (
          <div
            key={stat.id}
            className={`aboutpreview-stat-item bg-gray-900/50 border border-gray-700/80 rounded-lg flex flex-col justify-center items-center p-4 text-center backdrop-blur-sm transition-shadow duration-300 min-h-[140px] ${stat.classes}`}
          >
            <h3 className="text-4xl md:text-5xl font-bold text-yellow-400">
              {stat.value}
            </h3>
            <p className="text-sm md:text-base text-gray-300 mt-2">
              {stat.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AboutPreview;
