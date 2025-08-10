import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, FlatList, Image } from 'react-native';
import Style from '../../../style/Style';
import COLORS from '../../../style/colors';
import Spacing from '../../../components/common/Spacing';
import FollowingsTab from '../../profile/components/FollowingsTab';

const FollowersTab = () => {
  const SAMPLE_FOLLOWERS = [
    {
      id: '1',
      name: 'Selina Boyer',
      role: 'Project Coordinator',
      avatar: 'https://i.pravatar.cc/100?img=5',
    },
    {
      id: '2',
      name: 'Aspen Schmitt',
      role: 'Legal Counsel',
      avatar: 'https://i.pravatar.cc/100?img=52',
    },
    {
      id: '3',
      name: 'Kendrick Mays',
      role: 'Product Designer',
      avatar: 'https://i.pravatar.cc/100?img=15',
    },
    {
      id: '4',
      name: 'Aya Patel',
      role: 'Data Analyst',
      avatar: 'https://i.pravatar.cc/100?img=32',
    },
    {
      id: '5',
      name: 'Jonah Klein',
      role: 'iOS Engineer',
      avatar: 'https://i.pravatar.cc/100?img=41',
    },
    {
      id: '6',
      name: 'Mina Park',
      role: 'Marketing Lead',
      avatar: 'https://i.pravatar.cc/100?img=21',
    },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardInner}>
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
        <View style={styles.userMeta}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.role}>{item.role}</Text>
        </View>
        <TouchableOpacity style={styles.menuButton}>
          <Text style={styles.menuEllipsis}>{'\u22EE'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container} showsVerticalScrollIndicator={false}>
         {/* Search and Filter Section */}
         <View style={styles.searchFilterSection}>
        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            placeholderTextColor={COLORS.textSecondary}
          />
        </View>
        
        <View style={[Style.row, Style.alignEnd, Style.justifyEnd]}>
          <TouchableOpacity style={[Style.row, Style.alignCenter, styles.filterButton]}>
            <Text style={[Style.font16, Style.semibold, Style.textPrimary]}>Filters</Text>
            <Text style={styles.filterIcon}>☰</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[Style.row, Style.alignCenter, styles.sortButton]}>
            <Text style={[Style.font16, Style.textSecondary]}>Sort By: </Text>
            <Text style={[Style.font16, Style.semibold, Style.textPrimary]}>Featured</Text>
            <Text style={styles.sortChevron}>⌄</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Spacing/>
      <FlatList
        data={SAMPLE_FOLLOWERS}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        scrollEnabled={false}
        ListFooterComponent={<View style={{ height: 24 }} />}
      />
    </View>
  );
};

export default FollowersTab;

const styles = StyleSheet.create({
  searchFilterSection: {
    backgroundColor: COLORS.white,
    ...Style.hpadding,
    paddingVertical: 16,
    marginBottom: 1,
  },
  searchBar: {
    ...Style.row,
    ...Style.alignCenter,
    backgroundColor: COLORS.white,
    ...Style.border,
    ...Style.rounded8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    ...Style.marginBottom16,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
    color: COLORS.textSecondary,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: COLORS.textPrimary,
  },
  filterIcon: {
    fontSize: 18,
    marginLeft: 6,
    color: COLORS.textPrimary,
  },
  filterButton: {
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  sortButton: {
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  sortChevron: {
    fontSize: 16,
    color: COLORS.textSecondary,
  },

  listContent: {
    paddingBottom: 8,
    paddingHorizontal:16,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    marginBottom: 16,
    marginHorizontal:5,
    // iOS shadow
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 6 },
    // Android
    elevation: 3,
  },
  cardInner: {
    paddingVertical: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 92,
    height: 92,
    borderRadius: 46,
    marginBottom: 16,
  },
  userMeta: {
    alignItems: 'center',
  },
  name: {
    fontSize: 16,
    color: COLORS.textPrimary,
    ...Style.semibold,
    marginBottom: 6,
  },
  role: {
    fontSize: 14,
    color: COLORS.textSecondary,
    ...Style.light
  },
  menuButton: {
    position: 'absolute',
    right: 16,
    top: 16,
    padding: 4,
  },
  menuEllipsis: {
    fontSize: 20,
    color: COLORS.textSecondary,
  },
});
