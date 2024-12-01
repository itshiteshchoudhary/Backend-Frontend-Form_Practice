const express = require("express")
// const mongoose = require('mongoose')
const cors = require('cors')
const AuthRoute = require('./Routes/AuthRoute')
const ProductRoute = require('./Routes/ProductRouter')
require('dotenv').config()
require('./Models/db')
const app =express()
const PORT = process.env.PORT || 8080

app.use(cors())
app.use(express.json())
app.use('/auth', AuthRoute)
app.use('/products', ProductRoute )

app.get('/ping',(req,res)=>{
    res.send("pong")
})

app.listen(PORT, ()=>{
    console.log(`connected to the server ${PORT}`);    
})