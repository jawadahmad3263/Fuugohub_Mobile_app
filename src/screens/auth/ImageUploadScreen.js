import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import UploadImage from '../../assets/svg/Upload.svg';
import PrimaryButton from '../../components/common/PrimaryButton';
import SecondaryButton from '../../components/common/SecondaryButton';
import Spacing from '../../components/common/Spacing';
import COLORS from '../../style/colors';
import Style from '../../style/Style';
import { APP_SCREENS, MAIN_TAB_SCREENS } from '../../navigation/screens';
import { Patch, PatchFormData } from '../../services/api';
import { createFormData } from '../../utils/common';

const ImageUploadScreen = ({ navigation }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const requestGalleryPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        // For Android 13+ (API level 33+), we need READ_MEDIA_IMAGES
        // For older versions, we need READ_EXTERNAL_STORAGE
        if (Platform.Version >= 33) {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
            {
              title: 'Gallery Permission',
              message: 'App needs access to your photo gallery to select profile pictures',
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
              message: 'App needs access to your device storage to select profile pictures',
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
    } else {
      // iOS doesn't require explicit permission for photo library access
      // The system will show permission dialog when needed
      return true;
    }
  };

  const handleUploadPhoto = async () => {
    const hasPermission = await requestGalleryPermission();
    if (!hasPermission) {
      Alert.alert(
        'Permission Required',
        'Gallery access is required to select photos. Please grant permission to continue.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Grant Permission', onPress: async () => {
            const granted = await requestGalleryPermission();
            if (granted) {
              // Permission granted, now open gallery
              openGallery();
            }
          }}
        ]
      );
      return;
    }

    // Permission already granted, open gallery
    openGallery();
  };

  const openGallery = async () => {
    const options = {
      mediaType: 'photo',
      quality: 0.8,
      maxWidth: 1024,
      maxHeight: 1024,
      includeBase64: false,
    };

    try {
      const result = await launchImageLibrary(options);
      
      if (result.didCancel) {
        console.log('User cancelled image picker');
      } else if (result.error) {
        console.log('ImagePicker Error: ', result.error);
        Alert.alert('Error', 'Failed to pick image');
      } else if (result.assets && result.assets.length > 0) {
        const image = result.assets[0];
        setSelectedImage(image);
       
        console.log('Selected image:', image);
      }
    } catch (error) {
      console.log('Error picking image:', error);
      Alert.alert('Error', 'Failed to pick image');
    }
  };

  const handleUploadLater = () => {
    // TODO: Navigate to next screen or skip photo upload
    navigation.reset({
      index: 0,
      routes: [{ name: "Main" }],
    });
  };

  const handleComplete = () => {
    // TODO: Complete profile setup

    console.log('Complete pressed');
    
    if(!selectedImage){
      Alert.alert('Error', 'Please upload a photo')
      return
    }
    const data = {
      'profile-images':selectedImage
    }
    const formadata = createFormData(data)
    // const formadata = new FormData()
    // formadata.append('profile-images',selectedImage)

    setLoading(true)
    PatchFormData({
      endpoint:'users/profile-image',
      data:formadata
    }).then((res)=>{
      console.log('RES', res)
      setLoading(false)
      navigation.reset({
        index: 0,
        routes: [{ name: "Main" }],
      });
    }).catch((err)=>{
      setLoading(false)
        console.log('ERR', err)
        navigation.reset({
          index: 0,
          routes: [{ name: "Main" }],
        });
      // Alert.alert('Error', err?.response?.data?.message)
    })
  };

 
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView 
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Header with Logo */}
        <Spacing type="v" val={Platform.OS === "ios" ? 10 : 50} />

        <View style={styles.header}>
          <Image
            source={require('../../assets/images/login-logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <Spacing type="v" val={20} />

        {/* Step Indicator */}
        <View style={styles.stepContainer}>
          <Text style={styles.stepText}>Step 3 of 3</Text>
        </View>

        <Spacing type="v" val={10} />

        {/* Main Heading */}
        <Text style={styles.mainHeading}>Others</Text>

        <Spacing type="v" val={15} />

        {/* Description */}
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionText}>
            Let's make FuugoHub safe and personalized for you.
          </Text>
          <Spacing type="v" val={5} />
          <Text style={styles.descriptionText}>
            Verify your age to continue setting up your profile.
          </Text>
        </View>

        {/* <Spacing type="v" val={20} /> */}

        {/* Photo Upload Section */}
        <View style={styles.uploadSection}>
          <TouchableOpacity 
            style={styles.uploadCircle}
            onPress={handleUploadPhoto}
            activeOpacity={0.8}
          >
            {selectedImage ? (
              // Show selected image
              <View style={styles.imageContainer}>
                <Image
                  source={{ uri: selectedImage.uri }}
                  style={styles.selectedImage}
                  resizeMode="cover"
                />
                <View style={styles.imageOverlay}>
                  <Text style={styles.changePhotoText}>Tap to change photo</Text>
                </View>
              </View>
            ) : (
              // Show upload icon
              <View style={styles.uploadIconContainer}>
                <UploadImage width={60} height={60} />
                <Text style={styles.uploadText}>Upload photo</Text>
              </View>
            )}
          </TouchableOpacity>

          <Spacing type="v" val={20} />

          {/* File Type Info */}
          <View style={styles.fileInfoContainer}>
            <Text style={styles.fileInfoText}>Allowed *.jpeg, *.jpg, *.png, *.gif</Text>
            <Text style={styles.fileInfoText}>Max size of 3.1 MB</Text>
          </View>
        </View>

        {/* Bottom Buttons */}
        <View style={styles.bottomButtons}>
          <View style={[{ width: "48%" }]}>
            <PrimaryButton
              colors={[COLORS.white, COLORS.white]}
              title={"Upload later"}
              style={[Style.nextButton, Style.border]}
              textStyle={[Style.textPrimary, Style.font18]}
              onPress={handleUploadLater}
              
            />
          </View>
          <View style={[{ width: "48%" }]}>
            <PrimaryButton
              title={"Complete"}
              style={[Style.nextButton]}
              textStyle={[Style.nextButtonText]}
              onPress={handleComplete}
              loading={loading}
            />
          </View>
        </View>
        <Spacing val={Platform.OS=='android' ? 50:10}/>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginTop: 10,
  },
  logo: {
    width: 192,
    height: 44.5,
  },
  stepContainer: {
    alignItems: 'center',
  },
  stepText: {
    fontSize: 14,
    color: COLORS.textOrange,
    fontWeight: '500',
  },
  mainHeading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    textAlign: 'center',
  },
  descriptionContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  descriptionText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  uploadSection: {
    alignItems: 'center',
    // flex: 1,
    justifyContent: 'center',
    marginTop:30
  },
  uploadCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#E5E5E5',
    borderStyle: 'dashed',
    backgroundColor: '#F8F8F8',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    overflow: 'hidden',
  },
  uploadIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadText: {
    fontSize: 16,
    color: COLORS.textSecondary,
    fontWeight: '500',
    marginTop: 10,
  },
  imageContainer: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
    overflow: 'hidden',
    position: 'relative',
  },
  selectedImage: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingVertical: 8,
    alignItems: 'center',
  },
  changePhotoText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '500',
  },
  fileInfoContainer: {
    alignItems: 'center',
  },
  fileInfoText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 16,
  },
  bottomButtons: {
    position: "absolute",
    bottom: 5,
    left: 0,
    right: 0,
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
});

export default ImageUploadScreen;