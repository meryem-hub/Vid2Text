const { AssemblyAI } = require('assemblyai');
const fs = require('fs');
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');
const ffmpegStatic = require('ffmpeg-static');
const ytdl = require('ytdl-core');

// Set ffmpeg path
ffmpeg.setFfmpegPath(ffmpegStatic);

class TranscriptionService {
  constructor() {
    this.client = new AssemblyAI({
      apiKey: process.env.ASSEMBLYAI_API_KEY
    });
  }

  // Extract audio from video file
  async extractAudio(videoPath) {
    return new Promise((resolve, reject) => {
      const audioPath = videoPath.replace(/\.[^/.]+$/, '.mp3');
      
      ffmpeg(videoPath)
        .toFormat('mp3')
        .on('end', () => {
          console.log('Audio extraction finished');
          resolve(audioPath);
        })
        .on('error', (err) => {
          console.error('Error extracting audio:', err);
          reject(err);
        })
        .save(audioPath);
    });
  }

  // Transcribe audio using AssemblyAI
  async transcribeAudio(audioUrl) {
    try {
      console.log('Starting transcription...');
      
      const config = {
        audio_url: audioUrl,
        language_detection: true,
        punctuate: true,
        format_text: true,
        speaker_labels: true,
        disfluencies: true
      };

      const transcript = await this.client.transcripts.create(config);
      
      // Poll for completion
      let transcriptData = transcript;
      while (transcriptData.status !== 'completed' && transcriptData.status !== 'error') {
        await new Promise(resolve => setTimeout(resolve, 1000));
        transcriptData = await this.client.transcripts.get(transcript.id);
      }

      if (transcriptData.status === 'error') {
        throw new Error(transcriptData.error);
      }

      return {
        words: transcriptData.words || [],
        fullText: transcriptData.text,
        confidence: transcriptData.confidence,
        language: transcriptData.language_code,
        duration: transcriptData.audio_duration
      };
    } catch (error) {
      console.error('Transcription error:', error);
      throw error;
    }
  }

  // Download YouTube video and extract audio
  async processYouTube(url) {
    try {
      console.log('Processing YouTube video...');
      
      // Get video info
      const info = await ytdl.getInfo(url);
      const videoId = info.videoDetails.videoId;
      const title = info.videoDetails.title;
      const thumbnail = info.videoDetails.thumbnails[0].url;
      const duration = parseInt(info.videoDetails.lengthSeconds);

      // Temporary paths
      const tempVideoPath = path.join(__dirname, '../uploads', `temp_${videoId}.mp4`);
      const tempAudioPath = path.join(__dirname, '../uploads', `temp_${videoId}.mp3`);

      // Download video
      await new Promise((resolve, reject) => {
        ytdl(url, { quality: 'lowest' })
          .pipe(fs.createWriteStream(tempVideoPath))
          .on('finish', resolve)
          .on('error', reject);
      });

      console.log('YouTube video downloaded');

      // Extract audio
      await this.extractAudio(tempVideoPath);

      // Cleanup video file
      fs.unlinkSync(tempVideoPath);

      return {
        audioPath: tempAudioPath,
        videoInfo: {
          id: videoId,
          title,
          thumbnail,
          duration,
          url
        }
      };
    } catch (error) {
      console.error('YouTube processing error:', error);
      throw error;
    }
  }

  // Upload audio to AssemblyAI
  async uploadToAssemblyAI(audioPath) {
    const audioData = fs.readFileSync(audioPath);
    
    // Upload to AssemblyAI
    const uploadUrl = await this.client.files.upload(audioData);
    
    // Cleanup local audio file
    fs.unlinkSync(audioPath);
    
    return uploadUrl;
  }
}

module.exports = TranscriptionService;