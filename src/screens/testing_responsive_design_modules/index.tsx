import {View, Text} from 'react-native';
import React from 'react';
import {useHeight, useWidth} from '../../utility/ResponsiveUIHelpers';

const TestingUIHelperMethods = () => {
  return (
    <View>
      <View
        style={{
          width: useWidth(90),
          height: useHeight(10),
          backgroundColor: 'blue',
          borderRadius: 5,
          marginHorizontal: useWidth(5),
          marginTop: useHeight(5),
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>react-native-responsive-dimensions</Text>
      </View>
    </View>
  );
};

export default TestingUIHelperMethods;
