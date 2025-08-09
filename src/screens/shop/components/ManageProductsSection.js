import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ProductCard from './ProductCard';
import COLORS from '../../../style/colors';

const ManageProductsSection = ({ onPressAdd }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Manage Products</Text>

      <ProductCard />
      <ProductCard />
      <ProductCard />

      <TouchableOpacity style={styles.addButton} onPress={onPressAdd}>
        <Text style={styles.addButtonText}>Add Product</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ManageProductsSection;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 12,
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
    fontSize: 21,
    color: COLORS.textPrimary,
    fontWeight: '700',
    marginBottom: 8,
    paddingHorizontal: 6,
  },
  addButton: {
    marginTop: 8,
    backgroundColor: COLORS.buttonPrimary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 6,
  },
  addButtonText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
});


