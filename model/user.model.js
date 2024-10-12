const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Name is require']
    },
    mail:{
        type:String,
        required:[true,'mail is require']
    },

    roll:{
        type:Number,
        required:[true,'Name is require']
    },
    university:{
        type:String,
        required:[true,'Name is require']
    },
    dept:{
        type:String,
        required:[true,'Name is require']
    },
},{timestamps:true});

const USER = mongoose.model('users',UserSchema);

module.exports= USER;