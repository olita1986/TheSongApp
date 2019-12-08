import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import MainScreen from './src/screens/MainScreen';
import { Provider } from './src/context/PlaylistContext';
import SongsScreen from './src/screens/SongsScreen';
import SongsSelectionScreen from './src/screens/SongsSelectionScreen';


const MainStack = createStackNavigator(
  {
    Main: MainScreen,
    Songs: SongsScreen,
    SongSelection: SongsSelectionScreen
  },
  {
    initialRouteName: 'Main',
    defaultNavigationOptions: {
      title: 'Song App'
    }
  }
)

const App = createAppContainer(MainStack);

export default () => {
  return <Provider>
      <App />
  </Provider>
}
