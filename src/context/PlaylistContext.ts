import { Song } from './../models/Song';
import { Playlist } from './../models/Playlist';
import { createCtx } from './createDataContext';

export enum ActionTypes {
    ADD_SONG = "ADD_SONG",
    SET_PLAYLIST = "SET_PLAYLIST",
    REMOVE_SONG = "REMOVE_SONG"
}

type Action =
  | { type: ActionTypes.ADD_SONG; payload: Song }
  | { type: ActionTypes.SET_PLAYLIST; payload: Playlist }
  | { type: ActionTypes.REMOVE_SONG; payload: Song }

export interface AppState {
    playlists: Playlist[]
    songs: Song[]
    selectedPlaylist?: Playlist
}

// Reducer

export type PlaylistReducer = (state: AppState, action: Action) => AppState

const playlistReducer = (state: AppState, action: Action): AppState => {
    switch (action.type) {
        case ActionTypes.ADD_SONG:
            const songs: Song[] = state.selectedPlaylist.songs.concat(action.payload)
            const newSelectedPlaylist: Playlist = {
                ...state.selectedPlaylist,
                songs
            } 
            return {
                ...state,
                playlists: state.playlists.map( playlist => {
                        return playlist.id === state.selectedPlaylist.id ?
                            newSelectedPlaylist : playlist
                }),
                selectedPlaylist: newSelectedPlaylist
            }
        case ActionTypes.SET_PLAYLIST:
            return {
                ...state,
                selectedPlaylist: action.payload
            }
        case ActionTypes.REMOVE_SONG:
                const newSongs: Song[] = state.selectedPlaylist.songs.filter(song => song.id !== action.payload.id)
                const newPlaylist: Playlist = {
                    ...state.selectedPlaylist,
                    songs: newSongs
                } 
                return {
                    ...state,
                    playlists: state.playlists.map( playlist => {
                            return playlist.id === state.selectedPlaylist.id ?
                                newPlaylist : playlist
                    }),
                    selectedPlaylist: newPlaylist
                }
        default:
            return state
    }
}

const playlists: Playlist[] = [
    {
        id: 0,
        name: "Relaxing",
        color: "#9FA8DA",
        songs: [
            {
                id: 0,
                name: "Redemption Song"
            }
        ]
    },
    {
        id: 1,
        name: "Work",
        color: "#42f5f5",
        songs: [
            {
                id: 1,
                name: "We are the champions"
            }
        ]
    }
] 

const songs = [
    {
        id: 1,
        name: "We are the champions"
    },
    {
        id: 0,
        name: "Redemption Song"
    }
]

const initialState: AppState = {
    playlists,
    songs
} 

export const { Context, Provider } = createCtx(playlistReducer, initialState)