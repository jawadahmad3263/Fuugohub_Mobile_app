// Apple Sign-In Configuration
export const APPLE_AUTH_CONFIG = {
  // Apple Sign-In is only available on iOS
  isSupported: true,
  
  // Requested scopes for Apple Sign-In
  requestedScopes: [
    'email',
    'fullName'
  ],
  
  // Backend endpoint for Apple authentication
  backendEndpoint: 'auth/apple',
  
  // Error messages
  errorMessages: {
    NOT_AVAILABLE: 'Apple Sign-In is not available on this device',
    CANCELLED: 'Apple Sign-In was cancelled',
    FAILED: 'Apple Sign-In failed. Please try again.',
    NETWORK_ERROR: 'Network error occurred during Apple Sign-In',
    INVALID_TOKEN: 'Invalid Apple Sign-In token',
  }
};

export default APPLE_AUTH_CONFIG;
