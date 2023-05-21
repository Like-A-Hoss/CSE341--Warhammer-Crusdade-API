const express = require('express');
const router = express.Router();
const path = require('../controlers/units');

router.get('/', path.getAll);
router.get('/:id', path.getSearch);
router.post('/', path.postNew);

module.exports = router;