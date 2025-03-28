const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const projectRoot = __dirname;

const config = getDefaultConfig(projectRoot);

config.resolver.alias = {
  ...config.resolver.alias,
  '@components': path.resolve(projectRoot, 'components'),
  '@lib': path.resolve(projectRoot, 'lib'),
  '@images': path.resolve(projectRoot, 'assets/images'),
  '@fonts': path.resolve(projectRoot, 'assets/fonts'),
  '@svg': path.resolve(projectRoot, 'assets/svg'),
  '@app': path.resolve(projectRoot, 'app'),
  '@store': path.resolve(projectRoot, 'store'),
  '@surfacesConstants': path.resolve(projectRoot,'components/surfaces/constants')
};
module.exports = config;