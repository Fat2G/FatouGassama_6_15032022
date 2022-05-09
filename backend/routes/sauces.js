// import du package express
const express = require('express');
// création du router
const router = express.Router();
// import du middleware d'authentification
const auth = require('../middleware/auth');
// import du controller sauces
const saucesCtrl = require('../controllers/sauces');
// import du middleware de configuration multer
const multer = require('../middleware/multer-config');

// création des routes
router.post('/', auth, multer, saucesCtrl.createThing);
router.get('/:id', auth, saucesCtrl.getOneThing);
router.get('/', auth, saucesCtrl.getAllThings);
router.put('/:id', auth, multer, saucesCtrl.modifyThing);
router.delete('/:id', auth, saucesCtrl.deleteThing);

router.post('/:id/like', saucesCtrl.likeOrDislike);

// export du router
module.exports = router;