const mongoose = require('mongoose');

const OverallStatSchema = new mongoose.Schema({
    totalCustomers: {
        required: true,
        type: Number
    },
    yearlySalesTotal: {
        required: true,
        type: Number
    },
    yearlyTotalSoldUnits: {
        required: true,
        type: Number
    },
    year: {
        required: true,
        type: Number
    },
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
    ],
    salesByCategory: {
        type: Map,
        of: Number
    }
}, { timestamps: true })

module.exports = mongoose.model('OverallStat', OverallStatSchema)