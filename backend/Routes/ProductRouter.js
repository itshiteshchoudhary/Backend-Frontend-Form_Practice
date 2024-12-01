const ensureAuthonticated = require('../Middlewares/Auth')

const router = require('express').Router()

router.get('/',ensureAuthonticated ,(req,res)=>{
    // console.log('product route');
    
    // res.send('its product route')
    res.status(207)
    .json([
        {
            name : "mobile",
            price : 25000
        },
        {
            name : "tv",
            price : 21000
        }
    ])
})

module.exports = router