import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import COLORS from '../../../style/colors';
import PrimaryButton from '../../../components/common/PrimaryButton';

const AddProductModal = ({ visible, onClose, onAdd }) => {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [storeProvider, setStoreProvider] = useState('Amazon');
  const [storeUrl, setStoreUrl] = useState('');

  const handleAdd = () => {
    if (onAdd) {
      onAdd({ productName, price, description, storeProvider, storeUrl });
    }
    onClose && onClose();
  };

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={styles.backdrop}>
        <KeyboardAvoidingView
          behavior={Platform.select({ ios: 'padding', android: undefined })}
          style={styles.kav}
        >
          <View style={styles.sheet}>
            <Text style={styles.title}>Add Product</Text>

            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.fieldGroup}>
                <Text style={styles.label}>Product name</Text>
                <TextInput
                  value={productName}
                  onChangeText={setProductName}
                  placeholder="--"
                  placeholderTextColor={COLORS.textSecondary}
                  style={styles.input}
                />
              </View>

              <View style={styles.fieldGroup}>
                <Text style={styles.label}>Price</Text>
                <TextInput
                  value={price}
                  onChangeText={setPrice}
                  placeholder="12"
                  keyboardType="decimal-pad"
                  placeholderTextColor={COLORS.textSecondary}
                  style={styles.input}
                />
              </View>

              <View style={styles.fieldGroup}>
                <Text style={styles.label}>Description</Text>
                <TextInput
                  value={description}
                  onChangeText={setDescription}
                  placeholder="Lorem ipsum is a dummy text"
                  placeholderTextColor={COLORS.textSecondary}
                  style={[styles.input, styles.multiline]}
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                />
              </View>

              <View style={styles.fieldGroup}>
                <Text style={styles.label}>Product Images & videos</Text>
                <TouchableOpacity style={styles.uploadRow}>
                  <Text style={styles.uploadPlus}>＋</Text>
                  <Text style={styles.uploadText}>Upload images or videos</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.fieldGroup}>
                <Text style={styles.label}>Store links</Text>

                <View style={styles.dropdown}>
                  <Text style={styles.dropdownLeftIcon}>a</Text>
                  <Text style={styles.dropdownText}>{storeProvider}</Text>
                  <Text style={styles.dropdownChevron}>⌄</Text>
                </View>

                <TextInput
                  value={storeUrl}
                  onChangeText={setStoreUrl}
                  placeholder="https://www.amazon.com/s?k=a+m..."
                  placeholderTextColor={COLORS.textSecondary}
                  style={[styles.input, { marginTop: 12 }]}
                  autoCapitalize="none"
                  autoCorrect={false}
                />

                <TouchableOpacity style={styles.addMoreRow}>
                  <Text style={styles.addMorePlus}>＋</Text>
                  <Text style={styles.addMoreText}>Add More</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.actions}>
                <TouchableOpacity style={styles.primaryCta} onPress={handleAdd}>
                  <Text style={styles.primaryCtaText}>Add</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.secondaryCta} onPress={onClose}>
                  <Text style={styles.secondaryCtaText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};

export default AddProductModal;

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
   alignItems:'center',
    paddingHorizontal: 16,
  },
  sheet: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 20,
    maxHeight: '80%',
    width: '92%',
  },
  kav: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: 12,
  },
  fieldGroup: {
    marginTop: 12,
  },
  label: {
    fontSize: 14,
    color: COLORS.textPrimary,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E6E7EA',
    // backgroundColor: '#F7F8FA',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
    color: COLORS.textPrimary,
    fontSize: 16,
  },
  multiline: {
    minHeight: 140,
  },
  uploadRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },
  uploadPlus: {
    fontSize: 24,
    color: COLORS.buttonPrimary,
    marginRight: 10,
  },
  uploadText: {
    fontSize: 13,
    color: COLORS.buttonPrimary,
    fontWeight: '600',
  },
  dropdown: {
    marginTop: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
   
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dropdownLeftIcon: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#111',
    color: '#fff',
    textAlign: 'center',
    textAlignVertical: 'center',
    marginRight: 10,
    fontSize: 12,
    includeFontPadding: false,
  },
  dropdownText: {
    flex: 1,
    color: COLORS.textPrimary,
    fontSize: 16,
  },
  dropdownChevron: {
    color: COLORS.textSecondary,
    fontSize: 16,
  },
  addMoreRow: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  addMorePlus: {
    fontSize: 22,
    color: COLORS.buttonPrimary,
    marginRight: 8,
  },
  addMoreText: {
    fontSize: 13,
    color: COLORS.buttonPrimary,
    fontWeight: '600',
  },
  actions: {
    marginTop: 18,
  },
  primaryCta: {
    backgroundColor: COLORS.textPrimary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryCtaText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '600',
  },
  secondaryCta: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#E6E7EA',
    backgroundColor: COLORS.white,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  secondaryCtaText: {
    color: COLORS.textPrimary,
    fontSize: 14,
    fontWeight: '600',
  },
});


