import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, SafeAreaView, Platform, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { uuidv4, colors } from './src/utils';
import { Timer, Focus } from './src/pages';

export default function App() {
  const [focusSubject, setFocusSubject] = useState(null);
  const [focusHistory, setFocusHistory] = useState([]);

  const saveFocusHistory = async () => {
    try {
      AsyncStorage.setItem('focusHistory', JSON.stringify(focusHistory));
    } catch (e) {
      console.log(e);
    }
  };
  const loadFocusHistory = async () => {
    try {
      const history = await AsyncStorage.getItem('focusHistory');

      if (history && JSON.parse(history).length) {
        setFocusHistory(JSON.parse(history));
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    loadFocusHistory();
  }, []);

  useEffect(() => {
    saveFocusHistory();
  }, [focusHistory]);

  return (
    <SafeAreaView style={styles.container}>
      <ExpoStatusBar style="light" />
      {focusSubject ? (
        <Timer
          subject={focusSubject}
          clearSubject={() => {
            setFocusHistory([
              ...focusHistory,
              { subject: focusSubject, status: 0, key: uuidv4() },
            ]);
            setFocusSubject(null);
          }}
          onTimerEnd={() => {
            setFocusHistory([
              ...focusHistory,
              { subject: focusSubject, status: 1, key: uuidv4() },
            ]);
            setFocusSubject(null);
          }}
        />
      ) : (
        <Focus focusHistory={focusHistory} onFocusHistory={setFocusHistory} addSubject={setFocusSubject} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.darkBlue,
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
  }
});
