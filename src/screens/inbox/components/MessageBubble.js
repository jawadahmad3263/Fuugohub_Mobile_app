import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import COLORS from '../../../style/colors';

const MessageBubble = ({ message, isOwnMessage, onReply, onReaction, onDelete }) => {
  const renderMessageContent = () => {
    if (message.type === 'image') {
      return (
        <Image 
          source={{ uri: message.content }} 
          style={styles.messageImage}
          resizeMode="cover"
        />
      );
    }
    return (
      <Text style={[
        styles.messageText,
        isOwnMessage ? styles.ownMessageText : styles.otherMessageText
      ]}>
        {message.content}
      </Text>
    );
  };

  const renderMessageActions = () => {
    if (!isOwnMessage) return null;
    
    return (
      <View style={styles.messageActions}>
        <TouchableOpacity style={styles.actionButton} onPress={onReply}>
          <Text style={styles.actionIcon}>↩️</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={onReaction}>
          <Text style={styles.actionIcon}>⚪</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={onDelete}>
          <Text style={styles.actionIcon}>🗑️</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={[
      styles.container,
      isOwnMessage ? styles.ownMessageContainer : styles.otherMessageContainer
    ]}>
      {!isOwnMessage && (
        <Image 
          source={{ uri: message.sender.avatar }} 
          style={styles.senderAvatar}
          defaultSource={require('../../../assets/images/login-logo.png')}
        />
      )}
      
      <View style={[
        styles.messageBubble,
        isOwnMessage ? styles.ownMessageBubble : styles.otherMessageBubble
      ]}>
        {renderMessageContent()}
        <Text style={[
          styles.timestamp,
          isOwnMessage ? styles.ownTimestamp : styles.otherTimestamp
        ]}>
          {message.timestamp}
        </Text>
      </View>
      
      {/* {renderMessageActions()} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 6,
    paddingHorizontal: 20,
    alignItems: 'flex-end',
  },
  ownMessageContainer: {
    justifyContent: 'flex-end',
  },
  otherMessageContainer: {
    justifyContent: 'flex-start',
  },
  senderAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginRight: 8,
    backgroundColor: COLORS.lightGray,
  },
  messageBubble: {
    maxWidth: '75%',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 18,
  },
  ownMessageBubble: {
    backgroundColor: '#C8FAD6',
    borderBottomRightRadius: 6,
  },
  otherMessageBubble: {
    backgroundColor: '#F0F0F0',
    borderBottomLeftRadius: 6,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 20,
    marginBottom: 4,
  },
  ownMessageText: {
    color: '#2C3E50',
  },
  otherMessageText: {
    color: '#2C3E50',
  },
  messageImage: {
    width: 180,
    height: 135,
    borderRadius: 10,
    marginBottom: 6,
  },
  timestamp: {
    fontSize: 11,
    color: '#95A5A6',
  },
  ownTimestamp: {
    textAlign: 'right',
  },
  otherTimestamp: {
    textAlign: 'left',
  },
  messageActions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 6,
    marginBottom: 4,
  },
  actionButton: {
    padding: 3,
    marginHorizontal: 1,
  },
  actionIcon: {
    fontSize: 14,
  },
});

export default MessageBubble;
