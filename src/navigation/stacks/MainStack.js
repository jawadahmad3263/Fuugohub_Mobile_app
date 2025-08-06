/**
 * Main App Stack Navigator
 * Handles all main app screens after authentication
 */

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { APP_SCREENS, MAIN_TAB_SCREENS } from '../screens';
import HomeSelectedIcon from '../../assets/svg/home-selected-icon.svg';
import HomeUnselectedIcon from '../../assets/svg/home-unselected-icon.svg';
import ProfileIcon from '../../assets/svg/profile-icon.svg';
import ProfileUnselectedIcon from '../../assets/svg/profile-unselected-icon.svg';
import ShopIcon from '../../assets/svg/shop-icon.svg';
import ShopUnselectedIcon from '../../assets/svg/shop-unselected-icon.svg';
import InboxIcon from '../../assets/svg/inbox-icon.svg';
import InboxUnselectedIcon from '../../assets/svg/inbox-unselected-icon.svg';
import CameraIcon from '../../assets/svg/bottom-plus.svg';
import COLORS from '../../style/colors';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Tab configuration
const tabScreens = [
  {
    name: 'Home',
    component: MAIN_TAB_SCREENS.HOME.component,
    label: 'Drops',
    selectedIcon: HomeSelectedIcon,
    unselectedIcon: HomeUnselectedIcon,
  },
  {
    name: 'Shop',
    component: MAIN_TAB_SCREENS.SHOP.component,
    label: 'Shop',
    selectedIcon: ShopUnselectedIcon,
    unselectedIcon: ShopIcon,
  },
  {
    name: 'CameraRecording',
    component: MAIN_TAB_SCREENS.CAMERA_RECORDING.component,
    label: '',
    isCenterButton: true,
    icon: CameraIcon,
  },
  {
    name: 'Inbox',
    component: MAIN_TAB_SCREENS.INBOX.component,
    label: 'Inbox',
    selectedIcon: InboxUnselectedIcon,
    unselectedIcon: InboxIcon,
  },
  {
    name: 'Profile',
    component: MAIN_TAB_SCREENS.PROFILE.component,
    label: 'Me',
    selectedIcon: ProfileUnselectedIcon,
    unselectedIcon: ProfileIcon,
  },
];
const appScreens = [
  {
    name: 'PersonalProfile',
    component: APP_SCREENS.PERSONAL_PROFILE.component,
    
  },
];
// Custom Tab Bar Component
const CustomTabBar = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel ?? options.title ?? route.name;
        const isFocused = state.index === index;
        const tabConfig = tabScreens.find(tab => tab.name === route.name);

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        // Special handling for the center button (Camera)
        if (tabConfig?.isCenterButton) {
          const IconComponent = tabConfig.icon;
          return (
            <TouchableOpacity
              key={route.key}
              style={styles.centerButton}
              onPress={onPress}
              activeOpacity={0.8}
            >
              <IconComponent />
            </TouchableOpacity>
          );
        }

        // Regular tab items
        const SelectedIcon = tabConfig?.selectedIcon;
        const UnselectedIcon = tabConfig?.unselectedIcon;
        const IconComponent = isFocused ? SelectedIcon : UnselectedIcon;

        return (
          <TouchableOpacity
            key={route.key}
            style={styles.tabItem}
            onPress={onPress}
            activeOpacity={0.8}
          >
            <IconComponent width={24} height={24} />
            <Text style={[styles.tabLabel, isFocused && styles.activeTabLabel]}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

// Bottom Tab Navigator
const MainTabs = () => {
  return (
    <Tab.Navigator
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      {tabScreens.map((screen) => (
        <Tab.Screen
          key={screen.name}
          name={screen.name}
          component={screen.component}
          options={{
            tabBarLabel: screen.label,
          }}
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
      <Stack.Screen name="PersonalProfile" component={APP_SCREENS.PERSONAL_PROFILE.component} />
      {/* Add other main screens here */}
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#000000',
    height: 90,
    paddingBottom: 20,
    paddingTop: 10,
    borderTopWidth: 0,
    elevation: 0,
    shadowOpacity: 0,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  centerButton: {
    width: 70,
    height: 70,
    borderRadius: 30,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -10,
  },
  tabLabel: {
    fontSize: 12,
    color: '#666666',
    marginTop: 4,
    fontWeight: '500',
  },
  activeTabLabel: {
    color: '#ffffff',
    fontWeight: '600',
  },
});

export default MainStack; 