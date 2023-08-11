const mongoose = require('mongoose')

const User = require('../models/User');
const Transaction = require('../models/Transaction');
const OverallStat = require('../models/OverallStat');

// DO NOT FORGET TO ADD dataUser ARRAY TO MongoDB Server

const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        
        const user = await User.findById(id).select({ password: 0 });
        
        res.status(200).json(user);
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: error.message });
    }
}

const getDashboard = async (req, res) => {
    try {
        // HARDCODED VALUES
        const currentMonth = "November";
        const currentYear = 2021;
        const currentDay = "2021-11-15";

        // RECENT TRANSACTIONS
        const transactions = await Transaction.find().limit(50).sort({ createdAt: -1 });

        // OVERALL STATS
        const overallStats = await OverallStat.findOne({ year: currentYear });

        const {
            totalCustomers,
            yearlyTotalSoldUnits,
            yearlySalesTotal,
            monthlyData,
            salesByCategory
        } = overallStats;

        const thisMonthStats = overallStats.monthlyData.find(({ month }) => month === currentMonth);
        const todayStats = overallStats.dailyData.find(({date}) => date === currentDay);

        res.status(200).json({
            totalCustomers,
            yearlyTotalSoldUnits,
            yearlySalesTotal,
            monthlyData,
            salesByCategory,
            thisMonthStats,
            todayStats,
            transactions
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({message: error.message})
    }
}

module.exports = { getUser, getDashboard }