import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  Platform,
  PermissionsAndroid,
  ActivityIndicator,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import UploadImage from '../../../assets/svg/Upload.svg';
import DeleteIcon from '../../../assets/svg/delete-icon.svg';
import COLORS from '../../../style/colors';
import Style from '../../../style/Style';

const ThumbnilUploadModal = ({ visible, onClose, onConfirm, uploadFunction ,loading }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const requestGalleryPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        if (Platform.Version >= 33) {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
            {
              title: 'Gallery Permission',
              message: 'App needs access to your photo gallery to select images',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          );
          return granted === PermissionsAndroid.RESULTS.GRANTED;
        } else {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            {
              title: 'Storage Permission',
              message: 'App needs access to your device storage to select images',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          );
          return granted === PermissionsAndroid.RESULTS.GRANTED;
        }
      } catch (err) {
        console.warn('Permission request error:', err);
        return false;
      }
    }
    return true;
  };

  const handleImagePicker = async () => {
    const hasPermission = await requestGalleryPermission();
    if (!hasPermission) {
      Alert.alert(
        'Permission Required',
        'Gallery access is required to select images. Please grant permission to continue.',
        [
          { text: 'Cancel', style: 'cancel' },
          { 
            text: 'Grant Permission', 
            onPress: async () => {
              const granted = await requestGalleryPermission();
              if (granted) {
                openImageLibrary();
              }
            }
          }
        ]
      );
      return;
    }
    openImageLibrary();
  };

  const openImageLibrary = () => {
    const options = {
      mediaType: 'photo',
      quality: 0.8,
      maxWidth: 1024,
      maxHeight: 1024,
      includeBase64: false,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
        Alert.alert('Error', 'Failed to select image. Please try again.');
      } else if (response.assets && response.assets[0]) {
        setSelectedImage(response.assets[0]);
      }
    });
  };

  const handleDeleteImage = () => {
    setSelectedImage(null);
  };

  const handleConfirm = () => {
    if (selectedImage) {
      if (uploadFunction) {
        uploadFunction(selectedImage);
      }
      if (onConfirm) {
        onConfirm(selectedImage);
      }
    }
    onClose();
  };

  const handleClose = () => {
    setSelectedImage(null);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={handleClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Upload Thumbnail</Text>
            
            <View style={styles.imageSection}>
              <TouchableOpacity
                style={styles.imageContainer}
                onPress={handleImagePicker}
                activeOpacity={0.8}
              >
                {selectedImage ? (
                  <View style={styles.selectedImageWrapper}>
                    <Image
                      source={{ uri: selectedImage.uri }}
                      style={styles.selectedImage}
                      resizeMode="cover"
                    />
                    <TouchableOpacity
                      style={styles.deleteButton}
                      onPress={handleDeleteImage}
                      activeOpacity={0.8}
                    >
                      <DeleteIcon width={20} height={20} />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View style={styles.uploadPlaceholder}>
                    <UploadImage width={60} height={60} />
                    <Text style={styles.uploadText}>Tap to upload image</Text>
                    <Text style={styles.uploadSubtext}>JPG, PNG, GIF up to 3MB</Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>

            <View style={styles.buttonSection}>
              <TouchableOpacity
                style={[
                  styles.confirmButton,
                  !selectedImage && styles.confirmButtonDisabled
                ]}
                onPress={handleConfirm}
                disabled={!selectedImage}
                activeOpacity={0.8}
              >
                {loading ? <ActivityIndicator color={COLORS.white} size="small" /> : (
                  
                <Text style={[
                  styles.confirmButtonText,
                  !selectedImage && styles.confirmButtonTextDisabled
                ]}>
                  Confirm
                </Text>
                )}
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={handleClose}
                activeOpacity={0.8}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    maxWidth: 400,
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 24,
    ...Style.cardShadow,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: 24,
  },
  imageSection: {
    marginBottom: 24,
  },
  imageContainer: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.border,
    borderStyle: 'dashed',
    overflow: 'hidden',
  },
  selectedImageWrapper: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  selectedImage: {
    width: '100%',
    height: '100%',
  },
  deleteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.lightGray,
  },
  uploadText: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.textPrimary,
    marginTop: 12,
    textAlign: 'center',
  },
  uploadSubtext: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 4,
    textAlign: 'center',
  },
  buttonSection: {
    gap: 12,
  },
  confirmButton: {
    backgroundColor: COLORS.buttonPrimary,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  confirmButtonDisabled: {
    backgroundColor: COLORS.lightGray,
  },
  confirmButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
  confirmButtonTextDisabled: {
    color: COLORS.textSecondary,
  },
  cancelButton: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: COLORS.textPrimary,
    fontSize: 16,
    fontWeight: '500',
  },
});

export default ThumbnilUploadModal;