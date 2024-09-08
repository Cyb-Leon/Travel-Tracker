import pg from "pg";

const db = new pg.Client({
    user: process.env.USERNAME,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PORT,
  });
  db.connect();

export const Traveldatabase = db;