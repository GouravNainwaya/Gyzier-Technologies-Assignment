import React, {memo} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Pressable,
} from 'react-native';
import CustomBtn from './CustomBtn';
import Add from '../assets/Add.svg';
import Delete from '../assets/Delete.svg';
import Edit from '../assets/Edit.svg';
import Info from '../assets/Info.svg';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { colors } from '../utils/theme';

// Assuming responsiveWidth and responsiveHeight are functions returning responsive dimensions

const Card = ({marginTop, isExpanded, onExpandToggle, ediTBtnPress,title,subtitle, deletePress}) => {
  const handlePress = () => {
    // Handle button press action here
    console.log('Button pressed');
  };
  return (
    <>
      <View style={[styles.cardContainer, {marginTop: marginTop}]}>
        <Pressable onPress={onExpandToggle} style={styles.rowView}>
          <View style={styles.leftView}>
            <Text numberOfLines={1} style={styles.titleText}>{title}</Text>
            <Text numberOfLines={1} style={styles.bodyText}>{subtitle}</Text>
          </View>
          <CustomBtn
            IconSource={Delete}
            containerStyle={{
              width: '11%',
              aspectRatio: 1,
              borderColor: colors.darkYellow,
              borderWidth: 1.5,
              backgroundColor: colors.darkBackground,
              borderRadius: responsiveWidth(1)
            }}
            height={'45%'}
            width={'45%'}
            onPress={deletePress}
          />
        </Pressable>
      </View>
      {isExpanded && (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            alignSelf: 'flex-end',
            marginBottom: responsiveHeight(1.70)
          }}>
          <CustomBtn
            IconSource={Info}
            containerStyle={{
              width: '11%',
              aspectRatio: 1,
              borderColor: colors.darkYellow,
              borderWidth: 1.5,
              marginRight: responsiveWidth(2),
              borderRadius: responsiveWidth(1.70)
            }}
            height={'50%'}
            width={'50%'}
            onPress={() => {}}
          />
          <CustomBtn
            IconSource={Edit}
            containerStyle={{
              width: '11%',
              aspectRatio: 1,
              borderColor: colors.darkYellow,
              borderWidth: 1.5,
              borderRadius: responsiveWidth(1.70)
            }}
            height={'50%'}
            width={'50%'}
            onPress={ediTBtnPress}
          />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    borderRadius: 10,
    borderWidth: 1.50,
    borderColor: colors.darkYellow,
    padding: 16, // responsiveWidth(4)
    marginBottom: 15,
    alignSelf: 'center',
    // elevation: ,
  },
  rowView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftView: {
    flex: 1,
  },
  titleText: {
    fontSize: responsiveFontSize(2.50),
    fontWeight: 'bold',
    color: colors?.lightBackground,
    marginBottom: 3, // responsiveHeight(1)
    maxWidth: '75%',
    textTransform: 'capitalize'
  },
  bodyText: {
    fontSize: 14,
    color: colors?.lightBackground,
    maxWidth: '75%',
    textTransform: 'capitalize'
  },
  btnContainer: {
    width: '11%',
    borderColor: colors.lightYellow,
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnIcon: {
    width: '70%',
    height: '70%',
  },
});

export default memo(Card);
