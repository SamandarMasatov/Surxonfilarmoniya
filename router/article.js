const express = require('express');
const router = express.Router();
const multer = require("multer"); 
const md5 = require("md5");
const path = require("path");
const Article = require("../controller/article");


const storage = multer.diskStorage({
    destination: function (req, file, cb) { 
        cb(null, "./public/uploads/articles")
    },  
    filename: function (req, file, cb) {
        cb(null, `${md5(Date.now())}${path.extname(file.originalname)}`)
    }
})   
 
const upload = multer({ storage: storage }) 
 
router.post('/add', upload.single("image"),  Article.create);
router.get('/:id', Article.getOne);
router.get('/data', Article.getVue); 
router.delete('/delete/:id', Article.deleteOne);
router.put('/updateone/:id', upload.single("image"), Article.UpdateOne);
router.put('/:id', Article.updateInfo); 

module.exports = router; 