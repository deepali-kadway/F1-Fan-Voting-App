const mongoose = require('mongoose');

const schema = new mongoose.Schema(
    {
        name: String,
        team: String,
        country: String,
        podiums: Number,
        image: String,    
        votes: {type: Number, default: 0}
    }
)

module.exports = mongoose.model('Drivers', schema, 'racedrivers');
