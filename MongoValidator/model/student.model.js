const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Name is require'],
        min: [6, 'Name must be at least 6 charecter'],
        max: [18, 'Name length should be 18 charecter']
    },
    mail:{
        type:String,
        required:[true,'mail is require'],
        validate:{
            validator:(v)=>{
                return /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/.test(v)
            },
            message:(prp)=>`${prp.value} is not a valid mail`
        },
        unique:[true,'Mail must have been unique']
    },
    username:{
        type:String,
        required:[true,'username is required'],
        validate:{
            validator:(v)=>{
                return /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{4,29}$/.test(v)
            },
            message:prp=> `${prp.value} is not a valid username`
        },
        unique:[true,'username must have been unique']
    },
    phone:{
        type:Number,
        required:[true,'Phone is require'],
        unique:[true,'Phone must have been unique']
    },
    university:{
        type:String,
        required:[true,'university is require']
    },
    dept:{
        type:String,
        required:[true,'dept is require'],
        enum:{
            values:['cse','eee','machanical','civl'],
            message: '{VALUE} is not supported'
        }
    },
},{timestamps:true});

const Student = mongoose.model('student',StudentSchema);

module.exports= Student;




/*
    in this schemas used validators max , min ,enum , required are thoose is Mongoose built in validaors .
    And where using validate object thoose are customs make validators.
*/





