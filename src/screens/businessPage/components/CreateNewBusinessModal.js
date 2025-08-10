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

const CreateNewBusinessModal = ({ visible, onClose, onCreate }) => {
  const [businessName, setBusinessName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [storeProvider, setStoreProvider] = useState('Amazon');
  const [storeUrl, setStoreUrl] = useState('https://www.amazon.com/s?k=a+ma...');
  const [businessAddress, setBusinessAddress] = useState('');

  const handleCreate = () => {
    if (onCreate) {
      onCreate({ businessName, description, category, storeProvider, storeUrl, businessAddress });
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
            <Text style={styles.title}>Create a New Business Page</Text>

            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.fieldGroup}>
                <Text style={styles.label}>Name</Text>
                <TextInput
                  value={businessName}
                  onChangeText={setBusinessName}
                  placeholder="Enter your Page name"
                  placeholderTextColor={COLORS.textSecondary}
                  style={styles.input}
                />
              </View>

              <View style={styles.fieldGroup}>
                <Text style={styles.label}>Description</Text>
                <TextInput
                  value={description}
                  onChangeText={setDescription}
                  placeholder="Describe your Business"
                  placeholderTextColor={COLORS.textSecondary}
                  style={[styles.input, styles.multiline]}
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                />
              </View>

              <View style={styles.fieldGroup}>
                <Text style={styles.label}>Category</Text>
                <View style={styles.dropdown}>
                  <Text style={styles.dropdownText}>{category || 'Select category'}</Text>
                  <Text style={styles.dropdownChevron}>⌄</Text>
                </View>
              </View>

              <View style={styles.fieldGroup}>
                <Text style={styles.label}>Store links</Text>

                <View style={styles.storeLinkRow}>
                  <View style={styles.storeProviderDropdown}>
                    <View style={styles.storeIcon}>
                      <Text style={{color:COLORS.white}}>a</Text>
                    </View>
                    <Text style={styles.storeProviderText}>{storeProvider}</Text>
                    <Text style={styles.dropdownChevron}>⌄</Text>
                  </View>
                  <TouchableOpacity style={styles.deleteIcon}>
                    <Text style={styles.deleteIconText}>🗑️</Text>
                  </TouchableOpacity>
                </View>

                <TextInput
                  value={storeUrl}
                  onChangeText={setStoreUrl}
                  placeholder="https://www.amazon.com/s?k=a+ma..."
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

              <View style={styles.fieldGroup}>
                <Text style={styles.label}>Business Address</Text>
                <TextInput
                  value={businessAddress}
                  onChangeText={setBusinessAddress}
                  placeholder="--"
                  placeholderTextColor={COLORS.textSecondary}
                  style={styles.input}
                />
              </View>

              <View style={styles.actions}>
                <TouchableOpacity style={styles.primaryCta} onPress={handleCreate}>
                  <Text style={styles.primaryCtaText}>Create</Text>
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

export default CreateNewBusinessModal;

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    alignItems: 'center',
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
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
    color: COLORS.textPrimary,
    fontSize: 16,
  },
  multiline: {
    minHeight: 140,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropdownText: {
    color: COLORS.textSecondary,
    fontSize: 16,
  },
  dropdownChevron: {
    color: COLORS.textSecondary,
    fontSize: 16,
  },
  storeLinkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  storeProviderDropdown: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  storeIcon: {
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
  storeProviderText: {
    flex: 1,
    color: COLORS.textPrimary,
    fontSize: 16,
  },
  deleteIcon: {
    padding: 8,
  },
  deleteIconText: {
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
    backgroundColor: '#2C2C2C',
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
  closeIcon: {
    fontSize: 24,
    color: COLORS.textPrimary,
  },
});