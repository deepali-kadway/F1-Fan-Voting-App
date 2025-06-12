const mongoose = require('mongoose');

const schema = new mongoose.Schema(
    {
        name: String,
        team: String,
        country: String,
        podiums: Number,
        image: String,    
    }
)

module.exports = mongoose.model('Drivers', schema, 'racedrivers');
