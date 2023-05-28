const express = require('express');
const router = express.Router();
const path = require('../controlers/armies');
const { validateId, validate } = require('../middleware/id_validate');

router.get('/', path.getAll);
router.get('/:id', validateId, validate, path.getSearch);
router.post('/', path.postNew);
//router.put('/:id', path);
router.put('/rp/:id', validateId, validate, path.updateRp);
router.put('/size/:id', validateId, validate, path.updateSize);
router.put('/logo/:id', validateId, validate, path.updateLogo);
router.delete('/:id', validateId, validate, path.remove);

module.exports = router;