import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
} from "react-native";
import COLORS from "../../../style/colors";
import EmojiIcon from '../../../assets/svg/emoji.svg'
import PaperclipIcon from '../../../assets/svg/file-icon.svg'
import MicrophoneIcon from '../../../assets/svg/voic-record-icon.svg'
import PickImageIcon from '../../../assets/svg/pick-image.svg'
 

const ChatInput = ({
  onSendMessage,
  onAttachmentPress,
  onFilePress,
  onVoicePress,
  onEmojiPress,
}) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        {/* Left side - Emoji/Sticker Icon */}
        <TouchableOpacity style={styles.emojiButton} onPress={onEmojiPress}>
        <EmojiIcon width={24} height={24} />
        </TouchableOpacity>

        {/* Center - Text Input Field */}
        <View style={styles.textInputWrapper}>
          <TextInput
            style={styles.textInput}
            placeholder="Type a message"
            placeholderTextColor="#9E9E9E"
            value={message}
            onChangeText={setMessage}
            multiline
            maxLength={500}
            textAlignVertical="center"
          />
        </View>

        {/* Right side - Action Icons */}
        <View style={styles.rightActions}>
          {/* Image/Gallery Icon with Plus */}
          <TouchableOpacity
            style={styles.actionButton}
            onPress={onAttachmentPress}
          >
          <PickImageIcon width={24} height={24} />
            {/* <View style={styles.imageIconContainer}>
              <View style={styles.imageIcon}>
                <View style={styles.imageFrame} />
                <View style={styles.plusSign}><Text>+</Text></View>
              </View>
            </View> */}
          </TouchableOpacity>

          {/* Paperclip Icon */}
          <TouchableOpacity style={styles.actionButton} onPress={onFilePress}>
            <PaperclipIcon width={24} height={24} />
            {/* <View style={styles.paperclipIcon}>
              <View style={styles.paperclipShape} />
            </View> */}
          </TouchableOpacity>

          {/* Microphone Icon */}
          <TouchableOpacity style={styles.actionButton} onPress={onVoicePress}>
            <MicrophoneIcon width={24} height={24} />
            {/* <View style={styles.microphoneIcon}>
              <View style={styles.microphoneShape} />
            </View> */}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,

    borderTopWidth: 1,
    borderColor: COLORS.border,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,

    minHeight: 56,
  },
  emojiButton: {
    padding: 8,
    marginRight: 12,
  },
  emojiIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#E0E0E0",
    justifyContent: "center",
    alignItems: "center",
  },
  emojiLine: {
    width: 12,
    height: 2,
    backgroundColor: "#666",
    borderRadius: 1,
  },
  textInputWrapper: {
    flex: 1,
    marginHorizontal: 8,
  },
  textInput: {
    fontSize: 16,
    color: "#2C3E50",
    maxHeight: 80,
    paddingVertical: 8,
    paddingHorizontal: 0,
  },
  rightActions: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 8,
  },
  actionButton: {
    paddingVertical: 8,
    marginHorizontal: 4,
  },
  imageIconContainer: {
    position: "relative",
  },
  imageIcon: {
    width: 24,
    height: 24,
    position: "relative",
  },
  imageFrame: {
    width: 20,
    height: 16,
    borderWidth: 2,
    borderColor: "#666",
    borderRadius: 2,
    borderBottomWidth: 3,
  },
  plusSign: {
    position: "absolute",
    top: -2,
    right: -2,
    width: 12,
    height: 12,
    backgroundColor: "#666",
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  paperclipIcon: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  paperclipShape: {
    width: 16,
    height: 20,
    borderWidth: 2,
    borderColor: "#666",
    borderRadius: 8,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    transform: [{ rotate: "45deg" }],
  },
  microphoneIcon: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  microphoneShape: {
    width: 12,
    height: 18,
    backgroundColor: "#666",
    borderRadius: 6,
    position: "relative",
  },
});

export default ChatInput;
