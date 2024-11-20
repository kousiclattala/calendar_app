// ReactotronConfig.js
import Reactotron from 'reactotron-react-native';
import {reactotronRedux} from 'reactotron-redux';
import reactotronSaga from 'reactotron-redux-saga';

// then add it to the plugin list
const reactotron = Reactotron.configure({name: 'React Native Demo'})
  .useReactNative()
  .use(reactotronRedux()) //  <- here i am!
  .use(reactotronSaga())
  .connect(); //Don't forget about me!

export default reactotron; // also: export me so I can be referenced by Redux store
