const express = require('express');
const router = express.Router();
const multer = require("multer"); 
const md5 = require("md5");
const path = require("path");
const Services = require("../controller/services");

const storage = multer.diskStorage({
    destination: function (req, file, cb) { 
        cb(null, "./public/uploads/services")
    },  
    filename: function (req, file, cb) {
        cb(null, `${md5(Date.now())}${path.extname(file.originalname)}`)
    }
})  
 
const upload = multer({ storage: storage })   
 
router.post('/add', upload.single("image"), Services.create);
router.get('/:id', Services.getOne);
router.delete('/delete/:id', Services.deleteOne);
router.put('/:id', Services.updateInfo); 
router.put('/updateone/:id', upload.single("image"), Services.UpdateOne);
router.put('/update/:id', upload.array("image", 10), Services.UpdateMultiple);

module.exports = router;