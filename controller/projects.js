const Projects = require("../models/projects");
const path = require('path'); 
const fs = require('fs');  
const { validate } = require("../models/projects");  
// Project create 9mLWU4o%Ua+j  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
exports.create = async (req, res) => {  
    const files = req.files; 
    let url = [];  
   
    for (const file of files) {
        const { filename } = file;
        const filem = filename;
        url.push(filem)
    }
    const result = new Projects({
        name: {
            uz: req.body.nameuz,
            ru: req.body.nameru,
          },
        title: {
            uz: req.body.titleuz, 
            ru: req.body.titleru,
        },
        description: {
            uz: req.body.descriptionuz,
            ru: req.body.descriptionru,
        },
        file: url,
        year: req.body.year,
        firma: req.body.firma,
        project_name: {
            uz: req.body.project_nameuz,
            ru: req.body.project_nameru,
        },
        location: {
            uz: req.body.locationuz,
            ru: req.body.locationru,
        },
    });
    
    await result 
    .save()
    .then(() => {
        res.redirect("/admin/projects")
        // res.status(200).json({ success: true, data: data });
    })
    .catch((error) => {
        res.status(400).json({ success: false, data: error });
    });
}  
   
exports.getOne = async (req, res, next) => {
    const result = await Projects.findById({ _id: req.params.id });
    res.render("./admin/projects_upt", {
      title: "IDEAL Loyihani tahrirlash",
      layout: "./admin_layout",
      result
    });
 };


  exports.UpdateOne = async (req, res, next) => {
    //   Papka va bazadagi eski faylni o'chirib tashlaydi
    await Projects.findById({ _id: req.params.id })
    .exec((error, data) => {
        if (error) {
            res.send(error)
        } else {
            const isMatch = data.file;
            for (let file of isMatch) {
                let filePath = path.join(__dirname,"../public/uploads/projects/" + file);
            
            fs.unlink(filePath, async (error) => {
                if (error) {
                    throw error;
                }
            });
        }
        }
    });
    // Eski faylni o'rniga yangisini yuklash
    const files = req.files;
    let url = [];

    for (const file of files) {
        const { filename } = file;
        const filem = filename;
        url.push(filem)
    }
    // Yangi faylni saqlash uchun.
    const result = await Projects.findByIdAndUpdate(req.params.id);
    result.file = url;
    await result
        .save({ validateBeforeSave: false })
        .then(() => {
            res.redirect("/admin/projects");
        })
        .catch((error) => {
            res.status(400).json({ success: false, data: error });
        });
};

exports.updateInfo = async (req, res, next) => {
    const result = await Projects.findByIdAndUpdate({ _id: req.params.id });

    result.name.uz = req.body.nameuz;
    result.name.ru = req.body.nameru;
    result.title.uz = req.body.titleuz;
    result.title.ru = req.body.titleru;
    result.year = req.body.year; 
    result.price = req.body.price;
    result.firma = req.body.firma;
    result.project_name.uz = req.body.project_nameuz;
    result.project_name.ru = req.body.project_nameru;
    result.description.uz = req.body.descriptionuz;
    result.description.ru = req.body.descriptionru;
    result.location.uz = req.body.locationuz
    result.location.ru = req.body.locationru
    await result
        .save()
        .then(() => {
            res.redirect("/admin/projects");
        })
        .catch((error) => {
            res.status(400).json({ success: false, data: error });
        });
};
 
// projetc delete
exports.deleteOne = async(req, res, next) => {
    await Projects.findById({ _id: req.params.id })
    .exec(async (error, data) => {
        if (error) {
            res.send(error);
        } else {
            const isMatch = data.file;
            for (let file of isMatch) { 
            const filePath = path.join(__dirname, "../public/uploads/projects/" + file);

            fs.unlink(filePath, async (error) => {
                if (error){
                    console.log(error);
                    // Error.captureStackTrace(error)    
                } 
            });
            await Projects.findByIdAndDelete({ _id: req.params.id });
            res.redirect("/admin/projects");
          }
        }
    });
};

