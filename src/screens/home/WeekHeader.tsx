import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {resources} from '../../resources';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {_getNextWeek, _getPrevWeek, _getWeekDates} from '../../utility/Helpers';
import dayjs from 'dayjs';
import {WeekHeaderProps} from '../../types/types';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone'; // dependent on utc plugin
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(advancedFormat);

const WeekHeader: React.FC<WeekHeaderProps> = ({
  selectedDate,
  setSelectedDate,
  setWeeks,
  weeks,
  onPress,
  scrollRef,
  weekRef,
}) => {
  let curr_date = new Date();

  //   const [timezone, setTimezone] = useState('');

  useEffect(() => {
    setWeeks(_getWeekDates(curr_date));
  }, []);

  useEffect(() => {
    let zone = dayjs.tz.guess();
    // dayjs.tz.setDefault(zone);

    let start_date = dayjs.utc(weeks[0]?.date).tz(zone);
  }, [weeks]);

  const _onPreviousWeekPress = () => {
    let prevWeeks = _getPrevWeek(weeks[0]?.date);

    prevWeeks.forEach((item: any) => {
      if (dayjs(item.date).utc().format('dddd') == 'Monday') {
        item.isSelected = true;
      }
    });

    setWeeks(prevWeeks);

    scrollRef.current?.scrollToIndex({
      index: 0,
      animated: true,
      viewPosition: 0.5,
    });

    weekRef.current?.scrollToIndex({
      index: 0,
      animated: true,
    });
  };

  const _onNextWeekPress = () => {
    let nextWeek = _getNextWeek(weeks[6]?.date);

    nextWeek.forEach((item: any) => {
      if (dayjs(item.date).utc().format('dddd') == 'Monday') {
        item.isSelected = true;
      }
    });

    setWeeks(nextWeek);

    scrollRef.current?.scrollToIndex({
      index: 0,
      animated: true,
      viewPosition: 0.5,
    });

    weekRef.current?.scrollToIndex({
      index: 0,
      animated: true,
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.prevWeek} onPress={_onPreviousWeekPress}>
        <IonIcon
          name="chevron-back-outline"
          size={20}
          color={resources.colors.black}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.weekRange} onPress={onPress}>
        <Text style={styles.dates}>
          {dayjs(weeks[0]?.date).utc().format('Do MMMM')} -{' '}
        </Text>
        <Text style={styles.dates}>
          {dayjs(weeks[6]?.date).utc().format('Do MMMM')}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.nextWeek} onPress={_onNextWeekPress}>
        <IonIcon
          name="chevron-forward-outline"
          size={20}
          color={resources.colors.black}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp('90%'),
    height: hp('7%'),
    marginHorizontal: wp('5%'),
    borderRadius: 10,
    backgroundColor: resources.colors.white,
    flexDirection: 'row',
    marginTop: hp('2%'),
    borderWidth: 0.5,
    borderColor: resources.colors.primary_light,
  },
  prevWeek: {
    width: wp('12%'),
    height: hp('7%'),
    borderRightWidth: 0.5,
    borderRightColor: resources.colors.primary_light,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextWeek: {
    width: wp('12%'),
    height: hp('7%'),
    borderLeftWidth: 0.5,
    borderLeftColor: resources.colors.primary_light,
    justifyContent: 'center',
    alignItems: 'center',
  },
  weekRange: {
    width: wp('65%'),
    height: hp('7%'),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dates: {
    color: resources.colors.black,
    fontSize: hp('1.6%'),
    fontWeight: '500',
    letterSpacing: 0.6,
  },
});

export default WeekHeader;
