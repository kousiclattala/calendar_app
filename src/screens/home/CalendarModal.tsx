import React, {useEffect, useState} from 'react';
import {View, Text, Modal, StyleSheet, Pressable, Platform} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {resources} from '../../resources';
import dayjs from 'dayjs';
import {Calendar, DateData} from 'react-native-calendars';
import {_getWeekDates} from '../../utility/Helpers';
import {CalendarModalProps, Week} from '../../types/types';

const CalendarModal: React.FC<CalendarModalProps> = ({
  visible,
  setVisible,
  setWeeks,
  isPanEnabled,
  scrollRef,
}) => {
  let currDate = new Date();

  const [selectedDate, setSelectedDate] = useState('');
  const [marked, setMarked] = useState<any>({});
  const [selectedWeek, setSelectedWeek] = useState<Week[]>([]);

  useEffect(() => {
    let _marked = {};
    let _weeks = _getWeekDates(currDate);

    _weeks.forEach((week: any, index: number) => {
      Object.assign(_marked, {
        [dayjs(week.date).utc().format('YYYY-MM-DD')]: {
          startingDay: index == 0 ? true : false,
          color: resources.colors.primary,
          textColor: resources.colors.white,
          endingDay: index == _weeks.length - 1 ? true : false,
          marked:
            dayjs(week.date).format('YYYY-MM-DD') ==
            dayjs(currDate).format('YYYY-MM-DD')
              ? true
              : false,
          dotColor: resources.colors.white,
        },
      });
    });

    setSelectedDate(currDate.toDateString());
    setMarked(_marked);
    setSelectedWeek(_weeks);
  }, [visible]);

  const onDayPress = (day: DateData) => {
    let _marked = {};

    let _weeks = _getWeekDates(day.dateString);

    _weeks.forEach((week: any, index: number) => {
      Object.assign(_marked, {
        [dayjs(week.date).utc().format('YYYY-MM-DD')]: {
          startingDay: index == 0 ? true : false,
          color: resources.colors.primary,
          textColor: resources.colors.white,
          endingDay: index == _weeks.length - 1 ? true : false,
          marked:
            dayjs(week.date).utc().format('YYYY-MM-DD') == day.dateString
              ? true
              : false,
          dotColor: resources.colors.white,
        },
      });
    });

    setSelectedDate(day.dateString);
    setMarked(_marked);
    setSelectedWeek(_weeks);
  };

  const _onApplyPress = () => {
    selectedWeek.forEach((week: any) => {
      if (dayjs(week.date).utc().format('dddd') == 'Monday') {
        week.isSelected = true;
      }
    });

    setWeeks(selectedWeek);
    setVisible(false);

    if (Platform.OS == 'android') {
      isPanEnabled.value = true;
      scrollRef.current?.scrollToIndex({
        index: 0,
        animated: true,
        viewPosition: 0.5,
      });
    }

    setSelectedWeek([]);
    setMarked({});
    setSelectedDate('');
  };

  const _onCancelPress = () => {
    setVisible(false);

    setSelectedWeek([]);
    setMarked({});
    setSelectedDate('');
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={() => {
        setVisible(false);
      }}>
      <View
        style={{
          ...StyleSheet.absoluteFillObject,
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
        }}
      />

      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.dateText}>
            {dayjs(selectedWeek[0]?.date).utc().format('Do MMM')} -{' '}
            {dayjs(selectedWeek[6]?.date).utc().format('Do MMM')}
          </Text>
          <Text style={styles.dayText}>Today</Text>
        </View>

        <View
          style={{
            borderWidth: 0.3,
            borderColor: resources.colors.primary_light,
            marginTop: hp('2%'),
          }}>
          <Calendar
            initialDate={dayjs().format('YYYY-MM-DD')}
            onDayPress={onDayPress}
            markingType="period"
            markedDates={marked}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: hp('1.6%'),
            borderBottomWidth: 0.3,
            borderBottomColor: resources.colors.primary_light,
          }}>
          <View
            style={{
              width: 10,
              height: 10,
              borderRadius: 100,
              backgroundColor: resources.colors.primary,
              marginRight: wp('2%'),
            }}
          />
          <Text style={styles.selectedDayText}>
            {selectedDate == ''
              ? dayjs().format('dddd')
              : dayjs(selectedDate).format('dddd')}
          </Text>
        </View>

        <Pressable style={styles.applyBtn} onPress={_onApplyPress}>
          <Text style={styles.applyText}>Apply</Text>
        </Pressable>

        <Text style={styles.cancelText} onPress={_onCancelPress}>
          Cancel
        </Text>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp('95%'),
    marginHorizontal: wp('2.5%'),
    backgroundColor: resources.colors.white,
    top: hp('20%'),
    borderRadius: 10,
    paddingBottom: hp('2%'),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: wp('5%'),
    marginTop: hp('2%'),
  },
  dateText: {
    color: resources.colors.black,
    fontSize: hp('2%'),
    fontWeight: '500',
    letterSpacing: 0.5,
  },
  dayText: {
    color: resources.colors.primary,
    fontSize: hp('2%'),
    fontWeight: '500',
    letterSpacing: 0.5,
  },
  applyBtn: {
    width: wp('85%'),
    height: hp('5%'),
    backgroundColor: resources.colors.primary,
    borderRadius: 10,
    marginHorizontal: wp('5%'),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp('2%'),
  },
  applyText: {
    color: resources.colors.white,
    fontSize: hp('2%'),
    fontWeight: '500',
    letterSpacing: 0.5,
  },
  cancelText: {
    color: resources.colors.primary,
    fontSize: hp('2%'),
    fontWeight: '500',
    marginTop: hp('2%'),
    textAlign: 'center',
  },
  selectedDayText: {
    color: resources.colors.black,
    fontSize: hp('1.8%'),
    fontWeight: '500',
    letterSpacing: 0.5,
  },
});

export default CalendarModal;
