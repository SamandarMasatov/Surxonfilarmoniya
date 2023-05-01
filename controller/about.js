const About = require("../models/about");
const path = require("path");
const fs = require("fs");

exports.create = async (req, res) => {
  const result = new About({
    title: req.body.title,
    description: req.body.description,
    image: `${req.file.filename}`,
  });

  await result
    .save()
    .then((data) => {
      res.redirect("/admin/abouts");
      // res.status(200).json({ success: true, data: data });
    })
    .catch((error) => {
      res.status(400).json({ success: false, data: error });
    });
};

exports.getOne = async (req, res, next) => {
  const result = await About.findById({ _id: req.params.id });
  res.render("./admin/about_upt", {
    title: "Biz haqimizda tahrirlash",
    layout: "./admin_layout",
    result,
  });
};

exports.UpdateOne = async (req, res, next) => {
  await About.findByIdAndUpdate({ _id: req.params.id }).exec((error, data) => {
    if (error) {
      throw error;
    } else {
      const filePath = path.join(
        __dirname,
        "../public/uploads/about/" + data.image
      );
      fs.unlink(filePath, async (err) => {
        if (err) throw err;
      });
    }
  });
  const result = await About.findByIdAndUpdate({ _id: req.params.id });
  result.image = `${req.file.filename}`;
  await result
    .save()
    .then(() => {
      res.redirect("/admin/abouts");
    })
    .catch((error) => {
      res.status(400).json({ success: false, data: error });
    });
};

exports.updateInfo = async (req, res, next) => {
  const result = await About.findByIdAndUpdate({ _id: req.params.id });

  result.title = req.body.title;
  result.description = req.body.description;
  await result
    .save()
    .then(() => {
      res.redirect("/admin/abouts");
    })
    .catch((error) => {
      res.status(400).json({ success: false, data: error });
    });
};

exports.deleteOne = async (req, res, next) => {
  await About.findById({ _id: req.params.id }).exec(async (error, data) => {
    if (error) {
      res.send(error);
    } else {
      const filePath = path.join(
        __dirname,
        "../public/uploads/about/" + data.image
      );
      fs.unlink(filePath, async (err) => {
        if (err) throw err;
        await About.findByIdAndDelete({ _id: req.params.id });
        res.redirect("/admin/abouts");
      });
    }
  });
};
