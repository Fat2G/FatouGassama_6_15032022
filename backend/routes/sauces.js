const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const Thing = require('../models/sauces');
const saucesCtrl = require('../controllers/sauces');
const multer = require('../middleware/multer-config');


router.post('/', auth, multer, saucesCtrl.createThing);
router.get('/:id', auth, saucesCtrl.getOneThing);
router.get('/', auth, saucesCtrl.getAllThings);
router.put('/:id', auth, saucesCtrl.updateThing);
router.delete('/:id', auth, saucesCtrl.deleteThing);

module.exports = router;