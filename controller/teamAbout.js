const TeamAbout = require("../models/teamAbout");

exports.create = async (req, res) => {
  const result = new TeamAbout({
    description: req.body.description,
  });

  await result
    .save()
    .then((data) => {
      res.redirect("/admin/team");
      // res.status(200).json({ success: true, data: data });
    })
    .catch((error) => {
      res.status(400).json({ success: false, data: error });
    });
};

exports.getOne = async (req, res, next) => {
  const result = await TeamAbout.findById({ _id: req.params.id });
  res.render("./admin/teamAbout_upt", {
    title: "Team tahrirlash",
    layout: "./admin_layout",
    result,
  });
};

exports.updateInfo = async (req, res, next) => {
  const result = await TeamAbout.findByIdAndUpdate({ _id: req.params.id });

  result.description = req.body.description;
  await result
    .save()
    .then(() => {
      res.redirect("/admin/team");
    })
    .catch((error) => {
      res.status(400).json({ success: false, data: error });
    });
};

exports.deleteOne = async (req, res) => {
  await TeamAbout.findByIdAndDelete({ _id: req.params.id });
  res.redirect("/admin/team");
};
