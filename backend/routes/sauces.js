const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Thing = require('../models/thing');
const saucesCtrl = require('../controllers/sauces')

router.post('/', saucesCtrl.createThing);
router.get('/:id', saucesCtrl.getOneThing);
router.get('/', saucesCtrl.getAllThings);

module.exports = router;