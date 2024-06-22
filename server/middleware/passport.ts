import passport from 'passport';
import { Request } from 'express';
import dotenv from 'dotenv';
dotenv.config();
import JwtStrategyPass from 'passport-jwt';
import execute from './../database/executeQuery';
const JwtStrategy = JwtStrategyPass.Strategy;

const getToken = (req:Request) => {
  return req.cookies.token;
}

let opts:{jwtFromRequest:ReturnType<typeof getToken>,secretOrKey:string} = {jwtFromRequest:getToken,secretOrKey:`${process.env.JWT_SECRET}`};

passport.use(new JwtStrategy(opts,async function(jwt_payload,done){
  try{
    const userqr = "select * from users where u_id=?";
    const user = await execute(userqr,[jwt_payload.user_id]);
    if (user) {
      return done(null, user);
    }
    else {
      return done(null, false);
    }
  }
  catch (error) {
    return done(error);
  }
}));