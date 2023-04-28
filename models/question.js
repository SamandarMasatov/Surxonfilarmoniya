const mongoose = require("mongoose");
 
const NewsSchema = mongoose.Schema({ 
  name:{ 
    uz: {type: String, required: true},
    ru: {type: String, required: true},
    en: {type: String, required: true},
},
  title: { 
    uz: {type: String, required: true},
    ru: {type: String, required: true},
    en: {type: String, required: true},
   },
  description: {  
    uz: {type: String, required: true},
    ru: {type: String, required: true},
    en: {type: String, required: true},
   },
   year: { type: String, required: true}, 
   image: { type: String, required: true}, 
  date: { type: Date, default: Date.now() },
});


module.exports = mongoose.model("News", NewsSchema);
