import { Request, Response } from 'express';
import execute from '../database/executeQuery';
import { ItemInterface, Addtocartbody, checkdetail,Removefromcart } from '../interfaces/itemcrudInt';
import { Userint } from '../interfaces/userInterface';
import { ResultSetHeader } from 'mysql2';

export const fetchdetail = async (req: Request, res: Response) => {
  const user: Userint = req.user as Userint;
  const fetchitemqr: string = `select * from items;`;
  const fetchItem: ItemInterface = await execute(fetchitemqr, []) as ItemInterface;
  res.json({ fetchItem: fetchItem, user_detail: user })
}
export const addtocart = async (req: Request<{}, {}, Addtocartbody, {}>, res: Response) => {
  const values: Array<number> = [req.body.user_id, req.body.item_id];
  console.log(values);
  
  try {
    const checkexist: string = 'select isdeleted,quantity from cart where user_id=? and item_id=?'
    const checkres: [checkdetail] = await execute(checkexist, values) as [checkdetail];

    if (checkres[0] == undefined) {
      const addtocartqr = `insert into cart (user_id,item_id,quantity) values (?,?,1)`;
      const result: ResultSetHeader = await execute(addtocartqr, values) as ResultSetHeader;
    }
    else if (checkres[0] !== undefined) {
      if (checkres[0].isdeleted == 1) {
        const updatecart = 'update cart set isdeleted=0,quantity=1 where user_id=? and item_id=?;'
        const resupdatecart = await execute(updatecart, values);
        res.json("success");
      }
      else {
        const addQnt = 'update cart set quantity= quantity+1 where user_id=? and item_id=?;';
        const executeQnt = await execute(addQnt,values);
        res.json("exist");
      }
    }
  } catch (error) {
    console.log(error as Error);
    res.json("failed")
  }
}

export const removefromcart = async(req:Request<{}, {}, {}, Removefromcart>,res:Response) =>{
  const removeQr = `update cart set isdeleted=1 where cart_id=?;`;
  const deleted:ResultSetHeader = await execute(removeQr,[req.query.cart_id]) as ResultSetHeader;
  if (deleted.affectedRows != 0) {
      res.json("deleted");
  }
  else{
    res.json("error")
  }
}
export const fetchcart = async (req: Request, res: Response) => {
  const user: Userint[] = req.user as Userint[];
  const cartqr = `select cart_id,cart.item_id,item_name,item_photo,item_price from items 
  join cart on cart.item_id = items.item_id
  join users on users.u_id = cart.user_id
  where cart.user_id = ? and cart.isdeleted=0;`;
  const rescart = await execute(cartqr, [user[0].u_id]);
  res.json({ cartdetail: rescart })
}