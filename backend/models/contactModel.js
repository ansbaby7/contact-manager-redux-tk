const mongoose = require("mongoose");



const contactSchema = new mongoose.Schema({
    contactName : {type:String,required:true},
    phone : {type:String, default:"No phone added"},
    email: {type:String, default:"No email added"}
},{ timestamps: true });

module.exports = mongoose.model('Contact',contactSchema);