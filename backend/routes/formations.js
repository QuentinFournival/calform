const express = require('express');
const router = express.Router();

// on importe le modèle pour pouvoir l'utiliser
const Cours = require('../models/Cours');

// création d'une nouvelle instance du modèle "Cours" et enregistrement
router.post('/', (req, res, next) => {
    const cours = new Cours({
        /* L'opérateur spread "..." est utilisé pour faire une copie 
        de tous les champs de  la requête req.body de "Cours" */
        ...req.body
    });
    // enregistrement en BD avec la méthode "SAVE"
    cours.save()
        // la méthode "SAVE" renvoie une  PROMISE avec then & catch
        .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
        .catch(error => res.status(400).json({ error }));
});


// permet de récupérer tous les objets créés dans la base de données grâce à "FIND"
router.get('/', (req, res, next) => {
    Cours.find()
    .then(cours => res.render('index', {cours : cours} ))

        .catch(error => res.status(400).json({ error }));
        
});

router.get('/liste', (req, res, next) => {
    Cours.find()
        .then(cours => res.render('liste', {cours : cours}))
        .catch(error => res.status(404).json({ error }));
});

// permet de récupérer un objet précis par son ID avec "FINDONE"
router.get('/cours/:id', (req, res, next) => {
    Cours.findOne({ _id: req.params.id })
        .then(cours => res.render('cours', {cours : cours}))
        .catch(error => res.status(404).json({ error }));
});

// modification de l'objet en l'appelant par son ID
router.put('/:id', (req, res, next) => {
    Cours.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet modifié !' }))
        .catch(error => res.status(400).json({ error }));
}); 

// suppression de l'objet en l'appelant par son ID
router.delete('/:id', (req, res, next) => {
    Cours.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
        .catch(error => res.status(400).json({ error }));
}); 

// export des routes vers app.js
module.exports = router;