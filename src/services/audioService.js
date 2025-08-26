import SoundPlayer from 'react-native-sound-player'

class AudioService {
  constructor() {
    this.isPlaying = false
    this.currentTrackId = null
    this.currentAudioPath = null
  }

  // Play a sound file
  async playSound(soundId, audioPath = null) {
    try {
      // Stop any currently playing sound first
      await this.stopSound()

      console.log('🎵 Playing sound for ID:', soundId)

      // Use a default audio path if none provided
      const audioFilePath = audioPath || this.getDefaultAudioPath(soundId)

      console.log('🎵 Attempting to play audio from:', audioFilePath)

      // Start playing the audio - use 'wav' for .wav files
      const fileExtension = audioFilePath.includes('.wav') ? 'wav' : 'mp3'
      SoundPlayer.playUrl(audioFilePath, fileExtension)
      
      console.log('✅ Audio started playing:', audioFilePath)
      
      this.isPlaying = true
      this.currentTrackId = soundId
      this.currentAudioPath = audioFilePath

      // Set up event listeners for playback completion
      SoundPlayer.addEventListener('FinishedLoadingFile', (info) => {
        console.log('✅ Audio file loaded:', info)
      })

      SoundPlayer.addEventListener('FinishedPlayingFile', (info) => {
        console.log('✅ Audio playback completed:', info)
        this.isPlaying = false
        this.currentTrackId = null
        this.currentAudioPath = null
      })

      // Add error listener
      SoundPlayer.addEventListener('FinishedLoadingFileWithError', (error) => {
        console.error('❌ Audio loading error:', error)
        this.isPlaying = false
        this.currentTrackId = null
        this.currentAudioPath = null
      })

      return true
    } catch (error) {
      console.error('❌ Error playing sound:', error)
      // Don't throw error, just return false
      return false
    }
  }

  // Stop currently playing sound
  async stopSound() {
    try {
      if (this.isPlaying) {
        SoundPlayer.stop()
        console.log('✅ Audio stopped')
      }
      
      this.isPlaying = false
      this.currentTrackId = null
      this.currentAudioPath = null
      return true
    } catch (error) {
      console.error('❌ Error stopping sound:', error)
      return false
    }
  }

  // Pause currently playing sound
  async pauseSound() {
    try {
      if (this.isPlaying) {
        SoundPlayer.pause()
        console.log('✅ Audio paused')
        this.isPlaying = false
      }
      return true
    } catch (error) {
      console.error('❌ Error pausing sound:', error)
      return false
    }
  }

  // Resume currently playing sound
  async resumeSound() {
    try {
      if (!this.isPlaying && this.currentAudioPath) {
        SoundPlayer.resume()
        console.log('✅ Audio resumed')
        this.isPlaying = true
      }
      return true
    } catch (error) {
      console.error('❌ Error resuming sound:', error)
      return false
    }
  }

  // Check if a specific track is currently playing
  isTrackPlaying(trackId) {
    return this.isPlaying && this.currentTrackId === trackId
  }

  // Get current playback status
  getPlaybackStatus() {
    return {
      isPlaying: this.isPlaying,
      currentTrackId: this.currentTrackId,
      currentAudioPath: this.currentAudioPath
    }
  }

  // Get default audio path (for demo purposes)
  getDefaultAudioPath(soundId) {
    // Using a real test audio URL that works
    const testAudioUrls = [
      'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
      'https://www.soundjay.com/misc/sounds/fail-buzzer-02.wav',
      'https://www.soundjay.com/misc/sounds/phone-ring-1.wav',
      'https://www.soundjay.com/misc/sounds/phone-ring-2.wav',
      'https://www.soundjay.com/misc/sounds/phone-ring-3.wav',
    ]
    
    // Use soundId to select a test URL (cycling through available ones)
    const index = (soundId - 1) % testAudioUrls.length
    const selectedUrl = testAudioUrls[index]
    
    console.log('🎵 Using test audio URL for sound ID:', soundId)
    console.log('🎵 Selected URL:', selectedUrl)
    
    return selectedUrl
  }

  // Play preview for a specific song
  async playPreview(soundId, songTitle, artistName) {
    try {
      console.log('🎵 Starting preview for:', songTitle, 'by', artistName)
      
      // Get a real test audio URL
      const audioUrl = this.getDefaultAudioPath(soundId)
      
      // Actually play the audio using the URL
      return await this.playSound(soundId, audioUrl)
    } catch (error) {
      console.error('❌ Error playing preview:', error)
      return false
    }
  }

  // Cleanup resources
  async cleanup() {
    try {
      await this.stopSound()
      console.log('✅ Audio service cleaned up')
    } catch (error) {
      console.error('❌ Error during cleanup:', error)
    }
  }
}

// Create singleton instance
const audioService = new AudioService()

export default audioService
