'use strict';
const r = require('rethinkdb');
// const async = require('async');

class db {
  async setupDb() {
    console.log('setting up db');
    try {
      let connection = await r.connect({
        host: 'localhost',
        port: 28015
      });
      await r.dbCreate('polls').run(connection);
      await r
        .db('polls')
        .tableCreate('poll')
        .run(connection);
    } catch (err) {
      console.log(`Database error ${err}`);
    }
  }

  // setupDb() {
  //   // let self = this;
  //   async.waterfall([
  //       (callback) => {
  //       this.connectToRethinkDbServer((err, connection) => {
  //           if (err) {
  //             return callback(true, 'Error in connecting RethinkDB');
  //           }
  //           callback(null, connection);
  //         });
  //       },
  //       (connection, callback) => {
  //         r.dbCreate('polls').run(connection, (err, result) => {
  //           if (err) {
  //             console.log('Database already created');
  //           } else {
  //             console.log('Created new database');
  //           }
  //           callback(null, connection);
  //         });
  //       },
  //       (connection, callback) => {
  //         r
  //           .db('polls')
  //           .tableCreate('poll')
  //           .run(connection, (err, result) => {
  //             connection.close();
  //             if (err) {
  //               console.log('table already created');
  //             } else {
  //               console.log('Created new table');
  //             }
  //             callback(null, 'Database is setup successfully');
  //           });
  //       }
  //     ],
  //     (err, data) => {
  //       console.log(data);
  //     }
  //   );
  // }

  // connectToRethinkDbServer(callback) {
  //   console.log('the connector has spoken');
  //   r.connect(
  //     { host: 'localhost', port: 28015 },
  //     (err, connection) => {
  //       callback(err, connection);
  //     }
  //   );
  // }

  connectToDb(callback) {
    r.connect(
      { host: 'localhost', port: 28015, db: 'polls' },
      (err, connection) => {
        callback(err, connection);
      }
    );
  }
}

module.exports = db;
