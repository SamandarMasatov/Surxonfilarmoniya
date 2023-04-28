const express = require('express');
const router = express.Router();
const about = require('../controller/about')
const md5 =require ("md5")
const multer = require("multer");
const path = require("path");

// const storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, './public/uploads/about')
//     },
//     filename: function (req, file, cb) {
//         cb(null, `${md5(Date.now())}${path.extname(file.originalname)}`)
//     }
// })

// const upload = multer({storage: storage}); 
// upload.single("image"),
router.post('/add', about.create);  
// router.get('/all', news.getAll);
router.get('/:id', about.getOne);
router.delete('/delete/:id', about.deleteOne);
// router.get('/info/:id', news.getInfo)
//router.get('/info/:id', news.updateInfo);
router.put('/:id', about.updateInfo); 
// router.put('/update/:id', upload.single("image"), news.UpdateOne);


module.exports = router;