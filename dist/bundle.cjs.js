'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _ = _interopDefault(require('lodash'));
var filePathOneLayer = _interopDefault(require('file-path-one-layer'));
var path = _interopDefault(require('path'));

function lift() {
  let configPath = path.join(this.projectPath, 'config');
  this.config = {
    paths: {
      projectPath: this.projectPath,
      config: configPath,
      envConfig: path.join(configPath, 'env')
    }
  };
  /* eslint-disable global-require */

  /* eslint-disable import/no-dynamic-require */

  return filePathOneLayer(configPath).then(files => {
    _.forEach(files, file => {
      let config = require(file.path);

      return _.merge(this.config, {
        [file.name]: config.default ? config.default : config
      });
    });
  }).then(() => {
    let envPath = path.join(this.config.paths.envConfig, this.environment);

    let config = require(envPath);

    _.merge(this.config, config.default ? config.default : config);
  }).then(() => {
    return this;
  });
}

module.exports = lift;
//# sourceMappingURL=bundle.cjs.js.map
