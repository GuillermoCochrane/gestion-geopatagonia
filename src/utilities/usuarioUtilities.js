const {  Rol, Usuario } = require("../database/models");
const { Op } = require("sequelize");
const utilities = require("./utilities");
const mailutilities = require("./mailUtilities");
const validator = require("../../public/js/validator.min");

/**
* Utilidades para el controlador de usuarios:
 * - Consulta y formateo de datos maestros 
 * - Manejo de procesos de login y logout
 * - Sistema de recuepración de contraseñas
 * - Panel de administración de datos del usuario
 * @module usuariosUtilities
 * @depends {utilities} - Funciones generales (formateo, validación).
 * @depends {models} - Modelos de Sequelize.
 */
const usuariosUtilities = {
  //  --- Estilos y Scripts ---
  styles: ["usuario/usuario"], // CSS base para las vistas

  viewScript: ["usuario/passwordViewer"], // Scripts para el manejo del toggle de contraseña

  validationScripts: ["validations", "validator.min"], // Scripts para validaciones

  notificationPopUp:  {
      id: "notification-modal",
      title: `Se enviara un email con un código de recuperación a `,
      secondaryTitle: "El código de recuperación expirará en 15 minutos.",
      text: "Si no recibes el email, revisa tu carpeta de spam.",
      buttons: [
        {
          id: "notification-close",
          text: "Cerrar"
        },
      ]
  },

  rolesRoutes: {
    rol1: "ejecucion",
    rol2: "originacion",
    rol3: "tratamiento",
    rol4: "observacion",
    rol5: "dashboard",
  },

  errorData: function(error){
    return {
      styles: ["usuario/error"],
      pageScript: ["errorButton"],
      title: "Error 500",
      mainTitle: "Error 500",
      secondaryTitle: "Error interno del servidor",
      message: error.message,
    };
  },

  loginData: function(){
    return {
      title: "Iniciar sesión",
      styles: ["usuario/login"],
      pageScript: [...this.validationScripts, ...this.viewScript],
      subSection: "./login.ejs"
    }
  },

  homeData: function(encryptedRol) {
    if (!encryptedRol) throw new Error("No se proporcionó rol"); 

    return {
      title: "Inicio",
      styles: ["usuario/userHome"],
      pageScript: [],
      userRoute: this.userRolRoute(encryptedRol),
      subSection: "./homeContent.ejs"
    };
  },

  setEmailData: function(){
    return {
      title: "Cambiar email",
      styles: ["usuario/set"],
      pageScript: [],
      subSection: "./setEmail.ejs",
    };
  },

  setPasswordData: function(){
    return {
      title: "Cambiar contraseña",
      styles: ["usuario/set"],
      pageScript: [...this.validationScripts, ...this.viewScript, "usuario/validations/newPasswordValidation"],
      subSection: "./newPassword.ejs",
      setPassword: true
    };
  },

  recoveryData: async function(){
    try {
      const data = {
        title: "Recuperar contraseña",
        styles: ["usuario/recovery"],
        pageScript: [...this.validationScripts, ...this.viewScript, "usuario/validations/recoveryValidations"],
        subSection: "./recovery.ejs",
        roles: await Rol.findAll(),
        popUp: this.notificationPopUp
      };
      return data;
    } catch (error) {
      console.error(error);
      throw error
    }
  },

  tokenData: function(){
    return {
      title: "Recuperar contraseña",
      styles: ["usuario/login"],
      pageScript: [...this.validationScripts],
      subSection: "./validate.ejs",
    };
  },

  newPasswordData: function(){
    return {
      title: "Cambiar contraseña",
      styles: ["usuario/login"],
      pageScript: [...this.validationScripts, ...this.viewScript, "usuario/validations/newPasswordValidation"],
      subSection: "./newPassword.ejs",
    };
  },

  emailData: function(validation = false){
    return {
      title: "Cambiar email",
      styles: ["usuario/login"],
      pageScript: [],
      subSection: "./emailValidate.ejs",
      emailValidation: validation,
    };
  },

  userRolRoute: function(encryptedRol){
    try {
      if (!encryptedRol) throw new Error("No se proporcionó rol");

      const rol = parseInt(utilities.decrypt(encryptedRol));

      if (isNaN(rol) || rol < 1 || rol > 5) {
        throw new Error("Error al recuperar el Rol");
      }

      return this.rolesRoutes[`rol${rol}`];
    } catch (error) {
      console.error("Error al determinar ruta por rol:", error);
      throw error;
    }
  },

  getUserFromEncryptedID: async function(encryptedID){
    try {
      // recuepramos el id
      const id = utilities.decrypt(encryptedID);
      if (!id) throw new Error("ID inválido");

      // recuperamos el email a partir del id
      const user = await Usuario.findByPk(id);
      if (!user) throw new Error("Usuario no encontrado");

      return user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  
  processEmail: async function(oldMail, newMail){
    try {
      if (!oldMail || !newMail)  throw new Error("Ambos emails son requeridos");
      if (oldMail === newMail) throw new Error("El nuevo email debe ser diferente al actual");
      if ( await utilities.checkEmail(newMail)) throw new Error("El nuevo email se encuentra en uso");
      const result = await Usuario.update(
        { email: newMail },
        { where: { email: oldMail } }
      );
      
      if (result[0] === 0) throw new Error("Usuario no encontrado");

      return true;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  processPassword: async function(email, newPassword) {
    try {
      if (!newPassword) throw new Error("Contraseña requerida");
      
      const hashedPassword = utilities.hashPassword(newPassword);
      const result = await Usuario.update(
        { password: hashedPassword },
        { where: { email } }
      );
      
      if (result[0] === 0) throw new Error("Usuario no encontrado");

      return true;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  setNewEmail: async function(encryptedOldMail, encryptedNewMail){
    try {
      let oldMail = utilities.decrypt(encryptedOldMail);
      let newMail = utilities.decrypt(encryptedNewMail);

      if (!oldMail || !newMail || !validator.isEmail(oldMail) || !validator.isEmail(newMail) ) {
        throw new Error("Token inválido");
      }
      await this.processEmail(oldMail, newMail);
      return { success: true, message: "Email Actualizado" };
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  setNewPassword: async function(token, body) {
    try {
      const email =  this.recoverEmail(token);
      if (!email || !validator.isEmail(email)) {
        throw new Error("Token inválido");
      }
      
      await this.processPassword(email, body.password);
      return { success: true, message: "Contraseña actualizada" };
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  setPassword: async function(encryptedID, body) {
    try {
      // recuperamos el email a partir del id
      const user = await this.getUserFromEncryptedID(encryptedID);

      if (!body.password) throw new Error("Contraseña no proporcionada");
      // actualizamos la contraseña
      await this.processPassword(user.email, body.password);
      return { success: true, message: "Contraseña actualizada" };
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  tokenValidator: function(errors, token , cookie){
    if (token && cookie && token != cookie) {
      errors.errors.push({ 
          type: 'field',
          msg: 'Token de recuperación inválido',
          path: 'token',
          location: 'body'
      });
    }
    return errors;
  },

  // Método que devuelve los emails encriptados
  encryptedMails: async function(oldMail, newMail){
    try {
      if (!oldMail || !newMail)  throw new Error("Ambos emails son requeridos");
      if (oldMail === newMail) throw new Error("El nuevo email debe ser diferente al actual");
      if ( await utilities.checkEmail(newMail)) throw new Error("El nuevo email se encuentra en uso");
      return {
        oldEncrypted: utilities.encrypt(oldMail, true), //ver de encriptar ambos con this.generateToken
        newEncrypted: utilities.encrypt(newMail, true),
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  decryptedMails: function(encryptedOldMail, encryptedNewMail){
    try {
      return {
        oldMail: utilities.decrypt(encryptedOldMail),
        newMail: utilities.decrypt(encryptedNewMail),
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  // Método que devuelve los datos encriptados para la session
  encryptedSessionData: function(userData){
    return {
      id: utilities.encrypt(userData.id,true),
      rol: utilities.encrypt(userData.rol_id, true),
    }
  },

  // Método que devuelve el nombre y el rol encriptado de un usuario
  encryptedRol: async function(userID){
    const id = utilities.decrypt(userID);
    const usuario = await Usuario.findByPk(id);
    return {rol: utilities.encrypt(usuario.rol_id, true), nombre: usuario.nombre};
  },

  // Método que devuelve token para la recueperación de contraseña
  genrateToken: function(mail){
    // Generamos el un string de 15 caracteres para encriptar con el email, para luego poder recuperarlo
    const fixedTime = Date.now().toString().padStart(15, '0');
    const token = utilities.encrypt((fixedTime + mail), true);
    return token;
  },

  // Método que devuelve el email encriptado para la recuepración de contraseña
  recoverEmail: function(token){
    const decryptedData = utilities.decrypt(token);
    const email = decryptedData.slice(15); 
    return email;
  },

  // Método que genera el token de recuperación de contraseña y lo envia por mail
  processRecovery: async function(email, baseUrl){
    const token = this.genrateToken(email);
    const recoveryData = mailutilities.recoveryNotification(token, baseUrl, email);
    await mailutilities.sendMail(email, recoveryData.subject, recoveryData.text);
    return token;
  },

  // Método que envia el mail de notifcación de cambio de email
  sendChangeMailNotification: async function(newEmail, oldEmail, token, baseUrl, isFirstStep = true) {
    const mailToNotify = isFirstStep ? newEmail : oldEmail;
    const mailDestination = isFirstStep ? oldEmail : newEmail;
    const changeData = mailutilities.mailChangeNotification(mailToNotify, token, baseUrl, isFirstStep);
    await mailutilities.sendMail(mailDestination, changeData.subject, changeData.text)

    return { success: true, message: `Email enviado a ${mailDestination}` };
  },

}
module.exports = usuariosUtilities;