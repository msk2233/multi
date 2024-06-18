import express from "express";
let app = express.Router();
app.use(express.static('public'));

import multer from 'multer'
import uploafValidation from '../middleware/uploadValidation';
import storage from '../middleware/multer'
const upload = multer({ storage: storage });
import {addItem} from '../controllers/itemcrud'

app.post("/addItem",upload.single("item_img"),uploafValidation,addItem)

export default app;