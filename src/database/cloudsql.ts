const mysql = require("mysql");
import { User } from "../models/User";
import Config from "../config/config";


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
    let database: string = Config.Instance.database;
    const options: Options = {
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: database,
      host: process.env.MYSQL_HOST,
      multipleStatements: true
    };

    if (process.env.INSTANCE_CONNECTION_NAME && process.env.NODE_ENV === "production") {
      options.socketPath = `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`;
    }

    this.connection = mysql.createConnection(options);
  }

  // Select object by single value
  public getByPrimary(table: string, pkValue: any, desiredColumns: string = undefined) {
    return new Promise((resolve, reject) => {
      // Configure where identifier
      let pkName: string;
      switch (table) {
        case "users":
          pkName = "username";
          break;
      }
      
      // Configure columns identifier
      let columns = ["*"];
      if (desiredColumns !== undefined) {
        columns = desiredColumns.split(",");
      }
      
      this.connection.query("SELECT ?? FROM ?? WHERE ?? = ?", [columns, table, pkName, pkValue], (error: any, results: any, fields: any) => {
        if (error) reject(error);
        resolve(results[0]);
      });
    });
  }

  // Insert an object into the database
  public insert(data: any) {
    return new Promise((resolve, reject) => {
      let table: string;
      if (data instanceof User) {
        table = "users";
      }

      this.connection.query("INSERT INTO ?? SET ?", [table, data], (err: any, res: any) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  }

  // Delete an object from the database
  public deleteByPK(table: string, pkValue: string) {
    return new Promise((resolve, reject) => {
      let pk: string = this.pkFromTable(table);

      this.connection.query('DELETE FROM ?? WHERE ?? = ?', [table, pk, pkValue], function (err: any, res: any) {
        if (err) reject(err);
        resolve(res);
      })
    });
  }

  // Get the primary key from table
  private pkFromTable(table: string): string {
    if (table === "users") {
      return "username";
    }
  }
}

// Options for the mysql connection
class Options {
  user: string;
  password: string;
  database: string;
  host: string;
  multipleStatements: boolean;
  socketPath?: string;
}

// Create the SQL schema
export function createSchema() {
  let database: string = Config.Instance.database;
  const options: Options = {
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: database,
    host: process.env.MYSQL_HOST,
    multipleStatements: true
  };
  const connection = mysql.createConnection(options);

  connection.query(
    `CREATE DATABASE IF NOT EXISTS \`${database}\`
      DEFAULT CHARACTER SET = 'utf8';
    USE \`${database}\`;
    CREATE TABLE IF NOT EXISTS \`${database}\`.\`users\` (
      \`username\` VARCHAR(255) NOT NULL,
      \`photoUrl\` VARCHAR(255) NULL,
      \`firstname\` VARCHAR(255) NOT NULL,
      \`lastname\` VARCHAR(255) NOT NULL,
      \`email\` VARCHAR(255) NOT NULL,
      \`second_email\` VARCHAR(255) NULL,
    PRIMARY KEY (\`username\`));
    CREATE TABLE IF NOT EXISTS \`${database}\`.\`groups\` (
      \`id\` VARCHAR(255) NOT NULL,
      \`name\` VARCHAR(255) NOT NULL,
      \`privateVis\` BIT(1) NULL,
      \`groupPage\` BIT(1) NULL,
      \`photoUrl\` VARCHAR(255) NULL,
      \`backgroundPhotoUrl\` VARCHAR(255) NULL,
      \`description\` VARCHAR(255) NULL,
      \`notificationsId\` VARCHAR(255) NULL,
      \`eventsId\` VARCHAR(255) NULL,
      \`category\` VARCHAR(255) NULL,
      \`type\` VARCHAR(255) NULL,
      \`officialClub\` BIT(1) NULL,
      \`discoverable\` BIT(1) NULL,
    PRIMARY KEY (\`id\`),
    UNIQUE KEY \`notificationsId_index\` (\`notificationsId\`),
    UNIQUE KEY \`eventsId_index\` (\`eventsId\`),
    KEY \`category_index\` (\`category\`),
    FULLTEXT KEY \`name_index\` (\`name\`));`,
    (err: any) => {
      if (err) {
        throw err;
      }
      connection.end();
    }
  );
}