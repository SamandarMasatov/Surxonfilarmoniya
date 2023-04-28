const express = require('express');
const router = express.Router();
const multer = require("multer");
const md5 = require("md5");
const path = require("path");
const Team = require("../controller/team");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/uploads/team")
    },  
    filename: function (req, file, cb) {
        cb(null, `${md5(Date.now())}${path.extname(file.originalname)}`)
    }
})  
 
const upload = multer({ storage: storage }) 
 
router.post('/add', upload.single("image"), Team.create);
router.get('/teamupt/:id', Team.getOne);
router.delete('/delete/:id', Team.deleteOne);
router.put('/:id', Team.updateInfo); 
router.put('/updateone/:id', upload.single("image"), Team.UpdateOne);
router.put('/update/:id', upload.array("image", 10), Team.UpdateMultiple);

module.exports = router;