import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity, Modal, Dimensions, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import SoundIcon from '../../../assets/svg/sound-icon-black.svg'
import PlayIcon from '../../../assets/svg/play-icon.svg'
import AddSoundIcon from '../../../assets/svg/plus-button-red-gradient.svg'
import SearchIcon from '../../../assets/svg/search-icon.svg'
import COLORS from '../../../style/colors'
import Style from '../../../style/Style'
import { MusicAPI, POPULAR_SONGS } from '../../../constants/api'
import audioService from '../../../services/audioService'

const { height: screenHeight } = Dimensions.get('window')

const AddSoundModal = ({ visible, onClose, onAddSound }) => {
  const [searchText, setSearchText] = useState('')
  const [sounds, setSounds] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [playingTrackId, setPlayingTrackId] = useState(null)
  const [playLoading, setPlayLoading] = useState(null)

  // Fetch songs from real APIs with fallbacks
  const fetchSongs = async (searchQuery = '') => {
    setLoading(true)
    setError(null)
    
    try {
      let songs = []
      
      // Try iTunes API first (free, no key required)
      try {
        songs = await MusicAPI.fetchFromDeezer(searchQuery)
        if (songs.length > 0) {
          setSounds(songs)
          console.log('songs', songs)
          setLoading(false)
          return
        }
      } catch (err) {
        console.log('iTunes API failed, trying Deezer...')
      }
      
      // Try Deezer API as fallback (free, no key required)
      try {
        songs = await MusicAPI.fetchFromDeezer(searchQuery)
        if (songs.length > 0) {
          setSounds(songs)
          setLoading(false)
          return
        }
      } catch (err) {
        console.log('Deezer API failed, using fallback data...')
      }
      
      // Fallback to popular songs list
      const filteredSongs = searchQuery 
        ? POPULAR_SONGS.filter(song => 
            song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            song.artist.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : POPULAR_SONGS
      
      setSounds(filteredSongs)
      
    } catch (err) {
      console.error('Error fetching songs:', err)
      setError('Failed to load songs. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // Load songs when modal opens
  useEffect(() => {
    if (visible) {
      fetchSongs()
    }
  }, [visible])

  // Cleanup audio when modal closes
  useEffect(() => {
    if (!visible) {
      audioService.stopSound()
      setPlayingTrackId(null)
      setPlayLoading(null)
    }
  }, [visible])

  // Search functionality with debouncing
  const handleSearch = (text) => {
    setSearchText(text)
    
    // Clear previous timeout
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout)
    }
    
    // Set new timeout for search
    this.searchTimeout = setTimeout(() => {
      if (text.length > 2) {
        fetchSongs(text)
      } else if (text.length === 0) {
        fetchSongs()
      }
    }, 500) // 500ms delay to avoid too many API calls
  }

  // Handle play button press
  const handlePlaySound = async (soundId) => {
    try {
      setPlayLoading(soundId)
      
      // If this track is already playing, stop it
      if (playingTrackId === soundId) {
        await audioService.stopSound()
        setPlayingTrackId(null)
        setPlayLoading(null)
        return
      }

      // Get the song details
      const song = sounds.find(s => s.id === soundId)
      if (!song) {
        setPlayLoading(null)
        return
      }

      // Play the preview
      await audioService.playPreview(soundId, song.title, song.artist)
      setPlayingTrackId(soundId)
      
      // Reset loading state after a short delay
      setTimeout(() => {
        setPlayLoading(null)
      }, 1000)
      
    } catch (error) {
      console.error('Error playing sound:', error)
      setPlayLoading(null)
      // You could show a toast message here
    }
  }

  const handleAddSound = (soundId) => {
    const selectedSound = sounds.find(sound => sound.id === soundId)
    console.log('Adding sound:', selectedSound)
    if (onAddSound) {
      onAddSound(selectedSound)
    }
    onClose && onClose()
  }

  const handleTestAudio = async () => {
    try {
      setPlayLoading('test')
      await audioService.playPreview('test-id', 'Test Song', 'Test Artist')
      setPlayingTrackId('test-id')
      setTimeout(() => {
        setPlayLoading(null)
      }, 1000)
    } catch (error) {
      console.error('Error testing audio:', error)
      setPlayLoading(null)
    }
  }

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* Header */}
            <View style={styles.header}>
              <SoundIcon width={24} height={24} />
              <Text style={[styles.headerTitle, Style.semibold]}>Add sound</Text>
            
            </View>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.searchInput}
                placeholder="Search songs..."
                placeholderTextColor={COLORS.textSecondary}
                value={searchText}
                onChangeText={handleSearch}
              />
              <SearchIcon width={20} height={20} style={styles.searchIcon} />
            </View>

            {/* Sounds List */}
            <View style={styles.soundsListContainer}>
              {loading ? (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="large" color={COLORS.primary} />
                  <Text style={styles.loadingText}>Loading songs...</Text>
                </View>
              ) : error ? (
                <View style={styles.errorContainer}>
                  <Text style={styles.errorText}>{error}</Text>
                  <TouchableOpacity style={styles.retryButton} onPress={() => fetchSongs()}>
                    <Text style={styles.retryButtonText}>Retry</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <ScrollView 
                  style={styles.soundsList} 
                  showsVerticalScrollIndicator={true}
                  contentContainerStyle={styles.soundsListContent}
                >
                  {sounds.length === 0 ? (
                    <View style={styles.emptyContainer}>
                      <Text style={styles.emptyText}>No songs found</Text>
                      <Text style={styles.emptySubtext}>Try searching for a different song</Text>
                    </View>
                  ) : (
                    sounds.map((sound) => {
                      const isPlaying = playingTrackId === sound.id
                      const isLoading = playLoading === sound.id
                      
                      return (
                        <View key={sound.id} style={styles.soundItem}>
                          <View style={styles.soundInfo}>
                            <TouchableOpacity 
                              style={[
                                styles.playButton,
                                isPlaying && styles.playButtonActive
                              ]}
                              onPress={() => handlePlaySound(sound.id)}
                              disabled={isLoading}
                            >
                              {isLoading ? (
                                <ActivityIndicator size="small" color={COLORS.white} />
                              ) : (
                                <PlayIcon width={24} height={24} />
                              )}
                            </TouchableOpacity>
                            <View style={styles.soundDetails}>
                              <Text style={[styles.soundTitle, Style.semibold]}>{sound.title}</Text>
                              <Text style={styles.soundArtist}>{sound.artist}</Text>
                              {sound.album && (
                                <Text style={styles.soundAlbum}>{sound.album}</Text>
                              )}
                            </View>
                          </View>
                          <TouchableOpacity 
                            style={styles.addButton}
                            onPress={() => handleAddSound(sound.id)}
                          >
                            <AddSoundIcon width={24} height={24} />
                          </TouchableOpacity>
                        </View>
                      )
                    })
                  )}
                </ScrollView>
              )}
            </View>
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default AddSoundModal

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalContainer: {
    width: '100%',
    height: screenHeight,
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingTop: 40,
    paddingBottom: 40,
    flex: 1,
    ...Style.cardShadow,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    gap: 8,
  },
  headerTitle: {
    fontSize: 18,
    color: COLORS.textPrimary,
  },
  testButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  testButtonText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '600',
  },
  searchContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  searchInput: {
    backgroundColor: COLORS.lightGray,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingRight: 50,
    fontSize: 16,
    color: COLORS.textPrimary,
  },
  searchIcon: {
    position: 'absolute',
    right: 16,
    top: 12,
    color: COLORS.textSecondary,
  },
  soundsListContainer: {
    flex: 1,
  },
  soundsList: {
    flex: 1,
  },
  soundsListContent: {
    paddingBottom: 20,
  },
  soundItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
  },
  soundInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  playButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButtonActive: {
    backgroundColor: COLORS.primary,
  },
  soundDetails: {
    flex: 1,
  },
  soundTitle: {
    fontSize: 16,
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  soundArtist: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 1,
  },
  soundAlbum: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontStyle: 'italic',
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: COLORS.textSecondary,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  errorText: {
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emptyText: {
    fontSize: 18,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
})