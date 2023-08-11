const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();

const clientRoute = require('./routes/client');
const generalRoute = require('./routes/general');
const managementRoute = require('./routes/management');
const salesRoute = require('./routes/sales');

// CONFIGURATION 
dotenv.config()

app.use(express.json());
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }))
app.use(morgan('common'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

// ROUTES
app.use('/client', clientRoute)
app.use('/general', generalRoute)
app.use('/management', managementRoute)
app.use('/sales', salesRoute)

// MONGOOSE SETUP
const PORT = process.env.PORT || 9000

console.warn('Connecting to MongoDB...')

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(PORT, () => {
        console.log('app running on port', PORT);
    })
}).catch(error => {
    console.error(error, 'Could not connect.')
})