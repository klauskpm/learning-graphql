"use strict";

const express = require('express');
const graphqlHTTP = require('express-graphql');
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLBoolean
} = require('graphql');

const PORT = process.env.PORT || 3000;
const server = express();

const videoType = new GraphQLObjectType({
    name: 'Video',
    description: 'The video type',
    fields: {
        id: {
            type: GraphQLID,
            description: 'The id of the video.'
        },
        title: {
            type: GraphQLString,
            description: 'The title of the video.'
        },
        duration: {
            type: GraphQLInt,
            description: 'The duration of the video (in seconds).'
        },
        watched: {
            type: GraphQLBoolean,
            description: 'Whether or not the viewer watched the video.'
        }
    }
});

const queryType = new GraphQLObjectType({
    name: 'QueryType',
    description: 'The root query type.',
    fields: {
        video: {
            type: videoType,
            resolve: () => new Promise(resolve => {
                resolve({
                    id: 'a',
                    title: 'GraphQL for sure',
                    duration: 180,
                    watched: false
                })
            })
        }
    }
});

const schema = new GraphQLSchema({
    query: queryType
});

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

server.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

server.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
});