const express = require('express');
const app = express();
const cors = require('cors');

require('dotenv-safe').config();

const db = require('./config/database');
const locadorRoutes = require('./routes/locadorRoutes');
const apartamentoRoutes = require('./routes/apartamentoRoutes');

db.connect();

app.use(cors());
app.use(express.json());
app.use("/locador", locadorRoutes);
app.use("/apartamento", apartamentoRoutes);

module.exports = app;