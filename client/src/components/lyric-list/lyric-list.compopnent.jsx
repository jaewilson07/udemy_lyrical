import React from 'react';

import { Button } from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import DeleteIcon from '@material-ui/icons/Delete';

import './lyric-list.styles.scss';
import { useMutation } from '@apollo/client';
import { GET_SONG, LIKE_LYRIC } from '../../graphql/GRAPHQL_QUERIES';

const LyricList = ({ lyrics, songId }) => {
  // const handleDeleteLyric = (lyricId) => {

  //   deleteLyric({ variables: { lyricId } }).then((resp) => {
  //     if (resp.data) {
  //       console.log(data);
  //     }
  //   });
  // };

  const [likeLyric] = useMutation(LIKE_LYRIC, {
    refetchQueries: [{ query: GET_SONG, variables: { songId } }],
  });

  const onLike = (lyricId, numLikes) => {
    likeLyric({
      variables: { lyricId },
      optimisticResponse: {
        __typename: 'Mutation',
        likeLyric: {
          id: lyricId,
          __typename: 'LyricType',
          likes: numLikes + 1,
        },
      },
    }).then((resp) => console.log(resp));
  };

  return (
    <div className="lyric-list">
      {lyrics.map(({ id, content, likes }) => (
        <li className="lyric" key={id}>
          {content}
          <div className="lyric__icons">
            <Button color="primary">
              <CreateIcon />
            </Button>
            <div>
              <Button color="primary" onClick={() => onLike(id, likes)}>
                <ThumbUpIcon />
              </Button>
              {likes}
            </div>

            <Button color="primary">
              <DeleteIcon />
            </Button>
          </div>
        </li>
      ))}
    </div>
  );
};

export default LyricList;
