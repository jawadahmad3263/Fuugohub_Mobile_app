/**
 * Settings Screen
 * App settings and preferences screen
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';

const SettingsScreen = ({ navigation }) => {
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    autoSync: true,
    locationServices: false,
  });

  const toggleSetting = (key) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const renderSettingItem = (title, description, value, onToggle, type = 'switch') => {
    return (
      <View style={styles.settingItem}>
        <View style={styles.settingInfo}>
          <Text style={styles.settingTitle}>{title}</Text>
          <Text style={styles.settingDescription}>{description}</Text>
        </View>
        {type === 'switch' ? (
          <Switch
            value={value}
            onValueChange={onToggle}
            trackColor={{ false: '#767577', true: '#f4511e' }}
            thumbColor={value ? '#fff' : '#f4f3f4'}
          />
        ) : (
          <TouchableOpacity onPress={onToggle}>
            <Text style={styles.settingAction}>{value}</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Settings</Text>
        </View>
        
        <View style={styles.content}>
          {/* Notifications */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Notifications</Text>
            {renderSettingItem(
              'Push Notifications',
              'Receive push notifications for important updates',
              settings.notifications,
              () => toggleSetting('notifications')
            )}
          </View>
          
          {/* Appearance */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Appearance</Text>
            {renderSettingItem(
              'Dark Mode',
              'Use dark theme throughout the app',
              settings.darkMode,
              () => toggleSetting('darkMode')
            )}
          </View>
          
          {/* Data & Sync */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Data & Sync</Text>
            {renderSettingItem(
              'Auto Sync',
              'Automatically sync data when connected to internet',
              settings.autoSync,
              () => toggleSetting('autoSync')
            )}
            {renderSettingItem(
              'Location Services',
              'Allow app to access your location',
              settings.locationServices,
              () => toggleSetting('locationServices')
            )}
          </View>
          
          {/* Account */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Account</Text>
            {renderSettingItem(
              'Privacy Policy',
              'View our privacy policy',
              'View',
              () => Alert.alert('Privacy Policy', 'Privacy policy to be implemented'),
              'action'
            )}
            {renderSettingItem(
              'Terms of Service',
              'View our terms of service',
              'View',
              () => Alert.alert('Terms of Service', 'Terms of service to be implemented'),
              'action'
            )}
            {renderSettingItem(
              'App Version',
              'Current version of the app',
              '1.0.0',
              () => {},
              'info'
            )}
          </View>
          
          {/* Support */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Support</Text>
            {renderSettingItem(
              'Contact Support',
              'Get help from our support team',
              'Contact',
              () => Alert.alert('Support', 'Contact support functionality to be implemented'),
              'action'
            )}
            {renderSettingItem(
              'Report a Bug',
              'Report issues or bugs you encounter',
              'Report',
              () => Alert.alert('Bug Report', 'Bug report functionality to be implemented'),
              'action'
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    backgroundColor: '#f4511e',
    padding: 20,
    paddingTop: 40,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  content: {
    padding: 20,
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    padding: 20,
    paddingBottom: 10,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingInfo: {
    flex: 1,
    marginRight: 15,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 18,
  },
  settingAction: {
    fontSize: 16,
    color: '#f4511e',
    fontWeight: '500',
  },
});

export default SettingsScreen; 