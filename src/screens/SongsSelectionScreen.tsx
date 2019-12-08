import React, { useContext, useRef, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, FlatList, ViewComponent } from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';
import { Context, ActionTypes } from '../context/PlaylistContext';
import { Feather } from '@expo/vector-icons';
import { Song } from '../models/Song';

interface SongsSelectionScreenProps {
    navigation: NavigationStackProp
}

const SongsSelectionScreen = (props: SongsSelectionScreenProps) => {
    const { state, dispatch } = useContext( Context );
    const ids = state.selectedPlaylist.songs.map(song => song.id) 
    const [ selectedSongIds, setSelectedSongIds ] = useState<number[]>(ids)

    const onSelectSong = (song: Song) => {
        if (ids.includes(song.id)) {
            const songIds = selectedSongIds.filter( id => id !== song.id)
            setSelectedSongIds(songIds)
            dispatch({type: ActionTypes.REMOVE_SONG, payload: song})
        } else {
            const songIds = [...selectedSongIds, song.id]
            setSelectedSongIds(songIds)
            dispatch({type: ActionTypes.ADD_SONG, payload: song})
        }
    }

    const selectedSong = (songId: number): boolean => {
        return selectedSongIds.includes(songId)  
    }

  return (
    <View>
        <FlatList 
            extraData={selectedSongIds}
            data={state.songs}
            keyExtractor= {song => `${song.id}`}
            renderItem={ ({item}) => {
                return (
                  <TouchableOpacity onPress={() => onSelectSong(item)}>
                    <View 
                        style={[styles.row, selectedSong(item.id) ? styles.selectedRow : null]}
                    >
                        <Text style={styles.title}>{ item.name }</Text>
                        { selectedSong(item.id) &&
                            <Feather name="check-circle" size={25}/>
                        }
                    </View>
                  </TouchableOpacity>
                )
            }}
        />
    </View>
  );
};

SongsSelectionScreen.navigationOptions = ({navigation}: SongsSelectionScreenProps) => {
    return {
        title: 'Add Songs',
        headerRight: (
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={styles.doneButton}>Done</Text>
            </TouchableOpacity>
        ),
        headerLeft: null
    }
}

export default SongsSelectionScreen;

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderColor: 'gray',
        paddingHorizontal: 10
    },
      title: {
        fontSize: 18
    },
  doneButton: {
    color: 'blue',
    fontSize: 18,
    fontWeight: 'bold',
    paddingRight: 20
  },
  selectedRow: {
      backgroundColor: "#d5d9e0"
  }
});
