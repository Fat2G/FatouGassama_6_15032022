const validator = require('validator');

//export du middleware de verification de l'adresse email
module.exports = (req, res, next) => {
  if (!validator.isEmail(req.body.email)) {
    return res.status(400).json({ message: `L'adresse mail ${req.body.email} n'est pas valide !` });
  } else {
    next();
  }
};