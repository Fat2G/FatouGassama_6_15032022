#  PROJET N°6 - CONSTRUISEZ UNE API SECURISEE POUR UNE APPLICATION D'AVIS GASTRONOMIQUES

### INSTALLATION ###

#### 1. Installation du dossier Frontend ####

- Téléchargez l'application frontend disponible sur ce [repository](https://github.com/OpenClassrooms-Student-Center/Web-Developer-P6).

- Ouvrez un terminal à partir du sous-répertoire "frontend"
 et suivez les instructions données dans le document README.mb de ce dossier.

#### 2. Installation du dossier Backend ####

- Téléchargez le fichier zip [ici](https://github.com/Fat2G/FatouGassama_6_15032022).

- Ouvrez un terminal à partir du sous-répertoire "backend" et exécutez la commande "npm install" afin d'installer toutes les dépendances.

- Une fois les dépendances installées, veuillez exécuter la commande "nodemon server" afin de lancer le serveur.

#### 3. Packages utilisés ####

- **bcrypt :** crypte et hashe les mots de passe
- **body-parser :** analyse le corps des requêtes
- **dotenv :** permet l'utilisation de variables d'environnement 
- **express :** construit des applications web basées sur Node.js grâce à son framework
- **express-rate-limit :** limite le nombre répété de requêtes
- **helmet :** sécurise les applications Express à l'aide de headers HTTP variés
- **jsonwebtoken :** crée et vérifie les tokens d'authentification
- **mongoose :** connecte l'application avec la base de données MongoDB
- **mongoose-unique-validator :** évite que deux utilisateurs ne s'inscrivent avec la même adresse email
- **multer :** permet la gestion des fichiers envoyés dans les requêtes
- **nodemon :** relance le serveur automatiquement à chaque modification
- **password-validator :** vérifie les mots de passe lors de l'inscription
- **validator :** est utilisé dans ce contexte pour vérifier la validation des adresses mail

#### 4. Eléments utiles à savoir ####
 
- La base de données est sur MongoDB.

- Le fichier .env contient les variables d'environnement suivant:
     - DB_USERNAME 
     - DB_PASSWORD
     - DB_CLUSTER
     - DB_NAME 
     - CRYPTOJS_KEY_EMAIL  
     - JWT_KEY 
     - SECRET_TOKEN 



