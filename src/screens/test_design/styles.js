import {StyleSheet} from 'react-native';
import {
  useWidth,
  useHeight,
  widthPercentageToDP,
} from '../../utility/ResponsiveUIHelpers';
import {heightPercentageToDP} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  //   card: {
  //     width: useWidth(90),
  //     height: useHeight(20),
  //     borderRadius: 10,
  //     backgroundColor: 'blue',
  //     marginHorizontal: useWidth(5),
  //     justifyContent: 'center',
  //     alignItems: 'center',
  //     marginTop: useHeight(2),
  //   },
  card2: {
    width: widthPercentageToDP(90),
    height: heightPercentageToDP(20),
    borderRadius: 10,
    backgroundColor: 'blue',
    marginHorizontal: widthPercentageToDP(5),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: heightPercentageToDP(2),
  },
});
