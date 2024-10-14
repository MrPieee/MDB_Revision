require('dotenv').config();
const mongoose= require('mongoose');

const DB_URI = process.env.DB_URI;


const connectDbo = async()=>{
    try {
        await mongoose.connect(DB_URI);
        console.log(`MDB has been connected`);
    } catch (error) {
        console.log({message:`Connection Error`,error:error.message});
    };
};


module.exports=connectDbo;