const express = require('express')
const cors = require("cors")


const dotenv = require('dotenv')

dotenv.config()

require('./db')
const userRoutes = require('./routes/userRoutes')
const app = express()
app.use(cors())
app.use(express.json())
app.use('/api/users',userRoutes)


app.listen(5000 , ()=>{
    console.log(`server runing on: http://localhost:${5000}`);
    
})