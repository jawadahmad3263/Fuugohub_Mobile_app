import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import Style from '../../../style/Style';
import COLORS from '../../../style/colors';

const FollowersTab = () => {
  const followers = [
    {
      id: 1,
      name: 'Sarah Johnson',
      username: '@sarahj',
      avatar: '👤',
      isFollowing: true,
      mutualConnections: 12
    },
    {
      id: 2,
      name: 'Mike Chen',
      username: '@mikechen',
      avatar: '👤',
      isFollowing: false,
      mutualConnections: 8
    },
    {
      id: 3,
      name: 'Emma Davis',
      username: '@emmadavis',
      avatar: '👤',
      isFollowing: true,
      mutualConnections: 15
    },
    {
      id: 4,
      name: 'Alex Rodriguez',
      username: '@alexrod',
      avatar: '👤',
      isFollowing: false,
      mutualConnections: 3
    }
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Followers</Text>
        <Text style={styles.headerSubtitle}>People following your business</Text>
      </View>
      
      {followers.map((follower) => (
        <View key={follower.id} style={styles.followerCard}>
          <View style={styles.followerInfo}>
            <View style={styles.avatarContainer}>
              <Text style={styles.avatarText}>{follower.avatar}</Text>
            </View>
            <View style={styles.followerDetails}>
              <Text style={styles.followerName}>{follower.name}</Text>
              <Text style={styles.followerUsername}>{follower.username}</Text>
              <Text style={styles.mutualText}>{follower.mutualConnections} mutual connections</Text>
            </View>
          </View>
          
          <View style={styles.actionSection}>
            <TouchableOpacity style={[
              styles.followButton,
              follower.isFollowing ? styles.followingButton : styles.followButton
            ]}>
              <Text style={[
                styles.followButtonText,
                follower.isFollowing ? styles.followingButtonText : styles.followButtonText
              ]}>
                {follower.isFollowing ? 'Following' : 'Follow'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default FollowersTab;

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
  followerCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...Style.cardShadow,
  },
  followerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.lightGray,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 24,
  },
  followerDetails: {
    flex: 1,
  },
  followerName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  followerUsername: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  mutualText: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  actionSection: {
    marginLeft: 12,
  },
  followButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: COLORS.buttonPrimary,
  },
  followingButton: {
    backgroundColor: COLORS.lightGray,
  },
  followButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.white,
  },
  followingButtonText: {
    color: COLORS.textPrimary,
  },
});
