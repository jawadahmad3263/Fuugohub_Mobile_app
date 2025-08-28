import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Style from '../../../style/Style';
import COLORS from '../../../style/colors';
import PrimaryButton from '../../../components/common/PrimaryButton';
import UploadPhotoIcon from '../../../assets/svg/Upload.svg';

const ProfileUpdateModal = ({ visible, onClose, onSave }) => {
  const [displayName, setDisplayName] = useState('');
  const [description, setDescription] = useState('');

  const handleSave = () => {
    if (onSave) {
      onSave({ displayName, description });
    }
    onClose && onClose();
  };

  const handleCancel = () => {
    onClose && onClose();
  };

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={styles.backdrop}>
        <KeyboardAvoidingView
          behavior={Platform.select({ ios: 'padding', android: undefined })}
          style={styles.kav}
        >
          <View style={styles.sheet}>
            <Text style={styles.title}>Edit Details</Text>

            <ScrollView showsVerticalScrollIndicator={false}>
              {/* Change Profile Picture Section */}
              <View style={styles.fieldGroup}>
                <Text style={styles.label}>Change Profile Picture</Text>
                <TouchableOpacity style={styles.uploadArea} activeOpacity={0.7}>
                  <View style={styles.circularUploadArea}>
                    <UploadPhotoIcon width={24} height={24} />
                    <Text style={styles.uploadText}>Upload photo</Text>
                  </View>
                </TouchableOpacity>
              </View>

              {/* Change Banner Section */}
              <View style={styles.fieldGroup}>
                <Text style={styles.label}>Change Banner</Text>
                <TouchableOpacity style={styles.uploadArea} activeOpacity={0.7}>
                  <View style={styles.rectangularUploadArea}>
                    <UploadPhotoIcon width={24} height={24} />
                    <Text style={styles.uploadText}>Upload banner image</Text>
                  </View>
                </TouchableOpacity>
              </View>

              {/* Display Name Section */}
              <View style={styles.fieldGroup}>
                <Text style={styles.label}>Display name</Text>
                <TextInput
                  value={displayName}
                  onChangeText={setDisplayName}
                  placeholder="Lorem ipsum"
                  placeholderTextColor={COLORS.textSecondary}
                  style={styles.input}
                />
              </View>

              {/* Description Section */}
              <View style={styles.fieldGroup}>
                <Text style={styles.label}>Description</Text>
                <TextInput
                  value={description}
                  onChangeText={setDescription}
                  placeholder="Describe your Business"
                  placeholderTextColor={COLORS.textSecondary}
                  style={[styles.input, styles.multiline]}
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                />
              </View>

              {/* Action Buttons */}
              <View style={styles.buttonContainer}>
                <PrimaryButton
                  title="Save"
                  onPress={handleSave}
                  style={styles.saveButton}
                  textStyle={styles.saveButtonText}
                  colors={[COLORS.textPrimary, COLORS.textPrimary]}
                />
                <PrimaryButton
                  title="Cancel"
                  onPress={handleCancel}
                  style={styles.cancelButton}
                  textStyle={styles.cancelButtonText}
                  colors={[COLORS.white, COLORS.white]}
                />
              </View>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};

export default ProfileUpdateModal;

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  kav: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sheet: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 20,
    maxHeight: '80%',
    width: '92%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: 20,
  },
  fieldGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  uploadArea: {
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    borderStyle: 'dashed',
    borderRadius: 12,
    padding: 20,
    backgroundColor: COLORS.white,
  },
  circularUploadArea: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  rectangularUploadArea: {
    height: 80,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    borderStyle: 'dashed',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 8,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: COLORS.textPrimary,
    fontSize: 16,
    backgroundColor: COLORS.white,
  },
  multiline: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    gap: 12,
    marginTop: 10,
  },
  saveButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  saveButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  cancelButtonText: {
    color: COLORS.textPrimary,
    fontSize: 16,
    fontWeight: '600',
  },
});