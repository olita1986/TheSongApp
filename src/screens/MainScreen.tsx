import React, { useContext } from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Context } from '../context/PlaylistContext';
import { NavigationStackProp } from 'react-navigation-stack';

interface MainScreenProps {
  navigation: NavigationStackProp
}


const MainScreen = ({navigation}: MainScreenProps) => {
  const { state } = useContext(Context)
  return (
    <View>
                <FlatList 
                    data={state.playlists}
                    keyExtractor= {playlist => `${playlist.id}`}
                    renderItem={ ({item}) => {
                        return (
                          <TouchableOpacity onPress={() => navigation.navigate('')}>
                            <View style={styles.row}>
                                <Text style={styles.title}>{ item.name }</Text>
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
}
});



