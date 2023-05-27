const Article = require("../models/audios");
const path = require("path");
const fs = require("fs");

exports.create = async (req, res) => {
  const result = new Article({
    title: req.body.title,
    name: req.body.name,
    audio: `${req.file.filename}`,
  });

  await result
    .save()
    .then(() => {
      res.redirect("/admin/services");
      //   res.status(200).json({ success: true, data: data });
    })
    .catch((error) => {
      res.status(400).json({ success: false, data: error });
    });
};

exports.getOne = async (req, res, next) => {
  const result = await Article.findById({ _id: req.params.id });
  res.render("./admin/services_upt", {
    title: "Bosh sahifadagi qo'shiqni tahrirlash",
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
          "../public/uploads/audios/" + data.audio
        );
        fs.unlink(filePath, async (err) => {
          if (err) throw err;
        });
      }
    }
  );
  const result = await Article.findByIdAndUpdate({ _id: req.params.id });
  result.audio = `${req.file.filename}`;
  await result
    .save()
    .then(() => {
      res.redirect("/admin/services");
    })
    .catch((error) => {
      res.status(400).json({ success: false, data: error });
    });
};

exports.updateInfo = async (req, res, next) => {
  const result = await Article.findByIdAndUpdate({ _id: req.params.id });

  result.name = req.body.name;
  result.title = req.body.title;
  await result
    .save()
    .then(() => {
      res.redirect("/admin/services");
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
        "../public/uploads/audios/" + data.audio
      );
      fs.unlink(filePath, async (err) => {
        if (err) throw err;
        await Article.findByIdAndDelete({ _id: req.params.id });
        res.redirect("/admin/services");
      });
    }
  });
};
