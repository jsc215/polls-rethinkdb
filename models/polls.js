'use strict';
const r = require('rethinkdb');
var db = require('./db');
const async = require('async');

class polls {
  addNewPolls(pollData, callback) {
    async.waterfall([
        (callback) => {
          var dbModel = new db();
          dbModel.connectToDb((err, connection) => {
            if (err) {
              return callback(true, 'Unable to connect to DB');
            }
            callback(null, connection);
          });
        },
        (connection, callback) => {
          r.table('poll')
            .insert({
              question: pollData.question,
              polls: pollData.polls
            })
            .run(connection, (err, res) => {
              connection.close();
              if (err) {
                return callback(true, 'Unable to add new poll');
              }
              callback(null, res);
            });
        }
      ],
      (err, data) => {
        callback(err === null ? false : true, data);
      });
  }

  votePollOption(pollData, callback) {
    async.waterfall(
      [
        (callback) => {
          var dbModel = new db();
          dbModel.connectToDb(function(err, connection) {
            if (err) {
              return callback(true, 'Unable to connect to DB');
            }
            callback(null, connection);
          });
        },
        (connection, callback) => {
          r.table('poll')
            .get(pollData.id)
            .run(connection, (err, res) => {
              if (err) {
                return callback(true, 'Unable to fetch polls');
              }
              for (var pollCounter = 0; pollCounter < res.polls.length; pollCounter++) {
                if (res.polls[pollCounter].option === pollData.option) {
                  res.polls[pollCounter].vote += 1;
                  break;
                }
              }
              r.table('poll')
                .get(pollData.id)
                .update(res)
                .run(connection, (error, result) => {
                  connection.close();
                  if (error) {
                    return callback(true, 'Unable to update vote');
                  }
                  callback(null, result);
                });
            });
        }
      ],
      (err, data) => {
        callback(err === null ? false : true, data);
      }
    );
  }

  getAllPolls(callback) {
    async.waterfall(
      [
        (callback) => {
          var dbModel = new db();
          dbModel.connectToDb(function(err, connection) {
            if (err) {
              return callback(true, 'Unable to connect to DB');
            }
            callback(null, connection);
          });
        },
        (connection, callback) => {
          r.table('poll').run(connection, (error, cursor) => {
            connection.close();
            if (error) {
              return callback(true, 'Unable to fetch all polls');
            }
            cursor.toArray((err, res) => {
              if (err) {
                return callback(true, 'Error reading cursor');
              }
              callback(null, res);
            });
          });
        }
      ],
      (err, data) => {
        callback(err === null ? false : true, data);
      }
    );
  }
}

module.exports = polls;
