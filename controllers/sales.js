const OverallStat = require('../models/OverallStat')

const getSales = async (req, res) => {
    try {
        const overallStats = await OverallStat.find();

        // WE'RE ONLY SENDING ONE DATA BECAUSE, THAT'S THE ONLY ONE WE HAVE, ADD MORE LATER
        res.status(200).json(overallStats[0]);
    } catch (error) {
        console.log(error);
        res.status(500).json(error.message);
    }
};

module.exports = { getSales };