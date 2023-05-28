const express = require('express');
const app = express();

const { check, validationResult } = require('express-validator');

const validateId = [
  check('id').isLength({ min: 24, max: 24 }).withMessage('Invalid query parameter'),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }
  next();
};

module.exports = { validateId, validate };