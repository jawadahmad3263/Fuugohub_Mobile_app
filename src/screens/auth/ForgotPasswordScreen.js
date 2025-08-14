/**
 * Forgot Password Screen
 * Password reset screen
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
import { AUTH_SCREENS } from "../../navigation/screens";
import { validateEmail } from "../../utils/common";

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('')
  const handleResetPassword = () => {
    if (!validateEmail(email)) {
      setError("Please enter your email address");
      Alert.alert("Error", "Please enter your email address");
      return;
    }

    // TODO: Implement password reset logic

    const body = {
      email: email,
    };

   
    setLoading(true);
    setError('')
      Post({endpoint: 'auth/forgot-password', data: body})
      .then((res) => {
        const params = {
          ...res?.data,
          email: email,
        };
        setLoading(false);
        navigation.navigate(AUTH_SCREENS.RESET_PASSWORD_OTP.name, params);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        Alert.alert("Error", err?.message);
      });
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
              We'll send you an email with a link to reset the password to your
              account
            </Text>
            <Spacing type="v" val={30} />
            {/* Form */}
            <View style={styles.form}>
              <CustomTextInput
                label="Email"
                value={email}
                onChangeText={setEmail}
                placeholder="demo@minimals.cc"
                keyboardType="email-address"
                autoCapitalize="none"
                error={error}
              />
              <PrimaryButton
                title="Get Code"
                onPress={handleResetPassword}
                style={styles.resetButton}
                textStyle={styles.resetButtonText}
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
  form: {
    width: "100%",
    marginBottom: 18,
  },
  resetButton: {
    marginTop: 0,
    marginBottom: 10,
    width: "100%",
  },
  resetButtonText: {
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

export default ForgotPasswordScreen;
