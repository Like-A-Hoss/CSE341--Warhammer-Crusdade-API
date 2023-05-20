const express = require('express');
const router = express.Router();
const path = require('../controlers/units');

router.get('/', path.getAll);

module.exports = router;