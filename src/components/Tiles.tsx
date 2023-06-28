import { StyleSheet, Text, View, Animated } from 'react-native';
import React, { useEffect, useRef } from 'react';

type CountdownProps = {
  subtitle: string;
  number: string;
}

export default function Countdown({ subtitle, number }: CountdownProps) {
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animation, {
    toValue: 0,
    duration: 150,
    useNativeDriver: true
    }).start(() => {
    animation.setValue(1);
    });
  }, [number]);

  return (
    <View style={styles.countdownSection}>
      <Animated.Text style={[styles.countdownSectionNumber, {
        transform: [
          {
            rotate: animation.interpolate({
              inputRange: [0, 1],
              outputRange: ['360deg', '0deg']
            })
          }
        ]
      }]}>{number}</Animated.Text>
      <Text style={styles.countdownSectionSubtitle}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  countdownSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },

  countdownSectionNumber: {
    fontSize: 50,
    color: '#fff',
  },

  countdownSectionSubtitle: {
    fontSize: 16,
    color: '#fff',
  }
});
