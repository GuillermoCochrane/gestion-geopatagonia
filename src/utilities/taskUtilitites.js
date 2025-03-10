const { where } = require("sequelize");
const utilities = require("./utilities");

const taskUtilities = {
  styles: ["task"],

  pageScript: ["task/modalManager", "sectionhandler"],

  headerData: function(title){
    return {
      title: title,
      styles: this.styles,
      pageScript: this.pageScript,
    }
  },

  originationFormData: async function(Origen, Obervador, EnteInspector, Sector){
    try {
      let OrigenData = await Origen.findAll();
      let EnteInspectorData = await EnteInspector.findAll();
      let SectorData = await Sector.findAll();
      let ObervadorData = await Obervador.findAll({where: { rol_id: 4}});
      return {
        origenes: OrigenData,
        observadores: ObervadorData,
        enteInspectores: EnteInspectorData,
        sectores: SectorData,
      }
    } catch (error) {
      console.error(error); // Registro del error para depuración
      return error;
    }
  },

  originacionData: async function(Origen, Obervador, EnteInspector, Sector){
    let data = this.headerData("Originaciones");
    let formData = {};
    try {
      formData = await this.originationFormData(Origen, Obervador, EnteInspector, Sector);
    } catch (error) {
      console.error(error); // Registro del error para depuración
      return error;
    }
    data.formData = formData;
    return data;
  },
}

module.exports = taskUtilities;