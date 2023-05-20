 require('dotenv').config();


const mongoClient = require('mongodb').MongoClient;

let _db;

const initDb = callback => {
  if (_db) {
    console.log('Db is already initialized!');
    return callback(null, _db);
  }
  mongoClient.connect(process.env.DB_CONNECTION)
    .then(client => {
      _db = client;
      callback(null, _db);
    })
    .catch(err => {
      callback(err);
    });
};

const getDb = () => {
  if (!_db) {
    throw Error('Db not initialized');
  }
  return _db;
};

const closeDb  = callback => {
  if (!_db) {
    throw Error('Db not initialized');
  }
  db.close();
};

module.exports = {
  initDb,
  getDb,
  closeDb
};

