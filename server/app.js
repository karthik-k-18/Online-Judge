const express = require('express');
const bodyParser = require('body-parser');

require('dotenv').config(); // Load environment variables from .env file to process.env object

import cors from './middlewares/cors';

app.use(cors);