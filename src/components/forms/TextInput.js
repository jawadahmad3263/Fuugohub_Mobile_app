import React, { useState } from 'react';
import { View, Text, TextInput as RNTextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';

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
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = secureTextEntry;

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.inputWrapper}>
        <RNTextInput
          style={[styles.input, inputStyle]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          secureTextEntry={isPassword && !showPassword}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          placeholderTextColor="#b0b7c3"
          {...props}
        />
        {isPassword && (
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => setShowPassword((prev) => !prev)}
            activeOpacity={0.7}
          >
            {/* <Image
              source={showPassword ? require('../../assets/images/eye-off.png') : require('../../assets/images/eye.png')}
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
  label: {
    fontSize: 15,
    color: '#6c7685',
    marginBottom: 6,
    fontWeight: '600',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#e5eaf2',
    paddingHorizontal: 16,
    paddingVertical: 0,
    minHeight: 56,
  },
  input: {
    flex: 1,
    fontSize: 17,
    color: '#222',
    paddingVertical: 16,
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