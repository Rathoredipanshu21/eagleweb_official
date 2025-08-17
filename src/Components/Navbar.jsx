import React, { useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import logo from '../Assets/logo.png'

// Navigation Bar
const Navbar = ({ isMenuOpen, setIsMenuOpen }) => {
    const headerRef = useRef(null);

    // Effect for the mouse-following light beam
    useEffect(() => {
        const handleMouseMove = (e) => {
            if (headerRef.current) {
                headerRef.current.style.setProperty('--mouse-x', `${e.clientX}px`);
            }
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const navItems = ['Home', 'Features', 'Testimonials', 'Contact'];

    return (
        <header ref={headerRef} className="fixed top-0 left-0 w-full z-50 nav-v-light">
            <div className="container mx-auto px-4 py-3">
                <div className="relative bg-black/30 backdrop-blur-lg rounded-full border border-yellow-500/20 shadow-lg shadow-yellow-900/40 p-2">
                    <div className="flex items-center justify-between px-4">
                        
                        {/* Logo */}
                        <a href="#" className="flex items-center gap-2">
                            <img src={logo} alt="Glow Logo" className="w-8 h-8" />
                            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-amber-400">
                               EAGLE<span style={{color:'#fff'}}>W</span>EB
                            </span>
                        </a>
                        
                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center space-x-2 relative">
                            {navItems.map(item => (
                                <a key={item} href={`#${item.toLowerCase()}`} className="px-4 py-2 text-sm text-slate-300 hover:text-yellow-300 transition-colors duration-300">
                                    {item}
                                </a>
                            ))}
                        </nav>
                        
                        <div className="flex items-center gap-4">
                            <button className="hidden md:inline-block px-4 py-2 text-sm bg-yellow-500 text-slate-900 rounded-full hover:bg-yellow-400 transition-all duration-300 shadow-md shadow-yellow-500/20 hover:shadow-lg hover:shadow-yellow-400/30 transform hover:-translate-y-0.5">
                                Get Started
                            </button>
                            
                            {/* Mobile Menu Toggle */}
                            <button className="md:hidden text-slate-400" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>
                    
                    {/* Mobile Navigation Menu */}
                    {isMenuOpen && (
                        <nav className="md:hidden mt-4 px-4 pb-4 flex flex-col items-center space-y-4">
                            {navItems.map(item => (
                                <a 
                                  key={item} 
                                  href={`#${item.toLowerCase()}`} 
                                  className="block w-full text-center py-2 text-slate-300 hover:text-yellow-300 transition-colors duration-300 rounded-md hover:bg-yellow-400/10" 
                                  onClick={() => setIsMenuOpen(false)}
                                >
                                    {item}
                                </a>
                            ))}
                        </nav>
                    )}
                </div>
            </div>

            {/* This style block creates the vertical light beam that follows the mouse */}
            <style jsx global>{`
                .nav-v-light::after {
                    content: '';
                    position: fixed;
                    top: 5rem; 
                    left: var(--mouse-x, 50%);
                    width: 1px;
                    height: 100vh;
                    background: linear-gradient(
                        to bottom,
                        rgba(234, 179, 8, 0.4) 0%, /* Yellow color */
                        rgba(234, 179, 8, 0) 50%
                    );
                    transform: translateX(-50%);
                    pointer-events: none;
                    opacity: 0.5;
                    transition: opacity 0.3s;
                }
                .nav-v-light:hover::after {
                    opacity: 1;
                }
            `}</style>
        </header>
    );
};

export default Navbar;