const News = require('../models/news');
const path = require('path');
const fs = require('fs');

exports.create = async (req, res) => {
    const result = new News({
        name: {
            uz: req.body.nameuz,
            ru: req.body.nameru,
            en: req.body.nameen
          },
        title: {
            uz: req.body.titleuz,
            ru: req.body.titleru,
            en: req.body.titleen
        },
        year: req.body.year,
        image: `${req.file.filename}`,
        description: {
            uz: req.body.descriptionuz,
            ru: req.body.descriptionru,
            en: req.body.descriptionen
        }
    });
    
    await result 
    .save()
    .then(() => {
        res.redirect("/admin/news")
        // res.status(200).json({ success: true, data: data });
    })
    .catch((error) => {
        res.status(400).json({ success: false, data: error });
    });
} 

exports.getOne = async (req, res, next) => {
    const result = await News.findById({ _id: req.params.id });
    res.render("./admin/news_upt", {
      title: "IDEAL Eng zo'r loyihalarini tahrirlash",
      layout: "./admin_layout",
      result
    });
  };


exports.UpdateOne = async (req, res, next) => {
    await News.findByIdAndUpdate({ _id: req.params.id }).exec((error, data) => {
        if (error) {
            throw error
        } else {
            const filePath = path.join(
                __dirname,
                "../public/uploads/news/" + data.image
            );
            fs.unlink(filePath, async (err) => {
                if (err) throw err;
            });
        }
    });
    const result = await News.findByIdAndUpdate({ _id: req.params.id });
    result.image = `${req.file.filename}`;
    await result
        .save()
        .then(() => {
            res.redirect("/admin/news");
        })
        .catch((error) => {
            res.status(400).json({ success: false, data: error });
        });
};


exports.updateInfo = async (req, res, next) => {
    const result = await News.findByIdAndUpdate({ _id: req.params.id });

    result.name.uz = req.body.nameuz;
    result.name.ru = req.body.nameru;
    result.name.en = req.body.nameen;
    result.title.uz = req.body.titleuz;
    result.title.ru = req.body.titleru;
    result.title.en = req.body.titleen;
    result.year = req.body.year;
    result.description.uz = req.body.descriptionuz;
    result.description.ru = req.body.descriptionru;
    result.description.en = req.body.descriptionen;
    await result
        .save()
        .then(() => {
            res.redirect("/admin/news");
        })
        .catch((error) => {
            res.status(400).json({ success: false, data: error });
        });
}; 

exports.deleteOne = async (req, res, next) => {
    await News.findById({ _id: req.params.id }).exec(async (error, data) => {
        if (error) {
            res.send(error);
        } else {
            const filePath = path.join(
                __dirname,
                "../public/uploads/news/" + data.image
            );
            fs.unlink(filePath, async (err) => {
                if (err) throw err;
                await News.findByIdAndDelete({ _id: req.params.id });
                res.redirect("/admin/news");
            });
        }
    });
}; 
