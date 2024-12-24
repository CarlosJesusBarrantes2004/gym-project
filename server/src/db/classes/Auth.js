import bcrypt from 'bcrypt';
import createToken from '../../utils/jwt.js';

export class AuthDb {
  constructor(db) {
    this.db = db;
  }

  async initializeTable() {
    await this.db.exec(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL,
            password TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);
  }

  async createUser(user) {
    try {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(user.password, saltRounds);

      const result = await this.db.run(
        `
            INSERT INTO users (username, password) VALUES (?, ?)
        `,
        [user.username, hashedPassword]
      );

      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async verifyCredentials(user) {
    const { username, password } = user;

    try {
      const user = await this.db.get('SELECT * FROM users WHERE username = ?', [
        username,
      ]);

      if (!user) return { success: false, message: 'User not found' };

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch)
        return { success: false, message: 'Invalid credentials' };

      const token = createToken({ id: user.id, username: user.username }, '8h');

      return {
        success: true,
        token,
        user: {
          id: user.id,
          username: user.username,
        },
      };
    } catch (error) {
      console.log(error);
    }
  }
}
