module.exports = {
    database: process.env.MONGODB || process.env.MONGOLAB_URI || 'mongodb://localhost:27017/feedback',

    eventsPerPage: 30,

    meetupKey: process.env.MEETUP_KEY,

    sessionSecret: process.env.SESSION_SECRET,

    token: process.env.TOKEN,

    redis: process.env.REDIS_URL || 'redis://localhost:6379'
};
