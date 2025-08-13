import React, { useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import EmailIcon from '../../../assets/svg/mail-icon.svg';
import LocationIcon from '../../../assets/svg/location-black.svg';
import BagIcon from '../../../assets/svg/bag-icon.svg';
import PrimaryButton from '../../../components/common/PrimaryButton';
import Spacing from '../../../components/common/Spacing';
import { Color } from 'react-native/types_generated/Libraries/Animated/AnimatedExports';
import COLORS from '../../../style/colors';
import CreateNewBusinessModal from '../../businessPage/components/CreateNewBusinessModal';
import { APP_SCREENS } from '../../../navigation/screens';
import { useNavigation } from '@react-navigation/native';
import Style from '../../../style/Style';
const MyDropsTab = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigation = useNavigation();
  
  const productImages = [
    {
      imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop',
      name: 'Sneakers'
    },
    {
      imageUrl: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=300&h=300&fit=crop',
      name: 'Lipstick'
    },
    {
      imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop',
      name: 'Watch'
    },
    {
      imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
      name: 'Headphones'
    },
    {
      imageUrl: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=300&fit=crop',
      name: 'Camera'
    },
    {
      imageUrl: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=300&h=300&fit=crop',
      name: 'Sunglasses'
    }
  ];
  const handleCreateBusiness = () => {
    navigation.navigate(APP_SCREENS.BUSINESS_PAGE.name);
    setIsModalVisible(false);
  };
  const handleSetupBusiness = () => {
    // Handle setup business page
    setIsModalVisible(true);
    console.log('Setup business page');
  };

  return (
    <View>
      {/* Follower/Following Counts */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>86.6k</Text>
          <Text style={styles.statLabel}>Follower</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>90.5k</Text>
          <Text style={styles.statLabel}>Following</Text>
        </View>
      </View>

      {/* About Section */}
      <View style={styles.aboutContainer}>
        <Text style={styles.aboutTitle}>About</Text>
        <Text style={styles.aboutText}>
          Tart I love sugar plum I love oat cake. Sweet roll caramels I love jujubes. Topping cake wafer.
        </Text>

        <View style={styles.contactInfo}>
          <View style={styles.contactItem}>
            <LocationIcon width={16} height={16} />
            <Text style={styles.contactText}>USA</Text>
          </View>

          <View style={styles.contactItem}>
            <EmailIcon width={16} height={16} />
            <Text style={styles.contactText}>brown.dejah@parisian.com</Text>
          </View>

          <View style={styles.contactItem}>
            <BagIcon width={16} height={16} />
            <Text style={styles.contactText}>UX Designer at google</Text>
          </View>

          <View style={styles.contactItem}>
            <BagIcon width={16} height={16} />
            <Text style={styles.contactText}>Studied at College of new Jersey</Text>
          </View>
        </View>
      </View>

      {/* Setup Business Button */}
      <PrimaryButton
        title="Setup a Business Page"
        onPress={handleSetupBusiness}
        style={styles.setupBusinessButton}
        textStyle={styles.setupBusinessButtonText}
      />

      {/* Image Grid */}
      <View style={styles.imageGrid}>
        {productImages.map((product, index) => (
          <View key={index} style={styles.imageContainer}>
            <Image 
              source={{ uri: product.imageUrl }}
              style={styles.productImage}
              resizeMode="cover"
            
            />
          </View>
        ))}
      </View>
      <CreateNewBusinessModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onCreate={handleCreateBusiness}
      />
      <Spacing val={50} />
    </View>
  );
};

export default MyDropsTab;

const styles = StyleSheet.create({
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
  
    padding:24,
     
    flex:1,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 4,
    margin:16,
    borderRadius:16,
    height:100
     
   

  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 10,
   
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 20,
  },
  aboutContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 20,
    
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 4,
    borderRadius:16,
    margin:16,
  
  },
  aboutTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  aboutText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 16,
  },
  contactInfo: {
    gap: 12,

  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  contactText: {
    fontSize: 14,
    color: '#666',
  },
  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    gap: 8,
  },
  imageContainer: {
    width: '48%',
    aspectRatio: 1,
    marginBottom: 8,
    
  },
  placeholderImage: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 12,
    color: '#666',
  },
  productImage: {
    height: 285,
 
    objectFit:'cover',
    overflow:'hidden',
    backgroundColor:COLORS.lightGray

  },
  setupBusinessButton: {
    marginTop: 20,
    marginBottom: 20,
    width: '90%',
    alignSelf: 'center',
  },
  setupBusinessButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});


