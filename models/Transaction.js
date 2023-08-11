const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    cost: {
        type: String,
        required: true
    },
    products: {
        type: [mongoose.Types.ObjectId],
        of: Number
    }
}, { timestamps: true })

module.exports = mongoose.model('Transaction', TransactionSchema)