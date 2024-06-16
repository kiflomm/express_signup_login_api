const express = require('express')
const bcryptjs = require('bcryptjs')
const router = express.Router();  
const User = require('../models/user')

router.post('/',async (req,res)=>{

    //we expect name , email and password from the request body
    const {name,email,password} = req.body

    //checks if there are incomplete fields (blank inputs) in the request
    if(!email || !password || !name){
        return res.status(404).json({incompleteField:true})
    }

    //checks if the username(email) is available
    try {
        const existingUser = await User.findOne({email})
        if(existingUser){
            return res.status(404).json({existingUser:true})
        }
    } catch (error) {
        return res.status(500).json({serverError:true})
    }

    //hash the password before saving
    try {
        const hashedPassword = await bcryptjs.hash(password,10)
        const newUser = new User({name,email,password:hashedPassword})
        const savedUser = await newUser.save()
        console.log({userSaved:true,password:savedUser.password})
        return res.status(201).json({userSaved:true,name:savedUser['name'],password:savedUser['password']})
        
    } catch (error) {
        return res.status(404).json({savingError:true})
    }
})

module.exports = router