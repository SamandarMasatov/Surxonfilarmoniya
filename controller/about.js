const About = require("../models/about");

exports.create = async (req, res) => {
    const result = new About({
        name: { 
            uz: req.body.nameuz,
            ru: req.body.nameru,
          }
    });
    
    await result 
    .save()
    .then(() => {
        res.redirect("/admin/abouts")
        // res.status(200).json({ success: true, data: data });
    })
    .catch((error) => {
        res.status(400).json({ success: false, data: error });
    });
} 

exports.getOne = async (req, res, next) => {
    const result = await About.findById({ _id: req.params.id });
    res.render("./admin/about_upt", {
      title: "Biz haqimizda tahrirlash",
      layout: "./admin_layout",
      result
    });
  };

exports.updateInfo = async (req, res, next) => {
    const result = await About.findByIdAndUpdate({ _id: req.params.id });

    result.name.uz = req.body.nameuz;
    result.name.ru = req.body.nameru;
    await result
        .save() 
        .then(() => {
            res.redirect("/admin/abouts");
        })
        .catch((error) => {
            res.status(400).json({ success: false, data: error });
        });
};

exports.deleteOne = async (req, res) => {
    await About.findByIdAndDelete({ _id: req.params.id });
    res.redirect("/admin/abouts"); 
}
