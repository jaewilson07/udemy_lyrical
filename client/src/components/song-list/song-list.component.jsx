import React from 'react';

import { Button, Link } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

import { useMutation, useQuery } from '@apollo/client';

import { DELETE_SONG, GET_ALL_SONGS } from '../../graphql/GRAPHQL_QUERIES';

import './song-list.styles.scss';
import { useHistory } from 'react-router-dom';

const SongList = () => {
  const history = useHistory();
  const { loading, error, data } = useQuery(GET_ALL_SONGS);

  const [deleteSong] = useMutation(DELETE_SONG, {
    refetchQueries: [{ query: GET_ALL_SONGS }],
  });

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.log(error);
  }

  const handleDeleteSong = (songId) => {
    console.log(songId);
    deleteSong({ variables: { songId } }).then((resp) => {
      if (resp.data) {
        console.log(data);
      }
    });
  };

  if (data?.songs) {
    return (
      <ul className="collection">
        {data.songs.map(({ id, title }) => (
          <li key={id} className="collection-item">
            <Link onClick={() => history.push(`/songs/${id}`)}>{title}</Link>
            <Button color="primary" onClick={() => handleDeleteSong(id)}>
              <DeleteIcon />
            </Button>
          </li>
        ))}
      </ul>
    );
  }

  return <p>Error</p>;
};

export default SongList;
