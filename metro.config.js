const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);
const defaultResolve = config.resolver.resolveRequest;

// Expo Go on Android does not ship ExpoTopicSubscriptionModule (push topics only),
// which crashes expo-notifications on import. Local notifications don't need it.
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (
    platform === 'android' &&
    moduleName === './TopicSubscriptionModule' &&
    context.originModulePath.includes(`${path.sep}expo-notifications${path.sep}`)
  ) {
    return { type: 'sourceFile', filePath: path.join(__dirname, 'src', 'stubs', 'TopicSubscriptionModule.js') };
  }
  return (defaultResolve ?? context.resolveRequest)(context, moduleName, platform);
};

module.exports = config;
