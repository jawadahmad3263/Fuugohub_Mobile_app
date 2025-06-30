/**
 * Login Screen
 * User authentication login screen
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import CustomTextInput from '../../components/forms/TextInput';
import PrimaryButton from '../../components/common/PrimaryButton';
import { Color } from 'react-native/types_generated/Libraries/Animated/AnimatedExports';
import COLORS from '../../style/colors';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('demo@minimals.cc');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        {/* Logo and Title */}
        <Image source={require('../../assets/images/login-logo.png')} style={styles.logo} resizeMode="contain" />
        

        {/* Headings */}
        <Text style={styles.heading}>Sign in to your account</Text>
        <Text style={styles.subtext}>
          Sign in to explore short videos, grow your audience, and run your own shop — all from one powerful platform.
        </Text>

        {/* Form */}
        <View style={styles.form}>
          <CustomTextInput
            label="Email address"
            value={email}
            onChangeText={setEmail}
            placeholder="Email address"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <CustomTextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            placeholder="6+ characters"
            secureTextEntry
          />
          <TouchableOpacity style={styles.forgotPassword} onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={styles.forgotPasswordText}>Forgot password?</Text>
          </TouchableOpacity>
          <PrimaryButton
            title="Sign in"
            onPress={() => {}}
            style={styles.signInButton}
            textStyle={styles.signInButtonText}
          />
        </View>

        {/* Divider and Social */}
        <View style={styles.dividerRow}>
          <View style={styles.divider} />
          <Text style={styles.orText}>OR</Text>
          <View style={styles.divider} />
        </View>
        <View style={styles.socialRow}>
          <TouchableOpacity>
            <Image source={require('../../assets/images/google-icon.png')} style={styles.socialIcon} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={require('../../assets/images/facebook-icon.png')} style={styles.socialIcon} />
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Continue as a <Text style={styles.guestText}>Guest</Text>
          </Text>
          <Text style={styles.footerText}>
            Don't have an account?{' '}
            <Text style={styles.signupText} onPress={() => navigation.navigate('Register')}>Sign Up</Text>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  logo: {
    width: 192,
    height: 44.5,
    marginTop: 12,
    marginBottom: 8,
  },
  brand: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 18,
    letterSpacing: 0.5,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222',
    textAlign: 'center',
    marginBottom: 8,
    marginTop: 8,
  },
  subtext: {
    fontSize: 16,
    color: '#7a869a',
    textAlign: 'center',
    marginBottom: 28,
    lineHeight: 22,
  },
  form: {
    width: '100%',
    marginBottom: 18,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 18,
  },
  forgotPasswordText: {
    color: COLORS.textPrimary,
    fontWeight: '400',
    fontSize: 15,
  },
  signInButton: {
    marginTop: 0,
    marginBottom: 10,
    width: '100%',
  },
  signInButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginVertical: 18,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#e5eaf2',
  },
  orText: {
    marginHorizontal: 12,
    color: '#7a869a',
    fontWeight: 'bold',
    fontSize: 15,
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 30,
  },
  socialIcon: {
    width: 36,
    height: 36,
    marginHorizontal: 12,
  },
  footer: {
    alignItems: 'center',
    marginTop: 18,
  },
  footerText: {
    color: '#7a869a',
    fontSize: 16,
    marginBottom: 4,
  },
  guestText: {
    color: '#f25b7c',
    fontWeight: 'bold',
  },
  signupText: {
    color: '#f25b7c',
    fontWeight: 'bold',
  },
});

export default LoginScreen; 