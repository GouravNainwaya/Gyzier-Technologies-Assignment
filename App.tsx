import {
  SafeAreaView as IOSSafeAreaView,
  Platform,
  StatusBar,
  StyleSheet,
} from 'react-native';
import React from 'react';
import Home from './src/screens/Home';
import {SafeAreaView} from 'react-native-safe-area-context';
import { colors } from './src/utils/theme';

const App = () => {
  const SafeArea = Platform.OS === 'ios' ? IOSSafeAreaView : SafeAreaView;

  return (
    <SafeArea style={{flex: 1, backgroundColor: colors.mediumBackground}}>
      <StatusBar barStyle={'default'} backgroundColor={colors.mediumBackground} />
      <Home />
    </SafeArea>
  );
};

export default App;

const styles = StyleSheet.create({});
