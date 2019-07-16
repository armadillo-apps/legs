const express = require("express");
const router = express.Router();
const { getApartmentList } = require("../controllers/apartment.controller");

router.get("/", async (req, res, next) => {
  try {
    const output = await getApartmentList();
    res.status(200).json(output);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
