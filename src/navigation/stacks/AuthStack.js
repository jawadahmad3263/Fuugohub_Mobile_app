/**
 * Authentication Stack Navigator
 * Handles all authentication related screens
 */

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AUTH_SCREENS } from '../screens';

const Stack = createNativeStackNavigator();

const authScreens = [
  AUTH_SCREENS.LOGIN,
  AUTH_SCREENS.REGISTER,
  AUTH_SCREENS.FORGOT_PASSWORD,
];

const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={AUTH_SCREENS.LOGIN.name}
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      {authScreens.map((screen) => (
        <Stack.Screen
          key={screen.name}
          name={screen.name}
          component={screen.component}
          options={{ title: screen.title }}
        />
      ))}
    </Stack.Navigator>
  );
};

export default AuthStack; 