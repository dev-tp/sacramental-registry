import config from './config';
import mysql from 'mysql';

const connection = mysql.createConnection(config);

export default connection;
