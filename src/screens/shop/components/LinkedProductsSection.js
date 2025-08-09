import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import COLORS from '../../../style/colors';
import PrimaryButton from '../../../components/common/PrimaryButton';

const Dropdown = ({ label }) => (
  <View style={styles.dropdown}>
    <Text style={styles.dropdownText}>{label}</Text>
    <Text style={styles.dropdownIcon}>⌄</Text>
  </View>
);

const LinkedRow = ({ label = 'Earbuds' }) => (
  <View style={styles.linkedRow}>
    <Text style={styles.linkedLabel}>{label}</Text>
    <View style={styles.linkedRight}>
      <View style={styles.linkedBadge}>
        <Text style={styles.linkedBadgeText}>Linked</Text>
      </View>
      <TouchableOpacity style={styles.deleteButton}>
        <Text style={styles.deleteIcon}>🗑</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const LinkedProductsSection = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Linked Products to Drops</Text>

      <Text style={styles.fieldLabel}>Select Product</Text>
      <Dropdown label="Earbuds" />

      <Text style={[styles.fieldLabel, { marginTop: 14 }]}>Select Drop</Text>
      <Dropdown label="Unbox Drop" />

      <PrimaryButton textStyle={styles.linkButtonText} title={'Link'} />

      <LinkedRow />
      <LinkedRow />
      <LinkedRow />
      <LinkedRow />
    </View>
  );
};

export default LinkedProductsSection;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    marginTop: 16,
    // iOS shadow
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    // Android
    elevation: 1,
  },
  heading: {
    fontSize: 20,
    color: COLORS.textPrimary,
    fontWeight: '700',
    marginBottom: 12,
  },
  fieldLabel: {
    fontSize: 14,
    color: COLORS.textPrimary,
    fontWeight: '700',
    marginBottom: 8,
  },
  dropdown: {
    backgroundColor: '#F6F7F9',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#E6E7EA',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropdownText: {
    color: COLORS.textSecondary,
    fontSize: 14,
  },
  dropdownIcon: {
    color: COLORS.textSecondary,
    fontSize: 16,
  },
  linkButton: {
    marginTop: 16,
    marginBottom: 8,
    backgroundColor: '#f08a46',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  linkButtonText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  linkedRow: {
    marginTop: 12,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#E6E7EA',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  linkedLabel: {
    fontSize: 16,
    color: COLORS.textPrimary,
    fontWeight: '600',
  },
  linkedRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  linkedBadge: {
    backgroundColor: '#D1FBE3',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    marginRight: 10,
  },
  linkedBadgeText: {
    color: '#16A34A',
    fontWeight: '700',
    fontSize: 12,
  },
  deleteButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  deleteIcon: {
    fontSize: 16,
    color: '#ef4444',
  },
});


