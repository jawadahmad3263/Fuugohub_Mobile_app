/**
 * Main App Navigator
 * Handles authentication flow and main app navigation
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import screens
import AuthStack from './stacks/AuthStack';
import MainStack from './stacks/MainStack';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  // TODO: Add authentication state management
  const isAuthenticated = false; // This will be managed by your auth state

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          // Auth Stack
          <Stack.Screen name="Auth" component={AuthStack} />
        ) : (
          // Main App Stack
          <Stack.Screen name="Main" component={MainStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator; 