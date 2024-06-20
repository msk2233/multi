import express from 'express'
const app = express();
app.use(express.json());
import {body} from 'express-validator'
const fileValidateMiddleware=[
    body('file').custom((value,{req})=>{
        if(!req.file){
            throw new Error("file must be uploaded")
        }
        const filTypes:RegExp=/jpeg|jpg|png|gif/;
        const mimeType:boolean=filTypes.test(req.file.mimetype)
        if(!mimeType){
            throw new Error("Invalid file type");
        }
        return true;
    })
]
export default fileValidateMiddleware;