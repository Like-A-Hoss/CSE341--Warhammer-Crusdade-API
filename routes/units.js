const express = require('express');
const router = express.Router();
const path = require('../controllers/units');

router.get('/', path.getAll);
router.get('/:id', path.getSearch);
router.post('/', path.postNew);
router.put('/xp/:id', path.updatexp);
router.put('/honors/:id', path.updateBattleHonors);
router.put('/scars/:id', path.updateBattleScars);
router.delete('/:id', path.getAll);


module.exports = router;