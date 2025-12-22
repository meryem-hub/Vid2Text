const mongoose = require('mongoose');

const transcriptSchema = new mongoose.Schema({
  videoId: {
    type: String,
    required: true,
    unique: true
  },
  originalFilename: String,
  videoUrl: String,
  sourceType: {
    type: String,
    enum: ['upload', 'youtube', 'url'],
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'failed'],
    default: 'pending'
  },
  // For file uploads
  filePath: String,
  fileSize: Number,
  duration: Number,
  
  // For YouTube/URL
  videoTitle: String,
  thumbnailUrl: String,
  
  // Transcript data
  transcript: [{
    start: Number,
    end: Number,
    text: String,
    confidence: Number
  }],
  fullText: String,
  wordCount: Number,
  language: String,
  
  // Processing info
  processingTime: Number,
  confidence: Number,
  
  // Metadata
  createdAt: {
    type: Date,
    default: Date.now
  },
  completedAt: Date
});

// Create indexes for faster queries
transcriptSchema.index({ status: 1, createdAt: -1 });
transcriptSchema.index({ videoId: 1 });

module.exports = mongoose.model('Transcript', transcriptSchema);