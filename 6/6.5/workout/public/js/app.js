requirejs.config({
    baseUrl: '/js/vendors',
    paths: {
        app: '../app',
        jquery: 'jquery.min',
        bootstrap: 'bootstrap.min',
        handlebars: 'handlebars.min'
    },
    shim: {
        bootstrap: { deps: ['jquery'] },
        handlebars: {
            exports: 'Handlebars'
        }
    }
});

define(['app/main']);
