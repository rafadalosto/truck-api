const connection = require('../../src/database/index');
const models = connection.models;

module.exports = () => {
    return Promise.all(
      Object.keys(models).map(key => {
        return models[key].destroy({ truncate: true, force: true });
      })
    );
  };

