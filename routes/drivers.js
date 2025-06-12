const express = require('express');
const schema = require('../models/driverschema')
const router = express.Router()

//Fetch all drivers from the database
router.get('/', async (req, res) => {
 // res.send('Fetching all drivers');  
    const driver = await schema.find()
    res.json(driver)
})

module.exports = router