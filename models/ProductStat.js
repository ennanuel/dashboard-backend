const mongoose = require('mongoose');

const ProductStatSchema = new mongoose.Schema({
    productId: {
        type: String,
        required: true,
        unique: true
    },
    yearlySalesTotal: {
        type: Number,
        required: true
    },
    year: Number,
    monthlyData: [
        {
            month: String,
            totalSales: Number,
            totalUnits: Number
        }
    ],
    dailyData: [
        {
            date: String,
            totalSales: Number,
            totalUnits: Number
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model('ProductStat', ProductStatSchema)