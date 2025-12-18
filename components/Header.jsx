// components/Header.jsx
"use client";

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Simple function to scroll to section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
    setIsMenuOpen(false); // Close mobile menu
  };

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'Features', id: 'features' },
    { label: 'About', id: 'about' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-[#212842]/95 backdrop-blur-xl border-b border-[#F0E7D5]/10 py-3 shadow-2xl shadow-[#F0E7D5]/5' 
        : 'bg-gradient-to-b from-[#212842] via-[#212842]/90 to-transparent py-5'
    }`}>
      <div className="container mx-auto px-6 relative">
        <div className="flex items-center justify-between">
          {/* Logo - Click to go home */}
          <div 
            className="relative group cursor-pointer"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onClick={() => scrollToSection('home')}
          >
            <div className={`absolute -inset-2 rounded-lg blur-lg transition-all duration-700 ${
              isHovering 
                ? 'bg-gradient-to-r from-[#F0E7D5]/30 via-[#3A4F8C]/50 to-[#F0E7D5]/30 opacity-100' 
                : 'bg-gradient-to-r from-[#F0E7D5]/10 via-[#3A4F8C]/30 to-[#F0E7D5]/10 opacity-70'
            }`}></div>
            <div className="relative flex items-center space-x-3">
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#212842] to-[#3A4F8C] border border-[#F0E7D5]/20 flex items-center justify-center shadow-2xl">
                  <div className="w-8 h-8 relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#F0E7D5] to-[#B8A28C] rounded-lg transform rotate-45"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[#F0E7D5]/30 rounded-lg transform rotate-45"></div>
                  </div>
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tighter bg-gradient-to-r from-[#F0E7D5] via-[#E8D9C5] to-[#F0E7D5] bg-clip-text text-transparent">
                  Vid2Text
                </h1>
                <div className="h-px w-full bg-gradient-to-r from-transparent via-[#F0E7D5]/50 to-transparent mt-1"></div>
              </div>
            </div>
          </div>

          {/* Desktop Navigation - Simple clicks */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="px-4 py-2 rounded-lg transition-all duration-300 hover:bg-[#F0E7D5]/5 text-[#F0E7D5]/90 hover:text-[#F0E7D5] font-medium"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg border border-[#F0E7D5]/20 hover:border-[#F0E7D5]/40 transition-all"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 mt-2 bg-[#212842]/95 backdrop-blur-xl border border-[#F0E7D5]/10 rounded-2xl shadow-2xl p-6">
            <div className="space-y-3">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left px-4 py-3 rounded-lg hover:bg-[#F0E7D5]/5 transition-all font-medium"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;