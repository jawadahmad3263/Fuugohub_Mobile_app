import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import SoundIcon from '../../../assets/svg/sound-icon-black.svg'
import PlayIcon from '../../../assets/svg/play-icon.svg'
import AddSoundIcon from '../../../assets/svg/plus-button-red-gradient.svg'
import SearchIcon from '../../../assets/svg/search-icon.svg'
import COLORS from '../../../style/colors'
import Style from '../../../style/Style'

const AddSoundModal = () => {
  const [searchText, setSearchText] = useState('')

  // Mock data for sounds
  const sounds = [
    { id: 1, title: 'Lorem ipsum dummy', artist: 'Artist name: John' },
    { id: 2, title: 'Lorem ipsum dummy', artist: 'Artist name: John' },
    { id: 3, title: 'Lorem ipsum dummy', artist: 'Artist name: John' },
    { id: 4, title: 'Lorem ipsum dummy', artist: 'Artist name: John' },
    { id: 5, title: 'Lorem ipsum dummy', artist: 'Artist name: John' },
    { id: 6, title: 'Lorem ipsum dummy', artist: 'Artist name: John' },
    { id: 7, title: 'Lorem ipsum dummy', artist: 'Artist name: John' },
    { id: 8, title: 'Lorem ipsum dummy', artist: 'Artist name: John' },
  ]

  const handleAddSound = (soundId) => {
    console.log('Adding sound:', soundId)
    // Add your logic here
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <SoundIcon width={24} height={24} />
        <Text style={[styles.headerTitle, Style.semibold]}>Add sound</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search here"
          placeholderTextColor={COLORS.textSecondary}
          value={searchText}
          onChangeText={setSearchText}
        />
        <SearchIcon width={20} height={20} style={styles.searchIcon} />
      </View>

      {/* Sounds List */}
      <ScrollView style={styles.soundsList} showsVerticalScrollIndicator={true}>
        {sounds.map((sound) => (
          <View key={sound.id} style={styles.soundItem}>
            <View style={styles.soundInfo}>
              <TouchableOpacity style={styles.playButton}>
                <PlayIcon width={24} height={24} />
              </TouchableOpacity>
              <View style={styles.soundDetails}>
                <Text style={[styles.soundTitle, Style.semibold]}>{sound.title}</Text>
                <Text style={styles.soundArtist}>{sound.artist}</Text>
              </View>
            </View>
            <TouchableOpacity 
              style={styles.addButton}
              onPress={() => handleAddSound(sound.id)}
            >
              <AddSoundIcon width={24} height={24} />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  )
}

export default AddSoundModal

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 8,
  },
  headerTitle: {
    fontSize: 18,
    color: COLORS.textPrimary,
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
  soundsList: {
    flex: 1,
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
    backgroundColor: COLORS.black,
    justifyContent: 'center',
    alignItems: 'center',
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
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
})