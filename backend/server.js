require('dotenv').config();
const express = require('express');
const { sendResetPasswordEmail } = require('./modules/emailService');
const { generateToken } = require('./modules/tokenService');
const mongoose = require('mongoose');
const User = require('./models/User');
const Token = require('./models/Token');
const bcrypt = require('bcrypt');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const CONNECTION_STRING = process.env.CONNECTION_STRING;

mongoose.connect(CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('############### MongoDB connected ###############'))
.catch(err => console.error('MongoDB connection error:', err));

// Connect to the database
mongoose.connection.on('open', () => {
  console.log('Connecté à la base de données MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('Erreur de connexion à la base de données MongoDB:', err);
});

// Find user by email
const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

// Reset password
app.post('/reset-password', async (req, res) => {
  const { email } = req.body;

  // Check if user exists
  const user = await findUserByEmail(email);
  if (!user) {
    return res.status(404).json({result:false,  message: 'Utilisateur non trouvé' });
  }

  // Generate a token
  const token = generateToken();

  // Save token in the database
  await Token.create({ email, token });

  // Send email
  sendResetPasswordEmail(email, token);

  res.json({result:true, message: 'Un e-mail de réinitialisation a été envoyé' });
});

// confirm code
app.post('/confirm-code', async (req, res) => {
  const { email, token } = req.body;
  // Check if token exists
  const tokenDB = await Token.findOne({ email, token });
  if (!tokenDB) {
    return res.status(404).json({ result:false, message: 'Token non trouvé' });
  }
  res.json({result:true,message:'code bon'})
  
})

// Confirm reset password
app.post('/reset-password-confirm', async (req, res) => {
  const { token, newPassword } = req.body;

  // Authenticate token
  const tokenRecord = await Token.findOne({ token });
  if (!tokenRecord) {
    return res.status(400).json({result:false,  message: 'Jeton invalide ou expiré' });
  }

  // Update password
  const user = await findUserByEmail(tokenRecord.email);
  if (user) {
    user.password = hashPassword(newPassword); // Ensure the password is hashed
    await user.save();

    // Delete token
    await Token.deleteOne({ token });

    res.json({result:true, message: 'Mot de passe réinitialisé avec succès' });
  } else {
    res.status(404).json({result:false, message: 'Utilisateur non trouvé' });
  }
});

// Hash password
const hashPassword = (password) => {
  return bcrypt.hashSync(password, 10);
};

app.listen(3000, () => {
  console.log('Serveur en écoute sur le port 3000');
});
