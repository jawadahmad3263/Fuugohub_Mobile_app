import { LoginManager, AccessToken, Profile, Settings } from 'react-native-fbsdk-next';
import { Platform } from 'react-native';
import { FACEBOOK_AUTH_CONFIG } from '../constants';

class FacebookAuthService {
  static configure() {
    Settings.setAppID(FACEBOOK_AUTH_CONFIG.APP_ID);
    Settings.setClientToken(FACEBOOK_AUTH_CONFIG.CLIENT_TOKEN);
    Settings.initializeSDK();
    if (Platform.OS === 'ios') {
      Settings.setAdvertiserTrackingEnabled(true);
    }
  }

  static async signIn() {
    try {
      const loginResult = await LoginManager.logInWithPermissions(['public_profile', 'email']);
      if (loginResult.isCancelled) {
        return { success: false, code: 'CANCELLED' };
      }

      const data = await AccessToken.getCurrentAccessToken();
      if (!data) {
        return { success: false, code: 'NO_TOKEN' };
      }

      const token = data.accessToken?.toString();
      const profile = await Profile.getCurrentProfile();

      return {
        success: true,
        data: {
          accessToken: token,
          userID: data.userID,
          email: undefined, // email requires Graph API call if needed
          firstName: profile?.firstName,
          lastName: profile?.lastName,
          name: profile?.name,
        },
      };
    } catch (error) {
      return { success: false, code: 'ERROR', error: error?.message };
    }
  }
}

export default FacebookAuthService;



