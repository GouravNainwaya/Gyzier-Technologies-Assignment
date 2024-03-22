import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { colors } from '../utils/theme';

const RectangleBtn = ({ text, onPress, containerStyle, textStyle }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.container, containerStyle]}>
        <Text style={[styles.text, textStyle]}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: responsiveWidth(1),
    height: responsiveHeight(3.50),
    width: responsiveWidth(19),
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: colors.darkYellow,
    borderWidth: 0.90,
  },
  text: {
    color: '#fff',
    fontSize: responsiveFontSize(1.50),
    // fontWeight: 'bold',
  },
});

export default RectangleBtn;
