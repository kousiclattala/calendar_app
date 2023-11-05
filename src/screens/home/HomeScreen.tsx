import {View, Text, StyleSheet, FlatList} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Header from '../../components/Header';
import {resources} from '../../resources';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import WeekHeader from './WeekHeader';
import {Week} from '../../types/types';
import WeekButtons from './WeekButtons';
import WeeklyClass from '../classes/WeeklyClass';
import CalendarModal from './CalendarModal';
import {_getWeekDates} from '../../utility/Helpers';
import dayjs from 'dayjs';
import {useSharedValue} from 'react-native-reanimated';

const HomeScreen = () => {
  const [weeks, setWeeks] = useState<Week[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [refreshing, setRefreshing] = useState(false);
  const [weekButtonPress, setWeekButtonPress] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [visibleCalendar, setVisibleCalendar] = useState(false);

  const scrollRef = useRef<FlatList>(null);
  const weekRef = useRef<FlatList>(null);

  const isPanEnabled = useSharedValue(true);

  useEffect(() => {
    let _weeks = _getWeekDates(new Date());

    _weeks.forEach((item: any) => {
      if (dayjs(item.date).utc().format('dddd') == 'Monday') {
        item.isSelected = true;
      }
    });

    setWeeks(_weeks);
  }, []);

  const onWeekPress = () => {
    setVisibleCalendar(true);
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: resources.colors.white_light,
      }}>
      <Header />
      <View style={styles.headerContainer}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerTitle}>TimeTable</Text>
        </View>
        <View style={styles.headerRight}>
          <Text style={styles.viewHolidays}>View Holidays</Text>
          <View style={styles.nameContainer}>
            <Text style={styles.nameText}>LK</Text>
          </View>
        </View>
      </View>

      <WeekHeader
        weeks={weeks}
        setWeeks={setWeeks}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        onPress={onWeekPress}
        scrollRef={scrollRef}
        weekRef={weekRef}
      />

      <WeekButtons
        weeks={weeks}
        setWeeks={setWeeks}
        refreshing={refreshing}
        setRefreshing={setRefreshing}
        scrollRef={scrollRef}
        setWeekButtonPress={setWeekButtonPress}
        setSelectedIndex={setSelectedIndex}
        isPanEnabled={isPanEnabled}
        weekRef={weekRef}
      />

      <WeeklyClass
        weeks={weeks}
        setWeeks={setWeeks}
        refreshing={refreshing}
        setRefreshing={setRefreshing}
        scrollRef={scrollRef}
        weekButtonPress={weekButtonPress}
        setWeekButtonPress={setWeekButtonPress}
        selectedIndex={selectedIndex}
        isPanEnabled={isPanEnabled}
        weekRef={weekRef}
      />

      <CalendarModal
        visible={visibleCalendar}
        setVisible={setVisibleCalendar}
        setWeeks={setWeeks}
        isPanEnabled={isPanEnabled}
        scrollRef={scrollRef}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: wp('95%'),
    height: hp('7%'),
    marginHorizontal: wp('2.5%'),
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  headerTitle: {
    color: resources.colors.black,
    fontSize: hp('2.5%'),
    fontWeight: '600',
    letterSpacing: 0.6,
  },
  headerLeft: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: wp('2%'),
  },
  headerRight: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: wp('2%'),
  },
  viewHolidays: {
    color: resources.colors.primary,
    fontSize: hp('1.8%'),
    fontWeight: '500',
    letterSpacing: 0.6,
  },
  nameContainer: {
    width: 30,
    height: 30,
    borderRadius: 100,
    backgroundColor: resources.colors.primary_light,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: wp('3%'),
  },
  nameText: {
    color: resources.colors.black,
    fontSize: hp('1.5%'),
    fontWeight: '500',
    letterSpacing: 0.5,
  },
});

export default HomeScreen;
