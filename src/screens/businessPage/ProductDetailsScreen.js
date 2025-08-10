import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Style from '../../style/Style'
import Header from '../../components/common/Header'
import Spacing from '../../components/common/Spacing'
import COLORS from '../../style/colors'

const ProductDetailsScreen = ({ navigation }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const totalImages = 5;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % totalImages);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + totalImages) % totalImages);
  };

  return (
    <View style={[Style.container]}>
    <Spacing val={10}/>
      <Header 
        title="Page" 
        showBackButton={true} 
        onBackPress={() => navigation.goBack()}
        showBreadcrumb={true}
        breadcrumbText="Home • AE 24/7 Active Hoodie With Gaiter"
        showNotification={true}
        notificationCount={1}
        showSettings={true}
        showProfile={true}
      />
      
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Product Image Section */}
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop&crop=center' }}
            style={styles.productImage}
            resizeMode="cover"
          />
          
          {/* Image Navigation Overlay */}
          <View style={styles.imageNavigation}>
            <TouchableOpacity onPress={prevImage} style={styles.navButton}>
              <Text style={styles.navButtonText}>‹</Text>
            </TouchableOpacity>
            <Text style={styles.imageCounter}>{currentImageIndex + 1}/{totalImages}</Text>
            <TouchableOpacity onPress={nextImage} style={styles.navButton}>
              <Text style={styles.navButtonText}>›</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.contentContainer}>
          {/* Product Name */}
          <Text style={styles.productName}>Urban Explorer Sneakers</Text>
          
          {/* Pricing */}
          <View style={styles.pricingContainer}>
            <Text style={styles.originalPrice}>$93.10</Text>
            <Text style={styles.currentPrice}>$63.61</Text>
          </View>
          
          {/* Description */}
          <Text style={styles.description}>
            Featuring the original ripple design inspired by Japanese bullet trains, the Nike Air Max 97 lets you push your style full-speed ahead.
          </Text>

          {/* Product Details Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Product details</Text>
            <View style={styles.bulletList}>
              <View style={styles.bulletItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.bulletText}>The foam sockliner feels soft and comfortable</Text>
              </View>
              <View style={styles.bulletItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.bulletText}>Pull tab</Text>
              </View>
              <View style={styles.bulletItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.bulletText}>Not intended for use as Personal Protective Equipment</Text>
              </View>
              <View style={styles.bulletItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.bulletText}>Colour Shown: White/Black/Oxygen Purple/Action Grape</Text>
              </View>
              <View style={styles.bulletItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.bulletText}>Style: 921826-109</Text>
              </View>
              <View style={styles.bulletItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.bulletText}>Country/Region of Origin: China</Text>
              </View>
            </View>
          </View>

          {/* Benefits Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Benefits</Text>
            <View style={styles.bulletList}>
              <View style={styles.bulletItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.bulletText}>Mesh and synthetic materials on the upper keep the fluid look of the OG while adding comfort and durability.</Text>
              </View>
              <View style={styles.bulletItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.bulletText}>Originally designed for performance running, the full-length Max Air unit adds soft, comfortable cushioning underfoot.</Text>
              </View>
              <View style={styles.bulletItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.bulletText}>The foam midsole feels springy and soft.</Text>
              </View>
              <View style={styles.bulletItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.bulletText}>The rubber outsole adds traction and durability.</Text>
              </View>
            </View>
          </View>

          {/* Delivery and Returns Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Delivery and returns</Text>
            <Text style={styles.deliveryText}>
              Your order of $200 or more gets free standard delivery.
            </Text>
            <View style={styles.bulletList}>
              <View style={styles.bulletItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.bulletText}>Standard delivered 4-5 Business Days</Text>
              </View>
              <View style={styles.bulletItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.bulletText}>Express delivered 2-4 Business Days</Text>
              </View>
            </View>
            <Text style={styles.deliveryNote}>
              Orders are processed and delivered Monday-Friday (excluding public holidays)
            </Text>
          </View>

          <Spacing val={32} />
        </View>
      </ScrollView>

      {/* View Store Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.viewStoreButton}>
          <Text style={styles.viewStoreButtonText}>View Store</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default ProductDetailsScreen

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  imageContainer: {
    position: 'relative',
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  productImage: {
    width: '100%',
    height: 320,
    borderRadius: 16,
    backgroundColor: COLORS.lightGray,
  },
  imageNavigation: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  navButton: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navButtonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  imageCounter: {
    color: COLORS.white,
    fontSize: 12,
    marginHorizontal: 8,
    fontWeight: '500',
  },
  contentContainer: {
    paddingHorizontal: 16,
    marginTop: 8,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 12,
  },
  pricingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  originalPrice: {
    fontSize: 16,
    color: COLORS.textSecondary,
    textDecorationLine: 'line-through',
  },
  currentPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  description: {
    fontSize: 16,
    color: COLORS.textSecondary,
    lineHeight: 24,
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 12,
  },
  bulletList: {
    gap: 8,
  },
  bulletItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  bullet: {
    fontSize: 16,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  bulletText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 20,
    flex: 1,
  },
  deliveryText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 20,
    marginBottom: 12,
  },
  deliveryNote: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 20,
    marginTop: 12,
    fontStyle: 'italic',
  },
  buttonContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
    paddingTop: 16,
    backgroundColor: COLORS.white,
  },
  viewStoreButton: {
    backgroundColor: COLORS.darkGray,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width:'95%',
    alignSelf:'center'
  },
  viewStoreButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
})