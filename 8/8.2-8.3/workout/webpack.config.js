'use strict';

const webpack = require('webpack');
const extractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const mainPath = path.resolve(__dirname, 'public', 'js', 'app');
const nodeModulesPath = path.resolve(__dirname, 'node_modules');
const buildPath = path.resolve(__dirname, 'public', 'build');

const config = {
    context: __dirname,
    entry: {
        app: mainPath,
        vendors: ['react', 'react-dom', 'jquery', 'handlebars']
    },
    output: {
        path: buildPath,
        filename: '[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: [nodeModulesPath],
                query: {
                    presets: ['react']
                }
            },
            {
                test: /\.css$/,
                loader: extractTextPlugin.extract('style-loader', 'css-loader')
            }
        ]
    },
    resolve: {
        modulesDirectories: [nodeModulesPath],
        alias: {
            'handlebars': 'handlebars/runtime.js'
        }
    },
    resolveLoader: {
        alias: {
            'hbs': 'handlebars-loader'
        }
    },
    plugins: [
        new extractTextPlugin('[name].css'),
        new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js')
    ]
};

module.exports = config;
