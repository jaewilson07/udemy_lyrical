import React, { useState } from 'react';

import { useMutation } from '@apollo/client';
import { GET_SONG, ADD_LYRIC } from '../../graphql/GRAPHQL_QUERIES';

const LyricCreate = ({ songId }) => {
  const [lyric, setLyric] = useState('');

  const [createLyric] = useMutation(ADD_LYRIC, {
    refetchQueries: [{ query: GET_SONG, variables: { songId } }],
  });

  const onChange = ({ target: { value } }) => {
    setLyric(value);
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    createLyric({
      variables: { songId, content: lyric },
    }).then((resp) => setLyric(''));
  };

  return (
    <form className="lyric_create" onSubmit={(event) => onFormSubmit(event)}>
      <label>New Lyric: </label>
      <input
        name="content"
        onChange={(event) => onChange(event)}
        value={lyric}
      />
    </form>
  );
};

export default LyricCreate;
