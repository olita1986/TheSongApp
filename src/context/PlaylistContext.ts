import { Song } from './../models/Song';
import { Playlist } from './../models/Playlist';
import { createCtx } from './createDataContext';

export enum ActionTypes {
    ADD_SONG = "ADD_SONG",
    SET_PLAYLIST = "SET_PLAYLIST"
}

// interface Action {
//     type: ActionTypes,
//     payload: Song | Playlist
// }

type Action =
  | { type: ActionTypes; payload: Song[] }
  | { type: ActionTypes; payload: Playlist }

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
        default:
            return state
    }
}

const playlists: Playlist[] = [
    {
        id: 0,
        name: "Relaxing",
        color: "#fff",
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
        color: "#ddnnff",
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