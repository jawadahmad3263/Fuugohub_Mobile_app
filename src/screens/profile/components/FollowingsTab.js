import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, Image, TouchableOpacity } from 'react-native';
import SearchIcon from '../../../assets/svg/search-icon.svg';
import { Color } from 'react-native/types_generated/Libraries/Animated/AnimatedExports';
import COLORS from '../../../style/colors';

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

const FollowingsTab = () => {
  const [query, setQuery] = useState('');

  const filteredFollowers = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return SAMPLE_FOLLOWERS;
    return SAMPLE_FOLLOWERS.filter(
      (f) => f.name.toLowerCase().includes(needle) || f.role.toLowerCase().includes(needle)
    );
  }, [query]);

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
    <View style={styles.container}>
      <Text style={styles.heading}>Followers</Text>

      <View style={styles.searchContainer}>
        <SearchIcon width={20} height={20} />
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search"
          placeholderTextColor="#9aa0a6"
          style={styles.searchInput}
        />
      </View>

      <FlatList
        data={filteredFollowers}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        scrollEnabled={false}
        ListFooterComponent={<View style={{ height: 24 }} />}
      />
    </View>
  );
};

export default FollowingsTab;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginTop: 12,
    marginBottom: 14,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#e6e6e6',
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    color: '#111',
    fontSize: 16,
  },
  listContent: {
    paddingBottom: 8,
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
    fontWeight: '600',
    marginBottom: 6,
  },
  role: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontWeight: '400',
  },
  menuButton: {
    position: 'absolute',
    right: 16,
    top: 16,
    padding: 4,
  },
  menuEllipsis: {
    fontSize: 20,
    color: '#94a3b8',
  },
});


