var testsContext = require.context('.', true, /(spec|test)\.js$/i);
testsContext.keys().forEach(testsContext);
