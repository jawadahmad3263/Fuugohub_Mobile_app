/**
 * Google Authentication Constants
 * Client IDs for Google Sign-In configuration
 */

export const GOOGLE_AUTH_CONFIG = {
  // Android Client ID for Google Sign-In
  ANDROID_CLIENT_ID:
    "974118414647-b2a1o4bj7ip1pvtau8st76a31t24lue5.apps.googleusercontent.com",

  IOS_CLIENT_ID:
    "974118414647-dqs27iln8kamq4kdhp1gevbvjrlndfrr.apps.googleusercontent.com",

  // Web Client ID for Google Sign-In (if needed for backend verification)
  WEB_CLIENT_ID:
    "974118414647-t6q8p9un96ae5vqnvmfcdca6dhv5fugv.apps.googleusercontent.com",
};

// SHA1 Certificate Fingerprints
export const SHA1_FINGERPRINTS = {
  // Debug build SHA1 fingerprint
  DEBUG: "5E:8F:16:06:2E:A3:CD:2C:4A:0D:54:78:76:BA:A6:F3:8C:AB:F6:25",

  // Release build SHA1 fingerprint (to be added when ready for production)
  RELEASE: "", // Add your release SHA1 here when ready
};

// Package name for Google Cloud Console configuration
export const PACKAGE_NAME = "com.fuugohub";
