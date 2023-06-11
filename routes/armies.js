const express = require('express');
const router = express.Router();
const path = require('../controllers/armies');
const { validateId, validate } = require('../middleware/id_validate');
const { authenticateOAuth } = require('../middleware/oauth');

//Public Routes
router.get('/', path.getAll);
router.get('/:id', validateId, validate, path.getSearch);


// Protected Routes
router.post('/', authenticateOAuth, path.postNew);
router.put('/rp/:id', authenticateOAuth, validateId, validate, path.updateRp);
router.put('/size/:id', authenticateOAuth, validateId, validate, path.updateSize);
router.put('/logo/:id', authenticateOAuth, validateId, validate, path.updateLogo);
router.delete('/:id', authenticateOAuth, validateId, validate, path.remove);

module.exports = router;