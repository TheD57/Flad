module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    
    // always the last plugin
    plugins: ['react-native-reanimated/plugin'],
  };
};
