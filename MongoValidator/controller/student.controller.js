const Student = require("../model/student.model");

// Get operation from DB
const getStudents=async(req,res)=>{
    try {
        const allUsers = await Student.find();
        if(allUsers.length > 0){
            return res.status(200).json({success:true,data:allUsers.reverse()});
        }else{
            return res.status(404).json({success:false,message:'Students Not foound'});
        };
    } catch (error) {
        return res.status(500).json({success:false,message:`Something went broke : ${error.message}`});
    };
};


// Get single data operation from DB
const getSingleStudent=async(req,res)=>{
    try {
        const {uId}=req.params;
        const user = await Student.findById(uId);
        if(user){
            return res.status(200).json({success:true,data:user});
        }else{
            return res.status(404).json({success:false,message:'Student Not foound'});
        };
    } catch (error) {
        return res.status(500).json({success:false,message:`Something went broke : ${error.message}`});
    };
};


// data add operation in DB
const addStudent=async(req,res)=>{
    try {
        const {name, mail,username,phone, university,dept}=req.body;
        if (name && mail && username && university && dept) {
            const addStudent = new Student({
                name:name,
                mail:mail,
                username:username,
                phone:parseInt(phone),
                university:university,
                dept:dept
            });
            const newStudent =  await addStudent.save();
            if (newStudent) {
                return res.status(201).json({success:true,user:newStudent});
            };
        } else {
            return res.status(404).json({success:false,message:'Please fill the form correctly'}); 
        };
    } catch (error) {
        return res.status(500).json({success:false,message:`Something went broke : ${error.message}`});
    };
};


// Update operation in DB
const updateStudent=async(req,res)=>{
    try {
        const {uId}=req.params;
        const {name, mail,username,phone, university,dept}=req.body;
        const student= await Student.findById(uId);
        if (student) {
            const updateUser = await Student.findByIdAndUpdate(uId,{
                $set:{
                   name: name,
                   mail:mail,
                   username:username,
                   phone:parseInt(phone),
                   university:university,
                   dept:dept
                }
            },{new:true,runValidators:true});
            if (updateUser) {
                return res.status(201).json({success:true,user:updateUser});
            };
        } else {
            return res.status(404).json({success:false,message:'Student Not foound'});
        }
    } catch (error) {
        return res.status(500).json({success:false,message:`Something went broke : ${error.message}`});
    };
};


// Delete operation from DB
const deleteStudent=async(req,res)=>{
    try {
        const {uId}=req.params;
        const user= await Student.findById(uId);
        if (user) {
            const deleteUser = await Student.findByIdAndDelete(uId);
            if (deleteUser) {
                return res.status(201).json({success:true,message:'Student Deleted Successfully',user:deleteUser});
            };
        } else {
            return res.status(404).json({success:false,message:'Student Not foound'});
        }
    } catch (error) {
        return res.status(500).json({success:false,message:`Something went broke : ${error.message}`});
    };
};



module.exports={getStudents, getSingleStudent, addStudent, updateStudent, deleteStudent}