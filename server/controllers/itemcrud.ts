import { Request,Response } from 'express';
import execute from '../database/executeQuery';
import { ResultSetHeader } from 'mysql2';

export const addItem = async (req:Request,res:Response) =>{
    const file : Express.Multer.File | undefined = req.file;
    const filename:string | undefined = file?.filename;
    const additemqr:string = `insert into items (item_photo,item_name,item_desc,item_price,isdeleted) values (?,?,?,?,0);`;
    const additemVal:Array<string> = ["/uploads/" + filename,req.body.item_name,req.body.item_desc,req.body.item_price]
    const result:ResultSetHeader = await execute(additemqr,additemVal) as ResultSetHeader;
    console.log(result);
    if (result.insertId) {
        res.json("posted")
    }
}
