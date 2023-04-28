const express = require("express");
const router = express.Router();
const multer = require("multer");
const md5 = require("md5");
const path = require("path");
const Projects = require("../controller/projects");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads/projects");
  },
  filename: function (req, file, cb) {
    cb(null, `${md5(Date.now())}${path.extname(file.originalname)}`);
  },
}); 

const upload = multer({ storage: storage });

router.post("/add", upload.array("image", 10), Projects.create);
router.get("/:id", Projects.getOne);
router.delete("/delete/:id", Projects.deleteOne);
router.put("/:id", Projects.updateInfo);
router.put("/update/:id", upload.array("image", 10), Projects.UpdateOne);

module.exports = router;
