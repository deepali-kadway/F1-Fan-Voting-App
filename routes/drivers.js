const express = require('express');
const schema = require('../models/driverschema')
const router = express.Router()

//Fetch all f1 drivers from the database
router.get('/', async (req, res) => {
 // res.send('Fetching all drivers');  
    const driver = await schema.find()
    res.json(driver)
})

//Add a new f1 driver to the database. Admin portal usually can do this.
router.post('/', async (req, res) => {
    const newDriver = new schema({
        name: req.body.name,
        team: req.body.team,
        country: req.body.country,
        podiums: req.body.podiums,
        image: req.body.image
    })

    try {
        const savedDriver = await newDriver.save()
        res.status(201).json(savedDriver)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})
module.exports = router