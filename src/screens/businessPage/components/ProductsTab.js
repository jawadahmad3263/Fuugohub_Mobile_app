import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, Image } from 'react-native';
import Style from '../../../style/Style';
import COLORS from '../../../style/colors';
import Spacing from '../../../components/common/Spacing';

const ProductsTab = ({ListHeaderComponent}) => {
  const products = [
    {
      id: 1,
      name: 'Urban Explorer Sneakers',
      description: 'Lorem ipsum is a dummy or placeholder text commonly used in graphic design, publishing, and web development.',
      originalPrice: '$42.30',
      currentPrice: '$35.71',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop'
    },
    {
      id: 2,
      name: 'Wireless Bluetooth Headphones',
      description: 'Lorem ipsum is a dummy or placeholder text commonly used in graphic design, publishing, and web development.',
      originalPrice: '$89.99',
      currentPrice: '$67.50',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop'
    },
    {
      id: 3,
      name: 'Smart Fitness Watch',
      description: 'Lorem ipsum is a dummy or placeholder text commonly used in graphic design, publishing, and web development.',
      originalPrice: '$199.99',
      currentPrice: '$149.99',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop'
    },
    {
      id: 4,
      name: 'Premium Coffee Maker',
      description: 'Lorem ipsum is a dummy or placeholder text commonly used in graphic design, publishing, and web development.',
      originalPrice: '$299.99',
      currentPrice: '$249.99',
      image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400&h=300&fit=crop'
    },
    {
      id: 5,
      name: 'Designer Backpack',
      description: 'Lorem ipsum is a dummy or placeholder text commonly used in graphic design, publishing, and web development.',
      originalPrice: '$79.99',
      currentPrice: '$59.99',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop'
    }
  ];

  const renderProductItem = ({ item }) => (
    <View style={styles.productCard}>
      {/* Product Image */}
      <View style={styles.productImageContainer}>
        <Image source={{ uri: item.image }} style={styles.productImage} />
      </View>
      
      {/* Product Info */}
      <View style={styles.productInfo}>
        <Text style={[Style.font18, Style.bold, Style.textPrimary, styles.productName]}>
          {item.name}
        </Text>
        <Text style={[Style.font14, Style.textSecondary, styles.productDescription]}>
          {item.description}
        </Text>
        
        {/* Pricing */}
        <View style={styles.pricingContainer}>
          <Text style={[Style.font16, Style.textSecondary, styles.originalPrice]}>
            {item.originalPrice}
          </Text>
          <Text style={[Style.font18, Style.bold, Style.textPrimary, styles.currentPrice]}>
            {item.currentPrice}
          </Text>
        </View>
      </View>
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
        
        <View style={[Style.row, Style.alignEnd, Style.justifyEnd ]}>
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

      {/* Products List */}
      <FlatList
        data={products}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.productsList}
        style={styles.flatList}
         
        ListFooterComponent={<Spacing val={100}/>}
      />
    </View>
  );
};

export default ProductsTab;

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
  sortValue: {
    marginRight: 4,
  },
  sortChevron: {
    fontSize: 16,
    color: COLORS.textSecondary,
  },
  flatList: {
    flex: 1,
  },
  productsList: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  productCard: {
    backgroundColor: COLORS.white,
    ...Style.rounded12,
    marginBottom: 16,
    // overflow: 'hidden',
    ...Style.cardShadow,
    marginHorizontal:12,

    paddingHorizontal:10,
    paddingVertical:10
  },
  productImageContainer: {
    height: 332,
    backgroundColor: COLORS.lightGray,
    ...Style.center,
    objectFit:'cover',
    borderRadius:12,
    overflow:'hidden'
   
  },
  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  productInfo: {
    padding: 16,
  },
  productName: {
    marginBottom: 8,
  },
  productDescription: {
    lineHeight: 20,
    ...Style.marginBottom16,
  },
  pricingContainer: {
    ...Style.row,
    ...Style.alignCenter,
    gap: 8,
  },
  originalPrice: {
    textDecorationLine: 'line-through',
  },
  currentPrice: {
    // Styles already applied via Style.js
  },
});
