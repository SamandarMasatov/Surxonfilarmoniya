const express = require('express');
const router = express.Router();
const multer = require("multer");
const md5 = require("md5");
const path = require("path");
const News = require("../controller/news");
 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/uploads/news")
    },  
    filename: function (req, file, cb) {
        cb(null, `${md5(Date.now())}${path.extname(file.originalname)}`)
    }
})  
 
const upload = multer({ storage: storage }) 
  
router.post('/add', upload.single("image"), News.create);
router.get('/:id', News.getOne);
router.delete('/delete/:id', News.deleteOne);
router.put('/:id', News.updateInfo); 
router.put('/update/:id', upload.single("image"), News.UpdateOne);

module.exports = router;