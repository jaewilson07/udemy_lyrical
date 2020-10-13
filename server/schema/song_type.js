const mongoose = require('mongoose');
const Song = mongoose.model('song');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
} = require('graphql');

const LyricType = require('./lyric_type');

const SongType = new GraphQLObjectType({
  name: 'SongType',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    lyrics: {
      type: new GraphQLList(LyricType),
      resolve(parentValue) {
        return Song.findLyrics(parentValue.id);
      },
    },
  }),
});

module.exports = SongType;
