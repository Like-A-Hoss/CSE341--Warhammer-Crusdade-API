const express = require('express');
const router = express.Router();
const path = require('../controlers/armies');

router.get('/', path.getAll);
router.get('/:id', path.getSearch);
router.post('/', path.postNew);
//router.put('/:id', path);
router.put('/rp/:id', path.updateRp);
router.put('/size/:id', path.updateSize);
router.put('/logo/:id', path.updateLogo)
router.delete('/:id', path.remove);

module.exports = router;