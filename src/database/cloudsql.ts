const mysql = require('mysql');
import { User } from "../models/User";


// The database connection
export class DBConnection {
  private static instance: DBConnection;
  public connection: any;

  constructor() { }

  static get Instance() {
    if (this.instance === null || this.instance === undefined) {
      this.instance = new DBConnection();
      this.instance.initConnection();
    }
    return this.instance;
  }

  // Initialize a connection to the database
  private initConnection() {
    let options: Options = {
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: 'groupup',
      multipleStatements: true,
      socketPath: undefined
    };

    if (process.env.INSTANCE_CONNECTION_NAME && process.env.NODE_ENV === 'production') {
      options.socketPath = `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`;
    }
    
    this.connection = mysql.createConnection(options);
  }

  // Insert an object into the database
  public insert(data: User) {
    return new Promise((resolve, reject) => {
      this.connection.query('INSERT INTO `users` SET ?', data, (err: any, res: any) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  }
}

// Options for the mysql connection
class Options {
  user: string;
  password: string;
  database: string;
  multipleStatements: boolean;
  socketPath: string;
}

// Create the SQL schema
export function createSchema() {
  let options: Options = {
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: 'groupup',
    multipleStatements: true,
    socketPath: undefined
  };
  const connection = mysql.createConnection(options);

  connection.query(
    `CREATE DATABASE IF NOT EXISTS \`groupup\`
      DEFAULT CHARACTER SET = 'utf8';
    USE \`groupup\`;
    CREATE TABLE IF NOT EXISTS \`groupup\`.\`users\` (
      \`username\` VARCHAR(255) NOT NULL,
      \`photoUrl\` VARCHAR(255) NULL,
      \`firstname\` VARCHAR(255) NOT NULL,
      \`lastname\` VARCHAR(255) NOT NULL,
      \`email\` VARCHAR(255) NOT NULL,
      \`second_email\` VARCHAR(255) NULL,
    PRIMARY KEY (\`username\`));`,
    (err: any) => {
      if (err) {
        throw err;
      }
      console.log('Successfully created schema');
      connection.end();
    }
  );
}