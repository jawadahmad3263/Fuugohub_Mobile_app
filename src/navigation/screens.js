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
  PROFILE: {
    name: 'Profile',
    component: ProfileScreen,
    options: {
      tabBarLabel: 'Profile',
      // TODO: Add tab bar icons
    },
  },
  SETTINGS: {
    name: 'Settings',
    component: SettingsScreen,
    options: {
      tabBarLabel: 'Settings',
      // TODO: Add tab bar icons
    },
  },
}; 