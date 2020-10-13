import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { ADD_SONG, GET_ALL_SONGS } from '../../graphql/GRAPHQL_QUERIES';

import './song-create.styles.scss';

const SongCreate = () => {
  // declare hooks
  let history = useHistory();
  const [song, setSong] = useState({ title: '' });

  const [createSong] = useMutation(ADD_SONG, {
    refetchQueries: [{ query: GET_ALL_SONGS }],
  });

  // functions
  const onChange = ({ target: { name }, target: { value } }) => {
    const _song = { ...song, [name]: value };
    setSong(_song);
  };

  const onFormSubmit = (event) => {
    event.preventDefault();
    console.log('submitting');

    createSong({ variables: { title: song.title } }).then((resp) => {
      if (resp.data) {
        history.push('/');
      }
    });
  };

  return (
    <div className="">
      <Link to="/">Back</Link>
      <h1> create a new song</h1>
      <form onSubmit={(event) => onFormSubmit(event)}>
        <label>Song Title: </label>
        <input
          name="title"
          onChange={(event) => onChange(event)}
          value={song.title}
        />
      </form>
    </div>
  );
};

export default SongCreate;
