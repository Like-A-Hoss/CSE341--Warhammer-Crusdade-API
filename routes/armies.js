const express = require('express');
const router = express.Router();
const path = require('../controlers/armies');

router.get('/', path.getAll);

module.exports = router;