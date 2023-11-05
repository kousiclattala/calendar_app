import React from 'react';
import {FlatList, NativeScrollEvent, NativeSyntheticEvent} from 'react-native';
import Animated, {SharedValue} from 'react-native-reanimated';
import ReanimatedFlatListClass from 'react-native-reanimated';

export type Week = {
  id: number;
  date: string;
  isSelected: boolean;
  timeTable: [];
};

export type WeekHeaderProps = {
  weeks: Week[];
  setWeeks: (val: Week[]) => void;
  selectedDate: Date;
  setSelectedDate: (val: Date) => void;
  onPress: () => void;
  scrollRef: React.RefObject<FlatList<any>>;
  weekRef: React.RefObject<FlatList<any>>;
};

export type WeekButtonProps = {
  weeks: Week[];
  setWeeks: (val: Week[]) => void;
  refreshing: boolean;
  setRefreshing: (value: boolean) => void;
  scrollRef: React.RefObject<FlatList<any>>;
  weekRef: React.RefObject<FlatList<any>>;
  setWeekButtonPress: (val: boolean) => void;
  setSelectedIndex: (val: number) => void;
  isPanEnabled: SharedValue<boolean>;
};

export type WeeklyClassProps = {
  weeks: Week[];
  setWeeks: (val: Week[]) => void;
  refreshing: boolean;
  setRefreshing: (value: boolean) => void;
  scrollRef: React.RefObject<FlatList<any>>;
  weekButtonPress: boolean;
  setWeekButtonPress: (val: boolean) => void;
  selectedIndex: number;
  isPanEnabled: SharedValue<boolean>;
  weekRef: React.RefObject<FlatList<any>>;
};

export type ClassRenderProps = {
  item: any;
  index: number;
  weeks: Week[];
};

export type CalendarModalProps = {
  visible: boolean;
  setVisible: (val: boolean) => void;
  setWeeks: (value: Week[]) => void;
  isPanEnabled: SharedValue<boolean>;
  scrollRef: React.RefObject<FlatList<any>>;
};
