// components/Footer.jsx
"use client";

import { Github, Linkedin, Twitter, Mail, Heart, Sparkles } from 'lucide-react';
import { useState } from 'react';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Subscribed:', email);
    setEmail('');
    alert('Thank you for subscribing!');
  };

  return (
    <footer className="relative bg-gradient-to-b from-[#212842] to-[#1a1f35] pb-10 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#F0E7D5]/20 to-transparent"></div>
        <div className="absolute top-10 left-10 w-40 h-40 bg-[#3A4F8C]/5 rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-[#F0E7D5]/5 rounded-full blur-2xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-12">
          {/* Brand Column */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#212842] to-[#3A4F8C] border border-[#F0E7D5]/20 flex items-center justify-center">
                <div className="w-6 h-6 bg-gradient-to-br from-[#F0E7D5] to-[#B8A28C] rounded-lg transform rotate-45"></div>
              </div>
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-[#F0E7D5] via-[#E8D9C5] to-[#F0E7D5] bg-clip-text text-transparent">
                  Vid2Text
                </h2>
                <p className="text-sm text-[#F0E7D5]/40">AI-Powered Transcription</p>
              </div>
            </div>
            <p className="text-[#F0E7D5]/60 mb-6 max-w-sm">
              Transforming videos into text with cutting-edge AI technology. 
              Fast, accurate, and accessible to everyone.
            </p>
            <div className="flex items-center gap-4">
              {[
                { icon: <Github className="w-5 h-5" />, label: 'GitHub' },
                { icon: <Linkedin className="w-5 h-5" />, label: 'LinkedIn' },
                { icon: <Twitter className="w-5 h-5" />, label: 'Twitter' },
                { icon: <Mail className="w-5 h-5" />, label: 'Email' }
              ].map((social, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-10 h-10 rounded-lg border border-[#F0E7D5]/20 flex items-center justify-center text-[#F0E7D5]/60 hover:text-[#F0E7D5] hover:border-[#F0E7D5]/40 hover:bg-[#F0E7D5]/5 transition-all duration-300 group"
                  aria-label={social.label}
                >
                  <span className="group-hover:scale-110 transition-transform duration-300">
                    {social.icon}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Links Column */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-[#F0E7D5] mb-6 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Product
              </h3>
              <ul className="space-y-3">
                {['Features', 'Pricing', 'API', 'Changelog', 'Status'].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-[#F0E7D5]/60 hover:text-[#F0E7D5] transition-colors duration-300 hover:pl-2 block"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-[#F0E7D5] mb-6 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Company
              </h3>
              <ul className="space-y-3">
                {['About Us', 'Blog', 'Careers', 'Press', 'Contact'].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-[#F0E7D5]/60 hover:text-[#F0E7D5] transition-colors duration-300 hover:pl-2 block"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-[#F0E7D5] mb-6 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Legal
              </h3>
              <ul className="space-y-3">
                {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'GDPR', 'Security'].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-[#F0E7D5]/60 hover:text-[#F0E7D5] transition-colors duration-300 hover:pl-2 block"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mb-12">
          <div className="max-w-md mx-auto">
            <h3 className="text-xl font-semibold text-[#F0E7D5] mb-4 text-center">
              Stay Updated
            </h3>
            <form onSubmit={handleSubmit} className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-6 py-4 rounded-full bg-[#212842]/50 border border-[#F0E7D5]/20 text-[#F0E7D5] placeholder-[#F0E7D5]/40 focus:outline-none focus:border-[#F0E7D5]/40 focus:shadow-[0_0_20px_rgba(240,231,213,0.1)] transition-all duration-300"
                required
              />
              <button
                type="submit"
                className="absolute right-2 top-2 bottom-2 px-6 rounded-full bg-gradient-to-r from-[#F0E7D5] to-[#E8D9C5] text-[#212842] font-semibold hover:shadow-[0_0_20px_rgba(240,231,213,0.3)] transition-all duration-300 hover:scale-105"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#F0E7D5]/10 to-transparent mb-8"></div>

        {/* Bottom Section with Your Info */}
        <div className="text-center">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
            <p className="text-[#F0E7D5]/60">
              © {new Date().getFullYear()} Vid2Text. All rights reserved.
            </p>
            
            {/* Your Personal Info Section */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-[#F0E7D5]/40" />
                <span className="text-[#F0E7D5]/60">Made with passion by</span>
              </div>
              <div className="text-[#F0E7D5] font-semibold bg-gradient-to-r from-[#F0E7D5] to-[#E8D9C5] bg-clip-text text-transparent">
                Meryem
              </div>
              <div className="w-1 h-1 rounded-full bg-[#F0E7D5]/30"></div>
              <div className="text-[#F0E7D5]/80">
                University Student
              </div>
            </div>
          </div>

         

        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute bottom-0 left-0 right-0">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-[#F0E7D5]/10 rounded-full"
            style={{
              left: `${20 + i * 20}%`,
              bottom: `${Math.sin(i) * 10}px`,
              animation: `float ${3 + i}s infinite ease-in-out`
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
      `}</style>
    </footer>
  );
};

export default Footer;