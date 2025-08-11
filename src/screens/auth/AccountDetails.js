import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import RadioIcon  from '../../assets/svg/radio-btn.svg'
import PrimaryButton from '../../components/common/PrimaryButton';
import InputText from '../../components/forms/TextInput'
import EyeIcon from '../../assets/svg/ic-solar_eye-bold.svg'
import PhoneNumberInput from '../../components/forms/PhoneNumberInput';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { Post } from '../../services/api';
import { setUserToken } from '../../utils/common';
const AccountDetails = () => {
    const navigation = useNavigation()
    const route = useRoute()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    gender: '',
    age: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false)
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    // Validate required fields
    if (!formData.firstName) {
      Alert.alert('Error', 'Please enter your first name');
      return;
    }
    if (!formData.lastName) {
      Alert.alert('Error', 'Please enter your last name');
      return;
    }
    if (!formData.phoneNumber) {
      Alert.alert('Error', 'Please enter your phone number');
      return;
    }
    if (!formData.password) {
      Alert.alert('Error', 'Please enter a password');
      return;
    }
    if(formData.password !== formData.confirmPassword){
      Alert.alert('Error', 'Password and confirm password do not match');
      return;
    }
    if (!formData.gender) {
      Alert.alert('Error', 'Please select your gender');
      return;
    }
    if (!formData.age) {
      Alert.alert('Error', 'Please select your age group');
      return;
    }
    const email = route?.params?.email || route?.params?.data?.email || 'fg12@yopmail.com';
    if (!email) {
      Alert.alert('Error', 'Email is required');
      return;
    }
    setLoading(true)
    const data = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      phoneNumber: formData.phoneNumber ? "+33" + formData.phoneNumber.replace(/[^0-9]/g, '') : "",
      password: formData.password,
      email: email||'fg12@yopmail.com',
      gender: formData.gender,
      age: formData.age,
    }

    
    // Alert.alert('data', JSON.stringify(data))
 
    Post({endpoint: 'auth/signup/account-details', data: data}).then(async(res) => {
      console.log('res', res)
      const token = res?.data?.token || res?.data?.accessToken || res?.data?.refreshToken || firstName
      await setUserToken(token)
      setLoading(false)
      navigation.navigate('UserPreferences')
    }).catch((err) => {
      Alert.alert('Error', err?.message)
      console.log('err', err)
      setLoading(false)
    })
  }

  const RadioButton = ({ selected, onPress, label }) => (
    <TouchableOpacity style={styles.radioContainer} onPress={onPress}>
      <View style={[styles.radioOuter, selected && styles.radioSelected]}>
        {/* {selected && <View style={styles.radioInner} />} */}
        {selected && <RadioIcon/>}
      </View>
      <Text style={styles.radioLabel}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <KeyboardAvoidingView style={styles.container}
    behavior={Platform.OS == 'ios' ?'padding':undefined}    
    >
       
      <ScrollView
       contentContainerStyle={{ flexGrow: 1 }}
       style={styles.scrollView} showsVerticalScrollIndicator={false}>
       

        {/* Logo and Brand */}
        <View style={styles.logoContainer}>
        <Image
              source={require("../../assets/images/login-logo.png")}
              style={styles.logo}
              resizeMode="contain"
            />
        </View>

        {/* Step Indicator */}
        <View style={styles.stepContainer}>
          <Text style={styles.stepIndicator}>Step 1 of 3</Text>
          <Text style={styles.title}>Account details</Text>
          <Text style={styles.subtitle}>
            Enter some fo your information & secure password{'\n'}to go next step!
          </Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          {/* First Name */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>First name</Text>
            <TextInput
              style={styles.input}
              value={formData.firstName}
              onChangeText={(value) => handleInputChange('firstName', value)}
              placeholder="John"
              placeholderTextColor="#97a3b4"
            />
          </View>

          {/* Last Name */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Lasth name</Text>
            <TextInput
              style={styles.input}
              value={formData.lastName}
              onChangeText={(value) => handleInputChange('lastName', value)}
              placeholder="David"
              placeholderTextColor="#97a3b4"
            />
          </View>

          {/* Phone Number */}
          <View style={styles.inputGroup}>
            <PhoneNumberInput
            value={formData.phoneNumber}
            onChangeText={(value) => handleInputChange('phoneNumber', value)}
            />
          </View>

          {/* Password */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={[styles.input, styles.passwordInput]}
                value={formData.password}
                onChangeText={(value) => handleInputChange('password', value)}
                placeholder="6+ characters"
                placeholderTextColor="#97a3b4"
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                style={styles.eyeButton}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Text style={styles.eyeIcon}>👁️</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Confirm Password */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Confirm Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={[styles.input, styles.passwordInput]}
                value={formData.confirmPassword}
                onChangeText={(value) => handleInputChange('confirmPassword', value)}
                placeholder="6+ characters"
                placeholderTextColor="#97a3b4"
                secureTextEntry={!showConfirmPassword}
              />
              <TouchableOpacity
                style={styles.eyeButton}
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <Text style={styles.eyeIcon}>👁️</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Gender */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Gender</Text>
            <View style={styles.radioGroup}>
              <RadioButton
                selected={formData.gender === 'male'}
                onPress={() => handleInputChange('gender', 'male')}
                label="Male"
              />
              <RadioButton
                selected={formData.gender === 'female'}
                onPress={() => handleInputChange('gender', 'female')}
                label="Female"
              />
            </View>
          </View>

          {/* Age */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Age</Text>
            <View style={styles.ageGroup}>
              <RadioButton
                selected={formData.age === 'under13'}
                onPress={() => handleInputChange('age', 'under13')}
                label="Under 13"
              />
              <RadioButton
                selected={formData.age === '13to18'}
                onPress={() => handleInputChange('age', '13to18')}
                label="13 to 18"
              />
              <RadioButton
                selected={formData.age === '18older'}
                onPress={() => handleInputChange('age', '18older')}
                label="18 or Older"
              />
            </View>
          </View>

          {/* Next Button */}
          <View style={styles.buttonContainer}>
             
            <PrimaryButton
                title={'Next'}
                style={styles.nextButton}
                textStyle={styles.nextButtonText}
                onPress={handleNext}
                loading={loading}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    paddingTop:35
  },
  scrollView: {
    flex: 1,
  },
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  time: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
  },
  statusIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  signalDots: {
    flexDirection: 'row',
    gap: 4,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
  },
  activeDot: {
    backgroundColor: '#000',
  },
  inactiveDot: {
    backgroundColor: '#d1d5db',
  },
  signal: {
    marginLeft: 8,
    fontSize: 14,
  },
  wifi: {
    fontSize: 14,
  },
  battery: {
    width: 24,
    height: 12,
    backgroundColor: '#000',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 2,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    marginTop: 16,
  },
  logoGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logoIconContainer: {
    position: 'relative',
  },
  logoIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoEmoji: {
    color: '#fff',
    fontSize: 14,
  },
  logoOverlay: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 16,
    height: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoOverlayEmoji: {
    color: '#fff',
    fontSize: 8,
  },
  brandName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
  },
  stepContainer: {
    alignItems: 'center',
    marginBottom: 24,
    paddingHorizontal: 24,
  },
  stepIndicator: {
    color: '#f97413',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#020817',
    marginBottom: 8,
  },
  subtitle: {
    color: '#97a3b4',
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'center',
  },
  form: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#020817',
    marginBottom: 12,
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#cdd7e5',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    color: '#000',
  },
  phoneContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  countryCode: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#cdd7e5',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 16,
    gap: 8,
  },
  flag: {
    fontSize: 18,
  },
  dropdown: {
    color: '#97a3b4',
    fontSize: 12,
  },
  phoneInput: {
    flex: 1,
  },
  passwordContainer: {
    position: 'relative',
  },
  passwordInput: {
    paddingRight: 48,
  },
  eyeButton: {
    position: 'absolute',
    right: 16,
    top: 16,
    padding: 4,
  },
  eyeIcon: {
    fontSize: 16,
    color: '#9ca3af',
  },
  radioGroup: {
    flexDirection: 'row',
    gap: 24,
  },
  ageGroup: {
    gap: 12,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#d1d5db',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: {
    borderColor: '#f97413',
    backgroundColor: '#f97413',
  },
  radioInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  radioLabel: {
    fontSize: 16,
    color: '#020817',
  },
  buttonContainer: {
    marginTop: 24,
  },
  nextButtonWrapper: {
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  nextButton: {
    marginTop: 0,
    marginBottom: 10,
    width: "100%",
  },
  nextButtonText: {
    fontSize: 20,
    fontWeight: "bold",
  },
 
  logo: {
    width: 192,
    height: 44.5,
    marginTop: 12,
    marginBottom: 8,
  },
});

export default AccountDetails;