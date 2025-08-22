/**
 * Reset Password Screen
 * Password reset screen with new password fields
 */

import React, { useState } from "react";
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
import COLORS from "../../style/colors";
import Style from "../../style/Style";
import Spacing from "../../components/common/Spacing";
import { Patch, Post } from "../../services/api";
import { useNavigation, useRoute } from "@react-navigation/native";
import { all } from "axios";

const ResetPasswordScreen = ({ }) => {

    const navigation= useNavigation()
  const [password, setPassword] = useState("");
  const route = useRoute()
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
 
  const handleChangePassword = () => {
    if (!password) {
      setError("Please enter a password");
      Alert.alert("Error", "Please enter a password");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      Alert.alert("Error", "Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    // TODO: Implement password change logic
    console.log('Password change attempt:', { password, confirmPassword });
    setLoading(true);
    
    // Simulate API call
    const data  ={
        passwordResetToken: route?.params?.verificationToken || route?.params?.passwordResetToken,
        password: password
    }
   
    Patch({endpoint: 'auth/reset-password', data: data})
    .then((res)=>{
      console.log('RES', JSON.stringify(res))
      setLoading(false)
      Alert.alert('Success', 'Password changed successfully!', [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Login'),
        },
      ])
    })
    .catch((err)=>{
        setLoading(false)
        Alert.alert("ERROR",err.response?.data?.message)
        Alert.alert(JSON.stringify(route?.params))
      console.log('ERR', JSON.stringify(err))
    })
 
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
              Reset Password
            </Text>
            <Spacing type="v" val={10} />
            <Text style={[Style.font12, Style.textSecondary, Style.textCenter]}>
              Create a strong new password to secure your FuugoHub account
            </Text>
            <Spacing type="v" val={30} />
            {/* Form */}
            <View style={styles.form}>
              <CustomTextInput
                label="Password"
                value={password}
                onChangeText={setPassword}
                placeholder="8+ characters"
                secureTextEntry={!showPassword}
                rightIcon={showPassword ? "eye-off" : "eye"}
                onRightIconPress={() => setShowPassword(!showPassword)}
                error={error}
              />
              <CustomTextInput
                label="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="8+ characters"
                secureTextEntry={!showConfirmPassword}
                rightIcon={showConfirmPassword ? "eye-off" : "eye"}
                onRightIconPress={() => setShowConfirmPassword(!showConfirmPassword)}
                error={error}
              />
              <PrimaryButton
                title="Change Password"
                onPress={handleChangePassword}
                style={styles.changePasswordButton}
                textStyle={styles.changePasswordButtonText}
                loading={loading}
              />
            </View>

            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>
                Remembered your password?{" "}
                <Text
                  style={styles.signInText}
                  onPress={() => navigation.navigate("Login")}
                >
                  Sign In
                </Text>
              </Text>
            </View>
            <Spacing type="v" val={ Platform.OS === "android" ? 50 : 20} />

          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  container: {
    flexGrow: 1,
    alignItems: "center",
    padding: 24,
    backgroundColor: COLORS.white,
  },
  logo: {
    width: 192,
    height: 44.5,
    marginTop: 12,
    marginBottom: 8,
  },
  form: {
    width: "100%",
    marginBottom: 18,
  },
  changePasswordButton: {
    marginTop: 0,
    marginBottom: 10,
    width: "100%",
  },
  changePasswordButtonText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  footer: {
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: 18,
    flex: 1,
  },
  footerText: {
    color: COLORS.textSecondary,
    fontSize: 16,
    marginBottom: 4,
  },
  signInText: {
    color: COLORS.textOrange,
    fontWeight: "bold",
  },
});

export default ResetPasswordScreen;