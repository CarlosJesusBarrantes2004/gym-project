import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export class Database {
  static instance = null;

  static async getInstance() {
    if (!Database.instance) {
      const db = await open({
        filename: 'gym.db',
        driver: sqlite3.Database,
      });
      Database.instance = db;
    }
    return Database.instance;
  }
}
