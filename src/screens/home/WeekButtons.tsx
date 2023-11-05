import React from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Platform,
} from 'react-native';
import {Week, WeekButtonProps} from '../../types/types';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {resources} from '../../resources';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone'; // dependent on utc plugin
import {_getNextWeek} from '../../utility/Helpers';
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(advancedFormat);

const ITEM_WIDTH = 20;

const WeekButtons: React.FC<WeekButtonProps> = ({
  weeks,
  setWeeks,
  refreshing,
  setRefreshing,
  scrollRef,
  setWeekButtonPress,
  setSelectedIndex,
  isPanEnabled,
  weekRef,
}) => {
  const _renderWeek = (item: Week, index: number) => {
    return (
      <>
        {index <= weeks.length - 1 && (
          <>
            <Pressable
              style={[
                styles.weekItemContainer,
                {
                  backgroundColor:
                    item.isSelected == true
                      ? resources.colors.primary
                      : dayjs(item.date).utc().format('dddd') == 'Sunday'
                      ? resources.colors.primary_light
                      : resources.colors.white,
                },
              ]}
              onPress={() => {
                isPanEnabled.value = false;
                setWeekButtonPress(true);

                let _weeks = weeks;

                _weeks.forEach((w: any, index: number) => {
                  if (w.date == item.date) {
                    w.isSelected = true;
                  } else {
                    w.isSelected = false;
                  }
                });

                setWeeks(_weeks);
                setRefreshing(!refreshing);

                let indx = weeks.findIndex(
                  (wee: Week) => wee.date == item.date,
                );

                setSelectedIndex(indx);
                // scrollRef.current?.setNativeProps({onScroll: null});

                scrollRef.current?.scrollToIndex({
                  index: indx,
                  animated: true,
                  viewPosition: 0.5,
                });
              }}>
              <Text
                style={[
                  styles.itemDayText,
                  {
                    color: item.isSelected
                      ? resources.colors.white
                      : resources.colors.black,
                  },
                ]}>
                {dayjs(item.date).utc().format('ddd')}
              </Text>
              <View
                style={[
                  styles.dateContainer,
                  {
                    backgroundColor: item.isSelected
                      ? resources.colors.white
                      : 'transparent',
                  },
                ]}>
                <Text
                  style={[
                    styles.dateText,
                    {
                      color: item.isSelected
                        ? resources.colors.primary
                        : resources.colors.black,
                    },
                  ]}>
                  {dayjs(item.date).utc().format('DD')}
                </Text>
              </View>
            </Pressable>
            {dayjs().utc(true).format('YYYY-MM-DD') ==
              dayjs(item.date).utc(true).format('YYYY-MM-DD') && (
              <View
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 100,
                  backgroundColor: resources.colors.primary,
                  position: 'absolute',
                  left: 35,
                  top: 75,
                }}
              />
            )}
          </>
        )}
      </>
    );
  };

  return (
    <View
      style={{
        height: hp('13.5%'),
      }}>
      <FlatList
        ref={weekRef}
        data={weeks}
        extraData={refreshing}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({item, index}) => _renderWeek(item, index)}
        horizontal={true}
        contentContainerStyle={{
          marginTop: hp('1%'),
          paddingStart: wp('2.5%'),
        }}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  weekItemContainer: {
    width: wp('13%'),
    height: hp('9%'),
    borderWidth: 0.5,
    borderColor: resources.colors.primary_light,
    borderRadius: 50,
    marginHorizontal: wp('3%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemDayText: {
    fontSize: hp('1.5%'),
    fontWeight: '500',
    letterSpacing: 0.6,
  },
  dateContainer: {
    width: 30,
    height: 30,
    borderRadius: 100,
    marginTop: hp('1%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateText: {
    fontSize: hp('1.5%'),
    fontWeight: '400',
    letterSpacing: 0.5,
  },
});

export default WeekButtons;
