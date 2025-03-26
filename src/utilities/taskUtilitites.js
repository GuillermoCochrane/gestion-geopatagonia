const utilities = require("./utilities");

const taskUtilities = {
  styles: ["task"],

  pageScript: ["originacion/modalManager"],

  validationScripts: ["validations", "validator.min"],
  
  dashboardHeader: {
    mainLabel: "Originación", 
    newLabel: "Nueva Observación / PAC"
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
    data.pageScript = [...data.pageScript, ...this.validationScripts, "originacion/validations/originacionValidation"];
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

  originationPACData: async function(Originacion, Origen, Usuario, EnteInspector, Sector, ObservacionPAC, AdjuntoOriginacion, AdjuntoObservacionPAC, formData, file, id, nuevaObservacionPAC){
    let data = this.headerData("Originaciones");
    data.pageScript = [...data.pageScript, ...this.validationScripts, "sectionhandler", "originacion/validations/obsPACValidation"]; 
    data.dashboardHeader = this.dashboardHeader;
    try {
      // Creación de la originación, si no se pasa el id de una originación existente
      if (!id) {
        const originacion = await this.createOriginacion(Originacion,AdjuntoOriginacion, formData, file); // Creación de la originación que devuelve un objeto con la originación y el adjunto
        id = originacion.originacion.id;
      }
      // Creación de la observación / PAC, si esta indicado en la variable nuevaObservacionPAC
      if (nuevaObservacionPAC) {
        const observacion = await this.createObservacionPAC(ObservacionPAC, AdjuntoObservacionPAC, formData, file);
        console.log(observacion);
      }

      // Obtener los datos de la originación
      const newOriginationData = await this.singleOriginationData(Originacion, Origen, Usuario, EnteInspector, Sector, AdjuntoOriginacion, ObservacionPAC, id); 
      newOriginationData.fecha_de_observacion = utilities.formatDateDisplay(newOriginationData.fecha_de_observacion);
      //Datos del trartador para el formulario de PACs
      let trartador = await Usuario.findAll({where: { rol_id: 3}});
      trartador = this.dataFormatter(trartador);
      //Datos adicionales para el el renderizado de la vista
      data.oldData = {originacion_id: id};
      data.originacionData = newOriginationData;
      data.tratadorData = trartador;
      return data;
    } catch (error) {
      console.error(error); // Registro del error para depuración
      throw error;
    }
  },

  singleOriginationData: async function(Originacion, Origen, Observador, EnteInspector, Sector, AdjuntoOriginacion, ObservacionPAC, id){
    const exclude = {exclude:['created_at', 'updated_at']}
    const observadorExclude = {exclude:['created_at', 'updated_at', "password"]}
    try {
      const data = await Originacion.findAll({
        where: {id: id},
        include: [
          { model: Origen, as: "origen", attributes: exclude },
          { model: Observador, as: "observador", attributes: observadorExclude },
          { model: EnteInspector, as: "ente_inspector", attributes: exclude },
          { model: Sector, as: "sector", attributes: exclude },
          { model: AdjuntoOriginacion, as: "adjuntos", attributes: exclude },
          { model: ObservacionPAC, as: "observaciones_pacs", attributes: ['id', 'inciso', 'descripcion', 'fecha_requerida', 'referencia', 'fecha_negociable', 'requiere_analisis', 'responsable_id', 'originacion_id', 'estado_id'] },
        ]
      });      
      return utilities.plainData(data)[0];
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
      }
      // Devolver la originación creada
      return {originacion, adjunto};
    } catch (error) {
      console.error(error); // Registro del error para depuración
      throw error; // Lanzar el error para manejarlo en el controlador
    }
  },

  createObservacionPAC: async function (ObservacionPAC, AdjuntoObservacionPAC, data, file) {
    try {
      // Crear la observación / PAC
      data.estado_id = data.estado_id || 1; // Estado por defecto (1)
      const observacion = await ObservacionPAC.create(data);
      // Si se subió un archivo, guardarlo en la base de datos
      let adjunto = {};
      if (file) {
        adjunto = await this.createAdjunto(AdjuntoObservacionPAC, file, 'observacion_pac_id', observacion.id);
      }
      // Devolver la observación creada
      return {observacion, adjunto};
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

  createAdjuntoObservacionPAC: async function (AdjuntoObservacionPAC, file, key, id) {
    try {
      // Construir el objeto de datos para el adjunto
      const data = {
        nombre: file.originalname,
        archivo: `/documents/observacion_pac/${file.originalname}`, 
        descripcion: '-',
        [key]: id, //Asociar el adjunto a la entidad usando el ID proporcionado
      };
      // Crear el adjunto en la base de datos
      const adjunto = await AdjuntoObservacionPAC.create(data);
      return adjunto;
    } catch (error) {
      console.error(error); // Registro del error para depuración
      throw error; // Lanzar el error para manejarlo en el controlador
    }
  },
}

module.exports = taskUtilities;