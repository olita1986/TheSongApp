import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import MainScreen from './src/screens/MainScreen';

const MainStack = createStackNavigator(
  {
    Main: MainScreen
  },
  {
    initialRouteName: 'Main',
    defaultNavigationOptions: {
      title: 'Song App'
    }
  }
)

const App = createAppContainer(MainStack);

export default App
