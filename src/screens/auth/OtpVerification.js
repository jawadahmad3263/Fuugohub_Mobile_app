import React, { useState, useRef } from "react";
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
  TextInput,
  Alert,
} from "react-native";
import PrimaryButton from "../../components/common/PrimaryButton";
import Spacing from "../../components/common/Spacing";
import COLORS from "../../style/colors";
import Style from "../../style/Style";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import {
  removeVerificationToken,
  setVerificationToken,
} from "../../utils/common";
import { Post } from "../../services/api";

const OtpVerification = ({ navigation }) => {

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const route = useRoute();
  const [verifyToken, setVerifyToken] = useState(
    route?.params?.verificationToken || ""
  );
  const [loading, setLoading] = useState(false)
  
  const [email, setEmail] = useState(route?.params?.email || "");

  useFocusEffect(
    React.useCallback(() => {
      handleRouteParams();
    }, [route?.params])
  );

  const handleRouteParams = () => {
    setEmail(route?.params?.email || "");
    setVerifyToken(route?.params?.verificationToken || "");
  
  };
  const handleOtpChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Auto-focus next input
    if (text && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e, index) => {
    // Handle backspace
    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const otpString = otp.join("");
    if (otpString.length === 6) {
      // Handle OTP verification logic here
      setLoading(true)
      console.log("Verifying OTP:", otpString);
  
      const data = {
        verificationToken: verifyToken,
        type: "email_signup",
        otp: otpString,
      };

      Post({ endpoint: "auth/verify-otp", data: data })
        .then(async (res) => {
          console.log("RES", JSON.stringify(res));
          await removeVerificationToken();
          navigation.navigate("AccountDetails", {
            data: res?.data,
            email: email,
          });
          setLoading(false)
        })
        .catch((err) => {
          Alert.alert("Error", err?.message);
          console.log(err);
          setLoading(false)
        });
    }else{
        Alert.alert("Error", "Please enter a valid OTP")
    }
  };

  const handleResendCode = () => {
    // Handle resend code logic here
    if(!verifyToken){
        return
    }
    const data = {
      verificationToken: verifyToken,
    };

    Post({ endpoint: "auth/resend-otp", data: data })
      .then((res) => {
        console.log("RES", JSON.stringify(res));
        setVerifyToken(res?.data?.verificationToken);
        setVerificationToken(res?.data?.verificationToken);
      })
      .catch((err) => {
        Alert.alert("Error", err?.message);
        console.log(err);
      });
  };

  const handleSignIn = () => {
    navigation.navigate("Login");
  };
  const isRestPassword = false;

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
            {/* Logo and Brand */}
            <Spacing type="v" val={Platform.OS === "ios" ? 10 : 50} />
            <Image
              source={require("../../assets/images/login-logo.png")}
              style={styles.logo}
              resizeMode="contain"
            />

            {isRestPassword && (
              <>
                <Spacing type="v" val={30} />

                <Text
                  style={[
                    Style.font24,
                    Style.textPrimary,
                    Style.textCenter,
                    Style.bold,
                  ]}
                >
                  Reset Password
                </Text>
              </>
            )}

            <Spacing type="v" val={16} />

            {/* Instructions */}
            <Text style={[Style.font14, Style.textSecondary, Style.textCenter]}>
              Please check you Email{" "}
              <Text style={styles.emailText}>{email}</Text>
            </Text>
            <Text style={[Style.font14, Style.textSecondary, Style.textCenter]}>
              and put the verification code here
            </Text>

            <Spacing type="v" val={32} />

            {/* OTP Input Fields */}
            <View style={styles.otpContainer}>
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={(ref) => (inputRefs.current[index] = ref)}
                  style={[
                    styles.otpInput,
                    digit ? styles.otpInputFilled : styles.otpInputEmpty,
                  ]}
                  value={digit}
                  onChangeText={(text) => handleOtpChange(text, index)}
                  onKeyPress={(e) => handleKeyPress(e, index)}
                  keyboardType="numeric"
                  maxLength={1}
                  textAlign="center"
                  selectionColor={COLORS.textOrange}
                />
              ))}
            </View>

            <Spacing type="v" val={32} />

            {/* Verify Button */}
            <PrimaryButton
              title="Verify"
              onPress={handleVerify}
              style={styles.verifyButton}
              textStyle={styles.verifyButtonText}
              loading={loading}
            />

            <Spacing type="v" val={24} />

            {/* Resend Code Link */}
            <View style={styles.linkContainer}>
              <Text style={[Style.font14, Style.textSecondary]}>
                Don't have code?{" "}
                <Text style={styles.linkText} onPress={handleResendCode}>
                  Resend code
                </Text>
              </Text>
            </View>

            <Spacing type="v" val={16} />

            {/* Sign In Link */}
            {isRestPassword && (
              <>
                <View style={styles.linkContainer}>
                  <Text style={[Style.font14, Style.textSecondary]}>
                    Remembered your password?{" "}
                    <Text style={styles.linkText} onPress={handleSignIn}>
                      Sign In
                    </Text>
                  </Text>
                </View>
              </>
            )}
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
  },
  emailText: {
    color: COLORS.textPrimary,
    fontWeight: "500",
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
  },
  otpInput: {
    width: 48,
    height: 48,
    borderRadius: 8,
    fontSize: 20,
    fontWeight: "bold",
    borderWidth: 1,
  },
  otpInputFilled: {
    borderColor: COLORS.textOrange,
    backgroundColor: COLORS.white,
    color: COLORS.textPrimary,
  },
  otpInputEmpty: {
    borderColor: COLORS.border,
    backgroundColor: COLORS.white,
    color: COLORS.textSecondary,
  },
  verifyButton: {
    marginTop: 0,
    marginBottom: 10,
    width: "100%",
  },
  verifyButtonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  linkContainer: {
    alignItems: "center",
  },
  linkText: {
    color: COLORS.textOrange,
    fontWeight: "bold",
  },
});

export default OtpVerification;
