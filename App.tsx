if (__DEV__) {
  require('./ReactotronConfig');
}
import {View, Text, LayoutAnimation, TouchableOpacity} from 'react-native';
import React, {useCallback} from 'react';
import HomeScreen from './src/screens/home/HomeScreen';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import TestDesign from './src/screens/test_design/TestDesign';
import {useDimensionsChange} from 'react-native-responsive-dimensions';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import TestingUIHelperMethods from './src/screens/testing_responsive_design_modules';

const App = () => {
  // const {isLoading} = useAppSelector(state => state.auth);
  // const dispatch = useAppDispatch();

  // useDimensionsChange(
  //   useCallback(({window, screen}) => {
  //     // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  //   }, []),
  // );

  return (
    <Provider store={store}>
      <TestingUIHelperMethods />

      {/* <LoaderComponent isLoading={isLoading} /> */}
    </Provider>
  );
};

export default App;
