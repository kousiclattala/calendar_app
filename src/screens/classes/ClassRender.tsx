import React from 'react';
import {
  View,
  Text,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
  ScrollView,
  StyleSheet,
  Platform,
  FlatList,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {resources} from '../../resources';
import {ClassRenderProps, Week} from '../../types/types';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {getRandomNumber} from '../../utility/Helpers';

const {width: ITEM_WIDTH} = Dimensions.get('window');

const ClassRender: React.FC<ClassRenderProps> = ({item, index, weeks}) => {
  const _renderClass = (item: any, index: number) => {
    return (
      <View
        style={{
          width: wp('80%'),
          height: item.subject == 'Break' ? hp('5%') : hp('7%'),
          backgroundColor:
            item.subject == 'Break'
              ? resources.colors.white
              : `rgba(39,98,251,0.${index + 1})`,
          borderRadius: 10,
          marginBottom: hp('2%'),
          marginHorizontal: wp('3%'),
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: wp('5%'),
        }}
        key={index}>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <Text
            style={[
              styles.itemText,
              {
                fontWeight: '700',
              },
            ]}>
            {item.subject}
          </Text>
          {item.subjectType == 'Video' && item.subject !== 'Break' && (
            <IonIcon
              name="videocam-outline"
              size={20}
              color={resources.colors.black}
              style={{
                paddingLeft: wp('2%'),
              }}
            />
          )}
        </View>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <IonIcon
            name="time-outline"
            size={20}
            color={resources.colors.black}
            style={{
              paddingRight: wp('2%'),
            }}
          />
          <Text style={styles.itemText}>
            {item.start_time} - {item.end_time}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <>
      {weeks.length > 0 && (
        <FlatList
          data={weeks[index].timeTable}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({item, index}) => _renderClass(item, index)}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  itemText: {
    color: resources.colors.black,
    fontSize: Platform.OS == 'ios' ? hp('1.6%') : hp('1.8%'),
    fontWeight: '300',
    letterSpacing: 0.4,
  },
});

export default ClassRender;
