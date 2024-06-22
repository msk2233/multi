export interface Itemdata {
  createdAt: Date
  deletedAt: Date
  isdeleted: boolean
  item_desc: String
  item_id: number
  item_name: string
  item_photo: string
  item_price: number
  updatedAt: Date
}
export interface Userint {
  u_id: number,
  fname: string
  lname: string,
  email: string,
  phno: string,
  gender: string,
  state: string,
  dob: Date,
  password: string,
  createdAt: Date,
  updatedAt: Date
}
export interface Cartdata {
  cart_id: number,
  item_id: number,
  item_name: string,
  item_photo: string,
  item_price: number
}
export interface Invoicedata{
  price:number,
}