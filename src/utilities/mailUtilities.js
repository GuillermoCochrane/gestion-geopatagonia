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
  mailData: function(to, subject, text, html = null, bcc = null) {
    return {
      from: `"${SMTP_FROM_NAME}" <${SMTP_FROM_EMAIL}>`,
      to,
      subject,
      text,
      ...(html && { html }),
      bcc: bcc || SMTP_FROM_EMAIL,
    };
  },

  // Envía un mail con configuración por defecto con los datos ingresado
  sendMail: async function(to, subject, text, html = null, bcc = null) {
    const mail = this.mailData(to, subject, text, html, bcc);
    const transporter = nodemailer.createTransport(this.smtpConfig());
    try {
      const info = await transporter.sendMail(mail);
      return { success: true, messageId: info.messageId }
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  // Prepara los datos para el sujeto del mensaje de notificación
  subjectData: function(date, description) {
    return `asignada - ${date} - ${description.substring(0, 30)}${description.length > 30 ? '...' : ''}`;
  },
  
  // Prepara los datos para parte del texto del mensaje de notificación
  textGreeting: function(userName) {
    return `Estimado ${userName},`;
  },

  // Prepara los datos para parte del texto del mensaje de notificación
  textIntro: function(date) {
    return ` en el día ${date} se le ha asignado`;
  },

  // Prepara los datos para parte del texto del mensaje de notificación
  textEnd: function() {
  return `Por favor verifique en la aplicación para más detalles.\nEste es un mensaje automático, por favor no responda directamente.`;
  },

  // Genera el mensaje de notificación de la originación asignada
  orginacionNotification: function(userName, date, description, originacionId) {
    const subject = `Originación ${this.subjectData(date, description)}`;
    
    const text = `${this.textGreeting(userName)}` +
      `${this.textIntro(date)} la observación del siguiente originación:\n\n` +
      `${originacionId ? `ID del originación: ${originacionId}\n` : ''}` +
      `\nLocalización: "${description}"\n\n` +
      `Fecha: ${date}\n\n` +
      `${this.textEnd()}`;
    return {
      subject,
      text
    };
  },

  // Genera el mensaje de notificación de la observación/PAC asignada
  pacNotification: function(userName, date, description, reference, pacId, isPac = false) {

    const type = isPac ? "Plan de acción correctiva" : "Observación";
    const subject = `${type} ${this.subjectData(date, description)}`;
    
    const text = `${this.textGreeting(userName)}` +
      `${this.textIntro(date)} ${isPac ? "el": "la" } siguiente ${type} :\n\n` +
      `${pacId ? `ID ${isPac ? "del": "de la" } ${type}: ${pacId}\n\n` : '\n'}` +
      `Descripcion: "${description}"\n\n` +
      `Referencia: ${reference}\n\n` +
      `Fecha Requierda: ${date}\n\n` +
      `${this.textEnd()}`;

      return {
        subject,
        text
      };

  },

  // Genera el mensaje de notificación para el email de recuperación de contraseña
  recoveryNotification: function(token, baseUrl) {
    const subject = `Recuperación de contraseña de Geopatagonia`;
    const text = `Se ha solicitado la recuperación de la contraseña \n\n` +
      `Por favor, haga clic en el siguiente enlace para restablecer la contraseña:\n\n` +
      `${baseUrl}/usuario/recovery/${token}\n\n` +
      `o ingrese el siguiente token en el formulario: ${token} \n\n` +
      `${this.textEnd()}`;
    return { subject, text };
  },

  mailChangeNotification: function(email, token, baseUrl, isFirstStep = true) {
      const subject = isFirstStep 
          ? "⚠️ Confirmación requerida: Cambio de email en Geopatagonia" 
          : "✅ Verificación final: Nuevo email registrado";

      const text = isFirstStep
          ? `Estimado usuario,\n\n` +
            `Se ha solicitado el cambio del email asociado a su cuenta de Geopatagonia.\n` +
            `Nuevo email: ${email}\n\n` +
            `Para autorizar este cambio, ingrese al siguiente enlace:\n` +
            `${baseUrl}/usuario/email/${token}\n\n` +
            `o ingrese el siguiente token en el formulario: \n\n${token} \n\n` +
            `⚠️ Si no reconoces esta acción, por favor contacta a soporte.\n` +
            this.textEnd()
          : `Estimado usuario,\n\n` +
            `Estás a un paso de completar el cambio de email en Geopatagonia.\n` +
            `Email original: ${email}\n\n` +
            `Para confirmar definitivamente, ingresa a:\n` +
            `${baseUrl}/usuario/validateEmail/${token}\n\n` +
            `o ingrese el siguiente token en el formulario: \n\n${token} \n\n` +
            `⚠️ Al confirmar, cerrarás tu sesión y deberás ingresar con el nuevo email.\n` +
            this.textEnd();

      return { subject, text };
  },

}

module.exports = mailUtilities