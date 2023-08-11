const mongoose = require('mongoose');
const User = require('../models/User');
const Transaction = require('../models/Transaction');
const AffiliateStat = require('../models/AffiliateStat');

const getAdmins = async (req, res) => {
    try {
        const admins = await User.find({ role: "admin" }).select("-password");
        res.status(200).json(admins);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message })
    }
}

const getUserPerformance = async (req, res) => {
    try {
        const { id } = req.params;

        const usersWithStats = await User.aggregate([
            { $match: {_id: new mongoose.Types.ObjectId(id)} },
            {
                $lookup: {
                    from: "affiliatestats",
                    localField: "_id",
                    foreignField: "userId",
                    as: "affiliateStats"
                }
            },
            { $unwind: "$affiliateStats" },
        ]);

        if(!usersWithStats[0]) return res.status(200).json([]);

        const { password, ...userWithStats } = usersWithStats[0];

        const saleTransactions = await Promise.all(
            userWithStats.affiliateStats.affiliateSales.map((id) => {
                return Transaction.findById(id)
            })
        );

        const filteredSaleTransaction = saleTransactions.filter(
            (transaction) => transaction !== null
        );

        res.status(200).json({ user: userWithStats, sales: filteredSaleTransaction })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

module.exports = { getAdmins, getUserPerformance }