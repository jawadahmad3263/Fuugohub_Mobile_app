import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Style from '../../../style/Style';
import COLORS from '../../../style/colors';

const OthersTab = () => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Description Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.descriptionText}>
          Unlock Your Potential with Every Rep 💪{'\n\n'}
          Welcome to your ultimate fitness destination! Whether you're a beginner or a seasoned athlete, we're here to guide you on your journey to strength, stamina, and self-confidence. From expert workouts and personalized plans to nutrition tips and motivation — this is more than just fitness. It's a lifestyle.
        </Text>
        
        <View style={styles.featuresContainer}>
          <Text style={styles.featureItem}>🔥 Workout Routines</Text>
          <Text style={styles.separator}> | </Text>
          <Text style={styles.featureItem}>🌳 Healthy Living</Text>
          <Text style={styles.separator}> | </Text>
          <Text style={styles.featureItem}>💥 Transformation Stories</Text>
        </View>
      </View>

      {/* Address Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Address</Text>
        
        <View style={styles.addressItem}>
          <Text style={styles.addressLabel}>City</Text>
          <Text style={styles.addressValue}>Mountain view</Text>
        </View>
        
        <View style={styles.addressItem}>
          <Text style={styles.addressLabel}>State</Text>
          <Text style={styles.addressValue}>California</Text>
        </View>
        
        <View style={styles.addressItem}>
          <Text style={styles.addressLabel}>Zip code</Text>
          <Text style={styles.addressValue}>124721</Text>
        </View>
        
        <View style={styles.addressItem}>
          <Text style={styles.addressLabel}>Country</Text>
          <Text style={styles.addressValue}>United states</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default OthersTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    ...Style.font20,
    ...Style.semibold,
    color: COLORS.textPrimary,
    marginBottom: 16,
  },
  descriptionText: {
    ...Style.font16,
    lineHeight: 24,
    color: COLORS.textPrimary,
    marginBottom: 20,
  },
  featuresContainer: {
    ...Style.row,
    ...Style.alignCenter,
    flexWrap: 'wrap',
  },
  featureItem: {
    ...Style.font16,
    color: COLORS.textPrimary,
  },
  separator: {
    ...Style.font16,
    color: COLORS.textSecondary,
    marginHorizontal: 8,
  },
  addressItem: {
    ...Style.row,
    ...Style.justifyBetween,
    ...Style.alignCenter,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
  },
  addressLabel: {
    fontSize: 14,
    color: COLORS.textSecondary,
    ...Style.medium
  },
  addressValue: {
    ...Style.font16,
    color: COLORS.textPrimary,
    ...Style.semibold
  },
});
