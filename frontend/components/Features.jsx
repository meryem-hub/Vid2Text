"use client";

import { Globe, Clock, Shield } from 'lucide-react';

const Features = () => {
  return (
    <section 
      id="features" 
      className="min-h-screen py-20 bg-[#212842]"
    >
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-[#F0E7D5] via-[#E8D9C5] to-[#F0E7D5] bg-clip-text text-transparent">
              Features
            </span>
          </h2>
          <p className="text-lg text-[#F0E7D5]/60 max-w-2xl mx-auto">
            Advanced AI-powered tools for perfect video-to-text conversion
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#212842]/50 backdrop-blur-sm rounded-xl border border-[#F0E7D5]/10 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#F0E7D5]/10 to-[#3A4F8C]/10 border border-[#F0E7D5]/20 flex items-center justify-center">
                <Globe className="w-5 h-5 text-[#F0E7D5]" />
              </div>
              <h3 className="text-[#F0E7D5] font-medium">3+ Languages</h3>
            </div>
            <p className="text-sm text-[#F0E7D5]/60">
              Automatic language detection with support for global dialects
            </p>
          </div>

          <div className="bg-[#212842]/50 backdrop-blur-sm rounded-xl border border-[#F0E7D5]/10 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#F0E7D5]/10 to-[#3A4F8C]/10 border border-[#F0E7D5]/20 flex items-center justify-center">
                <Clock className="w-5 h-5 text-[#F0E7D5]" />
              </div>
              <h3 className="text-[#F0E7D5] font-medium">Fast Processing</h3>
            </div>
            <p className="text-sm text-[#F0E7D5]/60">
              10x faster than real-time. Get transcripts in minutes, not hours
            </p>
          </div>

          <div className="bg-[#212842]/50 backdrop-blur-sm rounded-xl border border-[#F0E7D5]/10 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#F0E7D5]/10 to-[#3A4F8C]/10 border border-[#F0E7D5]/20 flex items-center justify-center">
                <Shield className="w-5 h-5 text-[#F0E7D5]" />
              </div>
              <h3 className="text-[#F0E7D5] font-medium">Secure & Private</h3>
            </div>
            <p className="text-sm text-[#F0E7D5]/60">
              End-to-end encryption. Your videos are never stored permanently
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;