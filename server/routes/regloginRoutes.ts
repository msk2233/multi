import express from "express";
let app = express.Router();
app.use(express.static('public'));

import {register,login} from '../controllers/register'
import {fetchdetail,addtocart,fetchcart,removefromcart} from '../controllers/homepage'
import '../middleware/passport'
import passport from "passport"

app.post("/reg_data", register)
app.post("/login",login)
app.get("/fetchdetail",fetchdetail);
app.post("/addtocart",addtocart);
app.get("/fetchcart",fetchcart);
app.get("/removecart",removefromcart);

export default app;