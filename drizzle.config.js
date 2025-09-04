const mysql = require('mysql');

const database = mysql.createConnection({
  host: 'localhost',
  database: 'sacraments',
  user: '',
  password: ''
});

database.connect(function (error) {
  if (error) {
    throw error;
  }
});

module.exports.database = database;
