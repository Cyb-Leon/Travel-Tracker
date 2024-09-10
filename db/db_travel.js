import pg from "pg";
import { configDotenv } from "dotenv";

configDotenv();
const db = new pg.Client({
    user: process.env.gresUsr,
    host: process.env.gresHOST,
    database: process.env.gresDB,
    password: process.env.gresPSW,
    port: process.env.gressPORT,
  });
  db.connect();

export const Traveldatabase = db;