import multer,{ FileFilterCallback, Multer,StorageEngine }  from 'multer';
import { Request,Response } from 'express';

const storage:multer.StorageEngine = multer.diskStorage({
    destination: function (req:Request, file:Express.Multer.File, cb: (error: Error | null, destination: string) => void) {
        return cb(null, '../client/public/uploads');
    },
    filename: function (req:Request, file:Express.Multer.File, cb: (error: Error | null, destination: string) => void) {
        const uniqueSuffix:string = "item_img"+Date.now();
        return cb(null, uniqueSuffix + '-' + file.originalname);
    }
});
export default storage;