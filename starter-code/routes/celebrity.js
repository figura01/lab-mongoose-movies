const express = require("express");
const router = express.Router();
const Celebrity = require("../models/Celebrity");

router.get("/", (req, res, next) => {
    render("celebrities/celebrities");
});