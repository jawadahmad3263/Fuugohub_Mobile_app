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
import CustomTextInput from "../../components/forms/TextInput";
import PrimaryButton from "../../components/common/PrimaryButton";
import { Color } from "react-native/types_generated/Libraries/Animated/AnimatedExports";
import COLORS from "../../style/colors";
import Style from "../../style/Style";
import Spacing from "../../components/common/Spacing";
import { getUserToken, getVerificationToken, setUserToken } from "../../utils/common";
import { useFocusEffect } from "@react-navigation/native";
import { Post } from "../../services/api";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/slices/userSlice";
const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false)
  const[erros,setErros] = useState({
    email: '',
    password: '',
  })


  const dispatch = useDispatch()

  useFocusEffect(
    React.useCallback(() => {
      userToken()
    
    }, [])
  );

 
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
    if(!email){
      setErros({...erros, email: 'Please enter your email'})
      return
    }
    if(!password){
      setErros({...erros, password: 'Please enter your password'})
      return
    }
    if(erros.email || erros.password){
      Alert.alert('Error', 'Please enter your email and password')
      return
    }
    const data = {
      email: email,
      password: password,
    }
    setLoading(true)
    setErros({
      email: '',
      password: '',
    })
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
    })
  }

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
                onChangeText={setEmail}
                placeholder="Email address"
                keyboardType="email-address"
                autoCapitalize="none"
                error={erros.email}
              />
              <CustomTextInput
                label="Password"
                value={password}
                onChangeText={setPassword}
                placeholder="6+ characters"
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
              <TouchableOpacity>
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
                Don't have an account?{" "}
                <Text
                  style={styles.signupText}
                  onPress={() => navigation.navigate("Register")}
                >
                  Sign Up
                </Text>
              </Text>
            </View>
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

export default LoginScreen;
