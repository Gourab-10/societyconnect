import { DatabaseSync } from 'node:sqlite';
import path from 'path';

import fs from 'fs';

// Connect to SQLite database in the root folder
const legacyDb = path.resolve(process.cwd(), 'sahaaya.db');
const newDb = path.resolve(process.cwd(), 'societyconnect.db');
const dbPath = fs.existsSync(legacyDb) ? legacyDb : newDb;
const db = new DatabaseSync(dbPath);

// Enable WAL mode for better concurrency
db.exec('PRAGMA journal_mode = WAL');

export default db;
