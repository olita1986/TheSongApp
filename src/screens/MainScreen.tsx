import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

interface MainScreenProps {}

const MainScreen = (props: MainScreenProps) => {
  return (
    <View style={styles.container}>
      <Text>MainScreen</Text>
    </View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  container: {}
});



