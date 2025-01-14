const { estados } = require("../controllers/dashboardController");
const db = require("../database/models");
const { Estado, EnteInspector, Origen, Sector, Rol, Usuario } = db;

const dashboardUtilities = {

  styles: ["dashboard"],

  pageScript: ["dashboard"],

  indexData: function(){
    return {
      subSection: "./index.ejs",
      title: "Panel de control",
      styles: this.styles,
      pageScript: this.pageScript
    }
  },

  estadosData: async function() {
    try {
      const estados = await Estado.findAll();

      // Si no se encuentran estados, devolvemos un mensaje de error
      if (estados.length === 0) {
        return { error: true, message: "No hay estados registrados.", errorData: null };
      }

      // Convertimos las instancias de Sequelize a objetos planos
      const estadosPlanos = estados.map(estado => estado.get({ plain: true }));

      return {
        subSection: "./estados.ejs",
        title: "Estados",
        styles: this.styles,
        pageScript: this.pageScript,
        estados: estadosPlanos
      };
  
    } catch (error) {
      console.error(error); // Registro del error para depuración
      return { error: true, message: "Error al obtener los estados.", errorData: error.message || error };
    }
  },

}

module.exports = dashboardUtilities;