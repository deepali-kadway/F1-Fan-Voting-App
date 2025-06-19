const express = require('express')
const path = require('path');
const router = express.Router()

router.get('/:filename', (req, res) => {
    const filename = req.params.filename
    const imagePath = path.join(__dirname, '..', 'images', filename)
    res.sendFile(imagePath, error => {
        if(error){
            res.status(404).send('Image not found')
        }
    })
})

module.exports = router