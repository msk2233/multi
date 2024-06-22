
import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

const con = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.UNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  dateStrings: true,
});

export default con;