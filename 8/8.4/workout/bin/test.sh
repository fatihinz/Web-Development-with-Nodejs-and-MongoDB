#!/usr/bin/env bash

set -o errexit # exit on error

export MONGODB='mongodb://localhost:27017/feedbacktest'
./node_modules/mocha/bin/mocha --timeout 500
