/**
 * Fuugohub Mobile App
 * Main Application Entry Point
 */

import React, { useEffect } from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { Provider } from 'react-redux';
import Toast from 'react-native-toast-message';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import FacebookAuthService from './src/services/facebookAuthService';
import { store } from './src/store';
import AppNavigator from './src/navigation/AppNavigator';
import { GOOGLE_AUTH_CONFIG } from './src/constants';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    // Configure Google Sign-In globally
    GoogleSignin.configure({
      iosClientId: GOOGLE_AUTH_CONFIG.IOS_CLIENT_ID,
      webClientId: GOOGLE_AUTH_CONFIG.WEB_CLIENT_ID,
      offlineAccess: true,
      forceCodeForRefreshToken: true,
    });

    // Configure Facebook SDK
    FacebookAuthService.configure();
  }, []);

  return (
    <Provider store={store}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppNavigator />
      <Toast />
    </Provider>
  );
}

export default App; 