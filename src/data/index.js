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

const videos = [video1, video2, video3, video4];

const getVideoById = (id) => new Promise(resolve => {
    const [video] = videos.filter(video => {
        return video.id === id;
    });

    resolve(video);
});

const getVideos = () => new Promise(resolve => {
    resolve(videos);
});

const createVideo = ({ title, duration, released }) => {
    const video = {
        id: (new Buffer(title, 'utf8')).toString('base64'),
        title,
        duration,
        released
    };

    videos.push(video);

    return video;
};

const getObjectById = (type, id) => {
    const types = {
        video: getVideoById
    };

    return types[type](id);
};

exports.getVideoById = getVideoById;
exports.getVideos = getVideos;
exports.createVideo = createVideo;
exports.getObjectById = getObjectById;