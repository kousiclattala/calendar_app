import React from 'react';
import {View, Text, StatusBar, NativeModules, Platform} from 'react-native';
import {resources} from '../resources';

const Header = () => {
  const {StatusBarManager} = NativeModules;

  return (
    <View>
      {Platform.OS == 'ios' && (
        <View
          style={{
            height: StatusBarManager.HEIGHT,
            backgroundColor: resources.colors.white_light,
          }}
        />
      )}

      <StatusBar
        backgroundColor={resources.colors.white_light}
        barStyle={'dark-content'}
      />
    </View>
  );
};

export default Header;
