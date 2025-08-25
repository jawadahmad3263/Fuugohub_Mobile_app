import React, { useEffect, useState } from 'react';
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
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { Post } from '../../services/api';
import { setUserToken } from '../../utils/common';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/slices/userSlice';
import Style from '../../style/Style';
import PhoneNumInput from '../../components/forms/PhoneInput';
import Spacing from '../../components/common/Spacing';


const AccountDetails = () => {
    const navigation = useNavigation()
    const route = useRoute()
  const [formData, setFormData] = useState({
    firstName: route?.params?.firstName || '',
    lastName:route?.params?.lastName ||  '',
    phoneNumber: '',
    phoneCountryCode: '+33', // Add country code tracking
    password: '',
    confirmPassword: '',
    gender: 'male',
    age: '',
  });

  const [errors, setErrors] = useState({
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

  const dispatch = useDispatch()
  
  const handleInputChange = (field, value) => {
    
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const validateField = (field, value) => {
    switch (field) {
      case 'firstName':
        if (!value.trim()) return 'Please enter your first name';
        if (value.trim().length < 2) return 'First name must be at least 2 characters';
        if (!/^[a-zA-Z\s]+$/.test(value.trim())) return 'First name can only contain letters';
        return '';
      
      case 'lastName':
        if (!value.trim()) return 'Please enter your last name';
        if (value.trim().length < 2) return 'Last name must be at least 2 characters';
        if (!/^[a-zA-Z\s]+$/.test(value.trim())) return 'Last name can only contain letters';
        return '';
      
      case 'phoneNumber':
        if (!value) return 'Please enter your phone number';
        // Remove all non-digit characters and check length
        const cleanPhone = value.replace(/[^0-9]/g, '');
        if (cleanPhone.length < 7) return 'Please enter a valid phone number';
        if (cleanPhone.length > 15) return 'Phone number is too long';
        return '';
      
      case 'password':
        if (!value) return 'Please enter a password';
        if (value.length < 6) return 'Password must be at least 6 characters';
        if (!/(?=.*[a-z])/.test(value)) return 'Password must contain at least one lowercase letter';
        if (!/(?=.*[A-Z])/.test(value)) return 'Password must contain at least one uppercase letter';
        if (!/(?=.*\d)/.test(value)) return 'Password must contain at least one number';
        return '';
      
      case 'confirmPassword':
        if (!value) return 'Please confirm your password';
        if (value !== formData.password) return 'Passwords do not match';
        return '';
      
      case 'gender':
        if (!value) return 'Please select your gender';
        return '';
      
      case 'age':
        if (!value) return 'Please enter your age';
        if(value < 5) return 'You must be at least 5';
        
        return '';
      
      default:
        return '';
    }
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    Object.keys(formData).forEach(field => {
      const error = validateField(field, formData[field]);
      newErrors[field] = error;
      if (error) isValid = false;
    });

    setErrors(newErrors);
    return isValid;
  };
 
  const handleNext = () => {
    if (!validateForm()) {
      return;
    }

    const email = route?.params?.email || route?.params?.data?.email;
    if (!email) {
      Alert.alert('Error', 'Email is required');
      return;
    }

    setLoading(true)
    const data = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      phone: formData.phoneNumber ? formData.phoneCountryCode + formData.phoneNumber.replace(/[^0-9]/g, '') : "",
      password: formData.password,
      email: email,
      gender: formData.gender,
      age: Number(formData.age),
    }

    const endPoint  = route?.params?.action == 'signup' ? 'users/account-details' : '/auth/signup/account-details'
  
    Post({endpoint: endPoint, data: data}).then(async(res) => {
      console.log('res', res)
      setLoading(false)
      dispatch(setUser(res?.data))
      const token = res?.data?.token
      await setUserToken(token)
      
     
      const params ={
        ...res?.data,
      }
     
      navigation.navigate('UserPreferences', params)

    }).catch((err) => {
      setLoading(false)
      Alert.alert("ERROR",err.message)

      Alert.alert('Error', err?.response?.data?.message)

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
            Enter some of your information & secure password{'\n'}to go next step!
          </Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          {/* First Name */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>First name</Text>
            <TextInput
              style={[styles.input, errors.firstName && styles.inputError]}
              value={formData.firstName}
              onChangeText={(value) => handleInputChange('firstName', value)}
              placeholder="John"
              placeholderTextColor="#97a3b4"
            />
            {errors.firstName ? <Text style={styles.errorText}>{errors.firstName}</Text> : null}
          </View>

          {/* Last Name */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Last name</Text>
            <TextInput
              style={[styles.input, errors.lastName && styles.inputError]}
              value={formData.lastName}
              onChangeText={(value) => handleInputChange('lastName', value)}
              placeholder="David"
              placeholderTextColor="#97a3b4"
            />
            {errors.lastName ? <Text style={styles.errorText}>{errors.lastName}</Text> : null}
          </View>

          {/* Phone Number */}
          <View style={styles.inputGroup}>
            {/* <PhoneNumberInput
            value={formData.phoneNumber}
            onChangeText={(value) => handleInputChange('phoneNumber', value)}
            /> */}
              <PhoneNumInput
                value={formData.phoneNumber}
                onChangeText={(value) => handleInputChange('phoneNumber', value)}
                onChangeFormattedText={(formattedText) => handleInputChange('phoneNumber', formattedText)}
                onChangeCountry={(country) => handleInputChange('phoneCountryCode', '+' + country.callingCode)}
                placeholder="Enter phone number"
                defaultCountry="FR"
              />
            {errors.phoneNumber ? <Text style={styles.errorText}>{errors.phoneNumber}</Text> : null}
          </View>

          {/* Password */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={[styles.input, styles.passwordInput, errors.password && styles.inputError]}
                value={formData.password}
                onChangeText={(value) => handleInputChange('password', value)}
                placeholder="8+ characters"
                placeholderTextColor="#97a3b4"
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                style={styles.eyeButton}
                onPress={() => setShowPassword(!showPassword)}
              >
                <EyeIcon width={24} height={24} />
              </TouchableOpacity>
            </View>
            {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
          </View>

          {/* Confirm Password */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Confirm Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={[styles.input, styles.passwordInput, errors.confirmPassword && styles.inputError]}
                value={formData.confirmPassword}
                onChangeText={(value) => handleInputChange('confirmPassword', value)}
                placeholder="8+ characters"
                placeholderTextColor="#97a3b4"
                secureTextEntry={!showConfirmPassword}
              />
              <TouchableOpacity
                style={styles.eyeButton}
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <EyeIcon width={24} height={24} />
              </TouchableOpacity>
            </View>
            {errors.confirmPassword ? <Text style={styles.errorText}>{errors.confirmPassword}</Text> : null}
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Age</Text>
            <TextInput
              style={[styles.input, errors.firstName && styles.inputError]}
              value={formData.age}
              onChangeText={(value) => handleInputChange('age', value)}
              placeholder="Enter your age"
              placeholderTextColor="#97a3b4"
              keyboardType='number-pad'
            />
            {errors?.age ? <Text style={styles.errorText}>{errors?.age}</Text> : null}
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
            {errors.gender ? <Text style={styles.errorText}>{errors.gender}</Text> : null}
          </View>

          {/* Age
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Age</Text>
            <View style={styles.ageGroup}>
              <RadioButton
                selected={formData.age === '13'}
                onPress={() => handleInputChange('age', '13')}
                label="13"
              />
              <RadioButton
                selected={formData.age === '14'}
                onPress={() => handleInputChange('age', '14')}
                label="14"
              />
              <RadioButton
                selected={formData.age === '18'}
                onPress={() => handleInputChange('age', '18')}
                label="18"
              />
            </View>
            {errors.age ? <Text style={styles.errorText}>{errors.age}</Text> : null}
          </View> */}

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
        <Spacing type="v" val={Platform.OS=='android' ? 50:10} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    ...Style.font14,
    ...Style.bold,
    ...Style.textPrimary,
    marginBottom: 12,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#cdd7e5',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    color: '#000',
  },
  inputError: {
    borderColor: '#ef4444',
    // backgroundColor: '#fef2f2',
  },
  errorText: {
    color: '#ef4444',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
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