// models/Token.js
const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
  email: { type: String, required: true },
  token: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 3600 } // 1 hour rest
});

// Vérifiez si le modèle Token existe déjà
const Token = mongoose.models.Token || mongoose.model('Token', tokenSchema);

module.exports = Token;
