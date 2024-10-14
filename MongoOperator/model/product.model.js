const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Name is require']
    },
    title:{
        type:String,
        required:[true,'mail is require']
    },

    catagory:{
        type:String,
        required:[true,'Name is require'],
        enum:{
            values:['mobail','laptop','tablet','headphone'],
            message:'{VALUE} is not a valid catagory'
        }
    },
    price:{
        type:Number,
        required:[true,'Name is require']
    },
    rating:{
        type:Number,
        required:[true,'Name is require']
    },
},{timestamps:true});

const Product = mongoose.model('products',ProductSchema);

module.exports= Product;