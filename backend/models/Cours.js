const mongoose = require('mongoose');

// création du schéma de la BD grâce à la fonction mongoose.Schema 
const coursSchema = mongoose.Schema({
  title: { type: String, required: true },
  urlImage: { type: String, required: true },
  type: { type: String, required: true },
  duree: { type: Number, required: true },
  urlVideo: { type: String, required: true },
  contenu: { type: String, required: true },
  prix: { type: Number, required: true },
});

/* pour lire et enregistrer dans la DB, on exporte le modèle 
avec 2 arguments, nom du modèle + son schéma */
module.exports = mongoose.model('Cours', coursSchema);