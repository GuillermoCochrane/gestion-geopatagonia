const { Usuario} = require("../database/models");
const bcrypt = require("bcryptjs");
const utilities = {
    // Método para convertir fecha a un objeto con día, mes y año
    getDateParts: function(date){
      // Si no se recibe fecha, devolver objeto vacío
      if (!date) return { day: null, month: null, year: null };
      const formattedDate = new Date(date);
      // Si no se pudo convertir la fecha, devolver objeto vacío
      if (isNaN(formattedDate)) return { day: null, month: null, year: null };

      return {
        day: String(formattedDate.getDate()).padStart(2, '0'),
        month: String(formattedDate.getMonth() + 1).padStart(2, '0'),
        year: String(formattedDate.getFullYear()),
      };
    },

    // Método para devolver la fecha en formato dd / mm / yyyy
    formatDateDisplay: function(date){
      const { day, month, year } = this.getDateParts(date);
      if (!day || !month || !year) return ;
  
      return `${day}/${month}/${year}`;
    },

    // Método para devolver la fecha en formato para formularios (yyyy-MM-dd)
    formatDateForm: (date) => {
      const { day, month, year } = utilities.getDateParts(date);
      if (!day || !month || !year) return 'Invalid date';

      return `${year}-${month}-${day}`;
    },

    // Método para devolver una lista de fechas en formato dd / mm / yyyy , para timestamps, propiedades que se pasen como parámetro y propiedades anidadas
    multipleDateFormat: function(records, fields = [], nestedFields = []) {
      for (const record of records) {

        // 1. Timestamps
        if (record.created_at) record.created_at = this.formatDateDisplay(record.created_at);
        if (record.updated_at) record.updated_at = this.formatDateDisplay(record.updated_at);

        // 2. Parámetros directos
        for (const field of fields) {
          if (record[field] != null) {
            record[field] = this.formatDateDisplay(record[field]);
          }
        }

        // 3. Parámetros anidados
        for (const { parentObject, dateField } of nestedFields) {
          if (record[parentObject]?.[dateField] != null) {
            record[parentObject][dateField] = this.formatDateDisplay(record[parentObject][dateField]);
          }
        }
      }
      return records;
    },

    // Método para cambiar una cadena de texto a con "_" a espacios o a "" y poner las primeras letras en mayúsculas
    adjustUnderscores: function (string, method) {
      let palabras = [];
      // Si hay "_" en el string, separa las palabras; sino, pone el string en un array
      if (string.includes('_')) {
          let nuevoStr = string.replace(/_/g, ' ');  
          palabras = nuevoStr.split(' ');
      } else {
        palabras.push(string);
      }
      string = "";  
      for (const palabra of palabras) {
        // Pone la primera letra en mayúscula
        string += this.adjustCase(palabra, true);
        if (method) string += " ";
      } 
      string = string.trim();
      return string;
    },

    // Método para cambiar a mayúsculas o minúsculas la primera letra de cada palabra
    adjustCase: function(string, capitalize) {
      return capitalize
          ? string.charAt(0).toUpperCase() + string.slice(1)
          : string.charAt(0).toLowerCase() + string.slice(1);
    },

    // Método para convertir en un objeto plano, la información de una instancia de Sequelize 
    plainData: function(data){
      return data.map((register) => register.get({ plain: true }));
    },

    // Metodo que verifica si una email es se encuentra en uso
    checkEmail: async function(email, id = null){
        let user = await Usuario.findAll({
            where: {
                email: email
            }
        });
        let response = user.length > 0;
        if (id && response && user[0].id == id) response = false;
        return response
    },

    // Método para encriptar una contraseña
    hashPassword: function(password){
        return bcrypt.hashSync(password, 10);
    },

    passwordRemover: function(users){
      for (const user of users) {
        delete user.password;
      }
      return users;
    },
};

module.exports = utilities;