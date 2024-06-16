const express = require('express')
const bcryptjs = require('bcryptjs')
const User = require('../models/user')
const router = express.Router()

router.post('/', async (req,res)=>{
    const {email,password} = req.body
    const user = await User.findOne({email})                    //  checking if the user is already registered 
    if(user){
        if(await bcryptjs.compare(password,user.password)){     //  verifying the password
            return res.status(200).json({name:user.name})
        }else{
            return res.status(404).json({wrongPassword:true})
        }
    }else{
        return res.status(404).json({userNotFound:true})
    }
})

module.exports = router