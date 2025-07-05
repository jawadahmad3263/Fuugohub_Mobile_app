import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import DropdownIcon from "../../assets/svg/drop-down.svg";
import COLORS from "../../style/colors";

const PhoneNumberInput = ({
  value,
  onChangeText,
  label = "Phone number",
  placeholder = "212 456 7890",
  countryCode = "+33",
  countryFlag = "🇫🇷",
  onCountryPress,
}) => {
  return (
    <View style={styles.container}>
      {/* Label */}
      <Text style={styles.label}>{label}</Text>

      {/* Input Container */}
      <View style={styles.inputContainer}>
        {/* Country Code Selector */}
        <TouchableOpacity
          style={styles.countrySelector}
          onPress={onCountryPress}
          activeOpacity={0.7}
        >
          <Text style={styles.flag}>{countryFlag}</Text>
          <DropdownIcon />
        </TouchableOpacity>

        {/* Phone Number Input */}
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#97a3b4"
          keyboardType="phone-pad"
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#020817",
    marginBottom: 12,
  },
  inputContainer: {
    flexDirection: "row",
    gap: 5,
    borderColor: "#cdd7e5",
    borderWidth: 1,
    borderRadius: 12,
    padding: 5,
  },
  countrySelector: {
    flexDirection: "row",
    alignItems: "center",

    // borderWidth: 1,
    // borderColor: "#cdd7e5",
    // borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 16,
    gap: 8,
    minWidth: 70,
    justifyContent: "center",
  },
  flag: {
    fontSize: 18,
    lineHeight: 18,
  },
  dropdown: {
    color: "#97a3b4",
    fontSize: 12,
    lineHeight: 12,
  },
  input: {
    flex: 1,

    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    color: "#000",
    fontWeight: "400",
  },
});

export default PhoneNumberInput;
