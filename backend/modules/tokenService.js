const mongoose = require('mongoose');
const { Schema } = mongoose;

const tokenSchema = new Schema({
  email: String,
  token: String,
  createdAt: { type: Date, default: Date.now, expires: '1h' }
});

const Token = mongoose.model('Token', tokenSchema);

const generateToken = () => {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6 digits
};

const saveTokenToDatabase = async (email, token) => {
  await Token.create({ email, token });
};

module.exports = { generateToken, saveTokenToDatabase };
