import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ScrollView,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Dimensions,
  Platform,
  Animated,
  PanResponder,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {resources} from '../../resources';
import {Week, WeeklyClassProps} from '../../types/types';
import ClassRender from './ClassRender';
import {_getNextWeek, _getPrevWeek, getTimeTable} from '../../utility/Helpers';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {useSharedValue} from 'react-native-reanimated';
import dayjs from 'dayjs';

type Context = {
  x: number;
};

const {width: WIDTH} = Dimensions.get('screen');
const PAGE_WIDTH = WIDTH - 55;
const ITEM_WIDTH = 335;

const WEEKS = [1, 2, 3, 4, 5, 6, 7];

const WeeklyClass: React.FC<WeeklyClassProps> = ({
  weeks,
  setWeeks,
  refreshing,
  setRefreshing,
  scrollRef,
  weekButtonPress,
  setWeekButtonPress,
  selectedIndex,
  isPanEnabled,
  weekRef,
}) => {
  const [snapInterval, setSnapInterval] = useState(0);

  useEffect(() => {
    let _weeks = weeks;

    _weeks.forEach((wee: Week, index: number) => {
      Object.assign(wee, {
        timeTable: getTimeTable(),
      });
    });

    setWeeks(_weeks);
    setRefreshing(!refreshing);
  }, [weeks]);

  const _onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (!isPanEnabled.value) {
      return;
    }

    const index = event.nativeEvent.contentOffset.x / ITEM_WIDTH;

    let finalIndx = Number(index.toFixed(0));

    console.log(index);

    if (index < 0) {
      _getPrevWeekOnScroll();
      return;
    }

    if (finalIndx == 6) {
      _getNextWeekOnScroll();
      return;
    }

    let _weeks = weeks;

    if (finalIndx > 4) {
      weekRef.current?.scrollToIndex({
        index: finalIndx,
        animated: true,
      });
    }

    _weeks.forEach((wee: Week) => {
      if (wee.date == _weeks[finalIndx].date) {
        wee.isSelected = true;
      } else {
        wee.isSelected = false;
      }
    });

    setWeeks(_weeks);
    setRefreshing(!refreshing);
  };

  const _getNextWeekOnScroll = () => {
    const _weeks = _getNextWeek(weeks[6].date);

    _weeks.forEach((week: any) => {
      if (dayjs(week.date).utc().format('dddd') == 'Monday') {
        week.isSelected = true;
      }
    });

    setWeeks(_weeks);
    setRefreshing(!refreshing);

    if (Platform.OS == 'ios') {
      isPanEnabled.value = false;
    }

    scrollRef.current?.scrollToIndex({
      index: 0,
      animated: true,
      viewPosition: 0.5,
    });

    weekRef.current?.scrollToIndex({
      index: 0,
      animated: true,
    });

    // Platform.OS == 'android' ? (isPanEnabled.value = true) : null;
  };

  const _getPrevWeekOnScroll = () => {
    const _weeks = _getPrevWeek(weeks[0].date);

    _weeks.forEach((week: any) => {
      if (dayjs(week.date).utc().format('dddd') == 'Monday') {
        week.isSelected = true;
      }
    });

    setWeeks(_weeks);
    setRefreshing(!refreshing);

    if (Platform.OS == 'ios') {
      isPanEnabled.value = false;
    }

    // scrollRef.current?.scrollToIndex({
    //   index: 0,
    //   animated: true,
    //   viewPosition: 0.5,
    // });

    // weekRef.current?.scrollToIndex({
    //   index: 0,
    //   animated: true,
    // });

    // Platform.OS == 'android' ? (isPanEnabled.value = true) : null;
  };

  const panGesture = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {
        console.log('on pan move');
        isPanEnabled.value = false;
      },
      onPanResponderRelease: (evt, gestureState) => {
        console.log('on pan release');
        isPanEnabled.value = true;
      },
      onPanResponderTerminate: (evt, gestureState) => {
        console.log('on pan terminate');
        isPanEnabled.value = true;
      },
    }),
  ).current;

  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Animated.FlatList
        ref={scrollRef}
        data={WEEKS}
        extraData={refreshing}
        keyExtractor={(_, index) => index.toString()}
        snapToAlignment={Platform.OS == 'ios' ? 'start' : 'center'}
        renderItem={({item, index}) => (
          <ClassRender item={item} index={index} weeks={weeks} />
        )}
        horizontal
        pagingEnabled
        onScroll={e => {
          // setWeekButtonPress(false);
          _onScroll(e);
        }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingStart: Platform.OS == 'ios' ? wp('3%') : 0,
        }}
        snapToInterval={Platform.OS == 'ios' ? ITEM_WIDTH - 3 : undefined}
        decelerationRate={'fast'}
        {...panGesture.panHandlers}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp('80%'),
    height: hp('7%'),
    borderRadius: 10,
    backgroundColor: resources.colors.primary_light,
    marginBottom: hp('2%'),
  },
});

export default WeeklyClass;
