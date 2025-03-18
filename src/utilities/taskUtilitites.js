const utilities = require("./utilities");

const taskUtilities = {
  styles: ["task"],

  pageScript: ["task/modalManager"],

  validationScripts: ["validations", "validator.min"],
  
  dashboardHeader: {
    mainLabel: "Originación", 
    newLabel: "Nueva Pac"
  },

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
    data.pageScript = [...data.pageScript, ...this.validationScripts, "task/validations/originacionValidation"];
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

  singleOriginationData: async function(Originacion, Origen, Observador, EnteInspector, Sector, Adjunto, id){
    const exclude = {exclude:['created_at', 'updated_at']}
    const observadorExclude = {exclude:['created_at', 'updated_at', "password"]}
    try {
      const data = Originacion.findAll({
        where: {id: id},
        include: [
          { model: Origen, as: "origen", attributes: exclude },
          { model: Observador, as: "observador", attributes: observadorExclude },
          { model: EnteInspector, as: "ente_inspector", attributes: exclude },
          { model: Sector, as: "sector", attributes: exclude },
          { model: Adjunto, as: "adjuntos", attributes: exclude },
        ]
      });      
      return data;
    } catch (error) {
      console.error(error); // Registro del error para depuración
      throw error;
    }
  },

  createOriginacion: async function (Originacion, AdjuntoOriginacion, data, file) {
    try {
      // Crear la originación
      data.estado_id = data.estado_id || 1; // Estado por defecto (1)
      const originacion = await Originacion.create(data);
      // Si se subió un archivo, guardarlo en la base de datos
      let adjunto = {};
      if (file) {
        adjunto = await this.createAdjunto(AdjuntoOriginacion, file, 'originacion_id', originacion.id);
      } else {
        adjunto.descripcion = "La originación no tiene adjuntos";
      }
      // Devolver la originación creada
      return {originacion, adjunto};
    } catch (error) {
      console.error(error); // Registro del error para depuración
      throw error; // Lanzar el error para manejarlo en el controlador
    }
  },

  createAdjunto: async function (Adjunto, file, key, id) {
    try {
      // Construir el objeto de datos para el adjunto
      const data = {
        nombre: file.originalname,
        archivo: `/documents/originacion/${file.originalname}`, 
        descripcion: '-',
        [key]: id, //Asociar el adjunto a la entidad usando el ID proporcionado
      };
      // Crear el adjunto en la base de datos
      const adjunto = await Adjunto.create(data);
      return adjunto;
    } catch (error) {
      console.error(error); // Registro del error para depuración
      throw error; // Lanzar el error para manejarlo en el controlador
    }
  },
}

module.exports = taskUtilities;