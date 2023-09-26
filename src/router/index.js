
const express = require("express");
const masterController = require("../controllers/masterController");
const cronsController = require("../controllers/cronsController");
const app = express(); 

app.use("/api/v1/plan", masterController.route);
app.use("/api/v1/cron", cronsController.route);

module.exports = app;

