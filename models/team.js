const mongoose = require("mongoose");
 
const TeamSchema = mongoose.Schema({  
  name:{ 
    uz: {type: String, required: true},
    ru: {type: String, required: true},
},
  job: { 
    uz: {type: String, required: true},
    ru: {type: String, required: true}, 
   },
   image: { type: String, required: true}, 
  date: { type: Date, default: Date.now() },
});


module.exports = mongoose.model("Team", TeamSchema);
