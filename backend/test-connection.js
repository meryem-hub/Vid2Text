require('dotenv').config();
const { AssemblyAI } = require('assemblyai');

async function testConnection() {
  try {
    console.log('🔍 Testing AssemblyAI connection...');
    console.log('API Key (first 10 chars):', process.env.ASSEMBLYAI_API_KEY?.substring(0, 10) + '...');
    
    const client = new AssemblyAI({
      apiKey: process.env.ASSEMBLYAI_API_KEY
    });
    
    // Simple test - try to get account details
    console.log('Testing API connection...');
    
    // Create a mock transcript to test authentication
    const testTranscript = await client.transcripts.create({
      audio_url: 'https://storage.googleapis.com/aai-web-samples/5_common_sports_injuries.mp3',
      language_detection: true
    });
    
    console.log('✅ AssemblyAI Connection SUCCESS!');
    console.log('Transcript ID:', testTranscript.id);
    console.log('Status:', testTranscript.status);
    
  } catch (error) {
    console.error('❌ AssemblyAI Connection FAILED:');
    console.error('Error:', error.message);
    console.error('\nPossible issues:');
    console.error('1. Invalid API key');
    console.error('2. API key not activated');
    console.error('3. Network/connection issue');
    console.error('\nCheck: https://www.assemblyai.com/dashboard');
  }
}

testConnection();