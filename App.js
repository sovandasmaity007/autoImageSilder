/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import ImageList from './src/Screens/ImageList';
import {createStore } from 'redux';
import { Provider } from 'react-redux';


import combineReducer from './src/Redux';

let store = createStore(combineReducer);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <StatusBar
            barStyle="dark-content"
          />
          <ImageList/>
        </View>
       </Provider>
    );
  }
}
