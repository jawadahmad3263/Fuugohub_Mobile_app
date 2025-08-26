import { StyleSheet, Text, View, TextInput, Modal, Dimensions, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useState } from 'react'
import DropDownPicker from 'react-native-dropdown-picker'
import COLORS from '../../../style/colors'
import Style from '../../../style/Style'
import PrimaryButton from '../../../components/common/PrimaryButton'

const { height: screenHeight } = Dimensions.get('window')

const DropDetailsModal = ({ visible, onClose, onPost, selectedSound, recordedVideo }) => {
  const [description, setDescription] = useState('')
  const [location, setLocation] = useState('')
  const [audience, setAudience] = useState('Everyone')
  const [tagProduct, setTagProduct] = useState('Everyone')
  const [enableMonetization, setEnableMonetization] = useState(false)

  // Dropdown states
  const [locationOpen, setLocationOpen] = useState(false)
  const [audienceOpen, setAudienceOpen] = useState(false)
  const [tagProductOpen, setTagProductOpen] = useState(false)

  // Dropdown data
  const locationItems = [
    { label: 'New York, NY', value: 'new_york' },
    { label: 'Los Angeles, CA', value: 'los_angeles' },
    { label: 'Chicago, IL', value: 'chicago' },
    { label: 'Houston, TX', value: 'houston' },
    { label: 'Phoenix, AZ', value: 'phoenix' },
    { label: 'Philadelphia, PA', value: 'philadelphia' },
    { label: 'San Antonio, TX', value: 'san_antonio' },
    { label: 'San Diego, CA', value: 'san_diego' },
    { label: 'Dallas, TX', value: 'dallas' },
    { label: 'San Jose, CA', value: 'san_jose' },
  ]

  const audienceItems = [
    { label: 'Everyone', value: 'everyone' },
    { label: 'Friends Only', value: 'friends' },
    { label: 'Private', value: 'private' },
    { label: 'Followers', value: 'followers' },
  ]

  const tagProductItems = [
    { label: 'Fashion & Style', value: 'fashion' },
    { label: 'Beauty & Cosmetics', value: 'beauty' },
    { label: 'Technology', value: 'technology' },
    { label: 'Food & Beverage', value: 'food' },
    { label: 'Fitness & Health', value: 'fitness' },
    { label: 'Home & Lifestyle', value: 'home' },
    { label: 'Travel', value: 'travel' },
    { label: 'Entertainment', value: 'entertainment' },
  ]

  const handlePost = () => {
    const dropData = {
      sound: selectedSound,
      description,
      location,
      audience,
      tagProduct,
      enableMonetization
    }
    onPost && onPost(dropData)
  }

  const handleDiscard = () => {
    setDescription('')
    setLocation('')
    setAudience('Everyone')
    setTagProduct('Everyone')
    setEnableMonetization(false)
    onClose && onClose()
  }

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView 
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <View style={styles.overlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              {/* Header */}
              <View style={styles.header}>
                <Text style={[styles.headerTitle, Style.semibold]}>Drop Details</Text>
              </View>

              <ScrollView 
                style={styles.content} 
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={styles.scrollContent}
              >
                {/* Sound Info */}
                {selectedSound && (
                  <View style={styles.soundInfo}>
                    <View style={styles.soundText}>
                      <Text style={[styles.soundTitle, Style.semibold]}>{selectedSound.title}</Text>
                      <Text style={[styles.soundArtist, Style.regular]}>{selectedSound.artist}</Text>
                    </View>
                    <View style={styles.soundIcon}>
                      <Text style={styles.musicNote}>♪</Text>
                    </View>
                  </View>
                )}

                {/* Description */}
                <View style={styles.inputGroup}>
                  <Text style={[styles.label, Style.semibold]}>Description</Text>
                  <TextInput
                    style={styles.textArea}
                    placeholder="Lorem ipsum dummy text"
                    placeholderTextColor={COLORS.textSecondary}
                    value={description}
                    onChangeText={setDescription}
                    multiline
                    numberOfLines={4}
                    textAlignVertical="top"
                    returnKeyType="done"
                    blurOnSubmit={true}
                  />
                </View>

                {/* Location */}
                <View style={styles.inputGroup}>
                  <Text style={[styles.label, Style.semibold]}>Location</Text>
                  <DropDownPicker
                    open={locationOpen}
                    value={location}
                    items={locationItems}
                    setOpen={setLocationOpen}
                    setValue={setLocation}
                    style={styles.dropdown}
                    dropDownContainerStyle={styles.dropdownContainer}
                    placeholder="Select location"
                    placeholderStyle={styles.dropdownPlaceholder}
                    textStyle={[styles.dropdownText, Style.regular]}
                    listMode="SCROLLVIEW"
                    scrollViewProps={{
                      nestedScrollEnabled: true,
                    }}
                    zIndex={3000}
                    zIndexInverse={1000}
                  />
                </View>

                {/* Who can watch */}
                <View style={styles.inputGroup}>
                  <Text style={[styles.label, Style.semibold]}>Who can watch this drop?</Text>
                  <DropDownPicker
                    open={audienceOpen}
                    value={audience}
                    items={audienceItems}
                    setOpen={setAudienceOpen}
                    setValue={setAudience}
                    style={styles.dropdown}
                    dropDownContainerStyle={styles.dropdownContainer}
                    placeholder="Select audience"
                    placeholderStyle={styles.dropdownPlaceholder}
                    textStyle={[styles.dropdownText, Style.regular]}
                    listMode="SCROLLVIEW"
                    scrollViewProps={{
                      nestedScrollEnabled: true,
                    }}
                    zIndex={2000}
                    zIndexInverse={2000}
                  />
                </View>

                {/* Tag Product */}
                <View style={styles.inputGroup}>
                  <Text style={[styles.label, Style.semibold]}>Tag Product</Text>
                  <DropDownPicker
                    open={tagProductOpen}
                    value={tagProduct}
                    items={tagProductItems}
                    setOpen={setTagProductOpen}
                    setValue={setTagProduct}
                    style={styles.dropdown}
                    dropDownContainerStyle={styles.dropdownContainer}
                    placeholder="Select product category"
                    placeholderStyle={styles.dropdownPlaceholder}
                    textStyle={[styles.dropdownText, Style.regular]}
                    listMode="SCROLLVIEW"
                    scrollViewProps={{
                      nestedScrollEnabled: true,
                    }}
                    zIndex={1000}
                    zIndexInverse={3000}
                  />
                </View>

                {/* Enable Monetization */}
                <View style={styles.inputGroup}>
                  <Text style={[styles.label, Style.semibold]}>Enable monetization</Text>
                  <View style={styles.checkboxContainer}>
                    <TouchableOpacity 
                      style={[styles.checkbox, enableMonetization && styles.checkboxChecked]}
                      onPress={() => setEnableMonetization(!enableMonetization)}
                    >
                      {enableMonetization && <Text style={styles.checkmark}>✓</Text>}
                    </TouchableOpacity>
                    <Text style={[styles.checkboxLabel, Style.regular]}>
                      Earn from this drop (product clicks, stars, promotions)
                    </Text>
                  </View>
                </View>
              </ScrollView>

              {/* Action Buttons */}
              <View style={styles.buttonContainer}>
                <PrimaryButton
                  title="Post Now"
                  onPress={handlePost}
                  style={styles.postButton}
                  textStyle={styles.postButtonText}
                />
                <TouchableOpacity style={styles.discardButton} onPress={handleDiscard}>
                  <Text style={[styles.discardButtonText, Style.semibold]}>Discard</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  )
}

