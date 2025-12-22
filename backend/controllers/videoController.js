const TranscriptionService = require('../services/transcriptionService');
const Transcript = require('../models/Transcript');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const transcriptionService = new TranscriptionService();

class VideoController {
  // Handle file upload
  async uploadVideo(req, res) {
    try {
      if (!req.file) {
        return res.status(400).json({ 
          success: false, 
          error: 'No file uploaded' 
        });
      }

      const videoId = uuidv4();
      
      // Create transcript record
      const transcript = new Transcript({
        videoId,
        originalFilename: req.file.originalname,
        sourceType: 'upload',
        status: 'processing',
        filePath: req.file.path,
        fileSize: req.file.size
      });

      await transcript.save();

      // Start processing in background
      this.processVideoFile(videoId, req.file.path);

      res.json({
        success: true,
        message: 'Video uploaded and processing started',
        data: {
          videoId,
          filename: req.file.originalname,
          size: req.file.size,
          status: 'processing',
          estimatedTime: '1-2 minutes'
        }
      });

    } catch (error) {
      console.error('Upload error:', error);
      res.status(500).json({ 
        success: false, 
        error: 'Upload failed' 
      });
    }
  }

  // Process YouTube URL
  async processYouTube(req, res) {
    try {
      const { url } = req.body;
      
      if (!url) {
        return res.status(400).json({ 
          success: false, 
          error: 'YouTube URL required' 
        });
      }

      // Validate YouTube URL
      if (!ytdl.validateURL(url)) {
        return res.status(400).json({ 
          success: false, 
          error: 'Invalid YouTube URL' 
        });
      }

      const videoId = uuidv4();
      
      // Create transcript record
      const transcript = new Transcript({
        videoId,
        videoUrl: url,
        sourceType: 'youtube',
        status: 'processing'
      });

      await transcript.save();

      // Start processing in background
      this.processYouTubeVideo(videoId, url);

      res.json({
        success: true,
        message: 'YouTube video processing started',
        data: {
          videoId,
          url,
          status: 'processing',
          estimatedTime: '2-3 minutes'
        }
      });

    } catch (error) {
      console.error('YouTube processing error:', error);
      res.status(500).json({ 
        success: false, 
        error: 'Failed to process YouTube video' 
      });
    }
  }

  // Get transcript status
  async getTranscript(req, res) {
    try {
      const { videoId } = req.params;
      
      const transcript = await Transcript.findOne({ videoId });
      
      if (!transcript) {
        return res.status(404).json({ 
          success: false, 
          error: 'Transcript not found' 
        });
      }

      res.json({
        success: true,
        data: {
          videoId: transcript.videoId,
          status: transcript.status,
          progress: this.getProgress(transcript.status),
          result: transcript.status === 'completed' ? {
            transcript: transcript.transcript,
            fullText: transcript.fullText,
            wordCount: transcript.wordCount,
            language: transcript.language,
            confidence: transcript.confidence,
            duration: transcript.duration,
            processingTime: transcript.processingTime,
            createdAt: transcript.createdAt,
            completedAt: transcript.completedAt
          } : null
        }
      });

    } catch (error) {
      console.error('Get transcript error:', error);
      res.status(500).json({ 
        success: false, 
        error: 'Failed to get transcript' 
      });
    }
  }

  // Process uploaded video file
  async processVideoFile(videoId, filePath) {
    try {
      const transcript = await Transcript.findOne({ videoId });
      
      // Extract audio
      const audioPath = await transcriptionService.extractAudio(filePath);
      
      // Upload to AssemblyAI and transcribe
      const audioUrl = await transcriptionService.uploadToAssemblyAI(audioPath);
      const result = await transcriptionService.transcribeAudio(audioUrl);

      // Update transcript record
      transcript.status = 'completed';
      transcript.transcript = result.words;
      transcript.fullText = result.fullText;
      transcript.wordCount = result.fullText.split(' ').length;
      transcript.language = result.language;
      transcript.confidence = result.confidence;
      transcript.duration = result.duration;
      transcript.processingTime = Date.now() - transcript.createdAt;
      transcript.completedAt = Date.now();

      await transcript.save();

      // Cleanup video file
      fs.unlinkSync(filePath);

      console.log(`Processing completed for ${videoId}`);

    } catch (error) {
      console.error(`Processing failed for ${videoId}:`, error);
      
      const transcript = await Transcript.findOne({ videoId });
      if (transcript) {
        transcript.status = 'failed';
        await transcript.save();
      }
    }
  }

  // Process YouTube video
  async processYouTubeVideo(videoId, url) {
    try {
      const transcript = await Transcript.findOne({ videoId });
      
      // Download and process YouTube video
      const { audioPath, videoInfo } = await transcriptionService.processYouTube(url);
      
      // Upload to AssemblyAI and transcribe
      const audioUrl = await transcriptionService.uploadToAssemblyAI(audioPath);
      const result = await transcriptionService.transcribeAudio(audioUrl);

      // Update transcript record with video info
      transcript.status = 'completed';
      transcript.videoTitle = videoInfo.title;
      transcript.thumbnailUrl = videoInfo.thumbnail;
      transcript.duration = videoInfo.duration;
      transcript.transcript = result.words;
      transcript.fullText = result.fullText;
      transcript.wordCount = result.fullText.split(' ').length;
      transcript.language = result.language;
      transcript.confidence = result.confidence;
      transcript.processingTime = Date.now() - transcript.createdAt;
      transcript.completedAt = Date.now();

      await transcript.save();

      console.log(`YouTube processing completed for ${videoId}`);

    } catch (error) {
      console.error(`YouTube processing failed for ${videoId}:`, error);
      
      const transcript = await Transcript.findOne({ videoId });
      if (transcript) {
        transcript.status = 'failed';
        await transcript.save();
      }
    }
  }

  // Helper to get progress percentage
  getProgress(status) {
    const progressMap = {
      'pending': 0,
      'processing': 50,
      'completed': 100,
      'failed': 0
    };
    return progressMap[status] || 0;
  }
}

module.exports = new VideoController();