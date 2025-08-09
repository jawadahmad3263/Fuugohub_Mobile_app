import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const LikedTab = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Liked tab</Text>
    </View>
  );
};

export default LikedTab;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
});


