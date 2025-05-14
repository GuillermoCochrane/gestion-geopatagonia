const nodemailer = require('nodemailer');
//Destructuracion de variables de entorno, para configurar el envío de mails
//Si no se definen, se usan los valores por defecto. BOOLEANOS Y NUMEROS se pasan como string y luego se parsean
const { 
  SMTP_HOST = 'smtp.gmail.com',         
  SMTP_PORT = '465',                    
  SMTP_USER, 
  SMTP_PASS,
  SMTP_SECURE = "true",                 
  SMTP_FROM_NAME = 'Nodemailer desde app de Express.js', //opcional
  SMTP_FROM_EMAIL = SMTP_USER           // Usa SMTP_USER si no está definido
} = process.env;

const mailUtilities = {

  smtpConfig: function(){
    if (!SMTP_USER) throw new Error("Falta el valor de la variable de entorno SMTP_USER");
    if (!SMTP_PASS) throw new Error("Falta el valor de la variable de entorno SMTP_PASS");
    const config = {
      host: SMTP_HOST,
      port: parseInt(SMTP_PORT),
      secure: Boolean(SMTP_SECURE),
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    }
    return config
  },

}

module.exports = mailUtilities