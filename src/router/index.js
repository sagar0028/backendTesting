
const express = require("express");
const masterController = require("../controllers/masterController");
const app = express(); 

app.use("/api/v1/plan", masterController.route);

module.exports = app;

