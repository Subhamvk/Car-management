// app.js
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const carRoutes = require('./routes/carRoutes');
const swaggerUi = require('swagger-ui-express');
const yaml = require('yamljs'); 
require('dotenv').config();

// Load Swagger YAML file
const swaggerDocument = yaml.load('./swagger.yaml');
connectDB();
const app = express();
app.use(cors());
app.use(express.json()); // For JSON payloads
app.use(express.urlencoded({ extended: true })); 


// Swagger Documentation
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// Static file serving for uploaded images
app.use('/uploads', express.static('uploads'));

app.use('/api/auth', authRoutes);
app.use('/api/cars', carRoutes);

module.exports = app;
