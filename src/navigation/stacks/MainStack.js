/**
 * Main App Stack Navigator
 * Handles all main app screens after authentication
 */

import React, { cloneElement } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, TouchableOpacity, StyleSheet, Text, Alert, Platform, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
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
// Utility function to detect device type
const isDeviceWithHomeIndicator = () => {
  const { height, width } = Dimensions.get('window');
  const aspectRatio = height / width;
  
  // iPhone X and newer have aspect ratio > 2
  if (Platform.OS === 'ios' && aspectRatio > 2) {
    return true;
  }
  
  // For Android, check if there's a bottom inset
  return false;
};

// Custom Tab Bar Component
const CustomTabBar = ({ state, descriptors, navigation }) => {
  const insets = useSafeAreaInsets();
  const { height: screenHeight } = Dimensions.get('window');
  
  // Debug logging for safe area insets
  console.log('Safe Area Insets:', {
    top: insets.top,
    bottom: insets.bottom,
    left: insets.left,
    right: insets.right,
    platform: Platform.OS,
    screenHeight
  });
  
  // Calculate dynamic height based on device and safe area
  const getTabBarHeight = () => {
    const baseHeight = 90;
    const bottomInset = insets.bottom;
    
    // For devices with home indicator (iPhone X and newer, some Android devices)
    if (bottomInset > 0) {
      return baseHeight + bottomInset;
    }
    
    // For Android devices with navigation bar
    if (Platform.OS === 'android') {
      // Add extra padding for Android navigation bar
      return baseHeight + 15;
    }
    
    // For older devices without home indicator
    return baseHeight;
  };

  return (
    <View style={[styles.tabBar, { 
      height: getTabBarHeight(),
      paddingBottom: insets.bottom > 0 ? insets.bottom : (Platform.OS === 'android' ? 10 : 20),
    }]}>
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

             
            if(route?.name == 'CameraRecording'){

              navigation.navigate("DropVideoScreen")
              return
            }
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
              <View style={styles.centerButtonInner}>
                <IconComponent  />
              </View>
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
      <Stack.Screen name="EarningsScreen" component={APP_SCREENS.EARNINGS.component} />
      <Stack.Screen name="Analytics" component={APP_SCREENS.ANALYTICS.component} />
      <Stack.Screen name="BusinessPage" component={APP_SCREENS.BUSINESS_PAGE.component} />
      <Stack.Screen name="ProductDetailsScreen" component={APP_SCREENS.PRODUCT_DETAILS.component} />
      <Stack.Screen name= "DropVideoScreen" component={APP_SCREENS.DROP_VIDEO_SCREEN.component} />
      {/* Add other main screens here */}
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#000000',
    paddingTop: 10,
    borderTopWidth: 0,
    elevation: 0,
    shadowOpacity: 0,
    // Add shadow for better visual separation
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    // Ensure proper alignment
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    minHeight: 50, // Ensure minimum height for touch targets
    height: 70, // Match center button height
  },
  centerButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 70,
    marginTop: -15,
  },
  centerButtonInner: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    // Remove shadow and border for clean icon display
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