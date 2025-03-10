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

  dataFormatter: function(data){
    let dataFormatted = utilities.plainData(data);
    if (data.length === 0) return [];
    dataFormatted = utilities.multipleDateFormat(dataFormatted);
    return dataFormatted;
  },

  originationFormData: async function(Origen, Obervador, EnteInspector, Sector){
    try {
      let origenData = await Origen.findAll();
      origenData = this.dataFormatter(origenData);
      let enteInspectorData = await EnteInspector.findAll();
      enteInspectorData = this.dataFormatter(enteInspectorData);
      let sectorData = await Sector.findAll();
      sectorData = this.dataFormatter(sectorData);
      let obervadorData = await Obervador.findAll({where: { rol_id: 4}});
      obervadorData = this.dataFormatter(obervadorData);
      obervadorData = utilities.passwordRemover(obervadorData);

      return {
        origenes: origenData,
        observadores: obervadorData,
        enteInspectores: enteInspectorData,
        sectores: sectorData,
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