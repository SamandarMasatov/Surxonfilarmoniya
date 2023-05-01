const Team = require("../models/team");
const path = require("path");
const fs = require("fs");

exports.create = async (req, res) => {
  const result = new Team({
    description: req.body.description,
    job: req.body.job,
    image: `${req.file.filename}`,
  });

  await result
    .save()
    .then(() => {
      res.redirect("/admin/team");
      // res.status(200).json({ success: true, data: data });
    })
    .catch((error) => {
      res.status(400).json({ success: false, data: error });
    });
};

exports.getOne = async (req, res, next) => {
  const result = await Team.findById({ _id: req.params.id });
  res.render("./admin/team_upt", {
    title: "IDEAL Jamoasini tahrirlash",
    layout: "./admin_layout",
    result,
  });
};

exports.UpdateMultiple = async (req, res, next) => {
  // Eski faylni o'rniga yangisini yuklash
  const files = req.files;
  let url = [];

  for (const file of files) {
    const { filename } = file;
    const filem = filename;
    url.push(filem);
  }
  // Yangi faylni saqlash uchun.
  const result = await Team.findByIdAndUpdate(req.params.id);
  result.file = url;
  await result
    .save({ validateBeforeSave: false })
    .then(() => {
      res.redirect("/admin/team");
    })
    .catch((error) => {
      res.status(400).json({ success: false, data: error });
    });
};

exports.UpdateOne = async (req, res, next) => {
  await Team.findByIdAndUpdate({ _id: req.params.id }).exec((error, data) => {
    if (error) {
      throw error;
    } else {
      const filePath = path.join(
        __dirname,
        "../public/uploads/team/" + data.image
      );
      fs.unlink(filePath, async (err) => {
        if (err) throw err;
      });
    }
  });
  const result = await Team.findByIdAndUpdate({ _id: req.params.id });
  result.image = `${req.file.filename}`;
  await result
    .save()
    .then(() => {
      res.redirect("/admin/team");
    })
    .catch((error) => {
      res.status(400).json({ success: false, data: error });
    });
};

exports.updateInfo = async (req, res, next) => {
  const result = await Team.findByIdAndUpdate({ _id: req.params.id });

  result.name.uz = req.body.nameuz;
  result.name.ru = req.body.nameru;
  result.job.uz = req.body.jobuz;
  result.job.ru = req.body.jobru;
  await result
    .save()
    .then(() => {
      res.redirect("/admin/team");
    })
    .catch((error) => {
      res.status(400).json({ success: false, data: error });
    });
};
exports.addPersonal = async (req, res, next) => {
  const result = await Team.findByIdAndUpdate({ _id: req.params.id });

  result.personel = req.body.personel;
  await result
    .save()
    .then(() => {
      res.redirect("/admin/team");
    })
    .catch((error) => {
      res.status(400).json({ success: false, data: error });
    });
};

exports.deleteOne = async (req, res, next) => {
  await Team.findById({ _id: req.params.id }).exec(async (error, data) => {
    if (error) {
      res.send(error);
    } else {
      const filePath = path.join(
        __dirname,
        "../public/uploads/team/" + data.image
      );
      fs.unlink(filePath, async (err) => {
        if (err) throw err;
        await Team.findByIdAndDelete({ _id: req.params.id });
        res.redirect("/admin/team");
      });
    }
  });
};
