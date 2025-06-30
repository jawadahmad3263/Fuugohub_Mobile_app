# Fuugohub Mobile App - Project Structure

This document outlines the folder structure and architecture of the Fuugohub React Native mobile application.

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── common/         # Common components used across the app
│   └── forms/          # Form-specific components
├── screens/            # Screen components
│   ├── auth/           # Authentication screens
│   │   ├── LoginScreen.js
│   │   ├── RegisterScreen.js
│   │   └── ForgotPasswordScreen.js
│   ├── main/           # Main app screens
│   │   ├── HomeScreen.js
│   │   └── SettingsScreen.js
│   └── profile/        # Profile-related screens
│       └── ProfileScreen.js
├── navigation/         # Navigation configuration
│   ├── AppNavigator.js # Main app navigator
│   ├── stacks/         # Stack navigators
│   │   ├── AuthStack.js
│   │   └── MainStack.js
│   └── tabs/           # Tab navigators
├── services/           # API and external services
│   └── api.js          # API service functions
├── utils/              # Utility functions
│   └── validation.js   # Form validation utilities
├── constants/          # App constants
│   └── colors.js       # Color definitions
├── assets/             # Static assets (images, fonts, etc.)
├── hooks/              # Custom React hooks
└── store/              # State management (Redux/Context)
```

## 🏗️ Architecture Overview

### 1. **Navigation Structure**
- **AppNavigator**: Main navigator that handles authentication flow
- **AuthStack**: Handles login, register, and forgot password screens
- **MainStack**: Contains the main app with bottom tabs
- **Bottom Tabs**: Home, Profile, and Settings tabs

### 2. **Screen Organization**
- **Authentication Screens**: Login, Register, Forgot Password
- **Main App Screens**: Home dashboard, Settings
- **Profile Screens**: User profile management

### 3. **Component Architecture**
- **Common Components**: Reusable UI elements
- **Form Components**: Specialized form components
- **Screen Components**: Full-screen components

### 4. **Services Layer**
- **API Service**: Centralized HTTP request handling
- **Auth API**: Authentication-related API calls
- **User API**: User profile management
- **App API**: App-specific functionality

### 5. **Utilities**
- **Validation**: Form validation functions
- **Constants**: App-wide constants and configurations

## 🎨 Design System

### Colors
- **Primary**: #f4511e (Orange)
- **Secondary**: #2196f3 (Blue)
- **Background**: #f5f5f5 (Light Gray)
- **Surface**: #ffffff (White)
- **Text**: #333333 (Dark Gray)

### Typography
- **Headers**: Bold, 24-28px
- **Body**: Regular, 16px
- **Captions**: Regular, 14px

## 🚀 Getting Started

### Prerequisites
- React Native 0.80.0
- Node.js and Yarn
- iOS Simulator or Android Emulator

### Installation
```bash
# Install dependencies
yarn install

# iOS
npx react-native run-ios

# Android
npx react-native run-android
```

## 📱 Features

### Authentication
- ✅ Login screen with email/password
- ✅ Registration screen with form validation
- ✅ Forgot password functionality
- ✅ Navigation between auth screens

### Main App
- ✅ Home dashboard with quick actions
- ✅ Profile management
- ✅ Settings with toggles
- ✅ Bottom tab navigation

### Technical Features
- ✅ JavaScript (no TypeScript)
- ✅ React Navigation v6
- ✅ Form validation utilities
- ✅ API service structure
- ✅ Consistent theming
- ✅ Responsive design

## 🔧 Development Guidelines

### File Naming
- Use PascalCase for components: `LoginScreen.js`
- Use camelCase for utilities: `validation.js`
- Use kebab-case for assets: `user-avatar.png`

### Component Structure
```javascript
/**
 * Component Name
 * Brief description
 */

import React from 'react';
import { /* imports */ } from 'react-native';

const ComponentName = ({ props }) => {
  // Component logic
  
  return (
    // JSX
  );
};

const styles = StyleSheet.create({
  // Styles
});

export default ComponentName;
```

### State Management
- Use React hooks for local state
- Prepare for Redux/Context integration in store folder
- Keep state as close to where it's used as possible

## 🚧 TODO

### Immediate
- [ ] Add authentication state management
- [ ] Implement actual API integration
- [ ] Add loading states and error handling
- [ ] Add proper form validation feedback

### Future
- [ ] Add image assets and icons
- [ ] Implement dark mode
- [ ] Add push notifications
- [ ] Add offline support
- [ ] Add unit tests
- [ ] Add E2E tests

## 📄 License

This project is part of the Fuugohub mobile application. 