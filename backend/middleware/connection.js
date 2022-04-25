const rateLimit = require('express-rate-limit');

// configuration du nombre d'essai de connexion
const maxAttemps = rateLimit({
  // temps d'attente avant un nouvel essai (2mn)
  windowMs: 2 * 60 * 1000,
  // nombre de tentatives autorisés
  max: 3, 
  message:
    "Votre compte étant bloqué suite à 3 tentatives infructueuses, veuillez réessayer dans 2 minutes.",
})

module.exports = maxAttempsConnection;