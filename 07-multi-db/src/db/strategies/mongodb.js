const ICrud = require('./interfaces/ICrud');

class MongoDB extends ICrud {
  constructor() {
    super();
  }

  create(item) {
    console.log('O item foi salvo em MongoDb');
  }
}

module.exports = MongoDB;
