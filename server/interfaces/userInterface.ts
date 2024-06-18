import { Request } from 'express';

export interface Userint extends Request{
    u_id:number,
    fname:string
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