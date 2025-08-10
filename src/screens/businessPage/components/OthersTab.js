import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import Style from '../../../style/Style';
import COLORS from '../../../style/colors';

const OthersTab = () => {
  const otherItems = [
    {
      id: 1,
      title: 'Business Analytics',
      description: 'View detailed insights about your business performance',
      icon: '📊',
      action: 'View Analytics'
    },
    {
      id: 2,
      title: 'Settings & Preferences',
      description: 'Manage your business page settings and preferences',
      icon: '⚙️',
      action: 'Configure'
    },
    {
      id: 3,
      title: 'Help & Support',
      description: 'Get help and contact customer support',
      icon: '❓',
      action: 'Get Help'
    },
    {
      id: 4,
      title: 'Business Verification',
      description: 'Verify your business to unlock additional features',
      icon: '✅',
      action: 'Verify Now'
    }
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Other Options</Text>
        <Text style={styles.headerSubtitle}>Additional business tools and settings</Text>
      </View>
      
      {otherItems.map((item) => (
        <TouchableOpacity key={item.id} style={styles.itemCard}>
          <View style={styles.itemHeader}>
            <View style={styles.iconContainer}>
              <Text style={styles.itemIcon}>{item.icon}</Text>
            </View>
            <View style={styles.itemInfo}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemDescription}>{item.description}</Text>
            </View>
          </View>
          
          <View style={styles.itemAction}>
            <Text style={styles.actionText}>{item.action}</Text>
            <Text style={styles.arrowIcon}>→</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default OthersTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  header: {
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  itemCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    ...Style.cardShadow,
  },
  itemHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.lightGray,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  itemIcon: {
    fontSize: 24,
  },
  itemInfo: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  itemAction: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.borderLight,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.buttonPrimary,
  },
  arrowIcon: {
    fontSize: 16,
    color: COLORS.buttonPrimary,
    fontWeight: 'bold',
  },
});
