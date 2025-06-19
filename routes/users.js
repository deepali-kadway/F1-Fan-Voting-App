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
          // Check if username or email already exists
        const existingUser = await schema.findOne({
            $or: [
                { username: req.body.username },
                { email: req.body.email }
            ]
        });
        if (existingUser) {
            return res.status(409).json({ message: 'Username or email already exists' });
        }

        const savedUser = await newUser.save()
        res.status(201).json({message: 'Account Created Successfully'})
    }
    catch(error){
        res.status(400).json({message: error.message})
    }
})


//Fetch users from db (Sign In account)
router.post('/login', async (req, res) => {
    try{
        const {username, password} = req.body
        const findUser = await schema.findOne({username, password})
        if(!findUser || findUser.password !== password){
            return res.status(401).json({message: 'Invalid Credentials'})
        }
        res.json({
            findUser: {
                username: findUser.username,
                email: findUser.email
            }
        })
    }
    catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
})


module.exports = router