/**
 * Global Navigation Screens
 * Centralizes screen names and component imports for navigation
 */

// Auth screens
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';

// Main screens
import HomeScreen from '../screens/main/HomeScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import SettingsScreen from '../screens/main/SettingsScreen';
import AccountDetails from '../screens/auth/AccountDetails';
import UserPreferences from '../screens/auth/UserPreferences';
import ImageUploadScreen from '../screens/auth/ImageUploadScreen';
import CameraRecordingScreen from '../screens/main/CameraRecordingScreen';
import Inbox from '../screens/inbox/Inbox';
import PersonalProfile from '../screens/profile/PersonalProfile';
import ShopScreen from '../screens/shop/components/ShopScreen';
import EarningsScreen from '../screens/earnings/EarningsScreen';
import AnalyticsScreen from '../screens/analytics/AnalyticsScreen';
import BusinessPage from '../screens/businessPage/BusinessPage';
import ProductDetailsScreen from '../screens/businessPage/ProductDetailsScreen';

// Auth screen names and components
export const AUTH_SCREENS = {
  LOGIN: {
    name: 'Login',
    component: LoginScreen,
    title: 'Login',
  },
  REGISTER: {
    name: 'Register',
    component: RegisterScreen,
    title: 'Register',
  },
  FORGOT_PASSWORD: {
    name: 'ForgotPassword',
    component: ForgotPasswordScreen,
    title: 'Forgot Password',
  },
  ACCOUNT_DETAILS:{
    name: 'AccountDetails',
    component: AccountDetails,
    title: 'Account Details',
  },
    USER_PREFERENCES:{
    name: 'UserPreferences',
    component: UserPreferences,
    title: 'User Preferences',
  },
  IMAGE_UPLOAD: {
    name: 'ImageUploadScreen',
    component: ImageUploadScreen,
    title: 'Image Upload',
  },
};

// Main tab screen names and components
export const MAIN_TAB_SCREENS = {
  HOME: {
    name: 'Home',
    component: HomeScreen,
    options: {
      tabBarLabel: 'Home',
      // TODO: Add tab bar icons
    },
  },
  SHOP: {
    name: 'Shop',
    component: ShopScreen,
    options: {
      tabBarLabel: 'Shop',
      // TODO: Add tab bar icons
    },
  },
  CAMERA_RECORDING: {
    name: 'CameraRecording',
    component: CameraRecordingScreen,
    options: {
     
      // TODO: Add tab bar icons
    },
  },
  INBOX: {
    name: 'Inbox',
    component: Inbox,
    options: {
      tabBarLabel: 'Inbox',
      // TODO: Add tab bar icons
    },
  },
  PROFILE: {
    name: 'Profile',
    component: ProfileScreen,
    options: {
      tabBarLabel: 'Profile',
      // TODO: Add tab bar icons
    },
  },
 
}; 

export const APP_SCREENS = {
  PERSONAL_PROFILE: {
    name: 'PersonalProfile',
    component: PersonalProfile,
    title: 'Personal Profile',
    options: {
      headerShown: false,
    },
  },
  EARNINGS: {
    name: 'EarningsScreen',
    component: EarningsScreen,
    title: 'Earnings',
  },
  ANALYTICS: {
    name: 'Analytics',
    component: AnalyticsScreen,
    title: 'Analytics',
  },
  BUSINESS_PAGE: {
    name: 'BusinessPage',
    component: BusinessPage,
    title: 'Business Page',
  },
  PRODUCT_DETAILS: {
    name: 'ProductDetailsScreen',
    component: ProductDetailsScreen,
    title: 'Product Details',
  },
};