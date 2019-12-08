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
        <View style={[styles.main, {backgroundColor: playlist.color}]}>
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
    main: {
        flex: 1,
    },
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
});
