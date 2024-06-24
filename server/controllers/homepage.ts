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
  const cartdata= req.body.cartdata;
  const userdata = req.body.userdata;
  const u_id = userdata.u_id;
  
  try {
    const deleteData = await execute(`delete from cart where user_id=?`,[u_id]);
    
    cartdata.forEach(async (element:ItemInterface) => {
      const checkexist: string = 'select isdeleted,quantity from cart where user_id=? and item_id=?'
      const checkres: [checkdetail] = await execute(checkexist, [u_id,element.item_id]) as [checkdetail];
      if (checkres[0] == undefined) {
        const addtocartqr = `insert into cart (user_id,item_id,quantity,total_price) values (?,?,?,?)`;
        const result: ResultSetHeader = await execute(addtocartqr, [u_id,element.item_id,element.quantity,element.item_total]) as ResultSetHeader;
      }
      else if (checkres[0] !== undefined) {
        if (checkres[0].isdeleted == 1) {
          const updatecart = 'update cart set isdeleted=0,quantity=?,total_price=? where user_id=? and item_id=?;'
          const resupdatecart = await execute(updatecart, [u_id,element.item_id,element.quantity,element.item_total]);
        }
        else {
          const updateCartdata = 'update cart set quantity=? where user_id=? and item_id=?;';
          const executeQnt = await execute(updateCartdata,[element.quantity,u_id,element.item_id]);
        }
      }
    });
    res.json("success")
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
  const u_id:number = Number(req.query.user_id);
  const cartqr = `select cart.quantity,cart.total_price as item_total,cart.item_id,item_name,item_photo,item_price,item_desc from items 
  join cart on cart.item_id = items.item_id
  join users on users.u_id = cart.user_id
  where cart.user_id = ? and cart.isdeleted=0;`;
  const rescart = await execute(cartqr, [u_id]);
  res.json({ cartdetail: rescart })
}
export const product = async (req:Request,res:Response) => {
  const item_id = Number(req.query.id);
  const data = await execute('select * from items where item_id=?',[item_id]);
  res.json({product:data})
}