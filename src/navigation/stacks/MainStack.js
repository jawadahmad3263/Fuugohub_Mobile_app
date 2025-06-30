/**
 * Main App Stack Navigator
 * Handles all main app screens after authentication
 */

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MAIN_TAB_SCREENS } from '../screens';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const tabScreens = [
  MAIN_TAB_SCREENS.HOME,
  MAIN_TAB_SCREENS.PROFILE,
  MAIN_TAB_SCREENS.SETTINGS,
];

// Bottom Tab Navigator
const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#f4511e',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      }}
    >
      {tabScreens.map((screen) => (
        <Tab.Screen
          key={screen.name}
          name={screen.name}
          component={screen.component}
          options={screen.options}
        />
      ))}
    </Tab.Navigator>
  );
};

// Main Stack Navigator
const MainStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="MainTabs"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="MainTabs" component={MainTabs} />
      {/* Add other main screens here */}
    </Stack.Navigator>
  );
};

export default MainStack; 