export default DropDetailsModal

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalContainer: {
    width: '100%',
    height: screenHeight * 0.9,
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
    alignItems: 'center',
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 20,
    color: COLORS.textPrimary,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  soundInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
    paddingVertical: 12,
  },
  soundText: {
    flex: 1,
  },
  soundTitle: {
    fontSize: 16,
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  soundArtist: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  soundIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: 'linear-gradient(135deg, #FF6B35, #F7931E)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  musicNote: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  textArea: {
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: COLORS.textPrimary,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  dropdown: {
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.white,
    minHeight: 50,
  },
  dropdownContainer: {
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    marginTop: 4,
    maxHeight: 200,
    ...Style.cardShadow,
  },
  dropdownText: {
    fontSize: 16,
    color: COLORS.textPrimary,
  },
  dropdownPlaceholder: {
    fontSize: 16,
    color: COLORS.textSecondary,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  checkmark: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  checkboxLabel: {
    fontSize: 14,
    color: COLORS.textPrimary,
    flex: 1,
  },
  buttonContainer: {
    marginTop: 24,
    gap: 12,
  },
  postButton: {
    width: '100%',
    height: 50,
    borderRadius: 12,
  },
  postButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  discardButton: {
    width: '100%',
    height: 50,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  discardButtonText: {
    fontSize: 18,
    color: COLORS.textPrimary,
  },
})