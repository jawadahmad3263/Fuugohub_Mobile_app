import { appleAuth } from '@invertase/react-native-apple-authentication';
import { Platform } from 'react-native';
import APPLE_AUTH_CONFIG from '../constants/appleAuth';

class AppleAuthService {
  /**
   * Check if Apple Sign-In is available on the device
   */
  static isAvailable() {
    return Platform.OS === 'ios' && appleAuth.isSupported;
  }

  /**
   * Perform Apple Sign-In
   */
  static async signIn() {
    try {
      // Check if Apple Sign-In is available
      if (!this.isAvailable()) {
        throw new Error(APPLE_AUTH_CONFIG.errorMessages.NOT_AVAILABLE);
      }

      console.log('Apple Sign-In: Starting authentication...');

      // Request Apple Sign-In
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [
          appleAuth.Scope.EMAIL,
          appleAuth.Scope.FULL_NAME
        ],
      });

      console.log('Apple Sign-In: Response received:', appleAuthRequestResponse);

      // Get the user's identity token
      const { identityToken, email, fullName, user } = appleAuthRequestResponse;

      if (!identityToken) {
        throw new Error(APPLE_AUTH_CONFIG.errorMessages.INVALID_TOKEN);
      }

      console.log('Apple Sign-In: Identity token received successfully');

      // Return the user data
      return {
        success: true,
        data: {
          identityToken,
          email,
          fullName,
          user,
          // Extract first and last name if available
          firstName: fullName?.givenName || '',
          lastName: fullName?.familyName || '',
        }
      };

    } catch (error) {
      console.log('Apple Sign-In Error Details:', {
        message: error.message,
        code: error.code,
        stack: error.stack
      });
      
      // Handle specific Apple Sign-In errors
      if (error.code === appleAuth.Error.CANCELED) {
        return {
          success: false,
          error: 'User cancelled Apple Sign-In',
          code: 'CANCELLED'
        };
      } else if (error.code === appleAuth.Error.INVALID_RESPONSE) {
        return {
          success: false,
          error: 'Invalid response from Apple',
          code: 'INVALID_RESPONSE'
        };
      } else if (error.code === appleAuth.Error.NOT_HANDLED) {
        return {
          success: false,
          error: 'Apple Sign-In not handled',
          code: 'NOT_HANDLED'
        };
      } else if (error.code === appleAuth.Error.UNKNOWN) {
        return {
          success: false,
          error: 'Apple Sign-In capability not configured. Please add "Sign In with Apple" capability in Xcode.',
          code: 'UNKNOWN'
        };
      }

      return {
        success: false,
        error: error.message || 'Apple Sign-In failed',
        code: 'GENERAL_ERROR'
      };
    }
  }

  /**
   * Get Apple Sign-In credential state
   */
  static async getCredentialState(user) {
    try {
      if (!this.isAvailable()) {
        return { state: 'NOT_AVAILABLE' };
      }

      const credentialState = await appleAuth.getCredentialStateForUser(user);
      return { state: credentialState };
    } catch (error) {
      console.log('Get Credential State Error:', error);
      return { state: 'ERROR', error: error.message };
    }
  }
}

export default AppleAuthService;
