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

  //Devuelve la configuración para el envío de mails
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

  // Devuelve un objeto con los datos para el envío de mails
  mailData: function(to, subject, text, html = null) {
    return {
      from: `"${SMTP_FROM_NAME}" <${SMTP_FROM_EMAIL}>`,
      to,
      subject,
      text,
      html: html || text                  // Usa HTML si está definido, sino texto plano
    };
  },

  // Envía un mail con configuración por defecto con los datos ingresado
  sendMail: async function(to, subject, text, html = null) {
    const mail = this.mailData(to, subject, text, html);
    const transporter = nodemailer.createTransport(this.smtpConfig());
    try {
      const info = await transporter.sendMail(mail);
      return { success: true, messageId: info.messageId }
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  // Genera el mensaje de notificación de la originación asignada
  orginacionNotification: function(userName, date, description, originacionId) {
    const subject = `[Originación Asignada] ${date} - ${description.substring(0, 30)}${description.length > 30 ? '...' : ''}`;
    
    const text = `Estimado ${userName},\n\n` +
      `En el día ${date} se le ha asignado la obervación del siguiente originación:\n\n` +
      `${originacionId ? `ID del originación: ${originacionId}\n` : ''}` +
      `"${description}"\n\n` +
      `Fecha: ${date}\n\n` +
      `Por favor verifique la misma en la aplicación para más detalles.\n\n` +
      `Este es un mensaje automático, por favor no responda directamente.`;
    
    return {
      subject,
      text
    };
  },
}

module.exports = mailUtilities