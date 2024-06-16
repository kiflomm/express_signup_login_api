const express = require("express")
const mongoose = require("mongoose")
const registerRoute = require('./routes/signup')
const loginRoute = require('./routes/login')
const bodyParser = require("body-parser")
require("dotenv").config() 

const app = express()
const dbUrl = process.env.MONGODB_CONNECT_STRING
const PORT = process.env.PORT || 5000

app.use(bodyParser.json())
app.use(express.json())
mongoose.connect(dbUrl).then(()=>{
    console.log("db connected successfully")
    app.listen(PORT)
}).catch((error)=>{ 
    console.log(error);
}
)

app.get('/',(req,res)=>{
    res.send("This is home")
})

app.use('/signup',registerRoute)
app.use('/login',loginRoute)