const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const videoController = require('../controllers/videoController');

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  limits: { fileSize: parseInt(process.env.MAX_FILE_SIZE) || 500000000 },
  fileFilter: (req, file, cb) => {
    const videoTypes = ['video/mp4', 'video/webm', 'video/avi', 'video/mov', 'video/mkv'];
    if (videoTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only video files are allowed!'), false);
    }
  }
});

// Routes
router.post('/upload', upload.single('video'), videoController.uploadVideo);
router.post('/youtube', videoController.processYouTube);
router.get('/transcript/:videoId', videoController.getTranscript);

// Health check
router.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'Video Transcription API'
  });
});

module.exports = router;