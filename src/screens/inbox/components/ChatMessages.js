import React from 'react';
import { View, ScrollView, StyleSheet, RefreshControl } from 'react-native';
import MessageBubble from './MessageBubble';
import COLORS from '../../../style/colors';

const ChatMessages = ({ messages, currentUserId, onRefresh, refreshing }) => {
  const handleReply = (messageId) => {
    // Handle reply functionality
    console.log('Reply to message:', messageId);
  };

  const handleReaction = (messageId) => {
    // Handle reaction functionality
    console.log('React to message:', messageId);
  };

  const handleDelete = (messageId) => {
    // Handle delete functionality
    console.log('Delete message:', messageId);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      automaticallyAdjustKeyboardInsets={true}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={[COLORS.primary]}
          tintColor={COLORS.primary}
        />
      }
    >
      <View style={styles.messagesContainer}>
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
            isOwnMessage={message.sender.id === currentUserId}
            onReply={() => handleReply(message.id)}
            onReaction={() => handleReaction(message.id)}
            onDelete={() => handleDelete(message.id)}
          />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  contentContainer: {
    flexGrow: 1,
  },
  messagesContainer: {
    paddingVertical: 8,
  },
});

export default ChatMessages;
