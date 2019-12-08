import React, { useContext } from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';
import { Playlist } from '../models/Playlist';
import { Feather } from '@expo/vector-icons';
import { Context } from '../context/PlaylistContext';

interface SongsScreenProps {
    navigation: NavigationStackProp<{}, {playlistName: string}>
}

const SongsScreen = (props: SongsScreenProps) => {
    const { state } = useContext(Context)
    const playlist = state.selectedPlaylist
    return (
        <View style={{backgroundColor: playlist.color}}>
            <FlatList 
                data={playlist.songs}
                keyExtractor= {song => `${song.id}`}
                renderItem={ ({item}) => {
                    return (
                        <View style={styles.row}>
                            <Text style={styles.title}>{ item.name }</Text>
                        </View>
                    )
                }}
            />
        </View>
      );
};

SongsScreen.navigationOptions = ({ navigation }: SongsScreenProps) => {
    return {
        title: navigation.getParam('playlistName'),
        headerRight: (
            <TouchableOpacity onPress={() => navigation.navigate('SongSelection')}>
                <Feather name="plus" size={30}/>
            </TouchableOpacity>
        )
    }
}

export default SongsScreen;

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
});
