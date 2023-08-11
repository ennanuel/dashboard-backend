const Product = require('../models/Product');
const ProductStat = require('../models/ProductStat');
const User = require('../models/User');
const Transaction = require('../models/Transaction');

const getCountryIso3 = require('country-iso-2-to-3')

const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        const productWithStats = await Promise.all(
            products.map(async (product) => {
                const stat = await ProductStat.findOne({
                    productId: product._id
                })
                return { ...product._doc, stat }
            })
        )

        res.status(200).json(productWithStats)
    } catch (error) {
        console.log(error.message);
        res.status(500).json(error.message); // MAKE SURE YOUR APP HAS BETTER ERROR HANDLING!!!!
    }
}

const getCustomers = async (req, res) => {
    try {
        const customers = await User.find({ role: 'user' }).select("-password");
        res.status(200).json(customers);
    } catch (error) {
        console.log(error.message);
        res.status(500).json(error.message);
    }
}

const getTransactions = async (req, res) => {
    try {
        // THE sort LOOK LIKE THIS: { "field": "userId", "sort": "desc" }
        const { page = 1, pageSize = 20, sort = null, search = "" } = req.query;

        // FORMATTED SORT SHOULD LOOK LIKE { [fieldName]: -1 or 1 }
        const generalSort = () => {
            const sortParsed = JSON.parse(sort);
            const sortFormatted = {
                [sortParsed.field]: sortParsed.sort == "asc" ? 1 : -1
            };

            return sortFormatted;
        }

        const sortFormatted = Boolean(sort) ? generalSort() : {};
        
        const transactions = await Transaction.find({
            $or: [
                { cost: { $regex: new RegExp(search, "i") } },
                { userId: { $regex: new RegExp(search, "i") } }
            ],
        })
            .sort( sortFormatted )
            .skip( page * pageSize )
            .limit( pageSize );

        const total = await Transaction.count({
            $or: [
                { cost: { $regex: new RegExp(search, "i") } },
                { userId: { $regex: new RegExp(search, "i") } }
            ],
        })

        res.status(200).json({ transactions, total })
    } catch (error) {
        console.log(error.message);
        res.status(500).json(error.message)
    }
}

const getGeography = async (req, res) => {
    try {
        const users = await User.find({});

        // REDUCED ARRAY FOR CLOROPATH
        const mappedLocations = users.reduce((acc, { country }) => {
            const countryISO3 = getCountryIso3(country);
            if(!acc[countryISO3]) {
                acc[countryISO3] = 0;
            }
            acc[countryISO3]++;
            return acc;
        }, {});

        const formattedLocations = Object.entries(mappedLocations).map(
            ([country, count]) => {
                return { id: country, value: count }
            }
        )

        res.status(200).json(formattedLocations);
    } catch (error) {
        console.log(error);
        res.status(500).json(error.message);
    }
}

module.exports = { getProducts, getCustomers, getTransactions, getGeography }