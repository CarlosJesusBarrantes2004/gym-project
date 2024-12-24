import { Database } from '../db/db.js';
import { AuthDb } from '../db/classes/Auth.js';
import { MembershipDb } from '../db/classes/Memberships.js';

const databaseMiddleware = async (req, res, next) => {
  try {
    const db = await Database.getInstance();

    req.authDb = new AuthDb(db);
    req.membershipDb = new MembershipDb(db);

    await req.authDb.initializeTable();
    await req.membershipDb.initializeTable();

    next();
  } catch (error) {
    console.log(error);
  }
};

export default databaseMiddleware;
