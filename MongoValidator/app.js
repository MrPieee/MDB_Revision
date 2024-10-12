const express=require('express');
const cors=require('cors');
const SrudentRouter = require('./router/student.route');

const app = express();

// Middleware function call 

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());

// Home route
app.get('/',(req,res)=>{
    try {
        return res.status(200).sendFile(__dirname+'/view/index.html');
    } catch (error) {
       return res.status(500).json({message:"Something broke",error:error.message}); 
    } 
});

// User route
app.use('/api',SrudentRouter);

// false route
app.use((req,res,next)=>{
    return res.status(404).json({success:false, message:`The route wasn't found`});
});


module.exports=app;
