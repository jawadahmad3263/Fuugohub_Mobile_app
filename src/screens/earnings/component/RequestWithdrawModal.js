import { StyleSheet, Text, View, TextInput, TouchableOpacity, Modal } from 'react-native'
import React, { useState } from 'react'
import Style from '../../../style/Style'
import COLORS from '../../../style/colors'

const RequestWithdrawModal = ({ visible, onClose, onRequest }) => {
  const [coinsToWithdraw, setCoinsToWithdraw] = useState('')
  
  const estimatedUSD = coinsToWithdraw ? (parseInt(coinsToWithdraw) / 100).toFixed(2) : '0.00'
  
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Request Withdraw</Text>
            
            <View style={styles.infoSection}>
              <Text style={styles.infoText}>You have: 10000 Coins</Text>
              <Text style={styles.infoText}>Conversion Rate: 100 Coins = $1.00</Text>
            </View>
            
            <View style={styles.inputSection}>
              <Text style={styles.inputLabel}>Coins to withdraw</Text>
              <TextInput
                style={styles.textInput}
                value={coinsToWithdraw}
                onChangeText={setCoinsToWithdraw}
                placeholder="00"
                keyboardType="numeric"
                placeholderTextColor={COLORS.textSecondary}
              />
            </View>
            
            <View style={styles.estimatedSection}>
              <View style={styles.infoIcon}>
                <Text style={styles.infoIconText}>i</Text>
              </View>
              <Text style={styles.estimatedText}>Estimated USD: ${estimatedUSD}</Text>
            </View>
            
            <View style={styles.buttonSection}>
              <TouchableOpacity 
                style={styles.requestButton}
                onPress={() => onRequest && onRequest(coinsToWithdraw)}
              >
                <Text style={styles.requestButtonText}>Request</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.cancelButton}
                onPress={onClose}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default RequestWithdrawModal

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    maxWidth: 350,
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 24,
    ...Style.cardShadow,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: 20,
  },
  infoSection: {
    marginBottom: 20,
  },
  infoText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 8,
  },
  inputSection: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: COLORS.textPrimary,
  },
  estimatedSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  infoIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: COLORS.textSecondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  infoIconText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  estimatedText: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  buttonSection: {
    gap: 12,
  },
  requestButton: {
    backgroundColor: '#2C2C2C',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  requestButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: COLORS.textPrimary,
    fontSize: 16,
    fontWeight: '500',
  },
})