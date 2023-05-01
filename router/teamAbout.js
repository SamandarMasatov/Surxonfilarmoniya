const express = require('express');
const router = express.Router();
const Team = require("../controller/teamAbout");


router.post('/add', Team.create);
router.get('/teamupt/:id', Team.getOne);
router.delete('/delete/:id', Team.deleteOne);
router.put('/:id', Team.updateInfo);


module.exports = router;
