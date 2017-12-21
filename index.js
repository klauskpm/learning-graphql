"use strict";


const { graphql, buildSchema } = require('graphql');

const schema = buildSchema(`
type Video {
    id: ID
    title: String
    duration: Int
    watched: Boolean
}

type Query {
    video: Video
    videos: [Video]
}

type Schema {
    query: Query
}
`);

const video1 = {
    id: 'a',
    title: 'first video',
    duration: 180,
    watched: false
};

const video2 = {
    id: 'b',
    title: 'second video',
    duration: 120,
    watched: true
};

const video3 = {
    id: '3',
    title: 'some video',
    duration: 130,
    watched: false
};

const video4 = {
    id: '4',
    title: 'that video',
    duration: 240,
    watched: true
};

const videos = [video1, video2];

const resolvers = {
    video: () => ({
        id: '1',
        title: 'The death of those who didn\'t',
        duration: 100,
        watched: true
    }),
    videos: () => videos
};

const query = `
query myFirstQuery {
    videos {
        id
        title
        duration
        watched
    }
}
`;

graphql(schema, query, resolvers)
    .then(response => console.log(response.data.videos))
    .catch(error => console.log(error));