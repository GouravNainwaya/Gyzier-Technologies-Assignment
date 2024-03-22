import React, { memo } from 'react';
import {View, StyleSheet, Pressable} from 'react-native';
import { colors } from '../utils/theme';

const CustomBtn = ({width, height, IconSource, containerStyle, iconStyle, onPress}) => {
  return (
    <Pressable
    onPress={onPress}
      style={[
        styles.container,
        containerStyle,
      ]}>
      <IconSource onPress={onPress}  width={width ?? '35%'} height={height ?? '35%'} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '70%',
    aspectRatio: 1, // This makes the container square-shaped
    borderWidth: 2,
    borderColor: colors.lightYellow,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: '70%',
    height: '70%',
  },
});

export default memo(CustomBtn);
