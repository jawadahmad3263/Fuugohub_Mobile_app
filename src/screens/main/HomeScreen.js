/**
 * Home Screen
 * TikTok-like video feed screen
 */

import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  ActivityIndicator,
  Platform,
} from 'react-native';
import Video from 'react-native-video';
import { useIsFocused } from '@react-navigation/native';
import HeartIcon from '../../assets/svg/fav.svg';
import CommentIcon from '../../assets/svg/comments-icons.svg';
import SaveIcon from '../../assets/svg/save-icon.svg';
import ShareIcon from '../../assets/svg/share.svg';
import Coins from '../../assets/svg/coins-icon.svg';
import COLORS from '../../style/colors';

const { width, height } = Dimensions.get('window');

// Sample video data with working URLs
const sampleVideos = [
  {
    id: '1',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    user: {
      name: 'John Doe',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      isFollowing: false,
    },
    description: 'Lorem Ipsum has been the industry\'s standard description',
    hashtags: '# Lorem ipsum # Lorem',
    likes: 1420,
    comments: 89,
    shares: 45,
    saves: 23,
    coins: 156,
    timeAgo: '2 days ago',
  },
  {
    id: '2',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    user: {
      name: 'Jane Smith',
      avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
      isFollowing: true,
    },
    description: 'Amazing content that everyone loves!',
    hashtags: '# Amazing # Content',
    likes: 2340,
    comments: 156,
    shares: 78,
    saves: 45,
    coins: 289,
    timeAgo: '1 day ago',
  },
  {
    id: '3',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    user: {
      name: 'Mike Johnson',
      avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
      isFollowing: false,
    },
    description: 'Check out this incredible video!',
    hashtags: '# Incredible # Video',
    likes: 890,
    comments: 67,
    shares: 34,
    saves: 12,
    coins: 78,
    timeAgo: '3 hours ago',
  },
];

const HomeScreen = ({ navigation }) => {
  const isFocused = useIsFocused();
  const [activeTab, setActiveTab] = useState('Your Vibe');
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [videoLoading, setVideoLoading] = useState({});
  const flatListRef = useRef(null);

  const renderVideoItem = ({ item, index }) => {
    const isActive = index === currentVideoIndex;
    const isLoading = videoLoading[item.id];

    return (
      <View style={styles.videoContainer}>
        {/* Video Player */}
        <Video
          source={{ uri: item.videoUrl }}
          style={styles.video}
          resizeMode="cover"
          repeat
          paused={!isActive || !isFocused}
          muted={false}
          playInBackground={false}
          playWhenInactive={false}
          ignoreSilentSwitch="ignore"
          onLoadStart={() => {
            setVideoLoading(prev => ({ ...prev, [item.id]: true }));
          }}
          onLoad={() => {
            setVideoLoading(prev => ({ ...prev, [item.id]: false }));
          }}
          onError={(error) => {
            console.log('Video error:', error);
            setVideoLoading(prev => ({ ...prev, [item.id]: false }));
          }}
        />

        {/* Loading Indicator */}
        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#fff" />
          </View>
        )}

        {/* Overlay Content */}
        <View style={styles.overlay}>
          {/* Top Navigation */}
          <View style={styles.topNavigation}>
            <View style={styles.tabNavigation}>
              <TouchableOpacity
                style={[styles.tab, activeTab === 'Following' && styles.activeTab]}
                onPress={() => setActiveTab('Following')}
              >
                <Text style={[styles.tabText, activeTab === 'Following' && styles.activeTabText]}>
                  Following
                </Text>
              </TouchableOpacity>
              <View style={styles.tabSeparator} />
              <TouchableOpacity
                style={[styles.tab, activeTab === 'Your Vibe' && styles.activeTab]}
                onPress={() => setActiveTab('Your Vibe')}
              >
                <Text style={[styles.tabText, activeTab === 'Your Vibe' && styles.activeTabText]}>
                  Your Vibe
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Right Action Bar */}
          <View style={styles.actionBar}>
            {/* User Profile */}
            <TouchableOpacity style={styles.userProfile}>
              <View style={styles.avatarContainer}>
                <View style={styles.avatar} />
                <View style={styles.followButton}>
                  <Text style={styles.followIcon}>+</Text>
                </View>
              </View>
            </TouchableOpacity>

            {/* Action Buttons */}
            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.actionButton}>
                <HeartIcon width={24} height={24} />
                <Text style={styles.actionCount}>{item.likes}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton}>
                <CommentIcon width={24} height={24} />
                <Text style={styles.actionCount}>{item.comments}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton}>
                <SaveIcon width={24} height={24} />
                <Text style={styles.actionCount}>{item.saves}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton}>
                <ShareIcon width={24} height={24} />
                <Text style={styles.actionCount}>{item.shares}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton}>
                <View style={styles.coinIcon}>
                  <Coins />
                </View>
                <Text style={styles.actionCount}>{item.coins}</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Bottom Content */}
          <View style={styles.bottomContent}>
            <Text style={styles.timeAgo}>{item.timeAgo}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <Text style={styles.hashtags}>{item.hashtags}</Text>
          </View>
        </View>
      </View>
    );
  };

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentVideoIndex(viewableItems[0].index);
    }
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <FlatList
        ref={flatListRef}
        data={sampleVideos}
        renderItem={renderVideoItem}
        keyExtractor={(item) => item.id}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        snapToInterval={height}
        snapToAlignment="start"
        decelerationRate="fast"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  
  },
  videoContainer: {
    width,
    height,
    position: 'relative',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,
  },
  topNavigation: {
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  tabNavigation: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#fff',
  },
  tabText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  activeTabText: {
    fontWeight: 'bold',
  },
  tabSeparator: {
    width: 1,
    height: 20,
    backgroundColor: '#fff',
    marginHorizontal: 10,
  },
  actionBar: {
    position: 'absolute',
    right: 20,
    bottom: 120,
    alignItems: 'center',
  },
  userProfile: {
    marginBottom: 20,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#333',
    borderWidth: 2,
    borderColor: '#fff',
  },
  followButton: {
    position: 'absolute',
    bottom: -5,
    right: -5,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#f4511e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  followIcon: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  actionButtons: {
    alignItems: 'center',
  },
  actionButton: {
    alignItems: 'center',
    marginBottom: 20,
  },
  actionCount: {
    color: '#fff',
    fontSize: 12,
    marginTop: 5,
    fontWeight: '500',
  },
  coinIcon: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  coinText: {
    fontSize: 20,
  },
  bottomContent: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 120 : 90,
    left: 20,
    right: 80,
  },
  timeAgo: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 10,
    opacity: 0.8,
  },
  description: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '500',
  },
  hashtags: {
    color: '#fff',
    fontSize: 14,
    opacity: 0.8,
  },
});

export default HomeScreen; 