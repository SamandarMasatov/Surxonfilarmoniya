const express = require('express');
const router = express.Router();
const Contact = require("../controller/contact");
 

router.post('/add', Contact.create);
// router.get('/:id', News.getOne);
// router.delete('/delete/:id', News.deleteOne);
// router.put('/:id', News.updateInfo); 
// router.put('/update/:id', upload.single("image"), News.UpdateOne);

module.exports = router;