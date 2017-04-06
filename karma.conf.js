module.exports = function(config) {
  config.set({
    frameworks: ['mocha'],
    browsers: ['PhantomJS'],
    files: [
      'client/spec/built/application.js',
    ],
  });
};
