import { Request } from "express"
import 'multer';
import { Userint } from "./userInterface";
export interface ItemInterface extends Request{
    item_id:number,
    item_name:string,
    item_photo:string,
    file:Express.Multer.File,
    item_price:number,
    item_desc :string
    isdeleted:boolean,
    createdAt:Date,
    updatedAt:Date,
    deletedAt:Date,
    quantity:number
    item_total:number
}
export interface Addtocartbody extends Request{
    cartdata:ItemInterface
    userdata:Userint
}
export interface Removefromcart extends Request{
    cart_id : number
}
export interface checkdetail {
    cart_id:number,
    isdeleted:number
}