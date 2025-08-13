import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";
import PhoneInput from "react-native-phone-number-input";
import COLORS from "../../style/colors";
import Style from "../../style/Style";

const PhoneNumInput = ({
  value,
  onChangeText,
  onChangeFormattedText,
  onChangeCountry,
  label = "Phone number",
  placeholder = "Enter phone number",
  defaultCountry = "FR",
  withDarkTheme = false,
  withShadow = false,
  autoFocus = false,
  containerStyle,
  textContainerStyle,
  textInputStyle,
  codeTextStyle,
  flagButtonStyle,
  countryPickerButtonStyle,
  disabled = false,
}) => {
  const phoneInput = useRef(null);

  return (
    <View style={styles.container}>
      {/* Label */}
      <Text style={styles.label}>{label}</Text>

      {/* Phone Input Component */}
      <PhoneInput
        ref={phoneInput}
        defaultValue={value}
        defaultCode={defaultCountry}
        layout="first"
        onChangeText={onChangeText}
        onChangeFormattedText={onChangeFormattedText}
        onChangeCountry={onChangeCountry}
        withDarkTheme={withDarkTheme}
        withShadow={withShadow}
        autoFocus={autoFocus}
        placeholder={placeholder}
        disabled={disabled}
        renderFlagImage={true}
        disableArrowIcon={false}
        showFlag={true}
        // showCountryPicker={true}

        containerStyle={[styles.phoneInputContainer, containerStyle]}
        textContainerStyle={[styles.textContainer, textContainerStyle]}
        textInputStyle={[styles.textInput, textInputStyle]}
        codeTextStyle={[styles.codeText, codeTextStyle]}
        flagButtonStyle={[styles.flagButton, flagButtonStyle]}
        countryPickerButtonStyle={[styles.countryPickerButton, countryPickerButtonStyle]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // marginBottom: 18,
  },
  label: {
    ...Style.font14,
    ...Style.bold,
    ...Style.textPrimary,
    marginBottom: 12,
  },
  phoneInputContainer: {
    width: "100%",
    borderColor: COLORS.border,
    borderWidth: 2,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    minHeight: 40,
    overflow: 'hidden',
  },
  textContainer: {
    backgroundColor: COLORS.white,
    borderLeftWidth: 0,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    minHeight: 20,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  textInput: {
    fontSize: 16,
    color: COLORS.textPrimary,
    paddingVertical: 4,
    backgroundColor: 'transparent',
    minHeight: 20,
    textAlignVertical: 'center',
  },
  codeText: {
    fontSize: 16,
    color: COLORS.textPrimary,
    paddingVertical: 4,
    backgroundColor: 'transparent',
    minHeight: 20,
    textAlignVertical: 'center',
  },
  flagButton: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 16,
    minHeight: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: 60, // Ensure flag button has proper width
 
  },
  countryPickerButton: {
    // backgroundColor: COLORS.primary,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 16,
    minHeight: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: 60, // Ensure country picker button has proper width
  },
});

export default PhoneNumInput;
