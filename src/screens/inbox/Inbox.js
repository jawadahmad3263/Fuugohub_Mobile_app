import { StyleSheet, View, Alert, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useState } from 'react'
import Style from '../../style/Style'
import Header from '../../components/common/Header'
import { ChatHeader, ChatMessages, ChatInput, mockContact, mockCurrentUser, mockMessages } from './components'
import COLORS from '../../style/colors'
import { useNavigation } from '@react-navigation/native'

const Inbox = () => {
  const navigation = useNavigation()
  const [messages, setMessages] = useState(mockMessages);
  const [refreshing, setRefreshing] = useState(false);

  const handleSendMessage = (messageText) => {
    const newMessage = {
      id: Date.now().toString(),
      type: 'text',
      content: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sender: mockCurrentUser,
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleCallPress = () => {
    Alert.alert('Call', `Calling ${mockContact.name}...`);
  };

  const handleAttachmentPress = () => {
    Alert.alert('Attachment', 'Open camera or photo library');
  };

  const handleFilePress = () => {
    Alert.alert('File', 'Select file to attach');
  };

  const handleVoicePress = () => {
    Alert.alert('Voice', 'Start voice recording');
  };

  const handleEmojiPress = () => {
    Alert.alert('Emoji', 'Open emoji picker');
  };

  const handleRefresh = () => {
    setRefreshing(true);
    // Simulate refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const handleBackPress = () => {
 
    navigation.goBack()
  };

  const handleNotificationPress = () => {
    Alert.alert('Notifications', 'Open notifications');
  };

  const handleSettingsPress = () => {
    Alert.alert('Settings', 'Open settings');
  };

  const handleAvatarPress = () => {
    Alert.alert('Profile', 'Open user profile');
  };

  return (
    <KeyboardAvoidingView 
      style={[Style.container, styles.container]} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <Header 
        title='Chat' 
        onBackPress={handleBackPress} 
        onNotificationPress={handleNotificationPress} 
        onSettingsPress={handleSettingsPress} 
        onAvatarPress={handleAvatarPress} 
        notificationCount={1} 
      />
      <View style ={styles.chatContainer}> 
      <ChatHeader 
        contact={mockContact}
        onCallPress={handleCallPress}
      />
      
      <ChatMessages 
        messages={messages}
        currentUserId={mockCurrentUser.id}
        onRefresh={handleRefresh}
        refreshing={refreshing}
      />
      
      <ChatInput 
        onSendMessage={handleSendMessage}
        onAttachmentPress={handleAttachmentPress}
        onFilePress={handleFilePress}
        onVoicePress={handleVoicePress}
        onEmojiPress={handleEmojiPress}
      />
      </View>
    
    </KeyboardAvoidingView>
  )
}

export default Inbox

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
    paddingHorizontal:15,
    marginBottom:15
  },
  chatContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 10,
    padding: 5,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginTop:15

  },
})