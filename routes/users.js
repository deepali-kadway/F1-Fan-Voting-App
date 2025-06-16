const express = require('express')
const schema = require('../models/userschema')
const router = express.Router()

//Add new users to db (Create account)
router.post('/register', async (req, res) => {
   const newUser = new schema({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        fullname: req.body.fullname,
        contact: req.body.contact,
   })
   
    try{
        const savedUser = await newUser.save()
        res.status(201).json({message: 'Account Created Successfully'})
    }
    catch(error){
        res.status(400).json({message: error.message})
    }
})


//Fetch users from db (Sign In account)

module.exports = router