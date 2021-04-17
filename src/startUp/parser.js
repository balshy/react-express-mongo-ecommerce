const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

module.exports = (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cors(), express.json());
  app.use(morgan("dev"));
  app.use(function (req, res, next) {
    res.setHeader("charset", "utf-8");
    next();
  });
};
