/**
 * Google Authentication Constants
 * Client IDs for Google Sign-In configuration
 */

export const GOOGLE_AUTH_CONFIG = {
  // Android Client ID for Google Sign-In
  ANDROID_CLIENT_ID: '15954964870-k9tlsq4sc2l3kafg1q2q2s1a4obt6k94.apps.googleusercontent.com',
  
  // iOS Client ID for Google Sign-In
  IOS_CLIENT_ID: '15954964870-1b0np8rkeae6d99ddg15np56283qg115.apps.googleusercontent.com',
  
  // Web Client ID for Google Sign-In (if needed for backend verification)
  WEB_CLIENT_ID: '15954964870-k9tlsq4sc2l3kafg1q2q2s1a4obt6k94.apps.googleusercontent.com',
};

// SHA1 Certificate Fingerprints
export const SHA1_FINGERPRINTS = {
  // Debug build SHA1 fingerprint
  DEBUG: '5E:8F:16:06:2E:A3:CD:2C:4A:0D:54:78:76:BA:A6:F3:8C:AB:F6:25',
  
  // Release build SHA1 fingerprint (to be added when ready for production)
  RELEASE: '', // Add your release SHA1 here when ready
};

// Package name for Google Cloud Console configuration
export const PACKAGE_NAME = 'com.fuugohub';
