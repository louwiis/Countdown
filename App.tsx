import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet } from 'react-native';
import Countdown from './src/screens/Countdown';
import React from 'react';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Countdown />

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});
