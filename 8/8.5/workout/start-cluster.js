'use strict';

const cluster = require('cluster');

if (cluster.isMaster) {
    const numCPUs = require('os').cpus().length;

    console.log('Number of CPUs:', numCPUs);

    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', function (worker, code, signal) {
        console.log('Worker %d died', worker.process.pid);

        console.log('Starting new worker for replacement');

        cluster.fork();
    });

    cluster.on('online', function (worker) {
        console.log('Worker %d is online', worker.process.pid);
    });
} else {
    require('./bin/www');
}
