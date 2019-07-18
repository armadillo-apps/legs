const express = require('express');
const router = express.Router();
const {
  getApartmentList,
  addApartment
} = require('../controllers/apartment.controller');

router.get('/', async (req, res, next) => {
  try {
    const output = await getApartmentList();
    res.status(200).json(output);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const output = await addApartment(req.body);
    res.status(201).send('apartment sucessfully created');
  } catch (err) {
    next(err);
  }
});

module.exports = router;
