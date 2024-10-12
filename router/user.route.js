const { getSingleUser, getUsers, addUser, updateUser, deleteUser } = require('../controller/user.controller');

const router= require('express').Router();




router.get('/users',getUsers);
router.get('/users/:uId',getSingleUser);
router.post('/user/add',addUser);
router.patch('/user/update/:uId',updateUser);
router.delete('/user/delete/:uId',deleteUser);





module.exports= router;