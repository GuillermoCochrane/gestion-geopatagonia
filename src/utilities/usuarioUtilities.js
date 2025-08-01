const {  Rol, Usuario } = require("../database/models");
const { Op } = require("sequelize");
const utilities = require("./utilities");
const mailutilities = require("./mailUtilities");

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

  loginData: function(){
    return {
      title: "Iniciar sesión",
      styles: ["usuario/login"],
      pageScript: [...this.validationScripts, ...this.viewScript],
    }
  },

  // Método que devuelve los datos enciptados para la session
  encryptedSessionData: function(userData){
    return {
      id: utilities.encrypt(userData.id),
      rol: utilities.encrypt(userData.rol_id),
    }
  },
}

module.exports = usuariosUtilities;