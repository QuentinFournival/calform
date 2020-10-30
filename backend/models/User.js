const mongoose = require('mongoose');
/* npm install --save mongoose-unique-validator
pour s'aasurer que 2 utilisateurs ne puissent utiliser le même mail */
const uniqueValidator = require('mongoose-unique-validator');

// création du schéma pour mongodb
const userSchema = mongoose.Schema({
    // unique=true + unique-validator pour sécuriser
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);