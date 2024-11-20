import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  LayoutAnimation,
  Pressable,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import {useHeight, useWidth} from '../../utility/ResponsiveUIHelpers';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {decrement, increment, setSearchValue} from '../../redux/authSlice';
import {handleSearchCall} from '../../API/ApiServices';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

const TestDesign = () => {
  const {searchData} = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();
  const [orientation, setOrientation] = useState('');

  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);

  var searchTimer: string | number | NodeJS.Timeout | undefined = undefined;

  useEffect(() => {
    dispatch(setSearchValue(''));
  }, [dispatch]);

  return (
    <View>
      <FlatList
        data={searchData}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({item, index}) => {
          return (
            <View
              style={{
                width: useWidth(90),
                height: useHeight(7),
                borderWidth: 0.5,
                borderColor: '#000',
                borderRadius: 5,
                elevation: 1,
                backgroundColor: '#fff',
                alignSelf: 'center',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: useWidth(3.5),
                  color: '#000',
                }}>
                {item.name}
              </Text>
            </View>
          );
        }}
        ItemSeparatorComponent={() => (
          <View
            style={{
              width: useWidth(100),
              height: useHeight(2),
            }}
          />
        )}
        style={{
          marginTop: useHeight(2),
        }}
      />

      {/* <LoaderComponent isLoading={isLoading} /> */}
    </View>
  );
};

// const styles = StyleSheet.create({
//   card: {
//     width: useWidth(90),
//     height: useHeight(20),
//     borderRadius: 10,
//     backgroundColor: 'blue',
//     marginHorizontal: wp('5%'),
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: hp('2'),
//   },
// });

export default TestDesign;
