const express = require('express');
const router = express.Router();
const path = require('../controlers/units');

router.get('/', path.getAll);
router.get('/:id', path.getSearch);
router.post('/', path.postNew);
router.put('/:id', path.getAll)
router.put('/xp/:id', path.getAll)
router.delete('/:id', path.getAll)


module.exports = router;