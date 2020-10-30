
// intaller avec npm install --save bcrypt
// appeler bcrypt qui sert à crypter le MDP
const bcrypt = require('bcrypt');
// on va chercher le modèle créé pour User
const User = require('../models/User');

// création de nouveaux utilisateurs
exports.signup = (req, res, next) => {
        /* funct. hash pour crypter le corps du MDP, 10 = nbre de hashage
       + c'est élevé, + c'est sécurisé, + c'est long */
    bcrypt.hash(req.body.password, 10)
        // récupération du hash + email => création du nouveau user grâce au model User
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash
            });
            // puis on sauvegarde dans la BD grâce à "SAVE
            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

// vérification des informations de connexion
exports.login = (req, res, next) => {
    // on récupère le user en BD grâce à "FINDONE"
    User.findOne({ email: req.body.email })
    .then(user => {
        // si on ne trouve pas => message erreur
        if (!user) {
            return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
            // si on trouve, comparaison hash BD / au body du PWD
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        // si MDP faux => message erreur
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    }
                    res.status(200).json({
                        // si OK retour du user et d'un TOKEN (non implémenté ici)
                        userId: user._id,
                        token: 'TOKEN'
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};