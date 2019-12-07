import { Song } from './Song';

export interface Playlist {
    id: number
    name: string
    color: string
    songs: Song[]
}