const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
        name: {
            type: String, 
            required: true,
            unique: true
        },
        price: {
            type: String,
            required: true
        },
        description: String,
        category: String,
        rating: Number,
        supply: Number,
    }, { timestamps: true }
)

module.exports = mongoose.model('Product', ProductSchema)