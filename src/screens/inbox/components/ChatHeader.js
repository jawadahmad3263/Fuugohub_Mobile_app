import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import COLORS from '../../../style/colors';

const ChatHeader = ({ contact, onCallPress }) => {
  return (
    <View style={styles.container}>
      <View style={styles.contactInfo}>
        <View style={styles.avatarContainer}>
          <Image 
            source={{ uri: contact.avatar }} 
            style={styles.avatar}
            defaultSource={require('../../../assets/images/login-logo.png')}
          />
        </View>
        <View style={styles.contactDetails}>
          <Text style={styles.contactName}>{contact.name}</Text>
          <Text style={styles.onlineStatus}>{contact.isOnline ? 'Online' : 'Offline'}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.callButton} onPress={onCallPress}>
        <Text style={styles.callIcon}>📞</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  contactInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarContainer: {
    marginRight: 12,
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: COLORS.lightGray,
  },
  contactDetails: {
    flex: 1,
  },
  contactName: {
    fontSize: 17,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  onlineStatus: {
    fontSize: 13,
    color: '#4CAF50',
    fontWeight: '500',
  },
  callButton: {
    padding: 8,
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  callIcon: {
    fontSize: 18,
  },
});

export default ChatHeader;
