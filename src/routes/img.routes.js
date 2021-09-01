
import { Router } from "express";
const router = Router()

// import {path} from "path"
const path = require('path')
//Image Path
const imgFolderPath = path.join(__dirname, '../../public/img/');

//Imagenes
router.get('/:imgUrl',(req, res)=>{
    const image = req.params.imgUrl;
    res.sendFile(`${imgFolderPath}${image}`)
    console.log(':image', image);
});


module.exports = router;