import mysql from 'mysql';

const database = mysql.createConnection({
  host: 'localhost',
  database: 'sacraments',
  user: '',
  password: '',
});

database.connect((error: mysql.MysqlError) => {
  if (error) {
    throw error;
  }
});

export default database;
