const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');

const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const featureRoutes = require('./routes/feature');
const tokenRoutes = require('./routes/token');

const app = express();

// middlewares
dotenv.config({ path : './config/config.env' });
require('./config/db');

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// routes
app.use('/api', userRoutes);
app.use('/api', postRoutes);
app.use('/api', featureRoutes);
app.use('/api', tokenRoutes);

const PORT  = process.env.PORT || 5000

app.listen(PORT, console.log(`SERVER RUNNING ON PORT: ${PORT}`))