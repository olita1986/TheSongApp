import React, { useContext } from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Context, ActionTypes } from '../context/PlaylistContext';
import { NavigationStackProp } from 'react-navigation-stack';
import { Playlist } from '../models/Playlist';

interface MainScreenProps {
  navigation: NavigationStackProp
}


const MainScreen = ({navigation}: MainScreenProps) => {
  const { state, dispatch } = useContext(Context)

  const onPlaylistPressed = (playlist: Playlist) => {
    dispatch({type: ActionTypes.SET_PLAYLIST, payload: playlist});
    navigation.navigate('Songs', { playlistName: playlist.name })
  }
  return (
    <View>
        <FlatList 
            data={state.playlists}
            keyExtractor= {playlist => `${playlist.id}`}
            renderItem={ ({item}) => {
                return (
                  <TouchableOpacity onPress={() => onPlaylistPressed(item)}>
                    <View style={styles.row}>
                        <Text style={styles.title}>{ item.name }</Text>
                        <Text>{item.songs.length}</Text>
                    </View>
                  </TouchableOpacity>
                
                    )
            }}
        />
    </View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
    borderTopWidth: 1,
    borderColor: 'gray',
    paddingHorizontal: 10
},
title: {
    fontSize: 18
},
songCount: {
  fontSize: 18
}
});



