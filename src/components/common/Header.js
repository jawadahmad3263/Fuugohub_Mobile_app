import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import NotificationIcon from '../../assets/svg/notification-icon.svg'
import SettingsIcon from '../../assets/svg/setting-icon.svg'
import HeaderAvatar from '../../assets/svg/header-profile-avatar.svg'
import BackIcon from '../../assets/svg/back-arrow-black.svg'
import { useNavigation } from '@react-navigation/native'
import COLORS from '../../style/colors'

const Header = ({ 
  title, 
  onBackPress, 
  onNotificationPress, 
  onSettingsPress, 
  onAvatarPress,
  showBackButton = true,
  showRightIcons = true,
  notificationCount = 0,
  showBreadcrumb = false,
  breadcrumbText = '',
  showNotification = true,
  showSettings = true,
  showProfile = true
}) => {
  const navigation = useNavigation()
  const handleBackPress = () => {
   onBackPress ? onBackPress() : navigation.goBack()
  }
  return (
    <View style={styles.container}>
      <View style={styles.headerContent}>
        {/* Left Side */}
        <View style={styles.leftSection}>
          {showBackButton && (
            <TouchableOpacity 
              style={styles.backButton}
              onPress={handleBackPress}
            >
            <BackIcon width={24} height={24} color={COLORS.primary} />
              {/* <Text style={{ fontSize: 24, color: '#000' }}>←</Text> */}
            </TouchableOpacity>
          )}
          <View style={styles.titleSection}>
            <Text style={styles.title}>{title}</Text>
            {showBreadcrumb && breadcrumbText && (
              <Text style={styles.breadcrumb}>{breadcrumbText}</Text>
            )}
          </View>
        </View>

        {/* Right Side */}
        {showRightIcons && (
          <View style={styles.rightSection}>
            {/* Notification Icon with Badge */}
            {showNotification && (
              <TouchableOpacity 
                style={styles.iconContainer}
                onPress={onNotificationPress}
              >
                <NotificationIcon width={24} height={24} />
                {notificationCount > 0 && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{notificationCount}</Text>
                  </View>
                )}
              </TouchableOpacity>
            )}

            {/* Settings Icon */}
            {showSettings && (
              <TouchableOpacity 
                style={styles.iconContainer}
                onPress={onSettingsPress}
              >
                <SettingsIcon width={24} height={24} />
              </TouchableOpacity>
            )}

            {/* Avatar */}
            {showProfile && (
              <TouchableOpacity 
                style={styles.avatarContainer}
                onPress={onAvatarPress}
              >
                <HeaderAvatar width={32} height={32} />
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingTop: 10,
    paddingBottom: 10,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  backButton: {
    marginRight: 12,
    padding: 4,
  },
  titleSection: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  breadcrumb: {
    fontSize: 12,
    color: '#666',
    lineHeight: 16,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    marginLeft: 16,
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#f4511e',
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  avatarContainer: {
    marginLeft: 16,
  },
})