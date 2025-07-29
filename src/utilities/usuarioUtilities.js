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
  styles: ["task"], // CSS base para las vistas

  pageScript: ["usuario/passwordViewer"], // Scripts para el manejo de modales

  validationScripts: ["validations", "validator.min"], // Scripts para validaciones

}

module.exports = usuariosUtilities;