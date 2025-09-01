/**
 * Login Screen
 * User authentication login screen
 */

import React, { useEffect, useState} from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import FacebookAuthService from "../../services/facebookAuthService";
import CustomTextInput from "../../components/forms/TextInput";
import PrimaryButton from "../../components/common/PrimaryButton";
import { Color } from "react-native/types_generated/Libraries/Animated/AnimatedExports";
import COLORS from "../../style/colors";
import Style from "../../style/Style";
import Spacing from "../../components/common/Spacing";
import { getUserToken, getVerificationToken, setUserToken } from "../../utils/common";

import { Post } from "../../services/api";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/slices/userSlice";
import AppleAuthService from "../../services/appleAuthService";
const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false)
  const[erros,setErros] = useState({
    email: '',
    password: '',
  })


  const dispatch = useDispatch()



 
  const userToken = async () => {
    const token = await getUserToken()
    const verificationToken = await getVerificationToken()
    if(token){
      navigation.navigate('Main')
    }else if(verificationToken) {
      navigation.navigate('OtpVerification', {verificationToken: verificationToken})
    }else{
      navigation.navigate('Login')
    }
  }

  const handleLogin = () => {
    // Clear any existing errors first
    setErros({
      email: '',
      password: '',
    });

    // Check for empty fields and set specific errors
    let hasErrors = false;
    if(!email.trim()){
      setErros(prev => ({...prev, email: 'Please enter your email'}));
      hasErrors = true;
    }
    if(!password.trim()){
      setErros(prev => ({...prev, password: 'Please enter your password'}));
      hasErrors = true;
    }

    // If there are any field errors, don't proceed
    if(hasErrors){
      return;
    }

    const data = {
      email: email.trim(),
      password: password,
    }
    
    setLoading(true);
    
    Post({endpoint: '/auth/login', data: data})
    .then(async(res) => {
      console.log('RES', JSON.stringify(res))
      dispatch(setUser(res?.data))
      const token = res?.data?.token
      await setUserToken(token)
      setLoading(false)
     
      navigation.navigate('Main')
    })
    .catch((err) => {
      setLoading(false)
      Alert.alert('Error', err?.response?.data?.message)
      console.log('ERR', JSON.stringify(err))
    }).finally(() => {
      setLoading(false)
    })
  }

  const handleGoogleLogin = async () => {
    if(loading) return;
    try {
      setLoading(true);
      
      // Check if your device supports Google Play
      await GoogleSignin.hasPlayServices();
      
      // Sign in
      const userInfo = await GoogleSignin.signIn();

      const user = userInfo?.data?.user
      
      console.log('Google Sign-In Success:', userInfo);
      console.log('user', user)
      const { accessToken, idToken } = await GoogleSignin.getTokens()
      // Extract user data
      // const { user, idToken } = userInfo?.data;
      // const idToken = userInfo?.data?.idToken;
      console.log('idToken', idToken)
      console.log('accessToken', accessToken)
      // Send the ID token to your backend for verification
      const data = {
     
        access_token: accessToken,
      };
      
      // Call your backend API with Google credentials
      Post({endpoint: 'auth/google', data: data})
        .then(async(res) => {
          console.log('Google Login Response:', JSON.stringify(res));
          
          const token = res?.data?.token;
          await setUserToken(token);
          setLoading(false);
          if(res?.data?.action =='signup'){
            navigation.navigate('AccountDetails',{
              email:user?.email,
              firstName:user?.givenName,
              lastName:user?.familyName,
              action:res?.data?.action
            });
            return
          }
          navigation.navigate('Splash');
        })
        .catch((err) => {
          setLoading(false);
          Alert.alert('Error', err?.response?.data?.message || 'Google login failed');
          console.log('Google Login Error:', JSON.stringify(err));
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

  const handleAppleLogin = async () => {
    if(loading) return;
    
    try {
      setLoading(true);
      
      // Perform Apple Sign-In
      const result = await AppleAuthService.signIn();
      
      if (!result.success) {
        setLoading(false);
        if (result.code === 'CANCELLED') {
          // User cancelled, no need to show error
          return;
        }
        Alert.alert('Apple Sign-In Error', "Try Again");
        return;
      }

      const { identityToken, email, firstName, lastName, user } = result.data;
      
      console.log('Apple Sign-In Success:', result.data);
       
    
      // Send the identity token to your backend for verification
      const data = {
        identityToken: identityToken,
       
      };
      
      // Call your backend API with Apple credentials
      Post({endpoint: 'auth/apple', data: data})
        .then(async(res) => {
          console.log('Apple Login Response:', JSON.stringify(res));
          
          const token = res?.data?.token;
          await setUserToken(token);
          setLoading(false);
          
          if(res?.data?.action == 'signup'){
            navigation.navigate('AccountDetails',{
              email: email,
              firstName: firstName,
              lastName: lastName,
              action: res?.data?.action
            });
            return;
          }
          
          navigation.navigate('Splash');
        })
        .catch((err) => {
          setLoading(false);
          Alert.alert('Try Again please', err?.response?.data?.message || 'Apple login failed');
          console.log('Apple Login Error:', JSON.stringify(err));
        });
        
    } catch (error) {
      setLoading(false);
      console.log('Apple Sign-In Error:', error);
      Alert.alert('Error', 'Apple sign in failed. Please try again.');
    }
  };

  const handleFacebookLogin = async () => {
    if (loading) return;
    try {
      setLoading(true);
      const result = await FacebookAuthService.signIn();
      if (!result.success) {
        setLoading(false);
        if (result.code === 'CANCELLED') return;
        Alert.alert('Facebook Sign-In Error', 'Try again');
        return;
      }
      const { accessToken, firstName, lastName } = result.data;
      const data = { access_token: accessToken };
      Post({ endpoint: 'auth/facebook', data })
        .then(async (res) => {
          const token = res?.data?.token;
          await setUserToken(token);
          setLoading(false);
          if (res?.data?.action == 'signup') {
            navigation.navigate('AccountDetails', {
              email: undefined,
              firstName: firstName,
              lastName: lastName,
              action: res?.data?.action,
            });
            return;
          }
          navigation.navigate('Splash');
        })
        .catch((err) => {
          setLoading(false);
          Alert.alert('Error', err?.response?.data?.message || 'Facebook login failed');
        });
    } catch (error) {
      setLoading(false);
      Alert.alert('Error', 'Facebook sign in failed. Please try again.');
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
            <Spacing type="v" val={Platform.OS === "ios" ? 10 : 50} />

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
              Sign in to your account
            </Text>
            <Spacing type="v" val={10} />
            <Text style={[Style.font12, Style.textSecondary, Style.textCenter]}>
              Sign in to explore short videos, grow your audience, and run your
              own shop — all from one powerful platform.
            </Text>
            <Spacing type="v" val={30} />
            {/* Form */}
            <View style={styles.form}>
              <CustomTextInput
                label="Email address"
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  if (erros.email) {
                    setErros({...erros, email: ''});
                  }
                }}
                placeholder="Email address"
                keyboardType="email-address"
                autoCapitalize="none"
                error={erros.email}
              />
              <CustomTextInput
                label="Password"
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  if (erros.password) {
                    setErros({...erros, password: ''});
                  }
                }}
                placeholder="8+ characters"
                secureTextEntry
                error={erros.password}
              />
              <TouchableOpacity
                style={styles.forgotPassword}
                onPress={() => navigation.navigate("ForgotPassword")}
              >
                <Text style={styles.forgotPasswordText}>Forgot password?</Text>
              </TouchableOpacity>
              <PrimaryButton
                title="Sign in"
                onPress={() => handleLogin()}
                style={styles.signInButton}
                textStyle={styles.signInButtonText}
                loading={loading}
              />
            </View>

            {/* Divider and Social */}
            <View style={styles.dividerRow}>
              <View style={styles.divider} />
              <Text style={styles.orText}>OR</Text>
              <View style={styles.divider} />
            </View>
            <Spacing type="v" val={20} />
            <View style={styles.socialRow}>
              <TouchableOpacity onPress={handleGoogleLogin}>
                <Image
                  source={require("../../assets/images/google-icon.png")}
                  style={styles.socialIcon}
                />
              </TouchableOpacity>
              {Platform.OS === 'ios' && (
                <TouchableOpacity onPress={handleAppleLogin}>
                  <Image
                    source={require("../../assets/images/apple.png")}
                    style={[styles.socialIcon,{
                      height:25,
                      width:25,
                      transform:[{translateY: 5}]
                    }]}
                  />
                </TouchableOpacity>
              )}
              <TouchableOpacity onPress={handleFacebookLogin}>
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
                Don't have an account?{" "}
                <Text
                  style={styles.signupText}
                  onPress={() => navigation.navigate("Register")}
                >
                  Sign Up
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
    // marginBottom:10
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

export default LoginScreen;
