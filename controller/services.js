const Services = require('../models/services');
const path = require('path'); 
const fs = require('fs'); 

exports.create = async (req, res) => {  
    const result = new Services({
        name: {
            uz: req.body.nameuz,
            ru: req.body.nameru,
          }, 
        title: {
            uz: req.body.titleuz,
            ru: req.body.titleru,
        },
        image: `${req.file.filename}`,
        description: {
            uz: req.body.descriptionuz,
            ru: req.body.descriptionru,
        }
    });
    
    await result 
    .save()
    .then(() => {
        res.redirect("/admin/services")
        // res.status(200).json({ success: true, data: data });
    })
    .catch((error) => {
        res.status(400).json({ success: false, data: error });
    });
}  

exports.getOne = async (req, res, next) => {
    const result = await Services.findById({ _id: req.params.id });
    res.render("./admin/services_upt", {
      title: "IDEAL Xizmatlarni tahrirlash",
      layout: "./admin_layout",
      result
    });
  };

exports.UpdateMultiple = async (req, res, next) => {
    //   Papka va bazadagi eski faylni o'chirib tashlaydi
    // await Projects.findById({ _id: req.params.id })
    // .exec((error, data) => {
    //     if (error) {
    //         res.send(error)
    //     } else {
    //         const isMatch = data.file;
    //         for (let file of isMatch) {
    //             let filePath = path.join(__dirname,"../public/uploads/projects/" + file);
            
    //         fs.unlink(filePath, async (error) => {
    //             if (error) {
    //                 throw error;
    //             }
    //         });
    //     }
    //     }
    // });
    // Eski faylni o'rniga yangisini yuklash
    const files = req.files;
    let url = [];

    for (const file of files) {
        const { filename } = file;
        const filem = filename;
        url.push(filem)
    }
    // Yangi faylni saqlash uchun.
    const result = await Services.findByIdAndUpdate(req.params.id);
    result.file = url;
    await result
        .save({ validateBeforeSave: false })
        .then(() => {
            res.redirect("/admin/services");
        })
        .catch((error) => {
            res.status(400).json({ success: false, data: error });
        });
}; 

exports.UpdateOne = async (req, res, next) => {
    await Services.findByIdAndUpdate({ _id: req.params.id }).exec((error, data) => {
        if (error) {
            throw error
        } else {
            const filePath = path.join(
                __dirname,
                "../public/uploads/services/" + data.image
            );
            fs.unlink(filePath, async (err) => {
                if (err) throw err;
            });
        }
    });
    const result = await Services.findByIdAndUpdate({ _id: req.params.id });
    result.image = `${req.file.filename}`;
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
    const result = await Services.findByIdAndUpdate({ _id: req.params.id });

    result.name.uz = req.body.nameuz;
    result.name.ru = req.body.nameru;
    result.title.uz = req.body.titleuz;
    result.title.ru = req.body.titleru;
    result.description.uz = req.body.descriptionuz;
    result.description.ru = req.body.descriptionru;
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
    await Services.findById({ _id: req.params.id }).exec(async (error, data) => {
        if (error) {
            res.send(error); 
        } else {
            const filePath = path.join(
                __dirname,
                "../public/uploads/services/" + data.image
            );
            fs.unlink(filePath, async (err) => {
                if (err) throw err;
                await Services.findByIdAndDelete({ _id: req.params.id });
                res.redirect("/admin/services");
            });
        }
    });
}; 
