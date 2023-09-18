const express = require("express");
const router = express.Router();

// Require controller modules.
const guns_controller = require("../controllers/gunsController");
const maker_controller = require("../controllers/makersController");
const types_controller = require("../controllers/typesController");
