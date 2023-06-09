const Article = require("../models/article");
const path = require("path");
const fs = require("fs");

exports.create = async (req, res) => {
  const result = new Article({
    title: req.body.title,
    image: `${req.file.filename}`,
    video: req.body.video,
    description: req.body.description,
  });

  await result
    .save()
    .then(() => {
      res.redirect("/admin/articles");
      // res.status(200).json({ success: true, data: data });
    })
    .catch((error) => {
      res.status(400).json({ success: false, data: error });
    });
};

exports.getOne = async (req, res, next) => {
  const result = await Article.findById({ _id: req.params.id });
  res.render("./admin/article_upt", {
    title: "Maqolarni tahrirlash",
    layout: "./admin_layout",
    result,
  });
};

exports.getVue = async (req, res, next) => {
  const result = await Article.find().sort({ createdAt: -1 });
  res.json(result);
};

exports.UpdateOne = async (req, res, next) => {
  await Article.findByIdAndUpdate({ _id: req.params.id }).exec(
    (error, data) => {
      if (error) {
        throw error;
      } else {
        const filePath = path.join(
          __dirname,
          "../public/uploads/articles/" + data.image
        );
        fs.unlink(filePath, async (err) => {
          if (err) throw err;
        });
      }
    }
  );
  const result = await Article.findByIdAndUpdate({ _id: req.params.id });
  result.image = `${req.file.filename}`;
  await result
    .save()
    .then(() => {
      res.redirect("/admin/articles");
    })
    .catch((error) => {
      res.status(400).json({ success: false, data: error });
    });
};

exports.updateInfo = async (req, res, next) => {
  const result = await Article.findByIdAndUpdate({ _id: req.params.id });

  result.title = req.body.title;
  result.video = req.body.video;
  result.description = req.body.description;
  await result
    .save()
    .then(() => {
      res.redirect("/admin/articles");
    })
    .catch((error) => {
      res.status(400).json({ success: false, data: error });
    });
};

exports.deleteOne = async (req, res, next) => {
  await Article.findById({ _id: req.params.id }).exec(async (error, data) => {
    if (error) {
      res.send(error);
    } else {
      const filePath = path.join(
        __dirname,
        "../public/uploads/articles/" + data.image
      );
      fs.unlink(filePath, async (err) => {
        if (err) throw err;
        await Article.findByIdAndDelete({ _id: req.params.id });
        res.redirect("/admin/articles");
      });
    }
  });
};
