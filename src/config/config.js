import dotenv from 'dotenv';

dotenv.config({ path: process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env' });

const env = process.env.NODE_ENV;

const MONGO_USERNAME = process.env.MONGO_USERNAME || '';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || '';
const MONGO_DB = process.env.MONGO_DB || '';
const dbName = encodeURIComponent(MONGO_DB);
const dbProvider = process.env.DB_PROVIDER || 'mongo';
let MONGO_URL = `mongodb+srv://${encodeURIComponent(MONGO_USERNAME)}:${encodeURIComponent(MONGO_PASSWORD)}@cluster0.jcm6pnx.mongodb.net/${dbName}`;

if (env === 'testing') {
  MONGO_URL = process.env.MONGO_URL || '';
}
console.log(MONGO_URL);
const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 5000;
const SECRET_KEY = process.env.SECRET_KEY || '';

const config = {
  mongo: {
    username: MONGO_USERNAME,
    password: MONGO_PASSWORD,
    url: MONGO_URL,
  },
  server: {
    port: SERVER_PORT,
  },
  env,
  dbProvider,
  SECRET_KEY,
};

export default config;
