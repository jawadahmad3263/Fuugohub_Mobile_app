import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Style from '../../../style/Style';
import COLORS from '../../../style/colors';

const DropsTab = () => {
  const drops = [
    {
      id: 1,
      title: 'Summer Collection 2024',
      status: 'Live',
      views: '5.2K',
      likes: '3.8K',
      engagement: '89%',
      endDate: '2 days left'
    },
    {
      id: 2,
      title: 'Tech Gadgets Drop',
      status: 'Scheduled',
      views: '2.1K',
      likes: '1.5K',
      engagement: '76%',
      endDate: '5 days left'
    },
    {
      id: 3,
      title: 'Fashion Week Special',
      status: 'Ended',
      views: '8.7K',
      likes: '6.2K',
      engagement: '92%',
      endDate: 'Ended'
    }
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Drops</Text>
        <Text style={styles.headerSubtitle}>Your business drops and campaigns</Text>
      </View>
      
      {drops.map((drop) => (
        <View key={drop.id} style={styles.dropCard}>
          <View style={styles.dropHeader}>
            <Text style={styles.dropTitle}>{drop.title}</Text>
            <View style={[
              styles.statusBadge,
              { backgroundColor: getStatusColor(drop.status) }
            ]}>
              <Text style={styles.statusText}>{drop.status}</Text>
            </View>
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
              <Text style={styles.statLabel}>Engagement</Text>
              <Text style={styles.statValue}>{drop.engagement}</Text>
            </View>
          </View>
          
          <View style={styles.dropFooter}>
            <Text style={styles.endDateText}>{drop.endDate}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const getStatusColor = (status) => {
  switch (status) {
    case 'Live':
      return COLORS.success;
    case 'Scheduled':
      return COLORS.warning;
    case 'Ended':
      return COLORS.textSecondary;
    default:
      return COLORS.lightGray;
  }
};

export default DropsTab;

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
  dropCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    ...Style.cardShadow,
  },
  dropHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  dropTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
    flex: 1,
    marginRight: 12,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.white,
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
  dropFooter: {
    borderTopWidth: 1,
    borderTopColor: COLORS.borderLight,
    paddingTop: 12,
  },
  endDateText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
});
