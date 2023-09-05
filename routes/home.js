const express = require("express");
const router = express.Router();

router.get("/", (request, response) =>
  response.render("index", {
    title: "Express App",
    message: "Welcome to Fady Express App",
  })
);

module.exports = router;
