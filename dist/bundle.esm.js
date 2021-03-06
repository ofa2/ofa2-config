import _ from 'lodash';
import filePathOneLayer from '@ofa2/file-path-one-layer';
import path from 'path';

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

export default lift;
//# sourceMappingURL=bundle.esm.js.map
