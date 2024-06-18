import express from "express";
let app = express.Router();
app.use(express.static('public'));

import {register,login} from '../controllers/register'
import {fetchdetail,addtocart,fetchcart,removefromcart} from '../controllers/homepage'
import '../middleware/passport'
import passport from "passport"

app.post("/reg_data", register)
app.post("/login",login)
app.get("/fetchdetail",passport.authenticate('jwt', { session: false, failureRedirect: '/login' }),fetchdetail);
app.post("/addtocart",passport.authenticate('jwt', { session: false, failureRedirect: '/login' }),addtocart);
app.get("/fetchcart",passport.authenticate('jwt', { session: false, failureRedirect: '/login' }),fetchcart);
app.get("/removecart",passport.authenticate('jwt', { session: false, failureRedirect: '/login' }),removefromcart);

export default app;