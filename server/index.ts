import dotenv from "dotenv";
import express, { Express } from "express";
import cors from "cors";
import bodyParser from 'body-parser';
import cookie from 'cookie-parser';
dotenv.config();
const app: Express = express();
import regloginRoute from './routes/regloginRoutes'
import itemcrudRoute from './routes/itemcrudRoute'

app.use(cookie());

app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000',credentials:true}));
app.use('/',regloginRoute);
app.use('/',itemcrudRoute);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});