const nodemailer = require('nodemailer');
const mailjetTransport = require('nodemailer-mailjet-transport');

const transporter = nodemailer.createTransport(mailjetTransport({
  auth: {
    apiKey: process.env.API_KEY,
    apiSecret: process.env.API_SECRET
  }
}));

const sendResetPasswordEmail = (email, token) => {
  const emailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Réinitialisation de votre mot de passe',
    text: `Votre code de réinitialisation est : ${token}`,
    html: `<p>Votre code de réinitialisation est : <strong>${token}</strong></p>`
  };

  transporter.sendMail(emailOptions, (error, response) => {
    if (error) {
      console.log(error);
    } else {
      console.log('E-mail envoyé : ' + response.message);
    }
  });
};

module.exports = { sendResetPasswordEmail };
