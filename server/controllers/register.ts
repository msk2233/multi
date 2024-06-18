import { Request, Response, RequestHandler } from 'express';
import { Userint } from '../interfaces/userInterface';
import execute from '../database/executeQuery';
import dotenv from 'dotenv';
dotenv.config();
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
interface register_body {
    fname: string,
    lname: string,
    gender: string,
    dateofbirth: string,
    phno: string,
    email: string,
    state: string,
    pass: string
}
interface login {
    u_id: number,
    email: string
    pass: string
}
export const register = async (req: Request<{},{},register_body,{}>, res: Response) => {
    const { fname, lname, gender, dateofbirth, phno, email, state, pass } = req.body;
    const password = await bcrypt.hash(pass, 7);
    try {
        const existqr:string = `select * from users where email=? or phno=?`;
        const existval:Array<string>=[email,phno];
        const checkreg:Userint = await execute(existqr,existval) as Userint;
        
        if (!checkreg) {
            const regqr = `insert into users (fname,lname,gender,dob,phno,email,state,password) values (?,?,?,?,?,?,?,?);`
            const regval = [fname, lname,- gender,dateofbirth.substring(0, 10),phno, email, state, password ];
            await execute(regqr,regval)
            res.json("success"); 
        }
        else{
            res.json("exist")
        }
    } catch (error) {
        console.log(error);
        res.json("failed")
    }   
}
export const login = async (req: Request<{},{},login,{}>,res:Response) => {
    const { email, pass } = req.body;
    const logqr = `select email,password,u_id from users;`
    const data:[Userint] = await execute(logqr,[]) as [Userint];
    
    data.forEach(async element => {
        const ispass:boolean = await bcrypt.compare(pass, element.password)
        if (email == element.email && ispass) {
            const payload:{} = { email: email ,user_id:element.u_id };
            console.log("login success");
            const token: string = jwt.sign(payload,`${process.env.JWT_SECRET}`, { expiresIn: '5h' });
            res.cookie('token',token);
            res.json({res:"yes"});
        }
    });
}
