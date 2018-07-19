'use strict';
const rethinkdb = require('rethinkdb');
const async = require('async');

class db {
  setupDb() {
    let self = this;
    async.waterfall(
      [
        (callback) => {
          self.connectToRethinkDbServer((err, connection) => {
            if (err) {
              return callback(true, 'Error in connecting RethinkDB');
            }
            callback(null, connection);
          });
        },
        (connection, callback) => {
          rethinkdb.dbCreate('polls').run(connection, (err, result) => {
            if (err) {
              console.log('Database already created');
            } else {
              console.log('Created new database');
            }
            callback(null, connection);
          });
        },
        (connection, callback) => {
          rethinkdb
            .db('polls')
            .tableCreate('poll')
            .run(connection, (err, result) => {
              connection.close();
              if (err) {
                console.log('table already created');
              } else {
                console.log('Created new table');
              }
              callback(null, 'Database is setup successfully');
            });
        }
      ],
      (err, data) => {
        console.log(data);
      }
    );
  }

  connectToRethinkDbServer(callback) {
    rethinkdb.connect(
      {
        host: 'localhost',
        port: 28015
      },
      (err, connection) => {
        callback(err, connection);
      }
    );
  }

  connectToDb(callback) {
    rethinkdb.connect(
      {
        host: 'localhost',
        port: 28015,
        db: 'polls'
      },
      (err, connection) => {
        callback(err, connection);
      }
    );
  }
}

module.exports = db;
