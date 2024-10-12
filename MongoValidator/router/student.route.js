const {  getSingleStudent, getStudents, addStudent, updateStudent, deleteStudent  } = require('../controller/student.controller');

const router= require('express').Router();




router.get('/students',getStudents);
router.get('/students/:uId',getSingleStudent);
router.post('/student/add',addStudent);
router.patch('/student/update/:uId',updateStudent);
router.delete('/student/delete/:uId',deleteStudent);





module.exports= router;