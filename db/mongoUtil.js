const { MongoClient } = require('mongodb');

var config = require('../config/local.json');

let mongoClientInstance = null;

var _db;

// Object of connection Option
const connectionOption = {
    maxPoolSize: config.maxPoolSize
}

module.exports = {
    connectToDb: async function(){
      if (!mongoClientInstance) {
          mongoClientInstance = await MongoClient.connect(config.mongoUrl, connectionOption);
          console.log("Database Connected Successfully");
          _db =  mongoClientInstance.db(config.mongoDatabase);
      }
     },
   getDb: function() {
    return _db;
  }
}