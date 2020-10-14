const mongoose = require('mongoose');

let schema = new mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    Address: {
        type:String,
        required:true
    },
    phoneNumber: {
        type:Number,
        required:true
    }
});

const model=mongoose.model("NewScript", schema);
module.exports = model;