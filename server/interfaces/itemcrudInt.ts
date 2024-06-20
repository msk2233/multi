import { Request } from "express"
import 'multer';
export interface ItemInterface extends Request{
    item_id:string,
    item_name:string,
    item_photo:string,
    file:Express.Multer.File,
    item_price:string,
    item_desc :string
    isdeleted:boolean,
    createdAt:Date,
    updatedAt:Date,
    deletedAt:Date,
    quantity:number
}
export interface Addtocartbody extends Request{
    item_id:number,
    user_id:number
}
export interface Removefromcart extends Request{
    cart_id : number
}
export interface checkdetail {
    cart_id:number,
    isdeleted:number
}