const mongoose = require("mongoose");
 
const CourseSchema = mongoose.Schema({ 
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
  file: [{ type: String, required: true }],
  year: { type: Number }, 
  firma: { type: String },  
  project_name: {
    uz: {type: String, required: true},
    ru: {type: String, required: true},
   }, 
  location: { 
    uz: {type: String, required: true},
    ru: {type: String, required: true},
   },
  date: { type: Date, default: Date.now() },
});


module.exports = mongoose.model("Projects", CourseSchema);
