require('dotenv').config();
const app = require("./app");
const connectDbo = require('./config/connectDb');
const PORT = process.env.PORT||6333;

app.listen(PORT,async()=>{
    await connectDbo();
    console.log(`The MDB server is runnig on http://localhost:${PORT}`);
});