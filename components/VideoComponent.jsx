"use client";

import { useState, useRef } from 'react';
import { Upload, Link, Youtube, FileVideo, X, Sparkles, Loader2, Check, Globe, Clock, Shield } from 'lucide-react';

const VideoInputComponent = () => {
  const [activeTab, setActiveTab] = useState('upload');
  const [videoUrl, setVideoUrl] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [videoInfo, setVideoInfo] = useState(null);
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileSelect = (file) => {
    if (file.type.startsWith('video/')) {
      setSelectedFile(file);
      
      // Simulate getting file info
      const url = URL.createObjectURL(file);
      setVideoInfo({
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(2),
        type: file.type,
        duration: '--:--',
        previewUrl: url
      });
    }
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (file) handleFileSelect(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!videoUrl.trim() && !selectedFile) return;

    setIsProcessing(true);
    setUploadProgress(0);

    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => {
            setIsProcessing(false);
            setUploadProgress(0);
          }, 500);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    // Here you would make the actual API call
    // await processVideo(selectedFile || videoUrl);
  };

  const removeFile = () => {
    setSelectedFile(null);
    setVideoInfo(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const tabs = [
    { id: 'upload', label: 'Upload Video', icon: <Upload size={18} /> },
    { id: 'url', label: 'Video URL', icon: <Link size={18} /> },
    { id: 'youtube', label: 'YouTube', icon: <Youtube size={18} /> }
  ];

  const supportedFormats = [
    { name: 'MP4', icon: '🎥' },
    { name: 'AVI', icon: '📹' },
    { name: 'MOV', icon: '🎬' },
    { name: 'MKV', icon: '💿' },
    { name: 'WebM', icon: '🌐' }
  ];

  return (
    <div className="relative min-h-[calc(100vh-100px)] flex items-center justify-center px-4 pt-24 pb-12">
      {/* Background Glow Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-[#3A4F8C]/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-[#F0E7D5]/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-[#F0E7D5]/5 via-[#3A4F8C]/10 to-[#F0E7D5]/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-6xl mx-auto">
        {/* Hero Text */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#212842]/50 border border-[#F0E7D5]/10 mb-6">
         
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-[#F0E7D5] via-[#E8D9C5] to-[#B8A28C] bg-clip-text text-transparent">
              Transform Video
            </span>
            <br />
            <span className="bg-gradient-to-r from-[#9ba8ce] via-[#849ae9] to-white bg-clip-text text-transparent">
              Into Text Instantly
            </span>
          </h1>
          
          <p className="text-xl text-[#F0E7D5]/60 max-w-3xl mx-auto mb-8">
            Upload any video and get accurate, timestamped transcripts with 99.5% accuracy.
            Supports 3+ languages and real-time processing.
          </p>
        </div>

        {/* Main Input Card */}
        <div className="bg-[#212842]/80 backdrop-blur-xl rounded-2xl border border-[#F0E7D5]/10 shadow-2xl shadow-[#0F172A]/50 overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-[#F0E7D5]/10">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setSelectedFile(null);
                  setVideoUrl('');
                }}
                className={`flex-1 flex items-center justify-center gap-2 py-4 px-6 transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'border-b-2 border-[#F0E7D5] text-[#F0E7D5] bg-gradient-to-t from-[#F0E7D5]/5 to-transparent'
                    : 'text-[#F0E7D5]/60 hover:text-[#F0E7D5] hover:bg-[#F0E7D5]/5'
                }`}
              >
                {tab.icon}
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="p-8">
            {activeTab === 'upload' && (
              <div>
                <div
                  className={`relative border-2 border-dashed rounded-xl transition-all duration-300 ${
                    dragActive
                      ? 'border-[#F0E7D5] bg-[#F0E7D5]/5'
                      : 'border-[#F0E7D5]/30 hover:border-[#F0E7D5]/50'
                  } ${selectedFile ? 'py-8' : 'py-16'}`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  {selectedFile ? (
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-4 mb-6">
                        <div className="relative">
                          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#212842] to-[#3A4F8C] border border-[#F0E7D5]/20 flex items-center justify-center">
                            <FileVideo className="w-8 h-8 text-[#F0E7D5]" />
                          </div>
                          <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-[#F0E7D5] to-[#B8A28C] rounded-full flex items-center justify-center border-2 border-[#212842]">
                            <Check className="w-4 h-4 text-[#212842]" />
                          </div>
                        </div>
                        <div className="text-left">
                          <h3 className="text-[#F0E7D5] font-medium">{videoInfo?.name}</h3>
                          <p className="text-sm text-[#F0E7D5]/60">{videoInfo?.size} MB</p>
                        </div>
                        <button
                          onClick={removeFile}
                          className="p-2 rounded-lg hover:bg-[#F0E7D5]/10 transition-colors"
                        >
                          <X className="w-5 h-5 text-[#F0E7D5]/60 hover:text-[#F0E7D5]" />
                        </button>
                      </div>
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="text-[#F0E7D5]/80 hover:text-[#F0E7D5] underline underline-offset-4"
                      >
                        Choose another file
                      </button>
                    </div>
                  ) : (
                    <div className="text-center">
                      <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#212842] to-[#3A4F8C] border border-[#F0E7D5]/20 flex items-center justify-center">
                        <Upload className="w-10 h-10 text-[#F0E7D5]" />
                      </div>
                      <div className="space-y-2 mb-6">
                        <p className="text-[#F0E7D5] font-medium">
                          Drag & drop your video file here
                        </p>
                        <p className="text-sm text-[#F0E7D5]/60">
                          Supports MP4, AVI, MOV, MKV, WebM
                        </p>
                      </div>
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="px-6 py-3 rounded-lg bg-gradient-to-r from-[#F0E7D5]/10 to-[#3A4F8C]/10 border border-[#F0E7D5]/20 text-[#F0E7D5] hover:border-[#F0E7D5]/40 transition-all"
                      >
                        Browse Files
                      </button>
                    </div>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="video/*"
                    className="hidden"
                    onChange={handleFileInput}
                  />
                </div>
              </div>
            )}

            {activeTab === 'url' && (
              <div className="space-y-6">
                <div className="relative">
                  <Link className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#F0E7D5]/60" />
                  <input
                    type="url"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    placeholder="Paste video URL (MP4, WebM, etc.)"
                    className="w-full pl-12 pr-4 py-4 bg-[#212842] border border-[#F0E7D5]/20 rounded-xl text-[#F0E7D5] placeholder-[#F0E7D5]/40 focus:outline-none focus:border-[#F0E7D5]/50 focus:ring-1 focus:ring-[#F0E7D5]/30 transition-all"
                  />
                </div>
                <div className="text-sm text-[#F0E7D5]/60 text-center">
                  Supports direct video links from most hosting services
                </div>
              </div>
            )}

            {activeTab === 'youtube' && (
              <div className="space-y-6">
                <div className="relative">
                  <Youtube className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#F0E7D5]/60" />
                  <input
                    type="url"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    placeholder="Paste YouTube video URL"
                    className="w-full pl-12 pr-4 py-4 bg-[#212842] border border-[#F0E7D5]/20 rounded-xl text-[#F0E7D5] placeholder-[#F0E7D5]/40 focus:outline-none focus:border-[#F0E7D5]/50 focus:ring-1 focus:ring-[#F0E7D5]/30 transition-all"
                  />
                </div>
                <div className="text-sm text-[#F0E7D5]/60 text-center">
                  Supports YouTube videos, playlists, and live streams
                </div>
              </div>
            )}

            {/* Progress Bar */}
            {isProcessing && (
              <div className="mt-8 space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-[#F0E7D5]">Processing...</span>
                  <span className="text-[#F0E7D5]">{uploadProgress}%</span>
                </div>
                <div className="h-2 bg-[#212842] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#F0E7D5] via-[#3A4F8C] to-[#F0E7D5] transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={(!videoUrl.trim() && !selectedFile) || isProcessing}
              className={`w-full mt-8 py-4 rounded-xl font-medium text-lg transition-all duration-300 ${
                (!videoUrl.trim() && !selectedFile) || isProcessing
                  ? 'bg-[#212842] text-[#F0E7D5]/40 cursor-not-allowed'
                  : 'bg-gradient-to-r from-[#F0E7D5] to-[#B8A28C] text-[#212842] hover:shadow-lg hover:shadow-[#F0E7D5]/20 hover:scale-[1.02]'
              }`}
            >
              {isProcessing ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processing Video...
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Generate Transcript
                </div>
              )}
            </button>
          </div>
        </div>

        {/* Features & Info Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
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

        {/* Supported Formats */}
        <div className="mt-8 text-center">
          <p className="text-sm text-[#F0E7D5]/60 mb-4">Supported Formats</p>
          <div className="flex flex-wrap justify-center gap-3">
            {supportedFormats.map((format) => (
              <div
                key={format.name}
                className="px-4 py-2 rounded-lg bg-[#212842]/50 border border-[#F0E7D5]/10 text-[#F0E7D5]/80 hover:border-[#F0E7D5]/30 transition-all hover:scale-105"
              >
                <span className="mr-2">{format.icon}</span>
                {format.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoInputComponent;