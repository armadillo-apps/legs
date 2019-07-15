const express = require("express");
const router = express.Router();
const { getAptList } = require("../controllers/apt.controller");

router.use("/", async (err, req, res, next) => {
  if (!err.statusCode) {
    err.statusCode = 500;
  }
  res.status(err.statusCode).json({ message: err.message });
});

router.get("/", async (req, res, next) => {
  try {
    const output = await getAptList();
    res.status(200).json(output);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
