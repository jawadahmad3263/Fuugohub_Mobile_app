import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  StyleSheet,
  Image,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import COLORS from "../../style/colors";
import PrimaryButton from "../../components/common/PrimaryButton";
import Style from "../../style/Style";
import SecondaryButton from "../../components/common/SecondaryButton";
import { AUTH_SCREENS } from "../../navigation/screens";

const UserPreferences = ({navigation}) => {
  const [selectedPreferences, setSelectedPreferences] = useState([]);

  const preferences = [
    "Fashion & Style",
    "Beauty & Makeup",
    "Fitness & Workout",
    "Food & Recipes",
    "Travel & Adventure",
    "Home Decor",
    "Life Hacks",
    "DIY & Crafts",
    "Motivation & Productivity",
  ];

  const togglePreference = (preference) => {
    setSelectedPreferences((prev) =>
      prev.includes(preference)
        ? prev.filter((p) => p !== preference)
        : [...prev, preference]
    );
  };

  const handleNext = () => {
  navigation.navigate(AUTH_SCREENS.IMAGE_UPLOAD.name)
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.logoContainer}>
          <Image
            source={require("../../assets/images/login-logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <View style={styles.stepContainer}>
          <Text style={styles.stepIndicator}>Step 2 of 3</Text>
          <Text style={styles.title}>User Preferences</Text>
          <Text style={styles.subtitle}>
            Please verify your age so we can tailor your FuugoHub{"\n"}
            experience with content and features that match your{"\n"}
            age group.
          </Text>
        </View>

        <View style={styles.preferencesContainer}>
          <View style={styles.preferencesGrid}>
            {preferences.map((preference, index) => (
              <TouchableOpacity
                key={preference}
                style={[
                  styles.preferenceButton,
                  selectedPreferences.includes(preference) &&
                    styles.preferenceButtonSelected,
                ]}
                onPress={() => togglePreference(preference)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.preferenceText,
                    selectedPreferences.includes(preference) &&
                      styles.preferenceTextSelected,
                  ]}
                >
                  {preference}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Buttons */}
      <View style={styles.bottomButtons}>
        <View style={[{ width: "48%" }]}>
          <PrimaryButton
            colors={[COLORS.white, COLORS.white]}
            title={"Previous"}
            style={[Style.nextButton, Style.border]}
            textStyle={[Style.textPrimary, Style.font18]}
            onPress={handleNext}
          />
        </View>
        <View style={[{ width: "48%" }]}>
          <PrimaryButton
            title={"Next"}
            style={[Style.nextButton]}
            textStyle={[Style.nextButtonText]}
            onPress={handleNext}
          ></PrimaryButton>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingTop: 36,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100, // Space for bottom buttons
  },
  statusBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  time: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000",
  },
  statusIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  signalDots: {
    flexDirection: "row",
    gap: 4,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
  },
  activeDot: {
    backgroundColor: "#000",
  },
  inactiveDot: {
    backgroundColor: "#d1d5db",
  },
  signal: {
    marginLeft: 8,
    fontSize: 14,
  },
  wifi: {
    fontSize: 14,
  },
  battery: {
    width: 24,
    height: 12,
    backgroundColor: "#000",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 2,
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 32,
    marginTop: 16,
  },
  logoGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  logoIconContainer: {
    position: "relative",
  },
  logoIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  logoEmoji: {
    color: "#fff",
    fontSize: 14,
  },
  logoOverlay: {
    position: "absolute",
    top: -4,
    right: -4,
    width: 16,
    height: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  logoOverlayEmoji: {
    color: "#fff",
    fontSize: 8,
  },
  brandName: {
    fontSize: 24,
    fontWeight: "700",
    color: "#000",
  },
  stepContainer: {
    alignItems: "center",
    marginBottom: 40,
    paddingHorizontal: 24,
  },
  stepIndicator: {
    color: "#f97413",
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#020817",
    marginBottom: 12,
  },
  subtitle: {
    color: "#97a3b4",
    fontSize: 14,
    lineHeight: 22,
    textAlign: "center",
  },
  preferencesContainer: {
    paddingHorizontal: 24,
    marginBottom: 40,
  },
  preferencesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    justifyContent: "center",
  },
  preferenceButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginBottom: 8,
  },
  preferenceButtonSelected: {
    backgroundColor: "#f97413",
    borderColor: "#f97413",
  },
  preferenceText: {
    fontSize: 16,
    fontWeight: "400",
    color: "#374151",
  },
  preferenceTextSelected: {
    color: "#fff",
    fontWeight: "500",
  },
  bottomButtons: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  previousButton: {
    flex: 1,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  previousButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#374151",
  },
  nextButtonWrapper: {
    flex: 1,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  nextButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  nextButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  logo: {
    width: 192,
    height: 44.5,
    marginTop: 12,
    marginBottom: 8,
  },
});

export default UserPreferences;
