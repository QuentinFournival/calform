const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// import des routes grâce récupérées de module.exports
const formationsRoutes = require('./routes/formations');
// const userRoutes = require('./routes/user');
const userLogin = require('./routes/login');
const userSignup = require('./routes/signup');
const htmlView = require('./routes/views');

// connexion à la base de données mongodb atlas, la table "dbname" se crée automatiquement
mongoose.connect('mongodb+srv://jo:jo@cluster0.juvdh.mongodb.net/<dbname>?retryWrites=true&w=majority',
{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
  }));

/* Sécurité pour éviter les CORS « Cross Origin Resource Sharing »
par défaut bloque les appels HTTP d'être effectués entre des serveurs différents 
=> ajout de HEADERS à l'objet "response" */
app.use((req, res, next) => {
    // accès à l'API depuis toute origine grâce à *
    res.setHeader('Access-Control-Allow-Origin', '*');
    // ajout des headers mentionnés aux requêtes envoyées vers l'API
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    // autorisation des requêtes avec les méthodes mentionnées
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

/* bodyparser transforme le corps de la requête en objet Json
npm install --save body-parser */

// définit que le dossier de référence est 'PUBLIC'
app.use(express.static('public'));

// enregistrement des routes importées ci-dessus
// route pour le rendu EJS
app.use('/', formationsRoutes);
app.use('/liste', formationsRoutes);
// !!! créer la route "auth" dans le front !!!
app.use('/contact/login', userLogin);
app.use('/contact/signup', userSignup);
// app.use('/auth', userRoutes);






// // création des middlewares avec next pour envoyer au prochain middleware
// app.use((req, res, next) => {
//     console.log('Requête reçue !');
//     next();
// });

// app.use((req, res, next) => {
//     res.status(201);
//     next();
// });

// app.use((req, res, next) => {
//     res.json({ message: 'Votre requête a bien été reçue !' });
//     next();
// });

// app.use((req, res, next) => {
//     console.log('Réponse envoyée avec succès !');
// });

module.exports = app;
