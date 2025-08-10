import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, TextInput, TouchableOpacity } from 'react-native';
import Style from '../../../style/Style';
import COLORS from '../../../style/colors';
import Spacing from '../../../components/common/Spacing';

const DropsTab = () => {
  const drops = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&h=400&fit=crop'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&h=400&fit=crop'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&h=400&fit=crop'
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&h=400&fit=crop'
    }
  ];

  const renderDropItem = ({ item }) => (
    <View style={styles.dropCard}>
      <Image source={{ uri: item.image }} style={styles.dropImage} />
    </View>
  );

  return (
    <View style={styles.container}>
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

      {/* Drops Grid List */}
      <FlatList
        data={drops}
        renderItem={renderDropItem}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.dropsList}
        style={styles.flatList}
        numColumns={2}
        columnWrapperStyle={styles.row}
        ListFooterComponent={<Spacing val={100}/>}
      />
    </View>
  );
};

export default DropsTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
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
  flatList: {
    flex: 1,
  },
  dropsList: {
    paddingHorizontal: 16,
    paddingTop: 16,
    
  },
  row: {
    justifyContent: 'space-between',
  },
  dropCard: {
    backgroundColor: COLORS.white,
   
    marginBottom: 16,
    ...Style.cardShadow,
    marginHorizontal: 6,
    width: '47%',
    overflow: 'hidden',
  },
  dropImage: {
    width: '100%',
    height: 285,
    resizeMode: 'cover',
  },
});
