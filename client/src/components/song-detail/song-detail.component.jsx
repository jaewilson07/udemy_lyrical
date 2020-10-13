import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import LyricCreate from '../lyric-create/lyric-create.component';

import { GET_SONG } from '../../graphql/GRAPHQL_QUERIES';
import LyricList from '../lyric-list/lyric-list.compopnent';

const SongDetail = ({ match }) => {
  const songId = match.params.id;

  const { data, loading, error } = useQuery(GET_SONG, {
    variables: { songId },
  });

  if (loading) return <p>Loading...</p>;

  if (data.song) {
    return (
      <div>
        <Link to="/">Back</Link>
        <h1>Title: {data.song.title}</h1>
        <LyricList lyrics={data.song.lyrics} songId={songId} />

        <LyricCreate songId={songId} />
      </div>
    );
  }
  return <h3> {error} </h3>;
};

export default SongDetail;
