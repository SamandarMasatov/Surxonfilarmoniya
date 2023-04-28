const mongoose = require("mongoose"); 
 
const ArticleSchema = mongoose.Schema({  
  name:{ 
    uz: {type: String, required: true},
    ru: {type: String, required: true}, 
    },
  title: {  
    uz: {type: String, required: true},
    ru: {type: String, required: true},
   },
   image: { type: String, required: true},
   change: { type: String },
  description: {  
    uz: {type: String, required: true},
    ru: {type: String, required: true},
   },
  date: { type: Date, default: Date.now() },
});


module.exports = mongoose.model("Article", ArticleSchema);
