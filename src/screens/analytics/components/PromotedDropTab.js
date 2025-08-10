import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Style from '../../../style/Style';
import COLORS from '../../../style/colors';

const PromotedDropTab = () => {
  const promotedDrops = [
    {
      id: 1,
      name: 'Summer Collection 2024',
      category: 'Fashion',
      views: '2.1K',
      likes: '1.2K',
      comments: '456',
      status: 'Active',
    },
    {
      id: 2,
      name: 'Tech Gadgets Bundle',
      category: 'Electronics',
      views: '1.8K',
      likes: '987',
      comments: '234',
      status: 'Active',
    },
    {
      id: 3,
      name: 'Home Decor Set',
      category: 'Lifestyle',
      views: '1.5K',
      likes: '756',
      comments: '189',
      status: 'Active',
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Promoted Drops</Text>
        <Text style={styles.headerSubtitle}>Your featured promotional content</Text>
      </View>
      
      {promotedDrops.map((drop) => (
        <View key={drop.id} style={styles.dropCard}>
          <View style={styles.dropInfo}>
            <Text style={styles.dropName}>{drop.name}</Text>
            <Text style={styles.dropCategory}>{drop.category}</Text>
          </View>
          
          <View style={styles.dropStats}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Views</Text>
              <Text style={styles.statValue}>{drop.views}</Text>
            </View>
            
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Likes</Text>
              <Text style={styles.statValue}>{drop.likes}</Text>
            </View>
            
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Comments</Text>
              <Text style={styles.statValue}>{drop.comments}</Text>
            </View>
          </View>
          
          <View style={styles.statusContainer}>
            <Text style={styles.statusText}>{drop.status}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  header: {
    marginHorizontal: 16,
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
  dropCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 12,
    ...Style.cardShadow,
  },
  dropInfo: {
    marginBottom: 16,
  },
  dropName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  dropCategory: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  dropStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  statusContainer: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.statusSuccessBackground,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.darkLightGreen,
  },
});

export default PromotedDropTab;
