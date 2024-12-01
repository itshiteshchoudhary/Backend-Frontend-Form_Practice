const mongoose = require('mongoose')

mongoose.connect(process.env.MongoDB_Connection_url)
.then(()=>{
    console.log('connected to MongoDB');
})
.catch((err)=>{
    console.log('MongoDB connection fail');    
})