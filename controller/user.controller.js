const USER = require("../model/user.model")

// Get operation from DB
const getUsers=async(req,res)=>{
    try {
        const allUsers = await USER.find();
        if(allUsers.length > 0){
            return res.status(200).json({success:true,data:allUsers.reverse()});
        }else{
            return res.status(404).json({success:false,message:'Users Not foound'});
        };
    } catch (error) {
        return res.status(500).json({success:false,message:'Something went broke'});
    };
};


// Get single data operation from DB
const getSingleUser=async(req,res)=>{
    try {
        const {uId}=req.params;
        const user = await USER.findById(uId);
        if(user){
            return res.status(200).json({success:true,data:user});
        }else{
            return res.status(404).json({success:false,message:'User Not foound'});
        };
    } catch (error) {
        return res.status(500).json({success:false,message:'Something went broke'});
    };
};


// data add operation in DB
const addUser=async(req,res)=>{
    try {
        const {name, mail, roll , university,dept}=req.body;
        if (name && mail && roll && university && dept) {
            const addUser = new USER({
                name: name,
                mail:mail,
                roll:parseInt(roll),
                university:university,
                dept:dept
            });
            const newUser =  await addUser.save();
            if (newUser) {
                return res.status(201).json({success:true,user:newUser});
            };
        } else {
            return res.status(404).json({success:false,message:'Please fill the form correctly'}); 
        };
    } catch (error) {
        return res.status(500).json({success:false,message:'Something went broke'});
    };
};


// Update operation in DB
const updateUser=async(req,res)=>{
    try {
        const {uId}=req.params;
        const {name, mail, roll , university,dept}=req.body;
        const user= await USER.findById(uId);
        if (user) {
            const updateUser = await USER.findByIdAndUpdate(uId,{
                $set:{
                   name: name,
                   mail:mail,
                   roll:parseInt(roll),
                   university:university,
                   dept:dept
                }
            },{new:true});
            if (updateUser) {
                return res.status(201).json({success:true,user:updateUser});
            };
        } else {
            return res.status(404).json({success:false,message:'User Not foound'});
        }
    } catch (error) {
        return res.status(500).json({success:false,message:`Something went broke : ${error.message}`});
    };
};


// Delete operation from DB
const deleteUser=async(req,res)=>{
    try {
        const {uId}=req.params;
        const user= await USER.findById(uId);
        if (user) {
            const deleteUser = await USER.findByIdAndDelete(uId);
            if (deleteUser) {
                return res.status(201).json({success:true,message:'User Deleted Successfully',user:deleteUser});
            };
        } else {
            return res.status(404).json({success:false,message:'User Not foound'});
        }
    } catch (error) {
        return res.status(500).json({success:false,message:'Something went broke'});
    };
};



module.exports={getUsers, getSingleUser, addUser, updateUser, deleteUser}