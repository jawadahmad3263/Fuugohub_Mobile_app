/**
 * Home Screen
 * TikTok-like video feed screen
 */

import React, { useState, useRef, useEffect } from "react";
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
} from "react-native";
import Video from "react-native-video";
import { useIsFocused } from "@react-navigation/native";
import HeartIcon from "../../assets/svg/fav.svg";
import CommentIcon from "../../assets/svg/comments-icons.svg";
import SaveIcon from "../../assets/svg/save-icon.svg";
import ShareIcon from "../../assets/svg/share.svg";
import Coins from "../../assets/svg/coins-icon.svg";
import COLORS from "../../style/colors";
import { Get, Post } from "../../services/api";

const { width, height } = Dimensions.get("window");

const HomeScreen = ({ navigation }) => {
  const isFocused = useIsFocused();
  const [activeTab, setActiveTab] = useState("Your Vibe");
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [videoLoading, setVideoLoading] = useState({});
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [feed, setFeed] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [likedItems, setLikedItems] = useState(new Set());
  const [pausedVideos, setPausedVideos] = useState(new Set());
  const [centerIconVideoId, setCenterIconVideoId] = useState(null);
  const flatListRef = useRef(null);

  useEffect(() => {
    getFeed({
      limit: 10,
      offset: 0,
    });
  }, [isFocused]);

  const getFeed = async (params) => {
    setLoading(true);
    Get({
      endpoint: "drops/feed",
      params: params,
    })
      .then((result) => {
        console.log("Feed", result);
        if (result.success === 1) {
          setFeed(result.data);
          setOffset(result.offset);
          setHasMore(result.hasMore);
        }
      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const loadMoreData = () => {
    if (hasMore && !loading) {
      getFeed({
        limit: 10,
        offset: offset + 10,
      });
    }
  };

  const formatTimeAgo = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    return `${Math.floor(diffInSeconds / 2592000)}mo ago`;
  };

  const formatHashtags = (hashtags) => {
    if (!hashtags || hashtags.length === 0) return "";
    return hashtags.map(tag => `#${tag.name}`).join(" ");
  };

  const handleLike = async (dropId, currentLikesCount) => {
    const isLiked = likedItems.has(dropId);
    // const endpoint = isLiked ? "drops/unlike" : "drops/like";
    const endpoint = 'drops/like'
    try {
      const response = await Post({
        endpoint: endpoint,
        data: {
          dropId: dropId
        }
      });
      
      if (response.success === 1) {
        // Update the feed with new like count
        setFeed(prevFeed => 
          prevFeed.map(item => 
            item.id === dropId 
              ? { 
                  ...item, 
                  likesCount: isLiked 
                    ? Math.max(0, item.likesCount - 1) 
                    : item.likesCount + 1 
                }
              : item
          )
        );
        
        // Update liked items set
        setLikedItems(prev => {
          const newSet = new Set(prev);
          if (isLiked) {
            newSet.delete(dropId);
          } else {
            newSet.add(dropId);
          }
          return newSet;
        });
      }
    } catch (error) {
      console.log("Like/Unlike error:", error);
    }
  };

  const handleVideoPress = (videoId) => {
    console.log("Video pressed:", videoId);
    console.log("Current paused videos:", Array.from(pausedVideos));
    
    setPausedVideos(prev => {
      const newSet = new Set(prev);
      if (newSet.has(videoId)) {
        console.log("Removing from paused:", videoId);
        newSet.delete(videoId);
      } else {
        console.log("Adding to paused:", videoId);
        newSet.add(videoId);
      }
      return newSet;
    });
    
    // Show center icon temporarily
    setCenterIconVideoId(videoId);
    setTimeout(() => {
      setCenterIconVideoId(null);
    }, 500);
  };

  const renderVideoItem = ({ item, index }) => {
    const isActive = index === currentVideoIndex;
    const isLoading = videoLoading[item.id];
    const isPaused = pausedVideos.has(item.id);
    const showCenterIcon = centerIconVideoId === item.id && isActive;

    return (
      <View style={styles.videoContainer}>
        {/* Video Player */}
        <Video
          source={{ uri: item.url }}
          style={styles.video}
          resizeMode="cover"
          repeat
          paused={!isActive || !isFocused || isPaused}
          muted={false}
          playInBackground={false}
          playWhenInactive={false}
          ignoreSilentSwitch="ignore"
          onLoadStart={() => {
            setVideoLoading((prev) => ({ ...prev, [item.id]: true }));
          }}
          onLoad={() => {
            setVideoLoading((prev) => ({ ...prev, [item.id]: false }));
          }}
          onError={(error) => {
            console.log("Video error:", error);
            setVideoLoading((prev) => ({ ...prev, [item.id]: false }));
          }}
        />

        {/* Touchable Overlay for Play/Pause */}
        <TouchableOpacity 
          style={styles.videoTouchable}
          onPress={() => handleVideoPress(item.id)}
          activeOpacity={1}
        >
          <View style={styles.touchableArea} />
        </TouchableOpacity>

        {/* Play/Pause Overlay */}
        {isPaused && isActive && (
          <View style={styles.playPauseOverlay}>
            <View style={styles.playPauseIcon}>
              <Text style={styles.playPauseText}>▶</Text>
            </View>
          </View>
        )}

        {/* Center Icon Overlay */}
        {showCenterIcon && (
          <View style={styles.centerIconOverlay}>
            <View style={styles.centerIcon}>
              <Text style={styles.centerIconText}>
                {isPaused ? "▶" : "⏸"}
              </Text>
            </View>
          </View>
        )}

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
                style={[
                  styles.tab,
                  activeTab === "Following" && styles.activeTab,
                ]}
                onPress={() => setActiveTab("Following")}
              >
                <Text
                  style={[
                    styles.tabText,
                    activeTab === "Following" && styles.activeTabText,
                  ]}
                >
                  Following
                </Text>
              </TouchableOpacity>
              <View style={styles.tabSeparator} />
              <TouchableOpacity
                style={[
                  styles.tab,
                  activeTab === "Your Vibe" && styles.activeTab,
                ]}
                onPress={() => setActiveTab("Your Vibe")}
              >
                <Text
                  style={[
                    styles.tabText,
                    activeTab === "Your Vibe" && styles.activeTabText,
                  ]}
                >
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
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={() => handleLike(item.id, item.likesCount)}
              >
                <HeartIcon 
                  width={24} 
                  height={24} 
                  fill={likedItems.has(item.id) ? "#ff4757" : "none"}
                  stroke={likedItems.has(item.id) ? "#ff4757" : "#fff"}
                />
                <Text style={[
                  styles.actionCount,
                  likedItems.has(item.id) && styles.likedCount
                ]}>
                  {item.likesCount}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton}>
                <CommentIcon width={24} height={24} />
                <Text style={styles.actionCount}>{item.commentsCount}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton}>
                <SaveIcon width={24} height={24} />
                <Text style={styles.actionCount}>{item.bookmarksCount}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton}>
                <ShareIcon width={24} height={24} />
                <Text style={styles.actionCount}>{item.sharesCount}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton}>
                <View style={styles.coinIcon}>
                  <Coins />
                </View>
                <Text style={styles.actionCount}>0</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Bottom Content */}
          <View style={styles.bottomContent}>
            <Text style={styles.timeAgo}>{formatTimeAgo(item.createdAt)}</Text>
            <Text style={styles.description}>{item.caption}</Text>
            <Text style={styles.hashtags}>{formatHashtags(item.hashtags)}</Text>
            {item.location && (
              <Text style={styles.location}>📍 {item.location}</Text>
            )}
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

  if (loading && feed.length === 0) {
    return (
      <View style={styles.loadingScreen}>
        <ActivityIndicator size="large" color="#fff" />
        <Text style={styles.loadingText}>Loading videos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <FlatList
        ref={flatListRef}
        data={feed}
        renderItem={renderVideoItem}
        keyExtractor={(item) => item.id}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        snapToInterval={height}
        snapToAlignment="start"
        decelerationRate="fast"
        onEndReached={loadMoreData}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loading && feed.length > 0 ? (
            <View style={styles.footerLoading}>
              <ActivityIndicator size="small" color="#fff" />
            </View>
          ) : null
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  loadingScreen: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: "#fff",
    fontSize: 16,
    marginTop: 10,
  },
  footerLoading: {
    paddingVertical: 20,
    alignItems: "center",
  },
  videoContainer: {
    width,
    height,
    position: "relative",
  },
  videoTouchable: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 5,
  },
  touchableArea: {
    width: "100%",
    height: "100%",
  },
  video: {
    width: "100%",
    height: "100%",
  },
  loadingContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  overlay: {
    position: "absolute",
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#fff",
  },
  tabText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  activeTabText: {
    fontWeight: "bold",
  },
  tabSeparator: {
    width: 1,
    height: 20,
    backgroundColor: "#fff",
    marginHorizontal: 10,
  },
  actionBar: {
    position: "absolute",
    right: 20,
    bottom: 120,
    alignItems: "center",
  },
  userProfile: {
    marginBottom: 20,
  },
  avatarContainer: {
    position: "relative",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#333",
    borderWidth: 2,
    borderColor: "#fff",
  },
  followButton: {
    position: "absolute",
    bottom: -5,
    right: -5,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#f4511e",
    alignItems: "center",
    justifyContent: "center",
  },
  followIcon: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  actionButtons: {
    alignItems: "center",
  },
  actionButton: {
    alignItems: "center",
    marginBottom: 20,
  },
  actionCount: {
    color: "#fff",
    fontSize: 12,
    marginTop: 5,
    fontWeight: "500",
  },
  coinIcon: {
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  coinText: {
    fontSize: 20,
  },
  bottomContent: {
    position: "absolute",
    bottom: Platform.OS === "ios" ? 120 : 90,
    left: 20,
    right: 80,
  },
  timeAgo: {
    color: "#fff",
    fontSize: 14,
    marginBottom: 10,
    opacity: 0.8,
  },
  description: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "500",
  },
  hashtags: {
    color: "#fff",
    fontSize: 14,
    marginBottom: 5,
    opacity: 0.8,
  },
  location: {
    color: "#fff",
    fontSize: 12,
    opacity: 0.7,
  },
  likedCount: {
    color: "#ff4757",
    fontWeight: "bold",
  },
  playPauseOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  playPauseIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  playPauseText: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
  centerIconOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  centerIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  centerIconText: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
});

export default HomeScreen;
