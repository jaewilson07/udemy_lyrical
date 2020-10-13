import { gql } from '@apollo/client';

export const GET_ALL_SONGS = gql`
  {
    songs {
      id
      title
    }
  }
`;

export const GET_SONG = gql`
  query GetSong($songId: ID!) {
    song(id: $songId) {
      id
      title
      lyrics {
        id
        content
        likes
      }
    }
  }
`;

export const ADD_SONG = gql`
  mutation AddSong($title: String) {
    addSong(title: $title) {
      id
      title
    }
  }
`;

export const ADD_LYRIC = gql`
  mutation AddLyric($songId: ID, $content: String) {
    addLyricToSong(songId: $songId, content: $content) {
      id
    }
  }
`;

export const LIKE_LYRIC = gql`
  mutation LikeLyric($lyricId: ID) {
    likeLyric(id: $lyricId) {
      id
      likes
    }
  }
`;

export const DELETE_SONG = gql`
  mutation DeleteSong($songId: ID) {
    deleteSong(id: $songId) {
      id
    }
  }
`;
