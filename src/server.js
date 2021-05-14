const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const methods = require('./methods');

app.use(express.json());

app.post('/sendJob', methods.sendJob);

app.listen(3333, () => console.log('Server running'));
