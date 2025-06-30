import React, { useState, useRef } from 'react';
import { View, Text, TextInput as RNTextInput, StyleSheet, Animated, TouchableOpacity, Image, Platform } from 'react-native';
import COLORS from '../../style/colors';

const CustomTextInput = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'none',
  icon,
  style,
  inputStyle,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const animatedIsFocused = useRef(new Animated.Value(value ? 1 : 0)).current;
  const isPassword = secureTextEntry;

  React.useEffect(() => {
    Animated.timing(animatedIsFocused, {
      toValue: isFocused || value ? 1 : 0,
      duration: 180,
      useNativeDriver: false,
    }).start();
  }, [isFocused, value]);

  const labelStyle = {
    position: 'absolute',
    left: 16,
    top: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [18, -10],
    }),
    fontSize: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [18, 13],
    }),
    color: COLORS.textSecondary,
    backgroundColor: '#fff',
    paddingHorizontal: 4,
    zIndex: 2,
    fontWeight: '600',
  };

  return (
    <View style={[styles.container, style]}>
      {label && (
        <Animated.Text style={labelStyle} pointerEvents="none">
          {label}
        </Animated.Text>
      )}
      <View
        style={[
          styles.inputWrapper,
          {
            borderColor: isFocused ? COLORS.border : COLORS.border,
            borderWidth: 1,
          },
        ]}
      >
        <RNTextInput
          style={[styles.input, inputStyle, Platform.OS === 'web' && { outlineWidth: 0 }]}
          value={value}
          onChangeText={onChangeText}
          placeholder={isFocused ? placeholder : ''}
          secureTextEntry={isPassword && !isFocused}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          placeholderTextColor="#b0b7c3"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        {isPassword && (
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => setIsFocused((prev) => !prev)}
            activeOpacity={0.7}
          >
            {/* <Image
              source={isFocused ? require('../../assets/images/eye-off.png') : require('../../assets/images/eye.png')}
              style={styles.icon}
              resizeMode="contain"
            /> */}
          </TouchableOpacity>
        )}
        {icon && !isPassword && (
          <Image source={icon} style={styles.icon} resizeMode="contain" />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 18,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius:8,
    borderWidth: 2,
    borderColor: '#8a99a8',
    paddingHorizontal: 16,
    paddingVertical: 0,
    minHeight: 64,
    position: 'relative',
  },
  input: {
    flex: 1,
    fontSize: 18,
    color: COLORS.textPrimary,
    paddingVertical: 18,
    backgroundColor: 'transparent',
  },
  iconButton: {
    padding: 6,
  },
  icon: {
    width: 22,
    height: 22,
    tintColor: '#b0b7c3',
  },
});

export default CustomTextInput; 