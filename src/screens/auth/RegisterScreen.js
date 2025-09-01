/**
 * Register Screen
 * User registration screen
 */

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
} from "react-native";
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import CustomTextInput from "../../components/forms/TextInput";
import PrimaryButton from "../../components/common/PrimaryButton";
import { Color } from "react-native/types_generated/Libraries/Animated/AnimatedExports";
import COLORS from "../../style/colors";
import Style from "../../style/Style";
import Spacing from "../../components/common/Spacing";
import { Post } from "../../services/api";
import { setVerificationToken, validateEmail } from "../../utils/common";

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')



const handleStart = async () => {

  
if(!validateEmail(email)){
  setError('Please enter a valid email')
  return
}
  const data = {
    email: email,
  }
  setLoading(true)
  Post({endpoint: 'auth/signup/email', data: data}).then(async(res) => {
    console.log(res)
    setLoading(false)
    if(res?.data?.verificationToken){
     await setVerificationToken(res?.data?.verificationToken)
      navigation.navigate('OtpVerification', {email: email, verificationToken: res?.data?.verificationToken})
    }else{
      Alert.alert( 'Error', res?.message)
    }
    // navigation.navigate('AccountDetails')
  }).catch((err) => {
    Alert.alert( 'Error', err.message)
    console.log(err)
    setLoading(false)
  })  
}

const handleGoogleSignup = async () => {
  try {
    setLoading(true);
    
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices();
    
    // Sign in
    const userInfo = await GoogleSignin.signIn();
    
    console.log('Google Sign-Up Success:', userInfo);
    
    // Extract user data
    const { user, idToken } = userInfo;
    
    // Send the ID token to your backend for registration
    const data = {
      googleIdToken: idToken,
      email: user.email,
      name: user.name,
      photo: user.photo,
    };
    
    // Call your backend API with Google credentials for registration
    Post({endpoint: '/auth/google-signup', data: data})
      .then(async(res) => {
        console.log('Google Signup Response:', JSON.stringify(res));
        
        if (res?.data?.verificationToken) {
          await setVerificationToken(res?.data?.verificationToken);
          navigation.navigate('OtpVerification', {
            email: user.email, 
            verificationToken: res?.data?.verificationToken
          });
        } else if (res?.data?.token) {
          // If user is already registered, navigate to main
          navigation.navigate('Main');
        } else {
          Alert.alert('Error', res?.message || 'Google signup failed');
        }
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        Alert.alert('Error', err?.response?.data?.message || 'Google signup failed');
        console.log('Google Signup Error:', JSON.stringify(err));
      });
      
  } catch (error) {
    setLoading(false);
    console.log('Google Sign-In Error:', error);
    
    if (error.code === 'SIGN_IN_CANCELLED') {
      Alert.alert('Sign In Cancelled', 'You cancelled the sign in process');
    } else if (error.code === 'PLAY_SERVICES_NOT_AVAILABLE') {
      Alert.alert('Error', 'Google Play Services not available');
    } else {
      Alert.alert('Error', 'Google sign in failed. Please try again.');
    }
  }
};
  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <ScrollView
            contentContainerStyle={styles.container}
            keyboardShouldPersistTaps="handled"
          >
            {/* Logo and Title */}
            <Image
              source={require("../../assets/images/login-logo.png")}
              style={styles.logo}
              resizeMode="contain"
            />

            <Spacing type="v" val={10} />
            {/* Headings */}
            <Text
              style={[
                Style.font18,
                Style.textPrimary,
                Style.textCenter,
                Style.bold,
              ]}
            >
              Let’s Go! Join with our platform
            </Text>
            <Spacing type="v" val={10} />
            <Text style={[Style.font12, Style.textSecondary, Style.textCenter]}>
              Enter your valid email address and complete some easy steps for
              register your account
            </Text>
            <Spacing type="v" val={30} />
            {/* Form */}
            <View style={styles.form}>
              <CustomTextInput
                label="Email address"
                value={email}
                onChangeText={setEmail}
                placeholder="Email address"
                keyboardType="email-address"
                autoCapitalize="none"
                error={error}
              />
              {/* <CustomTextInput
                label="Password"
                value={password}
                onChangeText={setPassword}
                placeholder="6+ characters"
                secureTextEntry
              />
              <CustomTextInput
                label="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Confirm Password"
                secureTextEntry
              /> */}
              <Spacing type="v" val={10} />
              <PrimaryButton
                title="Continue"
                onPress={handleStart}
                style={styles.signInButton}
                textStyle={styles.signInButtonText}
                loading={loading}
              />
            </View>
            <Spacing type="v" val={10} />
          
            <Text style={[Style.font12, Style.textSecondary]}>
            <Text style={[Style.font12, Style.textSecondary, Style.bold]}>
              Disclaimer:
            </Text> By continuing you agree to Fuugohub's terms of service and confirm you have read Fuugohub's Privacy policy.
            </Text>
            <Spacing type="v" val={10} />
            {/* Divider and Social */}
            <View style={styles.dividerRow}>
              <View style={styles.divider} />
              <Text style={styles.orText}>OR</Text>
              <View style={styles.divider} />
            </View>
            <Spacing type="v" val={20} />
            <View style={styles.socialRow}>
              <TouchableOpacity onPress={handleGoogleSignup}>
                <Image
                  source={require("../../assets/images/google-icon.png")}
                  style={styles.socialIcon}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image
                  source={require("../../assets/images/facebook-icon.png")}
                  style={styles.socialIcon}
                />
              </TouchableOpacity>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>
                Continue as a <Text style={styles.guestText}>Guest</Text>
              </Text>
              <Text style={styles.footerText}>
              Already have an account?{" "}
                <Text
                  style={styles.signupText}
                  onPress={() => navigation.navigate("Login")}
                >
                  Sign In
                </Text>
              </Text>
            </View>
            <Spacing type="v" val={ Platform.OS === "android" ? 100 : 20} />
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flexGrow: 1,
    alignItems: "center",
    padding: 24,
    backgroundColor: "#fff",
  },
  logo: {
    width: 192,
    height: 44.5,
    marginTop: 12,
    marginBottom: 8,
  },
  brand: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 18,
    letterSpacing: 0.5,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#222",
    textAlign: "center",
    marginBottom: 8,
    marginTop: 8,
  },
  subtext: {
    fontSize: 12,
    color: COLORS.textSecondary,
    textAlign: "center",
    marginBottom: 28,
    lineHeight: 22,
  },
  form: {
    width: "100%",
    marginBottom: 18,
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: 18,
  },
  forgotPasswordText: {
    color: COLORS.textPrimary,
    fontWeight: "400",
    fontSize: 15,
  },
  signInButton: {
    marginTop: 0,
    marginBottom: 10,
    width: "100%",
  },
  signInButtonText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginVertical: 18,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#e5eaf2",
  },
  orText: {
    marginHorizontal: 12,
    color: "#7a869a",
    fontWeight: "bold",
    fontSize: 15,
  },
  socialRow: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    marginBottom: 30,
  },
  socialIcon: {
    width: 36,
    height: 36,
    marginHorizontal: 12,
  },
  footer: {
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: 18,
    flex: 1,
    // backgroundColor: 'red',
  },
  footerText: {
    color: COLORS.textSecondary,
    fontSize: 16,
    marginBottom: 4,
  },
  guestText: {
    color: COLORS.textOrange,
    fontWeight: "bold",
  },
  signupText: {
    color: COLORS.textOrange,
    fontWeight: "bold",
  },
});

export default RegisterScreen;
