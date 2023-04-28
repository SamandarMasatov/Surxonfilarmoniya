const mongoose = require("mongoose"); 
 
const ServicesSchema = mongoose.Schema({  
  name:{ 
    uz: {type: String, required: true},
    ru: {type: String, required: true}, 
},
  title: { 
    uz: {type: String, required: true},
    ru: {type: String, required: true},
   },
  description: {  
    uz: {type: String, required: true},
    ru: {type: String, required: true},
   },
   image: { type: String, required: true}, 
  file: [{ type: String }],
  date: { type: Date, default: Date.now() },
});


module.exports = mongoose.model("Services", ServicesSchema);
