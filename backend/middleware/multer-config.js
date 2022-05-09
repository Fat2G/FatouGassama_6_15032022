// import du package multer
const multer = require('multer');

// types de fichiers acceptés
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png' 
};

// configuration du multer
const storage = multer.diskStorage({
  // on indique à multer où il doit enregistrer les fichiers images
  destination: (req, file, callback) => {
    // 'null' indique qu'il n'y a pas d'erreurs et 'images' est le dossier créé pour stocker les images
    callback(null, 'images')
  },
  // paramétrage du nouveau nom des fichiers images
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + "." + extension);
  }
});

module.exports = multer({storage}).single('image');