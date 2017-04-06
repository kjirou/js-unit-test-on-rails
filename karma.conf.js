module.exports = function(config) {
  config.set({
    frameworks: ['mocha'],
    browsers: ['PhantomJS'],
    files: [
      'client/spec/built/application.js',
      'node_modules/chai/chai.js',
      'client/spec/**/*.spec.js',
    ],
    reporters: ['mocha', 'junit'],
    junitReporter: {
      outputDir: 'tmp/reports',
    },
  });
};
