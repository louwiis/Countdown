import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Tiles from '../components/Tiles';

export default function Countdown() {
  const [nextDate, setNextDate] = useState(new Date());
  const [countdown, setCountdown] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00'
  });

  const monday = new Date();
  monday.setDate(monday.getDate() + ((1 + 7 - monday.getDay()) % 7));
  monday.setHours(17);
  monday.setMinutes(0);
  monday.setSeconds(0);

  const thursday = new Date();
  thursday.setDate(thursday.getDate() + ((4 + 7 - thursday.getDay()) % 7));
  thursday.setHours(2);
  thursday.setMinutes(37);
  thursday.setSeconds(0);

  const saturday = new Date();
  saturday.setDate(saturday.getDate() + ((6 + 7 - saturday.getDay()) % 7));
  saturday.setHours(14);
  saturday.setMinutes(54);
  saturday.setSeconds(0);

  function getNextDate() {
    const date = new Date();

    return [monday, thursday, saturday].reduce((prev, curr) => {
      if (curr < date) {
        return prev;
      }
  
      if (curr < prev) {
        return curr;
      }
  
      return prev;
    })
  }

  function getCountdown(date: Date, nextDate: Date) {
    const diff = nextDate.getTime() - date.getTime();

    return {
      days: `0${Math.floor(diff / 1000 / 60 / 60 / 24)}`.slice(-2),
      hours: `0${Math.floor(diff / 1000 / 60 / 60) % 24}`.slice(-2),
      minutes: `0${Math.floor(diff / 1000 / 60) % 60}`.slice(-2),
      seconds: `0${Math.floor(diff / 1000) % 60}`.slice(-2)
    }
  }

  function main() {
    const date = new Date();
    const nextDate = getNextDate();

    setNextDate(nextDate as Date);
    setCountdown(getCountdown(date as Date, nextDate as Date));
  }

  useEffect(() => {
    setInterval(() => {
      main();
    }, 1000);

    main();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        {Object.keys(countdown).map((key, index) => {
          return (
            <Tiles
              key={index}
              subtitle={key}
              number={countdown[key as keyof typeof countdown]}
            />
          )
        })}
      </View>

      <Text style={{ fontSize: 8, color: '#fff' }}>Until {nextDate.toLocaleString('en-US', { weekday: 'long' })}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 32,
  },

  countdown: {  
    width: '90%',
    flexDirection: 'row',
    gap: 16,
  },

  countdownSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },

  countdownSectionSubtitle: {
    fontSize: 16,
    color: '#fff',
  }
});
